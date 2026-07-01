import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, Quote, ChevronRight, Calendar, User, 
  ChevronDown, Send, Phone, Mail, MapPin, 
  ArrowUpRight, Award, ShieldCheck, Heart
} from "lucide-react";
import { TESTIMONIALS, BLOGS, FAQS } from "../data";

// ==========================================
// 1. CUSTOMER TESTIMONIALS MODULE
// ==========================================
export function Testimonials({ darkMode }: { darkMode: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={`py-24 border-y transition-colors duration-300 ${
      darkMode ? "bg-slate-950/40 border-slate-900" : "bg-slate-50/50 border-slate-100"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            The Chronicle of Trust
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Client Appraisals
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative px-10">
          <div className="absolute top-0 left-0 text-amber-500/10">
            <Quote size={80} className="stroke-1" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Stars rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </div>

              <blockquote className={`text-sm sm:text-base leading-relaxed italic font-light font-serif mb-8 ${
                darkMode ? "text-slate-300" : "text-slate-700"
              }`}>
                "{TESTIMONIALS[activeIndex].comment}"
              </blockquote>

              <div>
                <cite className={`not-italic font-bold text-xs uppercase tracking-widest block ${
                  darkMode ? "text-white" : "text-slate-950"
                }`}>
                  {TESTIMONIALS[activeIndex].name}
                </cite>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                  {TESTIMONIALS[activeIndex].role}, {TESTIMONIALS[activeIndex].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider dots indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === activeIndex 
                    ? "bg-amber-500 w-6" 
                    : darkMode ? "bg-slate-800" : "bg-slate-200"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

// ==========================================
// 2. LATEST BLOGS / JOURNAL MODULE
// ==========================================
export function LatestBlogs({ darkMode }: { darkMode: boolean }) {
  return (
    <section id="blogs" className="py-24 max-w-7xl mx-auto px-6">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            The Aura Editorial Press
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Architectural Journal
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
          Deep dives into modern brutalism, luxury property structuring, and exclusive biophilic estate blueprints, authored by senior partners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS.map((blog, index) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-3xl overflow-hidden border group transition-all duration-300 flex flex-col justify-between ${
              darkMode 
                ? "bg-slate-900/40 border-slate-900 hover:bg-slate-900/60" 
                : "bg-white border-slate-100 hover:bg-slate-50 premium-shadow-light"
            }`}
          >
            <div>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md border border-white/10 text-white text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-slate-400 text-[9px] font-mono font-bold uppercase tracking-widest mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={10} className="text-amber-500" />
                    <span>{blog.date}</span>
                  </div>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className={`text-sm font-bold uppercase tracking-wide leading-snug transition-colors group-hover:text-amber-500 line-clamp-2 ${
                  darkMode ? "text-white" : "text-slate-950"
                }`}>
                  {blog.title}
                </h3>

                <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed font-light line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-900 mt-4">
              <div className="flex items-center gap-2">
                <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full" />
                <span className="text-[10px] text-slate-400 font-mono font-bold">{blog.author.name}</span>
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-500 group-hover:translate-x-1.5 transition-transform flex items-center gap-0.5">
                <span>Read Article</span>
                <ArrowUpRight size={10} />
              </span>
            </div>

          </motion.article>
        ))}
      </div>

    </section>
  );
}

// ==========================================
// 3. FREQUENTLY ASKED QUESTIONS (FAQ) MODULE
// ==========================================
export function FAQAccordion({ darkMode }: { darkMode: boolean }) {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  return (
    <section className={`py-24 border-y transition-colors duration-300 ${
      darkMode ? "bg-slate-950/40 border-slate-900" : "bg-slate-50/50 border-slate-100"
    }`}>
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            Clarifications of Interest
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Curatorial FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isOpen 
                    ? darkMode ? "bg-slate-900/30 border-amber-500/20" : "bg-white border-amber-500/20" 
                    : darkMode ? "bg-slate-900/10 border-slate-900" : "bg-white border-slate-100"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${
                    darkMode ? "text-white" : "text-slate-950"
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-500" : ""}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`px-5 pb-5 text-[11px] sm:text-xs leading-relaxed font-light border-t pt-4 ${
                        darkMode ? "text-slate-300 border-slate-900/60" : "text-slate-600 border-slate-100"
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ==========================================
// 4. NEWSLETTER MODULE
// ==========================================
export function Newsletter({ darkMode }: { darkMode: boolean }) {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setEmailInput("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 text-center">
      <div className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden ${
        darkMode ? "bg-slate-900/30 border-slate-900" : "bg-slate-100/40 border-slate-200"
      }`}>
        {/* Soft Background shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[80px]" />
        
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
          Private Client Cataloging
        </span>
        <h2 className={`text-xl sm:text-3xl font-extrabold uppercase tracking-tight ${
          darkMode ? "text-white" : "text-slate-950"
        }`}>
          Unlock Off-Market Portfolios
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mt-4 font-light leading-relaxed mb-8">
          Subscribe to receive bi-weekly notification logs detailing high-security off-market listings transacted in Monaco, Aspen, and Mumbai Malabar Hill.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 relative z-10">
          <input
            type="email"
            placeholder="Enter your private email id..."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            className={`flex-1 px-5 py-3 rounded-xl border text-xs focus:outline-none ${
              darkMode 
                ? "bg-slate-950 border-slate-800 text-white focus:border-amber-500/50" 
                : "bg-white border-slate-200 text-slate-800 focus:border-amber-500/50"
            }`}
          />
          <button
            type="submit"
            className="gold-button-gradient text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shrink-0"
          >
            <span>Request Ingress</span>
            <Send size={12} />
          </button>
        </form>

        <AnimatePresence>
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest"
            >
              ✓ Access Request Registered. Aakash Yadav will approve your clearance.
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// ==========================================
// 5. FOOTER MODULE
// ==========================================
export function Footer({ darkMode, scrollToSection }: { darkMode: boolean; scrollToSection: (id: string) => void }) {
  return (
    <footer className={`border-t py-16 transition-colors duration-300 ${
      darkMode ? "bg-slate-950 border-slate-900 text-slate-400" : "bg-white border-slate-100 text-slate-600"
    }`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
        
        {/* Brand information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-8 h-8 rounded-lg gold-button-gradient flex items-center justify-center text-white text-xs font-bold tracking-widest">
              A
            </div>
            <span className={`font-bold tracking-widest uppercase text-sm ${darkMode ? "text-white" : "text-slate-950"}`}>
              Aura <span className="text-amber-500 font-light">Estates</span>
            </span>
          </div>
          <p className="text-[10px] leading-relaxed font-light">
            Aura Estates represents the global peak of luxury real estate brokerage, curating architecturally pristine homes and securing transaction confidentiality for elite clients worldwide.
          </p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-amber-500" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Certified Brokerage Index</span>
          </div>
        </div>

        {/* Portfolios directory */}
        <div className="space-y-4">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-white" : "text-slate-950"}`}>
            Metropolitan Hubs
          </h4>
          <ul className="space-y-2 text-[10px] font-mono uppercase tracking-wider">
            <li><button onClick={() => scrollToSection("properties")} className="hover:text-amber-500">Bel Air Estates</button></li>
            <li><button onClick={() => scrollToSection("properties")} className="hover:text-amber-500">Malibu Waterfronts</button></li>
            <li><button onClick={() => scrollToSection("properties")} className="hover:text-amber-500">New York Penthouses</button></li>
            <li><button onClick={() => scrollToSection("properties")} className="hover:text-amber-500">Larvotto Cliffsides</button></li>
            <li><button onClick={() => scrollToSection("properties")} className="hover:text-amber-500">Palm Jumeirah Mansions</button></li>
          </ul>
        </div>

        {/* Resource directory */}
        <div className="space-y-4">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-white" : "text-slate-950"}`}>
            Desk Operations
          </h4>
          <ul className="space-y-2 text-[10px] font-mono uppercase tracking-wider">
            <li><button onClick={() => scrollToSection("hero")} className="hover:text-amber-500">Private Exchanges</button></li>
            <li><button onClick={() => scrollToSection("mortgage")} className="hover:text-amber-500">Private Banking rates</button></li>
            <li><button onClick={() => scrollToSection("blogs")} className="hover:text-amber-500">Aura Journal logs</button></li>
            <li><button onClick={() => scrollToSection("hero")} className="hover:text-amber-500">Terms of NDA confidentiality</button></li>
          </ul>
        </div>

        {/* Private Partner Link Desk */}
        <div className="space-y-4 text-xs">
          <h4 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-white" : "text-slate-950"}`}>
            Private Partner Desk
          </h4>
          
          <div className="space-y-3 font-mono text-[10px] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-amber-500 shrink-0" />
              <span>Malabar Hill, Mumbai, India</span>
            </div>
            
            <a href="tel:+918340650759" className="flex items-center gap-2 hover:text-amber-500">
              <Phone size={12} className="text-amber-500 shrink-0" />
              <span>+91 83406 50759</span>
            </a>
            
            <a href="mailto:aakashyadav2024@gmail.com" className="flex items-center gap-2 hover:text-amber-500">
              <Mail size={12} className="text-amber-500 shrink-0" />
              <span>aakashyadav2024@gmail.com</span>
            </a>
          </div>

          <div className="pt-2">
            <span className="text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Directed by Aakash Yadav</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-widest font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} Aura Estates International Brokerage. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-amber-500">Confidentiality NDA</a>
          <span>•</span>
          <a href="#" className="hover:text-amber-500">Private Security Audits</a>
        </div>
      </div>

    </footer>
  );
}
