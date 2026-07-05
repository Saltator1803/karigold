"use client";
import { motion } from "framer-motion";

export default function CompanyHistory() {
  return (
    <section className="bg-[#050505] text-white py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center relative z-10">
        <motion.div 
          className="w-full md:w-5/12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative aspect-[3/4] bg-[#0A0A0A] border border-white/10 overflow-hidden">
             <img src="/images/heritage-workshop.png" alt="Karigold Heritage Workshop" className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-6 left-6 z-10">
               <span className="text-[10px] tracking-[0.5em] text-[#D4AF37] block drop-shadow-md">EST. 1984</span>
             </div>
          </div>
        </motion.div>

        <motion.div 
          className="w-full md:w-7/12 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
            <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-bold">Our Legacy</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-thin tracking-tighter leading-[1.1] mb-8">
            Four Decades <br/>
            <span className="text-gray-500 italic">of Unseen Perfection.</span>
          </h2>
          
          <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed max-w-2xl">
            <p>
              Karigold was born in the narrow, echoing alleys of the old goldsmithing district. What started as a single family workshop has evolved into a sanctuary for India's finest artisans.
            </p>
            <p>
              We believe that true luxury isn't loud. It is the quiet weight of pure gold against the skin, the precision of a microscopic clasp, and the integrity of a piece hand-beaten to outlast its maker. 
            </p>
            <p className="text-gray-300">
              No compromises. No cutting corners. Just raw elements transformed by human hands.
            </p>
          </div>

          <motion.div 
             className="mt-12"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5 }}
          >
             <button className="flex items-center gap-4 group">
                <span className="text-sm tracking-widest uppercase transition-colors group-hover:text-[#D4AF37]">Read the Manifesto</span>
                <span className="w-8 h-[1px] bg-white transition-all group-hover:w-12 group-hover:bg-[#D4AF37]"></span>
             </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
