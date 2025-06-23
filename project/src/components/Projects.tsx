import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const projects = [
    {
      title: "IoT Based Smart Agriculture System",
      description: "Designed a real-time monitoring system using sensors to track soil and environment data. This innovative project combines IoT technology with agricultural needs to create smart farming solutions.",
      image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Python", "Node-RED", "HiveMQ", "DHT11", "Soil Moisture Sensor", "VS Code"],
      liveUrl: "#",
      githubUrl: "https://github.com/nabeelshaikh99202",
      featured: true
    },
    {
      title: "Reigns E-Commerce Website",
      description: "Developed a comprehensive e-commerce website focused on online clothing sales. Created an engaging and user-friendly interface with frontend technologies and implemented backend functionalities for product management.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["HTML", "CSS", "JavaScript", "Frontend Design", "User Interface"],
      liveUrl: "#",
      githubUrl: "https://github.com/nabeelshaikh99202",
      featured: true
    },
    {
      title: "NEET Success Path",
      description: "A comprehensive web application for coaching classes focused on NEET preparation. Built with modern frontend technologies to provide an interactive learning platform for medical entrance exam aspirants.",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web App"],
      liveUrl: "https://neet-success-path.vercel.app/",
      githubUrl: "https://github.com/nabeelshaikh99202",
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Quantum Missions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Exploring the digital universe through innovative projects
          </p>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 69, 0, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {project.featured && (
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    Featured
                  </motion.div>
                )}
              </motion.div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <motion.h3
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-white"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-300 leading-relaxed"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </motion.a>
                  
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-400 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
                  >
                    <Github size={18} />
                    Source Code
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;