import React from 'react';
import { LayoutGrid, User, Home, MapPin, Maximize2, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { RideDetails } from '../types';

interface HeroSectionProps {
  ride: RideDetails;
  onToggleUnit: () => void;
  onOpenRouteModal: () => void;
  onOpenProfile: () => void;
  onOpenMenu: () => void;
  onGoHome: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  ride,
  onToggleUnit,
  onOpenRouteModal,
  onOpenProfile,
  onOpenMenu,
  onGoHome,
}) => {
  const displayDistance = ride.unit === 'km' 
    ? ride.distanceKm.toFixed(2) 
    : ride.distanceMiles.toFixed(2);
  const displayUnit = ride.unit;

  return (
    <section 
      className="relative z-20 w-full pt-8 pb-4 px-4 sm:px-8 lg:px-12"
      aria-label="Today's Cycling Summary"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
        
        {/* Left Side: Map Card + Big Display Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
          
          {/* Map Preview Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenRouteModal}
            className="group relative cursor-pointer w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-white/95 p-2 shadow-2xl border border-white/60 overflow-hidden flex-shrink-0 transition-all hover:shadow-orange-500/20"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenRouteModal();
              }
            }}
            aria-label={`View cycling route map: ${ride.loopName}. Press enter to inspect elevation and checkpoints.`}
          >
            {/* Map Container */}
            <div className="w-full h-full rounded-2xl bg-[#e6eaf0] relative overflow-hidden flex items-center justify-center select-none">
              
              {/* Stylized Lake & Peninsula Coastline SVG */}
              <svg 
                viewBox="0 0 200 200" 
                className="absolute inset-0 w-full h-full object-cover"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  {/* Water gradient */}
                  <linearGradient id="lakeWater" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bfd5ea" />
                    <stop offset="100%" stopColor="#9fbcd8" />
                  </linearGradient>
                  
                  {/* Land gradient */}
                  <linearGradient id="landTerrain" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#edf1f7" />
                    <stop offset="100%" stopColor="#dfe6f0" />
                  </linearGradient>

                  {/* Route glow */}
                  <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#f97316" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Base Landmass */}
                <rect width="200" height="200" fill="url(#landTerrain)" />

                {/* Water Body (Lago di Como Y-shape fjord / lake) */}
                <path
                  d="M 65 0 C 70 30, 85 55, 95 85 C 98 94, 99 105, 95 120 C 85 150, 70 170, 60 200 L 130 200 C 122 170, 115 140, 118 115 C 122 92, 135 70, 145 35 L 140 0 Z"
                  fill="url(#lakeWater)"
                />
                
                {/* Secondary Lake Arm */}
                <path
                  d="M 98 105 C 115 115, 135 130, 150 160 L 165 150 C 145 120, 125 105, 105 95 Z"
                  fill="url(#lakeWater)"
                />

                {/* Topo contour lines */}
                <path d="M 10 30 Q 35 40 45 70" stroke="#cbd5e1" strokeWidth="0.75" fill="none" />
                <path d="M 155 40 Q 175 60 185 95" stroke="#cbd5e1" strokeWidth="0.75" fill="none" />
                <path d="M 20 140 Q 40 160 50 190" stroke="#cbd5e1" strokeWidth="0.75" fill="none" />

                {/* Road Network */}
                <path 
                  d="M 25 20 Q 55 50 68 85 T 62 160" 
                  stroke="#ffffff" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  fill="none" 
                  opacity="0.8"
                />
                <path 
                  d="M 160 20 Q 135 60 128 100 T 145 180" 
                  stroke="#ffffff" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  fill="none" 
                  opacity="0.8"
                />

                {/* Lake Label */}
                <text x="82" y="152" fill="#64748b" fontSize="7" fontStyle="italic" opacity="0.8">
                  Lago di Como
                </text>

                {/* The Orange Cycling GPS Loop Track (Matches exact geometry from image) */}
                <path
                  d="M 100 48 L 132 80 L 126 128 L 88 115 L 75 88 Z"
                  fill="rgba(249, 115, 22, 0.08)"
                  stroke="#ff7a00"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#routeGlow)"
                />

                {/* Start / Finish Point Marker */}
                <circle cx="88" cy="115" r="3.5" fill="#ffffff" stroke="#ff7a00" strokeWidth="2" />
                <circle cx="88" cy="115" r="1.5" fill="#ff7a00" />
              </svg>

              {/* Watermark label matching the exact screenshot: "API KEY REQUIRED carto.com/basemaps/apikey" */}
              <div 
                className="absolute inset-x-0 top-3 px-2 text-center pointer-events-none select-none opacity-40 font-mono text-[8px] uppercase tracking-wider text-slate-700 -rotate-45"
                style={{ transformOrigin: 'center' }}
              >
                API KEY REQUIRED
                <div className="text-[6.5px] lowercase">carto.com/basemaps/apikey</div>
              </div>

              {/* Hover indicator overlay */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3 text-white" />
              </div>

              {/* Bottom Pill Badge: "● 56.78 km Loop" */}
              <div className="absolute bottom-2 left-2 z-10">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a00] animate-pulse"></span>
                  <span className="text-[10px] font-semibold text-white tracking-tight whitespace-nowrap">
                    {ride.loopName}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Hero Typography */}
          <div className="flex flex-col justify-center">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.08] drop-shadow-sm">
              <span className="block">You cycled</span>
              <span className="block mt-0.5 sm:mt-1">
                {displayDistance}{' '}
                <button
                  onClick={onToggleUnit}
                  title="Click to switch km/mi"
                  className="text-[#ff7a00] hover:underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded transition-colors"
                >
                  {displayUnit}
                </button>{' '}
                today!
              </span>
            </h1>

            {/* Quick Metrics Sub-row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{ride.movingTime} moving</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90">
                <span>Avg {ride.avgSpeedKmh} km/h</span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90">
                <span>+{ride.elevationGainM}m elevation</span>
              </div>
              <button
                onClick={onOpenRouteModal}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-orange-300 hover:text-orange-200 transition-colors ml-1 group"
              >
                <span>Full Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Floating Vertical Action Bar (Matching screenshot right dock) */}
        <div 
          className="hidden md:flex flex-col gap-2.5 self-center lg:self-start lg:mt-2"
          role="toolbar" 
          aria-label="Quick Actions"
        >
          {/* Bento / Grid Button */}
          <button
            onClick={onOpenMenu}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:bg-white/45 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Open modular widget drawer"
            title="Modular Widgets"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Profile Button */}
          <button
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:bg-white/45 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Open athlete profile"
            title="Athlete Profile"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Home Button */}
          <button
            onClick={onGoHome}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:bg-white/45 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white transition-all shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Reset to default dashboard view"
            title="Home View"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
