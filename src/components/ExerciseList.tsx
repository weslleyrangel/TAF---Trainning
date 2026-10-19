import React from 'react';
import { Exercise } from '../types';
import { Check, Dumbbell, Activity, Zap, Shuffle, HeartPulse } from 'lucide-react';

interface ExerciseListProps {
  exercises: Exercise[];
  completedExerciseIds: string[];
  onToggleExerciseComplete: (exerciseId: string) => void;
  onSelectExercise: (exercise: Exercise) => void;
  onReorganize: () => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  completedExerciseIds,
  onToggleExerciseComplete,
  onSelectExercise,
  onReorganize,
}) => {
  const getCategoryIcon = (iconName: string, category: string) => {
    switch (iconName) {
      case 'fitness_center':
      case 'dumbbell':
        return <Dumbbell size={22} />;
      case 'self_improvement':
      case 'sports_gymnastics':
        return <Activity size={22} />;
      case 'directions_run':
        return <Zap size={22} />;
      default:
        if (category === 'Resistência Aeróbica') return <Zap size={22} />;
        if (category === 'Core / Abdômen') return <Activity size={22} />;
        return <Dumbbell size={22} />;
    }
  };

  return (
    <section className="space-y-3 pt-2">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
            Exercícios
          </h2>
          <span className="bg-[#E5E7EB] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] text-[12px] px-2 py-0.5 rounded-full font-semibold">
            {exercises.length}
          </span>
        </div>
        <button
          onClick={onReorganize}
          className="text-[13px] font-medium text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white transition-colors flex items-center gap-1 active:scale-95"
        >
          <Shuffle size={14} />
          <span>Reorganizar</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {exercises.map((exercise) => {
          const isCompleted = completedExerciseIds.includes(exercise.id);
          const isStrength = exercise.focusType === 'forca';

          return (
            <div
              key={exercise.id}
              className={`bg-white dark:bg-[#17181D] rounded-2xl p-4 border transition-all flex items-center justify-between shadow-[0_4px_20px_-2px_rgba(0,0,0,0.03)] cursor-pointer group ${
                isCompleted
                  ? 'border-[#E5E7EB] dark:border-[#2A2D35]'
                  : 'border-[#E5E7EB] dark:border-[#2A2D35] hover:border-[#9CA3AF] dark:hover:border-[#4B5563]'
              }`}
            >
              {/* Left: Icon & Info with Bento Visual Cue */}
              <div
                className="flex items-center gap-3.5 flex-1 min-w-0"
                onClick={() => onSelectExercise(exercise)}
              >
                {/* Exercise Icon with Micro Indicator */}
                <div className="relative w-12 h-12 rounded-2xl bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center shrink-0 border border-[#E5E7EB]/40 dark:border-[#2A2D35] text-[#111827] dark:text-[#F0F1F3] group-hover:scale-105 transition-transform">
                  {getCategoryIcon(exercise.iconName, exercise.category)}

                  {/* Bento Micro-Badge */}
                  <span
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-[#17181D] shadow-xs text-[9px] ${
                      isStrength
                        ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827]'
                        : 'bg-[#0D9488] text-white'
                    }`}
                    title={isStrength ? 'Foco: Força' : 'Foco: Resistência'}
                  >
                    {isStrength ? (
                      <Dumbbell size={8} />
                    ) : (
                      <HeartPulse size={8} />
                    )}
                  </span>
                </div>

                <div className="truncate pr-2">
                  {/* Title and Bento Pill Tag */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-[#111827] dark:text-[#F0F1F3] truncate">
                      {exercise.name}
                    </h3>

                    {/* Subtle Bento Visual Cue */}
                    {isStrength ? (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] border border-[#E5E7EB] dark:border-[#2A2D35] shrink-0">
                        <Dumbbell size={9} className="stroke-[2.5]" />
                        <span>Força</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#0D9488]/10 dark:bg-[#0D9488]/15 text-[#0D9488] border border-[#0D9488]/20 shrink-0">
                        <HeartPulse size={9} className="stroke-[2.5]" />
                        <span>Resistência</span>
                      </span>
                    )}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-0.5">
                    <span>
                      {exercise.targetSets} {exercise.metricType === 'distance' ? 'série' : 'séries'} ×{' '}
                      {exercise.metricType === 'distance'
                        ? `${exercise.targetReps}m`
                        : exercise.metricType === 'time'
                        ? `${exercise.targetReps} seg`
                        : `${exercise.targetReps} reps`}
                    </span>
                    <span className="text-[#9CA3AF] dark:text-[#6B7280]">·</span>
                    <span className="text-[11px] truncate">{exercise.muscleGroup}</span>
                  </div>
                </div>
              </div>

              {/* Right: Toggle Checkmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExerciseComplete(exercise.id);
                }}
                aria-label={isCompleted ? 'Desmarcar exercício' : 'Concluir exercício'}
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all ${
                  isCompleted
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
                    : 'bg-white dark:bg-[#17181D] border-2 border-[#E5E7EB] dark:border-[#2A2D35] text-transparent hover:border-[#111827] dark:hover:border-white'
                }`}
              >
                <Check size={16} className="stroke-[2.5]" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
