import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, IndianRupee, Home, Compass, MapPin, 
  ChevronRight, ArrowDown, Award, Sparkles, Building2
} from "lucide-react";
import { PropertyCategory, PropertyType } from "../types";

interface HeroSectionProps {
  darkMode: boolean;
  onSearch: (filters: {
    category: PropertyCategory;
    location: string;
    budget: number;
    type: string;
  }) => void;
  scrollToSection: (id: string) => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85"
];

const POPULAR_LOCATIONS = ["Los Angeles", "Malibu", "New York", "Monaco", "Dubai", "Mumbai"];
const PROPERTY_TYPES = ["villa", "penthouse", "mansion", "estate", "apartment"];

export default function HeroSection({ darkMode, onSearch, scrollToSection }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<PropertyCategory>("buy");
  const [locationInput, setLocationInput] = useState("");
  const [budgetLimit, setBudgetLimit] = useState<number>(50); // in Millions
  const [selectedType, setSelectedType] = useState<string>("All Types");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  // Background slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category: activeCategory,
      location: locationInput,
      budget: budgetLimit * 1000000,
      type: selectedType === "All Types" ? "" : selectedType
    });
    scrollToSection("properties");
  };

  return (
    <section id="hero" className="relative w-full min-h-[92vh] flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      
      {/* Background image slider */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentImageIndex]})` }}
          />
        </AnimatePresence>
        
        {/* Soft Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/20" />
      </div>

      {/* Floating Particles/Shapes for ultra-luxury feeling */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Core Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Subtle upper pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-[10px] font-bold tracking-widest text-amber-500 uppercase font-mono mb-8 border border-amber-500/30"
        >
          <Sparkles size={10} className="text-amber-400" />
          <span>Award-Winning Architectural Brokerage</span>
        </motion.div>

        {/* Dynamic Typography Header */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight uppercase font-sans max-w-5xl"
        >
          Curating the World's <br />
          <span className="gold-gradient-text tracking-normal lowercase font-serif italic font-normal">ultimate</span> Dream Homes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-slate-300 text-sm sm:text-lg max-w-2xl mt-6 font-light leading-relaxed tracking-wide"
        >
          Bespoke travertine mansions, brutalist seaside pavilions, and sky-high duplexes looking over Central Park, monographed by global visionaries.
        </motion.p>

        {/* Action button options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <button
            onClick={() => scrollToSection("properties")}
            className="gold-button-gradient text-slate-950 font-bold px-8 py-4 rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
          >
            <span>Explore Portfolios</span>
            <ChevronRight size={14} />
          </button>
          <button
            onClick={() => scrollToSection("agents")}
            className="glass-dark text-white border border-slate-700 font-bold px-8 py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2"
          >
            <span>Consult Partner</span>
            <Compass size={14} className="text-amber-500 animate-spin-slow" />
          </button>
        </motion.div>

        {/* Search Engine Filter Module (Glassmorphic Box) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 120, delay: 0.7 }}
          className="w-full max-w-4xl mt-16 rounded-3xl p-2 glass-dark border border-white/10 shadow-2xl relative"
        >
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-2">
            
            {/* Top row categories tabs */}
            <div className="flex gap-1.5 p-1 bg-slate-950/40 border border-slate-900 rounded-2xl w-full sm:w-fit">
              {(["buy", "rent", "commercial"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? "bg-amber-500 text-slate-950" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {cat === "buy" ? "Acquire" : cat === "rent" ? "Lease" : "Corporate"}
                </button>
              ))}
            </div>

            {/* Main Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 items-center">
              
              {/* Field 1: Location Filter */}
              <div className="relative text-left flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                  <MapPin size={10} className="text-amber-500" />
                  <span>Target Location</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bel Air, Malibu..."
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setLocationDropdownOpen(true);
                  }}
                  onFocus={() => setLocationDropdownOpen(true)}
                  className="bg-transparent text-white font-semibold text-sm placeholder-slate-500 focus:outline-none border-b border-slate-800 pb-1 w-full"
                />
                
                {/* Autocomplete Locations dropdown */}
                <AnimatePresence>
                  {locationDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setLocationDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 z-20 shadow-xl"
                      >
                        <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-2">Popular Cities</div>
                        <div className="space-y-0.5">
                          {POPULAR_LOCATIONS.map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => {
                                setLocationInput(loc);
                                setLocationDropdownOpen(false);
                              }}
                              className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center justify-between"
                            >
                              <span>{loc}</span>
                              <span className="text-[9px] text-slate-500 font-mono">Select</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Field 2: Budget Cap slider */}
              <div className="text-left flex flex-col gap-1.5">
                <div className="flex justify-between items-center w-full">
                  <label className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                    <IndianRupee size={10} className="text-amber-500" />
                    <span>Budget Limit</span>
                  </label>
                  <span className="font-mono text-xs font-bold text-amber-500">₹{budgetLimit} Cr</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                />
                <div className="flex justify-between text-[8px] text-slate-600 font-mono">
                  <span>₹1 Cr</span>
                  <span>₹60 Cr+</span>
                </div>
              </div>

              {/* Field 3: Property Type Dropdown */}
              <div className="text-left flex flex-col gap-1.5">
                <label className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                  <Home size={10} className="text-amber-500" />
                  <span>Estates Type</span>
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-slate-800 pb-1 w-full cursor-pointer appearance-none uppercase tracking-wider text-xs"
                >
                  <option value="All Types" className="bg-slate-900 text-white">All Typologies</option>
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-slate-900 text-white uppercase text-xs">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4: Large Search Button */}
              <button
                type="submit"
                className="w-full h-12 gold-button-gradient text-slate-950 font-bold rounded-2xl text-xs uppercase tracking-widest hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <Search size={14} />
                <span>Private Portal</span>
              </button>

            </div>
          </form>
        </motion.div>

        {/* Dynamic Stat overlay row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 border-t border-white/10 pt-10 w-full max-w-5xl"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹12,400 Cr+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold flex items-center justify-center gap-1.5 flex-wrap">
              <Award size={10} className="text-amber-500" />
              <span>Transacted Portfolio</span>
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">99.8%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">
              Client Confidentiality
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold flex items-center justify-center gap-1.5">
              <Building2 size={10} className="text-amber-500" />
              <span>Verified Architecture</span>
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">24/7</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">
              Private Concierge
            </div>
          </div>
        </motion.div>

        {/* Animated bounce scroll arrow */}
        <div 
          onClick={() => scrollToSection("properties")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer hover:text-amber-500 text-slate-500 mt-12 animate-bounce"
        >
          <span className="text-[8px] uppercase tracking-widest font-mono">Scroll Portfolio</span>
          <ArrowDown size={12} />
        </div>

      </div>
    </section>
  );
}
