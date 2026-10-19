import React, { useState, useEffect, useRef } from 'react';
import { playCountdownBeep, playCompletionAlert } from '../services/audio';
import { X, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

interface StandaloneTimerModalProps {
  onClose: () => void;
}

export const StandaloneTimerModal: React.FC<StandaloneTimerModalProps> = ({ onClose }) => {
  const [targetSeconds, setTargetSeconds] = useState(45);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            playCompletionAlert();
            setIsRunning(false);
            return 0;
          }
          if (prev === 4 || prev === 3 || prev === 2) {
            playCountdownBeep(880, 100);
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectPreset = (sec: number) => {
    setTargetSeconds(sec);
    setSecondsLeft(sec);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(targetSeconds);
  };

  const handleAdjustTime = (delta: number) => {
    setSecondsLeft((prev) => Math.max(5, prev + delta));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#17181D] rounded-3xl p-6 w-full max-w-sm border border-[#E5E7EB] dark:border-[#2A2D35] shadow-2xl space-y-5 transition-colors">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-[#111827] dark:text-[#F0F1F3]">
            Timer de Descanso
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111827] dark:hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Digital Clock Display */}
        <div className="text-center py-4 bg-[#F4F5F7] dark:bg-[#0D0E11] rounded-2xl border border-[#E5E7EB] dark:border-[#2A2D35]">
          <span className="text-[56px] font-bold text-[#111827] dark:text-[#F0F1F3] tracking-tight tabular-nums font-sans">
            {formatTime(secondsLeft)}
          </span>
          <p className="text-[12px] text-[#4B5563] dark:text-[#9CA3AF] mt-1 font-medium">
            {isRunning ? 'Recuperação metabólica ativa' : 'Pausado'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleAdjustTime(-15)}
            className="w-11 h-11 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95"
            title="Subtrair 15 segundos"
          >
            <Minus size={18} />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="w-16 h-16 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] flex items-center justify-center active:scale-95 shadow-md"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} className="fill-current ml-0.5" />}
          </button>

          <button
            onClick={() => handleAdjustTime(15)}
            className="w-11 h-11 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3] active:scale-95"
            title="Adicionar 15 segundos"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={handleReset}
            className="w-11 h-11 rounded-full bg-[#F3F4F6] dark:bg-[#202229] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#4B5563] dark:text-[#9CA3AF] active:scale-95"
            title="Reiniciar"
          >
            <RotateCcw size={17} />
          </button>
        </div>

        {/* Quick Chips */}
        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[#F3F4F6] dark:border-[#202229]">
          {[30, 45, 60, 90].map((sec) => (
            <button
              key={sec}
              onClick={() => handleSelectPreset(sec)}
              className={`py-2 rounded-full text-[12px] font-bold text-center transition-all ${
                targetSeconds === sec
                  ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827]'
                  : 'border border-[#E5E7EB] dark:border-[#2A2D35] text-[#4B5563] dark:text-[#9CA3AF] bg-[#F3F4F6] dark:bg-[#202229]'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
