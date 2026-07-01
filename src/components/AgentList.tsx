import { motion } from "motion/react";
import { Phone, Mail, MessageSquare, Star, Award, Shield } from "lucide-react";
import { AGENTS } from "../data";
import { Agent } from "../types";

interface AgentListProps {
  darkMode: boolean;
  onOpenBookingModal: (agent: Agent) => void;
}

export default function AgentList({ darkMode, onOpenBookingModal }: AgentListProps) {
  return (
    <section id="agents" className="py-24 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            The Advisors of Distinction
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Elite Senior Partners
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
          Meet our world-class advisory team, specialized in matching UHNW clients with architecturally significant private estates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AGENTS.map((agent, index) => {
          
          // Pre-fill WhatsApp link with customized message
          const cleanPhone = agent.phone.replace(/[^0-9]/g, "");
          const whatsappMsg = `Hello ${agent.name}, I am browsing your Aura Luxury Estates portfolio and would like to arrange a private consultation regarding off-market acquisitions.`;
          const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl overflow-hidden border transition-all duration-300 ${
                darkMode 
                  ? "bg-slate-900/40 border-slate-900 hover:bg-slate-900/70" 
                  : "bg-white border-slate-100 hover:bg-slate-50 premium-shadow-light"
              }`}
            >
              {/* Photo Area with Rating Badge */}
              <div className="relative h-72">
                <img 
                  src={agent.photo} 
                  alt={agent.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Floating Rating Badges */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  <span className="bg-slate-950/70 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 font-mono">
                    <Star size={10} className="fill-amber-500 text-amber-500" />
                    <span>{agent.rating} Rating</span>
                  </span>
                  <span className="bg-slate-950/70 backdrop-blur-md text-amber-400 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10 font-mono">
                    <Award size={10} />
                    <span>{agent.listingsCount} Listings</span>
                  </span>
                </div>
              </div>

              {/* Textual bio metadata */}
              <div className="p-6">
                <div>
                  <span className="text-[9px] font-mono text-amber-500 font-bold uppercase tracking-widest block">
                    {agent.role}
                  </span>
                  <h3 className={`text-base font-bold uppercase tracking-wide mt-1 ${
                    darkMode ? "text-white" : "text-slate-950"
                  }`}>
                    {agent.name}
                  </h3>
                </div>

                <p className="text-[10px] text-slate-400 mt-3.5 leading-relaxed font-light line-clamp-3">
                  {agent.bio}
                </p>

                {/* Direct Action contact vectors */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-900">
                  <a
                    href={`tel:${agent.phone}`}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest border transition-all ${
                      darkMode 
                        ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900" 
                        : "bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Phone size={11} className="text-amber-500" />
                    <span>Call</span>
                  </a>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-500 border border-emerald-500/10 transition-all"
                  >
                    <MessageSquare size={11} />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBookingModal(agent)}
                  className="w-full mt-3 py-3.5 gold-button-gradient text-slate-950 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:opacity-95 transition-opacity"
                >
                  Schedule Consultation
                </button>

              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
