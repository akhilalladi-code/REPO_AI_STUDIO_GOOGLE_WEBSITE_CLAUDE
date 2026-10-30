/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, AlertCircle, Terminal, FileCode } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  environment?: string;
  expectedOutput?: string;
  explanation?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  filename,
  environment,
  expectedOutput,
  explanation,
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
        return;
      }
      throw new Error('Fallback to textarea copy');
    } catch {
      // Cross-browser textarea fallback
      try {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopyStatus('copied');
          setTimeout(() => setCopyStatus('idle'), 2000);
        } else {
          setCopyStatus('error');
          setTimeout(() => setCopyStatus('idle'), 2500);
        }
      } catch {
        setCopyStatus('error');
        setTimeout(() => setCopyStatus('idle'), 2500);
      }
    }
  };

  return (
    <div className="my-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden shadow-xs">
      {/* Header bar with clearly visible copy button */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-neutral-800 bg-neutral-950/70 text-xs text-neutral-400">
        <div className="flex items-center gap-2 font-mono truncate">
          {filename ? (
            <>
              <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-neutral-200 font-semibold truncate">{filename}</span>
            </>
          ) : (
            <>
              <Terminal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="uppercase text-neutral-300 font-medium">{environment || language}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {environment && filename && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-800 text-neutral-400 font-mono">
              {environment}
            </span>
          )}

          {/* Accessible Copy Button */}
          <button
            onClick={handleCopy}
            type="button"
            aria-label={
              copyStatus === 'copied'
                ? 'Code copied to clipboard'
                : copyStatus === 'error'
                ? 'Failed to copy code'
                : `Copy ${filename || language || 'code'} to clipboard`
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all duration-150 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              copyStatus === 'copied'
                ? 'bg-emerald-600/90 text-white shadow-xs'
                : copyStatus === 'error'
                ? 'bg-rose-700/90 text-white'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white'
            }`}
          >
            {copyStatus === 'copied' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied!</span>
              </>
            ) : copyStatus === 'error' ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-rose-200" />
                <span>Failed</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-300" />
                <span>Copy</span>
              </>
            )}
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {copyStatus === 'copied'
              ? 'Code copied to clipboard successfully'
              : copyStatus === 'error'
              ? 'Could not copy code to clipboard'
              : ''}
          </span>
        </div>
      </div>

      {/* Code contents */}
      <div className="max-h-[560px] overflow-auto p-4 text-[12px] sm:text-[13px] font-mono leading-6 selection:bg-emerald-900 selection:text-emerald-100">
        <pre tabIndex={0} aria-label="Code snippet content" className="m-0 min-w-max whitespace-pre focus-visible:outline-hidden">
          {code}
        </pre>
      </div>

      {/* Expected output if present */}
      {expectedOutput && (
        <div className="border-t border-neutral-800/80 bg-neutral-950/40 p-3 text-xs font-mono">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">
            Expected Terminal Output:
          </div>
          <div className="text-emerald-400/90 whitespace-pre-wrap">{expectedOutput}</div>
        </div>
      )}

      {/* Optional explanation */}
      {explanation && (
        <div className="border-t border-neutral-800/80 bg-neutral-950/20 px-3.5 py-2 text-xs text-neutral-400 italic">
          💡 {explanation}
        </div>
      )}
    </div>
  );
};
