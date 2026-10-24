/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Homepage for the Claude Code at ₹0 Technical Documentation Platform
 * Designed with bespoke editorial typography, authentic book artwork, and architecture schematics.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wrench,
  Smartphone,
  Copy,
  Check,
  Rocket,
  Code2,
  FileText,
  Workflow,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface HomepageViewProps {
  onStartReading: () => void;
  onNavigateChapter: (slug: string) => void;
  onOpenSearch: () => void;
  onOpenPdfViewer: () => void;
  onOpenDeploy: () => void;
  onSelectTab: (tab: any) => void;
}

/**
 * High-craft tactile hardcover book cover visual component (Image / Graphic artifact)
 */
const HandbookCoverVisual: React.FC<{ onOpenPdf: () => void }> = ({ onOpenPdf }) => (
  <div className="relative group cursor-pointer max-w-sm mx-auto" onClick={onOpenPdf}>
    {/* Ambient book glow */}
    <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

    {/* Physical Book Container with 3D perspective shadow */}
    <div className="relative bg-[#0d100e] border border-[#232a25] rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:-translate-y-1.5 flex flex-col aspect-[3/4] p-6 text-neutral-100 select-none">
      {/* Decorative Embossed Border Rim */}
      <div className="absolute inset-2 border border-emerald-500/20 rounded-lg pointer-events-none" />
      <div className="absolute inset-2.5 border border-amber-500/15 rounded-lg pointer-events-none" />

      {/* Book Spine Edge Highlight */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-neutral-950 via-neutral-800 to-transparent" />

      {/* Ribbon Bookmark */}
      <div className="absolute right-8 top-0 w-4 h-12 bg-emerald-600 shadow-md">
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#0d100e] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
      </div>

      {/* Book Cover Header */}
      <div className="pt-2 pl-3">
        <div className="text-[9px] font-mono tracking-[0.25em] text-emerald-400 uppercase font-semibold">
          Autonomous Systems Engineering Manual
        </div>
        <div className="text-[8px] font-mono tracking-widest text-neutral-400 mt-0.5">
          First Complete Reference Edition &bull; 2026
        </div>
      </div>

      {/* Cover Emblem / Geometric SVG Graphic */}
      <div className="my-auto pl-3 flex flex-col items-center justify-center text-center py-4">
        <div className="relative w-28 h-28 mb-3">
          <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500/80">
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <polygon points="50,14 82,72 18,72" fill="none" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
            <polygon points="50,86 18,28 82,28" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            <circle cx="50" cy="50" r="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
            {/* Terminal prompt cursor icon */}
            <path d="M46 47 L52 50 L46 53" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight font-serif">
          CLAUDE CODE
        </div>
        <div className="text-3xl font-black tracking-tight text-emerald-400 leading-none mt-1">
          AT ₹0
        </div>
        <div className="text-[10px] tracking-widest text-neutral-300 uppercase font-medium mt-2 max-w-[200px]">
          The Complete AI Coding Agent Handbook
        </div>
      </div>

      {/* Cover Footer Metadata */}
      <div className="pl-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[9px] font-mono text-neutral-400">
        <div>
          <span className="text-neutral-200 font-semibold">120 Pages</span> &bull; 24 Chapters
        </div>
        <div className="text-emerald-400/90 font-medium flex items-center gap-1 group-hover:underline">
          <span>Inspect PDF</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </div>
      </div>
    </div>

    {/* Book Shadow & Thickness Illusion */}
    <div className="w-[92%] mx-auto h-3 bg-neutral-950 rounded-b-lg -mt-1 blur-[1px] opacity-80" />
  </div>
);

/**
 * Interactive SVG visual topology flow diagram for the 4 architectures
 */
const ArchitectureTopologyGraphic: React.FC<{ arch: 'pathA' | 'pathB' | 'pathC1' | 'pathC2' }> = ({ arch }) => {
  if (arch === 'pathA') {
    return (
      <svg viewBox="0 0 600 130" className="w-full h-auto rounded-lg bg-[#0c0e0d] border border-neutral-800 p-2">
        <defs>
          <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Node 1: Official Binary */}
        <rect x="20" y="30" width="140" height="70" rx="8" fill="#161917" stroke="#262b27" strokeWidth="1.5" />
        <text x="90" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Official Binary</text>
        <text x="90" y="72" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="monospace">claude-code CLI</text>
        <text x="90" y="86" fill="#787e79" fontSize="8" textAnchor="middle">Subagent Orchestrator</text>

        {/* Arrow 1 */}
        <line x1="160" y1="65" x2="230" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="230,65 222,60 222,70" fill="#10b981" />
        <text x="195" y="58" fill="#a3a8a4" fontSize="8" textAnchor="middle" fontFamily="monospace">:4000</text>

        {/* Node 2: LiteLLM Proxy */}
        <rect x="230" y="30" width="140" height="70" rx="8" fill="#161917" stroke="#10b981" strokeWidth="1.5" />
        <text x="300" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">LiteLLM Proxy</text>
        <text x="300" y="72" fill="#3b82f6" fontSize="9" textAnchor="middle" fontFamily="monospace">litellm --port 4000</text>
        <text x="300" y="86" fill="#787e79" fontSize="8" textAnchor="middle">Protocol Adapter</text>

        {/* Arrow 2 */}
        <line x1="370" y1="65" x2="440" y2="65" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="440,65 432,60 432,70" fill="#10b981" />
        <text x="405" y="58" fill="#a3a8a4" fontSize="8" textAnchor="middle" fontFamily="monospace">HTTPS</text>

        {/* Node 3: Google AI Studio */}
        <rect x="440" y="30" width="140" height="70" rx="8" fill="#161917" stroke="#eab308" strokeWidth="1.5" />
        <text x="510" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Google AI Studio</text>
        <text x="510" y="72" fill="#eab308" fontSize="9" textAnchor="middle" fontFamily="monospace">Gemini 2.5 Flash</text>
        <text x="510" y="86" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle">1,500 Free RPD (₹0)</text>
      </svg>
    );
  }

  if (arch === 'pathB') {
    return (
      <svg viewBox="0 0 600 130" className="w-full h-auto rounded-lg bg-[#0c0e0d] border border-neutral-800 p-2">
        {/* Node 1: Official Binary */}
        <rect x="30" y="30" width="160" height="70" rx="8" fill="#161917" stroke="#262b27" strokeWidth="1.5" />
        <text x="110" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Official Binary</text>
        <text x="110" y="72" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="monospace">claude-code CLI</text>
        <text x="110" y="86" fill="#787e79" fontSize="8" textAnchor="middle">Slash Commands &amp; MCP</text>

        {/* Direct Loopback Arrow */}
        <line x1="190" y1="65" x2="370" y2="65" stroke="#3b82f6" strokeWidth="2.5" />
        <polygon points="370,65 360,59 360,71" fill="#3b82f6" />
        <text x="280" y="55" fill="#3b82f6" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">127.0.0.1:11434 (Loopback)</text>
        <text x="280" y="82" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle">100% Offline &bull; Airgapped</text>

        {/* Node 2: Local Ollama 64K */}
        <rect x="370" y="30" width="200" height="70" rx="8" fill="#161917" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="470" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Ollama 64K Engine</text>
        <text x="470" y="72" fill="#3b82f6" fontSize="9" textAnchor="middle" fontFamily="monospace">qwen2.5-coder:7b (64K)</text>
        <text x="470" y="86" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle">Zero Internet Required (₹0)</text>
      </svg>
    );
  }

  if (arch === 'pathC1') {
    return (
      <svg viewBox="0 0 600 130" className="w-full h-auto rounded-lg bg-[#0c0e0d] border border-neutral-800 p-2">
        <rect x="50" y="30" width="180" height="70" rx="8" fill="#161917" stroke="#a855f7" strokeWidth="1.5" />
        <text x="140" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Aider Open Agent</text>
        <text x="140" y="72" fill="#a855f7" fontSize="9" textAnchor="middle" fontFamily="monospace">aider-install</text>
        <text x="140" y="86" fill="#787e79" fontSize="8" textAnchor="middle">2-Minute Setup Time</text>

        <line x1="230" y1="65" x2="370" y2="65" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="370,65 362,60 362,70" fill="#a855f7" />
        <text x="300" y="56" fill="#a3a8a4" fontSize="8" textAnchor="middle" fontFamily="monospace">Direct API (Zero Proxy)</text>

        <rect x="370" y="30" width="180" height="70" rx="8" fill="#161917" stroke="#eab308" strokeWidth="1.5" />
        <text x="460" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Google AI Studio</text>
        <text x="460" y="72" fill="#eab308" fontSize="9" textAnchor="middle" fontFamily="monospace">gemini/gemini-2.0-flash</text>
        <text x="460" y="86" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle">Direct Key Injection (₹0)</text>
      </svg>
    );
  }

  // pathC2
  return (
    <svg viewBox="0 0 600 130" className="w-full h-auto rounded-lg bg-[#0c0e0d] border border-neutral-800 p-2">
      <rect x="30" y="30" width="160" height="70" rx="8" fill="#161917" stroke="#14b8a6" strokeWidth="1.5" />
      <text x="110" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">Android Termux</text>
      <text x="110" y="72" fill="#14b8a6" fontSize="9" textAnchor="middle" fontFamily="monospace">F-Droid Environment</text>
      <text x="110" y="86" fill="#787e79" fontSize="8" textAnchor="middle">Mobile ARM64 Core</text>

      <line x1="190" y1="65" x2="260" y2="65" stroke="#14b8a6" strokeWidth="2" />
      <polygon points="260,65 252,60 252,70" fill="#14b8a6" />

      <rect x="260" y="30" width="150" height="70" rx="8" fill="#161917" stroke="#10b981" strokeWidth="1.5" />
      <text x="335" y="55" fill="#f4f5f4" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Poppins">glibc-runner ELF</text>
      <text x="335" y="72" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="monospace">ld-linux-aarch64</text>
      <text x="335" y="86" fill="#787e79" fontSize="8" textAnchor="middle">Verified Dynamic Patch</text>

      <line x1="410" y1="65" x2="470" y2="65" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 3" />
      <polygon points="470,65 462,60 462,70" fill="#14b8a6" />

      <rect x="470" y="30" width="110" height="70" rx="8" fill="#161917" stroke="#eab308" strokeWidth="1.5" />
      <text x="525" y="55" fill="#f4f5f4" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Poppins">AI Studio</text>
      <text x="525" y="72" fill="#eab308" fontSize="8" textAnchor="middle" fontFamily="monospace">Gemini</text>
      <text x="525" y="86" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle">₹0 On Mobile</text>
    </svg>
  );
};

export const HomepageView: React.FC<HomepageViewProps> = ({
  onStartReading,
  onNavigateChapter,
  onOpenSearch,
  onOpenPdfViewer,
  onOpenDeploy,
  onSelectTab,
}) => {
  const [activeArch, setActiveArch] = useState<'pathA' | 'pathB' | 'pathC1' | 'pathC2'>('pathA');
  const [copiedConfig, setCopiedConfig] = useState(false);

  const getArchCode = () => {
    switch (activeArch) {
      case 'pathA':
        return `# Path A: Official Claude Code + LiteLLM + Google AI Studio Free Tier
# 1. Install official Claude Code CLI
irm https://claude.ai/install.ps1 | iex

# 2. Install LiteLLM Proxy
pip install "litellm[proxy]"

# 3. Configure ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:4000",
    "ANTHROPIC_AUTH_TOKEN": "sk-local-free-proxy",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_MODEL": "gemini-flash-free",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "gemini-pro-free",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "gemini-flash-free",
    "CLAUDE_CODE_SUBAGENT_MODEL": "gemini-flash-free"
  }
}`;
      case 'pathB':
        return `# Path B: Claude Code + Direct Local Ollama 64K (100% Offline)
# 1. Install Ollama and pull Qwen 2.5 Coder
winget install --id Ollama.Ollama -e
ollama pull qwen2.5-coder:7b

# 2. Build 64K context Modelfile
cat << 'EOF' > Modelfile-claude-64k
FROM qwen2.5-coder:7b
PARAMETER num_ctx 65536
PARAMETER temperature 0.2
EOF
ollama create qwen-claude-64k -f Modelfile-claude-64k

# 3. Configure ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:11434",
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_MODEL": "qwen-claude-64k",
    "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "65536"
  }
}`;
      case 'pathC1':
        return `# Path C1: Aider + Google AI Studio Free Tier (Fastest, 2 Minutes)
pip install aider-install
aider-install

# In PowerShell / Bash:
$env:GEMINI_API_KEY = "your_free_ai_studio_key"
aider --model gemini/gemini-2.0-flash`;
      case 'pathC2':
        return `# Path C2: Android Termux Native Setup (glibc-runner wrapper)
# 1. Inside Termux (F-Droid):
termux-wake-lock
pkg update && pkg install nodejs-lts git python curl -y
pip install "litellm[proxy]"

# 2. Install verified glibc-runner ELF wrapper for Claude Code
curl -fsSL https://raw.githubusercontent.com/gtbuchanan/claude-code-termux/main/install.sh | bash`;
    }
  };

  const handleCopyArch = async () => {
    try {
      await navigator.clipboard.writeText(getArchCode());
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    } catch {}
  };

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Editorial Hero Section (Split 2-Column Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium tracking-wide">
              <span>OPEN ENGINEERING REFERENCE MANUAL</span>
              <span aria-hidden="true">&bull;</span>
              <span className="text-neutral-400">OCTOBER 2026 EDITION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Claude Code at <span className="text-emerald-400">₹0</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-neutral-300 font-bold mt-2">
                The Complete AI Coding Agent Handbook
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              Deep systems architecture, local open models, and verified production workflows detailing how to achieve maximum autonomous AI coding capability at <strong>₹0.00 ($0.00)</strong> perpetual software, API, and hosting cost across Windows, Linux, macOS, and Android Termux.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onStartReading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-emerald-900/40 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Reading Handbook</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('projects')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 font-medium text-sm transition-colors cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                <span>Interactive Labs (4 Apps)</span>
              </button>

              <button
                type="button"
                onClick={onOpenDeploy}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700/80 font-medium text-sm transition-colors cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-emerald-400" />
                <span>Deploy Live App (₹0)</span>
              </button>

              <button
                type="button"
                onClick={onOpenPdfViewer}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-neutral-800 hover:bg-neutral-900 text-neutral-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
                title="View original 120-page PDF"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>Source PDF (6.8 MB)</span>
              </button>
            </div>

            {/* Invariants & Trust Highlights */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>24 Chapters</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>10 Appendices</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>26 Diagnostics</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>₹0 Forever</span>
              </span>
            </div>
          </div>

          {/* Right Column: Physical Hardcover Book Graphic (Image Artifact) */}
          <div className="lg:col-span-5 flex justify-center">
            <HandbookCoverVisual onOpenPdf={onOpenPdfViewer} />
          </div>
        </div>
      </section>

      {/* Visual Technical Architecture Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-neutral-800 bg-[#161817] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                Zero-Cost Systems Topology
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Setup Architecture &amp; Live Data Flow
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Select your operating setup to inspect the verified connection pipeline and terminal configuration.
              </p>
            </div>
            <button
              onClick={() => onNavigateChapter('chapter-10')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <span>Read Full Chapter 10 Tutorial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Architecture Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => setActiveArch('pathA')}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                activeArch === 'pathA'
                  ? 'border-emerald-500 bg-emerald-950/30 shadow-xs'
                  : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
              }`}
            >
              <div className="font-bold text-xs text-white flex items-center justify-between">
                <span>Path A: LiteLLM</span>
                <span className="text-[10px] text-emerald-400 font-mono font-normal">Primary</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Claude Code + AI Studio 2.5 Flash
              </div>
            </button>

            <button
              onClick={() => setActiveArch('pathB')}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                activeArch === 'pathB'
                  ? 'border-blue-500 bg-blue-950/30 shadow-xs'
                  : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
              }`}
            >
              <div className="font-bold text-xs text-white flex items-center justify-between">
                <span>Path B: Local Ollama</span>
                <span className="text-[10px] text-blue-400 font-mono font-normal">Offline</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Airgapped 64K Qwen 2.5 Coder
              </div>
            </button>

            <button
              onClick={() => setActiveArch('pathC1')}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                activeArch === 'pathC1'
                  ? 'border-purple-500 bg-purple-950/30 shadow-xs'
                  : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
              }`}
            >
              <div className="font-bold text-xs text-white flex items-center justify-between">
                <span>Path C1: Aider</span>
                <span className="text-[10px] text-purple-400 font-mono font-normal">Fastest</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Direct Gemini 2.0 (2-Min Setup)
              </div>
            </button>

            <button
              onClick={() => setActiveArch('pathC2')}
              className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                activeArch === 'pathC2'
                  ? 'border-teal-500 bg-teal-950/30 shadow-xs'
                  : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
              }`}
            >
              <div className="font-bold text-xs text-white flex items-center justify-between">
                <span>Path C2: Termux</span>
                <span className="text-[10px] text-teal-400 font-mono font-normal">Mobile</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                Android glibc-runner ELF Wrapper
              </div>
            </button>
          </div>

          {/* SVG Visual Architecture Graphic */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-neutral-300">
              Topology Diagram:
            </div>
            <ArchitectureTopologyGraphic arch={activeArch} />
          </div>

          {/* Terminal Code Snippet Container */}
          <div className="rounded-xl border border-neutral-800 bg-[#0c0e0d] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-neutral-400">
                  {activeArch === 'pathA' ? '~/.claude/settings.json + terminal' : 'terminal execute'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyArch}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-800 hover:bg-neutral-750 text-neutral-200 transition-colors cursor-pointer text-xs font-medium"
              >
                {copiedConfig ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono overflow-x-auto leading-relaxed text-emerald-300 p-2 bg-[#080a09] rounded-lg">
              {getArchCode()}
            </pre>
          </div>
        </div>
      </section>

      {/* Featured Editorial Modules (Visual Image Showcase Cards) */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-left space-y-1">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
            In-Depth Engineering Modules
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Everything Required to Build at ₹0
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl">
            Explore the core architectural pillars, hands-on production code, and diagnostic encyclopedias included in the handbook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Foundations */}
          <div
            onClick={() => onNavigateChapter('chapter-1')}
            className="p-6 rounded-2xl border border-neutral-800 bg-[#161817] shadow-lg hover:border-emerald-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                Part I: Foundations
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Agent harness vs. LLM backend separation, closed-loop 4-stage execution, mathematical definition of ₹0, Anthropic account forensic audit, and custom stdio MCP servers.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-emerald-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read Chapters 1–4</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Setups & Platforms */}
          <div
            onClick={() => onNavigateChapter('chapter-6')}
            className="p-6 rounded-2xl border border-neutral-800 bg-[#161817] shadow-lg hover:border-blue-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                Part II: Setups &amp; Platforms
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Ollama 64K KV cache quantization (q8_0), Google AI Studio 1,500 RPD Flash routing, Windows native winget setups, Android Termux glibc-runner ELF patches, and LiteLLM failover.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-blue-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read Chapters 5–12</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Practical Projects */}
          <div
            onClick={() => onNavigateChapter('chapter-13')}
            className="p-6 rounded-2xl border border-neutral-800 bg-[#161817] shadow-lg hover:border-purple-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/60 text-purple-400 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
                Part III: Practical Projects
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Step-by-step code and automated test suites for RupeeTrack (INR expense manager), DevFolio SSG static site generator, FlowBoard Kanban + Pomodoro, and Cloudflare Pages deployment.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-purple-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read Chapters 13, 14 &amp; 20</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Engineering Discipline */}
          <div
            onClick={() => onNavigateChapter('chapter-15')}
            className="p-6 rounded-2xl border border-neutral-800 bg-[#161817] shadow-lg hover:border-amber-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 text-amber-400 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                Part IV: Engineering Discipline
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                CCAV prompt engineering framework, custom slash commands (/project:tdd-fix), git worktree parallel agent isolation, 10-point pre-commit QA gate, and OS sandboxing via bubblewrap.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-amber-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Read Chapters 15–19</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Diagnostic Encyclopedia */}
          <div
            onClick={() => onSelectTab('troubleshooting')}
            className="p-6 rounded-2xl border border-neutral-800 bg-[#161817] shadow-lg hover:border-rose-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                Diagnostic Wizard (26 Runbooks)
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Exhaustive 26-runbook diagnostic encyclopedia with exact terminal symptoms, causes, diagnostic commands, and verified fixes for 404, 400, 429, OOM, and ELF crashes.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-rose-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Diagnostic Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Capstone Roadmap */}
          <div
            onClick={() => onSelectTab('prompts')}
            className="p-6 rounded-2xl border border-neutral-800 bg-[#161817] shadow-lg hover:border-teal-500/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-800/60 text-teal-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white group-hover:text-teal-400 transition-colors">
                Prompt Library (35 CCAV)
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Complete production prompt matrix formatted with Context, Constraints, Action, and Verification for bug fixing, refactoring, full-stack scaffolding, and testing.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-teal-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open Prompt Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Publication Disclaimer Box */}
      <footer className="max-w-4xl mx-auto px-4 pt-8 border-t border-neutral-800 text-xs text-neutral-400 text-center space-y-2">
        <p>
          <strong>Independent Publication Disclaimer:</strong> This documentation platform and the underlying handbook are an independent educational engineering publication and are not affiliated with, endorsed by, sponsored by, or officially approved by Anthropic PBC, Google LLC, Microsoft Corporation, GitHub Inc., OpenRouter Inc., Ollama Inc., or any other commercial entity.
        </p>
        <p className="font-mono text-[11px] text-neutral-400">
          Document ID: TECH-HB-CC0-2026-V1 &bull; First Complete Reference Edition &bull; Verified October 24, 2026
        </p>
      </footer>
    </div>
  );
};
