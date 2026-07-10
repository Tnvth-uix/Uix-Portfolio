"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 bg-uix-blue-900/95 backdrop-blur-sm border-b border-uix-purple-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className="w-10 h-10 relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.png"
              alt="UiX Logo"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-uix-neon-green to-uix-neon-teal bg-clip-text text-transparent">
            UiX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-uix-purple-100 hover:text-uix-neon-green transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/projects"
            className="text-uix-purple-100 hover:text-uix-neon-green transition-colors"
          >
            Proyectos
          </Link>
          <motion.a
            href="#contact"
            className="px-4 py-2 bg-gradient-to-r from-uix-neon-green to-uix-neon-teal rounded-lg text-uix-blue-900 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contacto
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
}
