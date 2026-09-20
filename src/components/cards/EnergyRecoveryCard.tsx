import React, { useState } from 'react';
import { 
  Heart, 
  Bed, 
  Activity, 
  Zap, 
  Hand, 
  Brain, 
  Droplet, 
  ChevronDown 
} from 'lucide-react';
import { motion } from 'motion/react';
import { MetricCategory, GaugeMetricType } from '../../types';
import { categoryProfiles } from '../../data/mockData';

interface EnergyRecoveryCardProps {
  onOpenDetails?: (category: MetricCategory) => void;
}

export const EnergyRecoveryCard: React.FC<EnergyRecoveryCardProps> = ({ onOpenDetails }) => {
  const [activeCategory, setActiveCategory] = useState<MetricCategory>('heart');
  const [selectedMetric, setSelectedMetric] = useState<GaugeMetricType>('Speed');
  const [metricDropdownOpen, setMetricDropdownOpen] = useState(false);

  const profile = categoryProfiles[activeCategory];

  const categoryTabs: { id: MetricCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'heart', label: 'Heart & Cardio', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'sleep', label: 'Sleep Quality', icon: <Bed className="w-3.5 h-3.5" /> },
    { id: 'activity', label: 'Daily Activity', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'energy', label: 'Energy Reserves', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'hydration', label: 'Hydration & Vitals', icon: <Hand className="w-3.5 h-3.5" /> },
    { id: 'mind', label: 'Mind & Focus', icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'vitals', label: 'Blood Oxygen & Vitals', icon: <Droplet className="w-3.5 h-3.5" /> },
  ];

  const metricOptions: GaugeMetricType[] = ['Speed', 'Power', 'Cadence', 'Heart Rate', 'VO2 Max'];

  // Calculate percentage dynamically based on active category & selected metric
  const gaugePercent = profile.gaugePercentage;

  // Arc calculation for SVG
  // Half circle arc: radius = 80, center = (100, 95)
  // Total circumference for semi circle = PI * 80 ≈ 251.3
  const radius = 80;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (gaugePercent / 100) * circumference;

  return (
    <div 
      className="glass-panel rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden transition-all hover:border-white/30"
      role="region"
      aria-label="Energy and Recovery Index Overview"
    >
      {/* Top 7 Icon Selector Tabs */}
      <div 
        className="flex items-center justify-between gap-1 sm:gap-2 pb-4 border-b border-white/10"
        role="tablist"
        aria-label="Telemetry metrics categories"
      >
        {categoryTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                if (onOpenDetails) onOpenDetails(tab.id);
              }}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              title={tab.label}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {tab.icon}
            </button>
          );
        })}
      </div>

      {/* Center Semicircular Gauge Area */}
      <div className="my-auto py-6 flex flex-col items-center justify-center relative">
        
        {/* Metric Selector Dropdown: "Speed ▼" */}
        <div className="relative mb-2">
          <button
            onClick={() => setMetricDropdownOpen(!metricDropdownOpen)}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-expanded={metricDropdownOpen}
          >
            <span>{selectedMetric}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${metricDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {metricDropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 z-30 w-28 py-1 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-xl">
              {metricOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedMetric(opt);
                    setMetricDropdownOpen(false);
                  }}
                  className={`w-full text-center px-2 py-1 text-xs transition-colors ${
                    selectedMetric === opt ? 'text-white font-bold bg-white/15' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Semi-Circular Radial Gauge SVG */}
        <div className="relative w-64 h-36 flex items-center justify-center overflow-hidden">
          <svg 
            viewBox="0 0 200 120" 
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              {/* Metallic frosted stroke gradient */}
              <linearGradient id="gaugeBgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>

              {/* Active illuminated arc gradient */}
              <linearGradient id="gaugeActiveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff7a00" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Sine wave gradients */}
              <linearGradient id="gaugeWaveOrange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ff7a00" />
              </linearGradient>
              <linearGradient id="gaugeWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>

            {/* Background Arc: Semi-circle from 180 to 0 degrees */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeBgGradient)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Inner Metallic Highlight Line */}
            <path
              d="M 28 100 A 72 72 0 0 1 172 100"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />

            {/* Active Foreground Progress Arc */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeActiveGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Subtle Gauge Tick Marks */}
            <line x1="20" y1="100" x2="30" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <line x1="100" y1="20" x2="100" y2="30" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
            <line x1="180" y1="100" x2="170" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </svg>

          {/* Central Percentage Display & Underneath Sine Wave */}
          <div className="absolute inset-x-0 bottom-1 flex flex-col items-center justify-center">
            {/* 50% Big White Number */}
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-sm">
              {gaugePercent}%
            </div>

            {/* Dual Sine Waves underneath percentage matching screenshot */}
            <div className="w-24 h-4 mt-1 relative">
              <svg viewBox="0 0 96 16" className="w-full h-full overflow-visible">
                {/* Gold sine wave */}
                <path
                  d="M 0 10 Q 24 2, 48 10 T 96 10"
                  fill="none"
                  stroke="url(#gaugeWaveGold)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Orange sine wave */}
                <path
                  d="M 0 7 Q 24 13, 48 7 T 96 7"
                  fill="none"
                  stroke="url(#gaugeWaveOrange)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

        </div>

        {/* Dynamic Metric Value Pill */}
        <div className="mt-3 text-center">
          <span className="text-xs font-semibold text-white/90 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            Current {selectedMetric}: <span className="text-[#ff7a00]">{profile.value} {profile.unit}</span>
          </span>
        </div>

      </div>

      {/* Bottom Summary Text Matching Image */}
      <div className="pt-4 border-t border-white/10 text-center relative">
        <h2 className="text-white text-base sm:text-lg font-bold tracking-tight">
          {profile.title}
        </h2>
        <p className="text-xs text-white/60 mt-0.5">
          {profile.subtitle}
        </p>

        {/* Subtle Watermark in bottom right corner: DVxUi */}
        <div className="absolute right-0 bottom-0 text-[10px] font-mono tracking-widest text-white/30 uppercase select-none">
          DVxUi
        </div>
      </div>

    </div>
  );
};
