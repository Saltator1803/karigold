"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? "nav-scroll-blur py-3 bg-black/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* LOGO */}
        <div className="flex flex-col text-left">
          <a href="#" className="font-serif text-xl md:text-2xl font-bold tracking-[0.25em] text-[#D4AF37] hover:opacity-90 transition-opacity">
            KARIGOLD
          </a>
          <span className="text-[7px] uppercase tracking-[0.45em] text-gray-500 block -mt-0.5">
            HAUTE GOLDSMITHING
          </span>
        </div>

        {/* CENTER MENU (Hidden on mobile) */}
        <nav className="hidden xl:flex items-center gap-7 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70">
          <a href="#why-karigold" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">The Guild</a>
          <a href="#live-rates" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">Live Rates</a>
          <a href="#categories" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">Categories</a>
          <a href="#builder" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">Custom Craft</a>
          <a href="#transparency" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">Transparency</a>
          <a href="#karigars" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">Master Karigars</a>
          <a href="#huid" className="hover:text-[#D4AF37] hover:scale-105 transition-all duration-300">Verify HUID</a>
        </nav>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Search Icon */}
          <button className="text-white/80 hover:text-[#D4AF37] transition-colors p-1" aria-label="Search">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Wishlist Icon */}
          <button className="text-white/80 hover:text-[#D4AF37] transition-colors p-1" aria-label="Wishlist">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {/* Cart Icon */}
          <button className="text-white/80 hover:text-[#D4AF37] transition-colors p-1 relative" aria-label="Cart">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full text-[6px] text-black font-bold flex items-center justify-center">1</span>
          </button>

          {/* Login Icon */}
          <button className="text-white/80 hover:text-[#D4AF37] transition-colors p-1" aria-label="Account">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-white/80 hover:text-[#D4AF37] transition-colors p-1" 
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU MODAL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 bg-black/95 backdrop-blur-xl px-6 py-12 flex flex-col gap-6 xl:hidden border-t border-white/5"
          >
            <nav className="flex flex-col gap-5 text-sm uppercase tracking-[0.25em] font-medium text-left">
              <a 
                href="#why-karigold" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                The Guild
              </a>
              <a 
                href="#live-rates" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                Live Rates
              </a>
              <a 
                href="#categories" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                Categories
              </a>
              <a 
                href="#builder" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                Custom Craft
              </a>
              <a 
                href="#transparency" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                Transparency
              </a>
              <a 
                href="#karigars" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                Master Karigars
              </a>
              <a 
                href="#huid" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors"
              >
                Verify HUID
              </a>
            </nav>
            <div className="mt-8">
              <a 
                href="#builder"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded transition-all duration-300"
              >
                Bespoke Design Suite
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
