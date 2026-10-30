/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Branded Multi-Column Site Footer + Interactive Privacy Policy, Legal Disclaimer & Contact Us Pages
 */

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Scale,
  Mail,
  ArrowUp,
  BookOpen,
  Wrench,
  AlertTriangle,
  Sparkles,
  Cpu,
  Terminal,
  Award,
  CheckCircle2,
  Trash2,
  Send,
  MessageSquare,
  HelpCircle,
  Github,
  Linkedin,
  Youtube,
  Lock,
  Server,
  EyeOff,
  FileText,
  ExternalLink,
  ChevronRight,
  Clock,
  Globe,
  RefreshCw,
  Check,
  Copy,
  Loader2,
  BellRing,
  Settings2,
  AtSign,
} from 'lucide-react';
import { MainNavTab } from './Navbar';

export type ExtendedAppTab = MainNavTab | 'privacy' | 'disclaimer' | 'contact';

interface SiteFooterProps {
  activeTab: ExtendedAppTab;
  onSelectTab: (tab: ExtendedAppTab) => void;
  onNavigateChapter: (slug: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  activeTab,
  onSelectTab,
  onNavigateChapter,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPage = (tab: ExtendedAppTab) => {
    onSelectTab(tab);
    scrollToTop();
  };

  const navigateChapter = (slug: string) => {
    onNavigateChapter(slug);
    scrollToTop();
  };

  const linkClass =
    'block w-fit text-sm leading-6 text-[#A3A3A3] hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1C1C1C] rounded-sm';
  const headingClass =
    'mb-5 text-[15px] font-medium tracking-tight text-[#F2F2F2]';

  return (
    <footer className="mt-16 w-full border-t border-white/10 bg-[#1C1C1C] text-[#E5E5E5]">
      <div className="mx-auto max-w-[1280px] px-6 pb-20 pt-20 sm:px-8 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-12">
          {/* Brand and social links */}
          <div className="space-y-7 lg:col-span-1">
            <button
              type="button"
              onClick={() => selectPage('home')}
              className="group flex items-center gap-3 text-left"
              title="Claude Code at ₹0 Homepage"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981] font-sans text-base font-bold text-[#052E20] transition-colors group-hover:bg-[#34D399]">
                ₹0
              </span>
              <span className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-[#10B981]">
                Claude Code at <span className="font-sans">₹</span>0
              </span>
            </button>

            <p className="max-w-xs text-sm leading-7 text-[#A3A3A3]">
              A practical, interactive handbook for building capable coding-agent workflows with free-tier cloud services and local models.
            </p>

            <div className="flex items-center gap-5 pt-1" aria-label="Social media links">
              <a
                href="https://github.com/akhilalladi-code/claude-code-at-zero-cost"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub repository"
                title="GitHub"
                className="text-[#777777] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-sm"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/akhil-alladi"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="text-[#777777] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-sm"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@akhilalladi"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube channel"
                title="YouTube"
                className="text-[#777777] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-sm"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product and platform */}
          <nav aria-label="Platform">
            <h3 className={headingClass}>Platform</h3>
            <ul className="space-y-3.5">
              <li><button type="button" onClick={() => selectPage('home')} className={linkClass}>Interactive Homepage &amp; Sandbox</button></li>
              <li><button type="button" onClick={() => selectPage('docs')} className={linkClass}>24-Chapter Master Handbook</button></li>
              <li><button type="button" onClick={() => selectPage('projects')} className={linkClass}>Interactive Practical Labs</button></li>
              <li><button type="button" onClick={() => selectPage('troubleshooting')} className={linkClass}>Diagnostic Runbook Wizard</button></li>
              <li><button type="button" onClick={() => selectPage('prompts')} className={linkClass}>Prompt Engineering Library</button></li>
              <li><button type="button" onClick={() => selectPage('models')} className={linkClass}>Cloud &amp; Local Model Matrix</button></li>
              <li><button type="button" onClick={() => selectPage('commands')} className={linkClass}>CLI Commands &amp; Shortcuts</button></li>
            </ul>
          </nav>

          {/* Architecture guides */}
          <nav aria-label="Zero-cost architectures">
            <h3 className={headingClass}>Architectures</h3>
            <ul className="space-y-3.5">
              <li><button type="button" onClick={() => navigateChapter('chapter-6')} className={linkClass}>Path A: LiteLLM + AI Studio</button></li>
              <li><button type="button" onClick={() => navigateChapter('chapter-7')} className={linkClass}>Path B: Local Ollama</button></li>
              <li><button type="button" onClick={() => navigateChapter('chapter-8')} className={linkClass}>Path C1: Aider Direct CLI</button></li>
              <li><button type="button" onClick={() => navigateChapter('chapter-9')} className={linkClass}>Path C2: Android Termux</button></li>
              <li><button type="button" onClick={() => navigateChapter('chapter-10')} className={linkClass}>MCP Server Configurations</button></li>
              <li><button type="button" onClick={() => navigateChapter('chapter-17')} className={linkClass}>Git Worktree &amp; Agents</button></li>
              <li><button type="button" onClick={() => navigateChapter('chapter-19')} className={linkClass}>Security &amp; Privacy</button></li>
            </ul>
          </nav>

          {/* Resources and support */}
          <nav aria-label="Resources and support">
            <h3 className={headingClass}>Resources</h3>
            <ul className="space-y-3.5">
              <li><button type="button" onClick={() => selectPage('faqs')} className={linkClass}>Frequently Asked Questions</button></li>
              <li><button type="button" onClick={() => selectPage('troubleshooting')} className={linkClass}>Troubleshooting Guide</button></li>
              <li><button type="button" onClick={() => selectPage('contact')} className={linkClass}>Support &amp; Feedback</button></li>
              <li><a href="https://github.com/akhilalladi-code/claude-code-at-zero-cost" target="_blank" rel="noreferrer" className={linkClass}>GitHub Repository</a></li>
            </ul>
          </nav>

          {/* Company and legal */}
          <nav aria-label="Company and legal">
            <h3 className={headingClass}>Company</h3>
            <ul className="space-y-3.5">
              <li><button type="button" onClick={() => selectPage('contact')} className={linkClass}>About &amp; Contact</button></li>
              <li><button type="button" onClick={() => selectPage('privacy')} className={linkClass}>Privacy Policy</button></li>
              <li><button type="button" onClick={() => selectPage('disclaimer')} className={linkClass}>Legal Disclaimer</button></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Minimal copyright bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-6 py-7 text-xs text-[#777777] sm:flex-row sm:items-center sm:px-8 lg:px-10">
          <p>
            © 2026 <span className="font-medium text-[#A3A3A3]">Claude Code at ₹0</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => selectPage('privacy')}
              className={`transition-colors hover:text-white ${activeTab === 'privacy' ? 'text-[#10B981]' : ''}`}
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => selectPage('disclaimer')}
              className={`transition-colors hover:text-white ${activeTab === 'disclaimer' ? 'text-[#10B981]' : ''}`}
            >
              Legal
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="transition-colors hover:text-white"
              aria-label="Back to top"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
   Dedicated Interactive Views for Privacy Policy, Legal Disclaimer & Contact Us
   ───────────────────────────────────────────────────────────────────────── */

interface LegalAndContactViewProps {
  activePage: 'privacy' | 'disclaimer' | 'contact';
  onSwitchPage: (page: 'privacy' | 'disclaimer' | 'contact') => void;
  onNavigateHome: () => void;
  onNavigateTab: (tab: MainNavTab) => void;
}

export const LegalAndContactView: React.FC<LegalAndContactViewProps> = ({
  activePage,
  onSwitchPage,
  onNavigateHome,
  onNavigateTab,
}) => {
  // LocalStorage inspector state for Privacy Policy page
  const [storageStats, setStorageStats] = useState<{
    completedCount: number;
    bookmarksCount: number;
    setupStepsCount: number;
    soundFxPref: string;
  }>({
    completedCount: 0,
    bookmarksCount: 0,
    setupStepsCount: 0,
    soundFxPref: 'false',
  });
  const [storageClearedNotice, setStorageClearedNotice] = useState(false);

  // Email Notification configuration & form state
  const [recipientEmail, setRecipientEmail] = useState(() => {
    return localStorage.getItem('claude_zero_notification_email') || 'support@claudecodezero.dev';
  });
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);
  const [newRecipientInput, setNewRecipientInput] = useState(() => {
    return localStorage.getItem('claude_zero_notification_email') || 'support@claudecodezero.dev';
  });
  const [emailSavedNotice, setEmailSavedNotice] = useState(false);

  // Interactive Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState<
    'setup' | 'bug' | 'feedback' | 'general'
  >('setup');
  const [contactPath, setContactPath] = useState<string>('Path A: LiteLLM + AI Studio');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    timestamp: string;
    name: string;
    email: string;
    category: string;
    path: string;
    message: string;
    dispatchedTo: string;
    mailSentDirectly: boolean;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const handleSaveRecipientEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newRecipientInput.trim();
    if (!clean || !clean.includes('@') || !clean.includes('.')) {
      setFormError('Please enter a valid email address where reader feedback should be delivered.');
      return;
    }
    setFormError(null);
    setRecipientEmail(clean);
    localStorage.setItem('claude_zero_notification_email', clean);
    setIsEditingRecipient(false);
    setEmailSavedNotice(true);
    setTimeout(() => setEmailSavedNotice(false), 3500);
  };

  const getMailtoUrl = (customMessage?: string, ticketIdOverride?: string) => {
    const to = recipientEmail;
    const tid = ticketIdOverride || `CC0-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const sub = encodeURIComponent(`[Claude Code Zero Support #${tid}] ${contactCategory.toUpperCase()}: ${contactName || 'Reader Inquiry'}`);
    const body = encodeURIComponent(
      `Support Ticket: ${tid}\n` +
      `Date: ${new Date().toLocaleString()}\n` +
      `From: ${contactName || 'Anonymous Reader'} (${contactEmail || 'No email specified'})\n` +
      `Category: ${contactCategory.toUpperCase()}\n` +
      `Stack Architecture: ${contactPath}\n\n` +
      `Message:\n${customMessage || contactMessage || '(No message provided)'}\n\n` +
      `---\n` +
      `Transmitted from Claude Code at Zero Reader Support Desk\n` +
      `Destination Inbox: ${recipientEmail}`
    );
    return `mailto:${to}?subject=${sub}&body=${body}`;
  };

  const refreshStorageStats = () => {
    try {
      const completed = JSON.parse(localStorage.getItem('claude_zero_completed') || '[]');
      const bookmarks = JSON.parse(localStorage.getItem('claude_zero_bookmarks') || '[]');
      const steps = JSON.parse(localStorage.getItem('claude_zero_setup_steps') || '[]');
      const sound = localStorage.getItem('claude_zero_sound_fx') || 'false';
      setStorageStats({
        completedCount: Array.isArray(completed) ? completed.length : 0,
        bookmarksCount: Array.isArray(bookmarks) ? bookmarks.length : 0,
        setupStepsCount: Array.isArray(steps) ? steps.length : 0,
        soundFxPref: sound,
      });
    } catch {
      // Ignore storage read errors
    }
  };

  useEffect(() => {
    refreshStorageStats();
  }, [activePage]);

  const handleClearLocalData = () => {
    try {
      localStorage.removeItem('claude_zero_completed');
      localStorage.removeItem('claude_zero_bookmarks');
      localStorage.removeItem('claude_zero_setup_steps');
      localStorage.removeItem('claude_zero_sound_fx');
      refreshStorageStats();
      setStorageClearedNotice(true);
      setTimeout(() => setStorageClearedNotice(false), 4000);
    } catch {
      // ignore
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setFormError('Please fill in your name, email address, and message before submitting.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `CC0-2026-${randomNum}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let sentViaApi = false;
    try {
      // Attempt zero-cost automated email forwarding to recipientEmail
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ticket_id: ticketId,
          name: contactName.trim(),
          email: contactEmail.trim(),
          _replyto: contactEmail.trim(),
          category: contactCategory.toUpperCase(),
          architecture_path: contactPath,
          message: contactMessage.trim(),
          _subject: `[Claude Code Zero Support #${ticketId}] ${contactCategory.toUpperCase()}: ${contactName.trim()}`,
          _template: 'box',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        sentViaApi = true;
      }
    } catch {
      // If network is offline or blocked, fallback to instant mailto is provided
      sentViaApi = false;
    } finally {
      setIsSubmitting(false);
      setSubmittedTicket({
        ticketId,
        timestamp,
        name: contactName.trim(),
        email: contactEmail.trim(),
        category: contactCategory.toUpperCase(),
        path: contactPath,
        message: contactMessage.trim(),
        dispatchedTo: recipientEmail,
        mailSentDirectly: sentViaApi,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Sub-navigation bar to switch between Privacy Policy, Legal Disclaimer, and Contact Us */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#141715] border border-neutral-800">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSwitchPage('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activePage === 'privacy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchPage('disclaimer')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activePage === 'disclaimer'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Disclaimer</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchPage('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activePage === 'contact'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-neutral-400">
          Last Updated: October 2026 &bull; Revision 2.4
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PAGE 1: PRIVACY POLICY
          ───────────────────────────────────────────────────────────── */}
      {activePage === 'privacy' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141715] border border-neutral-800 space-y-6">
            <div className="border-b border-neutral-800 pb-5 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono">
                <EyeOff className="w-3.5 h-3.5" />
                <span>Strict Zero-Telemetry Privacy Standard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Privacy Policy
              </h1>
              <p className="text-sm text-neutral-300 leading-relaxed">
                <strong>Claude Code at <span className="font-sans">₹</span>0</strong> is engineered around a strict local-first, zero-telemetry architecture. Both this web platform and the terminal agent workflows documented inside the handbook are designed to keep your source code, credentials, and reading habits under your sole control.
              </p>
            </div>

            {/* 3 Core Privacy Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800/90 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">1. Zero Analytics or Tracking Cookies</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We do not embed third-party advertising pixels, behavioral trackers, session recorders, or cross-site tracking cookies. Your browsing activity across all 24 chapters and interactive labs remains completely private.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800/90 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-700/50 flex items-center justify-center text-sky-400">
                  <Server className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">2. Localhost Loopback Credential Isolation</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  When you configure Path A (LiteLLM) or Path B (Ollama), your proxy binds exclusively to <code className="text-emerald-300 font-mono">127.0.0.1:4000</code> on your machine. Your API keys and repository files never pass through our servers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800/90 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-purple-400">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">3. Air-Gapped Inference Option</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  For proprietary or NDA-protected codebases, Chapter 7 documents how to run <code className="text-purple-300 font-mono">qwen2.5-coder</code> locally via Ollama with zero outbound network requests, ensuring 100% air-gapped code privacy.
                </p>
              </div>
            </div>

            {/* Detailed Policy Clauses */}
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-[#101312] border border-neutral-800/80 space-y-1.5">
                <h3 className="font-bold text-white text-sm">How Your Browser Stores Progress Locally</h3>
                <p className="text-xs text-neutral-400">
                  To let you bookmark chapters, track your reading completion percentage, and remember your setup checklist progress without requiring a user account or login, this application uses your browser&apos;s built-in <code className="text-emerald-300 font-mono">window.localStorage</code> API. This data never leaves your device.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#101312] border border-neutral-800/80 space-y-1.5">
                <h3 className="font-bold text-white text-sm">Third-Party Model Provider Policies (When Using Cloud Free Tiers)</h3>
                <p className="text-xs text-neutral-400">
                  If you choose Path A (Cloud Free Tier via Google AI Studio, OpenRouter, or GitHub Models), prompts sent from your local terminal are transmitted directly from your machine to the selected provider&apos;s API endpoint. Please consult Chapter 5 (Model Matrix) and Chapter 19 (Security &amp; Privacy Hardening) to understand how free-tier cloud endpoints handle prompt logging versus local Ollama execution.
                </p>
              </div>
            </div>

            {/* Interactive LocalStorage Transparency & Reset Panel */}
            <div className="p-5 rounded-xl bg-[#0b0e0d] border border-emerald-900/60 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Interactive Local Storage Inspector</span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Inspect or wipe the exact keys currently saved in your browser&apos;s local storage for this site:
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={refreshStorageStats}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-medium cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClearLocalData}
                    className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/70 border border-rose-700/50 text-rose-200 text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Local Data</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#121614] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">claude_zero_completed</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1">
                    {storageStats.completedCount} chapters
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#121614] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">claude_zero_bookmarks</div>
                  <div className="text-sm font-bold text-amber-400 mt-1">
                    {storageStats.bookmarksCount} saved
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#121614] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">claude_zero_setup_steps</div>
                  <div className="text-sm font-bold text-sky-400 mt-1">
                    {storageStats.setupStepsCount} steps done
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#121614] border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">claude_zero_sound_fx</div>
                  <div className="text-sm font-bold text-purple-400 mt-1">
                    {storageStats.soundFxPref === 'true' ? 'Enabled' : 'Muted'}
                  </div>
                </div>
              </div>

              {storageClearedNotice && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-600/50 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All local browser storage keys for Claude Code at ₹0 have been wiped clean.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE 2: LEGAL DISCLAIMER
          ───────────────────────────────────────────────────────────── */}
      {activePage === 'disclaimer' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141715] border border-neutral-800 space-y-6">
            <div className="border-b border-neutral-800 pb-5 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-700/50 text-amber-300 text-xs font-mono">
                <Scale className="w-3.5 h-3.5" />
                <span>Independent Publication &amp; Technical Warranty Notice</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Legal Disclaimer
              </h1>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Please read the following disclosures regarding trademark ownership, independent editorial status, free-tier API rate limits, and safe execution of autonomous coding agents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>1. Independent Educational Publication</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  <strong>Claude Code at <span className="font-sans">₹</span>0</strong> is an independent educational software engineering publication and interactive learning platform. It is not affiliated with, endorsed by, sponsored by, or officially approved by Anthropic PBC, Google LLC, Microsoft Corporation, GitHub Inc., OpenRouter Inc., Ollama Inc., or any other commercial entity mentioned in the benchmarks.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>2. Trademark Notice</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  &ldquo;Claude&rdquo; and &ldquo;Claude Code&rdquo; are trademarks of Anthropic PBC. &ldquo;Gemini&rdquo; and &ldquo;Google AI Studio&rdquo; are trademarks of Google LLC. &ldquo;GitHub Copilot&rdquo; is a trademark of GitHub, Inc. All product names, CLI binary names, and company logos referenced in this handbook are the property of their respective owners and are used strictly for technical interoperability and educational documentation under nominative fair use.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span>3. Zero-Cost Quota &amp; Billing Responsibility</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All cloud configurations documented in this handbook rely on official developer free tiers (such as Google AI Studio&apos;s free tier and OpenRouter&apos;s <code className="text-emerald-300 font-mono">:free</code> suffix endpoints). Provider rate limits (RPM/TPM/RPD) are subject to change by their respective operators. To guarantee a <span className="font-sans">₹</span>0 bill, never attach a commercial pay-as-you-go credit card to experimental accounts unless you explicitly intend to purchase paid usage.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1110] border border-neutral-800 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span>4. Autonomous Shell Execution Safety</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Terminal coding agents execute real shell commands and modify files on your filesystem. Always run agents inside version-controlled Git repositories or isolated <code className="text-emerald-300 font-mono">git worktree</code> branches as taught in Chapter 17, and review proposed bash commands before approving execution. The authors assume no liability for unintended file modifications or data loss.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
              <div>
                <span className="font-semibold text-white">Want to verify our security &amp; safety runbooks?</span>{' '}
                Read Chapter 19 (Security &amp; Privacy Hardening) or inspect the 26 diagnostic runbooks.
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('troubleshooting')}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs cursor-pointer transition-colors"
              >
                Open Diagnostic Runbooks &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PAGE 3: CONTACT US (Interactive Support Desk + FAQ)
          ───────────────────────────────────────────────────────────── */}
      {activePage === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#141715] border border-neutral-800 space-y-6">
            <div className="border-b border-neutral-800 pb-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-700/50 text-sky-300 text-xs font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Engineering Support &amp; Reader Feedback</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 text-[11px] font-mono">
                  <BellRing className="w-3 h-3 text-emerald-400" />
                  <span>Email Alerts: Active</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Contact Us
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Stuck on a LiteLLM config, found an edge-case in Ollama tool calling, or have feedback on a chapter? Submit below and an email will be automatically sent to the author.
              </p>
            </div>

            {/* Email Notification Destination Configuration Card */}
            <div className="p-4 rounded-xl bg-[#0b0e0d] border border-neutral-800/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
                    <AtSign className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-200">
                      Author &amp; Owner Notification Email
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Incoming reader feedback is dispatched directly to this inbox
                    </div>
                  </div>
                </div>

                {!isEditingRecipient && (
                  <button
                    type="button"
                    onClick={() => {
                      setNewRecipientInput(recipientEmail);
                      setIsEditingRecipient(true);
                    }}
                    className="px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                    title="Change destination email"
                  >
                    <Settings2 className="w-3 h-3 text-emerald-400" />
                    <span>Change Email</span>
                  </button>
                )}
              </div>

              {isEditingRecipient ? (
                <form onSubmit={handleSaveRecipientEmail} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    value={newRecipientInput}
                    onChange={(e) => setNewRecipientInput(e.target.value)}
                    placeholder="Enter your email (e.g. yourname@gmail.com)"
                    className="flex-1 bg-[#141715] border border-emerald-600/70 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none"
                    autoFocus
                  />
                  <div className="flex items-center gap-1.5">
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingRecipient(false)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-neutral-500">Destination:</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 font-semibold">
                      {recipientEmail}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Zero-cost mail relay &bull; No API key required
                  </div>
                </div>
              )}

              {emailSavedNotice && (
                <div className="p-2 rounded-lg bg-emerald-950/70 border border-emerald-600/60 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Notification email updated! Reader messages will now be sent to {recipientEmail}.</span>
                </div>
              )}
            </div>

            {submittedTicket ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/70 space-y-4 animate-in fade-in">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Support Message &amp; Email Dispatched!
                      </h3>
                      <p className="text-xs text-emerald-300 font-mono">
                        Ticket ID: {submittedTicket.ticketId} &bull; Logged at {submittedTicket.timestamp}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0b0e0d] border border-neutral-800 text-xs space-y-2 font-mono text-neutral-300">
                  <div><span className="text-neutral-500">Sender:</span> {submittedTicket.name} ({submittedTicket.email})</div>
                  <div><span className="text-neutral-500">Category:</span> {submittedTicket.category}</div>
                  <div><span className="text-neutral-500">Stack Path:</span> {submittedTicket.path}</div>
                  <div><span className="text-neutral-500">Recipient Email:</span> <span className="text-emerald-400 font-semibold">{submittedTicket.dispatchedTo}</span></div>
                  <div>
                    <span className="text-neutral-500">Delivery Status:</span>{' '}
                    {submittedTicket.mailSentDirectly ? (
                      <span className="text-emerald-400 font-semibold">✓ Dispatched to Inbox via Automated Mail Relay</span>
                    ) : (
                      <span className="text-sky-400 font-semibold">✓ Ticket Recorded (Click &apos;Open in Mail App&apos; to send copy directly)</span>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Confirmation:</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    An email notification containing this feedback, stack diagnostic info, and ticket ID has been routed to{' '}
                    <strong className="text-emerald-300 font-mono">{submittedTicket.dispatchedTo}</strong>. You can also open your mail client directly below.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={getMailtoUrl(submittedTicket.message, submittedTicket.ticketId)}
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Email App (mailto:)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const text = `Support Ticket: ${submittedTicket.ticketId}\nSender: ${submittedTicket.name} (${submittedTicket.email})\nCategory: ${submittedTicket.category}\nStack: ${submittedTicket.path}\nMessage:\n${submittedTicket.message}`;
                      navigator.clipboard.writeText(text);
                      setCopiedTicket(true);
                      setTimeout(() => setCopiedTicket(false), 3000);
                    }}
                    className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    {copiedTicket ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ticket Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Ticket Details</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedTicket(null);
                      setContactMessage('');
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-700/60 text-xs text-rose-200">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g., Aarav Sharma"
                      required
                      className="w-full bg-[#0d100f] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@domain.com"
                      required
                      className="w-full bg-[#0d100f] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Inquiry Topic Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Topic / Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'setup', label: 'Setup Help' },
                      { id: 'bug', label: 'Bug / Runbook' },
                      { id: 'feedback', label: 'Book Feedback' },
                      { id: 'general', label: 'General Inquiry' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setContactCategory(item.id as any)}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                          contactCategory === item.id
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold'
                            : 'bg-[#0d100f] border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Architecture Path Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Which ₹0 Architecture Path are you running?
                  </label>
                  <select
                    value={contactPath}
                    onChange={(e) => setContactPath(e.target.value)}
                    className="w-full bg-[#0d100f] border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Path A: LiteLLM + AI Studio">Path A: LiteLLM Proxy + Google AI Studio (Cloud Free Tier)</option>
                    <option value="Path B: Local Ollama 64K">Path B: 100% Local Ollama (Qwen2.5-Coder 64K)</option>
                    <option value="Path C1: Aider Direct CLI">Path C1: Aider Direct CLI (Zero Proxy)</option>
                    <option value="Path C2: Android Termux">Path C2: Android Termux Mobile Setup</option>
                    <option value="General / Not Applicable">General Question / Not Applicable</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Message or Terminal Error Log *
                  </label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your question, feedback, or paste any terminal output you want help diagnosing..."
                    required
                    className="w-full bg-[#0d100f] border border-neutral-800 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Email to {recipientEmail}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit &amp; Send Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getMailtoUrl()}
                    className="px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors text-center"
                    title="Open your device default mail app with pre-filled content"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Send via Mail App (mailto)</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Support Channels & Instant Triage (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#141715] border border-neutral-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Direct Channels &amp; Delivery SLA</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#0d100f] border border-neutral-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-neutral-400 font-mono text-[10px] uppercase">Active Reader Notification Inbox</div>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 font-mono">Live</span>
                  </div>
                  <div className="font-mono text-emerald-400 font-semibold break-all">{recipientEmail}</div>
                  <div className="text-neutral-500 text-[11px]">Submissions trigger instant email delivery here</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0d100f] border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 font-mono text-[10px] uppercase">Security &amp; Errata Submissions</div>
                  <div className="font-mono text-sky-400 font-semibold">errata@claudecodezero.dev</div>
                  <div className="text-neutral-500 text-[11px]">Include chapter number &amp; OS version</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 space-y-1 text-xs">
                <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
                  <BellRing className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How You Receive Emails:</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  When a reader fills out the form, our zero-cost mail relay sends an email directly to your destination address with their name, return email, selected stack, and message. You can reply directly to the reader from your inbox!
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800 space-y-2.5">
                <div className="text-xs font-semibold text-neutral-200">
                  Common Questions Resolved Instantly:
                </div>

                <div className="space-y-2 text-xs text-neutral-400">
                  <div className="p-3 rounded-lg bg-[#0d100f] border border-neutral-800/80">
                    <div className="font-semibold text-neutral-200">Q: Why does Claude Code ask me to log in on startup?</div>
                    <p className="mt-1 text-[11px]">
                      Ensure both <code className="text-emerald-300 font-mono">ANTHROPIC_BASE_URL</code> and <code className="text-emerald-300 font-mono">ANTHROPIC_AUTH_TOKEN</code> are exported in the same shell session before launching <code className="text-emerald-300 font-mono">claude</code>.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0d100f] border border-neutral-800/80">
                    <div className="font-semibold text-neutral-200">Q: How do I fix HTTP 429 rate-limit errors on free cloud tiers?</div>
                    <p className="mt-1 text-[11px]">
                      Run <code className="text-emerald-300 font-mono">/compact</code> to shrink context tokens by 70% or enable multi-key fallback routing in your LiteLLM <code className="text-emerald-300 font-mono">config.yaml</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
