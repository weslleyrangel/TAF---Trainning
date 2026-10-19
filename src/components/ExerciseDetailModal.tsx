import React, { useState } from 'react';
import { Exercise, WorkoutSessionLog } from '../types';
import {
  ArrowLeft,
  Edit2,
  Trophy,
  Repeat,
  TrendingUp,
  Flag,
  Calendar,
  Play,
  Plus,
  ChevronRight,
  Dumbbell,
  HeartPulse,
} from 'lucide-react';

interface ExerciseDetailModalProps {
  exercise: Exercise;
  historyLogs: WorkoutSessionLog[];
  onClose: () => void;
  onStartExercise: (exercise: Exercise) => void;
  onEditExercise: (exercise: Exercise) => void;
  onAddManualLog: (exercise: Exercise, reps: number) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  historyLogs,
  onClose,
  onStartExercise,
  onEditExercise,
  onAddManualLog,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualReps, setManualReps] = useState(exercise.targetReps || 10);

  // Filter logs for this exercise
  const exerciseLogs = historyLogs.filter((log) => log.exerciseId === exercise.id);

  const tafTargetVal = exercise.tafTarget.value || 24;
  const currentPrVal = exercise.personalRecord.value || 18;
  const tafPercent = Math.min(100, Math.round((currentPrVal / tafTargetVal) * 100));
  const diffToMax = Math.max(0, tafTargetVal - currentPrVal);

  const handleSaveManual = () => {
    onAddManualLog(exercise, manualReps);
    setShowManualModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F5F7] dark:bg-[#0D0E11] text-[#191C1E] dark:text-[#F0F1F3] overflow-y-auto min-h-screen flex justify-center selection:bg-[#111827]">
      <div className="w-full max-w-md min-h-screen flex flex-col pb-36 relative">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#F4F5F7]/90 dark:bg-[#0D0E11]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-[#E5E7EB]/60 dark:border-[#2A2D35]/60">
          <button
            onClick={onClose}
            aria-label="Voltar"
            className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="flex flex-col items-center text-center px-2">
            <h1 className="text-[17px] font-semibold text-[#111827] dark:text-[#F0F1F3] tracking-tight">
              {exercise.name}
            </h1>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              {exercise.category} • {exercise.focusType === 'forca' ? 'Foco em Força' : 'Foco em Resistência'} • TAF Padrão
            </p>
          </div>

          <button
            onClick={() => onEditExercise(exercise)}
            aria-label="Editar Exercício"
            className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
          >
            <Edit2 size={17} />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 flex flex-col gap-4 pt-3">
          {/* Hero PR Card */}
          <section className="w-full bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] p-6 relative overflow-hidden flex flex-col justify-between transition-colors">
            {/* Trophy watermark accent */}
            <div className="absolute -right-3 -top-3 text-[#F3F4F6] dark:text-[#202229] pointer-events-none select-none opacity-40">
              <Trophy size={120} />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB]/40 dark:border-[#2A2D35]">
                  <Trophy size={14} className="text-[#111827] dark:text-amber-400 fill-current" />
                  <span className="text-[11px] uppercase tracking-wider text-[#111827] dark:text-[#F0F1F3] font-bold">
                    RECORDE PESSOAL (PR)
                  </span>
                </div>

                {exercise.focusType === 'forca' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] border border-[#E5E7EB] dark:border-[#2A2D35]">
                    <Dumbbell size={10} className="stroke-[2.5]" />
                    <span>Força</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0D9488]/10 dark:bg-[#0D9488]/15 text-[#0D9488] border border-[#0D9488]/20">
                    <HeartPulse size={10} className="stroke-[2.5]" />
                    <span>Resistência</span>
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[44px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight leading-none font-sans tabular-nums">
                  {currentPrVal}
                </span>
                <span className="text-[20px] text-[#4B5563] dark:text-[#9CA3AF] font-medium">
                  {exercise.unitLabel}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#F3F4F6] dark:border-[#202229] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[#4B5563] dark:text-[#9CA3AF] text-[12px]">
                <Calendar size={14} />
                <span>Alcançado em {exercise.personalRecord.achievedAt}</span>
              </div>

              {exercise.personalRecord.deltaVsPreviousMonth && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse"></span>
                  <span>{exercise.personalRecord.deltaVsPreviousMonth}</span>
                </div>
              )}
            </div>
          </section>

          {/* Mini Bento Grid (2 Columns) */}
          <section className="grid grid-cols-2 gap-3">
            {/* Volume Total */}
            <div className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] p-4 flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center justify-between text-[#4B5563] dark:text-[#9CA3AF]">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Volume Total
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
                    <Repeat size={14} />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[24px] font-bold text-[#111827] dark:text-[#F0F1F3] tabular-nums font-sans">
                    {exercise.monthlyVolume}{' '}
                    <span className="text-[12px] font-normal text-[#4B5563] dark:text-[#9CA3AF]">
                      {exercise.unitLabel}
                    </span>
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#F3F4F6] dark:border-[#202229]">
                <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                  Neste mês de Outubro
                </p>
              </div>
            </div>

            {/* Evolução Mensal */}
            <div className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] p-4 flex flex-col justify-between transition-colors">
              <div>
                <div className="flex items-center justify-between text-[#4B5563] dark:text-[#9CA3AF]">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Evolução Mensal
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488]">
                    <TrendingUp size={14} />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-[24px] font-bold text-[#0D9488] tabular-nums font-sans">
                    +{exercise.monthlyGrowthPercent}%
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#F3F4F6] dark:border-[#202229]">
                <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF] truncate">
                  Consistência progressiva
                </p>
              </div>
            </div>
          </section>

          {/* Target / Meta Comparison Row */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] p-4 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
                  <Flag size={13} />
                </div>
                <span className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
                  Meta Edital TAF: {tafTargetVal} {exercise.unitLabel}
                </span>
              </div>
              <span className="text-[13px] text-[#111827] dark:text-[#F0F1F3] font-bold">
                {tafPercent}%
              </span>
            </div>

            <div className="w-full bg-[#F3F4F6] dark:bg-[#202229] rounded-full h-2 overflow-hidden my-2.5">
              <div
                className="bg-[#111827] dark:bg-white h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${tafPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#4B5563] dark:text-[#9CA3AF] pt-1">
              <p>
                {diffToMax === 0
                  ? 'Você atingiu o índice máximo do TAF!'
                  : `Faltam ${diffToMax} ${exercise.unitLabel} para índice máximo`}
              </p>
              <span className="font-semibold text-[#111827] dark:text-[#F0F1F3]">
                {currentPrVal} / {tafTargetVal}
              </span>
            </div>
          </section>

          {/* Histórico Recente */}
          <section className="flex flex-col gap-2.5 mt-1">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                  Histórico de Execuções
                </h2>
                <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                  Últimas sessões registradas
                </p>
              </div>
              <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] px-2.5 py-1 rounded-full">
                Outubro 2026
              </span>
            </div>

            <div className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] divide-y divide-[#F3F4F6] dark:divide-[#202229] overflow-hidden transition-colors">
              {exerciseLogs.length > 0 ? (
                exerciseLogs.map((log) => (
                  <div key={log.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-11 h-11 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-center">
                        <span className="text-[10px] font-bold leading-none">REG</span>
                        <span className="text-[9px] opacity-80 leading-none mt-0.5">
                          {log.date.slice(8, 10)} Out
                        </span>
                      </div>
                      <div>
                        <span className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3] block">
                          {log.sets.length} séries executadas
                        </span>
                        <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                          {log.notes || 'Cadência e esforço registrado'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {log.sets.map((s, idx) => (
                        <span
                          key={idx}
                          className="w-7 h-7 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[12px] font-bold text-[#111827] dark:text-[#F0F1F3]"
                        >
                          {s.repsOrValue}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#4B5563] dark:text-[#9CA3AF]">
                  Nenhum treino salvo ainda para este exercício. Complete um treino ou adicione manualmente abaixo!
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="w-full max-w-md p-4 bg-gradient-to-t from-[#F4F5F7] dark:from-[#0D0E11] via-[#F4F5F7]/95 dark:via-[#0D0E11]/95 to-transparent pt-6 pointer-events-auto flex flex-col items-center gap-2">
            <button
              onClick={() => onStartExercise(exercise)}
              className="w-full h-12 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full flex items-center justify-center gap-2 text-[14px] font-semibold shadow-lg shadow-black/10 active:scale-[0.98] transition-transform duration-150"
            >
              <Play size={18} className="fill-current" />
              <span>Iniciar Treino com Este Exercício</span>
            </button>

            <button
              onClick={() => setShowManualModal(true)}
              className="py-1 px-3 text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white text-[12px] font-medium transition-colors flex items-center gap-1 active:scale-95"
            >
              <Plus size={15} />
              <span>Registrar Série Manual</span>
            </button>
          </div>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#17181D] rounded-3xl p-6 w-full max-w-xs border border-[#E5E7EB] dark:border-[#2A2D35] shadow-xl space-y-4">
            <h3 className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3]">
              Registrar Série Manual
            </h3>
            <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
              Informe o resultado alcançado em repetições ou segundos:
            </p>
            <input
              type="number"
              value={manualReps}
              onChange={(e) => setManualReps(parseInt(e.target.value) || 0)}
              className="w-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] rounded-xl px-4 py-2.5 text-center text-2xl font-bold text-[#111827] dark:text-[#F0F1F3] focus:outline-none focus:ring-2 focus:ring-[#111827] dark:focus:ring-white"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowManualModal(false)}
                className="flex-1 py-2 text-sm text-[#4B5563] dark:text-[#9CA3AF] rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveManual}
                className="flex-1 py-2 text-sm font-semibold text-white dark:text-[#111827] bg-[#111827] dark:bg-white rounded-full shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
