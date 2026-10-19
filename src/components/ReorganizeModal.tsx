import React, { useState } from 'react';
import { Exercise } from '../types';
import { X, ArrowUp, ArrowDown, Check } from 'lucide-react';

interface ReorganizeModalProps {
  exercises: Exercise[];
  onClose: () => void;
  onSaveOrder: (orderedExercises: Exercise[]) => void;
}

export const ReorganizeModal: React.FC<ReorganizeModalProps> = ({
  exercises,
  onClose,
  onSaveOrder,
}) => {
  const [list, setList] = useState<Exercise[]>([...exercises]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...list];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setList(updated);
  };

  const moveDown = (index: number) => {
    if (index === list.length - 1) return;
    const updated = [...list];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setList(updated);
  };

  const handleSave = () => {
    onSaveOrder(list);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#17181D] rounded-3xl p-6 w-full max-w-sm border border-[#E5E7EB] dark:border-[#2A2D35] shadow-2xl space-y-4 transition-colors">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-[#111827] dark:text-[#F0F1F3]">
            Reorganizar Ordem
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#4B5563] dark:text-[#9CA3AF]"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
          Ajuste a sequência dos exercícios no seu dia de treino:
        </p>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {list.map((ex, idx) => (
            <div
              key={ex.id}
              className="p-3 bg-[#F4F5F7] dark:bg-[#202229] rounded-2xl flex items-center justify-between border border-[#E5E7EB] dark:border-[#2A2D35]"
            >
              <div className="flex items-center gap-2.5 truncate pr-2">
                <span className="w-6 h-6 rounded-full bg-white dark:bg-[#17181D] flex items-center justify-center text-xs font-bold text-[#111827] dark:text-[#F0F1F3] shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3] truncate">
                  {ex.name}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  disabled={idx === 0}
                  onClick={() => moveUp(idx)}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#17181D] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] disabled:opacity-30 border border-[#E5E7EB] dark:border-[#2A2D35]"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  disabled={idx === list.length - 1}
                  onClick={() => moveDown(idx)}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#17181D] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] disabled:opacity-30 border border-[#E5E7EB] dark:border-[#2A2D35]"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm text-[#4B5563] dark:text-[#9CA3AF] rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-semibold text-white dark:text-[#111827] bg-[#111827] dark:bg-white rounded-full shadow-sm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
