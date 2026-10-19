import React, { useRef, useState } from 'react';
import { ProofAttachment } from '../types';
import { Verified, Image as ImageIcon, X, Watch, AlertCircle } from 'lucide-react';

interface ProofAttachmentCardProps {
  attachment?: ProofAttachment;
  onSaveAttachment: (attachment: ProofAttachment) => void;
  onRemoveAttachment: () => void;
}

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export const ProofAttachmentCard: React.FC<ProofAttachmentCardProps> = ({
  attachment,
  onSaveAttachment,
  onRemoveAttachment,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage('O arquivo excede o limite máximo de 2MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newAttachment: ProofAttachment = {
          id: `proof-${Date.now()}`,
          fileName: file.name,
          fileSizeKB: Math.round(file.size / 1024),
          mimeType: file.type,
          dataUrl: reader.result,
          uploadedAt: 'Hoje',
        };
        onSaveAttachment(newAttachment);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="bg-white dark:bg-[#17181D] rounded-3xl p-5 border border-[#E5E7EB] dark:border-[#2A2D35] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)] space-y-3.5 transition-colors">
      <div className="flex items-center justify-between px-0.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
            <Verified size={15} />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-[#111827] dark:text-[#F0F1F3] leading-tight">
              Comprovante do Treino
            </h2>
            <p className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
              Print ou foto da atividade (máx. 2MB)
            </p>
          </div>
        </div>
        <span className="text-[11px] font-medium text-[#0D9488] bg-[#F3F4F6] dark:bg-[#202229] px-2.5 py-0.5 rounded-full border border-[#E5E7EB]/40 dark:border-[#2A2D35]/60">
          Opcional
        </span>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
          <AlertCircle size={15} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {attachment ? (
        /* Attached File Preview Card */
        <div className="bg-[#F3F4F6] dark:bg-[#202229] rounded-2xl p-3 flex items-center justify-between border border-[#E5E7EB]/50 dark:border-[#2A2D35]/50">
          <div className="flex items-center gap-3 overflow-hidden">
            {attachment.dataUrl.startsWith('data:image') ? (
              <img
                src={attachment.dataUrl}
                alt="Comprovante"
                className="w-11 h-11 rounded-xl object-cover border border-[#E5E7EB] dark:border-[#2A2D35] shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[#111827] text-white flex items-center justify-center shrink-0">
                <Watch size={20} />
              </div>
            )}
            <div className="text-left truncate">
              <p className="text-[12px] font-medium text-[#111827] dark:text-[#F0F1F3] truncate">
                {attachment.fileName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]"></span>
                <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
                  {(attachment.fileSizeKB / 1024).toFixed(1)} MB • Anexado
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onRemoveAttachment}
            aria-label="Remover arquivo"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#17181D] border border-[#E5E7EB] dark:border-[#2A2D35] flex items-center justify-center text-[#4B5563] dark:text-[#9CA3AF] hover:text-red-500 active:scale-90 transition-transform shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        /* Empty Upload Trigger Drop Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#E5E7EB] dark:border-[#2A2D35] rounded-2xl p-4 text-center flex flex-col items-center justify-center gap-1.5 hover:bg-[#F3F4F6] dark:hover:bg-[#202229] transition-colors cursor-pointer active:scale-[0.99]"
        >
          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] dark:bg-[#202229] flex items-center justify-center text-[#111827] dark:text-[#F0F1F3]">
            <ImageIcon size={20} />
          </div>
          <span className="text-[13px] font-semibold text-[#111827] dark:text-[#F0F1F3]">
            Tirar foto ou anexar print
          </span>
          <span className="text-[11px] text-[#4B5563] dark:text-[#9CA3AF]">
            PNG, JPG ou comprovante Strava / Esteira / Smartwatch
          </span>
        </div>
      )}
    </section>
  );
};
