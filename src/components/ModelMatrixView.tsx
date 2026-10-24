/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Appendix C: Comprehensive Model Comparison Matrix
 */

import React, { useState } from 'react';
import { MODELS_DATA } from '../data/modelsData';
import { Cpu, Cloud, HardDrive, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ModelMatrixView: React.FC = () => {
  const [filterType, setFilterType] = useState<'All' | 'Cloud' | 'Local'>('All');

  const filtered = MODELS_DATA.filter((m) => {
    if (filterType === 'Cloud') return m.minHardware.includes('0 GB VRAM');
    if (filterType === 'Local') return !m.minHardware.includes('0 GB VRAM') || m.provider.includes('Local');
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <span>Appendix C: Comprehensive Model Comparison Matrix</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Verified technical specifications, context ceilings, hardware requirements, and tool-use suitability as of October 24, 2026.
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs">
            <button
              onClick={() => setFilterType('All')}
              className={`px-3 py-1 rounded cursor-pointer ${filterType === 'All' ? 'bg-white dark:bg-neutral-700 font-semibold text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'}`}
            >
              All (12)
            </button>
            <button
              onClick={() => setFilterType('Cloud')}
              className={`px-3 py-1 rounded cursor-pointer flex items-center gap-1 ${filterType === 'Cloud' ? 'bg-white dark:bg-neutral-700 font-semibold text-emerald-600 shadow-xs' : 'text-neutral-500'}`}
            >
              <Cloud className="w-3 h-3" />
              <span>Cloud APIs</span>
            </button>
            <button
              onClick={() => setFilterType('Local')}
              className={`px-3 py-1 rounded cursor-pointer flex items-center gap-1 ${filterType === 'Local' ? 'bg-white dark:bg-neutral-700 font-semibold text-blue-600 shadow-xs' : 'text-neutral-500'}`}
            >
              <HardDrive className="w-3 h-3" />
              <span>Local GGUF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold">
              <tr>
                <th className="py-3 px-4">Model &amp; Provider</th>
                <th className="py-3 px-3">Context Window</th>
                <th className="py-3 px-3">Min Hardware</th>
                <th className="py-3 px-3">Cost Model &amp; Free Quota</th>
                <th className="py-3 px-3">Tool-Use Suitability</th>
                <th className="py-3 px-3">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {filtered.map((m, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-900/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono text-xs">
                      {m.name}
                    </div>
                    <div className="text-[11px] text-neutral-500">{m.provider}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">License: {m.license}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    {m.contextWindow}
                  </td>
                  <td className="py-3.5 px-3 text-neutral-700 dark:text-neutral-300">
                    {m.minHardware}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100 block">{m.costModel}</span>
                    <span className="text-[11px] text-neutral-500">{m.recommendedRole}</span>
                  </td>
                  <td className="py-3.5 px-3 text-neutral-600 dark:text-neutral-300">
                    {m.toolUseSuitability}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{m.verificationBadge.replace('Verified from official documentation', 'Official Doc')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
