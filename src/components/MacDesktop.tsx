
import React, { useState } from "react";
import { MacDock, appOrder } from "./MacDock";
import { FolderIcon } from "./FolderIcon";
import { MacWindow } from "./MacWindow";
import { AnimatePresence } from "framer-motion";

const desktopFolders = [
  { label: "Work", content: <div>Work projects, files, and code!</div> },
  { label: "Photos", content: <div>Photo gallery and design shots!</div> },
  { label: "Resume", content: <div><a href="#" className="text-blue-600 underline">Download Resume</a></div> },
];

const appContent: Record<string, React.ReactNode> = {
  Portfolio: <div>Your project portfolio goes here! Add cards, links, or projects.</div>,
  Contact: (
    <div>
      <p>Email: <a href="mailto:youremail@example.com" className="text-blue-600 underline">youremail@example.com</a></p>
      <p>LinkedIn: <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">linkedin.com/yourprofile</a></p>
    </div>
  ),
  Website: <div>About you, your website links, or blog here!</div>,
  Gallery: <div>Image gallery: add your best shots or work here.</div>,
  Music: <div>Playlist, audio samples or favorite tracks.</div>,
  Videos: <div>Video portfolio/YouTube embeds here.</div>,
  Settings: <div>Theme, font, or contact details can go here.</div>,
};

export const MacDesktop: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<{ type: "app" | "folder", name: string }[]>([]);

  // Bring window to front by reordering
  const openOrFocusWindow = (payload: { type: "app" | "folder", name: string }) => {
    setOpenWindows((prev) => {
      // If already open, bring to front
      const exists = prev.findIndex(w => w.type === payload.type && w.name === payload.name);
      if (exists !== -1) {
        const updated = [...prev];
        const [win] = updated.splice(exists, 1);
        return [...updated, win];
      }
      return [...prev, payload];
    });
  };

  const closeWindow = (payload: { type: "app" | "folder", name: string }) => {
    setOpenWindows((prev) => prev.filter(w => !(w.type === payload.type && w.name === payload.name)));
  };

  // Folder positions, randomized a bit for demo.
  const folderPositions = [
    { top: "20%", left: "10%" },
    { top: "38%", left: "18%" },
    { top: "24%", left: "24%" },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-[#1A1F2C] dark:via-[#222438] dark:to-[#31275B] transition-colors duration-500 overflow-hidden">
      {/* Desktop Folders */}
      {desktopFolders.map((folder, i) => (
        <div
          key={folder.label}
          style={{ position: "absolute", ...folderPositions[i] }}
        >
          <FolderIcon
            label={folder.label}
            onClick={() => openOrFocusWindow({ type: "folder", name: folder.label })}
          />
        </div>
      ))}

      {/* All Open Windows */}
      <AnimatePresence>
        {openWindows.map((w, i) => (
          <MacWindow
            key={w.type + "-" + w.name}
            open={true}
            onClose={() => closeWindow(w)}
            appName={w.type === "app" ? w.name : w.name + " Folder"}
            zIndex={10 + i}
            style={{
              left: `calc(50% + ${i * 30}px)`,
              top: `calc(15% + ${i * 24}px)`,
              minWidth: 340,
            }}
          >
            {w.type === "app"
              ? appContent[w.name] ?? <div>Coming soon</div>
              : desktopFolders.find(f => f.label === w.name)?.content ?? <div>Folder</div>}
          </MacWindow>
        ))}
      </AnimatePresence>

      {/* Dock */}
      <MacDock onAppClick={appName => openOrFocusWindow({ type: "app", name: appName })} />

      {/* Desktop overlay for click-out in mobile */}
      <div className="fixed inset-0 pointer-events-none" />
      {/* Optional: add clock/menu bar at the top if you want the true Mac look */}
    </div>
  );
};

export default MacDesktop;
