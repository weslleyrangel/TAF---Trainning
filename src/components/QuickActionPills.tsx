import React from 'react';
import { Play, Timer, History, Plus } from 'lucide-react';

interface QuickActionPillsProps {
  onStartWorkout: () => void;
  onOpenTimer: () => void;
  onOpenHistory: () => void;
  onAddExercise: () => void;
}

export const QuickActionPills: React.FC<QuickActionPillsProps> = ({
  onStartWorkout,
  onOpenTimer,
  onOpenHistory,
  onAddExercise,
}) => {
  return (
    <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
      {/* Primary: Iniciar */}
      <button
        onClick={onStartWorkout}
        className="flex items-center gap-2 bg-[#111827] dark:bg-white text-white dark:text-[#111827] px-5 py-3 rounded-full text-[13px] font-semibold active:scale-95 transition-all shadow-sm shrink-0"
      >
        <Play size={16} className="fill-current" />
        <span>Iniciar</span>
      </button>

      {/* Standalone Rest Timer */}
      <button
        onClick={onOpenTimer}
        className="flex items-center gap-2 bg-white dark:bg-[#17181D] text-[#111827] dark:text-[#F0F1F3] border border-[#E5E7EB] dark:border-[#2A2D35] px-4 py-3 rounded-full text-[13px] font-medium active:scale-95 transition-all shadow-sm shrink-0 hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
      >
        <Timer size={16} className="text-[#4B5563] dark:text-[#9CA3AF]" />
        <span>Timer de Descanso</span>
      </button>

      {/* History */}
      <button
        onClick={onOpenHistory}
        className="flex items-center gap-2 bg-white dark:bg-[#17181D] text-[#111827] dark:text-[#F0F1F3] border border-[#E5E7EB] dark:border-[#2A2D35] px-4 py-3 rounded-full text-[13px] font-medium active:scale-95 transition-all shadow-sm shrink-0 hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
      >
        <History size={16} className="text-[#4B5563] dark:text-[#9CA3AF]" />
        <span>Histórico</span>
      </button>

      {/* Quick Add Exercise */}
      <button
        onClick={onAddExercise}
        className="flex items-center gap-1.5 bg-white dark:bg-[#17181D] text-[#111827] dark:text-[#F0F1F3] border border-[#E5E7EB] dark:border-[#2A2D35] px-3.5 py-3 rounded-full text-[13px] font-medium active:scale-95 transition-all shadow-sm shrink-0 hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
        title="Criar novo exercício"
      >
        <Plus size={16} className="text-[#0D9488]" />
        <span>Novo</span>
      </button>
    </section>
  );
};
