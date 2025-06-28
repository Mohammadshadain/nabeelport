import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CelestialObject {
  id: number;
  type: 'star' | 'planet' | 'comet' | 'nebula';
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  rotation?: number;
  twinkleDelay?: number;
}

const CelestialParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [celestialObjects, setCelestialObjects] = useState<CelestialObject[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Different parallax speeds for layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const layer4Y = useTransform(scrollYProgress, [0, 1], ['0%', '250%']);

  useEffect(() => {
    const generateCelestialObjects = () => {
      const objects: CelestialObject[] = [];
      
      // Generate stars
      for (let i = 0; i < 150; i++) {
        objects.push({
          id: i,
          type: 'star',
          x: Math.random() * 100,
          y: Math.random() * 200,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
          color: ['#ffffff', '#ffd700', '#87ceeb', '#ffa500'][Math.floor(Math.random() * 4)],
          twinkleDelay: Math.random() * 3
        });
      }
      
      // Generate planets
      for (let i = 0; i < 8; i++) {
        objects.push({
          id: i + 150,
          type: 'planet',
          x: Math.random() * 100,
          y: Math.random() * 150,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random() * 0.6 + 0.3,
          color: ['#ff6b47', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
          rotation: Math.random() * 360
        });
      }
      
      // Generate comets
      for (let i = 0; i < 5; i++) {
        objects.push({
          id: i + 158,
          type: 'comet',
          x: Math.random() * 100,
          y: Math.random() * 120,
          size: Math.random() * 8 + 4,
          speed: Math.random() * 0.8 + 0.2,
          opacity: Math.random() * 0.7 + 0.2,
          color: '#00d4ff'
        });
      }
      
      // Generate nebula clouds
      for (let i = 0; i < 12; i++) {
        objects.push({
          id: i + 163,
          type: 'nebula',
          x: Math.random() * 100,
          y: Math.random() * 180,
          size: Math.random() * 40 + 20,
          speed: Math.random() * 0.2 + 0.02,
          opacity: Math.random() * 0.3 + 0.1,
          color: ['#ff6b9d', '#c44569', '#6c5ce7', '#a29bfe', '#fd79a8'][Math.floor(Math.random() * 5)]
        });
      }
      
      setCelestialObjects(objects);
    };

    generateCelestialObjects();
  }, []);

  const renderStar = (obj: CelestialObject) => (
    <motion.div
      key={obj.id}
      className="absolute pointer-events-none"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        width: `${obj.size}px`,
        height: `${obj.size}px`,
      }}
      animate={{
        opacity: [obj.opacity * 0.3, obj.opacity, obj.opacity * 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: obj.twinkleDelay,
        ease: "easeInOut"
      }}
    >
      <div
        className="w-full h-full rounded-full shadow-lg"
        style={{
          backgroundColor: obj.color,
          boxShadow: `0 0 ${obj.size * 2}px ${obj.color}40`,
        }}
      />
      {/* Star cross effect */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: obj.color }}
      >
        <div className="absolute w-full h-0.5 bg-current opacity-60" />
        <div className="absolute h-full w-0.5 bg-current opacity-60" />
      </div>
    </motion.div>
  );

  const renderPlanet = (obj: CelestialObject) => (
    <motion.div
      key={obj.id}
      className="absolute pointer-events-none"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        width: `${obj.size}px`,
        height: `${obj.size}px`,
      }}
      animate={{
        rotate: 360,
        y: [0, -20, 0],
      }}
      transition={{
        rotate: {
          duration: 20 + Math.random() * 30,
          repeat: Infinity,
          ease: "linear"
        },
        y: {
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <div
        className="w-full h-full rounded-full shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: obj.color,
          opacity: obj.opacity,
          boxShadow: `0 0 ${obj.size}px ${obj.color}30, inset -${obj.size/4}px -${obj.size/4}px ${obj.size/2}px rgba(0,0,0,0.3)`
        }}
      >
        {/* Planet surface details */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), 
                        radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2) 0%, transparent 40%)`
          }}
        />
      </div>
    </motion.div>
  );

  const renderComet = (obj: CelestialObject) => (
    <motion.div
      key={obj.id}
      className="absolute pointer-events-none"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
      }}
      animate={{
        x: [0, -100, 0],
        y: [0, 50, 0],
        opacity: [obj.opacity, obj.opacity * 0.3, obj.opacity],
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Comet head */}
      <div
        className="w-3 h-3 rounded-full relative"
        style={{
          backgroundColor: obj.color,
          boxShadow: `0 0 ${obj.size}px ${obj.color}80`,
        }}
      />
      {/* Comet tail */}
      <div
        className="absolute top-1/2 left-full w-16 h-0.5 -translate-y-1/2 origin-left"
        style={{
          background: `linear-gradient(to right, ${obj.color}80, transparent)`,
          transform: 'translateY(-50%) rotate(15deg)',
        }}
      />
      <div
        className="absolute top-1/2 left-full w-12 h-0.5 -translate-y-1/2 origin-left"
        style={{
          background: `linear-gradient(to right, ${obj.color}60, transparent)`,
          transform: 'translateY(-50%) rotate(-10deg)',
        }}
      />
    </motion.div>
  );

  const renderNebula = (obj: CelestialObject) => (
    <motion.div
      key={obj.id}
      className="absolute pointer-events-none"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        width: `${obj.size}px`,
        height: `${obj.size}px`,
      }}
      animate={{
        scale: [0.8, 1.1, 0.8],
        rotate: [0, 180, 360],
        opacity: [obj.opacity * 0.5, obj.opacity, obj.opacity * 0.5],
      }}
      transition={{
        duration: 25 + Math.random() * 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div
        className="w-full h-full rounded-full blur-sm"
        style={{
          background: `radial-gradient(circle, ${obj.color}40 0%, ${obj.color}20 40%, transparent 70%)`,
        }}
      />
    </motion.div>
  );

  const renderCelestialObject = (obj: CelestialObject) => {
    switch (obj.type) {
      case 'star':
        return renderStar(obj);
      case 'planet':
        return renderPlanet(obj);
      case 'comet':
        return renderComet(obj);
      case 'nebula':
        return renderNebula(obj);
      default:
        return null;
    }
  };

  const getObjectsByLayer = (layer: number) => {
    const layerSize = Math.ceil(celestialObjects.length / 4);
    const startIndex = (layer - 1) * layerSize;
    const endIndex = Math.min(startIndex + layerSize, celestialObjects.length);
    return celestialObjects.slice(startIndex, endIndex);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
      {/* Layer 1 - Slowest (Nebulae and distant objects) */}
      <motion.div
        style={{ y: layer1Y }}
        className="absolute inset-0 w-full h-[200vh]"
      >
        {getObjectsByLayer(1).map(renderCelestialObject)}
      </motion.div>

      {/* Layer 2 - Medium slow (Planets) */}
      <motion.div
        style={{ y: layer2Y }}
        className="absolute inset-0 w-full h-[200vh]"
      >
        {getObjectsByLayer(2).map(renderCelestialObject)}
      </motion.div>

      {/* Layer 3 - Medium fast (Comets) */}
      <motion.div
        style={{ y: layer3Y }}
        className="absolute inset-0 w-full h-[200vh]"
      >
        {getObjectsByLayer(3).map(renderCelestialObject)}
      </motion.div>

      {/* Layer 4 - Fastest (Stars) */}
      <motion.div
        style={{ y: layer4Y }}
        className="absolute inset-0 w-full h-[200vh]"
      >
        {getObjectsByLayer(4).map(renderCelestialObject)}
      </motion.div>

      {/* Shooting stars */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            x: [-100, window.innerWidth + 100],
            y: [0, 200],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 8 + Math.random() * 5,
            ease: "easeOut"
          }}
        >
          <div
            className="absolute top-0 left-0 w-20 h-0.5 origin-left"
            style={{
              background: 'linear-gradient(to right, #ffffff80, transparent)',
              transform: 'rotate(30deg)',
            }}
          />
        </motion.div>
      ))}

      {/* Cosmic dust overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 107, 71, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(69, 183, 209, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 70%)
          `,
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default CelestialParallax;