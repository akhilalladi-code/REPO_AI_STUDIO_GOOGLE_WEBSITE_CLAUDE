/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Master Technical Content for All 24 Chapters + Front Matter
 * Extracted with complete technical fidelity from the Handbook PDF
 */

import { Chapter } from '../types/handbook';

export const CHAPTERS_DATA: Chapter[] = [
  // -------------------------------------------------------------
  // Front Matter: Executive Summary, Decisions, and Framework
  // -------------------------------------------------------------
  {
    id: 'front-matter',
    slug: 'front-matter',
    part: 'Front Matter',
    number: '0',
    title: 'Front Matter: Executive Summary, Architecture & Governance',
    subtitle: 'Deep Research, Zero-Cost Setups, Baseline Audit, and Decision Guide',
    purpose: 'Document the formal document control, research cutoff (October 24, 2026), legal publication disclaimer, master decision tree, hardware tier taxonomy, and baseline research audit.',
    sourcePageRange: 'pp. 1–10',
    readingTimeMinutes: 25,
    difficulty: 'Beginner',
    keyTerminology: [
      'Client Agent Harness',
      'Inference Engine',
      'Perpetual ₹0 Standard',
      'Unbilled Project Isolation',
      'Hard Quota Ceiling',
      'glibc-runner (grun)',
      'LiteLLM Translation Proxy',
    ],
    practicalOutcome: 'Establish the foundational governance, legal boundaries, and architectural decision criteria for selecting your optimal zero-cost setup.',
    sections: [
      {
        id: 'publication-disclaimer',
        title: 'Copyright, Licensing, and Independent Publication Disclaimer',
        content: [
          '**Document ID**: `TECH-HB-CC0-2026-V1` | **Edition**: First Complete Reference Edition (October 2026) | **Research Cutoff**: October 24, 2026.',
          '**Independent Educational Publication Notice**: This handbook is an independent technical reference and software engineering instructional manual. It is not affiliated with, endorsed by, sponsored by, or officially approved by Anthropic PBC, Google LLC, Microsoft Corporation, GitHub Inc., OpenRouter Inc., Ollama Inc., or any other commercial entity referenced herein. All product names, command-line binary identifiers (including claude, @anthropic-ai/claude-code, litellm, ollama, and aider), trademarks, and registered trademarks are the property of their respective owners and are used strictly for technical interoperability, educational instruction, and comparative engineering analysis.',
          '**Software Pricing, Quotas, and Availability Disclaimer**: Cloud artificial intelligence providers, API gateways, and static web hosting platforms frequently modify their pricing tiers, rate limits, model identifiers, authentication protocols, and terms of service without advance notice. Every technical claim, command flag, environment variable, and free-tier quota documented in this book was verified against official documentation and community release trackers as of October 24, 2026.',
          '**Responsible Use & Terms-of-Service Compliance**: This handbook documents legitimate, architecturally supported mechanisms for operating coding agents at ₹0 software and service cost—specifically by utilizing officially documented gateway override variables (ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, and ANTHROPIC_API_KEY), local open-weight language models, free-tier developer APIs, and open-source coding harnesses. This publication explicitly rejects and warns against credential stuffing, shared subscription account piracy, unauthorized reverse-engineering of consumer web sessions, or bypassing payment barriers on hosted commercial servers.',
        ],
        callouts: [
          {
            type: 'IMPORTANT',
            title: 'The Core Architectural Principle of This Handbook',
            badge: 'Verified from official documentation',
            content: 'You do not need to modify, crack, or reverse-engineer Claude Code to use it for ₹0. By setting ANTHROPIC_BASE_URL to a local server (http://localhost:11434 for Ollama or http://localhost:4000 for LiteLLM), the genuine, unmodified Claude Code binary executes all of its local file-editing, terminal-debugging, and Git orchestration logic while delegating neural network inference to a free local or free cloud model.',
          },
        ],
      },
      {
        id: 'executive-summary',
        title: 'Executive Summary of Findings & Three Core Architectures',
        content: [
          "Anthropic's Claude Code (`@anthropic-ai/claude-code`) is one of the most capable agentic software engineering tools ever released. However, as of October 2026, Anthropic enforces a strict commercial paywall around its hosted frontier models (claude-opus-5-5, claude-sonnet-4-5, and claude-haiku-5-5). Official documentation confirms that the free consumer claude.ai plan cannot authenticate Claude Code CLI sessions; logging in directly requires a paid Claude Pro ($20/month), Claude Max ($100–$200/month), Team, Enterprise, or funded Console API account.",
          'Furthermore, earlier educational loopholes—most notably free access to frontier Claude Sonnet and Opus models through the GitHub Student Developer Pack—were permanently closed on March 12, 2026, when GitHub transitioned student accounts to a restricted student plan limited to automated model routing and lower-tier models.',
          'Despite the absence of an Anthropic-hosted free tier, developers can legally run the genuine, unmodified official Claude Code CLI binary at ₹0 total software and service cost indefinitely across three verified production architectures:',
          '1. **Path A — Official Claude Code + LiteLLM Proxy + Free Cloud APIs** (Best for 4 GB–8 GB RAM Windows PCs & General Users): A lightweight local LiteLLM proxy (localhost:4000) translates Claude Code\'s Anthropic `/v1/messages` payloads into Google AI Studio\'s REST format (gemini-2.0-flash, gemini-2.5-flash, gemini-1.5-pro) or OpenRouter\'s `:free` endpoints. Google AI Studio\'s Free Tier requires no credit card in India, provides up to 1,500 requests per day (RPD) on Flash models with a 1M–2M token context window, and consumes zero local GPU resources.',
          '2. **Path B — Official Claude Code + Direct Local Ollama / LM Studio** (Best for 100% Privacy & Offline Workstations): As of 2026, Ollama (localhost:11434) and LM Studio 0.4.1+ (localhost:1234) natively expose Anthropic\'s `POST /v1/messages` endpoint. Pointing ANTHROPIC_BASE_URL directly at Ollama allows the official Claude Code binary to drive open-weight coding models (qwen2.5-coder:7b, qwen3-coder-30b, devstral-small-2, gpt-oss-20b) completely offline with zero rate limits.',
          '3. **Path C — Open-Source Coding Agents (Aider / Cline / Roo Code / OpenCode) & Android Termux glibc-runner Workflows**: Developers who want native diff-editing optimized for smaller models can run Aider (aider-chat) or Cline directly against free APIs or Ollama. Mobile-only developers on Android can execute the genuine Linux ARM64 Claude Code binary inside Termux using the gtbuchanan/claude-code-termux glibc-runner (grun) ELF wrapper paired with a background LiteLLM proxy.',
        ],
        tables: [
          {
            id: 'table-0-5',
            title: 'Table 0.5: Executive Comparison of Verified Zero-Cost Coding Agent Architectures',
            caption: 'Verified October 2026 primary technical routes',
            columns: [
              { key: 'criterion', header: 'Evaluation Criterion' },
              { key: 'pathA', header: 'Path A: Claude Code + LiteLLM + Gemini Free' },
              { key: 'pathB', header: 'Path B: Claude Code + Local Ollama' },
              { key: 'pathC1', header: 'Path C1: Aider / Cline + Free API / Local' },
              { key: 'pathC2', header: 'Path C2: Android Termux (glibc Wrapper)' },
            ],
            rows: [
              {
                criterion: 'Client Software',
                pathA: 'Official @anthropic-ai/claude-code CLI',
                pathB: 'Official @anthropic-ai/claude-code CLI',
                pathC1: 'Open-Source MIT/Apache Agent (aider, cline)',
                pathC2: 'Official @anthropic-ai/claude-code ARM64 ELF',
              },
              {
                criterion: 'Model Backend',
                pathA: 'Google AI Studio (gemini-2.0-flash, 1.5-pro) / OpenRouter :free',
                pathB: 'Local GGUF (qwen2.5-coder, qwen3-coder, devstral)',
                pathC1: 'Any Free API (Gemini, Groq, OpenRouter, Mistral) or Ollama',
                pathC2: 'Gemini Free Tier or OpenRouter :free via local LiteLLM',
              },
              {
                criterion: 'Perpetual Cost',
                pathA: '₹0.00 / $0.00',
                pathB: '₹0.00 / $0.00 (Excl. PC electricity)',
                pathC1: '₹0.00 / $0.00',
                pathC2: '₹0.00 / $0.00',
              },
              {
                criterion: 'Credit Card Needed?',
                pathA: 'No (Unbilled AI Studio project)',
                pathB: 'No (100% local download)',
                pathC1: 'No',
                pathC2: 'No',
              },
              {
                criterion: 'Offline Capability',
                pathA: 'No (Requires internet)',
                pathB: '100% Offline & Air-Gapped',
                pathC1: 'Yes (when paired with Ollama)',
                pathC2: 'No (Cloud API recommended on mobile)',
              },
              {
                criterion: 'Minimum Hardware',
                pathA: '4 GB RAM PC/Laptop',
                pathB: '8 GB RAM (7B) to 32 GB+ RAM (30B)',
                pathC1: '4 GB RAM (Cloud) / 8 GB RAM (Local)',
                pathC2: 'Android 8.0+ ARM64 phone with 4 GB+ RAM',
              },
              {
                criterion: 'Verification Status',
                pathA: 'Verified from official documentation',
                pathB: 'Verified from official documentation',
                pathC1: 'Verified from official documentation',
                pathC2: 'Community-reported & Tested successfully',
              },
            ],
          },
        ],
        figures: [
          {
            id: 'fig-0-1',
            number: 'Figure 0.1',
            title: 'Master Decision Tree for Selecting Your Optimal ₹0 Setup',
            pageRef: 7,
            type: 'flowchart',
            description: 'Evaluate primary device -> Android Phone (Path C2/SSH) vs Low-Spec PC (Path A Cloud Proxy) vs High-Spec Workstation (Path B Local Offline).',
          },
        ],
      },
    ],
    nextSlug: 'chapter-1',
  },

  // -------------------------------------------------------------
  // Chapter 1: Understanding AI Coding Agents
  // -------------------------------------------------------------
  {
    id: 'chapter-1',
    slug: 'chapter-1',
    part: 'Part I: Foundations',
    number: 1,
    title: 'Chapter 1: Understanding AI Coding Agents',
    subtitle: 'Agentic Harness vs. Model Backend, the 4-Stage Autonomous Loop & MCP Protocol',
    purpose: 'Establish a rigorous architectural mental model of how autonomous terminal and IDE coding agents operate, how they differ from conversational web chat, and why separating the client software harness from the inference model unlocks zero-cost execution.',
    sourcePageRange: 'pp. 11–16',
    readingTimeMinutes: 35,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'Agent Harness',
      'Inference Endpoint',
      'Tool Schema',
      'Context Window',
      'Compaction (/compact)',
      'Subagent Dispatch',
      'Model Context Protocol (MCP)',
      'Diff Apply',
    ],
    practicalOutcome: 'Understand the exact HTTP payload structure emitted by Claude Code and why overriding ANTHROPIC_BASE_URL legally decouples the CLI binary from paid Anthropic cloud billing.',
    sections: [
      {
        id: '1-1-what-claude-code-is',
        title: '1.1 What Claude Code Actually Is (and What It Is Not)',
        content: [
          'To engineer a zero-cost AI coding environment, you must first dismantle the most common misconception in modern software development: the belief that "Claude Code" is a single monolithic product. In reality, what developers call "Claude Code" consists of two completely separate architectural layers that communicate over standard HTTP REST calls:',
          '1. **The Client Agent Harness (`@anthropic-ai/claude-code`)**: A local software binary installed on your computer (via PowerShell, Bash, or npm). This local program is responsible for scanning your project directory, reading your `CLAUDE.md` instructions, building system prompts, presenting an interactive terminal UI (TUI), executing local file edits (`Read`, `Edit`, `Write`), running shell commands (`Bash`), and managing Git commits. The client harness itself is distributed free of charge.',
          '2. **The Remote Inference Engine (The LLM Backend)**: A stateless HTTP server that accepts a JSON array of conversation messages and tool definitions (`POST /v1/messages`), performs matrix multiplication across billions of neural network parameters, and returns either a text response or a structured request to invoke a local tool (such as `{"name": "Bash", "input": {"command": "pytest"}}`).',
          'When you run `claude` out of the box without custom configuration, the free local harness hardcodes its destination URL to `https://api.anthropic.com`. Because serving frontier models like `claude-opus-5-5` and `claude-sonnet-4-5` over 200,000-token context windows requires expensive datacenter GPU clusters, Anthropic blocks unpaid accounts at the authentication gate.',
          'However, because enterprise customers frequently route traffic through internal security proxies, Anthropic built first-class gateway override support directly into the CLI via `ANTHROPIC_BASE_URL`.',
        ],
      },
      {
        id: '1-2-agents-vs-web-chat',
        title: '1.2 How Coding Agents Differ from Conversational Web Chat (claude.ai)',
        content: [
          'Beginners frequently ask: *"If I already have a free account on claude.ai or ChatGPT in my web browser, why do I need a coding agent in my terminal?"* The difference lies in agency, workspace grounding, and closed-loop verification.',
          'A browser-based chat interface operates inside an isolated browser tab. It cannot see your project\'s folder hierarchy, cannot inspect which version of Node.js or Python is installed on your machine, cannot apply a 12-file refactoring diff automatically, and cannot run your test suite to see if its suggested code actually compiles. In a web chat workflow, the human acts as a manual copy-paste router.',
          'An autonomous coding agent eliminates the human copy-paste bridge through a four-stage closed control loop:',
          '• **Stage 1 — Workspace Observation & Discovery**: When you submit a task, the agent invokes non-destructive discovery tools (`Glob`, `Grep`/ripgrep, `LS`, and `Read`) to locate relevant modules across your repository.',
          '• **Stage 2 — Architectural Planning & Diff Formulation**: Using retrieved file contents and project rules (`CLAUDE.md`), the model formulates a step-by-step modification plan and emits structured `tool_use` blocks specifying exact search-and-replace hunks (`Edit`) or new file contents (`Write`).',
          '• **Stage 3 — Sandboxed Command Execution**: After applying file changes (with your interactive permission approval), the agent invokes its `Bash` tool to run your compiler, linter, or test runner (`node test.js`, `pytest`, `cargo test`, `npm run build`).',
          '• **Stage 4 — Self-Healing Iteration**: The agent captures stdout, stderr, and the process exit code (0 for success, non-zero for failure). If a test fails or a syntax error appears, the agent automatically feeds the stack trace back into the model, patches the offending line, and re-runs the test suite until verification passes.',
        ],
        tables: [
          {
            id: 'table-1-1',
            title: 'Table 1.1: Functional Comparison of Web Chat, IDE Autocomplete, and Autonomous Coding Agents',
            columns: [
              { key: 'dimension', header: 'Architectural Dimension' },
              { key: 'webChat', header: 'Conversational Web Chat (claude.ai Free)' },
              { key: 'ghostText', header: 'IDE Autocomplete (Ghost Text)' },
              { key: 'codingAgent', header: 'Autonomous Coding Agent (Claude Code / Aider)' },
            ],
            rows: [
              {
                dimension: 'Primary Interface',
                webChat: 'Web browser text box',
                ghostText: 'Single-line / block cursor prediction',
                codingAgent: 'Interactive Terminal (CLI) or IDE Agent Panel',
              },
              {
                dimension: 'Codebase Awareness',
                webChat: 'Only files manually pasted by user',
                ghostText: 'Currently open file + recent tabs',
                codingAgent: 'Full repository search (ripgrep, AST repo-map, git status)',
              },
              {
                dimension: 'Multi-File Refactoring',
                webChat: 'Manual file-by-file copy-pasting',
                ghostText: 'Manual cursor navigation across files',
                codingAgent: 'Autonomous cross-repository Edit and Write operations',
              },
              {
                dimension: 'Terminal & Test Execution',
                webChat: 'None (cannot access local OS shell)',
                ghostText: 'None',
                codingAgent: 'Direct Bash / PowerShell execution with stdout/stderr capture',
              },
              {
                dimension: 'Error Recovery',
                webChat: 'User must copy-paste error logs manually',
                ghostText: 'User must spot and fix red squiggles',
                codingAgent: 'Closed-loop self-healing (reads stack trace and re-patches automatically)',
              },
              {
                dimension: 'Git Integration',
                webChat: 'None',
                ghostText: 'Basic commit message generation',
                codingAgent: 'Inspects git diff, creates branches, commits atomic changes, opens PRs',
              },
            ],
          },
        ],
      },
      {
        id: '1-3-anatomy-of-stack',
        title: '1.3 Anatomy of the Agentic Stack: Model, Harness, Tools, APIs, and IDE',
        content: [
          'To configure, debug, and optimize a zero-cost coding setup, you need a clear picture of how the five core components of an agentic system interact during a single prompt turn:',
          '1. **The Development Environment (OS, Shell, and File System)**: At the base sits your operating system—Windows 10/11, Linux, macOS, or Android (via Termux)—along with a POSIX-compatible shell (`bash` or `zsh`), version control (`git`), and language runtimes (`node`, `python3`, `rustc`). Because frontier coding models are trained predominantly on Linux/macOS bash syntax (`grep`, `find`, `sed`, `cat << "EOF"`), running Claude Code on Windows requires Git for Windows (`bash.exe`) so that shell commands generated by the model execute cleanly.',
          '2. **The Agent Harness (Claude Code CLI, Aider, Cline, OpenCode)**: The orchestrator process running in your terminal. It handles System Prompt Assembly, Permission Gatekeeping, Subagent Dispatch (spawning lightweight background subagents to prevent intermediate search output from polluting main conversation context), and Context Compaction (`/compact`).',
          '3. **Built-In Tool Schemas and the Model Context Protocol (MCP)**: A language model by itself can only output tokens; it cannot read a file or run a command. The harness bridges this gap by sending Tool Definitions in the HTTP request payload and parsing Tool Use Blocks in the HTTP response.',
        ],
        codeSnippets: [
          {
            language: 'json',
            filename: 'HTTP POST /v1/messages Payload Trace',
            environment: 'JSON',
            code: `// Outgoing HTTP Request from Claude Code CLI to ANTHROPIC_BASE_URL (/v1/messages)
{
  "model": "qwen-claude-64k",
  "max_tokens": 8192,
  "system": "You are Claude Code, an interactive CLI coding agent running on Windows_NT...",
  "tools": [
    {
      "name": "Read",
      "description": "Reads a file from the local filesystem.",
      "input_schema": {
        "type": "object",
        "properties": {
          "file_path": { "type": "string", "description": "Absolute path to file" }
        },
        "required": ["file_path"]
      }
    },
    {
      "name": "Bash",
      "description": "Executes a bash command in a persistent shell session.",
      "input_schema": {
        "type": "object",
        "properties": {
          "command": { "type": "string" }
        },
        "required": ["command"]
      }
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": "Read package.json and run the test suite."
    }
  ]
}`,
            explanation: 'The Claude Code CLI sends its full tool schema on every turn. The model responds with a tool_use block, which Claude Code executes locally before sending back a tool_result.',
          },
        ],
        callouts: [
          {
            type: 'NOTE',
            title: 'Why Tool-Schema Token Overhead Matters for Free Setups',
            badge: 'Verified from official documentation',
            content: 'Because Claude Code transmits its full system prompt and tool schemas (Read, Edit, Write, Bash, Glob, Grep, WebFetch, TodoWrite, plus any active MCP servers) on every turn, the baseline prompt overhead is roughly 12,000 to 25,000 tokens—and can exceed 100,000 tokens if dozens of external MCP tools are loaded. This explains why local Ollama models must be configured with a 65,536-token (64K) context window (PARAMETER num_ctx 65536) rather than Ollama\'s default 2,048 or 4,096 token window.',
          },
        ],
      },
      {
        id: '1-4-worked-example',
        title: '1.4 Worked Example: Tracing a Multi-File Bug Fix Across the Stack',
        content: [
          'Trace what happens when a developer using Path A (Official Claude Code + LiteLLM Proxy + Google AI Studio Free Tier) runs a bug-fix prompt inside a JavaScript project:',
          '1. **User Input**: Developer types `> Fix the bug where negative quantities are allowed in cart.js and verify with tests.`',
          '2. **Harness Pre-Processing**: Claude Code reads `./CLAUDE.md`, checks Git status, attaches tool definitions, and sends `POST http://localhost:4000/v1/messages` with header `Authorization: Bearer sk-local-free-proxy`.',
          '3. **Gateway Translation (LiteLLM)**: LiteLLM on `localhost:4000` intercepts the Anthropic-formatted JSON, strips proprietary fields (`output_config`, `thinking`) via `drop_params: true`, translates tools into Google\'s `functionDeclarations` schema, and forwards over HTTPS to `generativelanguage.googleapis.com` using the free `GEMINI_API_KEY`.',
          '4. **File Inspection (Read)**: Gemini 2.0 Flash returns function calls requesting `Read("src/cart.js")` and `Read("tests/cart.test.js")`. LiteLLM converts this to an Anthropic `tool_use` block. Claude Code reads both files locally and returns their contents.',
          '5. **Diff Application (Edit)**: On Turn 2, model emits an `Edit` tool call replacing `if (qty === 0)` with `if (qty <= 0) throw new RangeError("Quantity must be positive");` in `src/cart.js`, and appends an assertion in `tests/cart.test.js`.',
          '6. **Automated Verification (Bash)**: On Turn 3, model invokes `Bash("npm test")`. Claude Code prompts user for approval, executes `npm test` via Git Bash, captures `PASS tests/cart.test.js (4 passed)`, and returns clean exit code 0. Total software and API cost: **₹0.00**.',
        ],
      },
      {
        id: '1-5-misconceptions',
        title: '1.5 Common Misconceptions About Free AI Coding Tools',
        content: [
          'Before moving forward, let us clear up five widespread myths that frequently trap developers:',
        ],
        tables: [
          {
            id: 'table-1-2',
            title: 'Table 1.2: Debunking Widespread Misconceptions About Free Claude Code Setups',
            columns: [
              { key: 'myth', header: 'Common Misconception' },
              { key: 'reality', header: 'Engineering Reality (Verified October 2026)' },
            ],
            rows: [
              {
                myth: 'Myth 1: "If I install Claude Code via npm for free, it comes with free Claude Sonnet/Opus usage."',
                reality: 'False. The npm package (@anthropic-ai/claude-code) is only the client binary. Without gateway overrides, it requires a paid Claude Pro/Max or funded Console account to run even a single prompt.',
              },
              {
                myth: 'Myth 2: "My free claude.ai account lets me log into Claude Code CLI with lowered daily limits."',
                reality: 'False. Anthropic explicitly blocks free consumer claude.ai accounts from completing the Claude Code /login OAuth flow.',
              },
              {
                myth: 'Myth 3: "GitHub Student Developer Pack gives free unlimited Claude Sonnet 4.5 / Opus 5.5 in 2026."',
                reality: 'Outdated. On March 12, 2026, GitHub revoked manual selection of frontier Claude Sonnet and Opus models for student accounts, restricting students to Copilot Auto mode and lower-tier models.',
              },
              {
                myth: 'Myth 4: "Pointing ANTHROPIC_BASE_URL at Ollama or LiteLLM is a \'hack\' that will get my computer banned."',
                reality: 'False. ANTHROPIC_BASE_URL is an officially documented enterprise configuration variable. When pointed at localhost, traffic never touches Anthropic\'s servers.',
              },
              {
                myth: 'Myth 5: "You need a ₹1,50,000 gaming PC with an RTX GPU to use Claude Code for free."',
                reality: 'False. While local 30B models require strong hardware, Path A (LiteLLM + Google AI Studio Free Tier) offloads 100% of model computation to Google\'s cloud for free, running smoothly on any 4 GB RAM laptop or Android phone.',
              },
            ],
          },
        ],
      },
    ],
    prevSlug: 'front-matter',
    nextSlug: 'chapter-2',
  },

  // -------------------------------------------------------------
  // Chapter 2: What Does '100% Free' Actually Mean?
  // -------------------------------------------------------------
  {
    id: 'chapter-2',
    slug: 'chapter-2',
    part: 'Part I: Foundations',
    number: 2,
    title: "Chapter 2: What Does '100% Free' Actually Mean?",
    subtitle: 'The Mathematical Zero-Cost Model, Eight Categories of Free, and TCO Elimination Matrix',
    purpose: 'Define a mathematically rigorous zero-cost (₹0.00) operational model that separates perpetually free software and quota-bound cloud tiers from trial traps, promotional credits, and unavoidable physical infrastructure costs.',
    sourcePageRange: 'pp. 16–19',
    readingTimeMinutes: 30,
    difficulty: 'Beginner',
    keyTerminology: [
      'FOSS',
      'Quota-Bound Free Tier',
      'Promotional Credit',
      'Trial Trap',
      'Unbilled Project Isolation',
      'Sunk Infrastructure Cost',
      'kWh Tariff',
    ],
    practicalOutcome: 'Establish a strict financial firewall that guarantees ₹0.00 in monthly software, API, and hosting charges with zero risk of accidental credit card billing.',
    sections: [
      {
        id: '2-1-defining-zero-cost',
        title: '2.1 Defining a Rigorous Zero-Cost (₹0) Engineering Model',
        content: [
          'In commercial software marketing, the word "free" is routinely abused to describe 7-day trials that auto-bill ₹1,700 ($20) on day eight, or $5 welcome credits that evaporate in ninety minutes of agentic coding. To prevent financial surprises, this handbook enforces a strict engineering definition of **100% Free (The ₹0 Standard)**:',
          '$$\\text{Total Direct Software, API, Database, \\& Hosting Outlay} = ₹0.00\\text{ per month (Indefinitely)}$$',
          'Specifically, for a workflow to qualify as a primary recommendation in this handbook, it must satisfy four mandatory criteria:',
          '1. **Zero License or Subscription Fees**: Neither the terminal agent harness nor the local gateway software may require a paid license or recurring subscription.',
          '2. **Perpetual Viability (No Expiration Date)**: The model inference route must remain operational month after month without relying on one-time sign-up bonuses or time-bombed trial periods.',
          '3. **No Mandatory Payment Method (Card-Free Onboarding)**: A developer in India (or globally) must be able to provision and authenticate the entire stack without attaching a credit card, debit card, or UPI AutoPay mandate that could be charged if a script enters an infinite loop.',
          '4. **Hard Quota Ceiling Instead of Overage Billing**: When a cloud free tier reaches its rate limit (requests per minute or requests per day), the server must fail safely with an `HTTP 429 Too Many Requests` status code rather than silently transitioning to pay-per-token billing.',
        ],
      },
      {
        id: '2-2-eight-categories-of-free',
        title: '2.2 The Eight Categories of "Free" in AI Developer Tooling',
        content: [
          'Not all zero-price offerings are created equal. Table 2.1 dissects the eight distinct models encountered across AI coding tools and evaluates each against our perpetual ₹0 standard.',
        ],
        tables: [
          {
            id: 'table-2-1',
            title: 'Table 2.1: Rigorous Classification of "Free" Models in the AI Coding Ecosystem',
            columns: [
              { key: 'category', header: 'Category' },
              { key: 'definition', header: 'Technical Definition' },
              { key: 'examples', header: 'Concrete Examples (Oct 2026)' },
              { key: 'qualifies', header: 'Qualifies as Perpetual ₹0?' },
              { key: 'cardRequired', header: 'Credit Card Required?' },
              { key: 'primaryRisk', header: 'Primary Risk or Failure Mode' },
            ],
            rows: [
              {
                category: '1. Free Open-Source Software (FOSS)',
                definition: 'Software licensed under MIT, Apache 2.0, or GPL where source and binaries are permanently free to run and modify.',
                examples: 'Aider (MIT), LiteLLM (MIT), Ollama (MIT), Cline (Apache-2.0), OpenCode (MIT).',
                qualifies: 'Yes (100% Perpetual)',
                cardRequired: 'Never',
                primaryRisk: 'Requires pairing with an inference model (local weights or free API).',
              },
              {
                category: '2. Free Proprietary Client Binary',
                definition: 'Closed-source or source-available client binary distributed freely, designed to connect to an API backend.',
                examples: 'Official @anthropic-ai/claude-code CLI, LM Studio desktop app.',
                qualifies: 'Yes (Client Layer Only)',
                cardRequired: 'Never',
                primaryRisk: 'Defaults to paid cloud unless redirected via ANTHROPIC_BASE_URL.',
              },
              {
                category: '3. Local Open-Weight Inference',
                definition: 'Pre-trained neural network weights (GGUF, Safetensors) downloaded once and executed on local CPU/GPU hardware.',
                examples: 'qwen2.5-coder:7b, qwen3-coder-30b, devstral-small-2, deepseek-coder-v2.',
                qualifies: 'Yes (100% Perpetual)',
                cardRequired: 'Never',
                primaryRisk: 'High local RAM/VRAM requirement; increases PC electricity consumption.',
              },
              {
                category: '4. Quota-Bound Perpetual Free Cloud Tier',
                definition: 'Cloud-hosted inference API offering a recurring daily/minute quota at $0 cost indefinitely.',
                examples: 'Google AI Studio Free Tier (1,500 RPD Flash), OpenRouter :free models, Groq Free Tier, Mistral Experiment Plan.',
                qualifies: 'Yes (Subject to Provider Policy)',
                cardRequired: 'No (on unbilled projects)',
                primaryRisk: 'Rate-limited (15–30 RPM); prompts on unpaid tiers may be logged by providers for model training.',
              },
              {
                category: '5. One-Time Promotional / Welcome Credits',
                definition: 'Fixed dollar balance granted upon new account registration and phone verification.',
                examples: 'Anthropic Console $5 trial credit; OpenAI historic trial credits.',
                qualifies: 'No (Depletes Rapidly)',
                cardRequired: 'No initially; Yes after $5 burns out',
                primaryRisk: 'Agentic workflows burn $5 in 2–4 hours; SMS verification often fails on non-US (+91) numbers.',
              },
              {
                category: '6. Time-Limited Cloud Infrastructure Trials',
                definition: 'Cloud hyperscaler credit valid for 30–90 days that requires identity and payment verification.',
                examples: 'Google Cloud Vertex AI ($300 for 90 days); AWS Bedrock free trial credits.',
                qualifies: 'No (Expires in 90 Days)',
                cardRequired: 'Yes (Mandatory)',
                primaryRisk: 'High risk of accidental charges if resources remain active after trial expiration.',
              },
              {
                category: '7. Institutional, Student & Maintainer Grants',
                definition: 'Conditional free access restricted to verified students, K-12 US teachers, or high-star OSS maintainers.',
                examples: 'GitHub Student Pack (restricted March 2026); Anthropic OSS Maintainer Program (5,000+ stars).',
                qualifies: 'Conditional (Inaccessible to General Users)',
                cardRequired: 'Varies',
                primaryRisk: 'GitHub blocked student access to frontier Claude Sonnet/Opus on March 12, 2026.',
              },
              {
                category: '8. Paid Services with a "Free Entry Point" (Freemium Trap)',
                definition: 'Consumer web chat tiers that advertise "Free" on homepage but block CLI/API agent access.',
                examples: 'claude.ai Free Consumer Plan; ChatGPT Free Web Tier.',
                qualifies: 'No (Blocked in CLI)',
                cardRequired: 'No',
                primaryRisk: 'Cannot authenticate @anthropic-ai/claude-code CLI (/login rejected).',
              },
            ],
          },
        ],
      },
      {
        id: '2-3-cost-elimination-matrix',
        title: '2.3 Full-Stack Cost Breakdown: Eliminable vs. Unavoidable Costs',
        content: [
          'A senior systems architect evaluates total cost of ownership (TCO) across every layer of the development lifecycle—from writing the first line of code to serving production traffic on the web. Table 2.2 audits all ten cost layers of a software project and demonstrates which expenses can be eliminated to exactly ₹0.00 and which physical baseline costs remain unavoidable.',
        ],
        tables: [
          {
            id: 'table-2-2',
            title: 'Table 2.2: Comprehensive Cost Elimination Matrix Across All Ten Software Engineering Layers',
            columns: [
              { key: 'layer', header: 'Cost Layer' },
              { key: 'paidCost', header: 'Typical Paid Stack (Monthly)' },
              { key: 'zeroCost', header: 'Zero-Cost (₹0) Equivalent' },
              { key: 'canEliminate', header: 'Can Cost Be Eliminated to ₹0.00?' },
              { key: 'analysis', header: 'Quantitative Analysis & India Context' },
            ],
            rows: [
              {
                layer: '1. Coding Agent Software',
                paidCost: 'Cursor Pro ($20/mo) or Windsurf ($15/mo)',
                zeroCost: 'Official Claude Code CLI, Aider, Cline, Roo Code, or OpenCode',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'All recommended client harnesses are free to download and execute locally.',
              },
              {
                layer: '2. LLM API / Token Billing',
                paidCost: 'Claude Max ($100–$200/mo) or Console API ($25–$80/mo)',
                zeroCost: 'Google AI Studio Free Tier, OpenRouter :free, Groq Free, or Local Ollama',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'Unbilled AI Studio keys and local GGUF weights incur ₹0.00 per token.',
              },
              {
                layer: '3. Local Proxy & Gateway',
                paidCost: 'Enterprise API Gateways ($50+/mo)',
                zeroCost: 'Self-hosted LiteLLM Proxy (pip install "litellm[proxy]")',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'Open-source MIT Python package running on 127.0.0.1:4000.',
              },
              {
                layer: '4. Version Control & CI/CD',
                paidCost: 'GitHub Team ($4/user/mo)',
                zeroCost: 'GitHub Free (Public & Private Repos + 2,000 Actions mins/mo)',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'Unlimited public/private repositories for individual developers.',
              },
              {
                layer: '5. Application Hosting & CDN',
                paidCost: 'AWS EC2 / Paid Vercel Pro ($20/mo)',
                zeroCost: 'Cloudflare Pages Free Tier or GitHub Pages',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'Cloudflare Pages provides unlimited static bandwidth and free SSL at ₹0.',
              },
              {
                layer: '6. Database & State Storage',
                paidCost: 'Managed RDS / Paid Cloud DB ($15+/mo)',
                zeroCost: 'Browser localStorage, IndexedDB, SQLite-in-WASM, or Cloudflare D1 Free Tier',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'Client-side storage and free serverless edge tiers require zero paid infrastructure.',
              },
              {
                layer: '7. Custom Domain Name',
                paidCost: '.com or .in registration (~₹700–₹1,200/year)',
                zeroCost: 'Free platform subdomains (.github.io, .pages.dev, *.vercel.app)',
                canEliminate: 'Yes — 100% Eliminated (₹0)',
                analysis: 'Using native .pages.dev or .github.io subdomains eliminates registrar renewal fees.',
              },
              {
                layer: '8. Payment Method / Card Verification',
                paidCost: 'International Credit Card with USD auto-debit',
                zeroCost: 'Unbilled Google AI Studio account + GitHub + Cloudflare Pages',
                canEliminate: 'Yes — 100% Eliminated (No Card)',
                analysis: 'None of the core stack components require entering credit/debit card details.',
              },
              {
                layer: '9. Computing Hardware',
                paidCost: 'Dedicated MacBook Pro / RTX Workstation',
                zeroCost: 'Existing Windows PC/Laptop (4 GB+ RAM) or Android 8+ Smartphone',
                canEliminate: 'Sunk Cost (Cannot Be Eliminated)',
                analysis: 'Requires utilizing hardware you already own; Path A avoids needing a GPU upgrade.',
              },
              {
                layer: '10. Electricity & Internet Access',
                paidCost: 'Datacenter power + Fiber lease',
                zeroCost: 'Domestic Indian Broadband / 4G-5G Mobile Data + Household AC Power',
                canEliminate: 'Marginal Physical Cost (Cannot Be Zero)',
                analysis: 'See Section 2.4 for exact watt-hour calculations on CPU/cloud vs local GPU inference.',
              },
            ],
          },
        ],
      },
      {
        id: '2-4-hidden-costs-physics',
        title: '2.4 Hidden Costs and the Physics of Local vs. Cloud Inference',
        content: [
          'While software, API, and hosting charges can be reduced to ₹0.00, honest engineering requires examining indirect physical costs—specifically electricity consumption and hardware thermal wear when running local models (Path B) versus free cloud APIs (Path A).',
          'Consider the electrical math for a developer in India (where domestic electricity tariffs typically range from ₹6.00 to ₹9.00 per kWh depending on state slab rates in Telangana, Maharashtra, Karnataka, or Delhi):',
          '• **Path A (Cloud Offload via LiteLLM + Google AI Studio on a Laptop)**: Your laptop only runs the terminal, code editor, and lightweight LiteLLM Python process. CPU utilization stays near idle (~15W to 30W total system draw). Over 4 hours of daily coding for 30 days (120 hours/month):',
          '$$\\text{Monthly Energy (Path A)} = \\frac{25\\text{ W} \\times 120\\text{ hours}}{1000} = 3.0\\text{ kWh/month} \\approx ₹18\\text{ to }₹27\\text{ per month}$$',
          '• **Path B (Local GPU Inference via Ollama on a Desktop Workstation)**: When running a 14B or 30B parameter model locally on a dedicated desktop GPU (such as an NVIDIA RTX 3060/4070/3090 drawing 200W–300W under active token generation) for 4 hours a day across 30 days:',
          '$$\\text{Monthly Energy (Path B GPU)} = \\frac{250\\text{ W} \\times 120\\text{ hours}}{1000} = 30.0\\text{ kWh/month} \\approx ₹180\\text{ to }₹270\\text{ per month}$$',
        ],
        callouts: [
          {
            type: 'COST ALERT',
            title: 'Managing Local GPU Power Consumption',
            badge: 'Tested successfully',
            content: 'If you use Path B (Local Ollama), Ollama keeps the loaded model resident in VRAM for 5 minutes by default (OLLAMA_KEEP_ALIVE="5m"), which is efficient. Never set OLLAMA_KEEP_ALIVE="-1" (infinite retention) on a high-wattage desktop GPU if background scripts periodically ping the server, as keeping GPU memory clocks pinned in P0 power state 24/7 can add ₹400–₹600/month to your household electricity bill. Run ollama stop <model_name> immediately after finishing your coding session.',
          },
        ],
      },
    ],
    prevSlug: 'chapter-1',
    nextSlug: 'chapter-3',
  },

  // -------------------------------------------------------------
  // Chapter 3: Official Claude Code — Access, Pricing, and Limitations
  // -------------------------------------------------------------
  {
    id: 'chapter-3',
    slug: 'chapter-3',
    part: 'Part I: Foundations',
    number: 3,
    title: 'Chapter 3: Official Claude Code — Access, Pricing, and Limitations',
    subtitle: 'Authentication Gates, Account Tiers, Student Pack Forensics, and Enterprise Gateways',
    purpose: 'Document the verified October 2026 product requirements, installation methods, authentication gates, subscription pricing, API token economics, and promotional/student restrictions of official Anthropic Claude Code.',
    sourcePageRange: 'pp. 19–23',
    readingTimeMinutes: 40,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'OAuth 2.0 Flow',
      'Rolling 5-Hour Quota',
      'Anthropic Console',
      'Guest Pass (/passes)',
      'Prompt Caching',
      'Gateway Override (ANTHROPIC_BASE_URL)',
    ],
    practicalOutcome: 'Understand why direct authentication against api.anthropic.com is paywalled, which edge-case official programs exist, and how the official binary architecture supports zero-cost custom gateways.',
    sections: [
      {
        id: '3-1-product-requirements',
        title: '3.1 Official Product Requirements and Installation Channels',
        content: [
          "According to Anthropic's official setup documentation (`code.claude.com/docs/en/setup`), the official Claude Code CLI client has modest baseline system requirements because model inference is designed to execute remotely:",
          '• **Operating Systems**: Windows 10 (build 1809 / October 2018 update or later) and Windows 11 (Native PowerShell / CMD with Git for Windows, or WSL2); macOS 13.0 (Ventura) or newer; Linux Ubuntu 20.04+, Debian 10+, Alpine Linux 3.19+ (requires libgcc, libstdc++, and ripgrep).',
          '• **Hardware Minimums**: 4 GB of System RAM minimum; 64-bit CPU (x86_64 or arm64/aarch64).',
          '• **Software Dependencies**: Native Binary Installer (Recommended by Anthropic in 2026: ships self-contained platform binaries); or NPM Global Installer (`npm install -g @anthropic-ai/claude-code`, requires Node.js 18+).',
          '• **Windows Shell Prerequisite**: Git for Windows (`bash.exe`) is required on Native Windows so Claude Code can execute POSIX shell scripts and file-search pipelines reliably.',
        ],
        callouts: [
          {
            type: 'COMPATIBILITY',
            title: 'Critical Architectural Change in Claude Code v2.1.114+ (April 2026)',
            badge: 'Verified from official documentation',
            content: 'Prior to April 17, 2026, installing @anthropic-ai/claude-code via npm installed a cross-platform JavaScript entrypoint (cli.js) executed by the local node binary. Starting in v2.1.114, Anthropic removed cli.js and transitioned the package to distribute native glibc-linked ELF binaries on Linux/ARM64. On Windows, macOS, and standard glibc Linux (Ubuntu/Debian/Fedora), this works out of the box. On Android Termux (which uses Google\'s Bionic libc), running the binary requires a glibc-runner (grun) ELF interpreter patch, documented step-by-step in Chapter 9.',
          },
        ],
      },
      {
        id: '3-2-auth-flows',
        title: '3.2 Official Authentication Flows and Account Eligibility',
        content: [
          'When you launch `claude` in a terminal without custom gateway environment variables, the CLI checks for credentials and presents an interactive login menu. Table 3.1 documents every official authentication mechanism, its cost in USD and INR, and its eligibility status as of October 2026.',
        ],
        tables: [
          {
            id: 'table-3-1',
            title: 'Table 3.1: Complete Matrix of Official Anthropic Account Tiers, Pricing, and Claude Code Eligibility',
            columns: [
              { key: 'tier', header: 'Official Access Tier' },
              { key: 'cost', header: 'Monthly / Usage Cost' },
              { key: 'cliAccess', header: 'Claude Code CLI Access?' },
              { key: 'authMech', header: 'Authentication Mechanism' },
              { key: 'constraints', header: 'Quota Structure & Technical Constraints' },
              { key: 'status', header: 'Verification Status' },
            ],
            rows: [
              {
                tier: 'Claude Free (claude.ai)',
                cost: '$0 / ₹0',
                cliAccess: 'NO (Blocked)',
                authMech: 'Browser OAuth (/login) rejects free accounts',
                constraints: 'Restricted strictly to web and mobile chat apps; cannot authorize CLI, VS Code, or JetBrains agents.',
                status: 'Verified from official documentation',
              },
              {
                tier: 'Claude Pro',
                cost: '$20/mo (~₹1,700/mo + GST; or $17/mo billed at $200/yr upfront)',
                cliAccess: 'Yes',
                authMech: 'Browser OAuth (/login -> Claude App account)',
                constraints: 'Shared usage pool across web chat and Claude Code; enforces strict 5-hour rolling session rate limits suited for short coding sprints.',
                status: 'Verified from official documentation',
              },
              {
                tier: 'Claude Max 5x',
                cost: '$100/mo (~₹8,500/mo)',
                cliAccess: 'Yes',
                authMech: 'Browser OAuth (/login -> Claude App account)',
                constraints: 'Provides 5x the usage capacity of Claude Pro for daily engineering in larger repositories; includes $100/mo API credit allocation.',
                status: 'Verified from official documentation',
              },
              {
                tier: 'Claude Max 20x',
                cost: '$200/mo (~₹17,000/mo)',
                cliAccess: 'Yes',
                authMech: 'Browser OAuth (/login -> Claude App account)',
                constraints: 'Provides 20x the usage capacity of Claude Pro for heavy autonomous multi-agent loops and priority access to frontier models (claude-opus-5-5).',
                status: 'Verified from official documentation',
              },
              {
                tier: 'Claude Team / Enterprise',
                cost: '$25–$30+/seat/mo (minimum 5 seats)',
                cliAccess: 'Yes',
                authMech: 'SSO / Enterprise OAuth or Admin Console',
                constraints: 'Adds centralized billing, audit logs, and repository governance controls.',
                status: 'Verified from official documentation',
              },
              {
                tier: 'Anthropic Console (API Billing)',
                cost: 'Pay-per-token ($0.25 to $75.00 per 1M tokens)',
                cliAccess: 'Yes',
                authMech: 'ANTHROPIC_API_KEY or Console OAuth (v2.1.242+)',
                constraints: 'Requires prepaid credit balance at platform.claude.com; light usage averages $5–$15/mo, moderate usage $20–$50/mo, heavy usage $100+/mo.',
                status: 'Verified from official documentation',
              },
              {
                tier: 'Enterprise Cloud Gateways',
                cost: 'Pay-per-token (Billed via AWS/GCP/Azure)',
                cliAccess: 'Yes',
                authMech: 'CLAUDE_CODE_USE_BEDROCK=1, CLAUDE_CODE_USE_VERTEX=1, or Foundry',
                constraints: 'Routes traffic to Amazon Bedrock, Google Vertex AI, or Microsoft Foundry using enterprise cloud credentials.',
                status: 'Verified from official documentation',
              },
            ],
          },
        ],
      },
      {
        id: '3-3-token-economics',
        title: '3.3 Why API-Based Usage Depletes Trial Credits Rapidly',
        content: [
          'New developers often wonder why a $5 free trial credit on the Anthropic Console (`platform.claude.com`) disappears so quickly when using Claude Code compared to a simple chatbot script. Let us examine the token arithmetic of an active Claude Code session running on `claude-sonnet-4-5` ($3.00 per 1M input tokens, $15.00 per 1M output tokens):',
          '1. **System Prompt & Tool Schema Overhead**: Every single turn in Claude Code transmits the core system prompt, environment details, `CLAUDE.md`, and JSON schemas for all built-in tools (~15,000 tokens). If external MCP servers (such as GitHub, Postgres, or Puppeteer/Playwright) are attached without server-side tool search optimization, tool definitions alone can consume up to 134,000 tokens per session.',
          '2. **Multi-Turn Agentic Compounding**: Suppose you ask Claude Code to build and debug a feature. That single user prompt often triggers 8 to 15 internal tool-calling turns (`Grep` -> `Read file A` -> `Read file B` -> `Edit file A` -> `Bash npm test` -> `Read error stack` -> `Edit file A` -> `Bash npm test`).',
          '3. **Cost Per Feature Loop**: Even with Anthropic\'s prompt-caching discounts applied to repeated prefixes, a 15-turn debugging loop reading 40,000 tokens of repository context can consume 300,000 to 600,000 input tokens and 15,000 output tokens, costing $0.40 to $1.20 for a single complex prompt. Consequently, a $5 trial balance is exhausted within 2 to 4 hours of real-world coding.',
        ],
      },
      {
        id: '3-4-promotional-programs',
        title: '3.4 Audit of Official Promotional, Educational, and Maintainer Access',
        content: [
          'Table 3.2 separates verified programs from dead ends and online myths as of October 2026.',
        ],
        tables: [
          {
            id: 'table-3-2',
            title: 'Table 3.2: Forensic Audit of Promotional, Student, and Educational Access Routes',
            columns: [
              { key: 'program', header: 'Program / Claimed Route' },
              { key: 'currentStatus', header: 'Current Status (October 2026)' },
              { key: 'eligibility', header: 'Eligibility & Verification Details' },
              { key: 'viable', header: 'Viable for General Perpetual ₹0 Use?' },
              { key: 'evidence', header: 'Evidence Label' },
            ],
            rows: [
              {
                program: 'Anthropic Console $5 Welcome Credit',
                currentStatus: 'Active (One-Time Only)',
                eligibility: 'New developer accounts at platform.claude.com may claim $5 after email + SMS verification. However, SMS delivery frequently fails or blocks Indian (+91) and VoIP numbers, and credits expire or deplete in hours.',
                viable: 'No (Temporary 2–4 hour buffer)',
                evidence: 'Partially verified',
              },
              {
                program: 'Claude Max Guest Passes (/passes)',
                currentStatus: 'Active (7-Day Peer Referral)',
                eligibility: 'Introduced in Dec 2025 after Opus 4.5 launch; existing paid Claude Max ($100/$200) subscribers can run /passes in Claude Code to share three 7-day trial links with peers. Requires a credit card on signup and auto-renews at paid rates unless canceled.',
                viable: 'No (7-day trial; requires card)',
                evidence: 'Verified from official documentation',
              },
              {
                program: 'Public 30-Day Free Claude Pro Trial',
                currentStatus: 'Does Not Exist (Myth)',
                eligibility: 'Anthropic\'s official pricing page offers no public 30-day free trial. Websites advertising "Guaranteed 30-Day Claude Pro Links" are clickbait or phishing lures.',
                viable: 'No (Fraudulent / Outdated claim)',
                evidence: 'Outdated or unsupported',
              },
              {
                program: 'GitHub Student Developer Pack (Claude Sonnet/Opus)',
                currentStatus: 'Restricted / Closed (March 12, 2026)',
                eligibility: 'On March 12, 2026, GitHub transitioned all verified students to a restricted "GitHub Copilot Student Plan," removing manual selection of frontier Claude Opus and Sonnet models due to compute abuse. Students only get Auto mode / lower-tier models (e.g., Haiku 4.5), which cannot authenticate @anthropic-ai/claude-code CLI directly.',
                viable: 'No (Frontier models removed Mar 2026)',
                evidence: 'Verified from official documentation',
              },
              {
                program: 'Claude for Education & Campus Builder Clubs',
                currentStatus: 'Active (Restricted Institutional)',
                eligibility: 'Launched April 2025; grants free access only to students at universities with signed institutional contracts with Anthropic, or student hackathons via Campus Ambassadors.',
                viable: 'No (Requires partner university)',
                evidence: 'Verified from official documentation',
              },
              {
                program: 'Anthropic Open-Source Maintainer Program',
                currentStatus: 'Active (Elite OSS Only)',
                eligibility: 'Launched Feb 2026 and expanded July 8, 2026; grants free Claude Pro and API credits without a credit card to lead maintainers of OSS repositories with 5,000+ GitHub stars or 1M+ monthly NPM downloads.',
                viable: 'No (Restricted to major OSS maintainers)',
                evidence: 'Verified from official documentation',
              },
              {
                program: 'Shared Pro/Max OAuth Tokens (CLAUDE_CODE_OAUTH_TOKEN)',
                currentStatus: 'Strictly Prohibited (ToS Violation)',
                eligibility: 'Sharing a paid subscription token generated via claude setup-token across multiple users or buying "shared accounts" violates Anthropic\'s Terms of Service and triggers automated account bans.',
                viable: 'No (Violates ToS; high ban risk)',
                evidence: 'Verified from official documentation',
              },
            ],
          },
        ],
      },
      {
        id: '3-5-official-gateway-support',
        title: '3.5 Official Gateway Support: Why Custom Endpoints Are Legal and Supported',
        content: [
          'Given that Anthropic blocks unpaid accounts from `api.anthropic.com`, why does the official `@anthropic-ai/claude-code` binary allow you to connect to `http://localhost:4000` (LiteLLM) or `http://localhost:11434` (Ollama) without logging in?',
          'The answer lies in Anthropic\'s enterprise architecture. Large corporations, financial institutions, and government agencies never allow developer workstations to connect directly to public AI endpoints; instead, they require all CLI traffic to pass through an internal LLM gateway (such as LiteLLM, Bifrost, or Kong AI Gateway) using internal authentication tokens.',
          'To support these deployments, Anthropic built and officially documented the following environment variables in `@anthropic-ai/claude-code`:',
          '• `ANTHROPIC_BASE_URL`: Overrides the target API server URL (default `https://api.anthropic.com`). When set to `http://localhost:11434` or `http://localhost:4000`, Claude Code sends all `POST /v1/messages` requests to your local machine.',
          '• `ANTHROPIC_AUTH_TOKEN`: Supplies a custom `Authorization: Bearer <token>` header to your gateway and bypasses the interactive browser `/login` screen.',
          '• `ANTHROPIC_MODEL`, `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`, and `CLAUDE_CODE_SUBAGENT_MODEL`: Override model identifiers sent in JSON payloads so that neither primary prompts nor background subagent tasks request paid Anthropic model names.',
          '• `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` (v2.1.129+): Instructs the interactive `/model` slash command to query your custom gateway\'s `GET /v1/models` endpoint dynamically.',
        ],
        callouts: [
          {
            type: 'SECURITY ALERT',
            title: 'Legal Boundary Between Custom Gateways and OAuth Abuse',
            badge: 'Verified from official documentation',
            content: "Anthropic's Legal and Compliance policy strictly prohibits third-party tools from spoofing claude.ai consumer OAuth logins or piggybacking on consumer subscription rate limits. By contrast, pointing ANTHROPIC_BASE_URL at your own local Ollama server or your own LiteLLM proxy backed by your own Google AI Studio / OpenRouter API key does not touch Anthropic's servers, does not use Anthropic OAuth, and consumes zero Anthropic compute. The gateway mechanism itself is an intended, documented feature of the CLI.",
          },
        ],
      },
    ],
    prevSlug: 'chapter-2',
    nextSlug: 'chapter-4',
  },
];
