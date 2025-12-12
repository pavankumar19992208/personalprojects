import React from "react";
import { X, Lightbulb, CheckCircle2, XCircle } from "lucide-react";

interface Tip {
  title: string;
  icon: any;
  color: string;
  dont: string;
  do: string;
}

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tips: Tip[];
}

export const TipsModal: React.FC<TipsModalProps> = ({
  isOpen,
  onClose,
  tips,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                <Lightbulb size={24} className="text-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold">Crushing the Interview</h2>
            </div>
            <p className="text-white/90 text-sm">
              How to apply these concepts in Amazon SDE scenarios.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${tip.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tip.icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                    {tip.title}
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs uppercase mb-1">
                      <XCircle size={14} /> Don't
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {tip.dont}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/30">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xs uppercase mb-1">
                      <CheckCircle2 size={14} /> Do This
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {tip.do}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Got it, I'm Ready!
          </button>
        </div>
      </div>
    </div>
  );
};
