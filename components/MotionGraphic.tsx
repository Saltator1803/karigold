"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MotionGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values for parallax and rotation effects
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [-90, 270]);
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[60vh] md:h-[80vh] bg-black overflow-hidden flex items-center justify-center border-y border-white/5"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-black to-black opacity-60"></div>
      
      {/* Central typography floating above graphics */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute z-20 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[#D4AF37] uppercase tracking-[0.5em] text-xs font-bold mb-4">The Essence</span>
        <h2 className="text-4xl md:text-6xl font-thin tracking-tighter text-white/90">
          Liquid Geometry
        </h2>
      </motion.div>

      {/* Abstract Motion Graphic Elements */}
      <div className="relative w-full h-full max-w-3xl flex items-center justify-center z-10 pointer-events-none mix-blend-screen">
        
        {/* Ring 1 - Outer */}
        <motion.div 
          style={{ rotate: rotate1 }}
          className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-[#D4AF37]/30 border-t-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.1)]"
        />

        {/* Ring 2 - Middle Dashed */}
        <motion.div 
           style={{ rotate: rotate2 }}
           className="absolute w-[220px] h-[220px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-[#D4AF37]/40"
        />

        {/* Ring 3 - Inner Glowing */}
        <motion.div 
           style={{ rotate: rotate3 }}
           className="absolute w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full border-2 border-[#D4AF37]/60 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        />

        {/* Abstract Floating Particles / Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            viewport={{ once: false, margin: "-100px" }}
            className="absolute rounded-full bg-[#D4AF37] blur-[2px]"
            style={{
              width: `${(i % 3) * 4 + 4}px`,
              height: `${(i % 3) * 4 + 4}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}

      </div>
    </section>
  );
}
