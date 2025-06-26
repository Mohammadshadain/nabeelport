import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import nabeelImg from '../assets/nabeel.jpg';


const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fullText = "Welcome to my Digital Universe";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{ y, opacity }}
        className="text-center z-10 w-full max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          {/* Profile Image with Quantum-themed styling */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-1"
              >
                <div className="w-full h-full rounded-full bg-black"></div>
              </motion.div>
             <motion.img
  src={nabeelImg}
  alt="Nabeel Siddiqui"
  className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-orange-500 shadow-2xl transition-all duration-300"
  initial={{ opacity: 0 }}
  animate={{ opacity: imageLoaded ? 1 : 0 }}
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(255, 69, 0, 0.3)"
  }}
  transition={{ duration: 0.3 }}
  onLoad={() => setImageLoaded(true)}
  onError={() => setImageLoaded(true)}
  style={{
    filter: imageLoaded ? 'none' : 'blur(5px)',
  }}
/>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
              />
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
              NABEEL SIDDIQUI
            </span>
          </h1>
          
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-2 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Full Stack Developer
          </motion.h2>

          <motion.div
            className="text-base sm:text-lg md:text-xl text-orange-400 h-6 sm:h-8 font-mono px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="space-y-4 sm:space-y-6 px-4"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Crafting innovative digital experiences from the Full Stack frontier.
Specializing in Frontend Development, Python, and bringing ideas to life through code.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 69, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              onClick={() => {
                const element = document.querySelector('#projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-orange-500 text-orange-400 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown size={24} className="sm:w-8 sm:h-8 text-orange-400" />
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-orange-400 rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;