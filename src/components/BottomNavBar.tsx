import React from 'react';
import { Home, BarChart2, Settings } from 'lucide-react';

export type TabDestination = 'today' | 'evolution' | 'profile';

interface BottomNavBarProps {
  activeTab: TabDestination;
  onTabChange: (tab: TabDestination) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <nav className="fixed bottom-3 left-0 right-0 z-50 flex justify-center items-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 dark:bg-[#17181D]/95 backdrop-blur-md rounded-full mx-auto w-auto border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_12px_32px_-4px_rgba(0,0,0,0.14)] flex items-center p-1.5 gap-2 transition-colors">
        {/* Tab 1: Today */}
        <button
          onClick={() => onTabChange('today')}
          aria-label="Hoje"
          className={`flex items-center justify-center rounded-full w-12 h-12 active:scale-95 transition-transform duration-150 ${
            activeTab === 'today'
              ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
              : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
          }`}
        >
          <Home size={22} className={activeTab === 'today' ? 'fill-current' : ''} />
        </button>

        {/* Tab 2: Evolution */}
        <button
          onClick={() => onTabChange('evolution')}
          aria-label="Evolução"
          className={`flex items-center justify-center rounded-full w-12 h-12 active:scale-95 transition-transform duration-150 ${
            activeTab === 'evolution'
              ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
              : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
          }`}
        >
          <BarChart2 size={22} />
        </button>

        {/* Tab 3: Profile */}
        <button
          onClick={() => onTabChange('profile')}
          aria-label="Perfil"
          className={`flex items-center justify-center rounded-full w-12 h-12 active:scale-95 transition-transform duration-150 ${
            activeTab === 'profile'
              ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-sm'
              : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white'
          }`}
        >
          <Settings size={22} />
        </button>
      </div>
    </nav>
  );
};
