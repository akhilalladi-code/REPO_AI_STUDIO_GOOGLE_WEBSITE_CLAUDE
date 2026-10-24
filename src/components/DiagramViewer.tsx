/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * High-fidelity, accessible SVG diagrams from the Handbook
 */

import React from 'react';
import { HandbookFigure } from '../types/handbook';

interface DiagramViewerProps {
  figure: HandbookFigure;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ figure }) => {
  const renderDiagram = () => {
    switch (figure.id) {
      case 'fig-0-1':
        return (
          <svg viewBox="0 0 800 360" className="w-full h-auto text-neutral-800 dark:text-neutral-200">
            <rect width="800" height="360" rx="8" fill="currentColor" fillOpacity="0.03" />
            {/* Top Root Decision */}
            <rect x="250" y="20" width="300" height="55" rx="6" fill="#16805D" />
            <text x="400" y="44" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="13">What is your primary device?</text>
            <text x="400" y="62" fill="#d1fae5" textAnchor="middle" fontSize="11">Evaluate OS &amp; RAM constraints</text>

            {/* Connecting lines */}
            <path d="M 320 75 L 140 120" stroke="#16805D" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 400 75 L 400 120" stroke="#16805D" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
            <path d="M 480 75 L 660 120" stroke="#16805D" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

            {/* Level 2 Nodes */}
            <rect x="40" y="120" width="200" height="50" rx="6" fill="currentColor" fillOpacity="0.08" stroke="#16805D" />
            <text x="140" y="142" textAnchor="middle" fontWeight="bold" fontSize="12">Android Phone Only</text>
            <text x="140" y="158" textAnchor="middle" fontSize="10" fillOpacity="0.7">ARM64, 4GB–12GB RAM</text>

            <rect x="300" y="120" width="200" height="50" rx="6" fill="currentColor" fillOpacity="0.08" stroke="#16805D" />
            <text x="400" y="142" textAnchor="middle" fontWeight="bold" fontSize="12">Windows/Mac/Linux (4-8GB)</text>
            <text x="400" y="158" textAnchor="middle" fontSize="10" fillOpacity="0.7">No dedicated GPU / iGPU</text>

            <rect x="560" y="120" width="200" height="50" rx="6" fill="currentColor" fillOpacity="0.08" stroke="#16805D" />
            <text x="660" y="142" textAnchor="middle" fontWeight="bold" fontSize="12">Workstation (16GB–64GB+)</text>
            <text x="660" y="158" textAnchor="middle" fontSize="10" fillOpacity="0.7">Dedicated GPU / Apple Silicon</text>

            {/* Connecting lines to solutions */}
            <path d="M 140 170 L 140 210" stroke="#16805D" strokeWidth="2" fill="none" />
            <path d="M 400 170 L 400 210" stroke="#16805D" strokeWidth="2" fill="none" />
            <path d="M 660 170 L 660 210" stroke="#16805D" strokeWidth="2" fill="none" />

            {/* Level 3 Recommendations */}
            <rect x="20" y="210" width="240" height="120" rx="8" fill="#16805D" fillOpacity="0.12" stroke="#16805D" strokeWidth="1.5" />
            <text x="140" y="235" textAnchor="middle" fontWeight="bold" fill="#16805D" fontSize="13">Path C2 / Remote SSH</text>
            <text x="140" y="258" textAnchor="middle" fontSize="11" fontWeight="600">Termux (F-Droid)</text>
            <text x="140" y="275" textAnchor="middle" fontSize="10" fillOpacity="0.8">glibc-runner (grun) + LiteLLM</text>
            <text x="140" y="292" textAnchor="middle" fontSize="10" fillOpacity="0.8">Google AI Studio Free Tier</text>
            <text x="140" y="312" textAnchor="middle" fontSize="10" fill="#16805D" fontWeight="bold">or Native Aider in Termux</text>

            <rect x="280" y="210" width="240" height="120" rx="8" fill="#16805D" fillOpacity="0.12" stroke="#16805D" strokeWidth="1.5" />
            <text x="400" y="235" textAnchor="middle" fontWeight="bold" fill="#16805D" fontSize="13">Path A (Cloud Proxy)</text>
            <text x="400" y="258" textAnchor="middle" fontSize="11" fontWeight="600">Official Claude Code CLI</text>
            <text x="400" y="275" textAnchor="middle" fontSize="10" fillOpacity="0.8">+ LiteLLM (:4000) Proxy</text>
            <text x="400" y="292" textAnchor="middle" fontSize="10" fillOpacity="0.8">Google AI Studio Free Tier</text>
            <text x="400" y="312" textAnchor="middle" fontSize="10" fill="#16805D" fontWeight="bold">(1,500 RPD, 1M Context)</text>

            <rect x="540" y="210" width="240" height="120" rx="8" fill="#16805D" fillOpacity="0.12" stroke="#16805D" strokeWidth="1.5" />
            <text x="660" y="235" textAnchor="middle" fontWeight="bold" fill="#16805D" fontSize="13">Path B (Local Offline)</text>
            <text x="660" y="258" textAnchor="middle" fontSize="11" fontWeight="600">Official Claude Code CLI</text>
            <text x="660" y="275" textAnchor="middle" fontSize="10" fillOpacity="0.8">+ Ollama (:11434) / LM Studio</text>
            <text x="660" y="292" textAnchor="middle" fontSize="10" fillOpacity="0.8">Qwen2.5-Coder / Qwen3-Coder</text>
            <text x="660" y="312" textAnchor="middle" fontSize="10" fill="#16805D" fontWeight="bold">(64K Context Modelfile)</text>
          </svg>
        );

      case 'fig-1-1':
        return (
          <svg viewBox="0 0 800 360" className="w-full h-auto text-neutral-800 dark:text-neutral-200">
            <rect width="800" height="360" rx="8" fill="currentColor" fillOpacity="0.03" />
            {/* Left Box: Web Chat */}
            <rect x="40" y="30" width="320" height="300" rx="8" fill="currentColor" fillOpacity="0.06" stroke="#ef4444" strokeWidth="1.5" />
            <text x="200" y="60" textAnchor="middle" fontWeight="bold" fill="#ef4444" fontSize="14">Passive Web Chat (claude.ai Free)</text>
            <text x="200" y="80" textAnchor="middle" fontSize="11" fillOpacity="0.7">Isolated Browser Sandbox — No OS Access</text>

            <rect x="60" y="100" width="280" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
            <text x="200" y="125" textAnchor="middle" fontSize="11">Chatbot outputs raw code snippet</text>

            <path d="M 200 145 L 200 175" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="60" y="180" width="280" height="55" rx="4" fill="#fee2e2" stroke="#f87171" />
            <text x="200" y="202" textAnchor="middle" fill="#991b1b" fontWeight="bold" fontSize="11">Manual Human Copy-Paste Bridge</text>
            <text x="200" y="220" textAnchor="middle" fill="#991b1b" fontSize="10">High friction, context drift on &gt;3 files</text>

            <path d="M 200 240 L 200 270" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
            <rect x="60" y="275" width="280" height="40" rx="4" fill="currentColor" fillOpacity="0.1" />
            <text x="200" y="300" textAnchor="middle" fontSize="11">User manually runs terminal &amp; fixes errors</text>

            {/* Right Box: Agentic Loop */}
            <rect x="440" y="30" width="320" height="300" rx="8" fill="#16805D" fillOpacity="0.08" stroke="#16805D" strokeWidth="2" />
            <text x="600" y="60" textAnchor="middle" fontWeight="bold" fill="#16805D" fontSize="14">Autonomous Closed-Loop Coding Agent</text>
            <text x="600" y="80" textAnchor="middle" fontSize="11" fillOpacity="0.7">Direct Terminal &amp; Workspace Integration</text>

            <rect x="460" y="100" width="280" height="40" rx="4" fill="#16805D" fillOpacity="0.15" />
            <text x="600" y="125" textAnchor="middle" fontSize="11" fontWeight="600">1. Repo Indexing (CLAUDE.md, AST, Grep)</text>

            <path d="M 600 140 L 600 155" stroke="#16805D" strokeWidth="2" />
            <rect x="460" y="155" width="280" height="40" rx="4" fill="#16805D" fillOpacity="0.25" />
            <text x="600" y="180" textAnchor="middle" fontSize="11" fontWeight="600">2. Planning &amp; Structured Tool Schema</text>

            <path d="M 600 195 L 600 210" stroke="#16805D" strokeWidth="2" />
            <rect x="460" y="210" width="280" height="40" rx="4" fill="#16805D" fillOpacity="0.35" />
            <text x="600" y="235" textAnchor="middle" fontSize="11" fontWeight="600">3. Sandboxed Execution (Edit, Write, Bash)</text>

            <path d="M 600 250 L 600 265" stroke="#16805D" strokeWidth="2" />
            <rect x="460" y="265" width="280" height="45" rx="4" fill="#16805D" />
            <text x="600" y="287" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">4. Self-Healing Verification Loop</text>
            <text x="600" y="302" textAnchor="middle" fill="#d1fae5" fontSize="10">Inspects exit code; re-patches until tests pass</text>

            {/* Loopback Arrow */}
            <path d="M 740 287 C 765 287, 765 175, 740 175" stroke="#16805D" strokeWidth="2" fill="none" />
          </svg>
        );

      case 'fig-4-1':
        return (
          <svg viewBox="0 0 800 320" className="w-full h-auto text-neutral-800 dark:text-neutral-200">
            <rect width="800" height="320" rx="8" fill="currentColor" fillOpacity="0.03" />
            {/* Client Harness */}
            <rect x="30" y="60" width="200" height="200" rx="8" fill="currentColor" fillOpacity="0.08" stroke="#16805D" strokeWidth="2" />
            <text x="130" y="95" textAnchor="middle" fontWeight="bold" fontSize="13">Client Software Layer</text>
            <text x="130" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#16805D">Claude Code CLI</text>
            <text x="130" y="145" textAnchor="middle" fontSize="10" fillOpacity="0.8">or Open-Source Agent</text>
            <text x="130" y="165" textAnchor="middle" fontSize="10" fillOpacity="0.8">(Aider / OpenCode / Cline)</text>
            <text x="130" y="200" textAnchor="middle" fontSize="10" fill="#e11d48">Default: api.anthropic.com</text>
            <text x="130" y="215" textAnchor="middle" fontSize="9" fillOpacity="0.6">(Blocked at ₹0)</text>

            {/* Path A (Proxy) */}
            <path d="M 230 110 L 320 80" stroke="#16805D" strokeWidth="2" fill="none" />
            <rect x="320" y="50" width="200" height="70" rx="6" fill="#16805D" fillOpacity="0.15" stroke="#16805D" />
            <text x="420" y="75" textAnchor="middle" fontWeight="bold" fontSize="12">LiteLLM Proxy (:4000)</text>
            <text x="420" y="95" textAnchor="middle" fontSize="10" fillOpacity="0.8">Translates Anthropic /v1/messages</text>
            <text x="420" y="108" textAnchor="middle" fontSize="9" fill="#16805D">Strips output_config &amp; maps aliases</text>

            <path d="M 520 85 L 590 85" stroke="#16805D" strokeWidth="2" fill="none" />
            <rect x="590" y="50" width="180" height="70" rx="6" fill="#16805D" />
            <text x="680" y="75" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">Google AI Studio</text>
            <text x="680" y="95" textAnchor="middle" fill="#d1fae5" fontSize="10">1,500 RPD Flash / 1M Context</text>
            <text x="680" y="108" textAnchor="middle" fill="#ffffff" fontSize="9">₹0.00 Unbilled Project</text>

            {/* Path B (Local) */}
            <path d="M 230 170 L 320 200" stroke="#0284c7" strokeWidth="2" fill="none" />
            <rect x="320" y="175" width="200" height="70" rx="6" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" />
            <text x="420" y="200" textAnchor="middle" fontWeight="bold" fontSize="12">Native Local Server</text>
            <text x="420" y="220" textAnchor="middle" fontSize="10" fillOpacity="0.8">Ollama (:11434) / LM Studio</text>
            <text x="420" y="233" textAnchor="middle" fontSize="9" fill="#0284c7">Native POST /v1/messages</text>

            <path d="M 520 210 L 590 210" stroke="#0284c7" strokeWidth="2" fill="none" />
            <rect x="590" y="175" width="180" height="70" rx="6" fill="#0284c7" />
            <text x="680" y="200" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">Local Open Weights</text>
            <text x="680" y="220" textAnchor="middle" fill="#bae6fd" fontSize="10">Qwen2.5 / Qwen3 64K Context</text>
            <text x="680" y="233" textAnchor="middle" fill="#ffffff" fontSize="9">100% Offline &amp; Air-Gapped</text>
          </svg>
        );

      default:
        return (
          <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg text-center text-sm text-neutral-500">
            [Visual Architectural Diagram: {figure.title} ({figure.number})]
          </div>
        );
    }
  };

  return (
    <figure className="my-6 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50/50 dark:bg-neutral-900/40 p-4">
      <div className="overflow-x-auto">{renderDiagram()}</div>
      <figcaption className="mt-3 text-xs text-center text-neutral-600 dark:text-neutral-400 font-mono">
        <strong>{figure.number}:</strong> {figure.title} <span className="text-neutral-400">({figure.pageRef ? `p. ${figure.pageRef}` : ''})</span>
      </figcaption>
    </figure>
  );
};
