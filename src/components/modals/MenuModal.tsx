import React, { useState, useEffect } from 'react';
import { X, Wifi, Smartphone, Bluetooth, Compass, Download, Bell, Shield, Sliders } from 'lucide-react';
import { motion } from 'motion/react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: 'km' | 'mi';
  onToggleUnit: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, unit, onToggleUnit }) => {
  const [activeSubTab, setActiveSubTab] = useState<'sensors' | 'preferences' | 'sync'>('sensors');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSyncStrava, setAutoSyncStrava] = useState(true);

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
      aria-labelledby="menu-modal-title"
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
        className="glass-modal w-full max-w-2xl max-h-[85vh] rounded-3xl p-6 sm:p-8 relative z-10 overflow-y-auto text-white flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Sliders className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h2 id="menu-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight">
                Fitup Performance Suite
              </h2>
              <p className="text-xs text-white/60">
                Connected Hardware • Telemetry Engine v4.2
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Local Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10" role="tablist">
          <button
            onClick={() => setActiveSubTab('sensors')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'sensors' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/70 hover:text-white'
            }`}
            role="tab"
            aria-selected={activeSubTab === 'sensors'}
          >
            Connected Devices
          </button>
          <button
            onClick={() => setActiveSubTab('preferences')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'preferences' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/70 hover:text-white'
            }`}
            role="tab"
            aria-selected={activeSubTab === 'preferences'}
          >
            Display & Audio
          </button>
          <button
            onClick={() => setActiveSubTab('sync')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'sync' ? 'bg-white text-slate-900 shadow-sm' : 'text-white/70 hover:text-white'
            }`}
            role="tab"
            aria-selected={activeSubTab === 'sync'}
          >
            Export & Cloud
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4 text-sm">
          {activeSubTab === 'sensors' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center">
                    <Bluetooth className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Wahoo ELEMNT Roam</div>
                    <div className="text-xs text-white/50">Primary Head Unit • Battery 84%</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                    <Bluetooth className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Garmin HRM-Pro Dual</div>
                    <div className="text-xs text-white/50">Chest Strap • 63 BPM live</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Streaming
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                    <Bluetooth className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Quarq DZero Power Meter</div>
                    <div className="text-xs text-white/50">Dual-sided crank sensor</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Calibrated
                </span>
              </div>
            </div>
          )}

          {activeSubTab === 'preferences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-semibold text-white">Distance Measurement Unit</div>
                  <div className="text-xs text-white/50">Toggle between Kilometers and Miles</div>
                </div>
                <button
                  onClick={onToggleUnit}
                  className="px-4 py-1.5 rounded-full bg-[#ff7a00] hover:bg-orange-500 font-bold text-white text-xs transition-colors"
                >
                  {unit.toUpperCase()}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-semibold text-white">Audio Coaching Prompts</div>
                  <div className="text-xs text-white/50">Spoken heart rate zone transitions and split alerts</div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5 accent-[#ff7a00] rounded cursor-pointer"
                  aria-label="Toggle audio prompts"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-semibold text-white">Haptic Telemetry Warnings</div>
                  <div className="text-xs text-white/50">Vibrate on threshold over-power spikes</div>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">Enabled</span>
              </div>
            </div>
          )}

          {activeSubTab === 'sync' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-semibold text-white">Strava Cloud Auto-Sync</div>
                  <div className="text-xs text-white/50">Upload rides automatically upon completion</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoSyncStrava}
                  onChange={(e) => setAutoSyncStrava(e.target.checked)}
                  className="w-5 h-5 accent-[#ff7a00] rounded cursor-pointer"
                  aria-label="Toggle Strava sync"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-white">Download Today's Ride (.FIT / .GPX)</div>
                  <div className="text-xs text-white/50">Full high-frequency sensor telemetry log</div>
                </div>
                <button
                  onClick={() => alert("Today's 56.78 km ride data export generated: fitup-ride-lago-di-como.gpx")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-4 h-4" /> Export GPX
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
