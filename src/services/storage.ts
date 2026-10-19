import {
  AppDataBackup,
  Biometrics,
  Exercise,
  TAFEditalGoal,
  WorkoutDay,
  WorkoutSessionLog,
} from '../types';

const STORAGE_KEYS = {
  EXERCISES: 'taf_exercises_v1',
  WORKOUT_DAYS: 'taf_workout_days_v1',
  HISTORY_LOGS: 'taf_history_logs_v1',
  BIOMETRICS: 'taf_biometrics_v1',
  EDITAL_GOALS: 'taf_edital_goals_v1',
  STREAK: 'taf_streak_v1',
  SELECTED_DAY: 'taf_selected_day_v1',
};

// Seed default exercises
export const DEFAULT_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Flexão Inclinada',
    category: 'Membros Superiores',
    metricType: 'reps',
    targetSets: 3,
    targetReps: 8,
    unitLabel: 'reps',
    defaultRestSeconds: 45,
    muscleGroup: 'Peitoral & Tríceps',
    focusType: 'forca',
    iconName: 'fitness_center',
    personalRecord: {
      value: 18,
      unit: 'reps',
      achievedAt: '21 de Outubro',
      deltaVsPreviousMonth: '+4 reps vs mês anterior',
    },
    monthlyVolume: 142,
    monthlyGrowthPercent: 35,
    tafTarget: {
      value: 24,
      description: 'Solo contínuo (TAF Bombeiros)',
    },
  },
  {
    id: 'ex-2',
    name: 'Abdominal Remador',
    category: 'Core / Abdômen',
    metricType: 'reps',
    targetSets: 3,
    targetReps: 10,
    unitLabel: 'reps',
    defaultRestSeconds: 45,
    muscleGroup: 'Abdômen Total',
    focusType: 'resistencia',
    iconName: 'self_improvement',
    personalRecord: {
      value: 32,
      unit: 'reps',
      achievedAt: '19 de Outubro',
      deltaVsPreviousMonth: '+5 reps vs mês anterior',
    },
    monthlyVolume: 180,
    monthlyGrowthPercent: 28,
    tafTarget: {
      value: 35,
      description: 'Tempo limite: 60s',
    },
  },
  {
    id: 'ex-3',
    name: 'Prancha',
    category: 'Core / Abdômen',
    metricType: 'time',
    targetSets: 3,
    targetReps: 20,
    unitLabel: 'seg',
    defaultRestSeconds: 30,
    muscleGroup: 'Core & Estabilidade',
    focusType: 'resistencia',
    iconName: 'sports_gymnastics',
    personalRecord: {
      value: 45,
      unit: 'seg',
      achievedAt: '18 de Outubro',
      deltaVsPreviousMonth: '+15 seg vs mês anterior',
    },
    monthlyVolume: 90,
    monthlyGrowthPercent: 20,
    tafTarget: {
      value: 60,
      description: 'Isometria de tronco',
    },
  },
  {
    id: 'ex-4',
    name: 'Barra Fixa',
    category: 'Membros Superiores',
    metricType: 'reps',
    targetSets: 3,
    targetReps: 3,
    unitLabel: 'reps',
    defaultRestSeconds: 60,
    muscleGroup: 'Dorsais & Bíceps',
    focusType: 'forca',
    iconName: 'accessibility_new',
    personalRecord: {
      value: 4,
      unit: 'reps',
      achievedAt: '15 de Outubro',
      deltaVsPreviousMonth: '+1 rep vs mês anterior',
    },
    monthlyVolume: 36,
    monthlyGrowthPercent: 25,
    tafTarget: {
      value: 3,
      description: 'Pegada pronação estrita',
    },
  },
  {
    id: 'ex-5',
    name: 'Corrida 12 min',
    category: 'Resistência Aeróbica',
    metricType: 'distance',
    targetSets: 1,
    targetReps: 2000,
    unitLabel: 'm',
    defaultRestSeconds: 120,
    muscleGroup: 'Cardiorrespiratório',
    focusType: 'resistencia',
    iconName: 'directions_run',
    personalRecord: {
      value: 1800,
      unit: 'm',
      achievedAt: '17 de Outubro',
      deltaVsPreviousMonth: '+200m vs mês anterior',
    },
    monthlyVolume: 7200,
    monthlyGrowthPercent: 18,
    tafTarget: {
      value: 2200,
      description: 'Pista regulamentar (12 min)',
    },
  },
];

// Default days around today (Wednesday, Oct 24)
export const DEFAULT_WORKOUT_DAYS: WorkoutDay[] = [
  {
    date: '2026-10-22',
    dayLabel: 'Seg',
    dayNumber: 22,
    monthLabel: 'Outubro',
    sessionNumber: 26,
    estimatedMinutes: 20,
    estimatedKcal: 155,
    exerciseIds: ['ex-1', 'ex-2', 'ex-3'],
    completedExerciseIds: ['ex-1', 'ex-2', 'ex-3'],
  },
  {
    date: '2026-10-23',
    dayLabel: 'Ter',
    dayNumber: 23,
    monthLabel: 'Outubro',
    sessionNumber: 27,
    estimatedMinutes: 22,
    estimatedKcal: 170,
    exerciseIds: ['ex-4', 'ex-5'],
    completedExerciseIds: ['ex-4', 'ex-5'],
  },
  {
    date: '2026-10-24',
    dayLabel: 'Qua',
    dayNumber: 24,
    monthLabel: 'Outubro',
    sessionNumber: 28,
    estimatedMinutes: 18,
    estimatedKcal: 142,
    exerciseIds: ['ex-1', 'ex-2', 'ex-3'],
    completedExerciseIds: ['ex-1'], // 1 of 3 finished
    isToday: true,
  },
  {
    date: '2026-10-25',
    dayLabel: 'Qui',
    dayNumber: 25,
    monthLabel: 'Outubro',
    sessionNumber: 29,
    estimatedMinutes: 25,
    estimatedKcal: 190,
    exerciseIds: ['ex-4', 'ex-5', 'ex-2'],
    completedExerciseIds: [],
  },
  {
    date: '2026-10-26',
    dayLabel: 'Sex',
    dayNumber: 26,
    monthLabel: 'Outubro',
    sessionNumber: 30,
    estimatedMinutes: 20,
    estimatedKcal: 150,
    exerciseIds: ['ex-1', 'ex-3'],
    completedExerciseIds: [],
  },
];

// Default Edital Goals for Corpo de Bombeiros Militar
export const DEFAULT_EDITAL_GOALS: TAFEditalGoal[] = [
  {
    id: 'goal-1',
    exerciseName: 'Flexões mínimas',
    requirementDescription: 'Solo contínuo',
    targetValue: 24,
    unit: 'reps',
    category: 'Membros Superiores',
    iconName: 'fitness_center',
  },
  {
    id: 'goal-2',
    exerciseName: 'Barra fixa',
    requirementDescription: 'Pegada pronação estrita',
    targetValue: 3,
    unit: 'reps',
    category: 'Membros Superiores',
    iconName: 'accessibility_new',
  },
  {
    id: 'goal-3',
    exerciseName: 'Corrida 12 min',
    requirementDescription: 'Pista regulamentar',
    targetValue: 2200,
    unit: 'm',
    category: 'Resistência Aeróbica',
    iconName: 'directions_run',
    timeLimitSeconds: 720,
  },
  {
    id: 'goal-4',
    exerciseName: 'Abdominal Remador',
    requirementDescription: 'Tempo limite: 60s',
    targetValue: 35,
    unit: 'reps',
    category: 'Core / Abdômen',
    iconName: 'sports_gymnastics',
    timeLimitSeconds: 60,
  },
  {
    id: 'goal-5',
    exerciseName: 'Natação 50 metros',
    requirementDescription: 'Piscina semiolímpica (estilo livre)',
    targetValue: 60,
    unit: 'seg',
    category: 'Resistência Aeróbica',
    iconName: 'pool',
    timeLimitSeconds: 60,
  },
];

export const DEFAULT_BIOMETRICS: Biometrics = {
  weightKg: 78.4,
  heightM: 1.78,
  lastUpdated: 'Hoje',
};

export const DEFAULT_HISTORY_LOGS: WorkoutSessionLog[] = [
  {
    id: 'log-1',
    date: '2026-10-24',
    exerciseId: 'ex-1',
    exerciseName: 'Flexão Inclinada',
    sets: [
      { setNumber: 1, repsOrValue: 8, weightExtraKg: 0, rpe: 7, restSeconds: 45 },
      { setNumber: 2, repsOrValue: 8, weightExtraKg: 0, rpe: 7, restSeconds: 45 },
      { setNumber: 3, repsOrValue: 7, weightExtraKg: 0, rpe: 8, restSeconds: 45 },
    ],
    completedAt: 'Hoje, 24 Out',
    notes: '3 séries executadas • Carga: Peso corporal',
  },
  {
    id: 'log-2',
    date: '2026-10-16',
    exerciseId: 'ex-1',
    exerciseName: 'Flexão Inclinada',
    sets: [
      { setNumber: 1, repsOrValue: 7, weightExtraKg: 0, rpe: 8, restSeconds: 45 },
      { setNumber: 2, repsOrValue: 7, weightExtraKg: 0, rpe: 8, restSeconds: 45 },
      { setNumber: 3, repsOrValue: 6, weightExtraKg: 0, rpe: 8.5, restSeconds: 45 },
    ],
    completedAt: '16 Out',
    notes: 'RPE 8.0 • Cadência controlada',
  },
  {
    id: 'log-3',
    date: '2026-10-14',
    exerciseId: 'ex-1',
    exerciseName: 'Flexão Inclinada',
    sets: [
      { setNumber: 1, repsOrValue: 6, weightExtraKg: 0, rpe: 7.5, restSeconds: 45 },
      { setNumber: 2, repsOrValue: 6, weightExtraKg: 0, rpe: 7.5, restSeconds: 45 },
      { setNumber: 3, repsOrValue: 6, weightExtraKg: 0, rpe: 8, restSeconds: 45 },
    ],
    completedAt: '14 Out',
    notes: 'RPE 7.5 • Aquecimento dinâmico',
  },
];

// Helper to get from localStorage with fallback
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

// Helper to set in localStorage
function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export const StorageService = {
  getExercises(): Exercise[] {
    const list = getLocalItem<Exercise[]>(STORAGE_KEYS.EXERCISES, DEFAULT_EXERCISES);
    return list.map((ex) => {
      if (!ex.focusType) {
        const isResistencia =
          ex.category === 'Resistência Aeróbica' ||
          ex.metricType === 'time' ||
          ex.metricType === 'distance' ||
          ex.name.toLowerCase().includes('prancha') ||
          ex.name.toLowerCase().includes('remador') ||
          ex.name.toLowerCase().includes('corrida') ||
          ex.name.toLowerCase().includes('natação');
        return {
          ...ex,
          focusType: isResistencia ? 'resistencia' : 'forca',
        };
      }
      return ex;
    });
  },

  saveExercises(exercises: Exercise[]): void {
    setLocalItem(STORAGE_KEYS.EXERCISES, exercises);
  },

  getWorkoutDays(): WorkoutDay[] {
    return getLocalItem<WorkoutDay[]>(STORAGE_KEYS.WORKOUT_DAYS, DEFAULT_WORKOUT_DAYS);
  },

  saveWorkoutDays(days: WorkoutDay[]): void {
    setLocalItem(STORAGE_KEYS.WORKOUT_DAYS, days);
  },

  getHistoryLogs(): WorkoutSessionLog[] {
    return getLocalItem<WorkoutSessionLog[]>(STORAGE_KEYS.HISTORY_LOGS, DEFAULT_HISTORY_LOGS);
  },

  addHistoryLog(log: WorkoutSessionLog): void {
    const logs = this.getHistoryLogs();
    logs.unshift(log);
    setLocalItem(STORAGE_KEYS.HISTORY_LOGS, logs);
  },

  getBiometrics(): Biometrics {
    return getLocalItem<Biometrics>(STORAGE_KEYS.BIOMETRICS, DEFAULT_BIOMETRICS);
  },

  saveBiometrics(bio: Biometrics): void {
    setLocalItem(STORAGE_KEYS.BIOMETRICS, bio);
  },

  getEditalGoals(): TAFEditalGoal[] {
    return getLocalItem<TAFEditalGoal[]>(STORAGE_KEYS.EDITAL_GOALS, DEFAULT_EDITAL_GOALS);
  },

  saveEditalGoals(goals: TAFEditalGoal[]): void {
    setLocalItem(STORAGE_KEYS.EDITAL_GOALS, goals);
  },

  getStreakDays(): number {
    return getLocalItem<number>(STORAGE_KEYS.STREAK, 4);
  },

  saveStreakDays(streak: number): void {
    setLocalItem(STORAGE_KEYS.STREAK, streak);
  },

  exportBackup(): void {
    const data: AppDataBackup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      exercises: this.getExercises(),
      workoutDays: this.getWorkoutDays(),
      historyLogs: this.getHistoryLogs(),
      biometrics: this.getBiometrics(),
      editalGoals: this.getEditalGoals(),
      streakDays: this.getStreakDays(),
      weeklyTarget: { done: 3, total: 4 },
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `taf-training-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as AppDataBackup;
      if (!parsed.exercises || !parsed.workoutDays) {
        throw new Error('Arquivo de backup inválido');
      }
      if (parsed.exercises) this.saveExercises(parsed.exercises);
      if (parsed.workoutDays) this.saveWorkoutDays(parsed.workoutDays);
      if (parsed.historyLogs) setLocalItem(STORAGE_KEYS.HISTORY_LOGS, parsed.historyLogs);
      if (parsed.biometrics) this.saveBiometrics(parsed.biometrics);
      if (parsed.editalGoals) this.saveEditalGoals(parsed.editalGoals);
      if (parsed.streakDays) this.saveStreakDays(parsed.streakDays);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },

  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.EXERCISES);
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_DAYS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY_LOGS);
    localStorage.removeItem(STORAGE_KEYS.BIOMETRICS);
    localStorage.removeItem(STORAGE_KEYS.EDITAL_GOALS);
    localStorage.removeItem(STORAGE_KEYS.STREAK);
  },
};

export function calculateBMI(weightKg: number, heightM: number): {
  bmi: number;
  category: string;
  isHealthy: boolean;
} {
  if (!heightM || heightM <= 0) return { bmi: 0, category: 'N/A', isHealthy: false };
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  let category = 'Normal';
  let isHealthy = true;

  if (bmi < 18.5) {
    category = 'Abaixo do peso';
    isHealthy = false;
  } else if (bmi <= 24.9) {
    category = 'Saudável';
    isHealthy = true;
  } else if (bmi <= 29.9) {
    category = 'Sobrepeso';
    isHealthy = false;
  } else {
    category = 'Obesidade';
    isHealthy = false;
  }

  return { bmi, category, isHealthy };
}
