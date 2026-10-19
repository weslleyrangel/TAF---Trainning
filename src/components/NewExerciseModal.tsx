import React, { useState } from 'react';
import { Exercise, ExerciseCategory, MetricType } from '../types';
import { X, Minus, Plus, Timer, Check, Dumbbell, HeartPulse } from 'lucide-react';

interface NewExerciseModalProps {
  initialExercise?: Exercise | null;
  onClose: () => void;
  onSaveExercise: (exercise: Exercise) => void;
}

const COMMON_SUGGESTIONS = [
  'Flexão de Braço',
  'Barra Fixa',
  'Abdominal Remador',
  'Corrida 12 min',
  'Prancha Isométrica',
  'Natação 50m',
];

const REST_PRESETS = [30, 45, 60, 90, 120];

export const NewExerciseModal: React.FC<NewExerciseModalProps> = ({
  initialExercise,
  onClose,
  onSaveExercise,
}) => {
  const [name, setName] = useState(initialExercise?.name || 'Flexão de Braço (TAF Padrão)');
  const [metricType, setMetricType] = useState<MetricType>(initialExercise?.metricType || 'reps');
  const [sets, setSets] = useState(initialExercise?.targetSets || 3);
  const [reps, setReps] = useState(initialExercise?.targetReps || 8);
  const [restSeconds, setRestSeconds] = useState(initialExercise?.defaultRestSeconds || 60);
  const [focusType, setFocusType] = useState<'forca' | 'resistencia'>(
    initialExercise?.focusType || 'forca'
  );
  const [category, setCategory] = useState<ExerciseCategory>(
    initialExercise?.category || 'Membros Superiores'
  );

  const handleSave = () => {
    if (!name.trim()) return;

    const savedExercise: Exercise = {
      id: initialExercise?.id || `ex-${Date.now()}`,
      name: name.trim(),
      category,
      metricType,
      targetSets: sets,
      targetReps: reps,
      unitLabel: metricType === 'distance' ? 'm' : metricType === 'time' ? 'seg' : 'reps',
      defaultRestSeconds: restSeconds,
      focusType,
      muscleGroup:
        category === 'Core / Abdômen'
          ? 'Abdômen & Core'
          : category === 'Resistência Aeróbica'
          ? 'Cardiorrespiratório'
          : 'Peitoral, Tríceps & Dorsais',
      iconName:
        category === 'Resistência Aeróbica'
          ? 'directions_run'
          : category === 'Core / Abdômen'
          ? 'sports_gymnastics'
          : 'fitness_center',
      personalRecord: initialExercise?.personalRecord || {
        value: reps,
        unit: metricType === 'distance' ? 'm' : metricType === 'time' ? 'seg' : 'reps',
        achievedAt: 'Hoje',
        deltaVsPreviousMonth: 'Novo registro',
      },
      monthlyVolume: initialExercise?.monthlyVolume || sets * reps,
      monthlyGrowthPercent: initialExercise?.monthlyGrowthPercent || 10,
      tafTarget: initialExercise?.tafTarget || {
        value: reps * 1.5,
        description: 'Meta padrão sugerida',
      },
    };

    onSaveExercise(savedExercise);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F5F7] dark:bg-[#0D0E11] text-[#191C1E] dark:text-[#F0F1F3] overflow-y-auto min-h-screen flex justify-center selection:bg-[#111827]">
      <div className="w-full max-w-md min-h-screen relative flex flex-col pb-36">
        {/* Grab Handle */}
        <div className="w-full pt-3 pb-1 flex justify-center items-center sticky top-0 z-50 bg-[#F4F5F7]/95 dark:bg-[#0D0E11]/95 backdrop-blur-sm">
          <div className="w-9 h-1 bg-[#E5E7EB] dark:bg-[#2A2D35] rounded-full"></div>
        </div>

        {/* Modal Header */}
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
              {initialExercise ? 'Editar Exercício' : 'Novo Exercício'}
            </h1>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              Adicionar à rotina de treino
            </p>
          </div>

          <button
            onClick={handleSave}
            className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3] hover:opacity-80 active:scale-95 transition-all px-2 py-1"
          >
            Salvar
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 space-y-4 pt-3">
          {/* Card 1: Nome do Exercício */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] dark:border-[#2A2D35] transition-colors">
            <label className="block text-[11px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase tracking-wider mb-2">
              NOME DO EXERCÍCIO
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Flexão de Braço, Barra Fixa, Corrida..."
              className="w-full bg-white dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] rounded-full px-4 py-2.5 text-[14px] text-[#111827] dark:text-[#F0F1F3] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#111827] dark:focus:ring-white transition-all"
            />

            {/* Recommendation Chips */}
            <div className="mt-3.5 pt-1">
              <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF] block mb-2 font-medium">
                Sugestões comuns:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setName(sug)}
                    className="px-3 py-1 bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] text-[12px] rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] hover:bg-[#E5E7EB] dark:hover:bg-[#2A2D35] active:scale-95 transition-all"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Card 2: Tipo de Medição */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] dark:border-[#2A2D35] transition-colors">
            <h2 className="text-[11px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase tracking-wider mb-2">
              TIPO DE MEDIÇÃO
            </h2>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F3F4F6] dark:bg-[#202229] rounded-full border border-[#E5E7EB] dark:border-[#2A2D35]">
              {(['reps', 'time', 'distance'] as MetricType[]).map((type) => {
                const isSelected = metricType === type;
                const label = type === 'reps' ? 'Repetições' : type === 'time' ? 'Tempo / Iso' : 'Distância';
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMetricType(type)}
                    className={`py-2 px-1 rounded-full text-[12px] font-semibold text-center transition-all ${
                      isSelected
                        ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
                        : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Card 3: Meta Padrão por Sessão */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] dark:border-[#2A2D35] transition-colors">
            <h2 className="text-[11px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase tracking-wider mb-3">
              META PADRÃO POR SESSÃO
            </h2>
            <div className="grid grid-cols-2 gap-4 divide-x divide-[#F3F4F6] dark:divide-[#202229]">
              {/* Séries */}
              <div className="flex flex-col items-center pr-2">
                <span className="text-[11px] font-semibold text-[#4B5563] dark:text-[#9CA3AF] tracking-wide uppercase mb-1">
                  SÉRIES
                </span>
                <div className="flex items-center gap-3 my-1">
                  <button
                    type="button"
                    onClick={() => setSets((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] bg-white dark:bg-[#17181D] active:scale-90 transition-all shadow-xs"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="text-[28px] font-bold text-[#111827] dark:text-[#F0F1F3] tabular-nums font-sans">
                    {sets}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSets((prev) => prev + 1)}
                    className="w-8 h-8 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] bg-white dark:bg-[#17181D] active:scale-90 transition-all shadow-xs"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-0.5">
                  Sessões TAF
                </span>
              </div>

              {/* Repetições / Meta */}
              <div className="flex flex-col items-center pl-2">
                <span className="text-[11px] font-semibold text-[#4B5563] dark:text-[#9CA3AF] tracking-wide uppercase mb-1">
                  {metricType === 'time' ? 'SEGUNDOS' : metricType === 'distance' ? 'METROS' : 'REPETIÇÕES'}
                </span>
                <div className="flex items-center gap-3 my-1">
                  <button
                    type="button"
                    onClick={() => setReps((prev) => Math.max(1, prev - (metricType === 'distance' ? 100 : 1)))}
                    className="w-8 h-8 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] bg-white dark:bg-[#17181D] active:scale-90 transition-all shadow-xs"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="text-[28px] font-bold text-[#111827] dark:text-[#F0F1F3] tabular-nums font-sans">
                    {reps}
                  </span>
                  <button
                    type="button"
                    onClick={() => setReps((prev) => prev + (metricType === 'distance' ? 100 : 1))}
                    className="w-8 h-8 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] bg-white dark:bg-[#17181D] active:scale-90 transition-all shadow-xs"
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-0.5">
                  Por série
                </span>
              </div>
            </div>
          </section>

          {/* Card 4: Descanso entre Séries */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] dark:border-[#2A2D35] transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Timer size={16} className="text-[#4B5563] dark:text-[#9CA3AF]" />
              <h2 className="text-[11px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase tracking-wider">
                DESCANSO ENTRE SÉRIES
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {REST_PRESETS.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setRestSeconds(sec)}
                  className={`py-2 rounded-full text-[12px] font-bold text-center transition-all ${
                    restSeconds === sec
                      ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-xs'
                      : 'border border-[#E5E7EB] dark:border-[#2A2D35] text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF] mt-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] inline-block"></span>
              Intervalo sugerido para recuperação metabólica no TAF.
            </p>
          </section>

          {/* Card 5: Categoria do Teste */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] dark:border-[#2A2D35] transition-colors">
            <h2 className="text-[11px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase tracking-wider mb-2.5">
              CATEGORIA DO TESTE (TAF)
            </h2>
            <div className="flex flex-wrap gap-2">
              {(['Membros Superiores', 'Core / Abdômen', 'Resistência Aeróbica'] as ExerciseCategory[]).map(
                (cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-xs'
                          : 'border border-[#E5E7EB] dark:border-[#2A2D35] text-[#111827] dark:text-[#F0F1F3] bg-[#F3F4F6] dark:bg-[#202229] hover:bg-[#E5E7EB]'
                      }`}
                    >
                      {isSelected && <Check size={14} className="stroke-[2.5]" />}
                      <span>{cat}</span>
                    </button>
                  );
                }
              )}
            </div>
          </section>

          {/* Card 6: Foco Metabólico (Bento) */}
          <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] border border-[#E5E7EB] dark:border-[#2A2D35] transition-colors">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-[11px] font-bold text-[#4B5563] dark:text-[#9CA3AF] uppercase tracking-wider">
                FOCO METABÓLICO (BENTO)
              </h2>
              <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                Dica visual no card
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setFocusType('forca')}
                className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold transition-all active:scale-95 ${
                  focusType === 'forca'
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
                    : 'bg-[#F3F4F6] dark:bg-[#202229] text-[#4B5563] dark:text-[#9CA3AF] border border-[#E5E7EB] dark:border-[#2A2D35]'
                }`}
              >
                <Dumbbell size={16} />
                <span>Força</span>
              </button>

              <button
                type="button"
                onClick={() => setFocusType('resistencia')}
                className={`p-3.5 rounded-2xl flex items-center justify-center gap-2 text-[13px] font-bold transition-all active:scale-95 ${
                  focusType === 'resistencia'
                    ? 'bg-[#0D9488] text-white shadow-sm shadow-[#0D9488]/30'
                    : 'bg-[#F3F4F6] dark:bg-[#202229] text-[#4B5563] dark:text-[#9CA3AF] border border-[#E5E7EB] dark:border-[#2A2D35]'
                }`}
              >
                <HeartPulse size={16} />
                <span>Resistência</span>
              </button>
            </div>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF] mt-2 text-center">
              {focusType === 'forca'
                ? 'Treino focado em recrutamento neuromuscular e potência máxima.'
                : 'Treino focado em sustentação contínua e resistência aeróbica/muscular.'}
            </p>
          </section>
        </main>

        {/* Bottom Fixed Action Bar */}
        <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-4 pt-3 pb-6 bg-white/95 dark:bg-[#17181D]/95 backdrop-blur-md border-t border-[#E5E7EB]/50 dark:border-[#2A2D35]/50">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="w-full h-12 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full text-[14px] font-bold tracking-tight active:scale-[0.98] transition-all flex items-center justify-center shadow-md"
            >
              Salvar Exercício
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-center text-[12px] font-medium text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
            >
              Descartar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
