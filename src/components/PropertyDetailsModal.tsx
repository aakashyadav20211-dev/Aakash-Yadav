import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, BedDouble, Bath, Maximize2, Car, Calendar, 
  MapPin, Phone, MessageSquare, Mail, Play, Sparkles, 
  ChevronLeft, ChevronRight, Calculator, Check, GraduationCap, Hospital, Train
} from "lucide-react";
import { Property, Agent, Lead } from "../types";
import { AGENTS } from "../data";

interface PropertyDetailsModalProps {
  darkMode: boolean;
  property: Property;
  onClose: () => void;
  onAddLead: (lead: Omit<Lead, "id" | "date" | "status">) => void;
}

export default function PropertyDetailsModal({
  darkMode,
  property,
  onClose,
  onAddLead
}: PropertyDetailsModalProps) {
  const [activeImage, setActiveImage] = useState(property.image);
  const [activeTab, setActiveTab] = useState<"specs" | "blueprint" | "tour">("specs");
  
  // Lead Booking form state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientMessage, setClientMessage] = useState(`Hello, I am interested in scheduling a private digital walkthrough and structural inspection for ${property.title}. Please provide available dates.`);
  const [submitFeedback, setSubmitFeedback] = useState(false);

  // EMI Simulator localized inside the details layout
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanYears, setLoanYears] = useState(30);

  const matchedAgent = useMemo(() => {
    return AGENTS.find(a => a.id === property.agentId) || AGENTS[0];
  }, [property]);

  // EMI Calculator logic
  const localEmi = useMemo(() => {
    const principal = property.price - (property.price * downPaymentPercent) / 100;
    const r = interestRate / 100 / 12;
    const n = loanYears * 12;
    if (r === 0) return Math.round(principal / n);
    const result = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(result);
  }, [property.price, downPaymentPercent, interestRate, loanYears]);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    onAddLead({
      propertyId: property.id,
      propertyName: property.title,
      clientName,
      clientEmail,
      clientPhone,
      clientMessage,
      agentId: property.agentId
    });

    setSubmitFeedback(true);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setTimeout(() => {
      setSubmitFeedback(false);
    }, 4000);
  };

  const cleanPhone = matchedAgent.phone.replace(/[^0-9]/g, "");
  const whatsappMsg = `Hello ${matchedAgent.name}, I am interested in coordinating a private physical tour for ${property.title} located at ${property.address}.`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Ambient Dark Overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black z-0"
        />

        {/* Modal Sheet itself */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className={`relative z-10 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[85vh] ${
            darkMode ? "bg-slate-950 border border-slate-900 text-white" : "bg-white border border-slate-100 text-slate-950"
          }`}
        >
          {/* Close Trigger Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full glass-dark text-white hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X size={16} />
          </button>

          {/* LEFT SECTION: Visual Gallery Slider & Interactive specs tabs */}
          <div className="w-full md:w-3/5 h-1/2 md:h-full overflow-y-auto border-r border-slate-100 dark:border-slate-900 flex flex-col justify-between">
            <div>
              {/* Primary Selected Large Photo display */}
              <div className="relative h-64 sm:h-80 md:h-[400px] bg-slate-900 overflow-hidden">
                <img 
                  src={activeImage} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating location tag */}
                <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl z-10 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                  <MapPin size={10} className="text-amber-500" />
                  <span>{property.address}</span>
                </div>
              </div>

              {/* Gallery Mini Previews Row */}
              <div className="p-4 flex gap-2 overflow-x-auto border-b border-slate-100 dark:border-slate-900">
                {property.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? "border-amber-500 scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Interactive Info Segment Select tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-900">
                {([
                  { id: "specs", name: "Estates Profile" },
                  { id: "blueprint", name: "Floor Blueprint" },
                  { id: "tour", name: "Video walkthrough" }
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${
                      activeTab === tab.id 
                        ? "border-amber-500 text-amber-500" 
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "specs" && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-left"
                    >
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block">Structural Synopsis</span>
                        <p className={`text-[11px] sm:text-xs leading-relaxed font-light mt-2 ${
                          darkMode ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {property.description}
                        </p>
                      </div>

                      {/* Key stats panel */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 dark:border-slate-900 text-slate-500">
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-widest font-mono text-slate-400">Total Sizing</span>
                          <span className={`text-sm font-bold font-mono mt-1 ${darkMode ? "text-white" : "text-slate-950"}`}>
                            {property.area.toLocaleString()} Sq Ft
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-widest font-mono text-slate-400">Construction Year</span>
                          <span className={`text-sm font-bold font-mono mt-1 ${darkMode ? "text-white" : "text-slate-950"}`}>
                            {property.yearBuilt}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-widest font-mono text-slate-400">Acquisition Type</span>
                          <span className={`text-sm font-bold font-mono mt-1 uppercase text-amber-500`}>
                            {property.category === "buy" ? "Acquisition" : "Lease"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[8px] uppercase tracking-widest font-mono text-slate-400">Bedrooms Count</span>
                          <span className={`text-sm font-bold font-mono mt-1 ${darkMode ? "text-white" : "text-slate-950"}`}>
                            {property.beds} Bedrooms
                          </span>
                        </div>
                      </div>

                      {/* Amenities checklist */}
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block mb-3">Core Appointments</span>
                        <div className="grid grid-cols-2 gap-3">
                          {property.amenities.map(item => (
                            <div key={item} className="flex items-center gap-2 text-[10px] font-medium">
                              <div className="p-0.5 rounded-full bg-amber-500/10 text-amber-500 shrink-0">
                                <Check size={10} />
                              </div>
                              <span className={darkMode ? "text-slate-300" : "text-slate-700"}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Nearby facilities distances */}
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block mb-3">Distances to Metropolitan Points</span>
                        <div className="space-y-2.5">
                          {property.nearby.map((place) => {
                            const iconMap = { school: GraduationCap, hospital: Hospital, metro: Train };
                            const IconComp = (iconMap as any)[place.type] || GraduationCap;
                            return (
                              <div key={place.name} className="flex items-center justify-between text-[10px] font-semibold">
                                <div className="flex items-center gap-2">
                                  <IconComp size={12} className="text-slate-400" />
                                  <span className={darkMode ? "text-slate-300" : "text-slate-700"}>{place.name}</span>
                                </div>
                                <span className="font-mono text-amber-500">{place.distance}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {activeTab === "blueprint" && (
                    <motion.div
                      key="blueprint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 flex flex-col items-center"
                    >
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block mb-4">Architectural Blueprint Drawing</span>
                      
                      {/* Customized Vector floorplan drawing representing luxury layout */}
                      <svg viewBox="0 0 400 300" className={`w-full max-w-sm rounded-2xl border ${
                        darkMode ? "bg-slate-900/10 border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}>
                        {/* Outlines of rooms */}
                        <rect x="20" y="20" width="360" height="260" fill="none" className={darkMode ? "stroke-slate-800" : "stroke-slate-200"} strokeWidth="2" />
                        
                        {/* Living Area room boundary */}
                        <rect x="20" y="20" width="180" height="150" fill="none" className={darkMode ? "stroke-slate-700" : "stroke-slate-300"} strokeWidth="1" />
                        <text x="35" y="45" fontSize="10" className="fill-slate-500 uppercase tracking-widest font-bold">Living Foyer</text>
                        
                        {/* Master Suite room boundary */}
                        <rect x="200" y="20" width="180" height="130" fill="none" className={darkMode ? "stroke-slate-700" : "stroke-slate-300"} strokeWidth="1" />
                        <text x="215" y="45" fontSize="10" className="fill-slate-500 uppercase tracking-widest font-bold">Master Suite</text>
                        
                        {/* Culinary Suite room boundary */}
                        <rect x="20" y="170" width="150" height="110" fill="none" className={darkMode ? "stroke-slate-700" : "stroke-slate-300"} strokeWidth="1" />
                        <text x="35" y="195" fontSize="10" className="fill-slate-500 uppercase tracking-widest font-bold">Chef's Galley</text>

                        {/* Travertine wellness suite */}
                        <rect x="170" y="170" width="210" height="110" fill="none" className="stroke-amber-500/25" strokeWidth="1" />
                        <text x="185" y="195" fontSize="10" className="fill-amber-500 uppercase tracking-widest font-bold">Wellness Grotto</text>

                        {/* Infinite pool projection */}
                        <line x1="20" y1="150" x2="380" y2="150" className={darkMode ? "stroke-slate-800" : "stroke-slate-200"} strokeWidth="1" />
                      </svg>

                      <p className="text-[10px] text-slate-400 font-light mt-4 max-w-sm leading-relaxed">
                        Precision AutoCAD model plotting showing living foyers, double-height executive boardrooms, wet kitchens, and cantilevered grotto access.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "tour" && (
                    <motion.div
                      key="tour"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-widest block">4K Drone Walkthrough Tour</span>
                      
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {property.videoTourUrl ? (
                          <iframe
                            src={property.videoTourUrl}
                            title="Walking Tour Walkthrough"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="text-center p-8">
                            <Play size={32} className="mx-auto text-amber-500 mb-2" />
                            <p className="text-xs text-slate-400">Video tour being processed. Available upon onboarding.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Localized EMI Model Estimator Board */}
            <div className={`p-6 border-t ${
              darkMode ? "bg-slate-900/20 border-slate-900" : "bg-slate-50 border-slate-100"
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <Calculator size={14} className="text-amber-500" />
                <span className="text-[9px] uppercase tracking-widest font-mono font-bold">Property Amortization splits</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider block mb-1">Down Payment %</span>
                  <select
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="bg-transparent font-mono text-xs font-bold text-amber-500 focus:outline-none focus:border-b"
                  >
                    <option value={10} className="bg-slate-950 text-white">10%</option>
                    <option value={20} className="bg-slate-950 text-white">20%</option>
                    <option value={30} className="bg-slate-950 text-white">30%</option>
                    <option value={40} className="bg-slate-950 text-white">40%</option>
                  </select>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider block mb-1">Interest %</span>
                  <select
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="bg-transparent font-mono text-xs font-bold text-amber-500 focus:outline-none focus:border-b"
                  >
                    <option value={3.5} className="bg-slate-950 text-white">3.50%</option>
                    <option value={4.5} className="bg-slate-950 text-white">4.50%</option>
                    <option value={5.5} className="bg-slate-950 text-white">5.50%</option>
                    <option value={6.5} className="bg-slate-950 text-white">6.50%</option>
                  </select>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 uppercase tracking-wider block mb-1">Amortization</span>
                  <select
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="bg-transparent font-mono text-xs font-bold text-amber-500 focus:outline-none focus:border-b"
                  >
                    <option value={15} className="bg-slate-950 text-white">15 Years</option>
                    <option value={30} className="bg-slate-950 text-white">30 Years</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-950/40 p-3 rounded-xl border border-slate-900/60">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Estimated Payment</span>
                <span className="font-mono text-xs font-extrabold text-amber-500">₹{localEmi.toLocaleString('en-IN')} / mo</span>
              </div>
            </div>

          </div>

          {/* RIGHT SECTION: Advisor Portfolio & Immediate Booking form */}
          <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto h-1/2 md:h-full">
            
            {/* Advisor profile segment */}
            <div>
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-900 pb-5 mb-6 text-left">
                <img src={matchedAgent.photo} alt={matchedAgent.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <span className="text-[8px] font-mono text-amber-500 font-bold uppercase tracking-widest">Listing Senior Partner</span>
                  <h4 className="text-sm font-bold uppercase tracking-wide">{matchedAgent.name}</h4>
                  <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{matchedAgent.role}</span>
                </div>
              </div>

              {/* Direct Booking form inputs */}
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>Schedule Walks Inquiry</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 font-light leading-normal">
                    Submit your identification to register a live walkthrough appointment. Lead is tracked immediately inside directories.
                  </p>
                </div>

                <form onSubmit={handleSubmitLead} className="space-y-3">
                  <div className="text-left flex flex-col gap-1">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alastair Sterling"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500/30" 
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500/30"
                      }`}
                    />
                  </div>

                  <div className="text-left flex flex-col gap-1">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Email ID</label>
                    <input
                      type="email"
                      placeholder="e.g. sterling@capital.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500/30" 
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500/30"
                      }`}
                    />
                  </div>

                  <div className="text-left flex flex-col gap-1">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Phone No.</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 83406 50759"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500/30" 
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500/30"
                      }`}
                    />
                  </div>

                  <div className="text-left flex flex-col gap-1">
                    <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Message Details</label>
                    <textarea
                      rows={3}
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full resize-none ${
                        darkMode 
                          ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500/30" 
                          : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500/30"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 gold-button-gradient text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest hover:opacity-95 transition-opacity"
                  >
                    Register Lead Coordinates
                  </button>
                </form>

                <AnimatePresence>
                  {submitFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest text-center mt-2"
                    >
                      ✓ Private Lead coordinates logged. Aakash Yadav will respond.
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Direct Quick contact footer buttons */}
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-slate-900 pt-6 mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-500 border border-emerald-500/10 transition-all"
              >
                <MessageSquare size={12} />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${matchedAgent.phone}`}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-bold font-mono uppercase tracking-widest border transition-all ${
                  darkMode 
                    ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
                    : "bg-slate-100 border-transparent text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Phone size={11} className="text-amber-500" />
                <span>Call Desk</span>
              </a>
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
