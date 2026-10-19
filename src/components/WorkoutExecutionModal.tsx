import React, { useState, useEffect, useRef } from 'react';
import { Exercise, SetExecutionLog, WorkoutSessionLog } from '../types';
import { playCountdownBeep, playCompletionAlert } from '../services/audio';
import { ChevronLeft, History, Play, Pause, Plus, Minus, Check, ChevronRight, Gauge } from 'lucide-react';

interface WorkoutExecutionModalProps {
  exercise: Exercise;
  allExercises: Exercise[];
  onClose: () => void;
  onCompleteExercise: (exerciseId: string, logs: SetExecutionLog[]) => void;
  onOpenHistory: (exercise: Exercise) => void;
  onSwitchExercise: (nextExercise: Exercise) => void;
}

const RPE_OPTIONS = [
  { value: 6, label: 'Leve (RPE 6)' },
  { value: 7, label: 'Moderada (RPE 7)' },
  { value: 8, label: 'Dificuldade Média (RPE 8)' },
  { value: 9, label: 'Perto do Limite (RPE 9)' },
  { value: 10, label: 'Falha Máxima TAF (RPE 10)' },
];

export const WorkoutExecutionModal: React.FC<WorkoutExecutionModalProps> = ({
  exercise,
  allExercises,
  onClose,
  onCompleteExercise,
  onOpenHistory,
  onSwitchExercise,
}) => {
  // Sets & reps state
  const totalSets = exercise.targetSets || 3;
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState(exercise.targetReps || 8);
  const [extraWeightKg, setExtraWeightKg] = useState(0);
  const [rpe, setRpe] = useState(7);
  const [showRpeSelect, setShowRpeSelect] = useState(false);
  const [loggedSets, setLoggedSets] = useState<SetExecutionLog[]>([]);

  // Rest timer state
  const [restPresetSeconds, setRestPresetSeconds] = useState(exercise.defaultRestSeconds || 45);
  const [restSecondsLeft, setRestSecondsLeft] = useState(exercise.defaultRestSeconds || 45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Total session stopwatch
  const [elapsedSeconds, setElapsedSeconds] = useState(372); // starts around ~06:12
  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);

  // Next exercise calculation
  const currentIndex = allExercises.findIndex((e) => e.id === exercise.id);
  const nextExercise = allExercises[(currentIndex + 1) % allExercises.length];

  // Run stopwatch
  useEffect(() => {
    stopwatchRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    };
  }, []);

  // Run rest countdown
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setRestSecondsLeft((prev) => {
          if (prev <= 1) {
            playCompletionAlert();
            setIsTimerRunning(false);
            return 0;
          }
          if (prev === 4 || prev === 3 || prev === 2) {
            playCountdownBeep(880, 100);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Format seconds as MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectPreset = (seconds: number) => {
    setRestPresetSeconds(seconds);
    setRestSecondsLeft(seconds);
  };

  const handleAdd15Seconds = () => {
    setRestSecondsLeft((prev) => prev + 15);
  };

  const handleCompleteSetAndRest = () => {
    const newLog: SetExecutionLog = {
      setNumber: currentSet,
      repsOrValue: reps,
      weightExtraKg: extraWeightKg,
      rpe,
      restSeconds: restPresetSeconds,
    };
    const updated = [...loggedSets, newLog];
    setLoggedSets(updated);

    if (currentSet < totalSets) {
      setCurrentSet((prev) => prev + 1);
      // Start rest timer automatically
      setRestSecondsLeft(restPresetSeconds);
      setIsTimerRunning(true);
    } else {
      // Finished all sets!
      onCompleteExercise(exercise.id, updated);
      onClose();
    }
  };

  const handleSkipRest = () => {
    setIsTimerRunning(false);
    setRestSecondsLeft(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F5F7] dark:bg-[#0D0E11] text-[#191C1E] dark:text-[#F0F1F3] overflow-y-auto min-h-screen flex flex-col justify-between font-sans selection:bg-[#111827]">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen relative pb-36">
        {/* Top Header */}
        <header className="w-full pt-4 pb-2 px-4 flex flex-col gap-2 sticky top-0 bg-[#F4F5F7]/90 dark:bg-[#0D0E11]/90 backdrop-blur-md z-40">
          <div className="flex items-center justify-between h-12">
            <button
              onClick={onClose}
              aria-label="Voltar"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex flex-col items-center text-center">
              <h1 className="text-[18px] font-semibold text-[#111827] dark:text-[#F0F1F3] tracking-tight truncate max-w-[220px]">
                {exercise.name}
              </h1>
              <p className="text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                Série {currentSet} de {totalSets} • {exercise.muscleGroup}
              </p>
            </div>

            <button
              onClick={() => onOpenHistory(exercise)}
              aria-label="Histórico do exercício"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
            >
              <History size={19} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pt-2 flex flex-col gap-4">
          {/* CARD 1: Meta da Série & Registro Numérico */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#9CA3AF]">
                Meta da Série
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] text-[12px] font-semibold border border-[#E5E7EB]/50 dark:border-[#2A2D35]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>
                Alvo: {exercise.targetReps} {exercise.unitLabel}
              </span>
            </div>

            {/* Reps Counter with Stepper */}
            <div className="flex items-center justify-between py-3 my-1">
              <button
                onClick={() => setReps((prev) => Math.max(1, prev - 1))}
                aria-label="Diminuir repetições"
                className="w-14 h-14 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] bg-white dark:bg-[#17181D] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] text-2xl active:scale-95 transition-all hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
              >
                <Minus size={22} />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-[44px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tighter leading-none select-none tabular-nums font-sans">
                  {reps}
                </span>
                <span className="text-[11px] font-semibold text-[#4B5563] dark:text-[#9CA3AF] mt-1 tracking-wider uppercase">
                  {exercise.unitLabel === 'seg' ? 'Segundos' : exercise.unitLabel === 'm' ? 'Metros' : 'Repetições'}
                </span>
              </div>

              <button
                onClick={() => setReps((prev) => prev + 1)}
                aria-label="Aumentar repetições"
                className="w-14 h-14 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] bg-white dark:bg-[#17181D] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] text-2xl active:scale-95 transition-all hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
              >
                <Plus size={22} />
              </button>
            </div>

            {/* Quick Rep Adjust Chips */}
            <div className="flex items-center justify-between gap-1.5 pt-1 pb-3">
              {[reps - 2, reps - 1, reps, reps + 1, reps + 2].map((val) => {
                const isSelected = val === reps;
                return (
                  <button
                    key={val}
                    onClick={() => setReps(Math.max(1, val))}
                    className={`flex-1 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
                      isSelected
                        ? 'border border-[#111827] dark:border-white text-white dark:text-[#111827] bg-[#111827] dark:bg-white'
                        : 'border border-[#E5E7EB] dark:border-[#2A2D35] text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] hover:text-[#111827] dark:hover:text-white'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>

            <div className="w-full h-px bg-[#F3F4F6] dark:bg-[#202229] mb-3"></div>

            {/* Effort Perception Dropdown Pill (RPE) */}
            <div className="relative">
              <button
                onClick={() => setShowRpeSelect(!showRpeSelect)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] text-left active:scale-[0.99] transition-transform"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Gauge size={16} className="text-[#4B5563] dark:text-[#9CA3AF]" />
                  <span className="text-[13px] text-[#4B5563] dark:text-[#9CA3AF] truncate">
                    Percepção de Esforço:{' '}
                    <strong className="font-semibold text-[#111827] dark:text-[#F0F1F3]">
                      {RPE_OPTIONS.find((opt) => opt.value === rpe)?.label || `RPE ${rpe}`}
                    </strong>
                  </span>
                </div>
                <span className="text-xs text-[#4B5563] dark:text-[#9CA3AF]">▾</span>
              </button>

              {showRpeSelect && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] rounded-2xl p-1 shadow-lg z-30 space-y-1">
                  {RPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setRpe(opt.value);
                        setShowRpeSelect(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors ${
                        rpe === opt.value
                          ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold'
                          : 'text-[#111827] dark:text-[#F0F1F3] hover:bg-[#F3F4F6] dark:hover:bg-[#202229]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CARD 2: Timer de Descanso Ativo */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#9CA3AF]">
                  Descanso Programado
                </span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F3F4F6] dark:bg-[#202229] text-[#4B5563] dark:text-[#9CA3AF] border border-[#E5E7EB]/40 dark:border-[#2A2D35]">
                {isTimerRunning ? 'Contando...' : 'Pausado'}
              </span>
            </div>

            {/* Sleek Digital Timer & Controls Row */}
            <div className="flex items-center justify-between py-2">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-[40px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight tabular-nums font-sans">
                    {formatTime(restSecondsLeft)}
                  </span>
                  <span className="text-[14px] text-[#4B5563] dark:text-[#9CA3AF] font-medium">
                    s
                  </span>
                </div>
                <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                  Recuperação neuromuscular sugerida
                </p>
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                aria-label={isTimerRunning ? 'Pausar Timer' : 'Iniciar Timer'}
                className="w-13 h-13 p-3.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-all hover:bg-[#E5E7EB] dark:hover:bg-[#2A2D35]"
              >
                {isTimerRunning ? <Pause size={20} /> : <Play size={20} className="fill-current" />}
              </button>
            </div>

            {/* Timer Presets Horizontal Chips */}
            <div className="flex items-center justify-between gap-1.5 mt-4 pt-3 border-t border-[#F3F4F6] dark:border-[#202229]">
              {[30, 45, 60, 90].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleSelectPreset(sec)}
                  className={`flex-1 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                    restPresetSeconds === sec
                      ? 'border border-[#111827] dark:border-white text-white dark:text-[#111827] bg-[#111827] dark:bg-white'
                      : 'border border-[#E5E7EB] dark:border-[#2A2D35] text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] hover:text-[#111827] dark:hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
              <button
                onClick={handleAdd15Seconds}
                className="px-3 py-1.5 rounded-full text-[12px] font-semibold border border-[#E5E7EB] dark:border-[#2A2D35] text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] hover:text-[#111827] dark:hover:text-white transition-colors"
              >
                +15s
              </button>
            </div>
          </section>

          {/* CARD 3: INFO SUMMARY BENTO */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] p-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col divide-y divide-[#F3F4F6] dark:divide-[#202229] transition-colors">
            {/* Row 1: Série atual */}
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[13px] text-[#4B5563] dark:text-[#9CA3AF]">
                Série atual
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
                  {currentSet} de {totalSets}
                </span>
                <div className="flex items-center gap-1.5 ml-1">
                  {Array.from({ length: totalSets }).map((_, i) => {
                    const isDone = i < currentSet - 1;
                    const isActive = i === currentSet - 1;
                    return (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          isDone
                            ? 'bg-[#111827] dark:bg-white'
                            : isActive
                            ? 'border-2 border-[#111827] dark:border-white bg-[#111827]/20 w-2.5 h-2.5'
                            : 'bg-[#E5E7EB] dark:bg-[#2A2D35]'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Row 2: Carga */}
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[13px] text-[#4B5563] dark:text-[#9CA3AF]">
                Carga
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
                  Peso corporal
                </span>
                <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                  ({extraWeightKg > 0 ? `+${extraWeightKg} kg` : '+0 kg'})
                </span>
                <button
                  onClick={() => setExtraWeightKg((prev) => (prev === 0 ? 5 : prev === 5 ? 10 : 0))}
                  className="ml-1 text-[11px] underline text-[#0D9488]"
                >
                  Alterar
                </button>
              </div>
            </div>

            {/* Row 3: Tempo total */}
            <div className="flex items-center justify-between py-2.5 px-1">
              <span className="text-[13px] text-[#4B5563] dark:text-[#9CA3AF]">
                Tempo total
              </span>
              <span className="text-[14px] font-semibold text-[#111827] dark:text-[#F0F1F3] tabular-nums">
                {formatTime(elapsedSeconds)}
              </span>
            </div>

            {/* Row 4: Próximo exercício */}
            <div
              onClick={() => onSwitchExercise(nextExercise)}
              className="flex items-center justify-between py-2.5 px-1 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-[13px] text-[#4B5563] dark:text-[#9CA3AF]">
                Próximo exercício
              </span>
              <div className="flex items-center gap-1 text-[#111827] dark:text-[#F0F1F3]">
                <span className="text-[14px] font-medium">
                  {nextExercise.name}
                </span>
                <ChevronRight size={16} className="text-[#4B5563] dark:text-[#9CA3AF]" />
              </div>
            </div>
          </section>
        </main>

        {/* Docked Floating Bottom Action Canvas */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center px-4 pb-6 pt-3 bg-gradient-to-t from-[#F4F5F7] dark:from-[#0D0E11] via-[#F4F5F7]/95 dark:via-[#0D0E11]/95 to-transparent pointer-events-none">
          <div className="w-full max-w-md flex flex-col items-center gap-2 pointer-events-auto">
            {/* Primary Action Button */}
            <button
              onClick={handleCompleteSetAndRest}
              className="w-full h-14 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full flex items-center justify-center gap-2 text-[15px] font-semibold shadow-[0_12px_32px_-4px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-transform duration-150"
            >
              <Check size={20} />
              <span>
                {currentSet < totalSets
                  ? 'Concluir Série & Descansar'
                  : 'Finalizar Exercício'}
              </span>
            </button>

            {/* Secondary Bypass Action */}
            <button
              onClick={handleSkipRest}
              className="py-1 text-[13px] font-medium text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              Pular Descanso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
