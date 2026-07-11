"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1];

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, [pathname, reduced]);

  if (reduced) return children;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="page-transition"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.42,
          ease: EASE,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
