/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Home,
  Search,
  Menu,
  BookOpen,
  Sparkles,
  Terminal,
  AlertTriangle,
  Wrench,
  Cpu,
  HelpCircle,
} from 'lucide-react';

export type MainNavTab =
  | 'home'
  | 'docs'
  | 'projects'
  | 'troubleshooting'
  | 'prompts'
  | 'models'
  | 'commands'
  | 'faqs';

interface NavbarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onToggleMobileMenu,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isMobileNavOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileNavOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileNavOpen]);

  const mobileLinks: { tab: MainNavTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'docs', label: 'Handbook' },
    { tab: 'projects', label: 'Interactive Labs' },
    { tab: 'troubleshooting', label: 'Diagnostics' },
    { tab: 'prompts', label: 'Prompt Library' },
    { tab: 'models', label: 'Model Matrix' },
    { tab: 'commands', label: 'Commands Reference' },
    { tab: 'faqs', label: 'FAQs' },
  ];

  return (
    <>
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#101211]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 xl:gap-4">
        {/* Left Brand - Generous gap & divider before Home button */}
        <div className="flex items-center gap-3 shrink-0 mr-2 xl:mr-4 pr-2 xl:pr-4 border-r border-neutral-800/80">
          <button
            type="button"
            onClick={() => activeTab === 'docs' ? onToggleMobileMenu() : setIsMobileNavOpen(true)}
            className="p-2 -ml-2 rounded-lg text-neutral-400 hover:bg-neutral-800 xl:hidden cursor-pointer shrink-0"
            aria-label="Open site navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 text-left cursor-pointer group shrink-0 whitespace-nowrap"
            title="Return to Claude Code at ₹0 Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-emerald-500 transition-colors shrink-0 font-sans">
              ₹0
            </div>
            <span className="font-bold text-sm sm:text-base text-neutral-100 tracking-tight whitespace-nowrap group-hover:text-emerald-400 transition-colors">
              Claude Code at <span className="font-sans">₹</span>0
            </span>
          </button>
        </div>

        {/* Center Primary Nav Tabs (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 text-[11px] font-medium flex-1 justify-center" aria-label="Main navigation">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onSelectTab('docs')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'docs'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Handbook</span>
          </button>

          <button
            onClick={() => onSelectTab('projects')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Labs</span>
          </button>

          <button
            onClick={() => onSelectTab('troubleshooting')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'troubleshooting'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Diagnostics</span>
          </button>

          <button
            onClick={() => onSelectTab('prompts')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prompts'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompts</span>
          </button>

          <button
            onClick={() => onSelectTab('models')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'models'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Models</span>
          </button>

          <button
            onClick={() => onSelectTab('commands')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'commands'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Commands</span>
          </button>

          <button
            onClick={() => onSelectTab('faqs')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'faqs'
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/50 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/70'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>FAQs</span>
          </button>
        </nav>

        {/* Right Search Control */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
            aria-label="Search handbook documentation"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
    {isMobileNavOpen && (
      <div className="fixed inset-0 z-50 xl:hidden bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Site navigation" onClick={() => setIsMobileNavOpen(false)}>
        <nav className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-emerald-900/60 bg-[#0b1711] p-3 shadow-2xl" onClick={(event) => event.stopPropagation()} aria-label="Mobile site navigation">
          <div className="mb-2 flex items-center justify-between px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400">Explore the handbook</span>
            <button type="button" onClick={() => setIsMobileNavOpen(false)} className="rounded-lg px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">Close</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {mobileLinks.map((item) => (
              <button
                key={item.tab}
                type="button"
                onClick={() => {
                  setIsMobileNavOpen(false);
                  onSelectTab(item.tab);
                }}
                className={"flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 " + (activeTab === item.tab ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/50" : "text-neutral-200 hover:bg-neutral-900")}
              >
                <span>{item.label}</span>
                <span className="text-emerald-500" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    )}
    </>
  );
};
