import React from 'react';

interface HeroWorkoutCardProps {
  sessionNumber: number;
  estimatedMinutes: number;
  estimatedKcal: number;
  muscleGroupsText: string;
  totalExercises: number;
  completedExercisesCount: number;
  isToday?: boolean;
  onFinishWorkout?: () => void;
}

export const HeroWorkoutCard: React.FC<HeroWorkoutCardProps> = ({
  sessionNumber,
  estimatedMinutes,
  estimatedKcal,
  muscleGroupsText,
  totalExercises,
  completedExercisesCount,
  isToday = true,
  onFinishWorkout,
}) => {
  const percent = totalExercises > 0
    ? Math.round((completedExercisesCount / totalExercises) * 100)
    : 0;

  const isComplete = totalExercises > 0 && completedExercisesCount >= totalExercises;

  return (
    <section className="bg-white dark:bg-[#17181D] rounded-3xl p-6 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] relative overflow-hidden transition-colors">
      <div className="flex justify-between items-start">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB]/50 dark:border-[#2A2D35]">
          <span className={`w-1.5 h-1.5 rounded-full ${isComplete ? 'bg-[#0D9488]' : 'bg-[#0D9488] animate-pulse'}`}></span>
          <span className="text-[12px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
            {isToday ? 'Treino de Hoje' : 'Programação do Dia'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] px-2.5 py-1 rounded-full border border-[#E5E7EB]/40 dark:border-[#2A2D35]/60">
            Sessão #{sessionNumber}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-[36px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight leading-none tabular-nums font-sans">
          {estimatedMinutes} min
        </span>
        <span className="text-[13px] text-[#4B5563] dark:text-[#9CA3AF] font-medium">
          • {estimatedKcal} kcal est.
        </span>
      </div>

      <p className="mt-1 text-[14px] text-[#4B5563] dark:text-[#9CA3AF]">
        {muscleGroupsText} • {totalExercises} exercícios
      </p>

      {/* Completion Progress Bar */}
      <div className="mt-5 pt-3 border-t border-[#F3F4F6] dark:border-[#202229]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
            {isComplete ? 'Treino Concluído' : 'Progresso do Dia'}
          </span>
          <span className="text-[12px] font-semibold text-[#111827] dark:text-[#F0F1F3] tabular-nums">
            {completedExercisesCount} de {totalExercises} concluídos ({percent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-[#F3F4F6] dark:bg-[#202229] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isComplete ? 'bg-[#0D9488]' : 'bg-[#111827] dark:bg-white'
            }`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};
