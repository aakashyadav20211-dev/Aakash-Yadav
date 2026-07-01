import { motion } from "motion/react";
import { 
  Crown, Sun, Building, Sparkles, Building2, ChevronRight
} from "lucide-react";
import { PropertyType } from "../types";

interface PropertyCategoriesProps {
  darkMode: boolean;
  selectedType: string;
  onSelectType: (type: string) => void;
  scrollToSection: (id: string) => void;
}

const CATEGORIES = [
  {
    type: "" as any,
    label: "All Collections",
    desc: "Browse our entire curated inventory",
    icon: Sparkles,
    count: 8,
    bg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
  },
  {
    type: "mansion" as PropertyType,
    label: "Private Mansions",
    desc: "Heated travertine, sprawling estate gates",
    icon: Crown,
    count: 2,
    bg: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80"
  },
  {
    type: "villa" as PropertyType,
    label: "Beachfront Villas",
    desc: "Carbon aggregate concrete, volcanic sand",
    icon: Sun,
    count: 2,
    bg: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80"
  },
  {
    type: "penthouse" as PropertyType,
    label: "Sky Penthouses",
    desc: "Limestone towers overlooking central park",
    icon: Building,
    count: 3,
    bg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"
  },
  {
    type: "apartment" as PropertyType,
    label: "Bespoke Condos",
    desc: "Curated biophilic wall-sculpting panels",
    icon: Building2,
    count: 1,
    bg: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80"
  }
];

export default function PropertyCategories({
  darkMode,
  selectedType,
  onSelectType,
  scrollToSection
}: PropertyCategoriesProps) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            Curated Architectural Classifications
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Aesthetic Typologies
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
          Filter through our global estate directories, catalogued precisely by material signature, structural framework, and landscape setting.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {CATEGORIES.map((cat, index) => {
          const Icon = cat.icon;
          const isSelected = (cat.type === "" && selectedType === "") || (cat.type && selectedType === cat.type);
          
          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => {
                onSelectType(cat.type || "");
                scrollToSection("properties");
              }}
              className={`relative overflow-hidden rounded-3xl h-72 p-6 flex flex-col justify-between group cursor-pointer shadow-lg transition-all ${
                isSelected 
                  ? "ring-2 ring-amber-500" 
                  : darkMode ? "bg-slate-900/40 hover:bg-slate-900/60" : "bg-slate-50 hover:bg-slate-100/60"
              }`}
            >
              {/* Background cover image with soft scale effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundImage: `url(${cat.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-0" />

              <div className="relative z-10 flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${
                  isSelected ? "gold-button-gradient text-slate-950" : "bg-amber-500/10 text-amber-500"
                }`}>
                  <Icon size={16} />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/20 px-2 py-0.5 rounded-full">
                  {cat.count} Units
                </span>
              </div>

              <div className="relative z-10">
                <h3 className={`text-sm font-bold uppercase tracking-wide flex items-center gap-1 group-hover:text-amber-500 transition-colors ${
                  darkMode ? "text-white" : "text-slate-950"
                }`}>
                  <span>{cat.label}</span>
                  <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </h3>
                <p className="text-[10px] text-slate-400 mt-1.5 font-light leading-snug">
                  {cat.desc}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
