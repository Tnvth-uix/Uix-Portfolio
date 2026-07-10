"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Proyecto 1",
    slug: "proyecto-1",
    client: "Cliente A",
    image: "/projects/placeholder-1.png",
  },
  {
    id: 2,
    title: "Proyecto 2",
    slug: "proyecto-2",
    client: "Cliente B",
    image: "/projects/placeholder-2.png",
  },
  {
    id: 3,
    title: "Proyecto 3",
    slug: "proyecto-3",
    client: "Cliente C",
    image: "/projects/placeholder-3.png",
  },
  {
    id: 4,
    title: "Proyecto 4",
    slug: "proyecto-4",
    client: "Cliente D",
    image: "/projects/placeholder-4.png",
  },
];

export default function Home() {
  return (
    <div className="bg-uix-blue-900">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-uix-neon-green to-uix-neon-teal rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-uix-purple-700 to-uix-light rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <motion.div
          className="relative z-10 text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-uix-neon-green via-uix-neon-teal to-uix-light bg-clip-text text-transparent">
              UiX Portfolio
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-uix-purple-100 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Presentaciones cinematográficas de proyectos UX/UI
          </motion.p>

          <motion.p
            className="text-uix-purple-100/70 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explora una colección curada de trabajos de diseño, desde investigación y prototipado hasta métricas de impacto en tiempo real.
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/projects">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-uix-neon-green to-uix-neon-teal rounded-lg text-uix-blue-900 font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Proyectos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-uix-neon-green" size={32} />
        </motion.div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-uix-neon-green">
              Últimos Proyectos
            </h2>
            <p className="text-uix-purple-100">
              Una selección de trabajos recientes en UX/UI design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-uix-purple-900/50 backdrop-blur rounded-lg p-6 border border-uix-purple-700 hover:border-uix-neon-green transition-colors group cursor-pointer"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-r from-uix-purple-700 to-uix-blue-700 rounded-lg flex items-center justify-center text-uix-purple-100">
                      Proyecto {project.id}
                    </div>
                    <div>
                      <p className="text-uix-neon-green text-sm font-semibold">
                        {project.client}
                      </p>
                      <h3 className="text-xl font-bold text-uix-purple-100 group-hover:text-uix-neon-green transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <motion.button
                className="px-8 py-3 border-2 border-uix-neon-green text-uix-neon-green rounded-lg font-semibold hover:bg-uix-neon-green/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos los Proyectos
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
