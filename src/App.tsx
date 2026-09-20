import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ActivityCard } from './components/cards/ActivityCard';
import { SleepCard } from './components/cards/SleepCard';
import { HeartCard } from './components/cards/HeartCard';
import { WellnessCard } from './components/cards/WellnessCard';
import { FocusCard } from './components/cards/FocusCard';
import { EnergyRecoveryCard } from './components/cards/EnergyRecoveryCard';
import { RouteModal } from './components/modals/RouteModal';
import { MenuModal } from './components/modals/MenuModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { InsightsModal } from './components/modals/InsightsModal';
import { HomeView } from './components/views/HomeView';
import { MembershipView } from './components/views/MembershipView';
import {
  initialRideData,
  initialActivityData,
  initialSleepData,
  initialHeartData,
  initialWellnessData,
  initialFocusData,
} from './data/mockData';
import { TimeRange, MetricCategory } from './types';

export default function App() {
  // Navigation & Modal State
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  // Telemetry state
  const [ride, setRide] = useState(initialRideData);
  const [activity, setActivity] = useState(initialActivityData);
  const [sleep, setSleep] = useState(initialSleepData);
  const [heart, setHeart] = useState(initialHeartData);
  const [wellness, setWellness] = useState(initialWellnessData);
  const [focus, setFocus] = useState(initialFocusData);

  // Toggle units: km <-> mi
  const handleToggleUnit = () => {
    setRide((prev) => ({
      ...prev,
      unit: prev.unit === 'km' ? 'mi' : 'km',
    }));
  };

  // Time-range handlers
  const handleActivityRangeChange = (range: TimeRange) => {
    setActivity((prev) => ({
      ...prev,
      timeRange: range,
      totalSteps: range === 'Today' ? 14220 : range === 'Last 30 days' ? 84200 : 19840,
    }));
  };

  const handleSleepRangeChange = (range: TimeRange) => {
    setSleep((prev) => ({
      ...prev,
      timeRange: range,
    }));
  };

  const handleHeartRangeChange = (range: TimeRange) => {
    setHeart((prev) => ({
      ...prev,
      timeRange: range,
    }));
  };

  const handleOpenInsights = () => {
    setIsInsightsOpen(true);
  };

  // Keyboard navigation shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        setIsMenuOpen((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        setIsRouteModalOpen((prev) => !prev);
      } else if (e.key === 'p' || e.key === 'P') {
        setIsProfileOpen((prev) => !prev);
      } else if (e.key === 'i' || e.key === 'I') {
        setIsInsightsOpen((prev) => !prev);
      } else if (e.key === 'u' || e.key === 'U') {
        handleToggleUnit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-[#0b1329] text-white flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* Accessibility Skip Link */}
      <a 
        href="#main-dashboard-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:font-bold focus:rounded-lg focus:shadow-xl"
      >
        Skip to main content
      </a>

      {/* =========================================================================
          BACKGROUND LAYER:
          Atmospheric outdoor sports environment matching the cyclist in the image.
          Crisp natural daytime lighting, open blue sky, road horizon.
          ========================================================================= */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden" 
        aria-hidden="true"
      >
        {/* Background Cyclist Photo with high fidelity rendering */}
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=2560&auto=format&fit=crop"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[65%_25%] md:object-[60%_30%] opacity-85 transform scale-105"
        />

        {/* Sky Color Grading Gradient matching DASHBOARDins.png */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3b82c4]/45 via-transparent to-[#0a1128]/85 mix-blend-multiply" />
        
        {/* Soft Vignette and Glass Depth Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091124] via-[#091124]/40 to-transparent" />
        
        {/* Upper Daylight Ambience */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#60a5fa]/30 to-transparent" />
      </div>

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main 
        id="main-dashboard-content"
        className="relative z-10 flex-1 flex flex-col justify-between max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-2 sm:py-4"
      >
        {activeTab === 'home' ? (
          <HomeView 
            onGoToDashboard={() => setActiveTab('Dashboard')}
            onOpenRoute={() => setIsRouteModalOpen(true)}
          />
        ) : activeTab === 'membership' ? (
          <MembershipView 
            onGoToDashboard={() => setActiveTab('Dashboard')}
          />
        ) : (
          <>
            {/* Primary Hero Section: Route Card + Big Typography + Action Bar */}
            <HeroSection
              ride={ride}
              onToggleUnit={handleToggleUnit}
              onOpenRouteModal={() => setIsRouteModalOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenMenu={() => setIsMenuOpen(true)}
              onGoHome={() => setActiveTab('Dashboard')}
            />

            {/* =========================================================================
                DASHBOARD TELEMETRY BENTO GRID:
                Matches DASHBOARDins.png layout with precision:
                - Left area (3 cols):
                    * Row 1: Activity, Sleep, Heart (3 cards)
                    * Row 2: Wellness Score, Focus Activity (2 wide cards)
                - Right area (1 col):
                    * Balanced Energy & Recovery State (Tall Card spanning both rows)
                ========================================================================= */}
            <section 
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 mt-4 sm:mt-6 mb-4 items-stretch"
              aria-label="Performance and Biometric Telemetry"
            >
              {/* Left Area (Spans 8 or 9 columns on wide screens) */}
              <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4 lg:gap-5">
                
                {/* Top Sub-Row: 3 Cards (Activity, Sleep, Heart) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
                  {/* Card 1: Activity */}
                  <ActivityCard
                    data={activity}
                    onRangeChange={handleActivityRangeChange}
                    onOpenDetails={() => setIsInsightsOpen(true)}
                  />

                  {/* Card 2: Sleep */}
                  <SleepCard
                    data={sleep}
                    onRangeChange={handleSleepRangeChange}
                  />

                  {/* Card 3: Heart */}
                  <HeartCard
                    data={heart}
                    onRangeChange={handleHeartRangeChange}
                  />
                </div>

                {/* Bottom Sub-Row: 2 Wide Cards (Wellness Score, Focus Activity) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                  {/* Card 4: Wellness Score */}
                  <WellnessCard
                    data={wellness}
                    onOpenInsights={handleOpenInsights}
                  />

                  {/* Card 5: Focus Activity */}
                  <FocusCard
                    data={focus}
                    onOpenInsights={handleOpenInsights}
                  />
                </div>

              </div>

              {/* Right Area: Card 6: Balanced Energy & Recovery State Gauge (Tall Card) */}
              <div className="lg:col-span-4 xl:col-span-3 flex flex-col">
                <EnergyRecoveryCard
                  onOpenDetails={(cat) => {
                    // Clicking category tabs dynamically syncs context
                  }}
                />
              </div>
            </section>
          </>
        )}

      </main>

      {/* Global Interactive Glassmorphic Modals */}
      <RouteModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        ride={ride}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        unit={ride.unit}
        onToggleUnit={handleToggleUnit}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <InsightsModal
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
        wellness={wellness}
        focus={focus}
        sleep={sleep}
        heart={heart}
      />

      {/* Subtle Bottom Status Bar for screen reader live updates and keyboard quick-help */}
      <footer className="relative z-10 w-full py-2 px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-2">
          <span>Fitup Athletic Telemetry System • Live Sensor Telemetry Active</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="hover:text-white/80 transition-colors focus:outline-none focus-visible:underline"
            >
              Sensors & Settings (M)
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsRouteModalOpen(true)}
              className="hover:text-white/80 transition-colors focus:outline-none focus-visible:underline"
            >
              GPS Route Trace (R)
            </button>
            <span>•</span>
            <button 
              onClick={handleToggleUnit}
              className="hover:text-white/80 transition-colors focus:outline-none focus-visible:underline"
            >
              Unit: {ride.unit}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
