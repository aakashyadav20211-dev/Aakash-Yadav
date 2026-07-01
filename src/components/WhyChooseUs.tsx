import { motion } from "motion/react";
import { Shield, EyeOff, Award, Fingerprint, Heart, Headset } from "lucide-react";

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "Vetted Titles",
    desc: "Every listed deed undergoes triple-tier financial audits, landownership verification, and legal vetting before display."
  },
  {
    icon: EyeOff,
    title: "Confidential Exchanges",
    desc: "Over 60% of our acquisitions are processed through non-disclosure structures, securing full private-portfolio isolation."
  },
  {
    icon: Award,
    title: "Architectural Integrity",
    desc: "We exclusively contract properties created by recognized masters, featuring exceptional limestone, travertine, and steel signatures."
  },
  {
    icon: Headset,
    title: "24/7 Concierge",
    desc: "From private yacht docking approvals to luxury transport coordinates, our desks remain fully aligned to facilitate client transitions."
  }
];

export default function WhyChooseUs({ darkMode }: { darkMode: boolean }) {
  return (
    <section className={`py-24 border-y transition-colors duration-300 ${
      darkMode ? "bg-slate-950/40 border-slate-900" : "bg-slate-50/50 border-slate-100"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            The Aura Vow of Perfection
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Uncompromising Standards
          </h2>
          <p className="text-slate-400 text-sm mt-4 font-light leading-relaxed">
            Real estate acquisition at the highest level requires absolute precision, flawless execution, and unbreakable confidentiality.
          </p>
        </div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${
                  darkMode 
                    ? "bg-slate-900/30 border-slate-900/60 hover:bg-slate-900/60" 
                    : "bg-white border-slate-100 hover:bg-slate-50 premium-shadow-light"
                }`}
              >
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 w-fit mb-5">
                  <Icon size={16} />
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wide ${
                  darkMode ? "text-white" : "text-slate-950"
                }`}>
                  {prop.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed font-light">
                  {prop.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
