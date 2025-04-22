
import { motion } from "framer-motion";
import { Folder } from "lucide-react";
import React from "react";

export interface FolderIconProps {
  label: string;
  onClick: () => void;
}

export const FolderIcon: React.FC<FolderIconProps> = ({ label, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.10 }}
    whileTap={{ scale: 0.96 }}
    className="flex flex-col items-center gap-1 cursor-pointer group select-none"
    onClick={onClick}
    tabIndex={0}
    aria-label={label}
  >
    <div className="bg-gradient-to-br from-blue-300 via-blue-200 to-blue-400 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 w-[64px] h-[50px] rounded-lg shadow-md flex items-center justify-center relative">
      <Folder className="w-8 h-8 text-blue-700/80 dark:text-white" />
    </div>
    <span className="text-sm text-gray-700 dark:text-gray-200 select-none group-hover:underline">{label}</span>
  </motion.div>
);

