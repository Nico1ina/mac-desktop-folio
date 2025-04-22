
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface MacWindowProps {
  open: boolean;
  onClose: () => void;
  appName: string;
  children: React.ReactNode;
  zIndex: number;
  style?: React.CSSProperties;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  open,
  onClose,
  appName,
  children,
  zIndex,
  style = {},
}) => {
  const isMobile = useIsMobile();

  if (!open) return null;

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 40 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={
        "fixed bg-white/60 dark:bg-[#222]/90 shadow-2xl rounded-xl border border-gray-300/80 backdrop-blur-md flex flex-col " +
        (isMobile
          ? " left-0 top-0 w-full h-full m-0 rounded-none border-0"
          : " left-1/2 top-1/3 min-w-[320px] max-w-lg")
      }
      style={{
        zIndex,
        ...(isMobile
          ? {
              width: "100vw",
              minWidth: 0,
              maxWidth: "100vw",
              height: "100dvh",
              minHeight: 0,
              maxHeight: "100dvh",
              left: 0,
              top: 0,
              borderRadius: 0,
              padding: 0,
              transform: undefined,
            }
          : {
              transform: "translate(-50%, 0)",
              ...style,
            }),
      }}
    >
      {/* Title bar */}
      <div
        className={
          "flex items-center px-3 py-2 border-b border-gray-200 dark:border-gray-700 " +
          (isMobile
            ? "rounded-none bg-gradient-to-br from-gray-100/80 dark:from-[#242438] to-white/40"
            : "rounded-t-xl bg-gradient-to-br from-gray-100/70 dark:from-[#242438] to-white/30")
        }
      >
        <button
          className="w-3 h-3 rounded-full bg-red-500 hover:scale-125 transition-transform"
          onClick={onClose}
          aria-label="Close"
        />
        <span className="ml-2 font-medium text-gray-900 dark:text-gray-50 text-sm">{appName}</span>
        <div className="flex-1" />
        <X className="w-4 h-4 text-gray-400 hover:text-red-400 cursor-pointer" onClick={onClose} />
      </div>
      <div className={
        (isMobile
          ? "p-3 flex-1 overflow-auto max-h-[90dvh]"
          : "p-4 flex-1 overflow-auto max-h-[70vh] md:max-h-[80vh]")
      }>
        {children}
      </div>
    </motion.div>
  );
};
