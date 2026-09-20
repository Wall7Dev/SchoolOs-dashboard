import React, { useEffect, useState } from 'react';
import { X, Sparkles, TrendingUp, Heart, Bed, Brain, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { WellnessData, FocusData, SleepData, HeartData } from '../../types';

interface InsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  wellness: WellnessData;
  focus: FocusData;
  sleep: SleepData;
  heart: HeartData;
}

export const InsightsModal: React.FC<InsightsModalProps> = ({
  isOpen,
  onClose,
  wellness,
  focus,
  sleep,
  heart,
}) => {
  const [activeTab, setActiveTab] = useState<'wellness' | 'sleep' | 'focus'>('wellness');

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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="insights-modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-modal w-full max-w-3xl max-h-[85vh] rounded-3xl p-6 sm:p-8 relative z-10 overflow-y-auto text-white flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#ff7a00]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="insights-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                Biometric Insights & Recovery Analysis
              </h2>
              <p className="text-xs text-white/60">
                Holistic Physiological Assessment Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close insights"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('wellness')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'wellness' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/70 hover:text-white'
            }`}
          >
            Wellness & Recovery (Score {wellness.score})
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'sleep' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/70 hover:text-white'
            }`}
          >
            Sleep Restoration ({sleep.durationHours}h {sleep.durationMinutes}m)
          </button>
          <button
            onClick={() => setActiveTab('focus')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'focus' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/70 hover:text-white'
            }`}
          >
            Cognitive Focus (Score {focus.score})
          </button>
        </div>

        {/* Insights Content */}
        {activeTab === 'wellness' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  Physiological Readiness: Prime Window
                </h3>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Your baseline HRV rMSSD is elevated at 74ms (+12% above weekly rolling average). Resting Heart Rate stabilized at {heart.avgRestingBpm} BPM following today's 56.78 km ride. Your autonomic nervous system shows strong parasympathetic dominance, meaning your cardiovascular system is absorbing the training stimulus effectively.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-white/50 uppercase">Resting HR</div>
                <div className="text-xl font-bold text-rose-400 mt-1">{heart.avgRestingBpm} BPM</div>
                <div className="text-[11px] text-white/60">Optimal zone</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-white/50 uppercase">Recovery Parity</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{wellness.recoveryPercentage}%</div>
                <div className="text-[11px] text-white/60">Ready for threshold</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] text-white/50 uppercase">Sleep Average</div>
                <div className="text-xl font-bold text-sky-400 mt-1">{wellness.sleepAvgHours}h</div>
                <div className="text-[11px] text-white/60">7-day baseline</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-200">
              <span className="font-bold">Coach Recommendation:</span> Tomorrow is an ideal day for a low-intensity active recovery spin (&lt;140W) or mobility stretching session to flush lactic accumulation before your weekend long tempo ride.
            </div>
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-2">Sleep Stage Breakdown</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                  <div className="text-[10px] uppercase text-indigo-300">Deep Sleep</div>
                  <div className="text-lg font-bold text-white mt-1">1h 48m</div>
                  <div className="text-[10px] text-white/60">Physical repair</div>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/20">
                  <div className="text-[10px] uppercase text-purple-300">REM Sleep</div>
                  <div className="text-lg font-bold text-white mt-1">2h 12m</div>
                  <div className="text-[10px] text-white/60">Memory consolidation</div>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/20">
                  <div className="text-[10px] uppercase text-blue-300">Light Sleep</div>
                  <div className="text-lg font-bold text-white mt-1">3h 45m</div>
                  <div className="text-[10px] text-white/60">Maintenance</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Your sleep latency was 14 minutes, indicating fast recovery onset. Sleep efficiency scored 92% with 0 disruptive awakenings detected between 01:00 and 06:30.
            </p>
          </div>
        )}

        {activeTab === 'focus' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-1">Deep Work Density</h3>
              <p className="text-xs text-white/70 mb-3">
                Total deep focus hours logged: {focus.deepWorkHours}h with average uninterrupted session of {focus.avgSessionMinutes} minutes.
              </p>
              <div className="flex items-center justify-between text-xs text-white/80 border-t border-white/10 pt-2">
                <span>Peak cognitive clarity: 09:30 AM – 11:45 AM</span>
                <span className="font-bold text-[#ff7a00]">Score {focus.score}/100</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </div>
  );
};
