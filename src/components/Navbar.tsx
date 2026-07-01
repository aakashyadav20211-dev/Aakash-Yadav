import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sun, Moon, Heart, User, Shield, Briefcase, Menu, X, 
  Phone, Mail, ArrowUpRight, Award, Trash2, Calendar
} from "lucide-react";
import { Property } from "../types";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeRole: "user" | "agent" | "admin";
  setActiveRole: (role: "user" | "agent" | "admin") => void;
  savedProperties: Property[];
  onRemoveSaved: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenConsultant: () => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  activeRole,
  setActiveRole,
  savedProperties,
  onRemoveSaved,
  onSelectProperty,
  onOpenConsultant,
  scrollToSection
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [roleSelectorOpen, setRoleSelectorOpen] = useState(false);

  const roles = [
    { id: "user" as const, name: "Private Client", icon: User, desc: "Explore portfolios, EMIs & save listings" },
    { id: "agent" as const, name: "Luxury Advisor", icon: Briefcase, desc: "Manage leads, schedules & list properties" },
    { id: "admin" as const, name: "System Director", icon: Shield, desc: "Oversee global analytics, CMS & settings" }
  ];

  const activeRoleDetails = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
      darkMode ? "bg-slate-950/80 border-b border-slate-900" : "bg-white/80 border-b border-slate-100"
    } backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Monogram Branding */}
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="w-10 h-10 rounded-xl gold-button-gradient flex items-center justify-center text-white font-bold tracking-widest shadow-lg shadow-amber-500/10">
            A
          </div>
          <div>
            <span className={`font-bold text-lg tracking-widest block uppercase ${
              darkMode ? "text-white" : "text-slate-950"
            }`}>
              Aura <span className="text-amber-500 font-light">Estates</span>
            </span>
            <span className="text-[9px] tracking-widest text-slate-400 block uppercase font-mono">
              Ultra Luxury Portfolios
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium">
          <button 
            onClick={() => scrollToSection("properties")} 
            className={`hover:text-amber-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            Elite Estates
          </button>
          <button 
            onClick={() => scrollToSection("map")} 
            className={`hover:text-amber-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            Global Map
          </button>
          <button 
            onClick={() => scrollToSection("mortgage")} 
            className={`hover:text-amber-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            Financing
          </button>
          <button 
            onClick={() => scrollToSection("agents")} 
            className={`hover:text-amber-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            Advisors
          </button>
          <button 
            onClick={() => scrollToSection("blogs")} 
            className={`hover:text-amber-500 transition-colors ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            Journal
          </button>
          <button 
            onClick={onOpenConsultant} 
            className="text-amber-500 hover:text-amber-400 flex items-center gap-1 font-mono text-xs uppercase tracking-wider"
          >
            <span>●</span> AI Advisor
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition-colors ${
              darkMode 
                ? "border-slate-800 text-amber-500 hover:bg-slate-900" 
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
            aria-label="Toggle Theme"
            id="theme-toggler"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Bookmarks (Saved Properties) */}
          <button
            onClick={() => setSavedDrawerOpen(true)}
            className="relative p-2 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors cursor-pointer"
            aria-label="Saved Bookmarks"
            id="saved-btn"
          >
            <Heart size={18} className={savedProperties.length > 0 ? "fill-red-500 text-red-500" : darkMode ? "text-slate-300" : "text-slate-700"} />
            {savedProperties.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full gold-button-gradient text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                {savedProperties.length}
              </span>
            )}
          </button>

          {/* Luxury Role Swapper Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleSelectorOpen(!roleSelectorOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-all ${
                darkMode 
                  ? "border-amber-500/20 bg-amber-500/5 text-amber-400 hover:bg-amber-500/10" 
                  : "border-amber-500/30 bg-amber-500/5 text-amber-600 hover:bg-amber-500/10"
              }`}
              id="role-swapper-btn"
            >
              <activeRoleDetails.icon size={14} />
              <span className="hidden sm:inline uppercase tracking-wider font-mono">{activeRoleDetails.name}</span>
            </button>

            <AnimatePresence>
              {roleSelectorOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setRoleSelectorOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-72 rounded-2xl p-3 z-20 shadow-xl border ${
                      darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-100 text-slate-900"
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-2 font-mono">
                      Change Experience Perspective
                    </div>
                    <div className="space-y-1">
                      {roles.map((r) => {
                        const Icon = r.icon;
                        const isSelected = r.id === activeRole;
                        return (
                          <button
                            key={r.id}
                            onClick={() => {
                              setActiveRole(r.id);
                              setRoleSelectorOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                              isSelected 
                                ? "bg-amber-500/10 border border-amber-500/20 text-amber-500" 
                                : "hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${isSelected ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                              <Icon size={14} />
                            </div>
                            <div>
                              <div className="text-xs font-bold uppercase tracking-wide">{r.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{r.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Contact Private Advisor */}
          <a
            href="tel:+918340650759"
            className="hidden md:flex items-center gap-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider hover:opacity-90 transition-opacity uppercase font-mono shadow-md shadow-slate-950/10"
            id="private-consult-btn"
          >
            <Phone size={12} />
            <span>+91 83406 50759</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${
              darkMode ? "border-slate-800 text-white" : "border-slate-200 text-slate-800"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </div>

      {/* Bookmarks saved properties drawer */}
      <AnimatePresence>
        {savedDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSavedDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl p-6 flex flex-col justify-between ${
                darkMode ? "bg-slate-950 border-l border-slate-900 text-white" : "bg-white border-l border-slate-100 text-slate-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-900 pb-4">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider">Private Watchlist</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Your Saved Luxury Estates</p>
                  </div>
                  <button 
                    onClick={() => setSavedDrawerOpen(false)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl"
                  >
                    <X size={18} />
                  </button>
                </div>

                {savedProperties.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart size={40} className="mx-auto text-slate-300 dark:text-slate-800 stroke-1 mb-4" />
                    <p className="text-sm text-slate-400">Your watchlist is currently vacant.</p>
                    <button
                      onClick={() => {
                        setSavedDrawerOpen(false);
                        scrollToSection("properties");
                      }}
                      className="mt-4 text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest font-mono"
                    >
                      Browse Portfolios →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {savedProperties.map((prop) => (
                      <div 
                        key={prop.id}
                        className={`flex gap-4 p-3 rounded-2xl border transition-all hover:scale-[1.01] ${
                          darkMode ? "bg-slate-900/40 border-slate-900 hover:bg-slate-900/80" : "bg-slate-50 border-slate-100 hover:bg-slate-100/60"
                        }`}
                      >
                        <img 
                          src={prop.image} 
                          alt={prop.title} 
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 
                            onClick={() => {
                              onSelectProperty(prop);
                              setSavedDrawerOpen(false);
                            }}
                            className="text-xs font-bold uppercase tracking-wide truncate cursor-pointer hover:text-amber-500"
                          >
                            {prop.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{prop.address}</p>
                          <div className="text-xs font-mono font-bold text-amber-500 mt-2">{prop.formattedPrice}</div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <button
                            onClick={() => onRemoveSaved(prop.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              onSelectProperty(prop);
                              setSavedDrawerOpen(false);
                            }}
                            className="text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-amber-500 flex items-center gap-0.5"
                          >
                            <span>Walk</span>
                            <ArrowUpRight size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer footer */}
              {savedProperties.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-900 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Portfolio (Saved)</span>
                    <span className="font-mono text-sm font-bold text-amber-500">
                      ${(savedProperties.reduce((acc, curr) => acc + curr.price, 0) / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSavedDrawerOpen(false);
                      onOpenConsultant();
                    }}
                    className="w-full gold-button-gradient text-white py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                  >
                    <Award size={14} />
                    <span>Discuss Portfolios with AI</span>
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-b overflow-hidden ${
              darkMode ? "bg-slate-950 border-slate-900 text-white" : "bg-white border-slate-100 text-slate-950"
            }`}
          >
            <div className="px-6 py-6 space-y-4 flex flex-col">
              <button 
                onClick={() => { setMobileMenuOpen(false); scrollToSection("properties"); }} 
                className="text-left font-medium text-sm hover:text-amber-500 transition-colors"
              >
                Elite Estates
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); scrollToSection("map"); }} 
                className="text-left font-medium text-sm hover:text-amber-500 transition-colors"
              >
                Global Map
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); scrollToSection("mortgage"); }} 
                className="text-left font-medium text-sm hover:text-amber-500 transition-colors"
              >
                Financing
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); scrollToSection("agents"); }} 
                className="text-left font-medium text-sm hover:text-amber-500 transition-colors"
              >
                Advisors
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); scrollToSection("blogs"); }} 
                className="text-left font-medium text-sm hover:text-amber-500 transition-colors"
              >
                Journal
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenConsultant(); }} 
                className="text-left text-amber-500 font-medium text-sm hover:text-amber-400 flex items-center gap-1 font-mono text-xs uppercase tracking-wider"
              >
                <span>●</span> AI Advisor
              </button>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-900 flex flex-col gap-3">
                <a
                  href="tel:+918340650759"
                  className="flex items-center justify-center gap-2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 py-3 rounded-xl text-xs font-semibold tracking-wider hover:opacity-90 transition-opacity uppercase font-mono shadow-md"
                >
                  <Phone size={12} />
                  <span>Call +91 83406 50759</span>
                </a>
                <a
                  href="mailto:aakashyadav2024@gmail.com"
                  className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 py-3 rounded-xl text-xs font-semibold tracking-wider hover:bg-slate-50 dark:hover:bg-slate-900 transition-all uppercase font-mono"
                >
                  <Mail size={12} />
                  <span>Email Advisor</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
