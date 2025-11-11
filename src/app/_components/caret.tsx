"use client";

import { motion } from "framer-motion";

export default function Caret() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.6 }}
      aria-hidden="true"
      className="inline-block w-0.5 h-6 bg-yellow-900 align-middle"
    />
  );
}
