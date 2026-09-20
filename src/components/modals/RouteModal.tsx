import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, MapPin, TrendingUp, Gauge, Flame, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RideDetails } from '../../types';

interface RouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  ride: RideDetails;
}

export const RouteModal: React.FC<RouteModalProps> = ({ isOpen, onClose, ride }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // 0 to 100%

  // Handle keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Simulation playback loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen) return null;

  const currentKm = ((progress / 100) * ride.distanceKm).toFixed(1);
  const currentElevation = Math.round(200 + Math.sin(progress * 0.06) * 350 + (progress > 30 && progress < 70 ? 250 : 0));
  const currentSpeed = Math.round(28 + Math.cos(progress * 0.08) * 12);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Dialog Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-modal w-full max-w-4xl max-h-[90vh] rounded-3xl p-6 sm:p-8 relative z-10 overflow-y-auto text-white flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff7a00] animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                GPS Telemetry Replay
              </span>
            </div>
            <h2 id="route-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Lago di Como Loop ({ride.distanceKm} km)
            </h2>
            <p className="text-sm text-white/60">
              Recorded on Wahoo ELEMNT Roam • Ambient Temp 23°C • Clear Sky
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 flex items-center justify-center text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close route dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive GPS Track & Replay Map Canvas */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl bg-slate-900/80 border border-white/15 overflow-hidden flex items-center justify-center shadow-inner">
          <svg 
            viewBox="0 0 500 280" 
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="routeModalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#ff7a00" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <filter id="simGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff7a00" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Terrain grid lines */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            </pattern>
            <rect width="500" height="280" fill="url(#grid)" />

            {/* Lake Contour Background */}
            <path
              d="M 160 20 C 190 70, 220 110, 250 140 C 260 155, 270 180, 260 230 L 290 270 C 300 220, 290 170, 310 140 C 340 100, 380 60, 420 20 Z"
              fill="rgba(56, 189, 248, 0.12)"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.5"
            />
            <path
              d="M 250 140 C 290 160, 340 200, 390 240 L 370 270 C 320 210, 270 170, 240 150 Z"
              fill="rgba(56, 189, 248, 0.12)"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="1.5"
            />

            {/* GPS Route Trace Path */}
            <path
              id="ridePath"
              d="M 170 80 L 260 130 L 340 100 L 380 180 L 290 240 L 210 200 L 170 80"
              fill="rgba(249, 115, 22, 0.08)"
              stroke="url(#routeModalGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#simGlow)"
            />

            {/* Checkpoint Markers */}
            {ride.checkpoints.map((cp, idx) => {
              const coords = [
                { x: 170, y: 80 },
                { x: 260, y: 130 },
                { x: 340, y: 100 },
                { x: 380, y: 180 },
                { x: 290, y: 240 },
              ][idx] || { x: 200, y: 100 };

              return (
                <g key={cp.id}>
                  <circle cx={coords.x} cy={coords.y} r="5" fill="#0f172a" stroke="#ff7a00" strokeWidth="2" />
                  <text x={coords.x + 8} y={coords.y + 4} fill="#e2e8f0" fontSize="9" fontWeight="600">
                    {cp.name} ({cp.elevation}m)
                  </text>
                </g>
              );
            })}

            {/* Simulated Live Cyclist Marker */}
            <circle
              cx={170 + (progress / 100) * 140}
              cy={80 + Math.sin(progress * 0.05) * 80 + (progress / 100) * 90}
              r="7"
              fill="#ffffff"
              stroke="#ff7a00"
              strokeWidth="3"
              className="animate-pulse"
            />
          </svg>

          {/* Replay HUD Overlay */}
          <div className="absolute top-4 left-4 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15 flex items-center gap-4 text-xs">
            <div>
              <div className="text-white/50 text-[10px] uppercase">Progress</div>
              <div className="text-sm font-bold text-white">{currentKm} / {ride.distanceKm} km</div>
            </div>
            <div className="h-6 w-px bg-white/15"></div>
            <div>
              <div className="text-white/50 text-[10px] uppercase">Elevation</div>
              <div className="text-sm font-bold text-emerald-400">{currentElevation} m</div>
            </div>
            <div className="h-6 w-px bg-white/15"></div>
            <div>
              <div className="text-white/50 text-[10px] uppercase">Pacing</div>
              <div className="text-sm font-bold text-orange-400">{currentSpeed} km/h</div>
            </div>
          </div>

          {/* Player controls */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/15">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-[#ff7a00] hover:bg-orange-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                aria-label={isPlaying ? 'Pause replay simulation' : 'Play replay simulation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
              </button>

              <button
                onClick={() => { setProgress(0); setIsPlaying(false); }}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Reset simulation"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Timeline Slider */}
            <div className="flex-1 mx-4 flex items-center gap-2">
              <span className="text-[11px] font-mono text-white/60">0 km</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="flex-1 accent-[#ff7a00] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                aria-label="Route position slider"
              />
              <span className="text-[11px] font-mono text-white/60">{ride.distanceKm} km</span>
            </div>

            <span className="text-xs font-semibold text-white/80 hidden sm:inline">
              {progress}% Completed
            </span>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Clock className="w-3.5 h-3.5 text-sky-400" /> Moving Time
            </div>
            <div className="text-xl font-bold text-white mt-1">{ride.movingTime}</div>
            <div className="text-[11px] text-white/40">Total elapsed: 2h 04m</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Gauge className="w-3.5 h-3.5 text-orange-400" /> Avg Speed
            </div>
            <div className="text-xl font-bold text-white mt-1">{ride.avgSpeedKmh} km/h</div>
            <div className="text-[11px] text-white/40">Max: {ride.maxSpeedKmh} km/h</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Elevation Gain
            </div>
            <div className="text-xl font-bold text-white mt-1">+{ride.elevationGainM} m</div>
            <div className="text-[11px] text-white/40">Peak: 754 m summit</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Energy Burn
            </div>
            <div className="text-xl font-bold text-white mt-1">{ride.calories} kcal</div>
            <div className="text-[11px] text-white/40">Norm Power: 268W</div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
