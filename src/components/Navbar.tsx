/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#101211]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left Brand - Generous gap & divider before Home button */}
        <div className="flex items-center gap-3 shrink-0 mr-4 sm:mr-8 xl:mr-12 pr-4 sm:pr-6 xl:pr-8 border-r border-neutral-800/80">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-2 -ml-2 rounded-lg text-neutral-400 hover:bg-neutral-800 lg:hidden cursor-pointer shrink-0"
            aria-label="Open sidebar navigation"
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
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-medium flex-1" aria-label="Main navigation">
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
  );
};
