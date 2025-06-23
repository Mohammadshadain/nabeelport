import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Skills: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Java", level: 80 },
        { name: "C", level: 75 }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "Tailwind CSS", level: 90 },
        { name: "NodeJS", level: 85 },
        { name: "Pandas", level: 80 },
        { name: "NumPy", level: 78 },
        { name: "Node-RED", level: 85 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "VS Code", level: 95 },
        { name: "Git/GitHub", level: 88 },
        { name: "MySQL", level: 85 },
        { name: "Oracle", level: 80 },
        { name: "IoT Sensors", level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
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
              Quantum Skills
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies mastered during my journey across the digital cosmos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-orange-400 font-bold">{skill.level}%</span>
                    </div>
                    
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full relative"
                      >
                        <motion.div
                          animate={{ x: [-10, 10, -10] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "8.0", label: "CGPA" },
            { number: "2+", label: "Years Learning" },
            { number: "10+", label: "Technologies" },
            { number: "3+", label: "Major Projects" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20"
            >
              <motion.h4
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-orange-400 mb-2"
              >
                {stat.number}
              </motion.h4>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;