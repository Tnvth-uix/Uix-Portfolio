"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projectTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const ScrollBlock = ({
    number,
    title,
    children,
  }: {
    number: number;
    title: string;
    children: React.ReactNode;
  }) => (
    <motion.section
      className="min-h-screen py-20 px-4 flex items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-200px" }}
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-200px" }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-uix-neon-green to-uix-neon-teal flex items-center justify-center text-uix-blue-900 font-bold">
              {number}
            </div>
            <h2 className="text-4xl font-bold text-uix-neon-green">{title}</h2>
          </div>
          {children}
        </motion.div>
      </div>
    </motion.section>
  );

  return (
    <div className="bg-uix-blue-900 text-uix-purple-100">
      {/* Hero Section - Bloque 1 */}
      <motion.section
        className="min-h-screen bg-gradient-to-br from-uix-purple-900 to-uix-blue-900 flex flex-col items-center justify-center relative overflow-hidden px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link
          href="/projects"
          className="absolute top-20 left-4 flex items-center gap-2 text-uix-neon-green hover:text-uix-neon-teal transition-colors z-20"
        >
          <ArrowLeft size={20} />
          Volver
        </Link>

        <motion.div
          className="text-center space-y-6 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2">
            <span className="text-uix-neon-green font-semibold">Caso de Estudio</span>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-uix-neon-green to-uix-neon-teal bg-clip-text text-transparent">
              {projectTitle}
            </h1>
          </div>
          <p className="text-xl text-uix-purple-100">
            Un proyecto cinematográfico que demuestra nuestra metodología UX/UI
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-uix-neon-green">↓ Scroll para explorar</div>
        </motion.div>
      </motion.section>

      {/* Bloque 2: Objetivo y Reto */}
      <ScrollBlock number={2} title="Objetivo y Reto">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4 p-6 bg-uix-purple-900/50 rounded-lg border border-uix-purple-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <h3 className="text-2xl font-bold text-uix-neon-green">Objetivo</h3>
            <p className="text-uix-purple-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4 p-6 bg-uix-purple-900/50 rounded-lg border border-uix-purple-700"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-200px" }}
          >
            <h3 className="text-2xl font-bold text-uix-neon-green">Reto</h3>
            <p className="text-uix-purple-100">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </motion.div>
        </div>
      </ScrollBlock>

      {/* Bloque 3: Proceso */}
      <ScrollBlock number={3} title="Proceso">
        <div className="space-y-6">
          {[
            { step: "Discovery", desc: "Investigación y entrevistas con usuarios" },
            { step: "Design", desc: "Wireframes y prototipos de alta fidelidad" },
            { step: "Testing", desc: "Pruebas con usuarios reales" },
            { step: "Iterate", desc: "Refinamiento basado en feedback" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-200px" }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-uix-neon-green to-uix-neon-teal flex-shrink-0 flex items-center justify-center text-uix-blue-900 font-bold">
                {i + 1}
              </div>
              <div>
                <h4 className="text-xl font-bold text-uix-neon-green mb-2">
                  {item.step}
                </h4>
                <p className="text-uix-purple-100">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollBlock>

      {/* Bloque 4: Resultados */}
      <ScrollBlock number={4} title="Resultados">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Usabilidad", value: "95%", icon: "🎯" },
            { label: "Satisfacción", value: "4.8/5", icon: "⭐" },
            { label: "Conversión", value: "+45%", icon: "📈" },
          ].map((result, i) => (
            <motion.div
              key={i}
              className="p-6 bg-uix-purple-900/50 rounded-lg border border-uix-purple-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-200px" }}
            >
              <div className="text-4xl mb-2">{result.icon}</div>
              <p className="text-uix-purple-100 text-sm mb-2">{result.label}</p>
              <p className="text-3xl font-bold text-uix-neon-green">
                {result.value}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollBlock>

      {/* Bloque 5: Mockups */}
      <ScrollBlock number={5} title="Mockups y Prototipos">
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="aspect-video bg-gradient-to-br from-uix-purple-700 to-uix-blue-700 rounded-lg flex items-center justify-center text-2xl font-bold text-uix-purple-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-200px" }}
            >
              Mockup {i}
            </motion.div>
          ))}
        </div>
      </ScrollBlock>

      {/* Bloque 6: Métricas */}
      <ScrollBlock number={6} title="Métricas Cuantitativas">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: "Tasa de Éxito", value: "92.5%", change: "+18.2%" },
            { label: "Tiempo Promedio", value: "2.3s", change: "-45%" },
            { label: "Tasa de Conversión", value: "8.7%", change: "+62%" },
            { label: "NPS Score", value: 72, change: "+31 pts" },
          ].map((metric, i) => (
            <motion.div
              key={i}
              className="p-6 bg-uix-purple-900/50 rounded-lg border border-uix-purple-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-200px" }}
            >
              <p className="text-uix-purple-100 text-sm mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-uix-neon-green mb-2">
                {metric.value}
              </p>
              <p className="text-uix-neon-teal text-sm">{metric.change}</p>
            </motion.div>
          ))}
        </div>
      </ScrollBlock>

      {/* Bloque 7: Antes/Después */}
      <ScrollBlock number={7} title="Comparativa: Antes y Después">
        <div className="space-y-6">
          {[
            {
              title: "Dashboard Overview",
              before: "Estado inicial con información desorganizada",
              after: "Dashboard restructurado con data clara",
            },
            {
              title: "Mobile Experience",
              before: "Navegación confusa en dispositivos pequeños",
              after: "Flujo intuitivo y responsive",
            },
          ].map((comparison, i) => (
            <motion.div
              key={i}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-200px" }}
            >
              <h4 className="text-xl font-bold text-uix-neon-green">
                {comparison.title}
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-uix-purple-900/30 border border-red-500/30 rounded-lg">
                  <p className="text-sm font-semibold text-red-400 mb-2">
                    Antes
                  </p>
                  <p className="text-uix-purple-100">{comparison.before}</p>
                </div>
                <div className="p-4 bg-uix-purple-900/30 border border-uix-neon-green/30 rounded-lg">
                  <p className="text-sm font-semibold text-uix-neon-green mb-2">
                    Después
                  </p>
                  <p className="text-uix-purple-100">{comparison.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollBlock>

      {/* Bloque 8: Testimonios */}
      <ScrollBlock number={8} title="Testimonios">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              quote:
                "El equipo entregó un producto excepcional que superó nuestras expectativas.",
              author: "CEO de Cliente A",
              role: "Founder & CEO",
            },
            {
              quote:
                "La metodología UX fue impecable y los resultados hablan por sí solos.",
              author: "Product Manager de Cliente B",
              role: "Product Manager",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-6 bg-uix-purple-900/50 rounded-lg border border-uix-purple-700 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-200px" }}
            >
              <p className="text-lg text-uix-purple-100 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-bold text-uix-neon-green">
                  {testimonial.author}
                </p>
                <p className="text-uix-purple-100/70 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollBlock>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-br from-uix-purple-900 to-uix-blue-900 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-uix-neon-green">
            ¿Te gustó este proyecto?
          </h2>
          <p className="text-uix-purple-100 text-lg">
            Explora más trabajos o contáctanos para tu próximo proyecto
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/projects">
              <motion.button
                className="px-6 py-3 bg-uix-neon-green text-uix-blue-900 rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Más Proyectos
              </motion.button>
            </Link>
            <motion.button
              className="px-6 py-3 border-2 border-uix-neon-green text-uix-neon-green rounded-lg font-semibold hover:bg-uix-neon-green/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
