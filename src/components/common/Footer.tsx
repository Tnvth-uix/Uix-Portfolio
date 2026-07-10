"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-uix-blue-900 border-t border-uix-purple-700 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-uix-neon-green font-bold mb-4">UiX</h3>
            <p className="text-uix-purple-100 text-sm">
              Portafolio de presentaciones cinematográficas
            </p>
          </div>

          <div>
            <h4 className="text-uix-purple-100 font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-uix-purple-100 hover:text-uix-neon-green transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-uix-purple-100 hover:text-uix-neon-green transition-colors">
                  Proyectos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-uix-purple-100 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-uix-purple-100 hover:text-uix-neon-green transition-colors">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-uix-purple-100 hover:text-uix-neon-green transition-colors">
                  Términos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-uix-purple-100 font-semibold mb-4">Redes</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/Tnvth-uix"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-uix-neon-green hover:text-uix-neon-teal transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-uix-neon-green hover:text-uix-neon-teal transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:taniveth.camacho@elektra.com.mx"
                whileHover={{ scale: 1.2 }}
                className="text-uix-neon-green hover:text-uix-neon-teal transition-colors"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-uix-purple-700 pt-8 text-center text-uix-purple-100 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} UiX Portfolio. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}
