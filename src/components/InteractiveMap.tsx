import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Sparkles, Navigation, DollarSign, Crosshair, HelpCircle } from "lucide-react";
import { Property } from "../types";

interface InteractiveMapProps {
  darkMode: boolean;
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

// Coordinate layout simulation for world cities
const MAP_LOCATIONS = [
  { id: "loc-la", name: "Bel Air & Malibu", x: "22%", y: "42%", count: 2, desc: "Elite canyon & beachfront retreats" },
  { id: "loc-ny", name: "New York Midtown", x: "32%", y: "35%", count: 2, desc: "Upper East Side duplexes & suites" },
  { id: "loc-mo", name: "Monaco Larvotto", x: "50%", y: "30%", count: 2, desc: "Cliffside aggregate concrete villas" },
  { id: "loc-db", name: "Dubai Palm Jumeirah", x: "65%", y: "45%", count: 1, desc: "Biophilic waterfront estates" },
  { id: "loc-mb", name: "Mumbai Malabar Hill", x: "74%", y: "52%", count: 1, desc: "High-rise ocean overlooks" }
];

export default function InteractiveMap({ darkMode, properties, onSelectProperty }: InteractiveMapProps) {
  const [activeLocationId, setActiveLocationId] = useState<string | null>("loc-la");

  // Filter properties matching selected coordinate area
  const activeProperties = properties.filter(p => {
    if (activeLocationId === "loc-la") return p.city === "Los Angeles" || p.city === "Malibu";
    if (activeLocationId === "loc-ny") return p.city === "New York";
    if (activeLocationId === "loc-mo") return p.city === "Monaco";
    if (activeLocationId === "loc-db") return p.city === "Dubai";
    if (activeLocationId === "loc-mb") return p.city === "Mumbai";
    return false;
  });

  return (
    <section id="map" className={`py-24 transition-colors duration-300 ${
      darkMode ? "bg-slate-950" : "bg-slate-50/50"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
              Global Coordination Portal
            </span>
            <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
              darkMode ? "text-white" : "text-slate-950"
            }`}>
              Interactive World Plotting
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Trace our off-market properties globally. Select any pulsing golden hub to reveal real-time estate lists, architectural summaries, and pricing.
          </p>
        </div>

        {/* Map Stage Grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left panel: Selected Hub Listings */}
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Crosshair size={16} className="animate-pulse" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-wider ${darkMode ? "text-white" : "text-slate-950"}`}>
                    Active Coordinate Hub
                  </h3>
                  <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest block mt-0.5">
                    {MAP_LOCATIONS.find(l => l.id === activeLocationId)?.name || "Select A coordinate"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {activeProperties.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => onSelectProperty(p)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 hover:scale-[1.01] ${
                      darkMode 
                        ? "bg-slate-900/40 border-slate-900/80 hover:bg-slate-900/80" 
                        : "bg-white border-slate-200/55 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-bold uppercase tracking-wide truncate ${
                        darkMode ? "text-white" : "text-slate-950"
                      }`}>
                        {p.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{p.address}</p>
                      <div className="text-xs font-mono font-bold text-amber-500 mt-2">{p.formattedPrice}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Quick private viewing notice */}
            <div className={`mt-8 p-5 rounded-3xl border ${
              darkMode ? "bg-slate-900/10 border-slate-900/60" : "bg-slate-100/30 border-slate-200/40"
            }`}>
              <div className="flex gap-3">
                <Navigation size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Exclusive Transit</span>
                  <p className={`text-xs mt-1 leading-relaxed font-light ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                    Private helicopter transit can be arranged for scheduled walkthroughs in Los Angeles, Dubai, and Monaco. Connect with our partner desks.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Gorgeous stylized vector world map background */}
          <div className={`lg:col-span-2 relative min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden border flex items-center justify-center ${
            darkMode ? "bg-slate-900/30 border-slate-900" : "bg-slate-100/40 border-slate-200"
          }`}>
            
            {/* Elegant World Grid Background Pattern */}
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: `radial-gradient(${darkMode ? '#FFFFFF' : '#0F172A'} 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }} />

            {/* Simulated stylized clean landmass outlines */}
            <svg viewBox="0 0 1000 600" className={`absolute inset-0 w-full h-full object-cover p-4 opacity-25 ${
              darkMode ? "fill-slate-800" : "fill-slate-300"
            }`}>
              {/* North America */}
              <path d="M 50 150 Q 150 100 250 120 T 350 250 T 250 450 Q 180 430 150 350 Z" />
              {/* South America */}
              <path d="M 250 450 Q 280 480 320 580 Q 280 580 260 520 Z" />
              {/* Europe & Asia */}
              <path d="M 450 100 Q 550 80 650 120 T 800 150 T 950 250 T 850 450 Q 750 480 650 400 Z" />
              {/* Africa */}
              <path d="M 450 320 Q 550 350 600 450 Q 550 550 500 520 Q 420 450 450 320 Z" />
            </svg>

            {/* Pulses on Map nodes */}
            {MAP_LOCATIONS.map((loc) => {
              const isActive = activeLocationId === loc.id;
              
              return (
                <div
                  key={loc.id}
                  className="absolute"
                  style={{ left: loc.x, top: loc.y }}
                >
                  <button
                    onClick={() => setActiveLocationId(loc.id)}
                    className="relative flex items-center justify-center group focus:outline-none"
                    aria-label={`Select ${loc.name}`}
                  >
                    
                    {/* Ripple 1 */}
                    <div className={`absolute w-10 h-10 rounded-full bg-amber-500/30 -z-10 animate-ping duration-1000`} />
                    {/* Ripple 2 */}
                    <div className={`absolute w-6 h-6 rounded-full bg-amber-500/40 -z-10 animate-pulse`} />

                    {/* Pin itself */}
                    <div className={`p-2 rounded-full border shadow-lg transition-transform group-hover:scale-110 ${
                      isActive 
                        ? "gold-button-gradient text-slate-950 border-amber-500" 
                        : "bg-slate-950 border-slate-700 text-amber-500"
                    }`}>
                      <MapPin size={14} className={isActive ? "fill-slate-950" : ""} />
                    </div>

                    {/* Floating label on hover */}
                    <div className="absolute top-full mt-2 bg-slate-950 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {loc.name} ({loc.count} Estates)
                    </div>

                  </button>
                </div>
              );
            })}

            {/* Bottom Floating Info overlay panel */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="glass-dark border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[8px] font-mono text-amber-400 font-bold uppercase tracking-widest">Aesthetic Hub Vibe</span>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-white mt-1">
                    {MAP_LOCATIONS.find(l => l.id === activeLocationId)?.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-light">
                    {MAP_LOCATIONS.find(l => l.id === activeLocationId)?.desc}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="bg-amber-500/10 text-amber-500 font-mono text-[10px] px-3 py-1.5 rounded-xl border border-amber-500/20 font-bold uppercase tracking-wider">
                    {MAP_LOCATIONS.find(l => l.id === activeLocationId)?.count} Estates Verified
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
