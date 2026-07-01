import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, MessageSquare, X, Send, User, 
  HelpCircle, ShieldCheck, Compass, ArrowUpRight, Phone, MessageCircle
} from "lucide-react";
import { PropertyCategory, PropertyType } from "../types";

interface AIAgentAdvisorProps {
  darkMode: boolean;
  userPreferences: {
    mode: PropertyCategory | "all";
    type: string;
    location: string;
    budget: number;
  };
  onSelectPropertyByTitle: (title: string) => void;
}

interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

const CHIPS = [
  "Suggest Malabar Hill villas under ₹20 Cr",
  "Show me Aspen estates with pool",
  "How do I acquire off-market Monaco properties?",
  "Recommend a Mumbai Sea duplex penthouse"
];

export default function AIAgentAdvisor({
  darkMode,
  userPreferences,
  onSelectPropertyByTitle
}: AIAgentAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Welcome to Aura Estates. I am your Senior AI Advisor—a digital extension of Aakash Yadav. I have synced your active browsing criteria. What level of architectural masterclass can I help you acquire today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          userPreferences: {
            mode: userPreferences.mode === "all" ? "Flexible" : userPreferences.mode,
            type: userPreferences.type || "Any Typology",
            location: userPreferences.location || "Global Coordinates",
            budget: userPreferences.budget ? userPreferences.budget / 1000000 : null
          }
        })
      });

      const data = await response.json();
      
      if (response.ok && data.text) {
        setMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } else {
        throw new Error(data.error || "Failed to parse advice.");
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: `My apologies. I had trouble connecting to our private mainframe. Please verify your Gemini API key in **Settings > Secrets** or connect with Aakash Yadav directly at **+91 83406 50759**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Pulse floating launcher button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chat-trigger"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full gold-button-gradient text-slate-950 flex items-center justify-center shadow-2xl cursor-pointer relative"
            title="Private AI Advisor"
          >
            {/* Breathing radial rings */}
            <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping duration-1000 -z-10" />
            <Sparkles size={20} className="animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className={`w-96 rounded-3xl overflow-hidden border shadow-2xl flex flex-col justify-between h-[520px] ${
              darkMode ? "bg-slate-950/95 border-slate-900 text-white" : "bg-white/95 border-slate-100 text-slate-950"
            } backdrop-blur-md`}
          >
            {/* Header branding info */}
            <div className="p-4 gold-button-gradient flex items-center justify-between text-slate-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-sm tracking-widest">
                  A
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest font-sans flex items-center gap-1">
                    <span>Aakash Yadav AI</span>
                    <ShieldCheck size={12} className="fill-slate-950 text-amber-400" />
                  </h4>
                  <span className="text-[9px] tracking-widest font-mono uppercase font-bold text-slate-900/75">Senior Partner AI Clone</span>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-slate-950/10 rounded-full cursor-pointer"
                aria-label="Minimize AI panel"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat Messages flow log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
              {messages.map((msg) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 text-left max-w-[85%] ${isAi ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    <div className={`p-2.5 rounded-2xl leading-relaxed ${
                      isAi
                        ? darkMode ? "bg-slate-900 text-slate-300 border border-slate-800" : "bg-slate-50 text-slate-700 border border-slate-100"
                        : "gold-button-gradient text-slate-950 font-medium"
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className="text-[8px] font-mono text-slate-500 block mt-1 text-right">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-2 mr-auto text-left max-w-[85%]">
                  <div className={`p-2.5 rounded-2xl ${
                    darkMode ? "bg-slate-900 border border-slate-800 text-slate-300" : "bg-slate-50 border border-slate-100 text-slate-700"
                  } flex items-center gap-1 font-mono text-[10px]`}>
                    <Compass size={12} className="text-amber-500 animate-spin-slow" />
                    <span>Analyzing private listings databases...</span>
                  </div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>

            {/* Helper Quick Chips */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 text-left space-y-1">
                <span className="text-[8px] uppercase tracking-widest text-slate-500 font-mono font-bold block mb-1">Rapid Consult Options</span>
                <div className="flex flex-col gap-1">
                  {CHIPS.map(chip => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className={`text-[9px] font-semibold text-left p-1.5 rounded-lg border transition-colors truncate w-full ${
                        darkMode 
                          ? "bg-slate-900/40 border-slate-900 text-slate-300 hover:border-amber-500/20 hover:text-white" 
                          : "bg-slate-50 border-slate-100 text-slate-600 hover:border-amber-500/20 hover:text-slate-950"
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Input fields */}
            <div className={`p-3 border-t flex flex-col gap-2 ${
              darkMode ? "bg-slate-950/80 border-slate-900" : "bg-white/80 border-slate-100"
            }`}>
              
              {/* Sync criteria tracker visual */}
              <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono uppercase tracking-wider">
                <span>Location: {userPreferences.location || "Global"}</span>
                <span>Budget: {userPreferences.budget ? `₹${(userPreferences.budget / 10000000).toFixed(2)} Cr` : "Flexible"}</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Inquire about property acquisition..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage(inputValue);
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    darkMode 
                      ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500/30" 
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500/30"
                  }`}
                />
                
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={loading || !inputValue.trim()}
                  className="p-2.5 rounded-xl gold-button-gradient text-slate-950 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
