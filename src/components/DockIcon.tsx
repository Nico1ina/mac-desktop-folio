
import { motion } from "framer-motion";
import React from "react";

export interface DockIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const DockIcon: React.FC<DockIconProps> = ({ icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.17 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center mx-2 focus:outline-none"
    onClick={onClick}
    tabIndex={0}
    aria-label={label}
  >
    <div className="w-14 h-14 bg-white/70 dark:bg-[#232334]/90 rounded-2xl flex items-center justify-center shadow-md">
      {icon}
    </div>
    <span className="text-xs mt-1 text-gray-700 dark:text-gray-200">{label}</span>
  </motion.button>
);
