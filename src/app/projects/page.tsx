"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Proyecto 1",
    slug: "proyecto-1",
    client: "Cliente A",
    category: "Web Design",
    methodologies: ["Design Thinking"],
  },
  {
    id: 2,
    title: "Proyecto 2",
    slug: "proyecto-2",
    client: "Cliente B",
    category: "App Design",
    methodologies: ["Agile UX"],
  },
  {
    id: 3,
    title: "Proyecto 3",
    slug: "proyecto-3",
    client: "Cliente C",
    category: "Dashboard",
    methodologies: ["Lean UX"],
  },
  {
    id: 4,
    title: "Proyecto 4",
    slug: "proyecto-4",
    client: "Cliente D",
    category: "Web Design",
    methodologies: ["Design Thinking"],
  },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(projects.map((p) => p.category))
  );

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <div className="bg-uix-blue-900 min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-uix-neon-green to-uix-neon-teal bg-clip-text text-transparent">
            Proyectos
          </h1>
          <p className="text-uix-purple-100 text-lg">
            Una galería de trabajos UX/UI en diferentes categorías
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === null
                ? "bg-uix-neon-green text-uix-blue-900"
                : "border-2 border-uix-purple-700 text-uix-purple-100 hover:border-uix-neon-green"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Todos
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-uix-neon-green text-uix-blue-900"
                  : "border-2 border-uix-purple-700 text-uix-purple-100 hover:border-uix-neon-green"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="bg-uix-purple-900/50 backdrop-blur rounded-lg overflow-hidden border border-uix-purple-700 hover:border-uix-neon-green transition-all group h-full cursor-pointer">
                  {/* Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-uix-purple-700 to-uix-blue-700 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-uix-blue-900 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-end justify-start p-6"
                    >
                      <span className="text-uix-neon-green font-bold">
                        Más detalles →
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-uix-neon-green text-sm font-semibold">
                        {project.client}
                      </p>
                      <h3 className="text-xl font-bold text-uix-purple-100 group-hover:text-uix-neon-green transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs px-3 py-1 bg-uix-purple-700/50 text-uix-purple-100 rounded-full">
                        {project.category}
                      </span>
                      {project.methodologies.map((m) => (
                        <span
                          key={m}
                          className="text-xs px-3 py-1 bg-uix-neon-green/20 text-uix-neon-green rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <p className="text-uix-purple-100 text-lg">
              No hay proyectos en esta categoría
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
