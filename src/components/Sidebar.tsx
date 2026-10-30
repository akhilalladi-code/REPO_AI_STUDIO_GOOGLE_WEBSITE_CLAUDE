/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ALL_DOCS } from '../data/masterHandbook';
import {
  Home,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Terminal,
  AlertTriangle,
  Award,
  Layers,
  Wrench,
  Workflow,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  currentSlug: string;
  onSelectDoc: (slug: string) => void;
  completedSlugs: Set<string>;
  bookmarkedSlugs: Set<string>;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onSelectTab?: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSlug,
  onSelectDoc,
  completedSlugs,
  bookmarkedSlugs,
  isOpenMobile,
  onCloseMobile,
  onSelectTab,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpenMobile) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseMobile();
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpenMobile]);

  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    'Part V: Appendices & Reference': false,
  });

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  // Group documents by part
  const groups: { name: string; icon: React.ReactNode; docs: typeof ALL_DOCS }[] = [
    {
      name: 'Part I: Foundations',
      icon: <Layers className="w-3.5 h-3.5 text-emerald-500" />,
      docs: ALL_DOCS.filter((d) => d.part === 'Front Matter' || d.part === 'Part I: Foundations'),
    },
    {
      name: 'Part II: Setups & Platforms',
      icon: <Terminal className="w-3.5 h-3.5 text-emerald-400" />,
      docs: ALL_DOCS.filter((d) => d.part === 'Part II: Setups & Platforms'),
    },
    {
      name: 'Part III: Practical Projects',
      icon: <Wrench className="w-3.5 h-3.5 text-teal-400" />,
      docs: ALL_DOCS.filter((d) => d.part === 'Part III: Practical Projects'),
    },
    {
      name: 'Part IV: Engineering Discipline',
      icon: <Workflow className="w-3.5 h-3.5 text-lime-400" />,
      docs: ALL_DOCS.filter((d) => d.part === 'Part IV: Engineering Discipline'),
    },
    {
      name: 'Part V: Appendices & Reference',
      icon: <BookOpen className="w-3.5 h-3.5 text-neutral-400" />,
      docs: ALL_DOCS.filter((d) => d.part === 'Part V: Appendices & Reference'),
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full text-xs">
      {/* Primary Return to Homepage Action */}
      <div className="p-2.5 border-b border-neutral-800 bg-[#141615]">
        <button
          type="button"
          onClick={() => {
            if (onSelectTab) onSelectTab('home');
            window.location.hash = 'home';
            onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-xs transition-colors cursor-pointer border border-neutral-800 group shadow-xs"
          title="Return to Claude Code ₹0 Homepage"
        >
          <div className="flex items-center gap-2">
            <Home className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Return to Homepage</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono group-hover:text-emerald-400 transition-colors">&larr; Home</span>
        </button>
      </div>

      {/* Top Handbook Status Bar */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-900/30 flex items-center justify-between">
        <span className="font-semibold text-neutral-400">
          Handbook Progress
        </span>
        <span className="font-mono text-emerald-400 font-bold">
          {completedSlugs.size} <span className="text-neutral-400 font-normal">/ 35 Read</span>
        </span>
      </div>

      {/* Mobile-Only Main Section Jump Links */}
      {onSelectTab && (
        <div className="p-2 border-b border-neutral-200 dark:border-neutral-800 xl:hidden space-y-1 bg-neutral-50/80 dark:bg-neutral-900/40">
          <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider px-2 py-1">
            Documentation Modules
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">

            <button
              type="button"
              onClick={() => {
                onSelectTab('projects');
                onCloseMobile();
              }}
              className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Interactive Labs</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTab('troubleshooting');
                onCloseMobile();
              }}
              className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Wizard (26)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTab('prompts');
                onCloseMobile();
              }}
              className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Prompts (35)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTab('models');
                onCloseMobile();
              }}
              className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Models Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectTab('faqs');
                onCloseMobile();
              }}
              className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-left cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>FAQs</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tree */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-3" aria-label="Handbook chapters navigation">
        {groups.map((group) => {
          const isCollapsed = collapsedGroups[group.name];
          return (
            <div key={group.name} className="space-y-0.5">
              <button
                type="button"
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 font-semibold tracking-tight cursor-pointer uppercase text-[11px]"
              >
                <div className="flex items-center gap-1.5 truncate">
                  {group.icon}
                  <span className="truncate">{group.name}</span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                )}
              </button>

              {!isCollapsed && (
                <div className="pl-2 space-y-0.5 border-l border-neutral-200 dark:border-neutral-800 ml-3">
                  {group.docs.map((doc) => {
                    const isActive = doc.slug === currentSlug;
                    const isDone = completedSlugs.has(doc.slug);
                    const isBookmarked = bookmarkedSlugs.has(doc.slug);

                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => {
                          onSelectDoc(doc.slug);
                          onCloseMobile();
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer group ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200'
                        }`}
                      >
                        <span className="truncate flex-1">
                          {doc.number === '0'
                            ? 'Front Matter'
                            : doc.part.includes('Appendices')
                            ? `Appendix ${doc.number}: ${doc.title.split(':')[0]}`
                            : `Ch ${doc.number}: ${doc.title.split(':')[1]?.trim() || doc.title}`}
                        </span>

                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          {isBookmarked && (
                            <Bookmark className="w-3 h-3 text-lime-400 fill-amber-500" />
                          )}
                          {isDone && (
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="w-72 shrink-0 hidden xl:block border-r border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#161817]/70 backdrop-blur-md h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 xl:hidden flex"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div ref={drawerRef} tabIndex={-1} className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-[#161817] shadow-2xl z-10 flex flex-col">
            <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                Navigation &amp; Chapters
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" aria-label="Close navigation menu"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
