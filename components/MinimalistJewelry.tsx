"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const items = [
  { id: 1, name: "The Quiet Echo ring", price: "₹24,000", type: "18K Solid Gold", image: "/images/quiet-echo-ring.png" },
  { id: 2, name: "Silhouette Chain", price: "₹42,000", type: "22K Solid Gold", image: "/images/silhouette-chain.png" },
  { id: 3, name: "Eternity Band", price: "₹31,000", type: "18K White Gold", image: "/images/eternity-band.png" },
];

export default function MinimalistJewelry() {
  return (
    <section className="py-32 bg-black text-white px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-thin tracking-tighter mb-4">
              The Minimalist <br /> Collection
            </h2>
            <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase">
              Whispers of Gold. Everyday Elegance.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#D4AF37] border-b border-[#D4AF37]/30 pb-1 text-sm tracking-widest uppercase hover:border-[#D4AF37] transition-colors"
          >
            Explore Collection
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] bg-white/5 border border-white/10 relative overflow-hidden mb-6 flex flex-col items-center justify-center group-hover:border-[#D4AF37]/50 transition-colors duration-500 rounded-none">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                   <span className="text-xs tracking-widest text-[#D4AF37] font-bold drop-shadow-md">VIEW</span>
                   <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-light tracking-wide mb-1 group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{item.type}</p>
                </div>
                <span className="text-sm text-gray-400">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
