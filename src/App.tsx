import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { DaySelector } from './components/DaySelector';
import { HeroWorkoutCard } from './components/HeroWorkoutCard';
import { QuickActionPills } from './components/QuickActionPills';
import { BentoMetrics } from './components/BentoMetrics';
import { ExerciseList } from './components/ExerciseList';
import { ProofAttachmentCard } from './components/ProofAttachmentCard';
import { BottomNavBar, TabDestination } from './components/BottomNavBar';
import { WorkoutExecutionModal } from './components/WorkoutExecutionModal';
import { EvolutionView } from './components/EvolutionView';
import { ProfileView } from './components/ProfileView';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { NewExerciseModal } from './components/NewExerciseModal';
import { EditEditalModal } from './components/EditEditalModal';
import { StandaloneTimerModal } from './components/StandaloneTimerModal';
import { ReorganizeModal } from './components/ReorganizeModal';
import { NutritionTipCard } from './components/NutritionTipCard';
import {
  Biometrics,
  Exercise,
  ProofAttachment,
  SetExecutionLog,
  TAFEditalGoal,
  WorkoutDay,
  WorkoutSessionLog,
} from './types';
import { StorageService } from './services/storage';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

function MainApp() {
  const { theme } = useTheme();
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<TabDestination>('today');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-24');

  // Core application data state
  const [exercises, setExercises] = useState<Exercise[]>(() => StorageService.getExercises());
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>(() => StorageService.getWorkoutDays());
  const [historyLogs, setHistoryLogs] = useState<WorkoutSessionLog[]>(() => StorageService.getHistoryLogs());
  const [biometrics, setBiometrics] = useState<Biometrics>(() => StorageService.getBiometrics());
  const [editalGoals, setEditalGoals] = useState<TAFEditalGoal[]>(() => StorageService.getEditalGoals());
  const [streakDays, setStreakDays] = useState<number>(() => StorageService.getStreakDays());

  // Modals state
  const [executingExercise, setExecutingExercise] = useState<Exercise | null>(null);
  const [detailExercise, setDetailExercise] = useState<Exercise | null>(null);
  const [isNewExerciseOpen, setIsNewExerciseOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [isStandaloneTimerOpen, setIsStandaloneTimerOpen] = useState(false);
  const [isReorganizeOpen, setIsReorganizeOpen] = useState(false);
  const [isEditEditalOpen, setIsEditEditalOpen] = useState(false);
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  // Active workout day
  const currentDay = workoutDays.find((d) => d.date === selectedDate) || workoutDays[2];

  // Exercises planned for the current day
  const dayExercises = currentDay.exerciseIds
    .map((id) => exercises.find((ex) => ex.id === id))
    .filter((ex): ex is Exercise => ex !== undefined);

  const isAllDayCompleted =
    dayExercises.length > 0 &&
    currentDay.completedExerciseIds.length >= dayExercises.length;

  // Save changes to storage whenever critical state changes
  useEffect(() => {
    StorageService.saveExercises(exercises);
  }, [exercises]);

  useEffect(() => {
    StorageService.saveWorkoutDays(workoutDays);
  }, [workoutDays]);

  useEffect(() => {
    StorageService.saveBiometrics(biometrics);
  }, [biometrics]);

  useEffect(() => {
    StorageService.saveEditalGoals(editalGoals);
  }, [editalGoals]);

  // Handlers
  const handleToggleExerciseComplete = (exerciseId: string) => {
    setWorkoutDays((prev) =>
      prev.map((day) => {
        if (day.date !== currentDay.date) return day;
        const exists = day.completedExerciseIds.includes(exerciseId);
        const updatedCompleted = exists
          ? day.completedExerciseIds.filter((id) => id !== exerciseId)
          : [...day.completedExerciseIds, exerciseId];
        return {
          ...day,
          completedExerciseIds: updatedCompleted,
        };
      })
    );
  };

  const handleFinishWorkoutDay = () => {
    // Mark all exercises completed for the day
    setWorkoutDays((prev) =>
      prev.map((day) => {
        if (day.date !== currentDay.date) return day;
        return {
          ...day,
          completedExerciseIds: [...day.exerciseIds],
        };
      })
    );
    // Increase streak if today
    if (currentDay.isToday) {
      const newStreak = streakDays + 1;
      setStreakDays(newStreak);
      StorageService.saveStreakDays(newStreak);
    }
    setShowCompletionToast(true);
    setTimeout(() => setShowCompletionToast(false), 4000);
  };

  const handleSaveProofAttachment = (attachment: ProofAttachment) => {
    setWorkoutDays((prev) =>
      prev.map((day) => {
        if (day.date !== currentDay.date) return day;
        return {
          ...day,
          proofAttachment: attachment,
        };
      })
    );
  };

  const handleRemoveProofAttachment = () => {
    setWorkoutDays((prev) =>
      prev.map((day) => {
        if (day.date !== currentDay.date) return day;
        return {
          ...day,
          proofAttachment: undefined,
        };
      })
    );
  };

  const handleCompleteExecution = (exerciseId: string, sets: SetExecutionLog[]) => {
    const ex = exercises.find((e) => e.id === exerciseId);
    if (!ex) return;

    // Check if new PR was achieved
    const maxVal = Math.max(...sets.map((s) => s.repsOrValue));
    if (maxVal > ex.personalRecord.value) {
      const diff = maxVal - ex.personalRecord.value;
      const updatedExercise: Exercise = {
        ...ex,
        personalRecord: {
          value: maxVal,
          unit: ex.unitLabel,
          achievedAt: 'Hoje',
          deltaVsPreviousMonth: `+${diff} ${ex.unitLabel} vs anterior`,
        },
        monthlyVolume: ex.monthlyVolume + sets.reduce((acc, s) => acc + s.repsOrValue, 0),
      };
      setExercises((prev) => prev.map((e) => (e.id === exerciseId ? updatedExercise : e)));
    }

    // Add session history log
    const newLog: WorkoutSessionLog = {
      id: `log-${Date.now()}`,
      date: currentDay.date,
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets,
      completedAt: 'Hoje',
      notes: `${sets.length} séries • Carga: Peso corporal`,
    };
    StorageService.addHistoryLog(newLog);
    setHistoryLogs((prev) => [newLog, ...prev]);

    // Mark exercise completed for today
    if (!currentDay.completedExerciseIds.includes(exerciseId)) {
      handleToggleExerciseComplete(exerciseId);
    }
  };

  const handleAddManualLog = (ex: Exercise, value: number) => {
    const singleSet: SetExecutionLog = {
      setNumber: 1,
      repsOrValue: value,
      weightExtraKg: 0,
      rpe: 8,
      restSeconds: ex.defaultRestSeconds,
    };
    handleCompleteExecution(ex.id, [singleSet]);
  };

  const handleReloadData = () => {
    setExercises(StorageService.getExercises());
    setWorkoutDays(StorageService.getWorkoutDays());
    setHistoryLogs(StorageService.getHistoryLogs());
    setBiometrics(StorageService.getBiometrics());
    setEditalGoals(StorageService.getEditalGoals());
    setStreakDays(StorageService.getStreakDays());
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} bg-[#F4F5F7] dark:bg-[#0D0E11] text-[#191C1E] dark:text-[#F0F1F3] antialiased selection:bg-[#111827] dark:selection:bg-white selection:text-white dark:selection:text-[#111827] transition-colors duration-200 overflow-x-hidden w-full`}>
      {/* Mobile Viewport Shell (Max 480px, Centered) */}
      <div className="max-w-[480px] w-full mx-auto min-h-screen flex flex-col relative bg-[#F4F5F7] dark:bg-[#0D0E11] transition-colors overflow-x-hidden">
          {/* TAB 1: TODAY / HOME DASHBOARD */}
          {activeTab === 'today' && (
            <>
              {/* Top Navigation */}
              <Header
                onOpenProfile={() => setActiveTab('profile')}
                onOpenCalendar={() => setIsEditEditalOpen(true)}
                selectedDateText={`Hoje, ${currentDay.dayNumber} de ${currentDay.monthLabel}`}
              />

              {/* Horizontal Day Selector Bar */}
              <DaySelector
                days={workoutDays}
                selectedDate={selectedDate}
                onSelectDay={(d) => setSelectedDate(d)}
              />

              {/* Main Content with generous bottom padding for the floating navigation pill */}
              <main className="px-4 pt-2 space-y-4 pb-36 overflow-x-hidden">
                {/* Hero Card */}
                <HeroWorkoutCard
                  sessionNumber={currentDay.sessionNumber}
                  estimatedMinutes={currentDay.estimatedMinutes}
                  estimatedKcal={currentDay.estimatedKcal}
                  muscleGroupsText="Membros Superiores & Core"
                  totalExercises={dayExercises.length}
                  completedExercisesCount={currentDay.completedExerciseIds.length}
                  isToday={currentDay.isToday}
                  onFinishWorkout={handleFinishWorkoutDay}
                />

                {/* Quick Action Pills */}
                <QuickActionPills
                  onStartWorkout={() => {
                    if (dayExercises.length > 0) {
                      setExecutingExercise(dayExercises[0]);
                    }
                  }}
                  onOpenTimer={() => setIsStandaloneTimerOpen(true)}
                  onOpenHistory={() => setActiveTab('evolution')}
                  onAddExercise={() => setIsNewExerciseOpen(true)}
                />

                {/* Bento Grid Metrics */}
                <BentoMetrics
                  completedWeekly={3}
                  targetWeekly={4}
                  streakDays={streakDays}
                  isTodayDone={
                    dayExercises.length > 0 &&
                    currentDay.completedExerciseIds.length >= dayExercises.length
                  }
                />

                {/* Bento-Style Nutritional Tip of the Day */}
                <NutritionTipCard dayDate={currentDay.date} />

                {/* Exercise List */}
                <ExerciseList
                  exercises={dayExercises}
                  completedExerciseIds={currentDay.completedExerciseIds}
                  onToggleExerciseComplete={handleToggleExerciseComplete}
                  onSelectExercise={(ex) => setDetailExercise(ex)}
                  onReorganize={() => setIsReorganizeOpen(true)}
                />

                {/* Activity Proof Attachment Card */}
                <ProofAttachmentCard
                  attachment={currentDay.proofAttachment}
                  onSaveAttachment={handleSaveProofAttachment}
                  onRemoveAttachment={handleRemoveProofAttachment}
                />

                {/* Primary Workout Completion Section - Bento Card with Ample Clearance */}
                <section className="pt-2 mb-4">
                  {!isAllDayCompleted ? (
                    <div className="bg-white dark:bg-[#17181D] rounded-3xl p-5 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] space-y-3.5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[15px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                              Finalizar Sessão
                            </h3>
                            {dayExercises.length > 0 && currentDay.completedExerciseIds.length >= dayExercises.length && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0D9488]/15 text-[#0D9488] border border-[#0D9488]/25">
                                Pronto
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-0.5">
                            {dayExercises.length - currentDay.completedExerciseIds.length === 0
                              ? 'Todos os exercícios foram marcados como concluídos!'
                              : `${currentDay.completedExerciseIds.length} de ${dayExercises.length} exercícios marcados`}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] border border-[#E5E7EB] dark:border-[#2A2D35] shrink-0">
                          Sessão #{currentDay.sessionNumber}
                        </span>
                      </div>

                      <button
                        onClick={handleFinishWorkoutDay}
                        className="w-full h-14 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full flex items-center justify-center gap-2.5 text-[15px] font-bold shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <CheckCircle2 size={20} className={dayExercises.length > 0 && currentDay.completedExerciseIds.length >= dayExercises.length ? 'text-[#0D9488]' : ''} />
                        <span>Concluir Treino do Dia</span>
                      </button>
                      <p className="text-[11px] text-center text-[#4B5563] dark:text-[#9CA3AF]">
                        Salva o histórico, atualiza seu streak e valida sua meta semanal
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#0D9488]/10 dark:bg-[#0D9488]/15 rounded-3xl p-5 border border-[#0D9488]/30 shadow-sm flex items-center justify-between transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-[#0D9488] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2 size={22} />
                        </div>
                        <div>
                          <h3 className="text-[15px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                            Treino Concluído!
                          </h3>
                          <p className="text-[12px] text-[#0D9488] font-semibold mt-0.5">
                            +1 dia somado à sua constância • Streak ativo
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setWorkoutDays((prev) =>
                            prev.map((day) =>
                              day.date === currentDay.date ? { ...day, completedExerciseIds: [] } : day
                            )
                          );
                        }}
                        className="text-[11px] font-semibold text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white underline px-2 py-1"
                      >
                        Desfazer
                      </button>
                    </div>
                  )}
                </section>

                {/* Motivational Minimal Callout */}
                <section className="p-4 rounded-2xl bg-white/70 dark:bg-[#17181D]/60 border border-[#E5E7EB] dark:border-[#2A2D35] text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                    <ShieldCheck size={14} className="text-[#0D9488]" />
                    <span>Sem login necessário • Todos os dados salvos localmente</span>
                  </div>
                </section>
              </main>

              {/* Floating Instant Conclusion Pill when all exercises are marked but day not yet concluded */}
              {!isAllDayCompleted && dayExercises.length > 0 && currentDay.completedExerciseIds.length >= dayExercises.length && (
                <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-300">
                  <button
                    onClick={handleFinishWorkoutDay}
                    className="pointer-events-auto bg-[#111827] dark:bg-white text-white dark:text-[#111827] px-5 py-3 rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_25px_-5px_rgba(255,255,255,0.2)] flex items-center gap-2.5 text-[13px] font-bold active:scale-95 transition-all border border-[#374151] dark:border-[#E5E7EB]"
                  >
                    <CheckCircle2 size={18} className="text-[#0D9488]" />
                    <span>Tudo pronto! Concluir Treino</span>
                  </button>
                </div>
              )}
            </>
          )}

          {/* TAB 2: EVOLUTION / ANALYTICS */}
          {activeTab === 'evolution' && (
            <EvolutionView
              onBackToToday={() => setActiveTab('today')}
              onOpenSettings={() => setIsEditEditalOpen(true)}
            />
          )}

          {/* TAB 3: PROFILE / BIOMETRICS */}
          {activeTab === 'profile' && (
            <ProfileView
              biometrics={biometrics}
              editalGoals={editalGoals}
              onUpdateBiometrics={(bio) => setBiometrics(bio)}
              onOpenEditEdital={() => setIsEditEditalOpen(true)}
              onDataReset={handleReloadData}
              onBackupImported={handleReloadData}
            />
          )}

          {/* Bottom Dock Navigation Bar */}
          <BottomNavBar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

          {/* Full-Screen Workout Execution Modal */}
          {executingExercise && (
            <WorkoutExecutionModal
              exercise={executingExercise}
              allExercises={dayExercises}
              onClose={() => setExecutingExercise(null)}
              onCompleteExercise={handleCompleteExecution}
              onOpenHistory={(ex) => {
                setDetailExercise(ex);
              }}
              onSwitchExercise={(next) => setExecutingExercise(next)}
            />
          )}

          {/* Exercise Detail & Personal Record (PR) Modal */}
          {detailExercise && (
            <ExerciseDetailModal
              exercise={detailExercise}
              historyLogs={historyLogs}
              onClose={() => setDetailExercise(null)}
              onStartExercise={(ex) => {
                setDetailExercise(null);
                setExecutingExercise(ex);
              }}
              onEditExercise={(ex) => {
                setDetailExercise(null);
                setEditingExercise(ex);
              }}
              onAddManualLog={handleAddManualLog}
            />
          )}

          {/* New / Edit Exercise Modal */}
          {(isNewExerciseOpen || editingExercise) && (
            <NewExerciseModal
              initialExercise={editingExercise}
              onClose={() => {
                setIsNewExerciseOpen(false);
                setEditingExercise(null);
              }}
              onSaveExercise={(saved) => {
                if (editingExercise) {
                  setExercises((prev) => prev.map((e) => (e.id === saved.id ? saved : e)));
                } else {
                  setExercises((prev) => [...prev, saved]);
                  // Also append to current day
                  setWorkoutDays((prev) =>
                    prev.map((day) =>
                      day.date === currentDay.date
                        ? { ...day, exerciseIds: [...day.exerciseIds, saved.id] }
                        : day
                    )
                  );
                }
              }}
            />
          )}

          {/* Edit Edital Modal */}
          {isEditEditalOpen && (
            <EditEditalModal
              goals={editalGoals}
              onClose={() => setIsEditEditalOpen(false)}
              onSaveGoals={(goals) => setEditalGoals(goals)}
            />
          )}

          {/* Standalone Rest Timer Modal */}
          {isStandaloneTimerOpen && (
            <StandaloneTimerModal onClose={() => setIsStandaloneTimerOpen(false)} />
          )}

          {/* Reorganize Order Modal */}
          {isReorganizeOpen && (
            <ReorganizeModal
              exercises={dayExercises}
              onClose={() => setIsReorganizeOpen(false)}
              onSaveOrder={(ordered) => {
                const orderedIds = ordered.map((e) => e.id);
                setWorkoutDays((prev) =>
                  prev.map((day) =>
                    day.date === currentDay.date
                      ? { ...day, exerciseIds: orderedIds }
                      : day
                  )
                );
              }}
            />
          )}

          {/* Completion Celebration Toast */}
          {showCompletionToast && (
            <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#111827] dark:bg-white text-white dark:text-[#111827] px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
              <CheckCircle2 size={16} className="text-[#0D9488]" />
              <span>Treino do dia concluído com sucesso! +1 no seu Streak!</span>
            </div>
          )}
        </div>
      </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
