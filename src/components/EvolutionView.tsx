import React from 'react';
import { ArrowLeft, Share2, Sliders, Zap, CheckCircle2, Award, Calendar } from 'lucide-react';

interface EvolutionViewProps {
  onBackToToday: () => void;
  onOpenSettings: () => void;
}

export const EvolutionView: React.FC<EvolutionViewProps> = ({
  onBackToToday,
  onOpenSettings,
}) => {
  const [showShareToast, setShowShareToast] = React.useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'Evolução no TAF - Corpo de Bombeiros',
        text: 'Estou com 72% de prontidão geral no TAF do Corpo de Bombeiros Militar!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText('Evolução no TAF - Corpo de Bombeiros: 72% de prontidão geral no TAF do Corpo de Bombeiros Militar!');
      }
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between relative px-4 pt-3 pb-36">
      {/* Toast */}
      {showShareToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#111827] dark:bg-white text-white dark:text-[#111827] px-4 py-2 rounded-full text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-2">
          <CheckCircle2 size={14} className="text-[#0D9488]" />
          <span>Resumo copiado para a área de transferência!</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <header className="flex items-center justify-between w-full py-2 mb-1">
        <button
          onClick={onBackToToday}
          aria-label="Voltar"
          className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Compartilhar"
            className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={onOpenSettings}
            aria-label="Ajustes do Edital"
            className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform shadow-sm"
          >
            <Sliders size={18} />
          </button>
        </div>
      </header>

      {/* Page Title & Phase Chip */}
      <section className="mt-1 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] text-[12px] font-semibold border border-[#E5E7EB]/50 dark:border-[#2A2D35]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse"></span>
            Fase de Fortalecimento • 4 semanas restantes
          </span>
        </div>
        <h1 className="text-[28px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight">
          Minha Evolução
        </h1>
        <p className="text-[14px] text-[#4B5563] dark:text-[#9CA3AF]">
          Rumo ao índice mínimo de aprovação nos Bombeiros
        </p>
      </section>

      {/* Main Bento Grid Content */}
      <main className="flex flex-col gap-4">
        {/* Hero Stat Card: Prontidão Geral */}
        <section className="bg-white dark:bg-[#17181D] rounded-3xl p-6 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF] tracking-wider font-bold uppercase">
              PRONTIDÃO GERAL
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[11px] text-[#111827] dark:text-[#F0F1F3] font-semibold border border-[#E5E7EB]/50 dark:border-[#2A2D35]">
              TAF Bombeiros Militar
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[52px] leading-none text-[#111827] dark:text-[#F0F1F3] font-bold tracking-tight tabular-nums font-sans">
              72%
            </span>
            <span className="text-[15px] text-[#4B5563] dark:text-[#9CA3AF] font-medium">
              / 100%
            </span>
          </div>

          <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mb-4">
            Índice de prontidão calculada com base nos 4 testes oficiais exigidos
          </p>

          {/* Progress Bar & Indicator */}
          <div className="space-y-2">
            <div className="w-full bg-[#F3F4F6] dark:bg-[#202229] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#E5E7EB]/40 dark:border-[#2A2D35]">
              <div
                className="bg-[#111827] dark:bg-white h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: '72%' }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 text-[#4B5563] dark:text-[#9CA3AF]">
              <span>Pontuação Atual: 216 pts</span>
              <span className="font-semibold text-[#111827] dark:text-[#F0F1F3]">
                Meta mínima: 80% (Faltam 8%)
              </span>
            </div>
          </div>
        </section>

        {/* Two Column Bento Cards */}
        <section className="grid grid-cols-2 gap-3.5">
          {/* Left: Flexões */}
          <article className="bg-white dark:bg-[#17181D] rounded-3xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[13px] text-[#111827] dark:text-[#F0F1F3] font-semibold">
                  Flexões
                </span>
                <span className="inline-flex px-1.5 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] text-[10px] border border-[#E5E7EB]/40 dark:border-[#2A2D35] font-semibold">
                  +4 mês
                </span>
              </div>
              <div className="mb-1">
                <span className="text-[26px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight tabular-nums">
                  14
                </span>
                <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] ml-1">
                  reps
                </span>
              </div>
              <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                Meta TAF: 20 reps
              </p>
            </div>
            <div className="mt-4">
              <div className="w-full bg-[#F3F4F6] dark:bg-[#202229] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#111827] dark:bg-white h-full rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-[10px] text-[#4B5563] dark:text-[#9CA3AF] mt-1 text-right font-medium">
                70% do índice
              </p>
            </div>
          </article>

          {/* Right: Corrida 12 min */}
          <article className="bg-white dark:bg-[#17181D] rounded-3xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[13px] text-[#111827] dark:text-[#F0F1F3] font-semibold">
                  Corrida 12m
                </span>
                <span className="inline-flex px-1.5 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] text-[10px] border border-[#E5E7EB]/40 dark:border-[#2A2D35] font-semibold">
                  Pace 5'28"
                </span>
              </div>
              <div className="mb-1">
                <span className="text-[26px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight tabular-nums">
                  1.8
                </span>
                <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] ml-1">
                  km
                </span>
              </div>
              <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                Meta: 2.2 km
              </p>
            </div>
            <div className="mt-4">
              <div className="w-full bg-[#F3F4F6] dark:bg-[#202229] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#111827] dark:bg-white h-full rounded-full" style={{ width: '81%' }}></div>
              </div>
              <p className="text-[10px] text-[#4B5563] dark:text-[#9CA3AF] mt-1 text-right font-medium">
                81% do índice
              </p>
            </div>
          </article>
        </section>

        {/* Additional Detail Card: Abdominais & Barra Fixa */}
        <section className="bg-white dark:bg-[#17181D] rounded-3xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] transition-colors divide-y divide-[#F3F4F6] dark:divide-[#202229]">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#111827] dark:bg-white"></span>
              <div>
                <h2 className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
                  Abdominal Remador
                </h2>
                <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                  Tempo limite: 60s
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                32
              </span>
              <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                / 35 reps
              </span>
              <p className="text-[10px] text-[#0D9488] font-semibold">Faltam 3 reps</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#9CA3AF]"></span>
              <div>
                <h2 className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
                  Barra Fixa / Isometria
                </h2>
                <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                  Sustentação pronada
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                22
              </span>
              <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                / 30 seg
              </span>
              <p className="text-[10px] text-[#0D9488] font-semibold">Faltam 8 seg</p>
            </div>
          </div>
        </section>

        {/* Consistency Line Chart Card */}
        <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight">
                Consistência Semanal
              </h2>
              <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                Volume e regularidade nas últimas 4 semanas
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[11px] text-[#111827] dark:text-[#F0F1F3] font-semibold border border-[#E5E7EB]/40 dark:border-[#2A2D35]">
              94% adesão
            </span>
          </div>

          {/* SVG Sparkline Chart */}
          <div className="relative w-full h-32 pt-2">
            <div className="absolute inset-x-0 top-3 border-b border-[#F3F4F6] dark:border-[#202229] border-dashed"></div>
            <div className="absolute inset-x-0 top-14 border-b border-[#F3F4F6] dark:border-[#202229] border-dashed"></div>
            <div className="absolute inset-x-0 bottom-6 border-b border-[#E5E7EB] dark:border-[#2A2D35]"></div>

            <svg className="w-full h-24 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 300 90">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gradient Area Fill */}
              <path d="M 15 72 L 95 54 L 185 36 L 275 14 L 275 80 L 15 80 Z" fill="url(#chartGradient)" />

              {/* Trajectory Trend Line */}
              <path
                d="M 15 72 L 95 54 L 185 36 L 275 14"
                stroke="currentColor"
                className="text-[#111827] dark:text-white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />

              {/* Point Dots */}
              <circle cx="15" cy="72" className="fill-white dark:fill-[#17181D] stroke-[#111827] dark:stroke-white" r="3.5" strokeWidth="2" />
              <circle cx="95" cy="54" className="fill-white dark:fill-[#17181D] stroke-[#111827] dark:stroke-white" r="3.5" strokeWidth="2" />
              <circle cx="185" cy="36" className="fill-white dark:fill-[#17181D] stroke-[#111827] dark:stroke-white" r="3.5" strokeWidth="2" />
              <circle cx="275" cy="14" className="fill-[#0D9488] stroke-white dark:stroke-[#111827]" r="5" strokeWidth="2.5" />
            </svg>

            <div className="flex justify-between items-center px-1 text-[11px] text-[#4B5563] dark:text-[#9CA3AF] mt-1">
              <span>Sem 1</span>
              <span>Sem 2</span>
              <span>Sem 3</span>
              <span className="text-[#111827] dark:text-[#F0F1F3] font-semibold">Sem 4</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F3F4F6] dark:border-[#202229] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
              <Zap size={15} className="text-[#0D9488]" />
              <span>4.2 treinos/sem média</span>
            </div>
            <span className="text-[12px] text-[#111827] dark:text-[#F0F1F3] font-semibold">
              Meta cumprida
            </span>
          </div>
        </section>

        {/* Motivational Tip Banner */}
        <section className="bg-[#F3F4F6] dark:bg-[#202229] rounded-3xl p-4 border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center gap-3 transition-colors">
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#17181D] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] shrink-0 shadow-sm">
            <CheckCircle2 size={18} className="text-[#0D9488]" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
              Próximo simulado em 5 dias
            </p>
            <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
              Foco recomendado: cadência de passadas na corrida.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
