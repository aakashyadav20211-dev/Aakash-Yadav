import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { IndianRupee, Percent, Calendar, Sparkles, Scale, Phone } from "lucide-react";

const formatRupee = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakh`;
  } else {
    return `₹${value.toLocaleString('en-IN')}`;
  }
};

export default function MortgageCalculator({ darkMode }: { darkMode: boolean }) {
  const [propertyValue, setPropertyValue] = useState<number>(120000000); // 12 Crore (120 Million rupees)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(4.5); // 4.5%
  const [loanTermYears, setLoanTermYears] = useState<number>(30); // 30 Years

  // Financial calculations
  const downPaymentAmount = useMemo(() => {
    return Math.round((propertyValue * downPaymentPercent) / 100);
  }, [propertyValue, downPaymentPercent]);

  const loanPrincipal = useMemo(() => {
    return propertyValue - downPaymentAmount;
  }, [propertyValue, downPaymentAmount]);

  const monthlyPayment = useMemo(() => {
    const r = interestRate / 100 / 12; // monthly rate
    const n = loanTermYears * 12; // total payments
    if (r === 0) return Math.round(loanPrincipal / n);
    const emi = (loanPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [loanPrincipal, interestRate, loanTermYears]);

  const totalAmountPaid = useMemo(() => {
    return monthlyPayment * loanTermYears * 12;
  }, [monthlyPayment, loanTermYears]);

  const totalInterestPaid = useMemo(() => {
    return Math.max(0, totalAmountPaid - loanPrincipal);
  }, [totalAmountPaid, loanPrincipal]);

  const interestRatioPercent = useMemo(() => {
    if (totalAmountPaid === 0) return 0;
    return Math.round((totalInterestPaid / totalAmountPaid) * 100);
  }, [totalInterestPaid, totalAmountPaid]);

  return (
    <section id="mortgage" className="py-24 max-w-7xl mx-auto px-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono block mb-2">
            Private Amortization Modeler
          </span>
          <h2 className={`text-2xl sm:text-4xl font-bold uppercase tracking-tight ${
            darkMode ? "text-white" : "text-slate-950"
          }`}>
            Luxury Asset Financing
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
          Simulate preferred financing ratios. Aura partners directly with tier-one global private banks to guarantee customized, high-security rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Input Sliders */}
        <div className={`p-8 rounded-3xl border ${
          darkMode ? "bg-slate-900/40 border-slate-900" : "bg-slate-50 border-slate-200/50"
        }`}>
          <div className="space-y-8">
            
            {/* Slider 1: Property Valuation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                  <IndianRupee size={10} className="text-amber-500" />
                  <span>Asset Value (INR)</span>
                </span>
                <span className="font-mono text-sm font-bold text-amber-500">
                  {formatRupee(propertyValue)}
                </span>
              </div>
              <input
                type="range"
                min="5000000"
                max="500000000"
                step="5000000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                <span>₹50 Lakh</span>
                <span>₹50 Cr+</span>
              </div>
            </div>

            {/* Slider 2: Down Payment percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                  <Percent size={10} className="text-amber-500" />
                  <span>Preferred Equity Contribution</span>
                </span>
                <span className="font-mono text-sm font-bold text-amber-500">
                  {downPaymentPercent}% ({formatRupee(downPaymentAmount)})
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                <span>10% Equity</span>
                <span>80% Equity</span>
              </div>
            </div>

            {/* Slider 3: Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                  <Scale size={10} className="text-amber-500" />
                  <span>Financing Interest Rate</span>
                </span>
                <span className="font-mono text-sm font-bold text-amber-500">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="1.5"
                max="12"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                <span>1.50%</span>
                <span>12.00%</span>
              </div>
            </div>

            {/* Loan term years selection */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold flex items-center gap-1">
                <Calendar size={10} className="text-amber-500" />
                <span>Acquisition Amortization Window</span>
              </span>
              <div className="flex gap-3">
                {[10, 15, 20, 30].map(yr => (
                  <button
                    key={yr}
                    onClick={() => setLoanTermYears(yr)}
                    className={`flex-1 py-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                      loanTermYears === yr
                        ? "bg-amber-500 border-amber-500 text-slate-950"
                        : darkMode
                          ? "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {yr} Years
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Calculations Results / Graphics */}
        <div className="flex flex-col gap-8 justify-center h-full">
          
          {/* Monthly Payment Board */}
          <div className={`p-8 rounded-3xl border relative overflow-hidden ${
            darkMode ? "bg-slate-900/20 border-slate-900/70" : "bg-slate-100/40 border-slate-200/40"
          }`}>
            <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold block mb-2">Estimated Monthly Commitment</span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-amber-500 tracking-tight">
              ₹{monthlyPayment.toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-light">
              Calculated assuming standard portfolio interest compounding. Includes principal and financing fees. Exclusionary of property taxes or luxury insurances.
            </p>
          </div>

          {/* Graphical Split indicator (Principal vs. Interest) */}
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono font-bold block">Liability Distribution splits</span>
            
            {/* Multi-segment customized progress bar */}
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
              <div 
                style={{ width: `${100 - interestRatioPercent}%` }} 
                className="gold-button-gradient h-full" 
                title="Principal Split"
              />
              <div 
                style={{ width: `${interestRatioPercent}%` }} 
                className="bg-slate-400 dark:bg-slate-700 h-full" 
                title="Interest Split"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full gold-button-gradient" />
                <span className="text-slate-400 uppercase text-[10px]">Equity Principal</span>
                <span className={`ml-auto ${darkMode ? "text-white" : "text-slate-950"}`}>
                  {formatRupee(loanPrincipal)} ({100 - interestRatioPercent}%)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700" />
                <span className="text-slate-400 uppercase text-[10px]">Total Interest</span>
                <span className={`ml-auto ${darkMode ? "text-white" : "text-slate-950"}`}>
                  {formatRupee(totalInterestPaid)} ({interestRatioPercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* Action Call for private financing desk */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="tel:+918340650759"
              className="flex-1 gold-button-gradient text-slate-950 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/15"
            >
              <Phone size={14} />
              <span>Contact Private Financing</span>
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("chat-trigger");
                if (element) element.click();
              }}
              className="flex-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-amber-500" />
              <span>Ask AI Advisor</span>
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
