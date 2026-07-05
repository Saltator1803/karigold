"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-2xl font-light tracking-[0.3em] text-[#D4AF37]">KARIGOLD</span>
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500">Fine Jewelry Forge</span>
      </div>
      <div className="flex gap-8 items-center">
        <button className="text-xs uppercase tracking-widest hover:text-[#D4AF37] transition-colors">The Workshop</button>
        <button className="px-8 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 text-xs uppercase tracking-widest">
          Acquire
        </button>
      </div>
    </motion.nav>
  );
}
