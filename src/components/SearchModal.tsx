/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, AlertTriangle, Terminal, Sparkles, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { SearchEngine, SearchResult } from '../lib/searchEngine';
import { buildSearchIndex } from '../data/masterHandbook';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string, anchor?: string) => void;
}

/**
 * Renders text with query term matches visually highlighted via <mark> tags
 */
const HighlightedText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>;
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return <>{text}</>;

  const escaped = tokens.map((t) => t.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  const regex = new RegExp(\`(\${escaped})\`, 'gi');
  const exactMatch = new RegExp(\`^(?:\${escaped})$\`, 'i');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        exactMatch.test(part) ? (
          <mark
            key={i}
            className="bg-emerald-200/90 dark:bg-emerald-800/80 text-emerald-950 dark:text-emerald-100 font-semibold rounded-xs px-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchEngineRef = useRef<SearchEngine | null>(null);

  // Initialize search index
  useEffect(() => {
    if (!searchEngineRef.current) {
      const docs = buildSearchIndex();
      searchEngineRef.current = new SearchEngine(docs);
    }
  }, []);

  // Keep keyboard focus and background scrolling inside the search dialog.
  useEffect(() => {
    if (!isOpen) {
      setInputVal('');
      setDebouncedQuery('');
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);

  // Debounce input to optimize CPU during rapid typing
  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(inputVal);
      setIsDebouncing(false);
    }, 150);

    return () => clearTimeout(handler);
  }, [inputVal]);

  // Execute search when debounced query or category changes
  useEffect(() => {
    if (!searchEngineRef.current || !debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    const allMatches = searchEngineRef.current.search(debouncedQuery, 40);
    if (selectedCategory === 'All') {
      setResults(allMatches);
    } else {
      setResults(allMatches.filter((r) => r.document.category === selectedCategory));
    }
    setSelectedIndex(0);
  }, [debouncedQuery, selectedCategory]);

  // Keep selected item scrolled into view
  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const activeElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, results]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusable = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
      if (focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      const target = results[selectedIndex].document;
      onNavigate(target.route, target.anchor);
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  const categories = ['All', 'Chapter', 'Troubleshooting', 'Prompt', 'Command', 'Appendix'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Chapter':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />;
      case 'Troubleshooting':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'Prompt':
        return <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />;
      case 'Command':
        return <Terminal className="w-3.5 h-3.5 text-blue-500 shrink-0" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-neutral-400 shrink-0" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Documentation Full-Text Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#161817] rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search chapters, commands, 429 errors, models, prompts, code..."
            aria-label="Search technical handbook"
            aria-autocomplete="list"
            aria-controls="search-results-list"
            aria-activedescendant={results[selectedIndex] ? `search-result-${selectedIndex}` : undefined}
            className="w-full bg-transparent text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden"
          />
          {isDebouncing ? (
            <Loader2 className="w-4 h-4 text-emerald-500 animate-spin shrink-0" />
          ) : inputVal ? (
            <button
              onClick={() => {
                setInputVal('');
                inputRef.current?.focus();
              }}
              type="button"
              aria-label="Clear search input"
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <span className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-400">
            ESC
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-neutral-100 dark:border-neutral-800/60 overflow-x-auto text-xs bg-neutral-50/50 dark:bg-neutral-900/30">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-medium shadow-2xs'
                  : 'bg-white dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div
          id="search-results-list"
          role="listbox"
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/40"
        >
          {inputVal.trim() === '' ? (
            <div className="py-12 px-6 text-center text-xs text-neutral-500">
              <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5 text-sm">
                Full-Text Client-Side Search
              </p>
              <p className="max-w-md mx-auto text-neutral-500 dark:text-neutral-400">
                Covers chapters, sections, paragraphs, code blocks, configs, commands, models, and error runbooks.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setInputVal('output_config')}
                  className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-mono text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                >
                  output_config
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal('64K Qwen')}
                  className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-mono text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                >
                  64K Qwen
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal('glibc-runner')}
                  className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-mono text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                >
                  glibc-runner
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal('GSTIN')}
                  className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-mono text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                >
                  GSTIN
                </button>
              </div>
            </div>
          ) : results.length === 0 && !isDebouncing ? (
            <div className="py-12 px-6 text-center text-xs text-neutral-500">
              No results found for &ldquo;<span className="font-medium text-neutral-800 dark:text-neutral-200">{inputVal}</span>&rdquo;.
            </div>
          ) : (
            results.map((res, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  id={`search-result-${idx}`}
                  key={`${res.document.id}-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onNavigate(res.document.route, res.document.anchor);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/40 text-neutral-900 dark:text-white'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold truncate">
                      {getCategoryIcon(res.document.category)}
                      <span className="truncate">
                        <HighlightedText text={res.document.title} query={debouncedQuery} />
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                        {res.document.category}
                      </span>
                      {res.document.sourcePage && (
                        <span className="text-[10px] text-neutral-400">
                          {String(res.document.sourcePage).includes('p')
                            ? res.document.sourcePage
                            : `p. ${res.document.sourcePage}`}
                        </span>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    <HighlightedText text={res.snippet} query={debouncedQuery} />
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/50 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-mono text-neutral-400">
            {results.length > 0 ? `${results.length} results • ` : ''}100% Handbook Indexed
          </span>
        </div>
      </div>
    </div>
  );
};
