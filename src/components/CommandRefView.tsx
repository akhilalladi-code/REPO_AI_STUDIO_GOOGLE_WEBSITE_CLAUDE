/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Appendix A & Table IDX.1: Master Command Reference Index
 */

import React, { useState } from 'react';
import { COMMANDS_DATA, CliCommandRef } from '../data/commandsData';
import { Terminal, Copy, Check, Search, ShieldAlert, Monitor, Smartphone } from 'lucide-react';

export const CommandRefView: React.FC = () => {
  const [osFilter, setOsFilter] = useState<string>('All');
  const [utilityFilter, setUtilityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const utilities = ['All', 'claude', 'aider', 'litellm', 'ollama', 'opencode', 'git', 'winget', 'termux'];
  const osList = ['All', 'Windows', 'Linux', 'Android Termux', 'Cross-Platform'];

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const filtered = COMMANDS_DATA.filter((cmd) => {
    const matchesOs = osFilter === 'All' || cmd.os === osFilter;
    const matchesUtil = utilityFilter === 'All' || cmd.utility === utilityFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      cmd.command.toLowerCase().includes(q) ||
      cmd.purpose.toLowerCase().includes(q) ||
      cmd.utility.toLowerCase().includes(q);
    return matchesOs && matchesUtil && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-600" />
              <span>Appendix A &amp; Index: Master Command Reference</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Every installation, configuration, and verification command organized by tool and OS with explicit safety notes.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {COMMANDS_DATA.length} Verified Commands
          </span>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="search"
              placeholder="Filter commands by syntax, tool, or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-emerald-600"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs">
              {osList.map((os) => (
                <button
                  key={os}
                  onClick={() => setOsFilter(os)}
                  className={`px-2.5 py-1 rounded cursor-pointer ${osFilter === os ? 'bg-white dark:bg-neutral-700 font-semibold text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'}`}
                >
                  {os}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto text-xs py-1">
          <span className="text-neutral-400 text-[11px] shrink-0 mr-1">Tool:</span>
          {utilities.map((u) => (
            <button
              key={u}
              onClick={() => setUtilityFilter(u)}
              className={`px-2.5 py-1 rounded-md text-xs cursor-pointer ${
                utilityFilter === u
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Commands Table / Cards */}
      <div className="space-y-3">
        {filtered.map((cmd) => (
          <div
            key={cmd.id}
            id={cmd.id}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] shadow-2xs space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {cmd.utility}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                  {cmd.os}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  p. {cmd.pageRef}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(cmd.id, cmd.command)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-medium cursor-pointer transition-colors"
                aria-label={`Copy command ${cmd.command}`}
              >
                {copiedId === cmd.id ? (
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

            <div className="p-3 rounded-lg bg-neutral-900 text-emerald-400 font-mono text-xs overflow-x-auto">
              <code>{cmd.command}</code>
            </div>

            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {cmd.purpose}
            </p>

            <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-start gap-1.5 pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Safety Note:</strong> {cmd.riskNote}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
