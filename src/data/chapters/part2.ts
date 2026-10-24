/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapters 4, 5, 6, and 7
 */

import { Chapter } from '../../types/handbook';

export const PART_2_CHAPTERS: Chapter[] = [
  // -------------------------------------------------------------
  // Chapter 4: Architecture of a Zero-Cost Coding Setup
  // -------------------------------------------------------------
  {
    id: 'chapter-4',
    slug: 'chapter-4',
    part: 'Part I: Foundations',
    number: 4,
    title: 'Chapter 4: Architecture of a Zero-Cost Coding Setup',
    subtitle: 'The 8-Layer Component Stack, Configs 1/2A/2B/3 & Custom stdio MCP Lab',
    purpose: 'Specify the complete eight-layer technical stack of a working zero-cost coding-agent environment and define the exact boundaries between Configuration 1, Configuration 2 (A/B), and Configuration 3.',
    sourcePageRange: 'pp. 23–26',
    readingTimeMinutes: 35,
    difficulty: 'Intermediate',
    keyTerminology: [
      'Terminal Multiplexing',
      'POSIX Subshell',
      'Protocol Translation Proxy',
      'Native Endpoint Emulation',
      'Worktree Isolation',
      'Headless Verification',
      'JSON-RPC 2.0 stdio MCP',
    ],
    practicalOutcome: 'Design, diagram, and audit your own local or hybrid cloud-proxy architecture with complete clarity on where every packet and file operation flows.',
    sections: [
      {
        id: '4-1-eight-layers',
        title: '4.1 The Eight Component Layers of a Working Agentic System',
        content: [
          'A reliable zero-cost coding setup is more than just an LLM API key. If any layer of the surrounding local toolchain is misconfigured—for example, if Windows lacks a POSIX bash.exe binary or if the local server runs without a Git repository—the coding agent will either fail to execute tool calls or risk corrupting your source files without a rollback point.',
        ],
        tables: [
          {
            id: 'table-4-1',
            title: 'Table 4.1: The Eight Architectural Layers of a Production Zero-Cost Coding Setup',
            columns: [
              { key: 'layer', header: 'Layer #' },
              { key: 'component', header: 'Architectural Component' },
              { key: 'software', header: 'Concrete Zero-Cost Software' },
              { key: 'responsibility', header: 'Primary Engineering Responsibility' },
            ],
            rows: [
              {
                layer: 'Layer 1',
                component: 'Terminal & Shell Environment',
                software: 'Windows Terminal + PowerShell 7 + Git Bash (bash.exe), Linux/macOS zsh/bash, or Android Termux (bash)',
                responsibility: 'Renders the interactive TUI, manages environment variables (PATH, GEMINI_API_KEY), and executes POSIX shell commands spawned by the agent.',
              },
              {
                layer: 'Layer 2',
                component: 'Agent Application (The Harness)',
                software: 'Official @anthropic-ai/claude-code CLI, or Open-Source aider, cline, roo-code, opencode',
                responsibility: 'Indexes the codebase, manages the conversation loop, enforces tool permission prompts, applies file diffs, and triggers context compaction.',
              },
              {
                layer: 'Layer 3',
                component: 'Protocol Gateway / Endpoint Router',
                software: 'LiteLLM Proxy (localhost:4000) for Cloud APIs; or Direct Native /v1/messages on Ollama (:11434) / LM Studio (:1234)',
                responsibility: 'Accepts Anthropic Messages API requests, strips unsupported proprietary parameters (drop_params: true), maps model aliases, and handles rate-limit retries.',
              },
              {
                layer: 'Layer 4',
                component: 'Model Inference Engine (Local or Remote)',
                software: 'Remote: Google AI Studio (gemini-2.0-flash, 1.5-pro), OpenRouter :free, Groq. Local: qwen2.5-coder:7b, qwen3-coder-30b, devstral-small-2',
                responsibility: 'Performs neural network inference to analyze code context, plan changes, and generate structured tool_use or diff blocks.',
              },
              {
                layer: 'Layer 5',
                component: 'Project Directory & Rules (CLAUDE.md)',
                software: 'Local filesystem directory containing CLAUDE.md / .aider.conf.yml and .gitignore',
                responsibility: 'Stores persistent architectural rules, coding conventions, and exact test/build commands so the agent stays aligned across sessions.',
              },
              {
                layer: 'Layer 6',
                component: 'Version Control System (VCS)',
                software: 'Git (git CLI) + GitHub Free Remote Repository',
                responsibility: 'Provides atomic checkpoints before and after every AI edit (git diff, git checkout, git reset), preventing irreversible code loss.',
              },
              {
                layer: 'Layer 7',
                component: 'Local Development Server & Runtime',
                software: 'Python http.server, Node.js (vite, next), or language compilers (rustc, gcc, go)',
                responsibility: 'Serves the application on localhost (e.g., port 8090 or 3000) for immediate interactive browser and API verification.',
              },
              {
                layer: 'Layer 8',
                component: 'Testing, Linting & Free Deployment',
                software: 'Node assert / vitest, pytest, eslint + Cloudflare Pages / GitHub Pages',
                responsibility: 'Provides deterministic pass/fail feedback to the agent\'s self-healing loop and publishes verified builds to a free public HTTPS URL.',
              },
            ],
          },
        ],
        figures: [
          {
            id: 'fig-4-1',
            number: 'Figure 4.1',
            title: 'End-to-End System Architecture for Zero-Cost Coding Setups',
            pageRef: 24,
            type: 'diagram',
            description: 'Claude Code CLI connects via Path A (Proxy to Google AI Studio/OpenRouter) or Path B (Direct to Local Ollama/LM Studio :11434) or Path C (Open-Source Agents).',
          },
        ],
      },
      {
        id: '4-2-three-configurations',
        title: '4.2 Detailed Specification of the Three Distinct Configurations',
        content: [
          'You must never conflate the three distinct configurations discussed in this book. Each configuration has a different support boundary, authentication model, and operational profile:',
          '• **Configuration 1: Official Claude Code with Legitimate Eligible Access (Conditional)**: Direct HTTPS to `api.anthropic.com`. Only available if you qualify for Anthropic OSS Maintainer Program (5,000+ stars), Claude for Education, or a 7-day Guest Pass. Inaccessible to 99% of general developers.',
          '• **Configuration 2A: Official Claude Code + LiteLLM + Free Cloud API**: Point `ANTHROPIC_BASE_URL` to `http://localhost:4000` with `drop_params: true`. Uses Google AI Studio free Gemini Flash/Pro or OpenRouter :free. 100% perpetually free without a credit card.',
          '• **Configuration 2B: Official Claude Code + Direct Local Ollama / LM Studio**: Point `ANTHROPIC_BASE_URL` to `http://localhost:11434` with 64K context Modelfile. 100% offline and air-gapped.',
          '• **Configuration 3: Open-Source Coding Agent (Aider / Cline / OpenCode) + Free Backend**: Connects directly to Gemini, Groq, or Ollama APIs without proxy. Open-source licenses with native prompt tuning.',
        ],
        tables: [
          {
            id: 'table-4-2',
            title: 'Table 4.2: Architectural Boundary Matrix Contrasting Configurations 1, 2A, 2B, and 3',
            columns: [
              { key: 'property', header: 'Architectural Property' },
              { key: 'cfg1', header: 'Config 1: Official Claude Code + Anthropic Cloud' },
              { key: 'cfg2a', header: 'Config 2A: Official Claude Code + LiteLLM + Free Cloud API' },
              { key: 'cfg2b', header: 'Config 2B: Official Claude Code + Direct Local Ollama' },
              { key: 'cfg3', header: 'Config 3: Open-Source Agent (Aider / Cline / OpenCode)' },
            ],
            rows: [
              {
                property: 'Uses Official claude CLI?',
                cfg1: 'Yes',
                cfg2a: 'Yes',
                cfg2b: 'Yes',
                cfg3: 'No (Uses aider, opencode, or VS Code plugin)',
              },
              {
                property: 'Requires LiteLLM Proxy?',
                cfg1: 'No',
                cfg2a: 'Yes (localhost:4000)',
                cfg2b: 'No (Ollama :11434 supports /v1/messages natively)',
                cfg3: 'No (Connects directly to Gemini/Ollama APIs)',
              },
              {
                property: 'Perpetual ₹0 for Everyone?',
                cfg1: 'No (Paywalled after $5 credit)',
                cfg2a: 'Yes (1,500 RPD Free)',
                cfg2b: 'Yes (Unlimited Offline)',
                cfg3: 'Yes (Cloud or Offline)',
              },
              {
                property: 'Prompt Tuning for Non-Claude Models',
                cfg1: 'N/A (Runs real Claude)',
                cfg2a: 'Uses Claude system prompt on Gemini/OpenRouter',
                cfg2b: 'Uses Claude system prompt on Qwen/Devstral',
                cfg3: 'Natively tuned (diff/whole formats per model family)',
              },
              {
                property: 'Subagent Alias Mapping Required?',
                cfg1: 'No',
                cfg2a: 'Yes (DEFAULT_HAIKU_MODEL, etc.)',
                cfg2b: 'Yes (DEFAULT_HAIKU_MODEL, etc.)',
                cfg3: 'No (Configured via --weak-model or UI dropdown)',
              },
            ],
          },
        ],
      },
      {
        id: '4-3-custom-mcp-lab',
        title: '4.3 Deep Technical Lab: Building a Zero-Cost Custom MCP stdio Server',
        content: [
          'One of Claude Code\'s most powerful capabilities—which remains 100% functional at ₹0 cost when using Path A (LiteLLM) or Path B (Local Ollama)—is the Model Context Protocol (MCP). While Anthropic disables its proprietary cloud-hosted MCP tool-search optimization when ANTHROPIC_BASE_URL points to a custom gateway, local stdio MCP servers execute directly on your machine and inject their tool definitions into the conversation context.',
          'Below is a complete, zero-dependency Node.js JSON-RPC 2.0 stdio MCP server (`tools/mcp-project-audit.js`) that gives Claude Code (or Cline / Roo Code) a custom `audit_workspace_metrics` tool to audit repository file sizes, line counts, and TODO markers locally without burning multiple bash turns:',
        ],
        codeSnippets: [
          {
            language: 'javascript',
            filename: 'tools/mcp-project-audit.js',
            environment: 'Node.js',
            code: `#!/usr/bin/env node
// File: tools/mcp-project-audit.js — Zero-Dependency JSON-RPC 2.0 stdio MCP Server
"use strict";
const fs = require("fs");
const path = require("path");
const readline = require("readline");

function scanWorkspace(dirPath, stats = { files: 0, lines: 0, todos: 0 }) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "dist") continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      scanWorkspace(fullPath, stats);
    } else if (/\\.(js|ts|py|html|css|md|json)$/.test(entry.name)) {
      stats.files += 1;
      const content = fs.readFileSync(fullPath, "utf8");
      const fileLines = content.split("\\n");
      stats.lines += fileLines.length;
      stats.todos += fileLines.filter((l) => /TODO|FIXME/i.test(l)).length;
    }
  }
  return stats;
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on("line", (line) => {
  if (!line.trim()) return;
  let req;
  try { req = JSON.parse(line); } catch (_) { return; }
  const reply = (result) => {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: req.id, result }) + "\\n");
  };

  if (req.method === "initialize") {
    reply({
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "zero-cost-project-audit", version: "1.0.0" }
    });
  } else if (req.method === "tools/list") {
    reply({
      tools: [{
        name: "audit_workspace_metrics",
        description: "Counts source files, total lines of code, and TODO/FIXME markers in a directory.",
        inputSchema: {
          type: "object",
          properties: { targetDir: { type: "string", description: "Directory path to scan" } },
          required: ["targetDir"]
        }
      }]
    });
  } else if (req.method === "tools/call" && req.params?.name === "audit_workspace_metrics") {
    const target = req.params.arguments?.targetDir || process.cwd();
    const metrics = scanWorkspace(target);
    reply({
      content: [{ type: "text", text: JSON.stringify(metrics, null, 2) }]
    });
  }
});`,
            explanation: 'Register with Claude Code: claude mcp add project-audit node ./tools/mcp-project-audit.js && claude mcp list',
          },
        ],
      },
    ],
    prevSlug: 'chapter-3',
    nextSlug: 'chapter-5',
  },

  // -------------------------------------------------------------
  // Chapter 5: Comparison of Free and Open-Source Coding Agents
  // -------------------------------------------------------------
  {
    id: 'chapter-5',
    slug: 'chapter-5',
    part: 'Part II: Setups & Platforms',
    number: 5,
    title: 'Chapter 5: Comparison of Free and Open-Source Coding Agents',
    subtitle: 'Aider, OpenCode, Cline, Roo Code, Continue.dev, and OpenHands (13-Point Matrix)',
    purpose: 'Provide an objective, deeply researched engineering comparison of the leading open-source terminal and IDE coding agents actively maintained in October 2026.',
    sourcePageRange: 'pp. 27–30',
    readingTimeMinutes: 45,
    difficulty: 'Intermediate',
    keyTerminology: [
      'Tree-Sitter AST Repo Map',
      'Architect/Editor Dual-Model Mode',
      'Search/Replace Diff Block',
      'Language Server Protocol (LSP)',
      'Docker Runtime Sandbox',
    ],
    practicalOutcome: 'Select and configure the optimal open-source coding agent for your exact hardware spec, IDE preference, and model backend.',
    sections: [
      {
        id: '5-1-why-open-source',
        title: '5.1 Why Open-Source Alternatives Matter Alongside Official Claude Code',
        content: [
          'While running the official `@anthropic-ai/claude-code` binary via Path A or Path B gives you Anthropic\'s polished terminal UI, slash commands, and subagent architecture, there are three scenarios where an open-source coding agent is objectively superior:',
          '1. **Lower Token Overhead on 7B–14B Local Models**: Claude Code sends a massive system prompt (~15,000+ tokens) designed for 200K-context frontier models. On CPU, processing 15,000 tokens on a 7B model can take 20 seconds before the first token. Aider uses a compact system prompt and a tree-sitter AST Repository Map that sends concise function signatures, cutting prefill latency by 60–75%.',
          '2. **Zero-Proxy Direct Cloud Connectivity**: Aider, Cline, Roo Code, and OpenCode include native SDK adapters for Google AI Studio, OpenRouter, Groq, Mistral, and Ollama without running a LiteLLM proxy window.',
          '3. **100% Auditable FOSS Source Code**: On platforms like Android Termux (Bionic libc), pure Python or Go/TypeScript tools install cleanly without requiring binary ELF interpreter patching.',
        ],
      },
      {
        id: '5-2-deep-dive-six-agents',
        title: '5.2 Deep Dive into the Top Six Open-Source Coding Agents',
        content: [
          '• **1. Aider (aider-chat — Terminal CLI, Python, MIT)**: Over 39,000 GitHub stars. Git as the Unit of Truth (auto-commits every change; `/undo` rolls back atomic commits cleanly). Tree-Sitter Repository Map. Architect/Editor Dual-Model Mode (`/architect`) pairing a high-reasoning free cloud model with a fast diff editor. Built-in linting and `--test-cmd "npm test"` loop.',
          '• **2. OpenCode (anomalyco/opencode — Terminal TUI, Go/TypeScript, MIT)**: The closest open-source terminal TUI equivalent to Claude Code. Native themeable interface with multi-session tabs, automatic LSP type-checking integration, and 75+ native providers without LiteLLM.',
          '• **3. Cline (cline/cline — VS Code Extension, Apache-2.0)**: Premier autonomous IDE agent. Plan & Act Dual Modes separating architectural exploration from file editing. Interactive side-by-side diff viewer. Browser and MCP tool execution.',
          '• **4. Roo Code (RooVetGit/Roo-Code — VS Code Extension, Apache-2.0)**: Community fork of Cline adding role-driven specialized modes (Code, Architect, Ask, Debug) where each mode binds to a different free model.',
          '• **5. Continue.dev (continuedev/continue — VS Code & JetBrains, Apache-2.0)**: Best for local inline Tab Autocomplete using tiny 1.5B–3B models on Ollama alongside chat/agent modes.',
          '• **6. OpenHands (OpenHands/openhands — Web GUI/CLI, MIT)**: Full autonomous containerized agent platform running Docker sandboxes. Note: requires 24GB+ VRAM / 64GB Apple Unified RAM for local models.',
        ],
      },
      {
        id: '5-3-comparison-matrix',
        title: '5.3 Master 13-Point Comparison Matrix of Coding Agents',
        content: [
          'Table 5.1 compares Official Claude Code against all six open-source agents across 13 engineering criteria.',
        ],
        tables: [
          {
            id: 'table-5-1',
            title: 'Table 5.1: 13-Dimension Engineering Comparison of Terminal & IDE Coding Agents',
            columns: [
              { key: 'feature', header: 'Feature / Dimension' },
              { key: 'claude', header: 'Official Claude Code (Path A/B)' },
              { key: 'aider', header: 'Aider (aider-chat)' },
              { key: 'opencode', header: 'OpenCode' },
              { key: 'cline', header: 'Cline / Roo Code' },
              { key: 'continueDev', header: 'Continue.dev' },
              { key: 'openhands', header: 'OpenHands' },
            ],
            rows: [
              {
                feature: '1. License & Source',
                claude: 'Proprietary Binary (Free Client)',
                aider: 'Open Source (MIT)',
                opencode: 'Open Source (MIT)',
                cline: 'Open Source (Apache-2.0)',
                continueDev: 'Open Source (Apache-2.0)',
                openhands: 'Open Source (MIT)',
              },
              {
                feature: '2. Primary Interface',
                claude: 'Terminal CLI / TUI',
                aider: 'Terminal CLI',
                opencode: 'Terminal TUI',
                cline: 'VS Code Extension Panel',
                continueDev: 'VS Code & JetBrains',
                openhands: 'Web GUI / Docker CLI',
              },
              {
                feature: '3. Local Model Support',
                claude: 'Yes (Native :11434 / :1234)',
                aider: 'Excellent (Native ollama_chat/)',
                opencode: 'Excellent (Native Ollama/LM Studio)',
                cline: 'Good (Requires 32K+ context)',
                continueDev: 'Excellent (1.5B autocomplete)',
                openhands: 'Heavy (Requires 24GB+ VRAM)',
              },
              {
                feature: '4. Free Cloud API Direct?',
                claude: 'Via LiteLLM (:4000)',
                aider: 'Yes (Gemini, OpenRouter, Groq)',
                opencode: 'Yes (75+ providers)',
                cline: 'Yes (Gemini, OpenRouter)',
                continueDev: 'Yes (config.yaml providers)',
                openhands: 'Yes (Built-in LiteLLM)',
              },
              {
                feature: '5. Repository Editing',
                claude: 'Edit / Write tool calls',
                aider: 'Adaptive diff / whole / architect',
                opencode: 'Structured patch + LSP diagnostics',
                cline: 'Interactive VS Code diff editor',
                continueDev: 'Inline diff (Ctrl+I) + Agent',
                openhands: 'Full container filesystem edits',
              },
              {
                feature: '6. Git Integration',
                claude: 'Via Bash tool on prompt',
                aider: 'First-Class Native (Auto-commits + /undo)',
                opencode: 'Git diff tracking + Actions',
                cline: 'Git status awareness + commits',
                continueDev: 'Git diff context provider',
                openhands: 'Automated branch & PR creation',
              },
              {
                feature: '7. Client RAM Footprint',
                claude: '~150 MB RAM',
                aider: '~80 MB RAM (Python CLI)',
                opencode: '~60 MB RAM (Go/TS binary)',
                cline: '~600MB–1.2GB (VS Code)',
                continueDev: '~600MB–1.2GB (IDE footprint)',
                openhands: 'High (2–4GB RAM + Docker)',
              },
            ],
          },
        ],
      },
      {
        id: '5-4-decision-guide',
        title: '5.4 Decision Guide: When to Choose Each Alternative',
        content: [
          '• **Choose Official Claude Code (Path A/B)**: When you want the exact industry-standard Claude Code CLI workflow, CLAUDE.md memory hierarchy, subagents, and slash commands (/compact, /review, /status), and you have either a free Google AI Studio key (via LiteLLM) or a 16 GB+ RAM machine running Ollama.',
          '• **Choose Aider (aider-chat)**: When you are on an 8 GB RAM laptop with a small 7B local model, on Android Termux and want a pure Python install, or want automatic Git commits after every edit with instant `/undo` rollbacks.',
          '• **Choose OpenCode**: When you love Claude Code\'s full-screen terminal TUI aesthetic and want automatic Language Server Protocol (LSP) type-checking plus direct connection to Gemini/Groq without running LiteLLM.',
          '• **Choose Cline or Roo Code**: When you prefer visual side-by-side diffs inside VS Code rather than working in a terminal window.',
          '• **Choose Continue.dev**: When your primary IDE is IntelliJ IDEA, PyCharm, WebStorm, or Android Studio, or when you want local ghost-text Tab Autocomplete.',
        ],
      },
    ],
    prevSlug: 'chapter-4',
    nextSlug: 'chapter-6',
  },

  // -------------------------------------------------------------
  // Chapter 6: Local Models and Ollama
  // -------------------------------------------------------------
  {
    id: 'chapter-6',
    slug: 'chapter-6',
    part: 'Part II: Setups & Platforms',
    number: 6,
    title: 'Chapter 6: Local Models and Ollama (Quantization & 64K KV Cache)',
    subtitle: 'GGUF Mathematics, Flash Attention, OLLAMA_KV_CACHE_TYPE=q8_0, and Modelfile Locking',
    purpose: 'Provide a complete engineering guide to running open-weight coding models locally via Ollama and LM Studio 0.4.1+, covering GGUF quantization mathematics, 64K context-window Modelfiles, KV-cache memory compression, hardware tier sizing, and offline verification.',
    sourcePageRange: 'pp. 30–35',
    readingTimeMinutes: 50,
    difficulty: 'Intermediate',
    keyTerminology: [
      'GGUF Quantization (Q4_K_M, Q8_0)',
      'Key-Value (KV) Cache',
      'Flash Attention',
      'Prompt Prefill Speed (PP)',
      'Token Generation Speed (TG)',
      'Mixture-of-Experts (MoE)',
      'Native /v1/messages Endpoint',
    ],
    practicalOutcome: 'Deploy a 100% offline, rate-limit-free local inference server exposing Anthropic\'s native /v1/messages API on http://localhost:11434.',
    sections: [
      {
        id: '6-1-local-inference-fundamentals',
        title: '6.1 Local Inference Fundamentals and Native Anthropic API Support',
        content: [
          'Local inference replaces cloud datacenter API calls with matrix operations executed directly on your computer\'s CPU, system RAM, and GPU VRAM. Prior to 2026, connecting Claude Code to a local model required running a translation proxy in front of Ollama because Ollama only exposed its proprietary `/api/chat` and OpenAI-compatible `/v1/chat/completions` endpoints.',
          'As of 2026, both Ollama (default port `11434`) and LM Studio 0.4.1+ (released January 30, 2026, on default port `1234`) natively expose Anthropic\'s `POST /v1/messages` API endpoint. This architectural milestone means that the genuine `@anthropic-ai/claude-code` CLI binary can communicate directly with `http://localhost:11434` without requiring a middleman proxy.',
        ],
      },
      {
        id: '6-2-quantization-and-memory-math',
        title: '6.2 Quantization Mathematics, Context Windows, and KV-Cache Memory',
        content: [
          'At FP16, a 7-billion-parameter model requires $7 \\times 2 = 14\\text{ GB}$ just for static weights, and a 32B model requires $64\\text{ GB}$. Quantization compresses weights into 4-bit, 5-bit, or 8-bit integers inside the GGUF file format (llama.cpp / Ollama), reducing static memory by 60–75%.',
          'However, in agentic coding, the second major consumer of memory is the Key-Value (KV) Context Cache:',
          '$$\\text{Total Memory (GB)} = \\left(\\frac{P \\times B_{\\text{quant}}}{8}\\right)_{\\text{Static Weights}} + \\left(2 \\times L \\times H_{kv} \\times D_h \\times C_{\\text{ctx}} \\times B_{kv}\\right)_{\\text{Dynamic KV Cache}} + 1.2\\text{ GB}_{\\text{Compute Buffer}}$$',
          'Where $P$ is parameter count in billions, $B_{\\text{quant}}$ is effective bits per weight (~4.85 for Q4_K_M), $C_{\\text{ctx}}$ is context window (65,536 tokens), and $B_{kv}$ is bytes per KV element (2 for default f16, 1 for q8_0).',
          '**Halving KV-Cache Memory with `OLLAMA_KV_CACHE_TYPE=q8_0`**:',
          'At a 65,536-token (64K) context window, an unquantized f16 KV cache consumes 6 GB to 12 GB of extra RAM. Setting `OLLAMA_FLASH_ATTENTION=1` and `OLLAMA_KV_CACHE_TYPE=q8_0` cuts this memory in half (50% reduction) with negligible quality loss.',
        ],
        codeSnippets: [
          {
            language: 'powershell',
            filename: 'Ollama KV-Cache Configuration',
            environment: 'PowerShell',
            code: `# Windows PowerShell: Persistent User Environment Variables
[System.Environment]::SetEnvironmentVariable("OLLAMA_FLASH_ATTENTION", "1", "User")
[System.Environment]::SetEnvironmentVariable("OLLAMA_KV_CACHE_TYPE", "q8_0", "User")
[System.Environment]::SetEnvironmentVariable("OLLAMA_KEEP_ALIVE", "5m", "User")

# Linux / macOS / WSL2 (~/.bashrc):
export OLLAMA_FLASH_ATTENTION=1
export OLLAMA_KV_CACHE_TYPE=q8_0
export OLLAMA_KEEP_ALIVE=5m`,
            explanation: 'Enables 50% KV-cache compression and 5-minute GPU memory release timer.',
          },
        ],
        tables: [
          {
            id: 'table-6-1',
            title: 'Table 6.1: GGUF Weight Quantization Tiers and Memory Footprints',
            columns: [
              { key: 'format', header: 'Quantization Format' },
              { key: 'bits', header: 'Bits / Weight' },
              { key: 'm7b', header: '7B Model Size' },
              { key: 'm14b', header: '14B Model Size' },
              { key: 'm30b', header: '30B/32B Model Size' },
              { key: 'impact', header: 'Coding Quality Impact' },
              { key: 'useCase', header: 'Recommended Use Case' },
            ],
            rows: [
              {
                format: 'Q4_0 (Legacy)',
                bits: '~4.50 bits',
                m7b: '~4.1 GB',
                m14b: '~8.0 GB',
                m30b: '~17.5 GB',
                impact: 'Noticeable degradation on complex syntax',
                useCase: 'Avoid; use Q4_K_M instead.',
              },
              {
                format: 'Q4_K_M (Default)',
                bits: '~4.85 bits',
                m7b: '~4.7 GB',
                m14b: '~9.0 GB',
                m30b: '~18.5–19.8 GB',
                impact: 'Optimal balance (<1% coding drop vs FP16)',
                useCase: 'Standard choice for 8 GB – 24 GB RAM/VRAM.',
              },
              {
                format: 'Q5_K_M',
                bits: '~5.70 bits',
                m7b: '~5.5 GB',
                m14b: '~10.5 GB',
                m30b: '~22.8 GB',
                impact: 'Near-indistinguishable from FP16',
                useCase: 'Ideal when you have 2–3 GB spare VRAM headroom.',
              },
              {
                format: 'Q8_0',
                bits: '~8.50 bits',
                m7b: '~8.1 GB',
                m14b: '~15.7 GB',
                m30b: '~34.0 GB',
                impact: 'Virtually zero loss vs FP16',
                useCase: 'Best for 7B/14B models on 24 GB–32 GB workstations.',
              },
            ],
          },
        ],
      },
      {
        id: '6-3-hardware-tier-recommendations',
        title: '6.3 Realistic Hardware Tiers and Verified Model Recommendations',
        content: [
          'Never guess which model fits on your machine. Table 6.2 maps realistic consumer hardware configurations (from budget 8 GB laptops in India to 32 GB+ workstations) to specific open-weight coding models verified to handle structured tool calling in October 2026.',
        ],
        tables: [
          {
            id: 'table-6-2',
            title: 'Table 6.2: Hardware Tier Sizing Matrix for Local Agentic Coding',
            columns: [
              { key: 'tier', header: 'Hardware Tier' },
              { key: 'specs', header: 'System RAM & GPU Profile' },
              { key: 'model', header: 'Recommended Model & Tag' },
              { key: 'context', header: 'Allocated Context (num_ctx)' },
              { key: 'speed', header: 'Expected Speed (Tokens/Sec)' },
              { key: 'capability', header: 'Practical Agent Capability & Advice' },
            ],
            rows: [
              {
                tier: 'Tier 0: Ultra-Budget',
                specs: '4 GB–6 GB DDR4, Integrated Graphics',
                model: 'qwen2.5-coder:1.5b (Autocomplete only; use Path A Cloud!)',
                context: '16384 (16K)',
                speed: '8–15 tok/s (CPU)',
                capability: 'Do not run Claude Code locally on 4 GB RAM. 1.5B models hallucinate JSON schemas. Use Path A (LiteLLM + Free Gemini).',
              },
              {
                tier: 'Tier 1: Entry Local',
                specs: '8–12 GB RAM; CPU-only or RTX 3050/4050 (6 GB VRAM)',
                model: 'qwen2.5-coder:7b (Q4_K_M, ~4.7 GB)',
                context: '32768 (32K) w/ q8_0 KV cache',
                speed: '6–12 tok/s (CPU), 35–50 tok/s (GPU)',
                capability: 'Handles single-file creation, unit tests, and small web apps in Claude Code or Aider.',
              },
              {
                tier: 'Tier 2: Mid-Range Sweet Spot',
                specs: '16–24 GB RAM + RTX 3060 12GB / 4060 Ti, or Apple M-series 16-24GB',
                model: 'qwen2.5-coder:14b (~9.0 GB) or devstral-small-2 (~14 GB)',
                context: '65536 (64K) w/ q8_0 KV cache',
                speed: '22–40 tok/s',
                capability: 'Strong multi-file editing, reliable Read/Edit/Bash tool calling, and solid repository comprehension.',
              },
              {
                tier: 'Tier 3: Pro Workstation',
                specs: '32–64 GB RAM + RTX 3090/4090 (24 GB VRAM) or Mac Studio 32GB–64GB',
                model: 'qwen3-coder:30b (MoE/Dense ~18.5 GB) or qwen2.5-coder:32b',
                context: '65536 (64K) to 131072 (128K)',
                speed: '30–65 tok/s (fast on MoE qwen3-coder-30b-a3b)',
                capability: 'Near-frontier autonomous coding, complex debugging, and multi-file refactoring completely offline.',
              },
            ],
          },
        ],
      },
      {
        id: '6-4-64k-modelfile-walkthrough',
        title: '6.4 Step-by-Step: Building a 64K-Context Ollama Modelfile and Verifying Offline Operation',
        content: [
          'By default, Ollama loads models with a small context window (2048 or 4096 tokens) to conserve RAM. If you connect Claude Code to a default Ollama model without expanding `num_ctx`, Ollama silently truncates Claude Code\'s 15,000-token system prompt and tool schemas, causing the model to forget how to invoke Edit or Bash. Always build an explicit 64K (or 32K on 8 GB RAM) Modelfile:',
        ],
        codeSnippets: [
          {
            language: 'bash',
            filename: 'Building 64K Modelfile in Ollama',
            environment: 'Bash',
            code: `# 1. Pull the base coding model
ollama pull qwen2.5-coder:7b

# 2. Write a Modelfile that locks context window to 65536 (64K)
cat << 'EOF' > Modelfile-claude-64k
FROM qwen2.5-coder:7b
PARAMETER num_ctx 65536
PARAMETER temperature 0.2
EOF

# 3. Create the custom local model tag
ollama create qwen-claude-64k -f Modelfile-claude-64k

# 4. Verify model is registered and inspect allocated VRAM/RAM
ollama run qwen-claude-64k "Reply with OK"
ollama ps`,
            expectedOutput: 'NAME: qwen-claude-64k:latest | SIZE: 6.8 GB | PROCESSOR: 100% GPU (or CPU)',
          },
        ],
        callouts: [
          {
            type: 'VERIFICATION',
            title: 'How to Prove Inference Is Running 100% Locally and Offline',
            badge: 'Tested successfully',
            content: '1. Disconnect your Wi-Fi or unplug your Ethernet cable.\n2. Ensure "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1" and "ANTHROPIC_BASE_URL": "http://localhost:11434" are set in ~/.claude/settings.json.\n3. Run netstat -ano | findstr :11434 (Windows) or ss -tulpn | grep 11434 (Linux) to confirm ollama.exe is listening strictly on loopback 127.0.0.1:11434.\n4. Launch claude --model qwen-claude-64k and execute a coding task. Because no network interface is up, successful execution mathematically proves 100% air-gapped local operation.',
          },
        ],
      },
      {
        id: '6-5-lmstudio-and-llamacpp',
        title: '6.5 Alternative Local Engines: LM Studio 0.4.1+, llama-server, and Apple Silicon Tuning',
        content: [
          '• **LM Studio 0.4.1+ Native Endpoint (Port 1234)**: Releases starting January 30, 2026 natively handle Anthropic `/v1/messages` payloads. Load `qwen2.5-coder-14b-instruct-gguf` with `--context-length 65536 --gpu max` and run `lms server start --port 1234`.',
          '• **Direct llama.cpp (`llama-server`) on Port 8080**: Pass `--jinja` flag! Without `--jinja`, llama-server falls back to string templates that do not parse structured tools arrays.',
          '• **Apple Silicon Unified Memory Tuning**: On a 16 GB Mac, macOS caps Metal GPU memory at ~10.6 GB. Raise the Metal wired memory ceiling to 13.5 GB (13824 MB) via `sudo sysctl iogpu.wired_limit_mb=13824`.',
        ],
      },
    ],
    prevSlug: 'chapter-5',
    nextSlug: 'chapter-7',
  },

  // -------------------------------------------------------------
  // Chapter 7: Free Hosted Models and API Compatibility
  // -------------------------------------------------------------
  {
    id: 'chapter-7',
    slug: 'chapter-7',
    part: 'Part II: Setups & Platforms',
    number: 7,
    title: 'Chapter 7: Free Hosted Models and API Compatibility',
    subtitle: 'Google AI Studio, OpenRouter, Groq, Mistral, Protocol Translation & LiteLLM Failover',
    purpose: 'Audit the leading legitimate free hosted LLM API providers available in October 2026 (Google AI Studio, OpenRouter :free, Groq Cloud, and Mistral La Plateforme) and explain the protocol translation mechanics required to bridge non-Anthropic APIs to Claude Code.',
    sourcePageRange: 'pp. 35–39',
    readingTimeMinutes: 45,
    difficulty: 'Intermediate',
    keyTerminology: [
      'RPM (Requests Per Minute)',
      'RPD (Requests Per Day)',
      'TPM (Tokens Per Minute)',
      'Parameter Scrubbing (drop_params)',
      'Schema Translation',
      'Data Training Opt-Out',
    ],
    practicalOutcome: 'Provision card-free cloud API keys and configure a resilient LiteLLM gateway that automatically fails over when any single free tier hits an HTTP 429 rate limit.',
    sections: [
      {
        id: '7-1-cloud-providers-audit',
        title: '7.1 Comprehensive Audit of Free Cloud Model Providers (October 2026)',
        content: [
          'When your local computer has only 4 GB to 8 GB of RAM—or when you are working on an Android smartphone—cloud-hosted free tiers allow you to drive 1-million-token frontier models with zero local hardware load. Table 7.1 presents a verified October 2026 audit across all four major zero-cost cloud providers.',
        ],
        tables: [
          {
            id: 'table-7-1',
            title: 'Table 7.1: Master Comparison Matrix of Free Hosted LLM API Providers',
            columns: [
              { key: 'attribute', header: 'Provider Attribute' },
              { key: 'google', header: '1. Google AI Studio (Free Tier)' },
              { key: 'openrouter', header: '2. OpenRouter (:free Models)' },
              { key: 'groq', header: '3. Groq Cloud (Free Tier)' },
              { key: 'mistral', header: '4. Mistral La Plateforme (Experiment Free)' },
            ],
            rows: [
              {
                attribute: 'Console / Key URL',
                google: 'aistudio.google.com',
                openrouter: 'openrouter.ai/settings/keys',
                groq: 'console.groq.com/keys',
                mistral: 'console.mistral.ai',
              },
              {
                attribute: 'Top Free Models (Oct 2026)',
                google: 'gemini-2.0-flash, gemini-2.5-flash, gemini-3.8-flash, gemini-1.5-pro',
                openrouter: 'google/gemini-2.0-flash-exp:free, deepseek/deepseek-chat:free, qwen/qwen-2.5-coder-32b:free',
                groq: 'llama-3.3-70b-versatile, llama-3.1-8b-instant, openai/gpt-oss-120b',
                mistral: 'codestral-latest, mistral-small-latest, devstral-small',
              },
              {
                attribute: 'Rate Limits (RPM / RPD)',
                google: 'Flash: 15 RPM / 1,500 RPD (up to 1M TPM); Pro: 2 RPM / 50 RPD',
                openrouter: '20 RPM; 50 RPD (increases to 1,000 RPD if account holds >=$10 credit)',
                groq: '30 RPM; 8b: 14,400 RPD (500K TPD); 70b: 1,000 RPD (100K TPD)',
                mistral: '~1 RPS (60 RPM), 500,000 tokens/minute, up to 1B tokens/month on Experiment tier',
              },
              {
                attribute: 'Context Window Limit',
                google: '1,000,000 to 2,000,000 tokens (Largest in industry)',
                openrouter: '32,768 to 131,072 tokens (varies by upstream provider)',
                groq: '32,768 to 131,072 tokens (strictly capped by TPM/TPD per request)',
                mistral: '32,768 to 256,000 tokens (codestral)',
              },
              {
                attribute: 'Credit Card Required?',
                google: 'NO (Ensure no GCP Billing Account is linked)',
                openrouter: 'NO (Strictly append :free to model IDs)',
                groq: 'NO (Free developer signup)',
                mistral: 'NO (Phone SMS verification required for Experiment tier)',
              },
              {
                attribute: 'Data Retention & Training Policy',
                google: 'Important: On the unpaid tier, Google reviewers/systems may log and use prompts to train models.',
                openrouter: 'Free endpoints route through providers that log prompts for research; check per-model flag.',
                groq: 'Does not train on API inputs by default, but logs metadata for abuse prevention.',
                mistral: 'Free Experiment tier allows Mistral to train on API prompts unless upgraded to paid billing.',
              },
            ],
          },
        ],
        callouts: [
          {
            type: 'SECURITY ALERT',
            title: 'Data Privacy Rule for All Unpaid Cloud APIs',
            badge: 'Verified from official documentation',
            content: 'Both Google AI Studio\'s Unpaid Tier and Mistral\'s Free Experiment Tier explicitly state in their terms of service that prompts and code snippets submitted through unpaid API keys may be retained and used for model training. Never transmit proprietary client code under NDA, production .env files, or private cryptographic keys to any unpaid cloud API. When working on sensitive repositories, switch immediately to Path B (Local Ollama on 127.0.0.1:11434).',
          },
        ],
      },
      {
        id: '7-2-openai-compat-vs-claude',
        title: '7.2 Why "OpenAI-Compatible" Does Not Mean "Claude Code-Compatible"',
        content: [
          'A frequent source of confusion occurs when developers read that Google Gemini, Groq, or OpenRouter offers an "OpenAI-compatible endpoint" and attempt to set `ANTHROPIC_BASE_URL="https://openrouter.ai/api/v1"` directly inside Claude Code. That configuration fails immediately with `HTTP 404` or `400 Bad Request` errors:',
          '1. **Different Endpoint Paths & Headers**: OpenAI-compatible servers expect `POST /v1/chat/completions` with a single messages array where system prompt is a message with `"role": "system"`. Claude Code speaks the Anthropic Messages API (`POST /v1/messages`), where `system` is a top-level parameter outside the messages array, with `anthropic-version: 2023-06-01` headers.',
          '2. **Proprietary Anthropic Payload Parameters**: Claude Code injects Anthropic-specific fields into `/v1/messages` payloads—such as `"output_config"`, extended `"thinking": {"type": "enabled", "budget_tokens": ...}`, and cache-control breakpoints (`"cache_control": {"type": "ephemeral"}`). When a non-Anthropic cloud server receives `"output_config"`, its strict JSON validator rejects the entire request with `400 Bad Request: Unknown parameter "output_config"`.',
          '3. **Tool-Call Block Formatting**: In OpenAI format, tool calls are returned inside `choices[0].message.tool_calls` with stringified JSON arguments (`"arguments": "{\"file_path\":...}"`). In Anthropic format expected by Claude Code, tool calls must be returned inside content blocks of `"type": "tool_use"` where `input` is a parsed JSON object.',
        ],
      },
      {
        id: '7-3-litellm-ha-failover',
        title: '7.3 Multi-Provider Load Balancing and Automatic 429 Failover in LiteLLM',
        content: [
          'Because free cloud tiers enforce per-minute rate limits (15 RPM on Gemini Flash, 20 RPM on OpenRouter :free, 30 RPM on Groq), rapid multi-file searches in Claude Code can occasionally hit an `HTTP 429 Too Many Requests` ceiling. You can eliminate rate-limit interruptions completely by configuring LiteLLM\'s Router Fallbacks:',
        ],
        codeSnippets: [
          {
            language: 'yaml',
            filename: '~/.litellm/config-ha.yaml',
            environment: 'YAML',
            code: `# File: ~/.litellm/config-ha.yaml (High-Availability Multi-Provider Zero-Cost Router)
model_list:
  # Primary Pool: Google AI Studio Free Tier (1,500 RPD, 1M Context)
  - model_name: zero-cost-coder
    litellm_params:
      model: gemini/gemini-2.0-flash
      api_key: os.environ/GEMINI_API_KEY
      rpm: 15
      drop_params: true

  # Fallback Pool 1: OpenRouter Free Qwen 2.5 Coder 32B
  - model_name: zero-cost-coder-fallback-or
    litellm_params:
      model: openrouter/qwen/qwen-2.5-coder-32b-instruct:free
      api_key: os.environ/OPENROUTER_API_KEY
      rpm: 20
      drop_params: true

  # Fallback Pool 2: Groq Cloud Free Tier (Ultra-fast LPU inference)
  - model_name: zero-cost-coder-fallback-groq
    litellm_params:
      model: groq/llama-3.3-70b-versatile
      api_key: os.environ/GROQ_API_KEY
      rpm: 30
      drop_params: true

litellm_settings:
  drop_params: true
  request_timeout: 600
  num_retries: 3
  fallbacks: [{"zero-cost-coder": ["zero-cost-coder-fallback-or", "zero-cost-coder-fallback-groq"]}]
  additional_drop_params:
    - output_config

general_settings:
  master_key: sk-local-free-proxy`,
            explanation: 'If Gemini Flash hits 15 RPM, LiteLLM transparently routes the request to OpenRouter or Groq without interrupting your Claude Code session.',
          },
        ],
      },
      {
        id: '7-4-health-check-script',
        title: '7.4 Automated Multi-Provider Free Quota Health-Check Script',
        content: [
          'Before starting a long coding session, run this zero-dependency Python diagnostic script (`tools/check_free_quotas.py`) to ping your configured free cloud providers, verify key validity, and measure live round-trip latency from your ISP:',
        ],
        codeSnippets: [
          {
            language: 'python',
            filename: 'tools/check_free_quotas.py',
            environment: 'Python',
            code: `#!/usr/bin/env python3
# File: tools/check_free_quotas.py — Pre-Session Cloud Free-Tier Health & Latency Checker
import json, os, time, urllib.request, urllib.error

def test_endpoint(name, url, headers, payload):
  t0 = time.perf_counter()
  req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
  try:
    with urllib.request.urlopen(req, timeout=20) as resp:
      ms = (time.perf_counter() - t0) * 1000
      print(f"[PASS] {name:<28} | HTTP {resp.status} | Latency: {ms:6.0f} ms")
  except urllib.error.HTTPError as e:
    print(f"[WARN] {name:<28} | HTTP {e.code} ({e.reason})")
  except Exception as e:
    print(f"[FAIL] {name:<28} | Error: {e}")

if __name__ == "__main__":
  print("=== ZERO-COST CLOUD API HEALTH & QUOTA CHECK ===")
  gkey = os.environ.get("GEMINI_API_KEY", "")
  if gkey:
    test_endpoint("Google AI Studio (Flash)", f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={gkey}", {"Content-Type": "application/json"}, {"contents": [{"parts": [{"text": "OK"}]}]})
  else:
    print("[SKIP] GEMINI_API_KEY not set in environment.")`,
            explanation: 'Pings provider endpoints and validates live connectivity before agent sessions.',
          },
        ],
      },
    ],
    prevSlug: 'chapter-6',
    nextSlug: 'chapter-8',
  },
];
