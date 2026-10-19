export type MetricType = 'reps' | 'time' | 'distance';

export type ExerciseCategory = 'Membros Superiores' | 'Core / Abdômen' | 'Resistência Aeróbica' | 'Outros';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  metricType: MetricType;
  targetSets: number;
  targetReps: number;
  unitLabel: string; // e.g. "reps", "seg", "m", "km"
  defaultRestSeconds: number;
  muscleGroup: string;
  focusType?: 'forca' | 'resistencia';
  iconName: string; // e.g. "fitness_center", "self_improvement", "directions_run", "sports_gymnastics"
  personalRecord: {
    value: number;
    unit: string;
    achievedAt: string;
    deltaVsPreviousMonth?: string;
  };
  monthlyVolume: number;
  monthlyGrowthPercent: number;
  tafTarget: {
    value: number;
    description: string;
  };
}

export interface SetExecutionLog {
  setNumber: number;
  repsOrValue: number;
  weightExtraKg: number;
  rpe: number; // 6 to 10
  restSeconds: number;
}

export interface WorkoutSessionLog {
  id: string;
  date: string; // YYYY-MM-DD
  exerciseId: string;
  exerciseName: string;
  sets: SetExecutionLog[];
  completedAt: string;
  notes?: string;
}

export interface ProofAttachment {
  id: string;
  fileName: string;
  fileSizeKB: number;
  mimeType: string;
  dataUrl: string; // Base64
  uploadedAt: string;
}

export interface WorkoutDay {
  date: string; // YYYY-MM-DD
  dayLabel: string; // Seg, Ter, Qua, Qui, Sex, Sáb, Dom
  dayNumber: number; // e.g. 24
  monthLabel: string; // Outubro
  sessionNumber: number;
  estimatedMinutes: number;
  estimatedKcal: number;
  exerciseIds: string[];
  completedExerciseIds: string[];
  proofAttachment?: ProofAttachment;
  isToday?: boolean;
}

export interface Biometrics {
  weightKg: number;
  heightM: number;
  lastUpdated: string;
}

export interface TAFEditalGoal {
  id: string;
  exerciseName: string;
  requirementDescription: string;
  targetValue: number;
  unit: string;
  category: ExerciseCategory;
  iconName: string;
  timeLimitSeconds?: number;
}

export interface AppDataBackup {
  version: string;
  exportedAt: string;
  exercises: Exercise[];
  workoutDays: WorkoutDay[];
  historyLogs: WorkoutSessionLog[];
  biometrics: Biometrics;
  editalGoals: TAFEditalGoal[];
  streakDays: number;
  weeklyTarget: { done: number; total: number };
}
