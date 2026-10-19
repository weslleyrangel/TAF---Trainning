import React from 'react';
import { CalendarRange, Flame, TrendingUp } from 'lucide-react';

interface BentoMetricsProps {
  completedWeekly: number;
  targetWeekly: number;
  streakDays: number;
  isTodayDone: boolean;
  onIncrementWeekly?: () => void;
}

export const BentoMetrics: React.FC<BentoMetricsProps> = ({
  completedWeekly,
  targetWeekly,
  streakDays,
  isTodayDone,
}) => {
  return (
    <section className="grid grid-cols-2 gap-3">
      {/* Bento Left: Meta Semanal */}
      <div className="bg-white dark:bg-[#17181D] rounded-2xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
            Meta Semanal
          </span>
          <CalendarRange size={16} className="text-[#4B5563] dark:text-[#9CA3AF]" />
        </div>

        <div className="mt-3">
          <div className="text-[20px] font-bold text-[#111827] dark:text-[#F0F1F3] tabular-nums font-sans">
            {completedWeekly} / {targetWeekly}
          </div>
          <div className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
            treinos feitos
          </div>
        </div>

        {/* Weekly Completion Dots */}
        <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-[#F3F4F6] dark:border-[#202229]">
          {Array.from({ length: targetWeekly }).map((_, i) => {
            const isDone = i < completedWeekly;
            return (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  isDone
                    ? 'bg-[#111827] dark:bg-white'
                    : 'bg-[#E5E7EB] dark:bg-[#2A2D35]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Bento Right: Constância / Streak */}
      <div className="bg-white dark:bg-[#17181D] rounded-2xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
            Constância
          </span>
          <Flame size={17} className="text-[#111827] dark:text-amber-400 fill-current" />
        </div>

        <div className="mt-3">
          <div className="text-[20px] font-bold text-[#111827] dark:text-[#F0F1F3] tabular-nums font-sans">
            {streakDays} dias
          </div>
          <div className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
            streak ativo
          </div>
        </div>

        <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-[#F3F4F6] dark:border-[#202229]">
          <span className="text-[11px] text-[#0D9488] font-semibold inline-flex items-center gap-1">
            <TrendingUp size={13} />
            {isTodayDone ? 'Treino computado!' : '+1 dia hoje ao concluir'}
          </span>
        </div>
      </div>
    </section>
  );
};
