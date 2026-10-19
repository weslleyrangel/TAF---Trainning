import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Calendar, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenCalendar?: () => void;
  selectedDateText: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenProfile,
  onOpenCalendar,
  selectedDateText,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-[#F4F5F7]/90 dark:bg-[#0D0E11]/90 backdrop-blur-md border-b border-[#E5E7EB]/80 dark:border-[#2A2D35]/80 transition-colors">
      <div className="flex justify-between items-center w-full px-4 py-3 max-w-md mx-auto">
        {/* Profile / Avatar & Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenProfile}
            aria-label="Abrir Perfil"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#17181D] flex items-center justify-center border border-[#E5E7EB] dark:border-[#2A2D35] text-[#111827] dark:text-[#F0F1F3] shadow-sm active:scale-95 transition-transform"
          >
            <User size={18} />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[18px] font-semibold text-[#111827] dark:text-[#F0F1F3] tracking-tight leading-tight">
                Hoje
              </h1>
              <span className="flex h-2 w-2 relative" title="Modo 100% Offline e Privado">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]"></span>
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
              {selectedDateText}
            </p>
          </div>
        </div>

        {/* Actions: Theme Toggle & Calendar */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Alternar Tema Claro/Escuro"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] hover:bg-[#F3F4F6] dark:hover:bg-[#202229] active:scale-95 transition-all shadow-sm"
            title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
          </button>

          <button
            onClick={onOpenCalendar}
            aria-label="Calendário"
            className="w-9 h-9 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] hover:bg-[#F3F4F6] dark:hover:bg-[#202229] active:scale-95 transition-all shadow-sm"
            title="Sessões e Calendário"
          >
            <Calendar size={17} />
          </button>
        </div>
      </div>
    </header>
  );
};
