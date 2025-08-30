"use client"
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TranslationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
    return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        // style={{ position: "relative" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}