import { motion } from "motion/react";
import { Landmark, Newspaper, Compass, ShieldCheck, Zap } from "lucide-react";

const PRESS_PARTNERS = [
  { name: "Forbes Estates", icon: Landmark },
  { name: "Robb Report", icon: Compass },
  { name: "Architectural Digest", icon: Zap },
  { name: "Mansion Global", icon: ShieldCheck },
  { name: "The Herald Tribune", icon: Newspaper }
];

export default function TrustedBy({ darkMode }: { darkMode: boolean }) {
  return (
    <section className={`py-12 border-y transition-colors duration-300 ${
      darkMode 
        ? "bg-slate-950/60 border-slate-900/60" 
        : "bg-slate-50/80 border-slate-100"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8 font-mono">
          Endorsed & Featured by Global Elite Press
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-65 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {PRESS_PARTNERS.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Icon size={16} className="text-amber-500" />
                <span className={`font-serif text-sm font-bold tracking-tight ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}>
                  {partner.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
