import React, { useState, useMemo } from 'react';
import { Apple, RotateCcw, Droplets, Dumbbell, Zap, Moon, Flame } from 'lucide-react';

export interface NutritionTip {
  id: string;
  category: 'Proteína & Fibras' | 'Hidratação' | 'Glicogênio' | 'Articulações & Sono' | 'Potência & Força';
  title: string;
  description: string;
  tafTarget: string; // e.g. "Barra Fixa & Flexões", "Corrida 12 min", "Abdominal Remador"
  iconType: 'protein' | 'water' | 'energy' | 'sleep' | 'flame';
}

const TAF_NUTRITION_TIPS: NutritionTip[] = [
  {
    id: 'tip-1',
    category: 'Proteína & Fibras',
    title: 'Janela de Reparação Muscular',
    description:
      'Consuma de 25g a 30g de proteína de alto valor biológico (ovos, frango, iogurte ou whey) até 1h após as séries de barras e flexões para reconstruir microlesões nos dorsais e tríceps.',
    tafTarget: 'Barra Fixa & Flexões',
    iconType: 'protein',
  },
  {
    id: 'tip-2',
    category: 'Hidratação',
    title: 'Prevenção de Cãibras na Pista',
    description:
      'Beba 500ml de água com uma pitada de sal integral ou isotônico 40 minutos antes do treino de corrida para equilibrar sódio e potássio, prevenindo fadiga diafragmática e cãibras na panturrilha.',
    tafTarget: 'Corrida 12 min',
    iconType: 'water',
  },
  {
    id: 'tip-3',
    category: 'Glicogênio',
    title: 'Recarga Muscular Rápida',
    description:
      'A corrida contínua de 12 min esgota o glicogênio. Carboidratos complexos (batata-doce, aveia, arroz) combinados com fruta aceleram a recuperação para a sessão do dia seguinte.',
    tafTarget: 'Resistência Aeróbica',
    iconType: 'energy',
  },
  {
    id: 'tip-4',
    category: 'Potência & Força',
    title: 'Creatina para as Reps Finais',
    description:
      '3g a 5g de creatina diária aumentam os estoques de fosfocreatina nas fibras de contração rápida, garantindo força explosiva nas últimas 5 repetições do abdominal remador e da barra.',
    tafTarget: 'Abdominal Remador',
    iconType: 'flame',
  },
  {
    id: 'tip-5',
    category: 'Articulações & Sono',
    title: 'Magnésio contra Tendinites',
    description:
      'O impacto da corrida e a pegada na barra sobrecarregam punhos e canelas. Alimentos ricos em magnésio e ômega-3 reduzem inflamações articulares e aprofundam o sono anabólico.',
    tafTarget: 'Prevenção de Canelite',
    iconType: 'sleep',
  },
  {
    id: 'tip-6',
    category: 'Glicogênio',
    title: 'Combustível Pré-Treino Leve',
    description:
      '90 minutos antes do simulado, consuma 1 banana amassada com 1 colher de mel e aveia: digestão suave, glicose estável no sangue e zero desconforto gástrico durante os tiros.',
    tafTarget: 'Simulado Completo',
    iconType: 'energy',
  },
];

interface NutritionTipCardProps {
  dayDate?: string;
}

export const NutritionTipCard: React.FC<NutritionTipCardProps> = ({ dayDate }) => {
  // Deterministic initial index based on the date string
  const initialIndex = useMemo(() => {
    if (!dayDate) return 0;
    const charCodeSum = dayDate.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return charCodeSum % TAF_NUTRITION_TIPS.length;
  }, [dayDate]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % TAF_NUTRITION_TIPS.length);
  };

  const tip = TAF_NUTRITION_TIPS[currentIndex];

  const getTipIcon = () => {
    switch (tip.iconType) {
      case 'water':
        return <Droplets size={16} className="text-[#0D9488]" />;
      case 'protein':
        return <Dumbbell size={16} className="text-[#111827] dark:text-[#F0F1F3]" />;
      case 'flame':
        return <Flame size={16} className="text-amber-500 fill-amber-500/20" />;
      case 'sleep':
        return <Moon size={16} className="text-indigo-400" />;
      case 'energy':
      default:
        return <Zap size={16} className="text-[#0D9488]" />;
    }
  };

  return (
    <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] transition-colors relative overflow-hidden group">
      {/* Background watermark icon */}
      <div className="absolute -right-3 -bottom-3 text-[#F3F4F6] dark:text-[#202229] pointer-events-none select-none opacity-40 group-hover:opacity-60 transition-opacity">
        <Apple size={96} />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center border border-[#E5E7EB]/50 dark:border-[#2A2D35]">
            {getTipIcon()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[14px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight leading-tight">
                Dica Nutricional do Dia
              </h3>
            </div>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              Recuperação Muscular • TAF Bombeiros
            </p>
          </div>
        </div>

        {/* Rotate tip action */}
        <button
          onClick={handleNextTip}
          className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB]/50 dark:border-[#2A2D35] flex items-center justify-center text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white active:scale-90 transition-transform shadow-xs"
          title="Ver outra dica de nutrição"
          aria-label="Ver outra dica"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
            {tip.title}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
            {tip.category}
          </span>
        </div>

        <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] leading-relaxed">
          {tip.description}
        </p>

        {/* Target workout impact pill */}
        <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
          <span className="font-semibold text-[#111827] dark:text-[#F0F1F3]">Impacto no TAF:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB]/50 dark:border-[#2A2D35] text-[#111827] dark:text-[#F0F1F3] font-medium text-[11px]">
            {tip.tafTarget}
          </span>
        </div>
      </div>
    </section>
  );
};
