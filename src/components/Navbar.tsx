import React, { useState } from 'react';
import { LayoutGrid, Home, User, Menu, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMenu: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMenu,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 w-full pt-4 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Brand Logo & Main Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Fitup Logo */}
          <button
            onClick={() => setActiveTab('Dashboard')}
            className="flex items-center gap-2 text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg"
            aria-label="Fitup Home"
          >
            <div className="w-7 h-7 rounded-md bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
              {/* Angled arrow icon matching logo in image */}
              <svg 
                className="w-4 h-4 text-white transform -rotate-45" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.8" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-sans lowercase">
              fitup
            </span>
          </button>

          {/* Thin vertical separator line */}
          <span className="text-white/30 text-lg font-light select-none">|</span>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'text-white bg-white/15 backdrop-blur-md shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-current={activeTab === 'home' ? 'page' : undefined}
            >
              <Home className="w-4 h-4" />
              <span>home</span>
            </button>

            <button
              onClick={() => setActiveTab('Dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'Dashboard'
                  ? 'text-white bg-white/20 backdrop-blur-md shadow-sm ring-1 ring-white/20'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-current={activeTab === 'Dashboard' ? 'page' : undefined}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('membership')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'membership'
                  ? 'text-white bg-white/15 backdrop-blur-md shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-current={activeTab === 'membership' ? 'page' : undefined}
            >
              <User className="w-4 h-4" />
              <span>membership</span>
            </button>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Menu Button (Frosted glass pill) */}
          <button
            onClick={onOpenMenu}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-xl border border-white/20 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Open application menu"
          >
            <Menu className="w-4 h-4" />
            <span className="tracking-wide">Menu</span>
          </button>

          {/* Your Profile Button (Solid white pill with dark text) */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 active:bg-slate-200 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="View user profile"
          >
            <User className="w-4 h-4 text-slate-800" />
            <span>Your Profile</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white border border-white/20"
            aria-label="Toggle navigation menu"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 p-3 rounded-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/20 shadow-xl flex flex-col gap-2"
          >
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
                activeTab === 'home' ? 'bg-white/20 text-white font-semibold' : 'text-white/80'
              }`}
            >
              <Home className="w-4 h-4" /> home
            </button>
            <button
              onClick={() => { setActiveTab('Dashboard'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
                activeTab === 'Dashboard' ? 'bg-white/20 text-white font-semibold' : 'text-white/80'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('membership'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
                activeTab === 'membership' ? 'bg-white/20 text-white font-semibold' : 'text-white/80'
              }`}
            >
              <User className="w-4 h-4" /> membership
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
