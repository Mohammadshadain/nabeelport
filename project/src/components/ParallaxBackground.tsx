import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '75%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0.4]);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Deep space layer */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black via-red-950 to-orange-950"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjI3IiBjeT0iMTciIHI9IjEiLz48Y2lyY2xlIGN4PSI0NyIgY3k9IjI3IiByPSIxIi8+PGNpcmNsZSBjeD0iMTciIGN5PSIzNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjM3IiBjeT0iNDciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')]" />
      </motion.div>
      
      {/* Quantum atmosphere layer */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-red-800/20 to-transparent"
      />
      
      {/* Surface dust layer */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-red-900/40 to-transparent"
      />
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className="absolute w-1 h-1 bg-orange-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;