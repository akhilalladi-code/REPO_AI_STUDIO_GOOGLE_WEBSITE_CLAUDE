/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Claude Code at ₹0 — Master Technical Documentation Platform
 */

import React, { useState, useEffect } from 'react';
import { ALL_DOCS, getChapterBySlug } from './data/masterHandbook';
import { Navbar, MainNavTab } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ArticleView } from './components/ArticleView';
import { OnThisPageToc } from './components/OnThisPageToc';
import { HomepageView } from './components/HomepageView';
import { SearchModal } from './components/SearchModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { DeployModal } from './components/DeployModal';
import { InteractiveProjects } from './components/InteractiveProjects';
import { TroubleshootingWizard } from './components/TroubleshootingWizard';
import { PromptLibraryView } from './components/PromptLibraryView';
import { ModelMatrixView } from './components/ModelMatrixView';
import { CommandRefView } from './components/CommandRefView';
import { Home, ArrowLeft } from 'lucide-react';

const BackToHomeBar: React.FC<{ title: string; subtitle?: string; onHome: () => void }> = ({
  title,
  subtitle,
  onHome,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-neutral-800">
    <button
      type="button"
      onClick={onHome}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 transition-colors font-medium text-xs cursor-pointer shadow-xs group"
      title="Return to Claude Code ₹0 Homepage"
    >
      <Home className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span>&larr; Return to Homepage</span>
    </button>
    <div className="text-right">
      <span className="text-xs font-semibold text-neutral-200">{title}</span>
      {subtitle && <span className="text-[11px] text-neutral-400 font-mono ml-2">&bull; {subtitle}</span>}
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab | 'home'>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('chapter-1');

  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('claude_zero_completed');
      return raw ? new Set(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('claude_zero_bookmarks');
      return raw ? new Set(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Ensure dark theme is permanently enabled
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Read initial hash on load
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        if (hash === 'projects') {
          setActiveTab('projects');
        } else if (hash === 'troubleshooting') {
          setActiveTab('troubleshooting');
        } else if (hash === 'prompts') {
          setActiveTab('prompts');
        } else if (hash === 'models') {
          setActiveTab('models');
        } else if (hash === 'commands') {
          setActiveTab('commands');
        } else if (hash === 'audit') {
          setActiveTab('audit');
        } else {
          // Check if matches a chapter slug
          const doc = getChapterBySlug(hash);
          if (doc) {
            setCurrentSlug(doc.slug);
            setActiveTab('docs');
          }
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCompleted = (slug: string) => {
    setCompletedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      localStorage.setItem('claude_zero_completed', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleToggleBookmarked = (slug: string) => {
    setBookmarkedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      localStorage.setItem('claude_zero_bookmarks', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleNavigateChapter = (slug: string, anchor?: string) => {
    const doc = getChapterBySlug(slug);
    if (doc) {
      setCurrentSlug(doc.slug);
      setActiveTab('docs');
      window.location.hash = anchor ? `${doc.slug}#${anchor}` : doc.slug;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchNavigate = (route: string, anchor?: string) => {
    if (route.startsWith('/docs/')) {
      const slug = route.replace('/docs/', '');
      if (slug === 'troubleshooting') {
        setActiveTab('troubleshooting');
        window.location.hash = 'troubleshooting';
      } else if (slug === 'prompts') {
        setActiveTab('prompts');
        window.location.hash = 'prompts';
      } else if (slug === 'models') {
        setActiveTab('models');
        window.location.hash = 'models';
      } else if (slug === 'commands') {
        setActiveTab('commands');
        window.location.hash = 'commands';
      } else {
        handleNavigateChapter(slug, anchor);
      }
    }
  };

  // Find current chapter, and previous/next chapters
  const currentChapter = getChapterBySlug(currentSlug) || ALL_DOCS[0];
  const currentIndex = ALL_DOCS.findIndex((d) => d.slug === currentSlug);
  const prevChapter = currentIndex > 0 ? ALL_DOCS[currentIndex - 1] : undefined;
  const nextChapter = currentIndex < ALL_DOCS.length - 1 ? ALL_DOCS[currentIndex + 1] : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] antialiased transition-colors">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab as MainNavTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.location.hash = tab === 'docs' ? currentSlug : tab;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPdfViewer={() => setIsPdfModalOpen(true)}
        onOpenDeploy={() => setIsDeployModalOpen(true)}
        onToggleMobileMenu={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* If in 'docs' mode, show 3-column Layout */}
        {activeTab === 'docs' && (
          <>
            <Sidebar
              currentSlug={currentSlug}
              onSelectDoc={(slug) => handleNavigateChapter(slug)}
              completedSlugs={completedSlugs}
              bookmarkedSlugs={bookmarkedSlugs}
              isOpenMobile={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
              onSelectTab={(tab) => {
                setActiveTab(tab as MainNavTab);
                window.location.hash = tab;
              }}
              onOpenDeploy={() => setIsDeployModalOpen(true)}
            />

            <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
              <ArticleView
                chapter={currentChapter}
                onNavigateChapter={handleNavigateChapter}
                onNavigateHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
              />
            </main>

            <OnThisPageToc
              sections={currentChapter.sections}
              sourcePageRange={currentChapter.sourcePageRange}
              readingTimeMinutes={currentChapter.readingTimeMinutes}
              isCompleted={completedSlugs.has(currentChapter.slug)}
              isBookmarked={bookmarkedSlugs.has(currentChapter.slug)}
              onToggleCompleted={() => handleToggleCompleted(currentChapter.slug)}
              onToggleBookmarked={() => handleToggleBookmarked(currentChapter.slug)}
            />
          </>
        )}

        {/* Homepage View */}
        {activeTab === 'home' && (
          <main className="flex-1 min-w-0">
            <HomepageView
              onStartReading={() => {
                setActiveTab('docs');
                setCurrentSlug('front-matter');
                window.location.hash = 'front-matter';
              }}
              onNavigateChapter={handleNavigateChapter}
              onOpenSearch={() => setIsSearchOpen(true)}
              onOpenPdfViewer={() => setIsPdfModalOpen(true)}
              onOpenDeploy={() => setIsDeployModalOpen(true)}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.location.hash = tab;
              }}
            />
          </main>
        )}



        {/* Interactive Practical Projects View */}
        {activeTab === 'projects' && (
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <BackToHomeBar
                title="Interactive Practical Labs"
                subtitle="Chapters 13, 14 & 23 Projects"
                onHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
              />
              <InteractiveProjects />
            </div>
          </main>
        )}

        {/* Troubleshooting Runbook Wizard */}
        {activeTab === 'troubleshooting' && (
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <BackToHomeBar
                title="Diagnostic Troubleshooting Wizard"
                subtitle="Chapter 21 · 26 Deterministic Runbooks"
                onHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
              />
              <TroubleshootingWizard />
            </div>
          </main>
        )}

        {/* Prompt Library */}
        {activeTab === 'prompts' && (
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <BackToHomeBar
                title="Prompt Engineering Library"
                subtitle="Chapter 15 · 35 Production CCAV Prompts"
                onHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
              />
              <PromptLibraryView />
            </div>
          </main>
        )}

        {/* Model Compatibility Matrix */}
        {activeTab === 'models' && (
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <BackToHomeBar
                title="Model Compatibility Matrix"
                subtitle="Chapter 5 · Cloud vs Local Benchmarks"
                onHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
              />
              <ModelMatrixView />
            </div>
          </main>
        )}

        {/* Commands Reference */}
        {activeTab === 'commands' && (
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <BackToHomeBar
                title="CLI Commands & Keyboard Shortcuts"
                subtitle="Chapters 2, 8, 16 & Appendix C"
                onHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
              />
              <CommandRefView />
            </div>
          </main>
        )}

        {/* Content Completeness Audit & Release Certification */}
        {activeTab === 'audit' && (
          <main className="flex-1 min-w-0 px-4 sm:px-8 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <BackToHomeBar
                title="Handbook Completeness & Release Audit"
                subtitle="100% Invariant Verification"
                onHome={() => {
                  setActiveTab('home');
                  window.location.hash = 'home';
                }}
              />
              <ContentCompletenessReport />
            </div>
          </main>
        )}
      </div>

      {/* Global Search Dialog Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSearchNavigate}
      />

      {/* Original PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />

      {/* 1-Click Deploy & Share Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
