import {
  ActivityData,
  SleepData,
  HeartData,
  WellnessData,
  FocusData,
  EnergyRecoveryState,
  RideDetails,
  MetricCategory,
  GaugeMetricType
} from '../types';

export const initialRideData: RideDetails = {
  distanceKm: 56.78,
  distanceMiles: 35.28,
  unit: 'km',
  date: 'Today, 08:30 AM',
  loopName: '56.78 km Loop',
  movingTime: '1h 52m',
  avgSpeedKmh: 30.4,
  maxSpeedKmh: 54.2,
  elevationGainM: 685,
  calories: 1420,
  checkpoints: [
    { id: '1', km: 0, name: 'Lakehead Marina Start', elevation: 198, avgSpeed: 28.5 },
    { id: '2', km: 14.2, name: 'Bellagio Hill Climb', elevation: 512, avgSpeed: 22.1 },
    { id: '3', km: 28.5, name: 'Passo del Ghisallo Summit', elevation: 754, avgSpeed: 19.8 },
    { id: '4', km: 41.0, name: 'Menaggio Lakeside Descent', elevation: 215, avgSpeed: 44.6 },
    { id: '5', km: 56.78, name: 'Como Promenade Finish', elevation: 202, avgSpeed: 34.0 },
  ],
};

export const initialActivityData: ActivityData = {
  totalSteps: 19840,
  timeRange: 'Last 7 days',
  blocks: [
    // Browsing row (top)
    { id: 'b1', category: 'Browsing', startHour: 15.0, durationHours: 0.8, label: 'Route analysis' },
    { id: 'b2', category: 'Browsing', startHour: 16.2, durationHours: 0.7, label: 'Gear inspection' },
    { id: 'b3', category: 'Browsing', startHour: 19.8, durationHours: 1.0, label: 'Cadence reports' },
    
    // Conversation row (middle)
    { id: 'c1', category: 'Conversation', startHour: 10.2, durationHours: 0.6, label: 'Peloton team chat' },
    { id: 'c2', category: 'Conversation', startHour: 14.5, durationHours: 0.5, label: 'Coach sync' },
    { id: 'c3', category: 'Conversation', startHour: 16.8, durationHours: 0.7, label: 'Post-ride recovery call' },
    { id: 'c4', category: 'Conversation', startHour: 18.2, durationHours: 0.9, label: 'Ride briefing' },

    // Phone row (bottom)
    { id: 'p1', category: 'Phone', startHour: 9.2, durationHours: 0.5, label: 'Sensor pair check' },
    { id: 'p2', category: 'Phone', startHour: 10.8, durationHours: 0.7, label: 'Navigation prompt' },
    { id: 'p3', category: 'Phone', startHour: 13.0, durationHours: 0.6, label: 'Music control' },
    { id: 'p4', category: 'Phone', startHour: 17.5, durationHours: 0.8, label: 'Sync Strava' },
    { id: 'p5', category: 'Phone', startHour: 19.3, durationHours: 0.8, label: 'Night review' },
    { id: 'p6', category: 'Phone', startHour: 20.6, durationHours: 0.9, label: 'Hydration reminder' },
  ],
};

export const initialSleepData: SleepData = {
  durationHours: 7,
  durationMinutes: 45,
  deltaMinutes: 1.8,
  deltaText: '+1.8m from last week',
  timeRange: 'Last 7 days',
  trendPoints: [
    { hour: '08', value1: 0.6, value2: 0.3 },
    { hour: '10', value1: 0.8, value2: 0.4 },
    { hour: '12', value1: 1.2, value2: 0.9 },
    { hour: '14', value1: 2.1, value2: 1.6 },
    { hour: '16', value1: 3.4, value2: 2.9 },
    { hour: '18', value1: 3.8, value2: 3.2 },
    { hour: '20', value1: 3.9, value2: 3.3 },
    { hour: '22', value1: 4.0, value2: 3.3 },
  ],
};

export const initialHeartData: HeartData = {
  avgRestingBpm: 63,
  currentBpm: 68,
  timeRange: 'Last 7 days',
  days: [
    { day: 'M', fullDay: 'Monday', restingBpm: 64, peakBpm: 158, active: true },
    { day: 'T', fullDay: 'Tuesday', restingBpm: 62, peakBpm: 165, active: true },
    { day: 'W', fullDay: 'Wednesday', restingBpm: 65, peakBpm: 172, active: true },
    { day: 'T', fullDay: 'Thursday', restingBpm: 63, peakBpm: 160, active: true },
    { day: 'F', fullDay: 'Friday', restingBpm: 61, peakBpm: 155, active: true },
    { day: 'S', fullDay: 'Saturday', restingBpm: 66, peakBpm: 184, active: true },
    { day: 'S', fullDay: 'Sunday', restingBpm: 63, peakBpm: 179, active: true },
  ],
};

export const initialWellnessData: WellnessData = {
  score: 87,
  status: 'Good Condition',
  comparisonText: '+5 vs weekly average York',
  sleepAvgHours: 7.2,
  recoveryPercentage: 82,
};

export const initialFocusData: FocusData = {
  score: 73,
  deepWorkHours: 14.5,
  avgSessionMinutes: 42,
  // 36 bars representing interval waveform
  waveformBars: [
    { height: 18, active: false },
    { height: 24, active: false },
    { height: 16, active: false },
    { height: 30, active: false },
    { height: 22, active: false },
    { height: 36, active: false },
    { height: 28, active: false },
    { height: 42, active: false },
    { height: 35, active: false },
    { height: 48, active: false },
    { height: 40, active: false },
    { height: 55, active: false },
    { height: 46, active: false },
    { height: 60, active: false },
    { height: 52, active: false },
    // Glowing active session (orange)
    { height: 85, active: true, label: 'Morning interval focus' },
    { height: 75, active: true, label: 'Climb pacing session' },
    { height: 92, active: true, label: 'Sprint power threshold' },
    { height: 68, active: true, label: 'Aerodynamic draft drill' },
    // Tail
    { height: 50, active: false },
    { height: 42, active: false },
    { height: 36, active: false },
    { height: 40, active: false },
    { height: 32, active: false },
    { height: 28, active: false },
    { height: 34, active: false },
    { height: 26, active: false },
    { height: 20, active: false },
    { height: 24, active: false },
    { height: 18, active: false },
    { height: 14, active: false },
    { height: 18, active: false },
    { height: 12, active: false },
    { height: 10, active: false },
    { height: 8, active: false },
  ],
};

export const categoryProfiles: Record<MetricCategory, {
  name: string;
  defaultMetric: GaugeMetricType;
  gaugePercentage: number;
  title: string;
  subtitle: string;
  unit: string;
  value: string;
}> = {
  heart: {
    name: 'Cardiovascular Index',
    defaultMetric: 'Heart Rate',
    gaugePercentage: 50,
    title: 'Balanced Energy & Recovery State',
    subtitle: 'Overall Health Stability Index',
    unit: 'BPM',
    value: '63'
  },
  sleep: {
    name: 'Sleep Architecture',
    defaultMetric: 'VO2 Max',
    gaugePercentage: 78,
    title: 'Optimal REM & Deep Restoration',
    subtitle: 'Restorative Sleep Efficiency Score',
    unit: 'Score',
    value: '91'
  },
  activity: {
    name: 'Daily Caloric Expenditure',
    defaultMetric: 'Speed',
    gaugePercentage: 65,
    title: 'High Performance Aerobic Output',
    subtitle: 'Metabolic Pacing Equilibrium',
    unit: 'km/h',
    value: '30.4'
  },
  energy: {
    name: 'Glycogen & Power Reserves',
    defaultMetric: 'Power',
    gaugePercentage: 82,
    title: 'Dynamic Strain & Battery Level',
    subtitle: 'Endurance Sustainability Index',
    unit: 'Watts',
    value: '245'
  },
  hydration: {
    name: 'Electrolyte Balance',
    defaultMetric: 'Speed',
    gaugePercentage: 70,
    title: 'Hydration & Sweat Rate Parity',
    subtitle: 'Fluid Retention & Cellular Hydration',
    unit: 'Liters',
    value: '2.4'
  },
  mind: {
    name: 'Cognitive Stress Load',
    defaultMetric: 'Cadence',
    gaugePercentage: 58,
    title: 'Focused Nervous System Balance',
    subtitle: 'HRV Autonomic Sympathetic Ratio',
    unit: 'RPM',
    value: '88'
  },
  vitals: {
    name: 'Systemic Health Vitals',
    defaultMetric: 'VO2 Max',
    gaugePercentage: 88,
    title: 'Peak Biometric Equilibrium',
    subtitle: 'Cardiopulmonary Fitness Benchmark',
    unit: 'mL/kg',
    value: '58.4'
  }
};
