import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Users, Briefcase, Activity, ShieldCheck, 
  Trash2, Plus, Calendar, Eye, FileText, CheckCircle, 
  Clock, AlertCircle, Heart, ArrowUpRight, PlusCircle, LayoutGrid, Award, ShieldAlert, Check
} from "lucide-react";
import { Property, Agent, Lead, Appointment } from "../types";
import { AGENTS } from "../data";

interface DashboardsProps {
  darkMode: boolean;
  properties: Property[];
  onAddProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  savedProperties: Property[];
  onSelectProperty: (property: Property) => void;
  onRemoveSaved: (id: string) => void;
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: Lead["status"]) => void;
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
}

export default function Dashboards({
  darkMode,
  properties,
  onAddProperty,
  onDeleteProperty,
  savedProperties,
  onSelectProperty,
  onRemoveSaved,
  leads,
  onUpdateLeadStatus,
  appointments,
  onUpdateAppointmentStatus
}: DashboardsProps) {
  const [activeTab, setActiveTab] = useState<"admin" | "agent" | "user">("user");

  // State for adding a mock property
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCity, setNewCity] = useState("Malibu");
  const [newType, setNewType] = useState<Property["type"]>("mansion");
  const [newBeds, setNewBeds] = useState("5");
  const [newBaths, setNewBaths] = useState("6");
  const [newArea, setNewArea] = useState("8500");
  const [newDescription, setNewDescription] = useState("");

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const mockNewProp: Property = {
      id: `prop-custom-${Date.now()}`,
      title: newTitle,
      price: Number(newPrice),
      formattedPrice: `$${Number(newPrice).toLocaleString()}`,
      address: `100 Custom Estate Drive, ${newCity}`,
      city: newCity,
      category: "buy",
      type: newType,
      beds: Number(newBeds),
      baths: Number(newBaths),
      area: Number(newArea),
      parking: 4,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
      ],
      featured: true,
      description: newDescription || "An ultra-luxury bespoke masterclass crafted to customer requirements.",
      yearBuilt: 2026,
      amenities: ["Custom Travertine Grotto", "Private Cove Entrance", "Geothermal Heating"],
      coordinates: { lat: 34.0259, lng: -118.7798 },
      nearby: [
        { name: "Elite Private Prep", distance: "1.2 miles", type: "school" },
        { name: "Metropolitan Hospital Complex", distance: "3.2 miles", type: "hospital" }
      ],
      agentId: "agent-1",
      floorPlanUrl: ""
    };

    onAddProperty(mockNewProp);
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
  };

  // Metrics for admin overview
  const totalPortfolioValue = useMemo(() => {
    return properties.reduce((acc, curr) => acc + curr.price, 0);
  }, [properties]);

  const activeLeadsCount = useMemo(() => {
    return leads.filter(l => l.status === "new").length;
  }, [leads]);

  return (
    <div id="dashboards" className={`py-24 border-t transition-colors duration-300 ${
      darkMode ? "bg-slate-950 border-slate-900" : "bg-slate-50 border-slate-100"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation Selector Tabs */}
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
              Integrated Roles Director Desk
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight ${
              darkMode ? "text-white" : "text-slate-950"
            }`}>
              Interactive Control Panels
            </h2>
          </div>

          <div className="flex bg-slate-200 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-900">
            {([
              { id: "user", name: "Client Desk" },
              { id: "agent", name: "Advisor Hub" },
              { id: "admin", name: "Director Desk" }
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Panels */}
        <AnimatePresence mode="wait">
          
          {/* ==========================================
              1. CLIENT DESK VIEW (USER DASHBOARD)
              ========================================== */}
          {activeTab === "user" && (
            <motion.div
              key="user"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
            >
              {/* Col 1 & 2: Comparative watchlist & appointment logs */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Watchlist bookmarks comparisons */}
                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6 ${
                    darkMode ? "text-white" : "text-slate-950"
                  }`}>
                    <Heart size={14} className="text-amber-500 fill-amber-500" />
                    <span>Watchlist Comparison matrix</span>
                  </h3>

                  {savedProperties.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-3xl dark:border-slate-800 border-slate-200 p-8">
                      <p className="text-xs text-slate-400">Save multiple properties to generate a comparative structural checklist.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border dark:border-slate-900 border-slate-200">
                      <table className={`w-full text-xs text-left ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                        <thead className={`text-[10px] uppercase font-mono tracking-widest ${darkMode ? "bg-slate-900 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                          <tr>
                            <th className="p-4">Estate Name</th>
                            <th className="p-4">Value</th>
                            <th className="p-4">Bed / Bath</th>
                            <th className="p-4">Sizing (SqFt)</th>
                            <th className="p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-slate-900 divide-slate-200">
                          {savedProperties.map((prop) => (
                            <tr key={prop.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20">
                              <td className="p-4 font-bold flex items-center gap-2">
                                <img src={prop.image} alt="" className="w-8 h-8 rounded object-cover" />
                                <span className="truncate max-w-[120px] uppercase tracking-wide">{prop.title}</span>
                              </td>
                              <td className="p-4 font-mono font-bold text-amber-500">{prop.formattedPrice}</td>
                              <td className="p-4 font-mono">{prop.beds}B / {prop.baths}Ba</td>
                              <td className="p-4 font-mono">{prop.area.toLocaleString()}</td>
                              <td className="p-4 flex gap-2">
                                <button
                                  onClick={() => onSelectProperty(prop)}
                                  className="p-1 hover:text-amber-500"
                                  title="View Details"
                                >
                                  <Eye size={14} />
                                </button>
                                <button
                                  onClick={() => onRemoveSaved(prop.id)}
                                  className="p-1 hover:text-red-500"
                                  title="Delete bookmark"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Scheduled Walkthrough Appointments */}
                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6 ${
                    darkMode ? "text-white" : "text-slate-950"
                  }`}>
                    <Calendar size={14} className="text-amber-500" />
                    <span>walkthrough Appointments logs</span>
                  </h3>

                  {appointments.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-3xl dark:border-slate-800 border-slate-200 p-8">
                      <p className="text-xs text-slate-400">Schedule walkthrough appointments to track coordinator validations.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.map((appt) => (
                        <div 
                          key={appt.id}
                          className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                            darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-200/60 shadow-sm"
                          }`}
                        >
                          <div className="flex gap-4 items-center">
                            <img src={appt.propertyImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <h4 className={`text-xs font-bold uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-950"}`}>
                                {appt.propertyTitle}
                              </h4>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                Private Walk hosted by {appt.agentName}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right font-mono text-[10px]">
                              <div>{appt.date}</div>
                              <div className="text-slate-500 mt-0.5">{appt.time}</div>
                            </div>

                            {/* Status Pill */}
                            <span className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                              appt.status === "confirmed" 
                                ? "bg-emerald-500/10 text-emerald-500" 
                                : appt.status === "completed"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-amber-500/10 text-amber-500"
                            }`}>
                              {appt.status === "confirmed" ? <CheckCircle size={10} /> : <Clock size={10} />}
                              <span>{appt.status}</span>
                            </span>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Col 3: Client Stats & Direct Partner Link */}
              <div className="space-y-6">
                
                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/20 border-slate-900" : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold">Client Level Portfolio</span>
                  <div className="text-2xl font-bold font-serif italic text-amber-500 mt-2">
                    Prestige Private Tier
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-light leading-relaxed">
                    Clearance granted. Secure NDA operations are verified. You can coordinate luxury financing introductions instantly with our desks.
                  </p>
                </div>

                <div className={`p-6 rounded-3xl border text-slate-400 space-y-4 ${
                  darkMode ? "bg-slate-900/10 border-slate-900/50" : "bg-slate-100/30 border-slate-200/40"
                }`}>
                  <span className="text-[9px] font-mono uppercase tracking-widest font-bold block">Assigned Senior Desk</span>
                  
                  <div className="flex gap-3 items-center text-left">
                    <img src={AGENTS[0].photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-950"}`}>
                        {AGENTS[0].name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{AGENTS[0].role}</span>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-[9px] uppercase tracking-wider pt-2 border-t border-slate-200 dark:border-slate-900">
                    <div>Phone: +91 83406 50759</div>
                    <div>Email: aakashyadav2024@gmail.com</div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* ==========================================
              2. ADVISOR DESK VIEW (AGENT DASHBOARD)
              ========================================== */}
          {activeTab === "agent" && (
            <motion.div
              key="agent"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
            >
              {/* Col 1 & 2: Add Listing Form & Lead Tracker */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Fast Add Property Form */}
                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-200/60 shadow-sm"
                }`}>
                  <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-6">
                    <PlusCircle size={14} className="text-amber-500" />
                    <span>Aura Estate Listing Wizard</span>
                  </h3>

                  <form onSubmit={handleCreateProperty} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Property Title</label>
                      <input
                        type="text"
                        placeholder="e.g. The Travertine Monolith"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                        className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Asset Price (USD)</label>
                      <input
                        type="number"
                        placeholder="e.g. 15000000"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                        className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Metropolitan City</label>
                      <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        <option value="Malibu">Malibu</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="New York">New York</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Mumbai">Mumbai</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Typology Type</label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      >
                        <option value="mansion">Mansion</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="estate">Estate</option>
                        <option value="apartment">Apartment</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-1 text-left">
                      <label className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold">Material Specifications & Description</label>
                      <textarea
                        rows={2}
                        placeholder="Specify aggregates, travertine heating, biophilic plants, and views..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className={`px-4 py-2.5 rounded-xl border text-xs focus:outline-none w-full resize-none ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-white" 
                            : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 mt-4 py-3.5 gold-button-gradient text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest hover:opacity-95"
                    >
                      Authorize & Deploy Property
                    </button>
                  </form>
                </div>

                {/* Lead Management Directory */}
                <div>
                  <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-6 ${
                    darkMode ? "text-white" : "text-slate-950"
                  }`}>
                    <FileText size={14} className="text-amber-500" />
                    <span>Dynamic Client Inquiries logs</span>
                  </h3>

                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div 
                        key={lead.id}
                        className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
                          darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-200/60 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest font-bold block mb-1">
                              Estate: {lead.propertyName || "Global Desk Consultation"}
                            </span>
                            <h4 className={`text-xs font-bold uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-950"}`}>
                              {lead.clientName}
                            </h4>
                            <span className="text-[9px] text-slate-400 block font-mono mt-0.5">{lead.clientEmail} | {lead.clientPhone}</span>
                          </div>

                          <div className="flex gap-1.5 p-0.5 bg-slate-950/40 border border-slate-900 rounded-xl">
                            {([
                              { id: "new", name: "New" },
                              { id: "contacted", name: "Contact" },
                              { id: "scheduled", name: "Schedule" }
                            ] as const).map(tab => (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => onUpdateLeadStatus(lead.id, tab.id)}
                                className={`text-[8px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg transition-all ${
                                  lead.status === tab.id 
                                    ? "bg-amber-500 text-slate-950" 
                                    : "text-slate-500 hover:text-white"
                                }`}
                              >
                                {tab.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <p className={`text-[10px] leading-relaxed font-light ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                          "{lead.clientMessage}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Col 3: Advisor Agenda logs */}
              <div className="space-y-6">
                
                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/20 border-slate-900" : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold block mb-4">Advisor Private Calendar</span>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3 text-xs">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold shrink-0">14:00</div>
                      <div>
                        <div className={`font-bold uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-950"}`}>Alastair walk</div>
                        <span className="text-[9px] text-slate-400 font-mono block">The Elysian Sanctuary, Bel Air</span>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 font-mono font-bold shrink-0">16:30</div>
                      <div>
                        <div className={`font-bold uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-950"}`}>Genevieve tour</div>
                        <span className="text-[9px] text-slate-400 font-mono block">The Obsidian Pavilion, Malibu</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* ==========================================
              3. DIRECTOR DESK VIEW (ADMIN DASHBOARD)
              ========================================== */}
          {activeTab === "admin" && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12 text-left"
            >
              {/* Top Row: Analytics metrics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">Total Directory Listing</span>
                    <Building2 size={16} className="text-amber-500" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono mt-4 text-white">
                    {properties.length}
                  </div>
                  <span className="text-[9px] text-emerald-500 font-mono font-bold block mt-1 uppercase">✓ Fully Verified</span>
                </div>

                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">Total Portfolio Sizing</span>
                    <Activity size={16} className="text-amber-500" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono mt-4 text-white">
                    ₹{(totalPortfolioValue / 10000000).toFixed(2)} Cr
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono block mt-1 uppercase">Global Assets accumulative</span>
                </div>

                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">Pending Lead Audits</span>
                    <Users size={16} className="text-amber-500" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono mt-4 text-white">
                    {activeLeadsCount}
                  </div>
                  <span className="text-[9px] text-amber-500 font-mono block mt-1 uppercase">Requires Advisor Coordination</span>
                </div>

                <div className={`p-6 rounded-3xl border ${
                  darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-100 shadow-sm"
                }`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">Corporate desk safety</span>
                    <ShieldCheck size={16} className="text-amber-500" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono mt-4 text-white">
                    100%
                  </div>
                  <span className="text-[9px] text-emerald-500 font-mono block mt-1 uppercase">Confidential NDA Active</span>
                </div>
              </div>

              {/* Middle Row: Active Directory Management List */}
              <div className={`p-6 rounded-3xl border ${
                darkMode ? "bg-slate-900/40 border-slate-900" : "bg-white border-slate-200/60 shadow-sm"
              }`}>
                <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-6">
                  <LayoutGrid size={14} className="text-amber-500" />
                  <span>Interactive Real Estate Directory Manager</span>
                </h3>

                <div className="overflow-x-auto rounded-2xl border dark:border-slate-900 border-slate-200">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className={`text-[10px] uppercase font-mono tracking-widest ${darkMode ? "bg-slate-900 text-slate-400" : "bg-slate-100 text-slate-500"}`}>
                      <tr>
                        <th className="p-4">Listing Title</th>
                        <th className="p-4">Valuation</th>
                        <th className="p-4">Coordinates</th>
                        <th className="p-4">City Location</th>
                        <th className="p-4">Deed Management</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-900 divide-slate-200">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-900/10">
                          <td className="p-4 font-bold flex items-center gap-2">
                            <img src={prop.image} alt="" className="w-8 h-8 rounded object-cover" />
                            <span className={`uppercase tracking-wide ${darkMode ? "text-white" : "text-slate-950"}`}>{prop.title}</span>
                          </td>
                          <td className="p-4 font-mono font-bold text-amber-500">{prop.formattedPrice}</td>
                          <td className="p-4 font-mono text-slate-400">Lat: {prop.coordinates.lat}, Lng: {prop.coordinates.lng}</td>
                          <td className="p-4 uppercase font-mono text-slate-500">{prop.city}</td>
                          <td className="p-4">
                            <button
                              onClick={() => onDeleteProperty(prop.id)}
                              className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg"
                              title="Delete listing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
