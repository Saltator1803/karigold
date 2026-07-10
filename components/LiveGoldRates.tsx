"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GoldRates {
  pricePerGram24K: number;
  pricePer10g24K: number;
  pricePerGram22K: number;
  pricePer10g22K: number;
}

// Smooth animated counter component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 1200; // Duration of animation in ms
    const startTime = performance.now();
    let animationFrameId: number;

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>₹{displayValue.toLocaleString("en-IN")}</span>;
}

export default function LiveGoldRates() {
  const [rates, setRates] = useState<GoldRates | null>(null);
  const [prevRates, setPrevRates] = useState<GoldRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(21600); // 6 hours in seconds

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const fetchRates = async () => {
    try {
      const res = await fetch("/api/gold-rate");
      if (!res.ok) {
        throw new Error(`Server returned status code ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.rates) {
        const newRates: GoldRates = {
          pricePerGram24K: data.rates.gold24k.pricePerGram,
          pricePer10g24K: data.rates.gold24k.pricePer10g,
          pricePerGram22K: data.rates.gold22k.pricePerGram,
          pricePer10g22K: data.rates.gold22k.pricePer10g,
        };

        setRates((prev) => {
          if (prev) {
            setPrevRates(prev);
          }
          return newRates;
        });

        setLastUpdated(data.lastUpdated || "--:--:--");
        setError(null);
        setCountdown(21600); // Reset timer
      } else {
        throw new Error("Invalid response format received from API.");
      }
    } catch (err: any) {
      console.error("Error fetching live rates:", err);
      setError(err.message || "Failed to fetch real-time gold price feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Poll the server-side API every 15 minutes to sync with server cache.
    // The server cache revalidates every 6 hours, so this fetches the cached value with zero external overhead.
    const fetchInterval = setInterval(fetchRates, 15 * 60 * 1000);

    const timerInterval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 21600));
    }, 1000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const getTrend = (key: keyof GoldRates) => {
    if (!prevRates || !rates) return null;
    if (rates[key] > prevRates[key]) return "up";
    if (rates[key] < prevRates[key]) return "down";
    return null;
  };

  return (
    <section id="live-rates" className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden flex justify-center items-center">
      {/* Subtle gold glow behind section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full px-6 z-10 relative">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 inline-block">
            BULLION TICKER
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Live Gold Prices
          </h2>
          <p className="text-[#B8B8B8] text-sm md:text-base max-w-xl mx-auto">
            Real-time gold prices powered by live market data and updated automatically.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950/20 border border-red-500/20 rounded text-center text-sm text-red-400 max-w-2xl mx-auto">
            <svg className="w-5 h-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}. Retrying automatically in background...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {loading ? (
            // Skeleton Loaders
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-lg p-8 animate-pulse flex flex-col justify-between min-h-[220px] gold-border-glow bg-zinc-950/40"
              >
                <div>
                  <div className="h-4 bg-white/10 rounded w-1/3 mb-6" />
                  <div className="h-8 bg-white/10 rounded w-2/3 mb-4" />
                </div>
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ))
          ) : (
            <>
              {/* CARD 1: 24K Gold */}
              <div className="glass-card rounded-lg p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-zinc-950/40 border border-white/5 hover:border-[#D4AF37]/30 gold-border-glow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B8B8B8] font-bold block mb-1">
                      Bullion Grade
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white">24K Gold</h3>
                  </div>
                  {rates && getTrend("pricePerGram24K") && (
                    <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                      getTrend("pricePerGram24K") === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}>
                      {getTrend("pricePerGram24K") === "up" ? (
                        <svg className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                        </svg>
                      )}
                      {getTrend("pricePerGram24K") === "up" ? "Active Buy" : "Buy Dip"}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B8B8] block mb-1">
                      Price per gram (₹)
                    </span>
                    <div className="text-3xl font-bold text-[#D4AF37] font-serif flex items-center gap-2">
                      {rates && <AnimatedNumber value={rates.pricePerGram24K} />}
                      <span className="text-xs text-[#B8B8B8] font-sans font-normal">/ g</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B8B8] block mb-1">
                      Price per 10 grams (₹)
                    </span>
                    <div className="text-xl font-bold text-white font-serif flex items-center gap-2">
                      {rates && <AnimatedNumber value={rates.pricePer10g24K} />}
                      <span className="text-xs text-[#B8B8B8] font-sans font-normal">/ 10g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: 22K Gold */}
              <div className="glass-card rounded-lg p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-zinc-950/40 border border-white/5 hover:border-[#D4AF37]/30 gold-border-glow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#B8B8B8] font-bold block mb-1">
                      Jewellery Standard
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white">22K Gold</h3>
                  </div>
                  {rates && getTrend("pricePerGram22K") && (
                    <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                      getTrend("pricePerGram22K") === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}>
                      {getTrend("pricePerGram22K") === "up" ? (
                        <svg className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 mr-0.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
                        </svg>
                      )}
                      {getTrend("pricePerGram22K") === "up" ? "Active Buy" : "Buy Dip"}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B8B8] block mb-1">
                      Price per gram (₹)
                    </span>
                    <div className="text-3xl font-bold text-[#D4AF37] font-serif flex items-center gap-2">
                      {rates && <AnimatedNumber value={rates.pricePerGram22K} />}
                      <span className="text-xs text-[#B8B8B8] font-sans font-normal">/ g</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8B8B8] block mb-1">
                      Price per 10 grams (₹)
                    </span>
                    <div className="text-xl font-bold text-white font-serif flex items-center gap-2">
                      {rates && <AnimatedNumber value={rates.pricePer10g22K} />}
                      <span className="text-xs text-[#B8B8B8] font-sans font-normal">/ 10g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: Market Status */}
              <div className="glass-card rounded-lg p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-1 bg-zinc-950/40 border border-white/5 hover:border-[#D4AF37]/30 gold-border-glow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#B8B8B8] font-bold block mb-1">
                        System Status
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white">Market Status</h3>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Live
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#B8B8B8]">Refresh Cycle</span>
                      <span className="text-white font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                        Every 6 Hours
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#B8B8B8]">Last Synced</span>
                      <span className="text-white font-mono">{lastUpdated || "--:--:--"}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#B8B8B8]">Next Refresh in</span>
                  <span className="text-[#D4AF37] font-mono font-bold tracking-widest">
                    {formatTime(countdown)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-[11px] text-[#B8B8B8] leading-relaxed text-center max-w-4xl mx-auto opacity-75">
          <strong>Disclaimer:</strong> Prices are indicative live market rates based on international spot prices and currency conversion. Final jewellery prices may vary depending on making charges, taxes, and product specifications.
        </p>
      </div>
    </section>
  );
}
