"use client";

import { motion } from "framer-motion";

interface TypingIndicatorProps {
  text?: string;
}

export function TypingIndicator({ text }: TypingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start"
    >
      <div className="bg-white shadow-card border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
        {text ? (
          <p className="text-sm text-gray-500">{text}</p>
        ) : (
          <div className="flex items-center gap-1">
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
