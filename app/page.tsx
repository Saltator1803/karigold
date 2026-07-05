"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveGoldRates from "@/components/LiveGoldRates";

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
        // Generate pseudo-stable values from string hash
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
    <div className="relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black min-h-screen bg-[#050505] text-[#F8F8F8]">
      
      {/* FLOATING SPARKLE SYSTEM */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="gold-particle w-1 h-1 left-[10%] top-[25%]" style={{ animationDelay: "0s" }} />
        <div className="gold-particle w-1.5 h-1.5 left-[30%] top-[45%]" style={{ animationDelay: "2s" }} />
        <div className="gold-particle w-1 h-1 left-[55%] top-[15%]" style={{ animationDelay: "4s" }} />
        <div className="gold-particle w-2 h-2 left-[80%] top-[60%]" style={{ animationDelay: "1s" }} />
        <div className="gold-particle w-1 h-1 left-[92%] top-[35%]" style={{ animationDelay: "5s" }} />
      </div>

      {/* HEADER NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 glass-card border-none bg-black/60 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-widest text-[#D4AF37] gold-glow">KARIGOLD</span>
        </div>
        <nav className="hidden xl:flex items-center gap-8 text-sm uppercase tracking-widest">
          <a href="#why-karigold" className="hover:text-[#D4AF37] transition-all text-xs">Why Karigold</a>
          <a href="#live-rates" className="hover:text-[#D4AF37] transition-all text-xs">Live Prices</a>
          <a href="#categories" className="hover:text-[#D4AF37] transition-all text-xs">Categories</a>
          <a href="#featured-collections" className="hover:text-[#D4AF37] transition-all text-xs">Collections</a>
          <a href="#builder" className="hover:text-[#D4AF37] transition-all text-xs">Custom Craft</a>
          <a href="#transparency" className="hover:text-[#D4AF37] transition-all text-xs">Transparent Pricing</a>
          <a href="#karigars" className="hover:text-[#D4AF37] transition-all text-xs">Meet Karigars</a>
          <a href="#huid" className="hover:text-[#D4AF37] transition-all text-xs">HUID Verification</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#builder" className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold text-xs tracking-widest uppercase px-5 py-2.5 rounded transition-all duration-300">
            Build Gold
          </a>
        </div>
      </header>

      {/* SECTION 1 — HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-end lg:justify-center items-center pt-24 pb-12 px-6 md:px-12 z-10 overflow-hidden dark-gold-gradient">
        <div className="absolute inset-0 w-full h-full object-cover opacity-35 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="https://assets.mixkit.co/videos/preview/mixkit-gold-dust-particles-floating-slowly-31952-large.mp4"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center mx-auto mt-12 lg:mt-0">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] mb-4 inline-block font-semibold">
            India&apos;s First Karigar-First Gold Jewellery Brand
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight tracking-wide mb-6">
            Crafted by Masters. <br/>
            <span className="gold-gradient-text gold-glow-subtle">Worn by You.</span>
          </h1>
          <p className="text-[#B8B8B8] font-sans text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Discover beautifully hand-forged pure gold jewellery with complete transparency in purity, pricing, and master craftsmanship.
          </p>
          <div className="flex flex-wrap gap-4 justify-center w-full sm:w-auto">
            <a href="#categories" className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold tracking-wider text-xs uppercase px-8 py-4 rounded transition-all duration-300 w-full sm:w-auto text-center">
              Explore Collections
            </a>
            <a href="#karigars" className="border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold tracking-wider text-xs uppercase px-8 py-4 rounded transition-all duration-300 w-full sm:w-auto text-center">
              Meet Our Karigars
            </a>
          </div>
        </div>
      </section>

      {/* LIVE GOLD RATES TICKER SECTION */}
      <LiveGoldRates />

      {/* SECTION 2 — WHY KARIGOLD EXISTS */}
      <section id="why-karigold" className="py-24 px-6 md:px-12 bg-black border-y border-white/5 flex justify-center items-center">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">The Honest Narrative</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Behind Every Piece of Gold is a <span className="gold-gradient-text">Master Hand.</span>
              </h2>
              <p className="text-[#B8B8B8] leading-relaxed text-sm md:text-base mb-6">
                Traditional jewellery buying often lacks transparency. Customers rarely know who forged their metals, why making charges vary, or how craftsmanship is valued.
              </p>
              <p className="text-[#B8B8B8] leading-relaxed text-sm md:text-base">
                KARIGOLD is here to make gold buying transparent, human, craftsmanship-first, and technology-enabled.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#0D0D0D] border border-white/5 p-6 rounded hover:border-[#D4AF37]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold mb-4">01</div>
                <h4 className="font-serif text-lg font-semibold text-white mb-2">Absolute Transparency</h4>
                <p className="text-[#B8B8B8] text-xs leading-relaxed">
                  We verify exactly what portion of your expenditure goes toward gold value, handcrafting fees, and government tax limits.
                </p>
              </div>

              <div className="bg-[#0D0D0D] border border-white/5 p-6 rounded hover:border-[#D4AF37]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold mb-4">02</div>
                <h4 className="font-serif text-lg font-semibold text-white mb-2">Direct Karigar Welfare</h4>
                <p className="text-[#B8B8B8] text-xs leading-relaxed">
                  By working directly with master artisans, we ensure premium, sustainable payouts flow straight back to local workshops.
                </p>
              </div>

              <div className="bg-[#0D0D0D] border border-white/5 p-6 rounded hover:border-[#D4AF37]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold mb-4">03</div>
                <h4 className="font-serif text-lg font-semibold text-white mb-2">100% Genuine HUID Gold</h4>
                <p className="text-[#B8B8B8] text-xs leading-relaxed">
                  Every asset carries certified state laboratory hallmarks accompanied by unique, trackable 6-digit HUID codes.
                </p>
              </div>

              <div className="bg-[#0D0D0D] border border-white/5 p-6 rounded hover:border-[#D4AF37]/20 transition-all duration-300">
                <div className="w-12 h-12 rounded bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-xl font-bold mb-4">04</div>
                <h4 className="font-serif text-lg font-semibold text-white mb-2">Human Story Connection</h4>
                <p className="text-[#B8B8B8] text-xs leading-relaxed">
                  Meet the goldsmith assigned to forge your order, explore their cultural background, and track the journey from fire to box.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — SHOP BY CATEGORY */}
      <section id="categories" className="py-24 px-6 md:px-12 bg-[#050505] flex justify-center items-center">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">Curated Lines</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Shop By Category</h2>
            <p className="text-[#B8B8B8] font-sans text-sm md:text-base max-w-xl mx-auto">
              Explore timeless collections meticulously hand-cast in various gold weights and configurations from our active workshops.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Rings", desc: "Fine bands & kundan settings", price: "₹18,500" },
              { name: "Earrings", desc: "Filigree hoops & modern studs", price: "₹24,000" },
              { name: "Chains", desc: "Hand-linked solid gold ropes", price: "₹38,000" },
              { name: "Necklaces", desc: "Intricate temple and filigree collars", price: "₹85,000" },
              { name: "Pendants", desc: "Symmetrical heritage gold carvings", price: "₹14,500" },
              { name: "Bracelets", desc: "Chased chains and structured kadas", price: "₹32,000" },
              { name: "Bangles", desc: "Engraved heavy gold classic sets", price: "₹45,000" },
              { name: "Mangalsutra", desc: "Minimal strings with direct artisan care", price: "₹29,000" },
              { name: "Bridal Collection", desc: "Grand heirloom sets for precious milestones", price: "₹1,80,000" },
              { name: "Everyday Collection", desc: "Minimal sleek 18K gold statements", price: "₹12,500" },
              { name: "Men's Jewellery", desc: "Bold signets and heavyweight chains", price: "₹42,000" },
              { name: "Custom Jewellery", desc: "Co-created with our master goldsmiths", price: "₹35,000" },
            ].map((cat, i) => (
              <a href="#builder" key={i} className="group bg-[#0D0D0D] border border-white/5 p-6 rounded-lg text-left hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1 block relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/5 rounded-bl-full group-hover:bg-[#D4AF37]/10 transition-all" />
                <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-all mb-1">{cat.name}</h4>
                <p className="text-[#B8B8B8] text-xs mb-4 min-h-[32px]">{cat.desc}</p>
                <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-3">
                  <span className="text-[10px] uppercase text-[#B8B8B8] tracking-wider">Starting from</span>
                  <span className="text-[#D4AF37] text-sm font-semibold">{cat.price}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED COLLECTIONS */}
      <section id="featured-collections" className="py-24 px-6 md:px-12 bg-black border-y border-white/5 flex justify-center items-center">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">The Design Guild</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Featured Collections</h2>
            <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto">
              Every design tells a distinct cultural story. Select your aesthetic style, forged inside our state-of-the-art heritage furnaces.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Collection 1 */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-lg overflow-hidden group hover:border-[#D4AF37]/20 transition-all">
              <div className="h-64 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
                <span className="absolute bottom-4 left-4 bg-[#D4AF37] text-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold">Daily Lux</span>
              </div>
              <div className="p-6 text-left">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Everyday Gold</h3>
                <p className="text-[#B8B8B8] text-xs leading-relaxed mb-6">
                  Sleek, delicate 18K solid gold rings, cuffs, and drop chains tailored for active daily routines. Bold statements in minimalist form.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#B8B8B8]">Story of clean lines</span>
                  <a href="#builder" className="text-[#D4AF37] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all">
                    Explore Build <span className="text-[14px]">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Collection 2 */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-lg overflow-hidden group hover:border-[#D4AF37]/20 transition-all">
              <div className="h-64 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
                <span className="absolute bottom-4 left-4 bg-white/10 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-semibold border border-white/10">Bridal</span>
              </div>
              <div className="p-6 text-left">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Bridal Masterpieces</h3>
                <p className="text-[#B8B8B8] text-xs leading-relaxed mb-6">
                  Opulent, heavy-carat heritage bridal sets. Features solid kundan work, intricate Jadau gems, and mythology-inspired chokers for classic weddings.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#B8B8B8]">Story of royal unions</span>
                  <a href="#builder" className="text-[#D4AF37] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all">
                    Explore Build <span className="text-[14px]">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Collection 3 */}
            <div className="bg-[#0D0D0D] border border-white/5 rounded-lg overflow-hidden group hover:border-[#D4AF37]/20 transition-all">
              <div className="h-64 bg-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
                <span className="absolute bottom-4 left-4 bg-white/10 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-semibold border border-white/10">Heritage</span>
              </div>
              <div className="p-6 text-left">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">Heritage Filigree</h3>
                <p className="text-[#B8B8B8] text-xs leading-relaxed mb-6">
                  Intricate filigree work inspired by historical Indian patterns, handcrafted under the guidance of our master goldsmiths.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#B8B8B8]">Story of local legends</span>
                  <a href="#builder" className="text-[#D4AF37] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all">
                    Explore Build <span className="text-[14px]">→</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — INTERACTIVE JEWELRY BUILDER */}
      <section id="builder" className="py-24 px-6 md:px-12 bg-[#050505] flex justify-center items-center relative overflow-hidden">
        <div className="max-w-7xl w-full relative z-10">
          
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">Bespoke Workshop</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Build Your Own Gold Jewellery</h2>
            <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto">
              Select your configurations and design a bespoke heirloom. Your piece will be forged entirely by hand with absolute transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Customizer Interactive Preview Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="glass-card rounded-lg p-8 text-center relative overflow-hidden gold-border-glow min-h-[480px] flex flex-col justify-between">
                
                {/* Visual Representation of Gold Item */}
                <div className="my-auto flex flex-col items-center relative py-12">
                  <div className="w-36 h-36 rounded-full flex items-center justify-center relative transition-all duration-500"
                    style={{
                      background: customPurity === "24K" 
                        ? "radial-gradient(circle, #FFF2A1 0%, #D4AF37 60%, #AA7C11 100%)" 
                        : customPurity === "22K"
                        ? "radial-gradient(circle, #F8E088 0%, #CFA12E 60%, #9C6C0A 100%)"
                        : "radial-gradient(circle, #ECC483 0%, #B88B27 60%, #825F06 100%)",
                      boxShadow: `0 0 ${customWeight * 1.5}px rgba(212, 175, 55, 0.45)`,
                      border: customFinish === "Hammered" ? "3px dashed rgba(255,255,255,0.2)" : customFinish === "Antique" ? "4px double #553b00" : "1px solid rgba(255,255,255,0.15)",
                      transform: `scale(${1 + customWeight * 0.005})`
                    }}
                  >
                    <div className="text-black/80 font-serif font-bold text-xs uppercase tracking-widest text-center px-4 flex flex-col items-center">
                      {customCategory === "Ring" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="8" />
                          <circle cx="12" cy="5" r="2" />
                        </svg>
                      )}
                      {customCategory === "Necklace" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                          <path d="M5 5c0 6.6 5.4 12 12 12s12-5.4 12-12" />
                          <circle cx="12" cy="14" r="2.5" />
                        </svg>
                      )}
                      {customCategory === "Pendant" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                          <rect x="8" y="8" width="8" height="8" rx="1" />
                          <line x1="12" y1="2" x2="12" y2="8" />
                        </svg>
                      )}
                      {customCategory === "Earrings" && (
                        <svg className="w-16 h-16 stroke-current stroke-[1.5] fill-none" viewBox="0 0 24 24">
                          <circle cx="8" cy="12" r="3" />
                          <circle cx="16" cy="12" r="3" />
                          <path d="M8 9V4M16 9V4" />
                        </svg>
                      )}
                      <span className="text-[10px] mt-2 block font-semibold">{customWeight}g {customPurity}</span>
                    </div>

                    {customEngraving && (
                      <div className="absolute bottom-2 left-0 right-0 text-[9px] uppercase tracking-wider text-black bg-white/70 py-0.5 px-2 rounded-full max-w-[80%] mx-auto truncate font-sans">
                        &ldquo;{customEngraving}&rdquo;
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-left max-w-sm w-full bg-black/40 border border-white/5 rounded p-3">
                    <p className="text-[11px] text-[#B8B8B8] leading-relaxed">
                      <span className="text-[#D4AF37] font-semibold">Finish Applied:</span> {customFinish} Gold. Symmetrical texturing and polishing will be conducted based on active metal carats.
                    </p>
                  </div>
                </div>

                {/* Goldsmith Attribution */}
                <div className="border-t border-white/5 pt-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden flex items-center justify-center border border-[#D4AF37]/30">
                      <span className="text-xs font-bold text-[#D4AF37]">{customArtisan.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#B8B8B8] uppercase tracking-wider block">Assigned Goldsmith</span>
                      <span className="text-white text-xs font-serif font-bold">
                        Crafted by {customArtisan.name}
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
                <label className="text-xs uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">1. Select Jewelry Base</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Ring", "Necklace", "Pendant", "Earrings"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCustomCategory(cat)}
                      className={`px-3 py-3 rounded text-xs tracking-wider uppercase font-semibold transition-all border ${
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
                <label className="text-xs uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">2. Select Gold Purity</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["24K", "22K", "18K"] as const).map((purity) => (
                    <button
                      key={purity}
                      onClick={() => setCustomPurity(purity)}
                      className={`px-3 py-3 rounded text-xs tracking-wider uppercase font-semibold transition-all border ${
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
                  <label className="text-xs uppercase tracking-widest text-[#B8B8B8] font-semibold">3. Adjust Gold Weight (Grams)</label>
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
                <div className="flex justify-between text-[9px] text-[#B8B8B8] mt-1.5 uppercase tracking-wider">
                  <span>Min: 2g (Delicate)</span>
                  <span>Ideal for everyday: 4g - 15g</span>
                  <span>Max: 50g (Heavy Solid)</span>
                </div>
              </div>

              {/* Option 4: Gold Finish */}
              <div>
                <label className="text-xs uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">4. Select Metal Finish</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Polished", "Matte", "Hammered", "Antique"] as const).map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setCustomFinish(finish)}
                      className={`px-2 py-3 rounded text-xs tracking-wider uppercase font-semibold transition-all border ${
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
                <label className="text-xs uppercase tracking-widest text-[#B8B8B8] block mb-2 font-semibold">5. Personalised Engraving (Complimentary)</label>
                <input
                  type="text"
                  maxLength={24}
                  value={customEngraving}
                  onChange={(e) => setCustomEngraving(e.target.value)}
                  placeholder="Enter name, date, or phrase..."
                  className="w-full bg-black border border-white/5 p-3.5 rounded text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50"
                />
              </div>

              {/* Option 6: Select Master Artisan */}
              <div>
                <label className="text-xs uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">6. Select Master Artisan</label>
                <div className="grid grid-cols-3 gap-2">
                  {ARTISANS.map((artisan) => (
                    <button
                      key={artisan.id}
                      onClick={() => setCustomArtisan(artisan)}
                      className={`px-3 py-2 rounded text-xs transition-all border text-left flex flex-col justify-between min-h-[70px] ${
                        customArtisan.id === artisan.id
                          ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                          : "bg-black text-[#B8B8B8] border-white/5 hover:border-white/15"
                      }`}
                    >
                      <span className="font-serif text-[11px] block leading-tight">{artisan.name}</span>
                      <span className="text-[9px] opacity-75">{artisan.role.split(" ").slice(-2).join(" ")}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Price Breakdown Card */}
              <div className="bg-zinc-950/60 border border-white/5 p-6 rounded-lg mt-4">
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
                  <span className="text-[#D4AF37] font-serif">₹{getCustomTotal().toLocaleString("en-IN")}</span>
                </div>
                
                {/* Checkout Trigger */}
                <button 
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full mt-6 bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold text-xs tracking-widest uppercase py-3.5 rounded transition-all duration-300 font-sans"
                >
                  Order Custom Piece
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 — PRICE TRANSPARENCY CALCULATOR */}
      <section id="transparency" className="py-24 px-6 md:px-12 bg-black border-y border-white/5 flex justify-center items-center">
        <div className="max-w-6xl w-full">
          
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">The Truth in Carats</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Transparent vs Traditional Pricing</h2>
            <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto">
              Compare our flat, transparent making rates directly against the standard industry markups and premium adjustments.
            </p>
          </div>

          {/* Interactive Calculator Inputs */}
          <div className="glass-card rounded-lg p-6 md:p-8 max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-6">
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase tracking-widest text-[#B8B8B8] font-semibold">Gold Weight (Grams)</label>
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
                <label className="text-xs uppercase tracking-widest text-[#B8B8B8] block mb-3 font-semibold">Gold Purity Selection</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["24K", "22K", "18K"] as const).map((pur) => (
                    <button
                      key={pur}
                      onClick={() => setCalcPurity(pur)}
                      className={`py-2 px-3 rounded text-xs tracking-wider uppercase font-semibold transition-all border ${
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
            <div className="glass-card rounded-lg p-8 border-[#D4AF37]/35 relative hover:border-[#D4AF37]/60 transition-all duration-300 bg-zinc-950/40 text-left">
              <span className="absolute top-4 right-4 bg-[#D4AF37]/15 text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#D4AF37]/35">
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
                  <span className="text-emerald-500 font-semibold">₹0 (Zero Markup)</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/5">
                  <span className="text-[#B8B8B8]">Government GST (3% legally capped)</span>
                  <span className="text-white">₹{transparentGST.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span className="text-[#D4AF37]">Final Invoice Price</span>
                  <span className="text-[#D4AF37] font-serif">₹{transparentFinalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/20 border border-emerald-800/20 rounded">
                <p className="text-[10px] text-emerald-400 leading-relaxed text-center font-medium">
                  We guarantee direct artisan wage payout with audited bill transparency.
                </p>
              </div>
            </div>

            {/* TRADITIONAL CARD */}
            <div className="bg-[#0A0A0A] border border-white/5 rounded-lg p-8 relative hover:border-red-900/30 transition-all duration-300 text-left">
              <span className="absolute top-4 right-4 bg-red-950/40 text-red-400 text-[9px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-red-900/25">
                Market Average
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#B8B8B8] mb-6">Traditional Retailer</h3>
              
              <div className="flex flex-col gap-4 text-xs mb-8">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Raw Gold Value ({calcWeight}g @ ₹{selectedPurityRate}/g)</span>
                  <span className="text-[#B8B8B8]">₹{traditionalGoldValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Making Charges (Variable arbitrary ~22%)</span>
                  <span className="text-[#B8B8B8]">₹{traditionalArbitraryMaking.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Hidden Gold Markup / Retail Premium (~18%)</span>
                  <span className="text-[#B8B8B8]">₹{traditionalHiddenPremiumValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-white/5">
                  <span className="text-zinc-500">GST (3% calculated over markup)</span>
                  <span className="text-[#B8B8B8]">₹{traditionalGST.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2">
                  <span className="text-zinc-400">Final Invoice Price</span>
                  <span className="text-zinc-400 font-serif">₹{traditionalFinalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-3.5 bg-red-950/10 border border-red-900/10 rounded">
                <p className="text-[10px] text-red-400 leading-relaxed text-center font-medium">
                  Traditional showrooms hide margins in fluctuating daily rates and arbitrary making schemes.
                </p>
              </div>
            </div>

          </div>

          {/* Comparison summary tag */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-6 py-4 rounded-full">
              <span className="font-serif text-white text-sm md:text-base font-bold">
                You save <span className="text-[#D4AF37] font-sans">₹{(traditionalFinalTotal - transparentFinalTotal).toLocaleString("en-IN")}</span> ({Math.round(((traditionalFinalTotal - transparentFinalTotal) / traditionalFinalTotal) * 100)}% Savings) with KARIGOLD
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7 — MEET THE KARIGARS */}
      <section id="karigars" className="py-24 px-6 md:px-12 bg-[#050505] flex justify-center items-center">
        <div className="max-w-7xl w-full">
          
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">The Hands Behind the Gold</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Meet the Master Karigars</h2>
            <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto">
              Every item is co-created with a designated master goldsmith who receives authentic recognition and fair craftsmanship payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTISANS.map((artisan) => (
              <div 
                key={artisan.id} 
                className="bg-[#0d0d0d] border border-white/5 rounded-lg overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="h-72 w-full relative overflow-hidden bg-zinc-900">
                    <img 
                      src={artisan.image} 
                      alt={artisan.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/10 to-transparent" />
                    <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 rounded text-[10px] text-[#B8B8B8]">
                      {artisan.city}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[#D4AF37] text-[10px] tracking-wider uppercase font-semibold block mb-1">
                      {artisan.role}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-3">{artisan.name}</h3>
                    <p className="text-[#B8B8B8] text-xs leading-relaxed mb-4 line-clamp-3">
                      {artisan.story}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {artisan.specialization.slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setSelectedArtisan(artisan)}
                    className="w-full border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 text-center rounded font-sans"
                  >
                    Read Story & Philosophy
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8 — HUID VALIDATION SIMULATOR */}
      <section id="huid" className="py-24 px-6 md:px-12 bg-black border-y border-white/5 flex justify-center items-center">
        <div className="max-w-4xl w-full">
          
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3 inline-block">100% Verified Authenticity</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Trace Your Gold (HUID Registry)</h2>
            <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto">
              Every item has a trackable 6-digit Hallmark Unique Identification (HUID). Test a code below to verify purity metrics and artisan attributions.
            </p>
          </div>

          <div className="glass-card rounded-lg p-6 md:p-10 border-[#D4AF37]/20 bg-zinc-950/40">
            
            <form onSubmit={handleHuidVerify} className="flex flex-col sm:flex-row gap-3 mb-8">
              <input 
                type="text" 
                maxLength={8}
                placeholder="Enter 6-digit HUID (e.g. KGD22K, KGD24K, Ramesh999)" 
                value={huidInput}
                onChange={(e) => setHuidInput(e.target.value)}
                className="flex-grow bg-black border border-white/15 p-4 rounded text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37]/50 tracking-wider font-semibold"
              />
              <button 
                type="submit"
                disabled={huidLoading || !huidInput.trim()}
                className="bg-[#D4AF37] hover:bg-[#AA7C11] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded transition-all duration-300 shrink-0 font-sans"
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
                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
                  <p className="text-xs text-[#B8B8B8] uppercase tracking-widest animate-pulse">Contacting Bureau of Indian Standards (BIS) Registry...</p>
                </motion.div>
              )}

              {huidReport && !huidLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-[#D4AF37]/25 bg-black/40 rounded p-6 text-left"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] text-[#B8B8B8] uppercase tracking-wider block">HUID Code</span>
                      <span className="text-lg font-mono font-bold text-white tracking-widest">{huidReport.code}</span>
                    </div>
                    <div className="text-right">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {huidReport.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#B8B8B8] block mb-1">Hallmarking Assay Lab</span>
                      <span className="text-white font-medium">{huidReport.lab}</span>
                    </div>
                    <div>
                      <span className="text-[#B8B8B8] block mb-1">Purity Level</span>
                      <span className="text-white font-medium">{huidReport.purity}</span>
                    </div>
                    <div>
                      <span className="text-[#B8B8B8] block mb-1">Declared Net Weight</span>
                      <span className="text-white font-medium">{huidReport.weight}</span>
                    </div>
                    <div>
                      <span className="text-[#B8B8B8] block mb-1">Forged by Goldsmith</span>
                      <span className="text-[#D4AF37] font-semibold">{huidReport.karigar}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 mt-4 pt-4 flex justify-between items-center text-[10px] text-[#B8B8B8]">
                    <span>Standard: IS 1417 : 2016 Compliant</span>
                    <span>Audit Date: {huidReport.timestamp}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* BRAND FOOTER */}
      <footer className="bg-[#050505] pt-24 pb-12 px-6 md:px-12 border-t border-white/5 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5 flex flex-col items-start">
            <span className="font-serif text-3xl font-bold tracking-widest text-[#D4AF37] mb-6">KARIGOLD</span>
            <p className="text-[#B8B8B8] text-xs leading-relaxed max-w-sm mb-6">
              Experience the weight of authentic Indian goldsmithing. We connect you directly with master craftsmen, providing 100% transparent pricing and trackable BIS hallmarked jewelry.
            </p>
            <span className="text-[10px] text-zinc-600 block">
              © {new Date().getFullYear()} KARIGOLD Private Limited. All rights reserved.
            </span>
          </div>

          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-2">Our Craft</h4>
            <a href="#why-karigold" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors">The Karigar Guild</a>
            <a href="#transparency" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors">Transparent Math</a>
            <a href="#builder" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors">Custom Crafting</a>
            <a href="#huid" className="text-[#B8B8B8] hover:text-[#D4AF37] text-xs transition-colors">HUID Validation</a>
          </div>

          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold mb-2">Stay Connected</h4>
            <p className="text-[#B8B8B8] text-xs leading-relaxed mb-2">
              Subscribe to receive updates on newly assigned Karigar collections and local spot bullion insights.
            </p>
            <div className="flex w-full">
              <input 
                type="email" 
                placeholder="Enter email..." 
                className="bg-black border border-white/10 px-4 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-[#D4AF37]/50 rounded-l flex-grow"
              />
              <button className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold text-xs tracking-wider uppercase px-4 rounded-r font-sans">
                Join
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL 1: ARTISAN STORY MODAL */}
      <AnimatePresence>
        {selectedArtisan && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedArtisan(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0D0D0D] border border-[#D4AF37]/25 w-full max-w-4xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Image Column */}
              <div className="md:col-span-5 h-64 md:h-full relative min-h-[300px]">
                <img 
                  src={selectedArtisan.image} 
                  alt={selectedArtisan.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0d0d] via-transparent to-transparent md:from-transparent md:to-[#0d0d0d]/90" />
              </div>

              {/* Details Column */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between text-left">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[#D4AF37] text-[10px] tracking-wider uppercase font-semibold block">
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

                  <p className="text-[13px] text-[#B8B8B8] leading-relaxed mb-6 italic">
                    &ldquo;{selectedArtisan.quote}&rdquo;
                  </p>

                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Heritage Story</h4>
                    <p className="text-[12px] text-[#B8B8B8] leading-relaxed">
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
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Honours & Awards</h4>
                    <ul className="list-disc list-inside text-xs text-[#B8B8B8] flex flex-col gap-1">
                      {selectedArtisan.awards.map((award, i) => (
                        <li key={i}>{award}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-2">Custom Workshop Tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedArtisan.tools.map((tool, i) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white">
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
                    className="flex-grow bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold text-xs tracking-widest uppercase py-3 rounded transition-all duration-300 text-center font-sans"
                  >
                    Assign to Custom Builder
                  </button>
                  <button 
                    onClick={() => setSelectedArtisan(null)}
                    className="border border-white/10 hover:border-white/20 text-[#B8B8B8] hover:text-white px-6 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded font-sans"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={resetCheckout}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0D0D0D] border border-[#D4AF37]/25 w-full max-w-lg rounded-lg p-6 md:p-8 text-left"
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
                  <div className="bg-zinc-950/80 p-4 border border-white/5 rounded text-xs">
                    <div className="grid grid-cols-2 gap-y-2 text-[#B8B8B8]">
                      <div>Item Base: <span className="text-white font-bold">{customCategory}</span></div>
                      <div>Gold Purity: <span className="text-white font-bold">{customPurity}</span></div>
                      <div>Weight: <span className="text-white font-bold">{customWeight}g</span></div>
                      <div>Finish Applied: <span className="text-white font-bold">{customFinish}</span></div>
                      {customEngraving && (
                        <div className="col-span-2">Engraving: <span className="text-[#D4AF37] font-semibold">&ldquo;{customEngraving}&rdquo;</span></div>
                      )}
                      <div className="col-span-2">Assigned Karigar: <span className="text-white font-semibold">{customArtisan.name}</span></div>
                    </div>
                    <div className="border-t border-white/5 mt-3 pt-3 flex justify-between font-bold text-sm">
                      <span className="text-[#D4AF37]">Total (incl. GST)</span>
                      <span className="text-[#D4AF37] font-serif">₹{getCustomTotal().toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Customer Inputs */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter full name..."
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="bg-black border border-white/10 p-3 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Mobile with country code..."
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        className="bg-black border border-white/10 p-3 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="yourname@domain.com"
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        className="bg-black border border-white/10 p-3 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase text-[#B8B8B8] tracking-widest font-semibold">Shipping Address (India Delivery Only)</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Enter complete delivery address..."
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="bg-black border border-white/10 p-3 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#AA7C11] text-black font-semibold text-xs tracking-widest uppercase py-3.5 rounded mt-3 transition-all duration-300 font-sans"
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
                  <p className="text-xs text-[#B8B8B8] leading-relaxed max-w-sm mb-6">
                    Thank you, <span className="text-white font-bold">{checkoutName}</span>. Your custom request has been logged. {customArtisan.name} is scheduled to forge your order in the upcoming weekly workshop cycle.
                  </p>

                  <div className="bg-zinc-950/80 border border-white/5 p-4 rounded text-xs mb-8 w-full">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#B8B8B8]">Temporary Order Reference ID:</span>
                      <span className="text-white font-mono font-bold">{generatedOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8B8B8]">BIS Hallmarked HUID Allocation:</span>
                      <span className="text-[#D4AF37] font-semibold">Allocating on Casting...</span>
                    </div>
                  </div>

                  <button 
                    onClick={resetCheckout}
                    className="border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-8 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded font-sans"
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
