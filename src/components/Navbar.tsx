/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Home,
  Search,
  Menu,
  FileDown,
  BookOpen,
  Sparkles,
  Terminal,
  AlertTriangle,
  Award,
  Wrench,
  Cpu,
  Rocket,
} from 'lucide-react';

export type MainNavTab =
  | 'home'
  | 'docs'
  | 'projects'
  | 'troubleshooting'
  | 'prompts'
  | 'models'
  | 'commands'
  | 'audit';

interface NavbarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  onOpenSearch: () => void;
  onOpenPdfViewer: () => void;
  onOpenDeploy: () => void;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenPdfViewer,
  onOpenDeploy,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#101211]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Brand - Returns to Home */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
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
            className="flex items-center gap-2.5 text-left cursor-pointer group shrink-0 whitespace-nowrap"
            title="Return to Claude Code ₹0 Homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-emerald-500 transition-colors shrink-0">
              ₹0
            </div>
            <div className="shrink-0 flex flex-col justify-center">
              <div className="font-bold text-sm sm:text-base text-neutral-100 tracking-tight leading-none whitespace-nowrap group-hover:text-emerald-400 transition-colors">
                Claude Code at ₹0
              </div>
              <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono mt-1 leading-none whitespace-nowrap">
                The AI Coding Agent Handbook <span className="hidden sm:inline">&bull; Complete Reference</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center Primary Nav Tabs (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium shrink-0" aria-label="Main navigation">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onSelectTab('docs')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'docs'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Handbook Docs</span>
          </button>

          <button
            onClick={() => onSelectTab('projects')}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Interactive Labs</span>
          </button>

          <button
            onClick={() => onSelectTab('troubleshooting')}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'troubleshooting'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Diagnostic Wizard</span>
          </button>

          <button
            onClick={() => onSelectTab('prompts')}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prompts'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompts (35)</span>
          </button>

          <button
            onClick={() => onSelectTab('models')}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'models'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Models</span>
          </button>

          <button
            onClick={() => onSelectTab('commands')}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'commands'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Commands</span>
          </button>

          <button
            onClick={() => onSelectTab('audit')}
            className={`px-2.5 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-neutral-800 text-emerald-300 font-semibold shadow-xs'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Audit (100%)</span>
          </button>
        </nav>

        {/* Right Search, Deploy, PDF & Theme Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 text-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
            aria-label="Search handbook documentation"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="hidden sm:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-400">
              ⌘K
            </kbd>
          </button>

          {/* 1-Click Deploy & Share */}
          <button
            type="button"
            onClick={onOpenDeploy}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden"
            title="Deploy your app live to a shareable URL in seconds"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Deploy / Share</span>
          </button>

          {/* Original PDF Action */}
          <button
            type="button"
            onClick={onOpenPdfViewer}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-medium cursor-pointer transition-colors"
            title="View or download the original 120-page PDF Handbook (6.8 MB)"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Source PDF</span>
          </button>

        </div>
      </div>
    </header>
  );
};
