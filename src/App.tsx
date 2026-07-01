import { useState, useEffect } from "react";
import { PROPERTIES, AGENTS } from "./data";
import { Property, Lead, Appointment } from "./types";

// Component imports
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrustedBy from "./components/TrustedBy";
import PropertyCategories from "./components/PropertyCategories";
import FeaturedGrid from "./components/FeaturedGrid";
import InteractiveMap from "./components/InteractiveMap";
import MortgageCalculator from "./components/MortgageCalculator";
import WhyChooseUs from "./components/WhyChooseUs";
import AgentList from "./components/AgentList";
import { 
  Testimonials, LatestBlogs, FAQAccordion, Newsletter, Footer 
} from "./components/InfoModules";
import PropertyDetailsModal from "./components/PropertyDetailsModal";
import AIAgentAdvisor from "./components/AIAgentAdvisor";
import Dashboards from "./components/Dashboards";

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Active Role State
  const [activeRole, setActiveRole] = useState<"user" | "agent" | "admin">("user");

  // Core Data States
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Filter integration parameters (synced from Hero search into AIAgentAdvisor)
  const [selectedMode, setSelectedMode] = useState<"all" | "buy" | "rent">("all");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<number>(50000000); // 50M

  // Dynamic Lead & Appointment States (seeded initially with client data)
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "lead-1",
      propertyId: "prop-1",
      propertyName: "The Elysian Sanctuary",
      clientName: "Aakash Yadav",
      clientEmail: "aakashyadav2024@gmail.com",
      clientPhone: "+91 8340650759",
      clientMessage: "I would like to schedule a private flight coordinate to Malibu to review the travertine finishes.",
      status: "new",
      agentId: "agent-1",
      date: new Date().toLocaleDateString()
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "appt-1",
      propertyId: "prop-1",
      propertyTitle: "The Elysian Sanctuary",
      propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      agentName: "Aakash Yadav",
      date: "July 04, 2026",
      time: "14:00 GMT",
      status: "confirmed"
    }
  ]);

  // Handle active class body updates for dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Watchlist Save/Remove actions
  const handleToggleSave = (property: Property) => {
    setSavedProperties(prev => {
      const exists = prev.some(item => item.id === property.id);
      if (exists) {
        return prev.filter(item => item.id !== property.id);
      } else {
        return [...prev, property];
      }
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedProperties(prev => prev.filter(item => item.id !== id));
  };

  // Directory CMS Actions (add/delete properties from live list)
  const handleAddProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(item => item.id !== id));
    setSavedProperties(prev => prev.filter(item => item.id !== id));
  };

  // Inquiry Lead submissions
  const handleAddLead = (newLeadData: Omit<Lead, "id" | "date" | "status">) => {
    const freshId = `lead-${Date.now()}`;
    const freshLead: Lead = {
      ...newLeadData,
      id: freshId,
      status: "new",
      date: new Date().toLocaleDateString()
    };

    setLeads(prev => [freshLead, ...prev]);

    // Automatically trigger a corresponding walkthrough Appointment scheduled
    const matchedProp = properties.find(p => p.id === newLeadData.propertyId);
    const matchedAgent = AGENTS.find(a => a.id === newLeadData.agentId) || AGENTS[0];

    const freshAppt: Appointment = {
      id: `appt-${Date.now()}`,
      propertyId: newLeadData.propertyId,
      propertyTitle: matchedProp ? matchedProp.title : "Corporate Estate",
      propertyImage: matchedProp ? matchedProp.image : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
      agentName: matchedAgent.name,
      date: "Scheduling Status Pending",
      time: "Coordination ongoing",
      status: "pending"
    };

    setAppointments(prev => [freshAppt, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleUpdateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // Scroll viewport helper to direct anchors smoothly
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Search trigger coordinates updates from Hero component
  const handleSearchTrigger = (filters: {
    category: "buy" | "rent" | "commercial";
    location: string;
    budget: number;
    type: string;
  }) => {
    setSelectedMode(filters.category === "commercial" ? "all" : filters.category);
    setSelectedType(filters.type === "All Types" ? "" : filters.type);
    setSelectedLocation(filters.location);
    setSelectedBudget(filters.budget * 10000000); // converting Crores to rupees
    scrollToSection("properties");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-amber-500 selection:text-slate-950 ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
    }`}>
      
      {/* Dynamic Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        savedProperties={savedProperties}
        onRemoveSaved={handleRemoveSaved}
        onSelectProperty={(prop) => {
          setSelectedProperty(prop);
        }}
        onOpenConsultant={() => {
          const trigger = document.getElementById("chat-trigger");
          if (trigger) trigger.click();
        }}
        scrollToSection={scrollToSection}
      />

      {/* Hero Header Section */}
      <HeroSection
        darkMode={darkMode}
        onSearch={handleSearchTrigger}
        scrollToSection={scrollToSection}
      />

      {/* Social proof press endorsements */}
      <TrustedBy darkMode={darkMode} />

      {/* Design typology Categories Section */}
      <PropertyCategories
        darkMode={darkMode}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        scrollToSection={scrollToSection}
      />

      {/* Curated Properties Portfolio Grid */}
      <FeaturedGrid
        darkMode={darkMode}
        properties={properties}
        savedProperties={savedProperties}
        onToggleSave={handleToggleSave}
        onSelectProperty={setSelectedProperty}
        onOpenConsultant={() => {
          const element = document.getElementById("chat-trigger");
          if (element) element.click();
        }}
      />

      {/* Stylized vector plotting luxury World Map preview */}
      <InteractiveMap
        darkMode={darkMode}
        properties={properties}
        onSelectProperty={setSelectedProperty}
      />

      {/* Interactive Mortgage calculator */}
      <MortgageCalculator darkMode={darkMode} />

      {/* Commitments & Value propositions */}
      <WhyChooseUs darkMode={darkMode} />

      {/* Elite Advisory Partners */}
      <AgentList
        darkMode={darkMode}
        onOpenBookingModal={(agent) => {
          // Open details of any matching listing to book walks with them
          const matchedProp = properties.find(p => p.agentId === agent.id) || properties[0];
          setSelectedProperty(matchedProp);
        }}
      />

      {/* High-end Client Testimonials */}
      <Testimonials darkMode={darkMode} />

      {/* Architectural Journal Articles */}
      <LatestBlogs darkMode={darkMode} />

      {/* Dropdown FAQs Accordion list */}
      <FAQAccordion darkMode={darkMode} />

      {/* Dynamic Newsletters Signup block */}
      <Newsletter darkMode={darkMode} />

      {/* Multi-role dynamic Dashboards Panels */}
      <Dashboards
        darkMode={darkMode}
        properties={properties}
        onAddProperty={handleAddProperty}
        onDeleteProperty={handleDeleteProperty}
        savedProperties={savedProperties}
        onSelectProperty={setSelectedProperty}
        onRemoveSaved={handleRemoveSaved}
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        appointments={appointments}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
      />

      {/* Direct footer with connections details */}
      <Footer 
        darkMode={darkMode} 
        scrollToSection={scrollToSection} 
      />

      {/* Full detail presentation modal sheet */}
      {selectedProperty && (
        <PropertyDetailsModal
          darkMode={darkMode}
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onAddLead={handleAddLead}
        />
      )}

      {/* Floating AI Consultant Chatbox */}
      <AIAgentAdvisor
        darkMode={darkMode}
        userPreferences={{
          mode: selectedMode,
          type: selectedType,
          location: selectedLocation,
          budget: selectedBudget
        }}
        onSelectPropertyByTitle={(title) => {
          const found = properties.find(p => p.title.toLowerCase().includes(title.toLowerCase()));
          if (found) setSelectedProperty(found);
        }}
      />

    </div>
  );
}
