import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const Education: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  const educationData = [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Integral University, Lucknow",
      period: "August 2022 – June 2025",
      grade: "CGPA: 8.0/10.0",
      icon: GraduationCap,
      color: "from-blue-500 to-purple-600"
    },
    {
      degree: "Diploma in Engineering",
      institution: "RR Group of Institutions, Lucknow",
      period: "July 2018 – June 2021",
      grade: "Secured 69.67%",
      icon: Award,
      color: "from-green-500 to-teal-600"
    },
    {
      degree: "High School (Intermediate)",
      institution: "SCL Inter College",
      period: "April 2017 – June 2018",
      grade: "Secured 65.34%",
      icon: Calendar,
      color: "from-orange-500 to-red-600"
    }
  ];

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const title = "EDUCATION";

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Graduation Cap Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <GraduationCap size={32} className="text-white" />
            </div>
          </motion.div>

          {/* Animated Letters */}
          <div className="flex justify-center items-center space-x-2 mb-4">
            {title.split('').map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent inline-block"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto max-w-xs mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Academic journey through the quantum computing realm of knowledge
          </motion.p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-red-500 z-0"
          />

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r ${edu.color} rounded-full border-4 border-black z-10 flex items-center justify-center`}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(255, 69, 0, 0.2)"
                  }}
                  className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 bg-gradient-to-r ${edu.color} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <edu.icon size={24} className="text-white" />
                    </motion.div>

                    {/* Degree */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      viewport={{ once: true }}
                      className="text-xl font-bold text-white mb-2"
                    >
                      {edu.degree}
                    </motion.h3>

                    {/* Institution */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="text-orange-400 font-semibold mb-2"
                    >
                      {edu.institution}
                    </motion.p>

                    {/* Period */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-400 mb-2"
                    >
                      <Calendar size={16} className="mr-2" />
                      {edu.period}
                    </motion.div>

                    {/* Grade */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <Award size={16} className="mr-2 text-yellow-500" />
                      <span className="text-yellow-400 font-semibold">{edu.grade}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "8.0", label: "Current CGPA", icon: "🎯" },
            { number: "7+", label: "Years of Study", icon: "📚" },
            { number: "3", label: "Academic Levels", icon: "🏆" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 69, 0, 0.2)"
              }}
              className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <motion.h4
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
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

export default Education;