import React, { useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { HeartData, TimeRange } from '../../types';

interface HeartCardProps {
  data: HeartData;
  onRangeChange?: (range: TimeRange) => void;
}

export const HeartCard: React.FC<HeartCardProps> = ({ data, onRangeChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentRange, setCurrentRange] = useState<TimeRange>(data.timeRange);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const ranges: TimeRange[] = ['Last 7 days', 'Today', 'Last 30 days'];

  // Heights for the 7 bars matching screenshot aesthetic (M, T, W, T, F, S, S)
  const barHeights = [45, 68, 55, 48, 52, 38, 42];

  const handleSelectRange = (range: TimeRange) => {
    setCurrentRange(range);
    setDropdownOpen(false);
    if (onRangeChange) onRangeChange(range);
  };

  return (
    <div 
      className="glass-panel rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-white/30 group"
      role="region"
      aria-label="Heart rate telemetry"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-rose-500/30 backdrop-blur-md flex items-center justify-center text-rose-400 border border-rose-400/30">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          </div>
          <h2 className="text-white text-base font-semibold tracking-tight">Heart</h2>
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

      {/* 7-Day Vertical Pill Bar Chart matching screenshot */}
      <div className="my-2 relative px-2">
        <div className="h-20 flex items-end justify-between gap-2">
          {data.days.map((dayItem, index) => {
            const heightPercent = barHeights[index] || 50;
            const isSelected = selectedDay === index;

            return (
              <div
                key={`${dayItem.day}-${index}`}
                className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group/bar"
                onMouseEnter={() => setSelectedDay(index)}
                onMouseLeave={() => setSelectedDay(null)}
              >
                {/* Bar track and pill */}
                <div className="w-full max-w-[14px] h-16 flex items-end justify-center relative">
                  {/* Vertical bar pill with subtle golden-orange glow */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`w-2.5 rounded-full relative transition-all ${
                      isSelected 
                        ? 'bg-orange-400 shadow-md shadow-orange-500/50' 
                        : 'bg-orange-500/80 hover:bg-orange-400'
                    }`}
                  >
                    {/* Glowing orange circular node on top of bar matching image */}
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#ff7a00] border-2 border-white/80 shadow-md shadow-orange-500/80"></div>
                  </motion.div>
                </div>

                {/* Day Letter: M, T, W, T, F, S, S */}
                <span className={`text-[10px] font-mono transition-colors ${
                  isSelected ? 'text-white font-bold' : 'text-white/45'
                }`}>
                  {dayItem.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected day tooltip */}
        {selectedDay !== null && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/90 border border-white/20 text-[10px] text-white shadow-md select-none whitespace-nowrap">
            {data.days[selectedDay].fullDay}: {data.days[selectedDay].restingBpm} BPM resting ({data.days[selectedDay].peakBpm} peak)
          </div>
        )}
      </div>

      {/* Bottom Metric: 63 BPM */}
      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
              {data.avgRestingBpm}
            </span>
            <span className="text-sm font-semibold text-white/90">BPM</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Avg Resting Heart Rate</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-medium text-emerald-400">
            Good Recovery
          </span>
        </div>
      </div>

    </div>
  );
};
