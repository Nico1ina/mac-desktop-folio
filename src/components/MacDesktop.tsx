
import React, { useState } from "react";
import { MacDock, appOrder } from "./MacDock";
import { FolderIcon } from "./FolderIcon";
import { MacWindow } from "./MacWindow";
import { AnimatePresence, motion } from "framer-motion";
import TopNavbar from "./TopNavbar";

// Folders list (can extend with more info/content)
const desktopFolders = [
  { label: "Work", content: <div>Work projects, files, and code!</div> },
  { label: "Photos", content: <div>Photo gallery and design shots!</div> },
  { label: "Resume", content: <div><a href="#" className="text-blue-600 underline">Download Resume</a></div> },
];

const folderInitialPositions = [
  { top: 120, left: 60 },
  { top: 250, left: 140 },
  { top: 160, left: 220 },
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
  // Add draggable folder positions
  const [folderPositions, setFolderPositions] = useState<{top: number, left: number}[]>(folderInitialPositions);

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

  // Draggable logic for folders
  const handleFolderDrag = (i: number, event: any, info: { point: { x: number; y: number } }) => {
    setFolderPositions((prev) => {
      const updated = [...prev];
      // Clamp to desktop area (min 0, max desktop)
      updated[i] = {
        top: Math.max(60, Math.min(info.point.y, window.innerHeight - 100)),
        left: Math.max(12, Math.min(info.point.x, window.innerWidth - 90))
      }
      return updated;
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-[#1A1F2C] dark:via-[#222438] dark:to-[#31275B] transition-colors duration-500 overflow-hidden">
      <TopNavbar />
      {/* Desktop Folders (Draggable) */}
      {desktopFolders.map((folder, i) => (
        <div
          key={folder.label}
          style={{
            position: "absolute",
            top: folderPositions[i].top,
            left: folderPositions[i].left,
            zIndex: 10,
            touchAction: "none"
          }}
        >
          <motion.div
            drag
            dragMomentum={false}
            dragConstraints={{
              top: 30, left: 0,
              right: window.innerWidth - 80,
              bottom: window.innerHeight - 80,
            }}
            onDrag={(event, info) => handleFolderDrag(i, event, info)}
            className="cursor-move select-none"
            style={{ touchAction: "none" }}
            whileDrag={{ scale: 1.1 }}
          >
            <FolderIcon
              label={folder.label}
              onClick={() => openOrFocusWindow({ type: "folder", name: folder.label })}
            />
          </motion.div>
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
            zIndex={20 + i}
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
