import React from 'react';
import { BarChart2 } from 'lucide-react';
import { FocusData } from '../../types';

interface FocusCardProps {
  data: FocusData;
  onOpenInsights: () => void;
}

export const FocusCard: React.FC<FocusCardProps> = ({ data, onOpenInsights }) => {
  return (
    <div 
      className="glass-panel rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-white/30 group"
      role="region"
      aria-label="Focus activity and deep work telemetry"
    >
      {/* Header and Score */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white/90 text-sm font-medium tracking-tight">Focus Activity</h2>
        </div>

        {/* Big Orange 73 Score + Subtitle */}
        <div className="text-right">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#ff7a00] leading-none tracking-tight">
            {data.score}
          </div>
          <div className="text-xs font-semibold text-white/90 mt-0.5">
            Focus Score
          </div>
          <div className="text-[10px] text-white/50 tracking-tight">
            Deep Work {data.deepWorkHours}h
          </div>
        </div>
      </div>

      {/* Spectrum Waveform Equalizer Visualizer */}
      <div className="my-2 h-14 relative flex items-center justify-between gap-1 px-1">
        {data.waveformBars.map((bar, idx) => {
          return (
            <div
              key={idx}
              className="flex-1 flex items-center justify-center h-full"
            >
              <div
                style={{ height: `${bar.height}%` }}
                className={`w-[2px] rounded-full transition-all duration-300 ${
                  bar.active
                    ? 'bg-[#ff7a00] shadow-sm shadow-orange-500/80 scale-y-105'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                title={bar.label || `Interval ${idx + 1}`}
              />
            </div>
          );
        })}
      </div>

      {/* Footer Metrics + Insights Button */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        {/* Left: Avg Focus Session */}
        <div>
          <div className="text-[10px] text-white/50 uppercase tracking-wider">
            Avg Focus Session
          </div>
          <div className="text-sm font-bold text-white tracking-tight">
            {data.avgSessionMinutes} min
          </div>
        </div>

        {/* Center: Insights Button */}
        <button
          onClick={onOpenInsights}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          aria-label="View detailed Focus Insights"
        >
          <BarChart2 className="w-3.5 h-3.5 text-white/80" />
          <span>Insights</span>
        </button>

        {/* Right: Deep Work */}
        <div className="text-right">
          <div className="text-[10px] text-white/50 uppercase tracking-wider">
            Deep Work
          </div>
          <div className="text-sm font-bold text-white tracking-tight">
            {data.deepWorkHours}h
          </div>
        </div>
      </div>

    </div>
  );
};
