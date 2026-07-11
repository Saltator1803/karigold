"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveGoldRates from "@/components/LiveGoldRates";
import Navbar from "@/components/Navbar";

interface GoldRate {
  pricePerGram: number;
  pricePer10g: number;
  dailyChange: string;
  isPositive: boolean;
  label: string;
}

interface GoldRatesResponse {
  gold24k: GoldRate;
  gold22k: GoldRate;
  gold18k: GoldRate;
  silver: GoldRate;
}

interface Artisan {
  id: string;
  name: string;
  role: string;
  city: string;
  experience: number;
  specialization: string[];
  story: string;
  quote: string;
  image: string;
  awards: string[];
  languages: string[];
  tools: string[];
}

const ARTISANS: Artisan[] = [
  {
    id: "ramesh-das",
    name: "Ramesh Das",
    role: "Master Filigree Artisan",
    city: "Kolkata, West Bengal",
    experience: 28,
    specialization: ["Filigree Work", "Temple Jewellery", "Hand Engraving", "Antique Finishing"],
    story: "Ramesh began crafting at the age of twelve. He specializes in the near-lost art of Tarkashi (filigree), drawing complex patterns with delicate wire that is thinner than human hair. Every ornament takes him weeks of intense, soulful attention, translating ancient Indian symmetry into wear-forever statements.",
    quote: "Gold is eternal, but it remains cold metal until the hands of a Karigar breathe life, breath, and story into it.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    awards: ["President's National Craftsmanship Award 2018", "Bengal Shilpa Ratna Medal"],
    languages: ["Bengali", "Hindi", "Odia"],
    tools: ["Blowpipe", "Forceps", "Custom Drawplates", "Carving Chisels"]
  },
  {
    id: "sunita-sharma",
    name: "Sunita Sharma",
    role: "Master Kundan & Meenakari Artisan",
    city: "Jaipur, Rajasthan",
    experience: 22,
    specialization: ["Kundan Setting", "Champlevé Enamelling", "Jadau Craft", "Gem Selection"],
    story: "Sunita Sharma is one of the few female pioneers to break into the closely-guarded Kundan guild of Jaipur. Her expertise is Meenakari (enamelling), fusing mineral dust onto pure gold surfaces at blistering kiln temperatures, creating rich vivid colors that look like liquid stained-glass caught in precious gold frames.",
    quote: "A single drop of enamel represents three days of color grinding. Real beauty cannot be rushed or mass-produced.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop",
    awards: ["Jaipur Art Guild Excellence Award 2021", "Women Artisans of India Fellowship Medal"],
    languages: ["Rajasthani", "Hindi", "English"],
    tools: ["Engraving Needles", "Hand Kiln", "Agate Burnishers", "Pure Gold Foil"]
  },
  {
    id: "arjun-solanki",
    name: "Arjun Solanki",
    role: "Master Antique Temple Goldsmith",
    city: "Rajkot, Gujarat",
    experience: 31,
    specialization: ["Repoussé & Chasing", "Solid Gold Castings", "Nagas Mythology Ornaments", "Micro Hammering"],
    story: "Arjun works in complete silence in his small workshop in Rajkot. He is celebrated for Repoussé—sculpting mythology and nature-inspired gold panels in deep relief, hammering sheets from the back with micro-precision. His temple crowns and thick bridal chokers hold structural grandeur and classic weight.",
    quote: "When I hammer the metal, I feel the heartbeat of our ancestors. The gold must sing when it is tapped.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    awards: ["Gujarati Folk Arts Master Craftsman Medal 2014"],
    languages: ["Gujarati", "Hindi"],
    tools: ["Pitch Bowl", "Embossing Hammers", "Snaffle Punches", "Charcoal Hearth"]
  }
];

const REVIEWS = [
  {
    name: "Aishwarya Rai S.",
    role: "Collector of Heritage Pieces",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    quote: "The transparency of Karigold is revolutionary. Knowing who crafted my necklace and seeing the direct wage breakdown felt as premium as the design itself.",
    rating: 5,
    city: "Mumbai, India",
    date: "14 May, 2026"
  },
  {
    name: "Vikram Malhotra",
    role: "Bespoke Patron",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "For my daughter's wedding, we wanted something timeless. The Repoussé work done by Arjun was masterclass. Truly Cartier level with a soul.",
    rating: 5,
    city: "Delhi NCR",
    date: "28 April, 2026"
  },
  {
    name: "Priyanka Mehta",
    role: "Minimalist Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    quote: "The 18K office collection is lightweight but carries weight in character. The HUID registration is incredibly reassuring. I verified it instantly.",
    rating: 5,
    city: "Bangalore",
    date: "03 June, 2026"
  }
];

const INSTAGRAM_GALLERY = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop"
];

export default function Home() {
  const [rates, setRates] = useState<GoldRatesResponse>({
    gold24k: { pricePerGram: 14736, pricePer10g: 147360, dailyChange: "+0.12%", isPositive: true, label: "24K Fine Gold (99.9% Purity)" },
    gold22k: { pricePerGram: 13508, pricePer10g: 135080, dailyChange: "+0.11%", isPositive: true, label: "22K Standard Gold (91.6% Purity)" },
    gold18k: { pricePerGram: 11077, pricePer10g: 110770, dailyChange: "+0.14%", isPositive: true, label: "18K Jewelry Gold (75.0% Purity)" },
    silver: { pricePerGram: 124, pricePer10g: 1240, dailyChange: "-0.04%", isPositive: false, label: "Sterling Silver" }
  });
  const [lastUpdated, setLastUpdated] = useState("July 2026 update");
  const [isLive, setIsLive] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  // Customizer State
  const [customCategory, setCustomCategory] = useState<"Ring" | "Necklace" | "Pendant" | "Earrings">("Ring");
  const [customPurity, setCustomPurity] = useState<"24K" | "22K" | "18K">("22K");
  const [customWeight, setCustomWeight] = useState<number>(8);
  const [customFinish, setCustomFinish] = useState<"Polished" | "Matte" | "Hammered" | "Antique">("Polished");
  const [customEngraving, setCustomEngraving] = useState<string>("");
  const [customArtisan, setCustomArtisan] = useState<Artisan>(ARTISANS[0]);
  
  // Checkout Modal State
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  // Calculator State
  const [calcWeight, setCalcWeight] = useState<number>(10);
  const [calcPurity, setCalcPurity] = useState<"24K" | "22K" | "18K">("22K");

  // HUID Simulator State
  const [huidInput, setHuidInput] = useState("");
  const [huidReport, setHuidReport] = useState<any | null>(null);
  const [huidLoading, setHuidLoading] = useState(false);

  // Hero Parallax State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Testimonials Carousel State
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  useEffect(() => {
    async function fetchGoldRates() {
      try {
        const res = await fetch("/api/gold-rate");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.rates) {
            setRates(data.rates);
            setLastUpdated(data.lastUpdated);
            setIsLive(true);
          }
        }
      } catch (err) {
        console.warn("Retrying rate fetch in background...", err);
      }
    }
    fetchGoldRates();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 45,
        y: (e.clientY - window.innerHeight / 2) / 45,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getPurityRate = (purity: "24K" | "22K" | "18K") => {
    if (purity === "24K") return rates.gold24k.pricePerGram;
    if (purity === "18K") return rates.gold18k.pricePerGram;
    return rates.gold22k.pricePerGram;
  };

  const getCustomGoldValue = () => getPurityRate(customPurity) * customWeight;
  const getCustomMakingCharges = () => 480 * customWeight;
  const getCustomGST = () => Math.round((getCustomGoldValue() + getCustomMakingCharges()) * 0.03);
  const getCustomTotal = () => getCustomGoldValue() + getCustomMakingCharges() + getCustomGST();

  // Calculator computations
  const selectedPurityRate = getPurityRate(calcPurity);
  const transparentGoldValue = selectedPurityRate * calcWeight;
  const transparentMakingValue = 420 * calcWeight;
  const transparentGST = Math.round((transparentGoldValue + transparentMakingValue) * 0.03);
  const transparentFinalTotal = transparentGoldValue + transparentMakingValue + transparentGST;

  const traditionalGoldValue = selectedPurityRate * calcWeight;
  const traditionalHiddenPremiumValue = Math.round(traditionalGoldValue * 0.18);
  const traditionalArbitraryMaking = Math.round(traditionalGoldValue * 0.22);
  const traditionalGST = Math.round((traditionalGoldValue + traditionalArbitraryMaking) * 0.03);
  const traditionalFinalTotal = traditionalGoldValue + traditionalHiddenPremiumValue + traditionalArbitraryMaking + traditionalGST;

  // HUID Simulator handler
  const handleHuidVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!huidInput.trim()) return;

    setHuidLoading(true);
    setHuidReport(null);

    setTimeout(() => {
      const code = huidInput.toUpperCase();
      let purityReport = "22K Fine Gold (91.6% Pure)";
      let weightReport = "14.25 grams";
      let karigarReport = "Ramesh Das";
      let labReport = "BIS Mumbai Hallmark Center (MH-01)";

      if (code.includes("24")) {
        purityReport = "24K Fine Gold (99.9% Pure)";
        weightReport = "10.00 grams";
        karigarReport = "Sunita Sharma";
        labReport = "BIS Jaipur Assay Office (RJ-04)";
      } else if (code.includes("18")) {
        purityReport = "18K Fine Gold (75.0% Pure)";
        weightReport = "6.80 grams";
        karigarReport = "Arjun Solanki";
        labReport = "BIS Rajkot Assay Lab (GJ-02)";
      } else {
        let hash = 0;
        for (let i = 0; i < code.length; i++) {
          hash = code.charCodeAt(i) + ((hash << 5) - hash);
        }
        const weightVal = 4 + (Math.abs(hash) % 24);
        const karigarIdx = Math.abs(hash) % ARTISANS.length;
        weightReport = `${weightVal}.50 grams`;
        karigarReport = ARTISANS[karigarIdx].name;
        const labs = [
          "BIS Kolkata Assay Lab (WB-03)",
          "BIS Jaipur Assay Office (RJ-04)",
          "BIS Mumbai Central Lab (MH-01)",
          "BIS New Delhi Hallmark Lab (DL-01)"
        ];
        labReport = labs[Math.abs(hash) % labs.length];
      }

      setHuidReport({
        code,
        status: "VERIFIED GENUINE",
        lab: labReport,
        purity: purityReport,
        weight: weightReport,
        karigar: karigarReport,
        timestamp: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      });
      setHuidLoading(false);
    }, 1500);
  };

  // Checkout order submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone || !checkoutEmail || !checkoutAddress) return;

    const randomId = "KGD-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedOrderId(randomId);
    setCheckoutSubmitted(true);
  };

  const resetCheckout = () => {
    setCheckoutSubmitted(false);
    setShowCheckoutModal(false);
    setCheckoutName("");
    setCheckoutPhone("");
    setCheckoutEmail("");
    setCheckoutAddress("");
  };

  return (
    <div className="relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black min-h-screen bg-black text-[#F8F8F8] font-sans">
      
      {/* GLOBAL BACKGROUND FLOATING SPARKLE SYSTEM */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="gold-particle w-1.5 h-1.5 left-[12%] top-[15%]" style={{ animationDelay: "0s", animationDuration: "10s" }} />
        <div className="gold-particle w-2 h-2 left-[28%] top-[38%]" style={{ animationDelay: "3s", animationDuration: "14s" }} />
        <div className="gold-particle w-1 h-1 left-[58%] top-[22%]" style={{ animationDelay: "5s", animationDuration: "11s" }} />
        <div className="gold-particle w-2.5 h-2.5 left-[75%] top-[55%]" style={{ animationDelay: "1s", animationDuration: "16s" }} />
        <div className="gold-particle w-1.5 h-1.5 left-[90%] top-[28%]" style={{ animationDelay: "7s", animationDuration: "13s" }} />
        <div className="gold-particle w-1 h-1 left-[45%] top-[70%]" style={{ animationDelay: "2s", animationDuration: "9s" }} />
      </div>

      {/* RENDER DYNAMIC NAVBAR */}
      <Navbar />

      {/* HERO SECTION — CINEMATIC LUXURY 100VH EXPERIENCE */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 z-10 overflow-hidden radial-luxury">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 w-full h-full object-cover opacity-25 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop"
            alt="Cinematic Gold Necklace Showcase"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Soft Gold Spotlight Center behind content */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-radial from-[#D4AF37]/10 to-transparent blur-[120px] pointer-events-none z-10" />

        {/* Interactive Mouse-Parallax Container */}
        <div 
          style={{ 
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            transition: "transform 0.15s ease-out"
          }}
          className="relative z-20 max-w-4xl w-full flex flex-col items-center text-center mx-auto mt-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[9px] md:text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-6 inline-block font-semibold"
          >
            HAUTE GOLDSMITHING • INDIA&apos;S FINEST
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-8xl font-light leading-tight tracking-wide mb-8 text-white"
          >
            Every Piece Has <br/>
            <span className="italic font-normal gold-gradient-text gold-glow-subtle font-serif">A Story.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] md:text-xs text-white/50 tracking-wider uppercase font-semibold mb-12 max-w-xl border-y border-white/5 py-4 px-2"
          >
            <span>Handcrafted by India&apos;s Finest Karigars</span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <span>Certified Purity</span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <span>Transparent Pricing</span>
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <span>Timeless Luxury</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto"
          >
            <a href="#categories" className="bg-[#D4AF37] hover:bg-[#C59B27] text-black font-semibold tracking-[0.2em] text-[10px] uppercase px-10 py-5 rounded-sm transition-all duration-300 w-full sm:w-auto text-center hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              Explore Collection
            </a>
            <a href="#builder" className="border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold tracking-[0.2em] text-[10px] uppercase px-10 py-5 rounded-sm transition-all duration-300 w-full sm:w-auto text-center bg-black/20 backdrop-blur-sm">
              Craft Your Jewellery
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[9px] uppercase tracking-[0.3em] pointer-events-none z-20 animate-pulse">
          <span>Reveal Luxury</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
        </div>
      </section>

      {/* LIVE GOLD RATES TICKER SECTION (Dark Charcoal) */}
      <div className="bg-dark-charcoal relative z-10">
        <LiveGoldRates />
      </div>

      {/* WHY KARIGOLD SECTION (Deep Graphite - SVGs & Depth) */}
      <section id="why-karigold" className="py-28 px-6 md:px-12 bg-deep-graphite border-y border-white/5 flex justify-center items-center relative z-10">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 text-left flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4">
                The Heritage Manifesto
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light mb-8 leading-tight text-white">
                Behind every piece of gold is a <span className="italic font-normal gold-gradient-text">Master Hand.</span>
              </h2>
              <p className="text-[#B8B8B8] leading-relaxed text-sm md:text-base mb-6 font-light">
                Traditional jewellery retail hides structural markup inside bloated prices. Customers rarely discover the goldsmiths assigned to construct their heirlooms, why making rates fluctuate, or how real bullion is calculated.
              </p>
              <p className="text-[#B8B8B8] leading-relaxed text-sm md:text-base mb-8 font-light">
                KARIGOLD stands for radical transparency, master artisan welfare, and technology-driven certificate tracking. Every piece we deliver has an identity and a purpose.
              </p>
              <a href="#transparency" className="text-white hover:text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2 border-b border-white/10 pb-1 hover:border-[#D4AF37] transition-all">
                Study Our Transparency Math <span>→</span>
              </a>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pillar 1 */}
              <div className="glass-card-premium p-8 rounded-[20px] text-left transition-all duration-500 hover:-translate-y-1 relative group">
                <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:border-[#D4AF37]/50 transition-colors">
                  {/* Transparent Pricing Illustration */}
                  <svg className="w-6 h-6 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">Transparent Pricing</h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  Complete cost audits show raw metal rate, making fees, and GST. Zero hidden showroom premium charges.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="glass-card-premium p-8 rounded-[20px] text-left transition-all duration-500 hover:-translate-y-1 relative group">
                <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:border-[#D4AF37]/50 transition-colors">
                  {/* Certified HUID Illustration */}
                  <svg className="w-6 h-6 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">Certified HUID</h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  Every gram is authenticated by state assay offices, carrying a unique 6-digit trackable registry identity.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="glass-card-premium p-8 rounded-[20px] text-left transition-all duration-500 hover:-translate-y-1 relative group">
                <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:border-[#D4AF37]/50 transition-colors">
                  {/* Direct From Karigars Illustration */}
                  <svg className="w-6 h-6 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">Direct From Karigars</h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  We buy direct from remote heritage workshops, guaranteeing fair payouts reach local goldsmiths.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="glass-card-premium p-8 rounded-[20px] text-left transition-all duration-500 hover:-translate-y-1 relative group">
                <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:border-[#D4AF37]/50 transition-colors">
                  {/* Fair Pricing Illustration */}
                  <svg className="w-6 h-6 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">Fair Pricing</h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  Flat rate pricing based strictly on spot metal prices. Save up to 25% compared to luxury retail storefront markups.
                </p>
              </div>

              {/* Pillar 5 */}
              <div className="glass-card-premium p-8 rounded-[20px] text-left transition-all duration-500 hover:-translate-y-1 relative group">
                <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:border-[#D4AF37]/50 transition-colors">
                  {/* Custom Jewellery Illustration */}
                  <svg className="w-6 h-6 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">Custom Jewellery</h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  Co-create premium custom jewelry in our digital suite, complete with unique engravings and karigar selection.
                </p>
              </div>

              {/* Pillar 6 */}
              <div className="glass-card-premium p-8 rounded-[20px] text-left transition-all duration-500 hover:-translate-y-1 relative group">
                <div className="w-12 h-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:border-[#D4AF37]/50 transition-colors">
                  {/* Lifetime Service Illustration */}
                  <svg className="w-6 h-6 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-white mb-2">Lifetime Service</h3>
                <p className="text-white/60 text-xs leading-relaxed font-light">
                  Free yearly structural polishing, stone inspections, and metal purity re-evaluations for absolute peace of mind.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION — APPLE-STYLE HIGHEST QUALITY VISUAL GRID (Pure Black) */}
      <section id="categories" className="py-32 px-6 md:px-12 bg-pure-black flex justify-center items-center relative z-10">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
              Explore Our Collections
            </h2>
            <p className="text-[#B8B8B8] font-sans text-sm md:text-base max-w-xl mx-auto font-light">
              Meticulously sculpted jewelry categories designed for editorial elegance. Images represent authentic goldsmithing models.
            </p>
          </div>

          {/* 14 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Gold Rings",
                desc: "Symmetrical heritage bands & Jadau Kundan settings.",
                price: "₹18,500",
                img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Gold Bangles",
                desc: "Handcrafted filigree bangles and structured kadas.",
                price: "₹45,000",
                img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Gold Necklace",
                desc: "Intricate temple and traditional bridal collar necklets.",
                price: "₹85,000",
                img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Bridal Collection",
                desc: "Grand royal wedding sets crafted over multiple months.",
                price: "₹1,80,000",
                img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Diamond Collection",
                desc: "Uncut polki and brilliant VVS diamond collars.",
                price: "₹1,40,000",
                img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Temple Jewellery",
                desc: "Sacred repoussé mythology panels sculpted in solid gold.",
                price: "₹95,000",
                img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Daily Wear",
                desc: "Lightweight 18K stackable chains and minimal studs.",
                price: "₹12,500",
                img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Office Collection",
                desc: "Sleek geometric structures customized for active workdays.",
                price: "₹15,000",
                img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Men's Jewellery",
                desc: "Heavy flat-link chains, bracelets, and bold signet bands.",
                price: "₹42,000",
                img: "https://images.unsplash.com/photo-1618453292459-53424b6bef9f?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Kids Jewellery",
                desc: "Charming mini chains and smooth, curved safety charms.",
                price: "₹9,800",
                img: "https://images.unsplash.com/photo-1596944229400-2e57ca967462?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Mangalsutra",
                desc: "Sacred black bead strings with micro-filigree details.",
                price: "₹29,000",
                img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Pendant",
                desc: "Sculpted lockets, amulets, and floral gold clusters.",
                price: "₹14,500",
                img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Bracelets",
                desc: "Chased link chains and solid, structured cuffs.",
                price: "₹32,000",
                img: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?q=80&w=600&auto=format&fit=crop"
              },
              {
                name: "Chains",
                desc: "Solid hand-woven gold ropes and curb link designs.",
                price: "₹38,000",
                img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop"
              }
            ].map((cat, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col justify-between bg-zinc-950/40 border border-white/5 rounded-[24px] overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(212,175,55,0.06)] min-h-[460px] text-left"
              >
                {/* 70% Product Image Container */}
                <div className="relative h-[280px] w-full overflow-hidden bg-zinc-900">
                  {/* Premium Hover Zoom Container */}
                  <div className="absolute inset-0 image-zoom-container h-full w-full">
                    <img 
                      src={cat.img} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-80" />
                  
                  {/* Hover Buttons overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 px-4 z-20">
                    <button 
                      onClick={() => {
                        setCustomCategory(cat.name.includes("Ring") ? "Ring" : cat.name.includes("Necklace") ? "Necklace" : cat.name.includes("Pendant") ? "Pendant" : "Ring");
                        const builder = document.getElementById("builder");
                        if (builder) builder.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-white text-black font-semibold text-[9px] tracking-wider uppercase px-4 py-2.5 rounded-sm hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      Quick View
                    </button>
                    <button className="border border-white/20 hover:border-white text-white font-semibold text-[9px] tracking-wider uppercase px-4 py-2.5 rounded-sm transition-colors">
                      Wishlist
                    </button>
                  </div>
                </div>

                {/* 30% Details Content */}
                <div className="p-6 pt-2 flex-grow flex flex-col justify-between z-10 bg-black/40">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-lg font-semibold text-white group-hover:text-[#D4AF37] transition-all">
                        {cat.name}
                      </h3>
                      <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded font-mono">
                        {cat.price}
                      </span>
                    </div>
                    <p className="text-[#B8B8B8] text-xs font-light leading-relaxed mb-4 line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                    <span className="text-[9px] text-[#B8B8B8]/60 uppercase tracking-widest">Available In 18K/22K/24K</span>
                    <a 
                      href="#builder" 
                      onClick={() => {
                        setCustomCategory(cat.name.includes("Ring") ? "Ring" : cat.name.includes("Necklace") ? "Necklace" : cat.name.includes("Pendant") ? "Pendant" : "Ring");
                      }}
                      className="text-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider hover:text-white transition-colors"
                    >
                      Shop Now →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP SECTION — MAGAZINE EDITORIAL LAYOUT (Charcoal with Parallax Artisan Image) */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center px-6 md:px-12 bg-dark-charcoal z-10 overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 w-full h-full object-cover opacity-30 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1600&auto=format&fit=crop"
            alt="Goldsmith Handcrafting Detail"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl w-full text-left mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 block">
            GENUINE ANCESTRAL HANDS
          </span>
          <h2 className="font-serif text-5xl md:text-7xl font-light text-white leading-tight mb-8 max-w-3xl">
            Our jewellery carries <span className="italic font-normal gold-gradient-text">generations of craftsmanship.</span>
          </h2>
          <p className="text-[#B8B8B8] text-sm md:text-lg max-w-xl leading-relaxed mb-8 font-light">
            Every file stroke, heating flame, and setting hammer is guided by family lineages who have guarded metallurgical secrets since royal empires. We reject machine extrusion in favor of soul.
          </p>
          <a href="#karigars" className="bg-transparent border border-white/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] font-semibold tracking-[0.2em] text-[10px] uppercase px-8 py-4 rounded-sm transition-all duration-300 inline-block bg-black/45 backdrop-blur-sm">
            Discover Our Karigars
          </a>
        </div>
      </section>

      {/* FEATURED COLLECTIONS SECTION — ALTERNATING EDITORIAL MAG LAYOUTS (Deep Graphite) */}
      <section id="featured-collections" className="py-32 px-6 md:px-12 bg-deep-graphite z-10 relative">
        <div className="max-w-7xl w-full mx-auto">
          
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
              Limited Editions
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
              Featured Collections
            </h2>
            <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto font-light">
              Explore custom curated seasonal designs from our active heritage furnaces.
            </p>
          </div>

          <div className="flex flex-col gap-32">
            {/* Alternating Row 1: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center text-left">
              <div className="lg:col-span-7 h-[420px] md:h-[500px] w-full rounded-[24px] overflow-hidden relative bg-zinc-900 group border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop" 
                  alt="Everyday Minimal Luxury Gold" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-6 bg-[#D4AF37] text-black text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-bold rounded-sm">
                  Daily Luxury
                </span>
              </div>
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">MINIMALIST ESSENTIALS</span>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-white mb-6 leading-tight">Everyday Gold</h3>
                <p className="text-[#B8B8B8] text-sm leading-relaxed mb-8 font-light">
                  Sleek, delicate 18K solid gold bands, stackable rings, cuffs, and drop chains tailored for active daily routines. Bold design statements in lightweight, durable structures.
                </p>
                <a href="#builder" className="text-[#D4AF37] hover:text-white text-[10px] font-semibold uppercase tracking-[0.25em] border-b border-[#D4AF37]/30 pb-1 hover:border-white transition-all flex items-center gap-2">
                  Configure Everyday Set <span>→</span>
                </a>
              </div>
            </div>

            {/* Alternating Row 2: Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center text-left">
              <div className="lg:col-span-5 lg:order-1 flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">ROYAL MILSTONES</span>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-white mb-6 leading-tight">Bridal Masterpieces</h3>
                <p className="text-[#B8B8B8] text-sm leading-relaxed mb-8 font-light">
                  Opulent, heavy-carat heritage bridal sets. Features solid kundan work, intricate Jadau gems, and mythology-inspired chokers designed exclusively for heirloom milestones.
                </p>
                <a href="#builder" className="text-[#D4AF37] hover:text-white text-[10px] font-semibold uppercase tracking-[0.25em] border-b border-[#D4AF37]/30 pb-1 hover:border-white transition-all flex items-center gap-2">
                  Configure Bridal Order <span>→</span>
                </a>
              </div>
              <div className="lg:col-span-7 lg:order-2 h-[420px] md:h-[500px] w-full rounded-[24px] overflow-hidden relative bg-zinc-900 group border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop" 
                  alt="Opulent Bridal Masterpiece" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-6 bg-[#D4AF37] text-black text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-bold rounded-sm">
                  Imperial Wedding
                </span>
              </div>
            </div>

            {/* Alternating Row 3: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center text-left">
              <div className="lg:col-span-7 h-[420px] md:h-[500px] w-full rounded-[24px] overflow-hidden relative bg-zinc-900 group border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" 
                  alt="Intricate Heritage Filigree" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-6 left-6 bg-[#D4AF37] text-black text-[9px] uppercase tracking-[0.25em] px-4 py-2 font-bold rounded-sm">
                  Heritage Guild
                </span>
              </div>
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">ANCIENT SYMMETRY</span>
                <h3 className="font-serif text-3xl md:text-5xl font-light text-white mb-6 leading-tight">Heritage Filigree</h3>
                <p className="text-[#B8B8B8] text-sm leading-relaxed mb-8 font-light">
                  Intricate mesh wire lace-work drawing complex geometric motifs, handcrafted under the guidance of our designated master goldsmiths in Bengal workshop.
                </p>
                <a href="#builder" className="text-[#D4AF37] hover:text-white text-[10px] font-semibold uppercase tracking-[0.25em] border-b border-[#D4AF37]/30 pb-1 hover:border-white transition-all flex items-center gap-2">
                  Configure Filigree Piece <span>→</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE JEWELRY BUILDER SECTION (Pure Black - Custom Glass) */}
      <section id="builder" className="py-28 px-6 md:px-12 bg-pure-black flex justify-center items-center relative overflow-hidden z-10 border-t border-white/5">
        <div className="max-w-7xl w-full relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
              Bespoke Atelier
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
              Build Your Own Gold Jewellery
            </h2>
            <p className="text-[#B8B8B8] text-sm max-w-xl mx-auto font-light">
              Select configurations and design a customized precious heirloom. Your piece will be forged entirely by hand with absolute billing integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Customizer Interactive Preview Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="glass-card rounded-[24px] p-8 text-center relative overflow-hidden min-h-[490px] flex flex-col justify-between border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.03)] bg-gradient-to-b from-zinc-950/70 to-black/75">
                
                {/* Visual Representation of Gold Item */}
                <div className="my-auto flex flex-col items-center relative py-8">
                  <div className="w-40 h-40 rounded-full flex items-center justify-center relative transition-all duration-500"
                    style={{
                      background: customPurity === "24K" 
                        ? "radial-gradient(circle, #FFF2A1 0%, #D4AF37 60%, #AA7C11 100%)" 
                        : customPurity === "22K"
                        ? "radial-gradient(circle, #F8E088 0%, #CFA12E 60%, #9C6C0A 100%)"
                        : "radial-gradient(circle, #ECC483 0%, #B88B27 60%, #825F06 100%)",
                      boxShadow: `0 0 ${customWeight * 1.5}px rgba(212, 175, 55, 0.4)`,
                      border: customFinish === "Hammered" ? "3px dashed rgba(255,255,255,0.25)" : customFinish === "Antique" ? "4px double #553b00" : "1px solid rgba(255,255,255,0.15)",
                      transform: `scale(${1 + customWeight * 0.004})`
                    }}
                  >
                    <div className="text-black/80 font-serif font-bold text-xs uppercase tracking-widest text-center px-4 flex flex-col items-center">
                      {customCategory === "Ring" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.2] fill-none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" />
                          <circle cx="12" cy="5" r="2" />
                        </svg>
                      )}
                      {customCategory === "Necklace" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.2] fill-none" viewBox="0 0 24 24">
                          <path d="M5 5c0 6.6 5.4 12 12 12s12-5.4 12-12" />
                          <circle cx="12" cy="14" r="2.5" />
                        </svg>
                      )}
                      {customCategory === "Pendant" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.2] fill-none" viewBox="0 0 24 24">
                          <rect x="8" y="8" width="8" height="8" rx="1" />
                          <line x1="12" y1="2" x2="12" y2="8" />
                        </svg>
                      )}
                      {customCategory === "Earrings" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.2] fill-none" viewBox="0 0 24 24">
                          <circle cx="8" cy="12" r="3" />
                          <circle cx="16" cy="12" r="3" />
                          <path d="M8 9V4M16 9V4" />
                        </svg>
                      )}
                      <span className="text-[10px] mt-2 block font-bold tracking-wider">{customWeight}g {customPurity}</span>
                    </div>

                    {customEngraving && (
                      <div className="absolute bottom-2 left-0 right-0 text-[8px] uppercase tracking-wider text-black bg-white/85 py-0.5 px-2 rounded-full max-w-[80%] mx-auto truncate font-sans font-bold">
                        &ldquo;{customEngraving}&rdquo;
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-left max-w-sm w-full bg-black/40 border border-white/5 rounded-lg p-4">
                    <p className="text-[10px] text-[#B8B8B8] leading-relaxed font-light">
                      <span className="text-[#D4AF37] font-semibold uppercase">Texturing Finish:</span> {customFinish} Gold. Clean detailing and polishing will be conducted manually under specialized magnification.
                    </p>
                  </div>
                </div>

                {/* Goldsmith Attribution */}
                <div className="border-t border-white/5 pt-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 overflow-hidden flex items-center justify-center border border-[#D4AF37]/30">
                      <span className="text-xs font-bold text-[#D4AF37] font-mono">{customArtisan.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-[#B8B8B8] uppercase tracking-widest block font-bold">Selected Goldsmith</span>
                      <span className="text-white text-xs font-serif font-bold">
                        {customArtisan.name} • {customArtisan.role}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Customizer Option Inputs */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              
              {/* Option 1: Base Category */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">1. Select Jewelry Base</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Ring", "Necklace", "Pendant", "Earrings"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCustomCategory(cat)}
                      className={`px-3 py-3 rounded text-[10px] tracking-wider uppercase font-semibold transition-all border ${
                        customCategory === cat
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                          : "bg-black text-[#B8B8B8] border-white/5 hover:border-white/15"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Gold Purity */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">2. Select Gold Purity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["24K", "22K", "18K"] as const).map((purity) => (
                    <button
                      key={purity}
                      onClick={() => setCustomPurity(purity)}
                      className={`px-3 py-3 rounded text-[10px] tracking-wider uppercase font-semibold transition-all border ${
                        customPurity === purity
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                          : "bg-black text-[#B8B8B8] border-white/5 hover:border-white/15"
                      }`}
                    >
                      {purity} ({purity === "24K" ? "99.9%" : purity === "22K" ? "91.6%" : "75.0%"})
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Weight Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] font-semibold">3. Adjust Gold Weight (Grams)</label>
                  <span className="text-[#D4AF37] text-sm font-bold font-serif">{customWeight} grams</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="0.1"
                  value={customWeight}
                  onChange={(e) => setCustomWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#B8B8B8]/60 mt-1.5 uppercase tracking-wider font-mono">
                  <span>Min: 2g (Delicate)</span>
                  <span>Ideal for everyday: 4g - 15g</span>
                  <span>Max: 50g (Heavy Solid)</span>
                </div>
              </div>

              {/* Option 4: Gold Finish */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">4. Select Metal Finish</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Polished", "Matte", "Hammered", "Antique"] as const).map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setCustomFinish(finish)}
                      className={`px-2 py-3 rounded text-[10px] tracking-wider uppercase font-semibold transition-all border ${
                        customFinish === finish
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                          : "bg-black text-[#B8B8B8] border-white/5 hover:border-white/15"
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 5: Custom Engraving */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] block mb-2 font-semibold">5. Personalised Engraving (Complimentary)</label>
                <input
                  type="text"
                  maxLength={24}
                  value={customEngraving}
                  onChange={(e) => setCustomEngraving(e.target.value)}
                  placeholder="Enter name, date, or phrase..."
                  className="w-full bg-black border border-white/10 p-4 rounded text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>

              {/* Option 6: Select Master Artisan */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">6. Select Master Artisan</label>
                <div className="grid grid-cols-3 gap-2">
                  {ARTISANS.map((artisan) => (
                    <button
                      key={artisan.id}
                      onClick={() => setCustomArtisan(artisan)}
                      className={`px-3 py-3 rounded text-xs transition-all border text-left flex flex-col justify-between min-h-[75px] ${
                        customArtisan.id === artisan.id
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                          : "bg-black text-[#B8B8B8] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <span className="font-serif text-[11px] block leading-tight font-bold">{artisan.name}</span>
                      <span className="text-[8px] opacity-75 uppercase tracking-wider">{artisan.role.split(" ").slice(-2).join(" ")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Price Breakdown Card */}
              <div className="bg-zinc-950/80 border border-white/5 p-6 rounded-[16px] mt-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
                <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Price Breakdown</h4>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#B8B8B8]">Gold Value ({customWeight}g @ ₹{getPurityRate(customPurity)}/g)</span>
                  <span className="text-white font-medium">₹{getCustomGoldValue().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#B8B8B8]">Artisan Making Charges (₹480/g)</span>
                  <span className="text-white font-medium">₹{getCustomMakingCharges().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs mb-3 pb-3 border-b border-white/5">
                  <span className="text-[#B8B8B8]">Government GST (3%)</span>
                  <span className="text-white font-medium">₹{getCustomGST().toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-[#D4AF37]">Total Estimate (All Inclusive)</span>
                  <span className="text-[#D4AF37] font-serif text-base">₹{getCustomTotal().toLocaleString("en-IN")}</span>
                </div>
                
                {/* Checkout Trigger */}
                <button 
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full mt-6 bg-[#D4AF37] hover:bg-[#C59B27] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-sm transition-all duration-300 font-sans hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  Order Custom Piece
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* PRICE TRANSPARENCY CALCULATOR — SIDE-BY-SIDE MATH COMPARISON (Dark Charcoal) */}
      <section id="transparency" className="py-28 px-6 md:px-12 bg-dark-charcoal border-y border-white/5 flex justify-center items-center relative z-10">
        <div className="max-w-6xl w-full">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
              The Truth in Carats
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
              Transparent vs Traditional Pricing
            </h2>
            <p className="text-[#B8B8B8] text-sm max-w-xl mx-auto font-light">
              Compare our flat, transparent making rates directly against the standard industry markups and premium adjustments.
            </p>
          </div>

          {/* Interactive Calculator Inputs */}
          <div className="glass-card rounded-[20px] p-6 md:p-8 max-w-4xl mx-auto mb-16 border border-[#D4AF37]/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] font-semibold">Gold Weight (Grams)</label>
                  <span className="text-[#D4AF37] text-sm font-bold font-serif">{calcWeight} grams</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">Gold Purity Selection</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["24K", "22K", "18K"] as const).map((pur) => (
                    <button
                      key={pur}
                      onClick={() => setCalcPurity(pur)}
                      className={`py-3 px-3 rounded text-[10px] tracking-wider uppercase font-semibold transition-all border ${
                        calcPurity === pur
                          ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                          : "bg-black text-[#B8B8B8] border-white/5 hover:border-white/10"
                      }`}
                    >
                      {pur}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* KARIGOLD CARD */}
            <div className="glass-card-premium rounded-[24px] p-8 border-[#D4AF37]/35 relative hover:border-[#D4AF37]/60 transition-all duration-300 bg-zinc-950/40 text-left">
              <span className="absolute top-4 right-4 bg-[#D4AF37]/15 text-[#D4AF37] text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#D4AF37]/30">
                Karigold Standard
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">KARIGOLD Model</h3>
              
              <div className="flex flex-col gap-4 text-xs mb-8">
                <div className="flex justify-between">
                  <span className="text-[#B8B8B8]">Raw Gold Value ({calcWeight}g @ ₹{selectedPurityRate}/g)</span>
                  <span className="text-white">₹{transparentGoldValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B8B8B8]">Making Charges (Transparent flat ₹420/g)</span>
                  <span className="text-white">₹{transparentMakingValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#B8B8B8]">Hidden Markup / Premium Rate</span>
                  <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">₹0 (Zero Markup)</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/5">
                  <span className="text-[#B8B8B8]">Government GST (3% legally capped)</span>
                  <span className="text-white">₹{transparentGST.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span className="text-[#D4AF37]">Final Invoice Price</span>
                  <span className="text-[#D4AF37] font-serif text-lg">₹{transparentFinalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/10 border border-emerald-500/10 rounded-sm">
                <p className="text-[10px] text-emerald-400 leading-relaxed text-center font-medium">
                  We guarantee direct artisan wage payout with audited bill transparency.
                </p>
              </div>
            </div>

            {/* TRADITIONAL CARD */}
            <div className="bg-black/40 border border-white/5 rounded-[24px] p-8 relative hover:border-red-900/30 transition-all duration-300 text-left">
              <span className="absolute top-4 right-4 bg-red-950/40 text-red-400 text-[8px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-red-900/20">
                Market Average
              </span>
              <h3 className="font-serif text-2xl font-bold text-zinc-500 mb-6">Traditional Retailer</h3>
              
              <div className="flex flex-col gap-4 text-xs mb-8">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Raw Gold Value ({calcWeight}g @ ₹{selectedPurityRate}/g)</span>
                  <span className="text-zinc-400">₹{traditionalGoldValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Making Charges (Variable arbitrary ~22%)</span>
                  <span className="text-zinc-400">₹{traditionalArbitraryMaking.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Hidden Gold Markup / Retail Premium (~18%)</span>
                  <span className="text-zinc-400">₹{traditionalHiddenPremiumValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/5">
                  <span className="text-zinc-500">GST (3% calculated over markup)</span>
                  <span className="text-zinc-400">₹{traditionalGST.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span className="text-zinc-400">Final Invoice Price</span>
                  <span className="text-zinc-400 font-serif text-lg">₹{traditionalFinalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-3.5 bg-red-950/10 border border-red-900/10 rounded-sm">
                <p className="text-[10px] text-red-400 leading-relaxed text-center font-medium">
                  Traditional showrooms hide margins in fluctuating daily rates and arbitrary making schemes.
                </p>
              </div>
            </div>

          </div>

          {/* Comparison summary tag */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-8 py-4 rounded-full">
              <span className="font-serif text-white text-xs md:text-sm tracking-wider uppercase font-semibold">
                You save <span className="text-[#D4AF37] font-sans font-bold">₹{(traditionalFinalTotal - transparentFinalTotal).toLocaleString("en-IN")}</span> ({Math.round(((traditionalFinalTotal - transparentFinalTotal) / traditionalFinalTotal) * 100)}% Savings) with KARIGOLD
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* MEET THE KARIGARS SECTION (Pure Black - Grid of Artisans) */}
      <section id="karigars" className="py-28 px-6 md:px-12 bg-pure-black flex justify-center items-center relative z-10">
        <div className="max-w-7xl w-full">
          
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
              THE SOUL BEHIND THE GOLD
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
              Meet our Master Karigars
            </h2>
            <p className="text-[#B8B8B8] text-sm max-w-xl mx-auto font-light">
              Every item is co-created with a designated master goldsmith who receives authentic recognition and fair craftsmanship payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTISANS.map((artisan) => (
              <div 
                key={artisan.id} 
                className="bg-zinc-950/30 border border-white/5 rounded-[24px] overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="h-72 w-full relative overflow-hidden bg-zinc-900">
                    <img 
                      src={artisan.image} 
                      alt={artisan.name} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                    <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[9px] text-[#B8B8B8] uppercase tracking-wider font-mono">
                      {artisan.city}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[#D4AF37] text-[9px] tracking-[0.15em] uppercase font-bold block mb-1">
                      {artisan.role}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mb-3">{artisan.name}</h3>
                    <p className="text-[#B8B8B8] text-xs leading-relaxed mb-4 font-light">
                      {artisan.story}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {artisan.specialization.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-white font-light">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setSelectedArtisan(artisan)}
                    className="w-full border border-[#D4AF37]/35 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-3 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 text-center rounded-sm font-sans"
                  >
                    Read Story & Philosophy
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION — LUXURY CAROUSEL (Deep Graphite) */}
      <section className="py-28 px-6 md:px-12 bg-deep-graphite border-y border-white/5 flex justify-center items-center relative z-10">
        <div className="max-w-5xl w-full text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
            PATRON STORIES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-16">
            Words from our Collectors
          </h2>

          <div className="relative min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto flex flex-col items-center"
              >
                {/* Gold Stars */}
                <div className="flex gap-1 mb-6 text-[#D4AF37]">
                  {Array.from({ length: REVIEWS[activeReviewIndex].rating }).map((_, i) => (
                    <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="font-serif text-lg md:text-2xl text-white font-light leading-relaxed mb-8 italic">
                  &ldquo;{REVIEWS[activeReviewIndex].quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={REVIEWS[activeReviewIndex].image}
                    alt={REVIEWS[activeReviewIndex].name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30"
                  />
                  <div className="text-left">
                    <div className="font-serif text-white font-bold text-sm flex items-center gap-2">
                      {REVIEWS[activeReviewIndex].name}
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[7px] uppercase tracking-widest px-2 py-0.5 rounded font-mono font-bold">
                        Verified Buyer
                      </span>
                    </div>
                    <div className="text-[10px] text-[#B8B8B8] uppercase tracking-wider mt-0.5">
                      {REVIEWS[activeReviewIndex].role} • {REVIEWS[activeReviewIndex].city}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReviewIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activeReviewIndex === i ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-white/40 text-[9px] uppercase tracking-[0.2em] font-mono flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current text-[#D4AF37]" viewBox="0 0 24 24">
              <path d="M12.24 20.26l-1.07-1c-3.78-3.43-6.28-5.7-6.28-8.52 0-2.28 1.78-4.06 4.06-4.06 1.28 0 2.51.6 3.29 1.54.78-.94 2.01-1.54 3.29-1.54 2.28 0 4.06 1.78 4.06 4.06 0 2.82-2.5 5.09-6.28 8.53l-1.07 1z" />
            </svg>
            Google Rating 5.0/5.0 based on 420+ client commissions
          </div>
        </div>
      </section>

      {/* HUID VALIDATION SIMULATOR SECTION (Pure Black - Certified Hallmark Registry) */}
      <section id="huid" className="py-28 px-6 md:px-12 bg-pure-black flex justify-center items-center relative z-10">
        <div className="max-w-4xl w-full">
          
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-4 inline-block">
              Secure Metallurgy
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light text-white mb-4">
              Trace Your Gold (HUID Registry)
            </h2>
            <p className="text-[#B8B8B8] text-sm max-w-xl mx-auto font-light">
              Every item has a trackable 6-digit Hallmark Unique Identification (HUID). Test a code below to verify purity metrics and artisan attributions.
            </p>
          </div>

          <div className="glass-card rounded-[24px] p-6 md:p-10 border border-[#D4AF37]/20 bg-zinc-950/40">
            
            <form onSubmit={handleHuidVerify} className="flex flex-col sm:flex-row gap-3 mb-8">
              <input 
                type="text" 
                maxLength={8}
                placeholder="Enter 6-digit HUID (e.g. KGD22K, KGD24K, Ramesh999)" 
                value={huidInput}
                onChange={(e) => setHuidInput(e.target.value)}
                className="flex-grow bg-black border border-white/10 p-4 rounded text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 tracking-wider font-semibold"
              />
              <button 
                type="submit"
                disabled={huidLoading || !huidInput.trim()}
                className="bg-[#D4AF37] hover:bg-[#C59B27] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded transition-all duration-300 shrink-0 font-sans"
              >
                {huidLoading ? "Verifying..." : "Verify Registry"}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {huidLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
                  <p className="text-[10px] text-[#B8B8B8] uppercase tracking-widest animate-pulse font-mono font-bold">Contacting Bureau of Indian Standards (BIS) Registry...</p>
                </motion.div>
              )}

              {huidReport && !huidLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-[#D4AF37]/25 bg-black/50 rounded-[16px] p-6 text-left"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                    <div>
                      <span className="text-[9px] text-[#B8B8B8] uppercase tracking-wider block">HUID Code</span>
                      <span className="text-base font-mono font-bold text-white tracking-widest">{huidReport.code}</span>
                    </div>
                    <div className="text-right">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono">
                        {huidReport.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#B8B8B8] block mb-1 font-light">Hallmarking Assay Lab</span>
                      <span className="text-white font-medium">{huidReport.lab}</span>
                    </div>
                    <div>
                      <span className="text-[#B8B8B8] block mb-1 font-light">Purity Level</span>
                      <span className="text-white font-medium">{huidReport.purity}</span>
                    </div>
                    <div>
                      <span className="text-[#B8B8B8] block mb-1 font-light">Declared Net Weight</span>
                      <span className="text-white font-medium">{huidReport.weight}</span>
                    </div>
                    <div>
                      <span className="text-[#B8B8B8] block mb-1 font-light">Forged by Goldsmith</span>
                      <span className="text-[#D4AF37] font-semibold">{huidReport.karigar}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 mt-4 pt-4 flex justify-between items-center text-[9px] text-[#B8B8B8] font-mono">
                    <span>Standard: IS 1417 : 2016 Compliant</span>
                    <span>Audit Date: {huidReport.timestamp}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* BRAND FOOTER (Pure Black with Newsletter & Instagram) */}
      <footer className="bg-pure-black pt-28 pb-20 px-6 md:px-12 border-t border-white/5 text-left relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            
            <div className="md:col-span-4 flex flex-col items-start">
              <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#D4AF37] mb-6">KARIGOLD</span>
              <p className="text-[#B8B8B8] text-xs leading-relaxed max-w-sm mb-6 font-light">
                Experience the heavy weight of authentic Indian goldsmithing. We connect you directly with master craftsmen, providing 100% transparent pricing and trackable BIS hallmarked jewelry.
              </p>
              <span className="text-[9px] text-zinc-600 block font-mono">
                © {new Date().getFullYear()} KARIGOLD Ltd. All rights reserved.
              </span>
            </div>

            <div className="md:col-span-2 flex flex-col items-start gap-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white font-bold mb-2">Our Craft</h4>
              <a href="#why-karigold" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors font-light">The Karigar Guild</a>
              <a href="#transparency" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors font-light font-mono">Transparent Math</a>
              <a href="#builder" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors font-light">Custom Atelier</a>
              <a href="#huid" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors font-light">HUID Registry</a>
            </div>

            {/* Instagram Gallery Block */}
            <div className="md:col-span-3 flex flex-col items-start gap-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white font-bold mb-2">Instagram Gallery</h4>
              <div className="grid grid-cols-3 gap-2 w-full max-w-[240px]">
                {INSTAGRAM_GALLERY.map((img, i) => (
                  <div key={i} className="aspect-square w-full bg-zinc-900 overflow-hidden relative group border border-white/5">
                    <img
                      src={img}
                      alt={`Insta preview ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col items-start gap-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white font-bold mb-2 font-mono">Stay Connected</h4>
              <p className="text-[#B8B8B8] text-xs leading-relaxed mb-2 font-light">
                Subscribe to receive updates on newly assigned Karigar collections and local spot bullion insights.
              </p>
              <div className="flex w-full">
                <input 
                  type="email" 
                  placeholder="Enter email..." 
                  className="bg-black border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 rounded-l-sm flex-grow"
                />
                <button className="bg-[#D4AF37] hover:bg-[#C59B27] text-black font-semibold text-[10px] tracking-widest uppercase px-6 rounded-r-sm font-sans transition-colors">
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Luxury Footer Bottom Links */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-[#B8B8B8]/60 uppercase tracking-widest">
            <div className="flex gap-6">
              <a href="#why-karigold" className="hover:text-white transition-colors">About Us</a>
              <a href="#builder" className="hover:text-white transition-colors">Collections</a>
              <a href="#transparency" className="hover:text-white transition-colors font-mono">Pricing</a>
            </div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
              <span className="hover:text-white cursor-pointer transition-colors">Hallmark Guidelines</span>
            </div>
          </div>

        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM NAVIGATION DOCK (Glass & Gold theme) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-black/80 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] xl:hidden">
        <a href="#" className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-widest text-[#D4AF37] font-semibold">
          <svg className="w-4.5 h-4.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </a>
        <a href="#categories" className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          <svg className="w-4.5 h-4.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
          </svg>
          <span>Explore</span>
        </a>
        <a href="#builder" className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          <svg className="w-4.5 h-4.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Craft</span>
        </a>
        <a href="#huid" className="flex flex-col items-center gap-1 text-[8px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          <svg className="w-4.5 h-4.5 stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Verify</span>
        </a>
      </div>

      {/* MODAL 1: ARTISAN STORY MODAL */}
      <AnimatePresence>
        {selectedArtisan && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedArtisan(null)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="bg-[#0A0A0A] border border-[#D4AF37]/30 w-full max-w-4xl rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Image Column */}
              <div className="md:col-span-5 h-64 md:h-full relative min-h-[300px]">
                <img 
                  src={selectedArtisan.image} 
                  alt={selectedArtisan.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent md:from-transparent md:to-[#0a0a0a]/90" />
              </div>

              {/* Details Column */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[#D4AF37] text-[10px] tracking-wider uppercase font-bold block">
                        {selectedArtisan.role}
                      </span>
                      <h2 className="font-serif text-3xl font-bold text-white mt-1">
                        {selectedArtisan.name}
                      </h2>
                    </div>
                    <button 
                      onClick={() => setSelectedArtisan(null)}
                      className="text-zinc-500 hover:text-white text-lg p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-[13px] text-[#B8B8B8] leading-relaxed mb-6 italic font-serif font-light">
                    &ldquo;{selectedArtisan.quote}&rdquo;
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Heritage Story</h4>
                    <p className="text-[12px] text-[#B8B8B8] leading-relaxed font-light">
                      {selectedArtisan.story}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                    <div>
                      <span className="text-[#D4AF37] font-bold block mb-1">Workshop City</span>
                      <span className="text-white">{selectedArtisan.city}</span>
                    </div>
                    <div>
                      <span className="text-[#D4AF37] font-bold block mb-1">Years of Craftsmanship</span>
                      <span className="text-white">{selectedArtisan.experience} Years</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Honours & Awards</h4>
                    <ul className="list-disc list-inside text-xs text-[#B8B8B8] flex flex-col gap-1 font-light">
                      {selectedArtisan.awards.map((award, i) => (
                        <li key={i}>{award}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Custom Workshop Tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedArtisan.tools.map((tool, i) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-white font-light">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="border-t border-white/5 pt-6 flex gap-3">
                  <button 
                    onClick={() => {
                      setCustomArtisan(selectedArtisan);
                      setSelectedArtisan(null);
                      const builderSec = document.getElementById("builder");
                      if (builderSec) builderSec.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-grow bg-[#D4AF37] hover:bg-[#C59B27] text-black font-semibold text-xs tracking-widest uppercase py-3.5 rounded-sm transition-all duration-300 text-center font-sans"
                  >
                    Assign to Custom Builder
                  </button>
                  <button 
                    onClick={() => setSelectedArtisan(null)}
                    className="border border-white/10 hover:border-white/20 text-[#B8B8B8] hover:text-white px-6 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm font-sans"
                  >
                    Close
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: CUSTOMIZER CHECKOUT MODAL */}
      <AnimatePresence>
        {showCheckoutModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={resetCheckout}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="bg-[#0A0A0A] border border-[#D4AF37]/30 w-full max-w-lg rounded-[20px] p-6 md:p-8 text-left shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Bespoke Jewelry Order</h3>
                  <p className="text-[11px] text-[#B8B8B8] mt-1">Please confirm your configuration and shipping details.</p>
                </div>
                <button onClick={resetCheckout} className="text-zinc-500 hover:text-white text-lg font-bold">
                  ✕
                </button>
              </div>

              {!checkoutSubmitted ? (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                  
                  {/* Order Specs Preview */}
                  <div className="bg-zinc-950/90 p-4 border border-white/5 rounded-lg text-xs shadow-inner">
                    <div className="grid grid-cols-2 gap-y-2 text-[#B8B8B8]">
                      <div>Item Base: <span className="text-white font-bold">{customCategory}</span></div>
                      <div>Gold Purity: <span className="text-white font-bold">{customPurity}</span></div>
                      <div>Weight: <span className="text-white font-bold">{customWeight}g</span></div>
                      <div>Finish Applied: <span className="text-white font-bold">{customFinish}</span></div>
                      {customEngraving && (
                        <div className="col-span-2 font-mono">Engraving: <span className="text-[#D4AF37] font-semibold">&ldquo;{customEngraving}&rdquo;</span></div>
                      )}
                      <div className="col-span-2">Assigned Karigar: <span className="text-white font-semibold">{customArtisan.name}</span></div>
                    </div>
                    <div className="border-t border-white/5 mt-3 pt-3 flex justify-between font-bold text-sm">
                      <span className="text-[#D4AF37]">Total (incl. GST)</span>
                      <span className="text-[#D4AF37] font-serif text-base">₹{getCustomTotal().toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Customer Inputs */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter full name..."
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="bg-black border border-white/10 p-3.5 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Mobile with country code..."
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="bg-black border border-white/10 p-3.5 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="yourname@domain.com"
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className="bg-black border border-white/10 p-3.5 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Shipping Address (India Delivery Only)</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Enter complete delivery address..."
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="bg-black border border-white/10 p-3.5 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#C59B27] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-sm mt-3 transition-all duration-300 font-sans hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    Confirm & Place Custom Order
                  </button>

                </form>
              ) : (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-center mb-6 text-emerald-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white mb-2">Custom Order Received!</h4>
                  <p className="text-xs text-[#B8B8B8] leading-relaxed max-w-sm mb-6 font-light">
                    Thank you, <span className="text-white font-bold">{checkoutName}</span>. Your custom request has been logged. {customArtisan.name} is scheduled to forge your order in the upcoming weekly workshop cycle.
                  </p>

                  <div className="bg-zinc-950/95 border border-white/5 p-4 rounded-lg text-xs mb-8 w-full font-mono">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#B8B8B8]">Temporary Order Reference ID:</span>
                      <span className="text-white font-bold">{generatedOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8B8B8]">BIS Hallmarked HUID Allocation:</span>
                      <span className="text-[#D4AF37] font-semibold">Allocating on Casting...</span>
                    </div>
                  </div>

                  <button 
                    onClick={resetCheckout}
                    className="border border-[#D4AF37]/35 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm font-sans"
                  >
                    Return to Landing Page
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
