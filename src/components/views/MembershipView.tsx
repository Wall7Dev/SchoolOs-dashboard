import React from 'react';
import { ShieldCheck, Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface MembershipViewProps {
  onGoToDashboard: () => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onGoToDashboard }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[1200px] mx-auto py-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
            <Sparkles className="w-3.5 h-3.5" /> Fitup Pro Athletic Tier
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Membership & Telemetry Tier
          </h2>
          <p className="text-sm text-white/60">
            Active Subscription: Fitup Pro Team License • Renews Oct 2026
          </p>
        </div>
        <button
          onClick={onGoToDashboard}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff7a00] hover:bg-orange-500 font-bold text-white text-xs transition-transform active:scale-95 shadow-lg shadow-orange-500/30"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Active Plan */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 border-orange-500/40 relative overflow-hidden">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#ff7a00] text-[10px] font-bold tracking-wider uppercase text-white shadow-md">
            Active Plan
          </div>

          <div>
            <div className="text-sm font-semibold text-white/70">PRO ATHLETE TIER</div>
            <div className="text-4xl font-extrabold text-white mt-1">€14.99 <span className="text-sm font-normal text-white/50">/ month</span></div>
            <p className="text-xs text-white/60 mt-2">
              Full uncompressed high-frequency telemetry, biometric cloud archival, and AI recovery modeling.
            </p>

            <div className="space-y-2.5 mt-6 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unlimited 10Hz GPS route logging & replay simulation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Dual-wave sleep architecture & HRV autonomic balance</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Real-time Wahoo / Garmin / Strava automated sensor bridge</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Cognitive focus work spectrum with session equalizers</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Payment Method: Apple Pay (•••• 8912)</span>
            <span className="text-emerald-400 font-semibold">Active</span>
          </div>
        </div>

        {/* Team & Coach Integration */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-sm font-semibold text-white/70">PELOTON SQUAD ACCESS</div>
            <div className="text-2xl font-bold text-white mt-1">Lombardia Racing Club</div>
            <p className="text-xs text-white/60 mt-2">
              Shared squad telemetry, live pace drafting leaderboards, and direct coach telemetry review.
            </p>

            <div className="space-y-3 mt-6">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Head Coach: Marco Vianello</div>
                  <div className="text-[10px] text-white/50">Next 1-on-1 review: Friday 17:00</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                  Scheduled
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Lactate Threshold Lab Test</div>
                  <div className="text-[10px] text-white/50">Target: 300W FTP Calibration</div>
                </div>
                <span className="text-white/60 text-[10px]">Nov 2026</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Insurance & Medical Telemetry Release Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
