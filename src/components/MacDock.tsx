
import { File, Mail, Globe, Image, Music, Video, Settings } from "lucide-react";
import React from "react";
import { DockIcon } from "./DockIcon";

interface App {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface MacDockProps {
  onAppClick: (app: string) => void;
}

export const appOrder = [
  { label: "Portfolio", icon: <File size={30} />, name: "Portfolio" },
  { label: "Contact", icon: <Mail size={30} />, name: "Contact" },
  { label: "Website", icon: <Globe size={30} />, name: "Website" },
  { label: "Gallery", icon: <Image size={30} />, name: "Gallery" },
  { label: "Music", icon: <Music size={30} />, name: "Music" },
  { label: "Videos", icon: <Video size={30} />, name: "Videos" },
  { label: "Settings", icon: <Settings size={30} />, name: "Settings" },
];

export const MacDock: React.FC<MacDockProps> = ({ onAppClick }) => (
  <div className="fixed z-30 left-1/2 -translate-x-1/2 bottom-5 md:bottom-8 shadow-2xl rounded-2xl px-3 py-2 flex bg-white/60 dark:bg-[#222]/90 backdrop-blur-md border border-gray-300/70 gap-2 animate-fade-in">
    {appOrder.map((app) => (
      <DockIcon key={app.name} icon={app.icon} label={app.label} onClick={() => onAppClick(app.name)} />
    ))}
  </div>
);
