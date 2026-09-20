import React, { useState } from 'react';
import { Moon, ChevronDown, ArrowUpRight, TrendingUp } from 'lucide-react';
import { SleepData, TimeRange } from '../../types';

interface SleepCardProps {
  data: SleepData;
  onRangeChange?: (range: TimeRange) => void;
}

export const SleepCard: React.FC<SleepCardProps> = ({ data, onRangeChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentRange, setCurrentRange] = useState<TimeRange>(data.timeRange);
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const ranges: TimeRange[] = ['Last 7 days', 'Today', 'Last 30 days'];

  const handleSelectRange = (range: TimeRange) => {
    setCurrentRange(range);
    setDropdownOpen(false);
    if (onRangeChange) onRangeChange(range);
  };

  return (
    <div 
      className="glass-panel rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-white/30 group"
      role="region"
      aria-label="Sleep statistics"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/30 backdrop-blur-md flex items-center justify-center text-indigo-300 border border-indigo-400/30">
            <Moon className="w-3.5 h-3.5 fill-indigo-300 text-indigo-300" />
          </div>
          <h2 className="text-white text-base font-semibold tracking-tight">Sleep</h2>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-expanded={dropdownOpen}
          >
            <span>{currentRange}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-30 w-32 py-1 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-xl">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleSelectRange(range)}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    currentRange === range ? 'text-white font-medium bg-white/15' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dual Wave SVG Chart */}
      <div className="my-2 relative flex items-center">
        {/* Y-axis labels: 4, 2, 0 */}
        <div className="flex flex-col justify-between h-20 text-[9px] text-white/40 font-mono pr-2 select-none">
          <span>4</span>
          <span>2</span>
          <span>0</span>
        </div>

        {/* Chart SVG */}
        <div className="flex-1 h-20 relative">
          <svg 
            viewBox="0 0 240 70" 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="limeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="50%" stopColor="#a3e635" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
              <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#eab308" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            <line x1="0" y1="12" x2="240" y2="12" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 3" />
            <line x1="0" y1="36" x2="240" y2="36" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 3" />
            <line x1="0" y1="62" x2="240" y2="62" stroke="rgba(255,255,255,0.08)" />

            {/* Smooth Wave 1: Neon Lime Green (Top wave matching image) */}
            <path
              d="M 0 58 C 30 58, 60 57, 90 56 C 120 55, 135 32, 160 22 C 185 14, 215 14, 240 14"
              fill="none"
              stroke="url(#limeGlow)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Smooth Wave 2: Warm Gold (Running just below lime curve) */}
            <path
              d="M 0 63 C 30 63, 60 62, 90 61 C 120 60, 135 40, 160 30 C 185 22, 215 22, 240 22"
              fill="none"
              stroke="url(#goldGlow)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Interactive Nodes along curve */}
            <circle cx="160" cy="22" r="3" fill="#a3e635" className="animate-pulse" />
            <circle cx="160" cy="30" r="2.5" fill="#f59e0b" />
          </svg>

          {/* X-axis labels: 08, 12, 18, 22 */}
          <div className="absolute -bottom-4 inset-x-0 flex justify-between text-[10px] text-white/40 font-mono select-none px-1">
            <span>08</span>
            <span>12</span>
            <span>18</span>
            <span>22</span>
          </div>
        </div>
      </div>

      {/* Bottom Metric: 7h 45m */}
      <div className="pt-4 border-t border-white/10 flex items-baseline justify-between mt-2">
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
            {data.durationHours}h {data.durationMinutes}m
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-white/70">
            {/* Person / walking icon with plus */}
            <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span className="text-white/80">{data.deltaText}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
            92% Quality
          </span>
        </div>
      </div>

    </div>
  );
};
