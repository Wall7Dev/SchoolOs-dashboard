import React, { useEffect } from 'react';
import { X, Award, Zap, Heart, Activity, User, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
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
      aria-labelledby="profile-modal-title"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-modal w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 sm:p-8 relative z-10 overflow-y-auto text-white flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-300 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                <User className="w-7 h-7 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="profile-modal-title" className="text-2xl font-bold tracking-tight">
                  Elena Rostova
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ff7a00]/20 text-[#ff7a00] border border-orange-500/30">
                  PRO-AM
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Elite Endurance Cyclist • Lombardia Peloton Squad • Member since 2023
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close profile dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Biometric Benchmarks Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-[10px] uppercase font-bold text-white/50">Functional Threshold (FTP)</div>
            <div className="text-2xl font-extrabold text-[#ff7a00] mt-1">285 W</div>
            <div className="text-[11px] text-white/60">4.6 W/kg</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-[10px] uppercase font-bold text-white/50">VO2 Max</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">58.4</div>
            <div className="text-[11px] text-white/60">Top 2% in age class</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-[10px] uppercase font-bold text-white/50">Max / Rest HR</div>
            <div className="text-2xl font-extrabold text-rose-400 mt-1">192 / 42</div>
            <div className="text-[11px] text-white/60">BPM span</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-[10px] uppercase font-bold text-white/50">Season Volume</div>
            <div className="text-2xl font-extrabold text-sky-400 mt-1">4,892</div>
            <div className="text-[11px] text-white/60">km logged YTD</div>
          </div>
        </div>

        {/* Power Training Zones */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
            7-Zone Power Distribution Matrix
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Z1 Active Recovery (&lt;155W)</span>
              <span className="font-mono text-white/90">18% time</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-sky-400 w-[18%]"></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-white/70">Z2 Endurance / Aerobic (156–215W)</span>
              <span className="font-mono text-white/90">42% time</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-400 w-[42%]"></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-white/70">Z3 Tempo & Sweetspot (216–255W)</span>
              <span className="font-mono text-white/90">24% time</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-amber-400 w-[24%]"></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-white/70">Z4 Threshold & VO2 (256–340W)</span>
              <span className="font-mono text-white/90">16% time</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#ff7a00] w-[16%]"></div>
            </div>
          </div>
        </div>

        {/* Verified Athlete Badge */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Biometric Sensor Telemetry Encrypted & HIPAA/GDPR Verified</span>
          </div>
          <span className="font-bold text-emerald-400">Sync Active</span>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
