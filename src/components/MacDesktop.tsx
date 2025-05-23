
import React, { useState } from "react";
import { MacDock, appOrder } from "./MacDock";
import { FolderIcon } from "./FolderIcon";
import { MacWindow } from "./MacWindow";
import { AnimatePresence, motion } from "framer-motion";
import TopNavbar from "./TopNavbar";
import { useIsMobile } from "@/hooks/use-mobile";

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
  // Only allow one open window at a time for responsiveness and focus
  const [openWindow, setOpenWindow] = useState<{ type: "app" | "folder", name: string } | null>(null);
  const [folderPositions, setFolderPositions] = useState<{top: number, left: number}[]>(folderInitialPositions);
  const isMobile = useIsMobile();

  // When opening, close any existing window and open new one
  const openOrFocusWindow = (payload: { type: "app" | "folder", name: string }) => {
    setOpenWindow(payload);
  };

  const closeWindow = () => {
    setOpenWindow(null);
  };

  // Draggable folders for desktop, static grid for mobile
  const handleFolderDrag = (i: number, event: any, info: { point: { x: number; y: number } }) => {
    setFolderPositions((prev) => {
      const updated = [...prev];
      updated[i] = {
        top: Math.max(60, Math.min(info.point.y, window.innerHeight - 100)),
        left: Math.max(12, Math.min(info.point.x, window.innerWidth - 90))
      }
      return updated;
    });
  };

  // Organize folders in grid for mobile, free drag for desktop
  const getMobileFolderLayout = (index: number) => {
    if (isMobile) {
      const row = Math.floor(index / 3);
      const col = index % 3;
      return {
        top: 90 + row * 100,
        left: 20 + col * (window.innerWidth - 40) / 3
      };
    }
    return folderPositions[index];
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-[#1A1F2C] dark:via-[#222438] dark:to-[#31275B] transition-colors duration-500 overflow-hidden">
      <TopNavbar />
      {/* Desktop Folders (Draggable on desktop, grid layout on mobile) */}
      {desktopFolders.map((folder, i) => (
        <div
          key={folder.label}
          style={{
            position: "absolute",
            top: getMobileFolderLayout(i).top,
            left: getMobileFolderLayout(i).left,
            zIndex: 10,
            touchAction: "none"
          }}
        >
          <motion.div
            drag={!isMobile}
            dragMomentum={false}
            dragConstraints={{
              top: 30, left: 0,
              right: window.innerWidth - 80,
              bottom: window.innerHeight - 80,
            }}
            onDrag={(event, info) => !isMobile && handleFolderDrag(i, event, info)}
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

      {/* Only allow one open window */}
      <AnimatePresence>
        {openWindow && (
          <MacWindow
            key={openWindow.type + "-" + openWindow.name}
            open={true}
            onClose={closeWindow}
            appName={openWindow.type === "app" ? openWindow.name : openWindow.name + " Folder"}
            zIndex={50} // keep on top of icons
          >
            {openWindow.type === "app"
              ? appContent[openWindow.name] ?? <div>Coming soon</div>
              : desktopFolders.find(f => f.label === openWindow.name)?.content ?? <div>Folder</div>}
          </MacWindow>
        )}
      </AnimatePresence>

      {/* Dock */}
      <MacDock onAppClick={appName => openOrFocusWindow({ type: "app", name: appName })} />

      {/* Desktop overlay for click-out in mobile */}
      <div className="fixed inset-0 pointer-events-none" />
    </div>
  );
};

export default MacDesktop;

