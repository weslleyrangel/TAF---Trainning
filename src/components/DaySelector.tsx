import React from 'react';
import { WorkoutDay } from '../types';
import { Check } from 'lucide-react';

interface DaySelectorProps {
  days: WorkoutDay[];
  selectedDate: string;
  onSelectDay: (date: string) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  selectedDate,
  onSelectDay,
}) => {
  return (
    <div className="px-4 pt-1 pb-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
      {days.map((day) => {
        const isSelected = day.date === selectedDate;
        const isFullyCompleted =
          day.exerciseIds.length > 0 &&
          day.completedExerciseIds.length >= day.exerciseIds.length;

        if (isSelected) {
          return (
            <button
              key={day.date}
              onClick={() => onSelectDay(day.date)}
              className="flex flex-col items-center gap-1 min-w-[54px] py-2 px-1.5 rounded-2xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-md shadow-[#111827]/10 dark:shadow-white/10 active:scale-95 transition-transform"
            >
              <span className="text-[11px] font-semibold text-[#E5E7EB] dark:text-[#374151]">
                {day.dayLabel}
              </span>
              <div className="w-7 h-7 rounded-full bg-white dark:bg-[#111827] text-[#111827] dark:text-white font-bold text-xs flex items-center justify-center">
                {day.dayNumber}
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>
            </button>
          );
        }

        return (
          <button
            key={day.date}
            onClick={() => onSelectDay(day.date)}
            className={`flex flex-col items-center gap-1 min-w-[54px] py-2 px-1.5 rounded-2xl border transition-all active:scale-95 ${
              isFullyCompleted
                ? 'bg-white dark:bg-[#17181D] border-[#E5E7EB] dark:border-[#2A2D35] opacity-85'
                : 'bg-white/70 dark:bg-[#17181D]/60 border-[#E5E7EB]/60 dark:border-[#2A2D35]/40 hover:bg-white dark:hover:bg-[#17181D]'
            }`}
          >
            <span className="text-[11px] font-semibold text-[#4B5563] dark:text-[#9CA3AF]">
              {day.dayLabel}
            </span>
            <div className="w-7 h-7 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center">
              {isFullyCompleted ? (
                <Check size={14} className="text-[#0D9488] stroke-[2.5]" />
              ) : (
                <span className="text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                  {day.dayNumber}
                </span>
              )}
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-transparent"></span>
          </button>
        );
      })}
    </div>
  );
};
