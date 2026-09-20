export type TimeRange = 'Last 7 days' | 'Today' | 'Last 30 days';

export type MetricCategory = 
  | 'heart' 
  | 'sleep' 
  | 'activity' 
  | 'energy' 
  | 'hydration' 
  | 'mind' 
  | 'vitals';

export type GaugeMetricType = 'Speed' | 'Power' | 'Cadence' | 'Heart Rate' | 'VO2 Max';

export interface ActivityBlock {
  id: string;
  category: 'Browsing' | 'Conversation' | 'Phone';
  startHour: number; // e.g. 9.5 for 09:30
  durationHours: number;
  label: string;
}

export interface ActivityData {
  totalSteps: number;
  timeRange: TimeRange;
  blocks: ActivityBlock[];
}

export interface SleepData {
  durationHours: number;
  durationMinutes: number;
  deltaMinutes: number;
  deltaText: string;
  timeRange: TimeRange;
  trendPoints: { hour: string; value1: number; value2: number }[];
}

export interface HeartDayStat {
  day: 'M' | 'T' | 'W' | 'T' | 'F' | 'S' | 'S';
  fullDay: string;
  restingBpm: number;
  peakBpm: number;
  active: boolean;
}

export interface HeartData {
  avgRestingBpm: number;
  currentBpm: number;
  timeRange: TimeRange;
  days: HeartDayStat[];
}

export interface WellnessData {
  score: number;
  status: string;
  comparisonText: string;
  sleepAvgHours: number;
  recoveryPercentage: number;
}

export interface FocusData {
  score: number;
  deepWorkHours: number;
  avgSessionMinutes: number;
  waveformBars: { height: number; active: boolean; label?: string }[];
}

export interface EnergyRecoveryState {
  currentCategory: MetricCategory;
  metricType: GaugeMetricType;
  gaugePercentage: number;
  title: string;
  subtitle: string;
}

export interface RouteCheckpoint {
  id: string;
  km: number;
  name: string;
  elevation: number;
  avgSpeed: number;
}

export interface RideDetails {
  distanceKm: number;
  distanceMiles: number;
  unit: 'km' | 'mi';
  date: string;
  loopName: string;
  movingTime: string;
  avgSpeedKmh: number;
  maxSpeedKmh: number;
  elevationGainM: number;
  calories: number;
  checkpoints: RouteCheckpoint[];
}
