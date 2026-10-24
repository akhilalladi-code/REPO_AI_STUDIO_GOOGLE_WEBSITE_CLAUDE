/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SubSection } from '../types/handbook';
import { Bookmark, CheckCircle2, Clock, BookOpen } from 'lucide-react';

interface OnThisPageTocProps {
  sections: SubSection[];
  sourcePageRange: string;
  readingTimeMinutes: number;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleCompleted: () => void;
  onToggleBookmarked: () => void;
}

export const OnThisPageToc: React.FC<OnThisPageTocProps> = ({
  sections,
  sourcePageRange,
  readingTimeMinutes,
  isCompleted,
  isBookmarked,
  onToggleCompleted,
  onToggleBookmarked,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside aria-label="Table of contents" className="w-64 shrink-0 hidden xl:block">
      <div className="sticky top-20 space-y-5 text-xs text-neutral-600 dark:text-neutral-400">
        {/* Chapter Quick Actions */}
        <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{readingTimeMinutes} min read</span>
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
              <span>{sourcePageRange}</span>
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
            <button
              onClick={onToggleCompleted}
              type="button"
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md font-medium text-xs transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button
              onClick={onToggleBookmarked}
              type="button"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark chapter'}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-500'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Section List */}
        <div>
          <h4 className="font-bold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider text-[11px] mb-2.5">
            On this page
          </h4>
          <nav className="space-y-1.5 border-l border-neutral-200 dark:border-neutral-800 pl-3">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                type="button"
                className="block text-left text-xs text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer"
              >
                {sec.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};
