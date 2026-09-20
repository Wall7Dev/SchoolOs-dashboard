import React, { useState } from 'react';
import { Activity as ActivityIcon, ChevronDown, Footprints } from 'lucide-react';
import { motion } from 'motion/react';
import { ActivityData, TimeRange } from '../../types';

interface ActivityCardProps {
  data: ActivityData;
  onRangeChange?: (range: TimeRange) => void;
  onOpenDetails?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  data,
  onRangeChange,
  onOpenDetails,
}) => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentRange, setCurrentRange] = useState<TimeRange>(data.timeRange);

  const ranges: TimeRange[] = ['Last 7 days', 'Today', 'Last 30 days'];

  // Categories matching the image
  const categories = ['Browsing', 'Conversation', 'Phone'] as const;

  // X-axis timeline markers matching screenshot: 08, 12, 18, 22
  const timeMarkers = [
    { label: '08', hour: 8 },
    { label: '12', hour: 12 },
    { label: '18', hour: 18 },
    { label: '22', hour: 22 },
  ];

  const minHour = 6;
  const maxHour = 24;

  const getPositionPercent = (hour: number) => {
    return Math.max(0, Math.min(100, ((hour - minHour) / (maxHour - minHour)) * 100));
  };

  const getWidthPercent = (duration: number) => {
    return Math.max(3, (duration / (maxHour - minHour)) * 100);
  };

  const handleSelectRange = (range: TimeRange) => {
    setCurrentRange(range);
    setDropdownOpen(false);
    if (onRangeChange) onRangeChange(range);
  };

  return (
    <div 
      className="glass-panel rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden transition-all hover:border-white/30 group"
      role="region"
      aria-label="Activity statistics"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            {/* Running / activity athlete icon */}
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z"/>
            </svg>
          </div>
          <h2 className="text-white text-base font-semibold tracking-tight">Activity</h2>
        </div>

        {/* Time Range Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
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
                  role="option"
                  aria-selected={currentRange === range}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Timeline Matrix */}
      <div className="my-2 relative">
        <div className="space-y-2.5">
          {categories.map((cat) => {
            const rowBlocks = data.blocks.filter((b) => b.category === cat);
            return (
              <div key={cat} className="flex items-center text-xs">
                {/* Row Label */}
                <span className="w-20 text-[11px] font-normal text-white/50 tracking-tight select-none">
                  {cat}
                </span>

                {/* Row Track */}
                <div className="flex-1 h-3.5 relative rounded-full bg-white/5 flex items-center">
                  {/* Subtle dotted baseline */}
                  <div className="absolute inset-x-0 h-px border-b border-white/10"></div>

                  {/* Active Orange Blocks matching screenshot */}
                  {rowBlocks.map((block) => {
                    const left = getPositionPercent(block.startHour);
                    const width = getWidthPercent(block.durationHours);
                    const isHovered = hoveredBlock === block.id;

                    return (
                      <motion.div
                        key={block.id}
                        onMouseEnter={() => setHoveredBlock(block.id)}
                        onMouseLeave={() => setHoveredBlock(null)}
                        whileHover={{ scaleY: 1.25 }}
                        style={{
                          left: `${left}%`,
                          width: `${width}%`,
                        }}
                        className="absolute h-2.5 rounded-full bg-[#ff7a00] shadow-sm shadow-orange-500/50 cursor-pointer transition-colors hover:bg-orange-400"
                        role="tooltip"
                        title={`${cat}: ${block.label} (${block.durationHours}h)`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal Time Axis: 08, 12, 18, 22 */}
        <div className="flex items-center justify-between pl-20 pt-2 text-[10px] text-white/40 font-mono select-none">
          {timeMarkers.map((m) => (
            <span key={m.label}>{m.label}</span>
          ))}
        </div>
      </div>

      {/* Bottom Metric: 19,840 Steps */}
      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none">
            {data.totalSteps.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-white/70">
            {/* Sneaker / Footprints icon */}
            <Footprints className="w-3.5 h-3.5 text-white/60" />
            <span>Steps</span>
          </div>
        </div>

        {/* Subtle trend indicator */}
        <div className="text-right">
          <span className="text-[11px] font-medium text-emerald-400">
            +14% vs avg
          </span>
        </div>
      </div>

    </div>
  );
};
