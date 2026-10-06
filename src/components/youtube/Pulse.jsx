import React from "react";
import { motion } from "framer-motion";

// Destaque amarelo pulsante no elemento que a pessoa deve tocar naquele passo
export default function Pulse({
  active,
  children,
  className = "inline-flex",
  ring = "rounded-full",
  onClick,
}) {
  return (
    <div className={`relative ${className}`} onClick={onClick}>
      {active && (
        <motion.div
          animate={{ scale: [1, 1.35, 1.35], opacity: [0.7, 0.25, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className={`absolute -inset-2 ${ring} bg-yellow-400 z-0 pointer-events-none`}
        />
      )}
      <motion.div
        animate={active ? { scale: [1, 1.07, 1] } : {}}
        transition={active ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
        className="relative z-10 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}