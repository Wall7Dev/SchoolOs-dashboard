import React from 'react';
import { BarChart2 } from 'lucide-react';
import { WellnessData } from '../../types';

interface WellnessCardProps {
  data: WellnessData;
  onOpenInsights: () => void;
}

export const WellnessCard: React.FC<WellnessCardProps> = ({ data, onOpenInsights }) => {
  return (
    <div 
      className="glass-panel rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-white/30 group"
      role="region"
      aria-label="Wellness score and recovery telemetry"
    >
      {/* Header and Top Metric */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white/90 text-sm font-medium tracking-tight">Wellness Score</h2>
        </div>

        {/* Big Orange 87 Score + Labels */}
        <div className="text-right">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#ff7a00] leading-none tracking-tight">
            {data.score}
          </div>
          <div className="text-xs font-semibold text-white/90 mt-0.5">
            {data.status}
          </div>
          <div className="text-[10px] text-white/50 tracking-tight">
            {data.comparisonText}
          </div>
        </div>
      </div>

      {/* Dual Sine Wave Chart running across middle/bottom */}
      <div className="my-2 h-14 relative flex items-center">
        <svg 
          viewBox="0 0 300 60" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="wellnessWaveOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="wellnessWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Golden Yellow Wave */}
          <path
            d="M 0 38 Q 60 48, 120 32 T 240 28 T 300 40"
            fill="none"
            stroke="url(#wellnessWaveGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Orange Sine Wave */}
          <path
            d="M 0 44 Q 70 20, 140 46 T 260 22 T 300 36"
            fill="none"
            stroke="url(#wellnessWaveOrange)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Footer Metrics + Insights Button */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        {/* Left: Sleep Avg */}
        <div>
          <div className="text-[10px] text-white/50 uppercase tracking-wider">
            Sleep Avg
          </div>
          <div className="text-sm font-bold text-white tracking-tight">
            {data.sleepAvgHours}h
          </div>
        </div>

        {/* Center: Insights Button (Frosted Pill matching screenshot) */}
        <button
          onClick={onOpenInsights}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          aria-label="View detailed Wellness Insights"
        >
          <BarChart2 className="w-3.5 h-3.5 text-white/80" />
          <span>Insights</span>
        </button>

        {/* Right: Recovery */}
        <div className="text-right">
          <div className="text-[10px] text-white/50 uppercase tracking-wider">
            Recovery
          </div>
          <div className="text-sm font-bold text-white tracking-tight">
            {data.recoveryPercentage}%
          </div>
        </div>
      </div>

    </div>
  );
};
