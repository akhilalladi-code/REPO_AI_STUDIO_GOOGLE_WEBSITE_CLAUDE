/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapter 21: Interactive Troubleshooting Wizard (26 Deterministic Runbooks)
 */

import React, { useState } from 'react';
import { TROUBLESHOOTING_DATA } from '../data/troubleshootingData';
import { CodeBlock } from './CodeBlock';
import {
  Search,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Terminal,
  CheckCircle2,
  HelpCircle,
  Cpu,
  KeyRound,
  FileCode,
  ShieldAlert,
} from 'lucide-react';

export const TroubleshootingWizard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIssue, setExpandedIssue] = useState<string | null>('21.5');

  const categories = [
    'All',
    'Installation & PATH',
    'Authentication & Gateway',
    'Rate Limits & OOM',
    'Android & Termux',
    'Permissions & Security',
    'Git & Deployment',
  ];

  const filtered = TROUBLESHOOTING_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.issueNumber.includes(q) ||
      item.symptoms.toLowerCase().includes(q) ||
      item.likelyCauses.some((c) => c.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Installation & PATH':
        return <Terminal className="w-4 h-4 text-blue-500" />;
      case 'Authentication & Gateway':
        return <KeyRound className="w-4 h-4 text-purple-500" />;
      case 'Rate Limits & OOM':
        return <Cpu className="w-4 h-4 text-amber-500" />;
      case 'Android & Termux':
        return <FileCode className="w-4 h-4 text-emerald-500" />;
      case 'Permissions & Security':
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>Chapter 21: Troubleshooting Encyclopedia &amp; Runbook Wizard</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono">
                26 Issues
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Deterministic 6-part runbooks resolving 95%+ of zero-cost agent failures in under three minutes.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="search"
              placeholder="Filter by issue number (21.5), symptom (output_config), or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-emerald-600"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-neutral-500 bg-white dark:bg-[#161817] rounded-xl border border-neutral-200 dark:border-neutral-800">
            No diagnostic runbooks match your search criteria. Try a different term.
          </div>
        ) : (
          filtered.map((item) => {
            const isExpanded = expandedIssue === item.issueNumber;
            return (
              <div
                key={item.issueNumber}
                id={`issue-${item.issueNumber}`}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] overflow-hidden transition-all shadow-2xs"
              >
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => setExpandedIssue(isExpanded ? null : item.issueNumber)}
                  className="w-full p-4 flex items-start sm:items-center justify-between gap-3 text-left hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="shrink-0 p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800">
                      {getCategoryIcon(item.category)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          Issue {item.issueNumber}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          p. {item.pageRef}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mt-0.5 truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <div className="shrink-0 text-neutral-400">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded 6-Part Runbook Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 space-y-4 text-xs sm:text-sm">
                    {/* 1. Exact Symptom */}
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                        <span className="text-rose-600 font-mono">1.</span>
                        <span>Exact Symptom / Observed Behavior:</span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono text-xs">
                        {item.symptoms}
                      </p>
                    </div>

                    {/* 2. Likely Causes */}
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                        <span className="text-amber-600 font-mono">2.</span>
                        <span>Root Cause Analysis:</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-neutral-600 dark:text-neutral-400">
                        {item.likelyCauses.map((cause, cIdx) => (
                          <li key={cIdx}>{cause}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 3. Diagnostic Command */}
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 mb-1 flex items-center gap-1.5">
                        <span className="text-blue-600 font-mono">3.</span>
                        <span>Diagnostic Command ({item.diagnosticCommand.shell}):</span>
                      </div>
                      <CodeBlock
                        code={item.diagnosticCommand.command}
                        language="bash"
                        environment={item.diagnosticCommand.shell as 'PowerShell' | 'Bash'}
                        explanation={item.diagnosticCommand.note}
                      />
                    </div>

                    {/* 4. Safe Corrective Steps */}
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-1.5">
                        <span className="text-emerald-600 font-mono">4.</span>
                        <span>Safe Corrective Steps:</span>
                      </div>
                      <div className="space-y-3">
                        {item.correctiveSteps.map((step, sIdx) => (
                          <div key={sIdx} className="space-y-1.5">
                            <p className="font-medium text-neutral-800 dark:text-neutral-200">
                              {sIdx + 1}. {step.description}
                            </p>
                            {step.code && (
                              <CodeBlock
                                code={step.code}
                                language={step.language || 'bash'}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. Verification Checkpoint */}
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>5. Verification Checkpoint:</span>
                      </div>
                      <p className="text-emerald-800 dark:text-emerald-400 text-xs">
                        {item.verificationCheckpoint}
                      </p>
                    </div>

                    {/* 6. When to Switch */}
                    {item.whenToSwitch && (
                      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-400">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                          6. When to Switch to an Alternative:{' '}
                        </span>
                        {item.whenToSwitch}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
