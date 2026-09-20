import React from 'react';
import { Calendar, Trophy, Users, ArrowRight, Play, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onGoToDashboard: () => void;
  onOpenRoute: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onGoToDashboard, onOpenRoute }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1400px] mx-auto py-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Athlete Activity Feed
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Upcoming peloton rides, training blocks, and local Lombardia segments
          </p>
        </div>
        <button
          onClick={onGoToDashboard}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff7a00] hover:bg-orange-500 font-bold text-white text-xs transition-transform active:scale-95 shadow-lg shadow-orange-500/30"
        >
          <span>Live Telemetry Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Today's Highlight */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-orange-400 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> Stage Complete
              </span>
              <span>Today 08:30 AM</span>
            </div>
            <h3 className="text-xl font-bold text-white">56.78 km Lago di Como Loop</h3>
            <p className="text-xs text-white/60 mt-1">
              Completed in 1h 52m with 685m elevation gain. 87 Wellness score recorded.
            </p>
          </div>
          <button
            onClick={onOpenRoute}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-white" /> Inspect GPS Replay
          </button>
        </div>

        {/* Next Scheduled Ride */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-sky-400 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Tomorrow, 07:00 AM
              </span>
              <span>Zone 2 Recovery</span>
            </div>
            <h3 className="text-xl font-bold text-white">Valtellina Sunrise Spin</h3>
            <p className="text-xs text-white/60 mt-1">
              Planned 35.0 km endurance session. Target cadence 90 RPM, power limit 160W.
            </p>
          </div>
          <div className="mt-4 px-3 py-2 rounded-xl bg-white/5 text-xs text-white/70 border border-white/10">
            Coach Note: Keep heart rate below 135 BPM to maintain aerobic base.
          </div>
        </div>

        {/* Squad Leaderboard */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Peloton Ranking
              </span>
              <span>Lombardia Squad</span>
            </div>
            <h3 className="text-xl font-bold text-white">#2 This Week</h3>
            <p className="text-xs text-white/60 mt-1">
              248.5 km logged across 4 rides. Top 3% climbing consistency index.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/10">
            <span>Next Target: +24 km to #1</span>
            <span className="font-bold text-emerald-400">98.4 Pts</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
