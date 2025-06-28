import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
  color: string;
  trailLength: number;
  bindBlowChance: number;
  isBindBlowing: boolean;
  bindBlowParticles?: BindBlowParticle[];
}

interface BindBlowParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
}

interface StardustParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
}

const StarfallAnimation: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [stardust, setStardust] = useState<StardustParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const colors = [
    '#ffffff', '#ffd700', '#87ceeb', '#ffa500', '#ff69b4', 
    '#98fb98', '#dda0dd', '#f0e68c', '#add8e6', '#ffb6c1'
  ];

  const createStar = (): Star => {
    const size = Math.random() * 4 + 1;
    return {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -20,
      size,
      speed: Math.random() * 3 + 1,
      brightness: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      trailLength: Math.random() * 30 + 20,
      bindBlowChance: Math.random() * 0.02 + 0.005, // 0.5% to 2.5% chance per frame
      isBindBlowing: false
    };
  };

  const createBindBlowParticles = (star: Star): BindBlowParticle[] => {
    const particleCount = Math.floor(Math.random() * 8) + 12; // 12-20 particles
    const particles: BindBlowParticle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      particles.push({
        id: Math.random(),
        x: star.x,
        y: star.y,
        angle,
        speed: Math.random() * 4 + 2,
        size: Math.random() * 3 + 1,
        color: star.color,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    
    return particles;
  };

  const createStardust = (x: number, y: number, color: string): StardustParticle[] => {
    const dustCount = Math.floor(Math.random() * 5) + 3;
    const particles: StardustParticle[] = [];
    
    for (let i = 0; i < dustCount; i++) {
      particles.push({
        id: Math.random(),
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 1 + 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color,
        life: 1.0
      });
    }
    
    return particles;
  };

  useEffect(() => {
    const animate = () => {
      setStars(prevStars => {
        const newStars = [...prevStars];
        const starsToRemove: number[] = [];
        const newStardust: StardustParticle[] = [];

        // Update existing stars
        newStars.forEach((star, index) => {
          if (!star.isBindBlowing) {
            star.y += star.speed;
            
            // Create stardust trail
            if (Math.random() < 0.3) {
              newStardust.push(...createStardust(star.x, star.y, star.color));
            }
            
            // Check for bindBlow effect
            if (Math.random() < star.bindBlowChance && star.y > 100 && star.y < window.innerHeight - 200) {
              star.isBindBlowing = true;
              star.bindBlowParticles = createBindBlowParticles(star);
            }
            
            // Remove stars that have fallen off screen
            if (star.y > window.innerHeight + 50) {
              starsToRemove.push(index);
            }
          } else {
            // Handle bindBlow particles
            if (star.bindBlowParticles) {
              star.bindBlowParticles.forEach(particle => {
                particle.x += Math.cos(particle.angle) * particle.speed;
                particle.y += Math.sin(particle.angle) * particle.speed;
                particle.speed *= 0.98; // Slow down over time
                particle.opacity *= 0.95; // Fade out
                particle.size *= 0.99; // Shrink
              });
              
              // Remove bindBlow particles that have faded out
              star.bindBlowParticles = star.bindBlowParticles.filter(p => p.opacity > 0.01 && p.size > 0.1);
              
              // Remove star when all particles are gone
              if (star.bindBlowParticles.length === 0) {
                starsToRemove.push(index);
              }
            }
          }
        });

        // Remove stars marked for removal
        starsToRemove.reverse().forEach(index => {
          newStars.splice(index, 1);
        });

        // Add new stardust
        if (newStardust.length > 0) {
          setStardust(prevDust => [...prevDust, ...newStardust]);
        }

        // Add new stars randomly
        if (Math.random() < 0.1 && newStars.length < 15) {
          newStars.push(createStar());
        }

        return newStars;
      });

      // Update stardust
      setStardust(prevDust => {
        return prevDust
          .map(dust => ({
            ...dust,
            x: dust.x + dust.vx,
            y: dust.y + dust.vy,
            life: dust.life - 0.02,
            opacity: dust.opacity * 0.98
          }))
          .filter(dust => dust.life > 0 && dust.opacity > 0.01);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize with some stars
    const initialStars = Array.from({ length: 5 }, createStar);
    setStars(initialStars);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      <AnimatePresence>
        {/* Regular falling stars */}
        {stars.map(star => (
          <React.Fragment key={star.id}>
            {!star.isBindBlowing ? (
              <motion.div
                className="absolute"
                style={{
                  left: star.x,
                  top: star.y,
                  width: star.size,
                  height: star.size,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: star.brightness,
                  scale: [0.8, 1.2, 0.8],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  scale: {
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Star core */}
                <div
                  className="w-full h-full rounded-full relative"
                  style={{
                    backgroundColor: star.color,
                    boxShadow: `0 0 ${star.size * 3}px ${star.color}80, 0 0 ${star.size * 6}px ${star.color}40`,
                  }}
                />
                
                {/* Star trail */}
                <motion.div
                  className="absolute top-1/2 left-1/2 origin-center"
                  style={{
                    width: 2,
                    height: star.trailLength,
                    background: `linear-gradient(to bottom, ${star.color}80, transparent)`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  animate={{
                    opacity: [0.6, 0.3, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Star cross effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="absolute h-0.5 bg-current opacity-60"
                    style={{ 
                      width: star.size * 3,
                      color: star.color 
                    }}
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute w-0.5 bg-current opacity-60"
                    style={{ 
                      height: star.size * 3,
                      color: star.color 
                    }}
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            ) : (
              // BindBlow effect particles
              star.bindBlowParticles?.map(particle => (
                <motion.div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    left: particle.x,
                    top: particle.y,
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: particle.color,
                    opacity: particle.opacity,
                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}60`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 0.5],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, ease: "easeOut" }
                  }}
                />
              ))
            )}
          </React.Fragment>
        ))}

        {/* Stardust particles */}
        {stardust.map(dust => (
          <motion.div
            key={dust.id}
            className="absolute rounded-full"
            style={{
              left: dust.x,
              top: dust.y,
              width: dust.size,
              height: dust.size,
              backgroundColor: dust.color,
              opacity: dust.opacity,
              boxShadow: `0 0 ${dust.size}px ${dust.color}40`,
            }}
            animate={{
              scale: [1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 2,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Ambient magical glow */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 30%, rgba(135, 206, 235, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default StarfallAnimation;