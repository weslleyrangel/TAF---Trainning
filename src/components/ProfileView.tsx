import React, { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Biometrics, TAFEditalGoal } from '../types';
import { calculateBMI, StorageService } from '../services/storage';
import {
  ShieldCheck,
  Lock,
  Minus,
  Plus,
  Edit2,
  Scale,
  Download,
  Upload,
  RotateCcw,
  Sliders,
  ChevronRight,
  Dumbbell,
  Activity,
  Zap,
  Sun,
  Moon,
} from 'lucide-react';

interface ProfileViewProps {
  biometrics: Biometrics;
  editalGoals: TAFEditalGoal[];
  onUpdateBiometrics: (bio: Biometrics) => void;
  onOpenEditEdital: () => void;
  onDataReset: () => void;
  onBackupImported: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  biometrics,
  editalGoals,
  onUpdateBiometrics,
  onOpenEditEdital,
  onDataReset,
  onBackupImported,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isEditingHeight, setIsEditingHeight] = useState(false);
  const [heightInput, setHeightInput] = useState(biometrics.heightM.toString());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { bmi, category, isHealthy } = calculateBMI(biometrics.weightKg, biometrics.heightM);

  const handleAdjustWeight = (delta: number) => {
    const updatedWeight = Math.round((biometrics.weightKg + delta) * 10) / 10;
    if (updatedWeight > 30 && updatedWeight < 250) {
      const updated: Biometrics = {
        ...biometrics,
        weightKg: updatedWeight,
        lastUpdated: 'Hoje',
      };
      onUpdateBiometrics(updated);
    }
  };

  const handleSaveHeight = () => {
    const parsed = parseFloat(heightInput.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 1.0 && parsed < 2.5) {
      const updated: Biometrics = {
        ...biometrics,
        heightM: parsed,
        lastUpdated: 'Hoje',
      };
      onUpdateBiometrics(updated);
      setIsEditingHeight(false);
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const success = StorageService.importBackup(content);
        if (success) {
          alert('Backup restaurado com sucesso!');
          onBackupImported();
        } else {
          alert('Erro ao importar backup: formato de arquivo inválido.');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col justify-between relative px-4 pt-4 pb-36">
      {/* Top Header */}
      <header className="w-full pb-3 flex flex-col items-center justify-center sticky top-0 bg-[#F4F5F7]/90 dark:bg-[#0D0E11]/90 backdrop-blur-md z-40">
        <div className="w-full flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center shadow-sm text-[#111827] dark:text-[#F0F1F3]">
            <ShieldCheck size={19} />
          </div>

          <div className="text-center">
            <h1 className="text-[20px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight">
              Meu Perfil
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Alternar Tema Claro/Escuro"
              className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center shadow-sm text-[#111827] dark:text-[#F0F1F3] hover:bg-[#F3F4F6] dark:hover:bg-[#202229] active:scale-95 transition-all"
              title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => alert('Modo Offline: todos os dados biométricos e histórico residem exclusivamente na memória sandboxed do seu navegador.')}
              aria-label="Informações de segurança"
              className="w-10 h-10 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center shadow-sm text-[#4B5563] dark:text-[#9CA3AF] active:scale-95 transition-transform"
            >
              <Lock size={17} />
            </button>
          </div>
        </div>

        {/* Offline Status Pill */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse"></span>
          <span className="text-[11px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
            Dados salvos somente neste dispositivo
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-5 mt-2">
        {/* Bento Section 1: Dados Físicos */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#9CA3AF]">
              Biometria Atual
            </span>
            <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              Atualizado {biometrics.lastUpdated}
            </span>
          </div>

          {/* Two Column Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {/* Peso */}
            <div className="bg-white dark:bg-[#17181D] p-5 rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between h-44 relative transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                  Peso
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] font-semibold">
                  kg
                </span>
              </div>

              <div className="my-auto">
                <span className="text-[36px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight tabular-nums font-sans">
                  {biometrics.weightKg.toFixed(1)}
                </span>
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleAdjustWeight(-0.1)}
                  aria-label="Diminuir peso"
                  className="w-9 h-9 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95 transition-transform"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => handleAdjustWeight(0.1)}
                  aria-label="Aumentar peso"
                  className="w-9 h-9 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Altura */}
            <div className="bg-white dark:bg-[#17181D] p-5 rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between h-44 relative transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                  Altura
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#202229] text-[#111827] dark:text-[#F0F1F3] font-semibold">
                  m
                </span>
              </div>

              <div className="my-auto">
                <span className="text-[36px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight tabular-nums font-sans">
                  {biometrics.heightM.toFixed(2)}
                </span>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-end pt-1">
                <button
                  onClick={() => setIsEditingHeight(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E7EB] dark:border-[#2A2D35] text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white active:scale-95 transition-all text-[13px] font-medium bg-[#F3F4F6] dark:bg-[#202229]"
                >
                  <Edit2 size={13} />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full-Width IMC Bar */}
          <div className="bg-white dark:bg-[#17181D] p-4 rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] flex items-center justify-between gap-3 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] shrink-0">
                <Scale size={19} />
              </div>
              <div>
                <p className="text-[14px] text-[#111827] dark:text-[#F0F1F3] font-medium">
                  IMC Atual: <span className="font-bold">{bmi}</span>
                </p>
                <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF]">
                  Faixa de peso para o teste físico
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35]">
              <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-[#0D9488]' : 'bg-amber-500'}`}></span>
              <span className="text-[11px] text-[#111827] dark:text-[#F0F1F3] font-semibold">
                {category}
              </span>
            </div>
          </div>
        </section>

        {/* Bento Section 2: Metas do Edital / TAF */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#9CA3AF]">
              Critérios de Avaliação
            </span>
            <button
              onClick={onOpenEditEdital}
              className="text-[12px] text-[#111827] dark:text-[#F0F1F3] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
            >
              <span>Editar Edital</span>
              <Sliders size={13} />
            </button>
          </div>

          <div className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden transition-colors">
            <div className="p-5 pb-3 border-b border-[#F3F4F6] dark:border-[#202229]">
              <h2 className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight">
                Metas do Edital (Bombeiros Militar)
              </h2>
              <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-0.5">
                Índices mínimos exigidos para aprovação oficial
              </p>
            </div>

            <div className="divide-y divide-[#F3F4F6] dark:divide-[#202229]">
              {editalGoals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={onOpenEditEdital}
                  className="p-4 flex items-center justify-between hover:bg-[#F3F4F6]/60 dark:hover:bg-[#202229]/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
                      {goal.category === 'Resistência Aeróbica' ? (
                        <Zap size={16} />
                      ) : goal.category === 'Core / Abdômen' ? (
                        <Activity size={16} />
                      ) : (
                        <Dumbbell size={16} />
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] text-[#111827] dark:text-[#F0F1F3] font-medium">
                        {goal.exerciseName}
                      </p>
                      <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                        {goal.requirementDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] text-[#111827] dark:text-[#F0F1F3] font-semibold tabular-nums">
                      {goal.targetValue >= 1000 ? goal.targetValue.toLocaleString('pt-BR') : goal.targetValue} {goal.unit}
                    </span>
                    <ChevronRight size={16} className="text-[#9CA3AF]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Section 3: Armazenamento Local & Backup */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563] dark:text-[#9CA3AF]">
              Armazenamento Local
            </span>
            <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              Arquivo Sandboxed
            </span>
          </div>

          <div className="bg-white dark:bg-[#17181D] rounded-3xl border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] divide-y divide-[#F3F4F6] dark:divide-[#202229] overflow-hidden transition-colors">
            {/* Row 1: Exportar backup */}
            <div
              onClick={() => StorageService.exportBackup()}
              className="p-4 flex items-center justify-between hover:bg-[#F3F4F6]/60 dark:hover:bg-[#202229]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
                  <Download size={16} />
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] dark:text-[#F0F1F3] font-medium">
                    Exportar dados (Backup JSON)
                  </p>
                  <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                    Salvar cópia de segurança completa
                  </p>
                </div>
              </div>
              <Download size={16} className="text-[#9CA3AF]" />
            </div>

            {/* Row 2: Importar backup */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-4 flex items-center justify-between hover:bg-[#F3F4F6]/60 dark:hover:bg-[#202229]/60 transition-colors cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileImport}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
                  <Upload size={16} />
                </div>
                <div>
                  <p className="text-[14px] text-[#111827] dark:text-[#F0F1F3] font-medium">
                    Importar backup
                  </p>
                  <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                    Restaurar treinos e biometria
                  </p>
                </div>
              </div>
              <Upload size={16} className="text-[#9CA3AF]" />
            </div>

            {/* Row 3: Zerar histórico */}
            <div
              onClick={() => setShowResetConfirm(true)}
              className="p-4 flex items-center justify-between hover:bg-[#F3F4F6]/60 dark:hover:bg-[#202229]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-red-500">
                  <RotateCcw size={16} />
                </div>
                <div>
                  <p className="text-[14px] text-red-500 font-medium">
                    Zerar histórico de treinos
                  </p>
                  <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                    Exclui registros locais irreversivelmente
                  </p>
                </div>
              </div>
              <RotateCcw size={16} className="text-red-400" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-4 flex flex-col items-center gap-1">
          <span className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] font-medium tracking-wide">
            Versão 1.0.0 • 100% Offline & Privado
          </span>
          <span className="text-[11px] text-[#9CA3AF] dark:text-[#6B7280]">
            Sem conexão de rede • Sem servidores externos
          </span>
        </footer>
      </main>

      {/* Edit Height Dialog Modal */}
      {isEditingHeight && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#17181D] rounded-3xl p-6 w-full max-w-xs border border-[#E5E7EB] dark:border-[#2A2D35] shadow-xl space-y-4">
            <h3 className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3]">
              Atualizar Altura (m)
            </h3>
            <input
              type="text"
              value={heightInput}
              onChange={(e) => setHeightInput(e.target.value)}
              placeholder="Ex: 1.78"
              className="w-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] rounded-xl px-4 py-2.5 text-center text-xl font-bold text-[#111827] dark:text-[#F0F1F3] focus:outline-none focus:ring-2 focus:ring-[#111827] dark:focus:ring-white"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingHeight(false)}
                className="flex-1 py-2 text-sm text-[#4B5563] dark:text-[#9CA3AF] rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveHeight}
                className="flex-1 py-2 text-sm font-semibold text-white dark:text-[#111827] bg-[#111827] dark:bg-white rounded-full shadow-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#17181D] rounded-3xl p-6 w-full max-w-xs border border-[#E5E7EB] dark:border-[#2A2D35] shadow-xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
              <RotateCcw size={22} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#111827] dark:text-[#F0F1F3]">
                Zerar Todos os Dados?
              </h3>
              <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-1">
                Isso removerá seus treinos, fotos e registros salvos neste dispositivo.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 text-sm text-[#4B5563] dark:text-[#9CA3AF] rounded-full hover:bg-[#F3F4F6] dark:hover:bg-[#202229]"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  StorageService.resetAllData();
                  setShowResetConfirm(false);
                  onDataReset();
                }}
                className="flex-1 py-2 text-sm font-semibold text-white bg-red-600 rounded-full shadow-sm hover:bg-red-700"
              >
                Zerar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
