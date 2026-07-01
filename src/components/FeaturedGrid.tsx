import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, Share2, BedDouble, Bath, Maximize2, Car, 
  Eye, Compass, Phone, Sparkles, Filter, CalendarCheck, HelpCircle, ArrowUpDown, ChevronDown
} from "lucide-react";
import { Property, PropertyCategory, PropertyType } from "../types";

interface FeaturedGridProps {
  darkMode: boolean;
  properties: Property[];
  savedProperties: Property[];
  onToggleSave: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onOpenConsultant: () => void;
}

export default function FeaturedGrid({
  darkMode,
  properties,
  savedProperties,
  onToggleSave,
  onSelectProperty,
  onOpenConsultant
}: FeaturedGridProps) {
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState<"all" | PropertyCategory>("all");
  const [priceCap, setPriceCap] = useState<number>(100); // in Crores
  const [bedsMin, setBedsMin] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "area-desc" | "featured">("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Available unique cities for filters
  const cities = useMemo(() => {
    const list = new Set(properties.map(p => p.city));
    return ["All Cities", ...Array.from(list)];
  }, [properties]);

  // Execute sophisticated filtering
  const filteredProperties = useMemo(() => {
    return properties
      .filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCity = selectedCity === "All Cities" || p.city === selectedCity;
        const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
        const matchesPrice = p.price <= priceCap * 10000000;
        const matchesBeds = p.beds >= bedsMin;

        return matchesSearch && matchesCity && matchesCategory && matchesPrice && matchesBeds;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "area-desc") return b.area - a.area;
        // Default: Featured first, then high price
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.price - a.price;
      });
  }, [properties, searchQuery, selectedCity, selectedCategory, priceCap, bedsMin, sortBy]);

  const handleShare = (e: React.MouseEvent, prop: Property) => {
    e.stopPropagation();
    const mockUrl = `${window.location.origin}/property/${prop.id}`;
    navigator.clipboard.writeText(mockUrl);
    setShareToast(prop.id);
    setTimeout(() => setShareToast(null), 2000);
  };

  return (
    <section id="properties" className="py-24 max-w-7xl mx-auto px-6">
      
      {/* Upper header block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            Curated Private Catalogues
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Featured Global Portfolios
          </h2>
        </div>

        {/* Toggle filters trigger */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3 mt-4 md:mt-0 rounded-2xl border text-xs font-bold uppercase tracking-widest transition-all ${
            showFilters 
              ? "bg-amber-500 text-slate-950 border-amber-500" 
              : darkMode 
                ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
                : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Filter size={14} />
          <span>Advanced Vetting</span>
        </button>
      </div>

      {/* Filter panel dropdown */}
      <AnimatePresence>
        {(showFilters || searchQuery || selectedCity !== "All Cities" || selectedCategory !== "all" || bedsMin > 0 || priceCap < 50) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden rounded-3xl border mb-12 p-6 ${
              darkMode ? "bg-slate-900/60 border-slate-900" : "bg-slate-50/60 border-slate-100"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Filter 1: Instant Search query */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">Search Keywords</span>
                <input
                  type="text"
                  placeholder="e.g. Elysian, Malibu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              {/* Filter 2: City Choice */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">Metropolitan Cities</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none appearance-none cursor-pointer ${
                    darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                  }`}
                >
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Filter 3: Category Select */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">Schedules</span>
                <div className="flex gap-1 bg-slate-200 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-900">
                  {([
                    { id: "all", name: "All" },
                    { id: "buy", name: "Acquire" },
                    { id: "rent", name: "Lease" }
                  ] as const).map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`flex-1 text-[10px] uppercase font-bold tracking-widest py-1.5 rounded-lg transition-all ${
                        selectedCategory === tab.id 
                          ? "bg-amber-500 text-slate-950 shadow-md" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 4: Beds minimum */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">Min Bedrooms</span>
                <div className="flex gap-1.5">
                  {[0, 3, 5, 7].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBedsMin(num)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                        bedsMin === num 
                          ? "bg-amber-500 border-amber-500 text-slate-950" 
                          : darkMode 
                            ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900" 
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {num === 0 ? "Any" : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Price Slider + Sort Selector row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              
              {/* Price Cap limit */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">Maximum Asset Value</span>
                  <span className="font-mono text-xs font-bold text-amber-500">₹{priceCap} Crore</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={priceCap}
                  onChange={(e) => setPriceCap(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Sorting and Reset controls */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5 w-full">
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">Order Priority</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none cursor-pointer w-full ${
                      darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                    }`}
                  >
                    <option value="featured">Featured & Prestige first</option>
                    <option value="price-asc">Price: Conservative to Premium</option>
                    <option value="price-desc">Price: Private Premium to Conservative</option>
                    <option value="area-desc">Sizing: Sprawling Footprints</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCity("All Cities");
                    setSelectedCategory("all");
                    setPriceCap(100);
                    setBedsMin(0);
                    setSortBy("featured");
                  }}
                  className="px-5 py-3 rounded-xl hover:text-amber-500 text-slate-400 font-mono font-bold text-[10px] uppercase tracking-widest border border-slate-200 dark:border-slate-800 hover:border-amber-500 mt-5 shrink-0"
                >
                  Reset Vetting
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Properties Grid list */}
      {filteredProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 border border-dashed rounded-3xl p-12 dark:border-slate-800 border-slate-200"
        >
          <HelpCircle size={48} className="mx-auto text-amber-500 stroke-1 mb-4" />
          <h3 className={`text-lg font-bold uppercase tracking-wider ${darkMode ? "text-white" : "text-slate-950"}`}>
            Unmatched Vetting Coordinates
          </h3>
          <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto leading-relaxed font-light">
            No active estate in our public catalogue strictly meets these parameters. Ask our elite AI advisor to seek off-market matches in Monaco, Malibu, or Bel Air.
          </p>
          <button
            onClick={onOpenConsultant}
            className="mt-6 gold-button-gradient text-slate-950 font-bold px-6 py-3 rounded-2xl text-xs uppercase tracking-widest hover:opacity-95 transition-all flex items-center gap-2 mx-auto"
          >
            <Sparkles size={14} />
            <span>Consult Private AI Broker</span>
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProperties.map((prop, index) => {
              const isSaved = savedProperties.some(s => s.id === prop.id);
              const isSharing = shareToast === prop.id;

              return (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => onSelectProperty(prop)}
                  className={`rounded-3xl overflow-hidden group border cursor-pointer transition-all duration-300 relative ${
                    darkMode 
                      ? "bg-slate-900/40 border-slate-900 hover:bg-slate-900/70" 
                      : "bg-white border-slate-100 hover:bg-slate-50 premium-shadow-light"
                  }`}
                  id={`prop-card-${prop.id}`}
                >
                  
                  {/* Property Cover Image Slider area */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={prop.image} 
                      alt={prop.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient shade bottom on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Left Badges: category and type */}
                    <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                      <span className="bg-slate-950/70 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-mono">
                        {prop.category === "buy" ? "Acquire" : prop.category === "rent" ? "Lease" : "Corporate"}
                      </span>
                      {prop.featured && (
                        <span className="gold-button-gradient text-slate-950 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-amber-500/10">
                          <Sparkles size={10} />
                          <span>Prestige</span>
                        </span>
                      )}
                    </div>

                    {/* Right action icons: Save & Share */}
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(prop);
                        }}
                        className={`p-2.5 rounded-full backdrop-blur-md border transition-colors cursor-pointer ${
                          isSaved 
                            ? "bg-red-500 border-red-500 text-white" 
                            : "bg-slate-950/50 border-white/10 text-white hover:bg-slate-950"
                        }`}
                        title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
                      >
                        <Heart size={14} className={isSaved ? "fill-white" : ""} />
                      </button>

                      {/* Share Button with toast */}
                      <div className="relative">
                        <button
                          onClick={(e) => handleShare(e, prop)}
                          className="p-2.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white hover:bg-slate-950 transition-colors cursor-pointer"
                          title="Copy Private Link"
                        >
                          <Share2 size={14} />
                        </button>
                        
                        <AnimatePresence>
                          {isSharing && (
                            <motion.span
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              className="absolute right-0 bottom-full mb-2 bg-slate-950 text-amber-500 border border-amber-500/20 px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap z-30"
                            >
                              Link Saved!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>

                    {/* Floating Pricing */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="text-xl font-bold font-mono text-white tracking-tight">
                        {prop.formattedPrice}
                      </div>
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1 font-mono">
                        <Compass size={10} />
                        <span>{prop.city}</span>
                      </div>
                    </div>

                  </div>

                  {/* Body textual content */}
                  <div className="p-6">
                    <h3 className={`text-base font-bold uppercase tracking-wide truncate transition-colors group-hover:text-amber-500 ${
                      darkMode ? "text-white" : "text-slate-950"
                    }`}>
                      {prop.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 truncate font-light leading-relaxed">
                      {prop.address}
                    </p>

                    {/* Features checklist */}
                    <div className="grid grid-cols-4 gap-2 mt-6 py-4 border-y border-slate-100 dark:border-slate-900 text-slate-500 dark:text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <BedDouble size={14} className="text-slate-400 mb-1" />
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{prop.beds}</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400">Beds</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Bath size={14} className="text-slate-400 mb-1" />
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{prop.baths}</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400">Baths</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Maximize2 size={14} className="text-slate-400 mb-1" />
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{prop.area.toLocaleString()}</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400">Sq Ft</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Car size={14} className="text-slate-400 mb-1" />
                        <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">{prop.parking}</span>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400">Park</span>
                      </div>
                    </div>

                    {/* Footer card actions */}
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-bold uppercase tracking-wider font-mono">
                        <span>● Digital Walking Tour</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProperty(prop);
                        }}
                        className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all border ${
                          darkMode 
                            ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800 hover:border-amber-500/20" 
                            : "bg-slate-100 border-transparent text-slate-800 hover:bg-slate-200"
                        }`}
                      >
                        <span>Analyze</span>
                        <Eye size={12} />
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

    </section>
  );
}
