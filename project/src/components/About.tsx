import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Palette, Rocket, Users } from 'lucide-react';

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const features = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Expert in HTML, CSS, JavaScript, and modern web technologies"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user experiences"
    },
    {
      icon: Rocket,
      title: "IoT & AI",
      description: "Building smart systems with IoT sensors and AI concepts"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Experienced in project development and team coordination"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A passionate developer exploring the frontiers of web technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              From Code to Innovation
            </h3>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Hello! I'm Nabeel Siddiqui, a passionate Computer Science Engineering graduate and Frontend Engineer based in Lucknow, India. I hold a Bachelor's degree from Integral University with a strong CGPA of 8. 
            I specialize in creating innovative digital solutions and crafting seamless user experiences through code.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              My expertise spans across frontend technologies including HTML, CSS, JavaScript, and modern frameworks. 
              I also have experience with backend technologies like Python and NodeJS, along with database management 
              using MySQL and Oracle. I believe in writing clean, efficient code and creating user experiences that 
              are both beautiful and functional.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies like IoT and AI, working on innovative 
              projects, or contributing to web development solutions. I'm always excited to take on new challenges 
              and collaborate on cutting-edge projects.
            </p>

            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {['Python', 'JavaScript', 'HTML/CSS', 'NodeJS', 'MySQL', 'IoT'].map((tech, index) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4"
                >
                  <feature.icon size={24} className="text-white" />
                </motion.div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;