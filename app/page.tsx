"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContactModal } from "./components/contact-modal"
import { Github, ArrowRight, Code2, Zap, Globe, Database, Cpu, Rocket } from "lucide-react"

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const y1 = useTransform(smoothProgress, [0, 1], [0, -200])
  const y2 = useTransform(smoothProgress, [0, 1], [0, -500])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const skills = [
    { name: "Frontend", icon: Code2, percentage: 95 },
    { name: "Backend", icon: Database, percentage: 90 },
    { name: "Mobile", icon: Zap, percentage: 85 },
    { name: "Cloud", icon: Globe, percentage: 88 },
    { name: "DevOps", icon: Cpu, percentage: 82 },
  ]

  const projects = [
    {
      id: 1,
      title: "Example Project 1",
      subtitle: "Web Application",
      description: "A modern web application showcasing responsive design, user authentication, and real-time features",
      tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      year: "2024",
      status: "Live",
    },
    {
      id: 2,
      title: "Example Project 2",
      subtitle: "E-commerce Platform",
      description: "Full-featured online store with payment processing, inventory management, and admin dashboard",
      tech: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
      year: "2024",
      status: "Beta",
    },
    {
      id: 3,
      title: "Example Project 3",
      subtitle: "Mobile App",
      description: "Cross-platform mobile application with offline capabilities and push notifications",
      tech: ["React Native", "Firebase", "Redux", "TypeScript"],
      year: "2023",
      status: "Live",
    },
  ]

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Enhanced Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: cursorVariant === "hover" ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-8 h-8 border border-white/30 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: cursorVariant === "hover" ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.02 }}
      />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />

        {/* Animated Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">JOE DADA</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["Work", "About", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  className="text-gray-400 hover:text-white transition-colors relative group cursor-pointer"
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  onClick={() => item === "Contact" && setIsContactModalOpen(true)}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <motion.div className="max-w-6xl mx-auto text-center" style={{ y: y1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-lg text-gray-400 mb-4 font-mono">Hello, I'm</div>
            <h1 className="text-7xl md:text-9xl font-black leading-none mb-6">
              <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                JOE
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                DADA
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed">
              I build <span className="text-cyan-400 font-semibold">exceptional</span> digital experiences
              <br />
              with modern technology
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Full-stack developer specializing in modern web applications and user experiences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-4 rounded-full group cursor-pointer"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full bg-transparent cursor-pointer"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              onClick={() => setIsContactModalOpen(true)}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="relative py-32 px-8">
        <motion.div className="max-w-6xl mx-auto" style={{ y: y2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              EXPERTISE
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Technologies I use to bring ideas to life</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="cursor-pointer"
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300">
                  <skill.icon className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{skill.name}</h3>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">{skill.percentage}%</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              SELECTED WORK
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Projects that showcase modern web development</p>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="group"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 hover:bg-white/10 transition-all duration-500">
                  <div className="flex flex-col lg:flex-row items-start gap-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm text-gray-500 font-mono">0{project.id}</span>
                        <span className="text-sm text-cyan-400 font-semibold px-3 py-1 bg-cyan-400/10 rounded-full">
                          {project.status}
                        </span>
                        <span className="text-sm text-gray-500">{project.year}</span>
                      </div>

                      <h3 className="text-4xl font-black mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xl text-gray-400 mb-6">{project.subtitle}</p>
                      <p className="text-lg text-gray-300 mb-8 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-sm text-gray-400 px-4 py-2 bg-white/5 rounded-full border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-3 rounded-full cursor-pointer">
                          View Demo
                        </Button>
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full bg-transparent cursor-pointer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Source
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 flex items-center justify-center">
                        <Rocket className="h-24 w-24 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              LET'S WORK TOGETHER
            </h2>
            <p className="text-2xl text-gray-300 mb-16 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's build something extraordinary.
            </p>

            <div className="flex justify-center gap-8 mb-16">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Github className="h-6 w-6" />
              </motion.a>
            </div>

            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 font-semibold px-12 py-4 rounded-full text-lg cursor-pointer"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              onClick={() => setIsContactModalOpen(true)}
            >
              Start a Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <p className="text-gray-500 mb-4 md:mb-0">© 2024 Joe Dada. Crafted with precision.</p>
            <p className="text-gray-500 text-sm">Built with Next.js, Framer Motion & Tailwind CSS</p>
          </div>

          {/* Source Code Button */}
          <div className="text-center">
            <motion.a
              href="https://github.com/yourusername/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <Github className="h-4 w-4" />
              <span className="text-sm font-medium">View Source Code</span>
            </motion.a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  )
}
