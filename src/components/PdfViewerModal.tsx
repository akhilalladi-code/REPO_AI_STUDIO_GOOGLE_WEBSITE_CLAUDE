/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, ExternalLink, BookOpen, FileText } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [targetPage, setTargetPage] = useState<number>(1);
  const pdfPath = '/assets/aistudio/Claude_Code_at_Zero_Cost_Handbook__1__1a7f086a.pdf';

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[90vh] bg-white dark:bg-[#161817] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 id="pdf-modal-title" className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                Original Authoritative Source Edition (PDF)
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Claude Code at ₹0 &bull; 120 Pages &bull; 6.8 MB &bull; October 24, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfPath}
              download="Claude_Code_at_Zero_Cost_Handbook_2026.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (6.8 MB)</span>
            </a>

            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            <button
              onClick={onClose}
              type="button"
              aria-label="Close PDF viewer modal"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Jump Bar */}
        <div className="px-5 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/20 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span>Jump to Page:</span>
            <input
              type="number"
              min={1}
              max={120}
              value={targetPage}
              onChange={(e) => setTargetPage(Math.max(1, Math.min(120, Number(e.target.value))))}
              className="w-16 px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 font-mono text-center text-xs"
            />
            <span className="text-neutral-400 font-mono">/ 120</span>
          </div>
          <div className="text-[11px] text-neutral-500 hidden sm:block">
            Note: All 24 chapters &amp; 10 appendices are also fully readable directly on this website.
          </div>
        </div>

        {/* PDF Embedded View */}
        <div className="flex-1 bg-neutral-800 relative">
          <iframe
            src={`${pdfPath}#page=${targetPage}`}
            title="Claude Code at ₹0 Original PDF Handbook"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
};
