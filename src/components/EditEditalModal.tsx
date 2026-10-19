import React, { useState } from 'react';
import { TAFEditalGoal } from '../types';
import { X, Check } from 'lucide-react';

interface EditEditalModalProps {
  goals: TAFEditalGoal[];
  onClose: () => void;
  onSaveGoals: (goals: TAFEditalGoal[]) => void;
}

export const EditEditalModal: React.FC<EditEditalModalProps> = ({
  goals,
  onClose,
  onSaveGoals,
}) => {
  const [editedGoals, setEditedGoals] = useState<TAFEditalGoal[]>([...goals]);

  const handleUpdateGoalValue = (id: string, value: number) => {
    setEditedGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, targetValue: Math.max(1, value) } : g))
    );
  };

  const handleUpdateDescription = (id: string, desc: string) => {
    setEditedGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, requirementDescription: desc } : g))
    );
  };

  const handleSave = () => {
    onSaveGoals(editedGoals);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F5F7] dark:bg-[#0D0E11] text-[#191C1E] dark:text-[#F0F1F3] overflow-y-auto min-h-screen flex justify-center selection:bg-[#111827]">
      <div className="w-full max-w-md min-h-screen relative flex flex-col pb-36">
        {/* Grab Handle */}
        <div className="w-full pt-3 pb-1 flex justify-center items-center sticky top-0 z-50 bg-[#F4F5F7]/95 dark:bg-[#0D0E11]/95 backdrop-blur-sm">
          <div className="w-9 h-1 bg-[#E5E7EB] dark:bg-[#2A2D35] rounded-full"></div>
        </div>

        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 z-40 bg-[#F4F5F7] dark:bg-[#0D0E11] border-b border-[#E5E7EB]/50 dark:border-[#2A2D35]/50">
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] shadow-sm active:scale-95 transition-all"
          >
            <X size={17} />
          </button>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-[17px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight">
              Critérios do Edital
            </h1>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              Corpo de Bombeiros Militar
            </p>
          </div>

          <button
            onClick={handleSave}
            className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3] hover:opacity-80 active:scale-95 transition-all px-2 py-1"
          >
            Salvar
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 space-y-4 pt-3">
          <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] px-1">
            Ajuste os valores mínimos exigidos de acordo com o edital do seu concurso ou estado:
          </p>

          <div className="space-y-3">
            {editedGoals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white dark:bg-[#17181D] rounded-3xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] space-y-2.5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                    {goal.exerciseName}
                  </span>
                  <span className="text-[11px] font-medium text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] px-2.5 py-0.5 rounded-full border border-[#E5E7EB]/40 dark:border-[#2A2D35]">
                    {goal.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase block mb-1">
                      Índice Mínimo ({goal.unit})
                    </label>
                    <input
                      type="number"
                      value={goal.targetValue}
                      onChange={(e) => handleUpdateGoalValue(goal.id, parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] rounded-xl px-3 py-2 text-[14px] font-bold text-[#111827] dark:text-[#F0F1F3] focus:outline-none focus:ring-2 focus:ring-[#111827] dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase block mb-1">
                      Regra / Observação
                    </label>
                    <input
                      type="text"
                      value={goal.requirementDescription}
                      onChange={(e) => handleUpdateDescription(goal.id, e.target.value)}
                      className="w-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] rounded-xl px-3 py-2 text-[12px] text-[#111827] dark:text-[#F0F1F3] focus:outline-none focus:ring-2 focus:ring-[#111827] dark:focus:ring-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-4 pt-3 pb-6 bg-white/95 dark:bg-[#17181D]/95 backdrop-blur-md border-t border-[#E5E7EB]/50 dark:border-[#2A2D35]/50">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full h-12 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full text-[14px] font-bold tracking-tight active:scale-[0.98] transition-all flex items-center justify-center shadow-md"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-center text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            >
              Cancelar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
