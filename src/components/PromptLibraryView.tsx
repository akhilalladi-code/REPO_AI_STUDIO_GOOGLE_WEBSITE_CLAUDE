/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Appendix D: Reusable Agent Prompt Library (35 CCAV Prompts)
 */

import React, { useState } from 'react';
import { PROMPTS_DATA } from '../data/promptsData';
import { Sparkles, Copy, Check, Search } from 'lucide-react';

export const PromptLibraryView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    '1. Onboarding & Architecture',
    '2. Planning & Scaffolding',
    '3. Refactoring & Quality',
    '4. Debugging & Root Cause',
    '5. Automated Testing & QA',
    '6. Security, A11y & Perf',
    '7. Git & Deployment',
  ];

  const handleCopyPrompt = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const filtered = PROMPTS_DATA.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      p.code.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q) ||
      p.context.toLowerCase().includes(q) ||
      p.targetAgents.some((a) => a.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Appendix D: Reusable Agent Prompt Library (35 CCAV Prompts)</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Structured using Context-Constraint-Action-Verification to cut wasted turns in half and eliminate hallucinated rewrites.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            35 Verified Prompts
          </span>
        </div>

        {/* Filter controls */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="search"
              placeholder="Filter prompts by title, code (P17), or target agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-purple-600"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap cursor-pointer transition-colors ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            id={item.code.toLowerCase()}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] flex flex-col justify-between space-y-3 shadow-2xs hover:border-purple-300 dark:hover:border-purple-800 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  {item.code}
                </span>
                <div className="flex items-center gap-1">
                  {item.targetAgents.map((ag) => (
                    <span
                      key={ag}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {ag}
                    </span>
                  ))}
                </div>
              </div>
              <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-400 mb-2">{item.category}</p>

              {/* Exact Prompt Box */}
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed selection:bg-purple-100 dark:selection:bg-purple-950">
                &ldquo;{item.prompt}&rdquo;
              </div>

              {/* CCAV Breakdown */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                <div className="p-2 rounded bg-neutral-100/50 dark:bg-neutral-900/40">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">Context:</span>
                  <span className="truncate block">{item.context}</span>
                </div>
                <div className="p-2 rounded bg-neutral-100/50 dark:bg-neutral-900/40">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 block">Constraint:</span>
                  <span className="truncate block">{item.constraint}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                ✓ {item.verification}
              </span>
              <button
                type="button"
                onClick={() => handleCopyPrompt(item.id, item.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-medium cursor-pointer transition-colors"
                aria-label={`Copy prompt ${item.code}`}
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
