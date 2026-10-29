/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Interactive Master FAQ Center — 55 Verified Technical & Economic FAQs
 */

import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  BookOpen,
  Terminal,
  Cpu,
  Shield,
  Smartphone,
  Sparkles,
  DollarSign,
  Layers,
  X,
  MessageSquare,
} from 'lucide-react';

export interface FaqItem {
  id: number;
  category: 'economics' | 'cloud_proxy' | 'local_ollama' | 'mobile_aider' | 'workflows_security';
  categoryLabel: string;
  question: string;
  answer: string;
  commandSnippet?: string;
  chapterSlug?: string;
  chapterLabel?: string;
}

export const MASTER_FAQS: FaqItem[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORY 1: General & ₹0 Economics (11 FAQs: #1 – #11)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'How is it legally and technically possible to run Claude Code at ₹0 ($0.00)?',
    answer:
      'Anthropic distributes the Claude Code CLI (`@anthropic-ai/claude-code`) as a free npm package and allows overriding its endpoint via `ANTHROPIC_BASE_URL`. By pointing the CLI to a local loopback adapter (`127.0.0.1:4000` via LiteLLM or `127.0.0.1:11434` via Ollama), your agentic tool calls are fulfilled either by legitimate free-tier developer APIs (like Google AI Studio’s 1,500 requests/day Gemini tier) or 100% local open-weight models on your own hardware.',
    commandSnippet: 'export ANTHROPIC_BASE_URL="http://127.0.0.1:4000"\nexport ANTHROPIC_AUTH_TOKEN="sk-local-zero"\nclaude',
    chapterSlug: 'chapter-1',
    chapterLabel: 'Chapter 1: Architecture of Autonomy',
  },
  {
    id: 2,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'Do I ever need to enter a credit card or debit card for any setup in this handbook?',
    answer:
      'No. Every single architecture in this handbook (Paths A, B, C1, and C2) operates strictly without a credit card, debit card, or UPI mandate. In fact, our #1 financial safety rule is to never attach a billing instrument to your Google Cloud / AI Studio developer project so it is mathematically impossible to incur accidental overage charges.',
    chapterSlug: 'chapter-1',
    chapterLabel: 'Chapter 1: Zero-Cost Invariant',
  },
  {
    id: 3,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'How much money does a typical full-time developer save using this ₹0 stack?',
    answer:
      'An active engineer running 30–50 autonomous multi-file coding tasks per day consumes 1.5M to 4M tokens daily. On commercial pay-as-you-go APIs (Claude 3.7 Sonnet at $3/$15 per MTok), that costs $350–$900 USD/month (₹30,000–₹75,000 INR/month), or ₹3.6L+ per year. With Path A + Path B, your recurring bill is ₹0.00.',
    chapterSlug: 'chapter-1',
    chapterLabel: 'Chapter 1: Token Economics',
  },
  {
    id: 4,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'Does running at ₹0 violate Anthropic, Google, or OpenRouter Terms of Service?',
    answer:
      'No. You are using the official, unmodified `@anthropic-ai/claude-code` npm package with its documented environment variables (`ANTHROPIC_BASE_URL`), combined with official free-tier API keys issued directly to you by Google AI Studio, OpenRouter, or Groq, or running open-weight Apache-2.0 models (like Qwen2.5-Coder) locally on your own CPU/GPU.',
    chapterSlug: 'chapter-2',
    chapterLabel: 'Chapter 2: CLI Internals',
  },
  {
    id: 5,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'What is the difference between Passive Web Chat (claude.ai free) and an Autonomous Terminal Agent?',
    answer:
      'Web chat runs in an isolated browser tab—you must manually copy-paste files in and out, and it cannot run tests or inspect compiler errors. A terminal coding agent has direct workspace integration: it indexes your repository AST, edits multiple files atomically, executes `npm test` or `pytest`, reads the stack trace if a test fails, and self-heals the code in a closed loop.',
    chapterSlug: 'chapter-1',
    chapterLabel: 'Chapter 1: Closed-Loop Agents',
  },
  {
    id: 6,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'How do I verify inside the CLI that my session is truly costing $0.00 / ₹0?',
    answer:
      'At any point during an active Claude Code session, type `/cost` and press Enter. When routed through your local loopback proxy (`127.0.0.1:4000` or `127.0.0.1:11434`), the session billing meter confirms zero commercial Anthropic API expenditure.',
    commandSnippet: '/cost',
    chapterSlug: 'chapter-2',
    chapterLabel: 'Chapter 2: Slash Commands',
  },
  {
    id: 7,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'Which of the 4 zero-cost paths should a complete beginner start with?',
    answer:
      'Start with Path A (Official Claude Code CLI + LiteLLM Proxy + Google AI Studio Gemini 2.5 Flash). It works even on a 4GB RAM laptop because inference runs in Google’s cloud, gives you a massive 1,048,576-token context window, allows 1,500 free requests per day, and takes under 10 minutes to configure.',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Path A Guide',
  },
  {
    id: 8,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'Can I use this ₹0 setup for commercial client projects or startup codebases?',
    answer:
      'Yes! If you are working on proprietary client code with strict NDA requirements, use Path B (Local Ollama with Qwen2.5-Coder or DeepSeek). Because Path B runs 100% offline on your own machine, zero lines of client source code ever leave your local network.',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: Local Ollama Setup',
  },
  {
    id: 9,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'How does this compare to Cursor Pro ($20/mo) or GitHub Copilot ($10–$39/mo)?',
    answer:
      'Cursor Pro caps fast premium requests at 500/month before throttling you into slow queues or charging per-request overages. Path A gives you 1,500 fast requests per DAY (45,000/month) on Gemini 2.5 Flash plus unlimited offline tokens on Path B—all inside a scriptable terminal harness that works alongside VS Code, Neovim, Zed, or JetBrains.',
    chapterSlug: 'chapter-3',
    chapterLabel: 'Chapter 3: Agent Comparison',
  },
  {
    id: 10,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'Do I need a high-end GPU to use Claude Code at ₹0?',
    answer:
      'No! Path A (LiteLLM + Cloud Free Tier), Path C1 (Aider Cloud), and Path C2 (Android Termux) require zero GPU because all model computation happens on free cloud endpoints. You only need a GPU (or 16GB+ Apple Silicon unified memory) if you choose Path B (100% offline local inference).',
    chapterSlug: 'chapter-4',
    chapterLabel: 'Chapter 4: Hardware Sizing',
  },
  {
    id: 11,
    category: 'economics',
    categoryLabel: 'General & ₹0 Economics',
    question: 'Can I combine Cloud Free Tiers (Path A) and Local Offline Models (Path B) in one config?',
    answer:
      'Yes! LiteLLM supports hybrid routing in a single `config.yaml`. You can configure Gemini 2.5 Flash as your primary model for large 1M-context architectural planning and automatically fall back to your local Ollama `qwen2.5-coder` model if your internet drops or if you hit a cloud rate limit.',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Hybrid Failover',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORY 2: Path A — LiteLLM Proxy & Cloud Free Tiers (12 FAQs: #12 – #23)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 12,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'Why can’t Claude Code connect directly to Google AI Studio without LiteLLM?',
    answer:
      'The official Claude Code CLI speaks the Anthropic `/v1/messages` JSON protocol (including Anthropic-specific tool-use blocks and `cache_control` headers). Google AI Studio speaks the Gemini `generateContent` protocol. LiteLLM runs locally on `127.0.0.1:4000` and translates between Anthropic `/v1/messages` and Gemini/OpenAI formats in under 3 milliseconds.',
    commandSnippet: 'pip install "litellm[proxy]"\nlitellm --config config.yaml --port 4000',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: LiteLLM Translation',
  },
  {
    id: 13,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'What are the exact rate limits on Google AI Studio’s Free Tier in 2026?',
    answer:
      'Google AI Studio’s unbilled free tier provides: Gemini 2.5 Flash at 15 Requests Per Minute (RPM), 1,000,000 Tokens Per Minute (TPM), and 1,500 Requests Per Day (RPD); plus Gemini 2.5 Pro Experimental at 5 RPM and 50–100 RPD for deep architectural reasoning.',
    chapterSlug: 'chapter-5',
    chapterLabel: 'Chapter 5: Cloud Model Matrix',
  },
  {
    id: 14,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'How do I fix the `Unknown field: output_config` or `cache_control` error in LiteLLM?',
    answer:
      'Newer builds of the Claude Code CLI attach Anthropic-specific fields (`output_config`, `thinking`, or nested `cache_control`) that non-Anthropic providers reject with HTTP 400. Add `drop_params: true` under `litellm_settings:` in your `config.yaml` so LiteLLM automatically strips unsupported parameters before forwarding.',
    commandSnippet: 'litellm_settings:\n  drop_params: true\n  modify_params: true',
    chapterSlug: 'chapter-21',
    chapterLabel: 'Chapter 21: Diagnostic Runbooks',
  },
  {
    id: 15,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'Why does Claude Code still ask me to log in to an Anthropic account when I start it?',
    answer:
      'If Claude Code prompts for an OAuth login, it means `ANTHROPIC_AUTH_TOKEN` or `ANTHROPIC_API_KEY` was not detected in the current shell environment. Export both `ANTHROPIC_BASE_URL="http://127.0.0.1:4000"` and `ANTHROPIC_AUTH_TOKEN="sk-litellm-local"` in your `.bashrc` / `.zshrc` or `~/.claude/settings.json`.',
    commandSnippet: 'export ANTHROPIC_BASE_URL="http://127.0.0.1:4000"\nexport ANTHROPIC_AUTH_TOKEN="sk-litellm-local"',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Auth Bypass',
  },
  {
    id: 16,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'Why does Claude Code make background requests to `claude-3-5-haiku` even when I selected Sonnet?',
    answer:
      'Claude Code uses a lightweight "fast model" (aliased to Haiku) for background tasks like generating commit messages, summarizing file trees, and titling sessions. In your LiteLLM `config.yaml`, always map BOTH `claude-3-7-sonnet-*` and `claude-3-5-haiku-*` model aliases to `gemini/gemini-2.5-flash` so background calls never fail with 404.',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Model Alias Mapping',
  },
  {
    id: 17,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'How do I use OpenRouter’s free models (`:free`) with Claude Code?',
    answer:
      'Create a free account at openrouter.ai (no credit card required), generate an API key, and route LiteLLM to models ending with `:free` such as `openrouter/deepseek/deepseek-chat-v3-0324:free` or `openrouter/qwen/qwen-2.5-coder-32b-instruct:free`.',
    commandSnippet: 'model_name: claude-3-7-sonnet-20250219\nlitellm_params:\n  model: openrouter/qwen/qwen-2.5-coder-32b-instruct:free\n  api_key: os.environ/OPENROUTER_API_KEY',
    chapterSlug: 'chapter-5',
    chapterLabel: 'Chapter 5: OpenRouter Free Tier',
  },
  {
    id: 18,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'What happens when I hit a 15 RPM burst rate limit (HTTP 429) on Google AI Studio?',
    answer:
      'During rapid tool-calling loops, an agent can fire 6–8 requests in 20 seconds. Configure `num_retries: 3` and `retry_after: 5` in your LiteLLM `router_settings` so 429 bursts automatically pause for 5 seconds and resume seamlessly without crashing your Claude Code session.',
    commandSnippet: 'router_settings:\n  num_retries: 3\n  retry_after: 5\n  cooldown_time: 30',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Rate-Limit Resilience',
  },
  {
    id: 19,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'Can I use GitHub Models (`models.inference.ai.azure.com`) as a free backend?',
    answer:
      'Yes. Any standard GitHub account with a Personal Access Token (PAT) can access GitHub Models for free prototyping. It is great for single-turn debugging or code explanations, though its tighter context window (8K–16K input tokens on free tier) makes Google AI Studio (1M tokens) preferable for whole-repo edits.',
    chapterSlug: 'chapter-5',
    chapterLabel: 'Chapter 5: GitHub Models',
  },
  {
    id: 20,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'Can I use Groq’s ultra-fast LPU free tier with Claude Code?',
    answer:
      'Yes! Groq offers a generous free tier for `llama-3.3-70b-versatile` and `qwen-2.5-coder-32b` delivering 300+ tokens/sec. Because Groq enforces a strict Tokens-Per-Minute (TPM) cap on the free tier, run `/compact` frequently in Claude Code to keep prompt payloads lean.',
    chapterSlug: 'chapter-5',
    chapterLabel: 'Chapter 5: Groq LPU Tier',
  },
  {
    id: 21,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'How do I keep LiteLLM running in the background so I don’t need two terminal tabs open?',
    answer:
      'On Linux/macOS, you can launch LiteLLM as a background daemon using `nohup litellm --config ~/.claude/litellm_config.yaml --port 4000 > /tmp/litellm.log 2>&1 &`, or register it as a `systemd` user service / macOS `launchd` agent.',
    commandSnippet: 'nohup litellm --config ~/.claude/config.yaml --port 4000 > /tmp/litellm.log 2>&1 &',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Daemon Management',
  },
  {
    id: 22,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'Does Google AI Studio Free Tier train on my prompts?',
    answer:
      'On the unpaid Google AI Studio tier in supported regions, Google reviewers and automated systems may log prompts for product improvement. Therefore, never send production `.env` secrets or regulated customer PII to an unpaid cloud endpoint—use `.claudeignore` or switch to Path B (Local Ollama) for sensitive proprietary repositories.',
    chapterSlug: 'chapter-19',
    chapterLabel: 'Chapter 19: Privacy & Security',
  },
  {
    id: 23,
    category: 'cloud_proxy',
    categoryLabel: 'Path A: Cloud Proxy',
    question: 'How do I verify my LiteLLM proxy is healthy before launching `claude`?',
    answer:
      'Run `curl -s http://127.0.0.1:4000/health/readiness` in your terminal. If it returns `{"status":"healthy"}`, your proxy is bound and ready to accept Claude Code traffic.',
    commandSnippet: 'curl -s http://127.0.0.1:4000/health/readiness',
    chapterSlug: 'chapter-6',
    chapterLabel: 'Chapter 6: Proxy Verification',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORY 3: Path B — Local Ollama & 64K Open Weights (11 FAQs: #24 – #34)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 24,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Why does a default Ollama model forget my instructions or hallucinate after 1–2 file edits?',
    answer:
      'By default, Ollama loads every model with `num_ctx: 2048` (only 2,048 tokens of context) to save RAM! Claude Code’s system prompt and tool schemas alone consume ~3,500 tokens, causing immediate silent context truncation. You MUST build a custom Modelfile with `PARAMETER num_ctx 32768` or `65536`.',
    commandSnippet: 'printf "FROM qwen2.5-coder:7b\\nPARAMETER num_ctx 65536\\n" > Modelfile\nollama create qwen-64k -f Modelfile',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: The 2,048 Context Trap',
  },
  {
    id: 25,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'How do I fit a 64,000-token context window into an 8GB or 16GB GPU without running out of VRAM?',
    answer:
      'Enable 8-bit KV cache quantization in Ollama by setting `OLLAMA_KV_CACHE_TYPE="q8_0"` and `OLLAMA_FLASH_ATTENTION="1"` before starting `ollama serve`. This cuts KV cache memory usage by nearly 50% with virtually zero loss in coding accuracy.',
    commandSnippet: 'export OLLAMA_FLASH_ATTENTION=1\nexport OLLAMA_KV_CACHE_TYPE=q8_0\nollama serve',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: KV Cache Quantization',
  },
  {
    id: 26,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Which open-weight local model is best for Claude Code tool calling in 2026?',
    answer:
      '`qwen2.5-coder` (7B, 14B, or 32B depending on your RAM/VRAM) is the gold standard for structured JSON tool invocation and file patching. For 8GB RAM laptops, use `qwen2.5-coder:7b`; for 16GB RAM/VRAM, use `qwen2.5-coder:14b`; for 24GB–32GB+, use `qwen2.5-coder:32b`.',
    chapterSlug: 'chapter-5',
    chapterLabel: 'Chapter 5: Local Model Benchmarks',
  },
  {
    id: 27,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Can DeepSeek-R1 (`deepseek-r1:14b` or `8b`) be used inside Claude Code?',
    answer:
      'DeepSeek-R1 is brilliant at architectural reasoning and debugging math/logic errors, but distilled R1 models emit `<think>...</think>` blocks that can occasionally interfere with strict Anthropic tool-use JSON schemas unless LiteLLM `modify_params: true` is active. We recommend `qwen2.5-coder` for direct file editing and `deepseek-r1` for architectural planning.',
    chapterSlug: 'chapter-5',
    chapterLabel: 'Chapter 5: Reasoning vs Tool Models',
  },
  {
    id: 28,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Does Ollama v0.14+ support the Anthropic `/v1/messages` API natively without LiteLLM?',
    answer:
      'Yes! Recent Ollama releases expose a native Anthropic-compatible endpoint directly on `http://127.0.0.1:11434`. You can point `ANTHROPIC_BASE_URL="http://127.0.0.1:11434"` directly at Ollama or route through LiteLLM if you want hybrid cloud failover.',
    commandSnippet: 'export ANTHROPIC_BASE_URL="http://127.0.0.1:11434"\nexport ANTHROPIC_AUTH_TOKEN="ollama"\nclaude --model qwen-64k',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: Native Ollama Endpoint',
  },
  {
    id: 29,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'How does Apple Silicon (M1 / M2 / M3 / M4 Mac) perform with Path B?',
    answer:
      'Apple Silicon Macs use Unified Memory, allowing the GPU to access up to 75% of system RAM directly. A 16GB M2/M3/M4 Mac runs `qwen2.5-coder:14b` at 25–35 tokens/sec with a 32K–64K context window effortlessly.',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: Apple Silicon Tuning',
  },
  {
    id: 30,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'How do I check if Ollama is running on my GPU or slow CPU RAM?',
    answer:
      'Run `ollama ps` in a second terminal while generating a response. Look at the `PROCESSOR` column: it should say `100% GPU`. If it says `50% CPU / 50% GPU`, reduce `num_ctx` from `65536` to `32768` or switch to `q8_0` KV cache so all layers stay in fast VRAM.',
    commandSnippet: 'ollama ps',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: GPU Offload Check',
  },
  {
    id: 31,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Why does my first prompt to a local Ollama model take 20 seconds before streaming starts?',
    answer:
      'Ollama unloads models from memory after 5 minutes of inactivity by default, so the first request must cold-load 5GB–18GB of weights from SSD into VRAM. Set `OLLAMA_KEEP_ALIVE="24h"` so your coding model stays hot in memory all workday.',
    commandSnippet: 'export OLLAMA_KEEP_ALIVE="24h"',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: Eliminating Cold Starts',
  },
  {
    id: 32,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Can I use LM Studio instead of Ollama for Path B?',
    answer:
      'Absolutely. LM Studio provides a visual GUI to download GGUF models from HuggingFace, configure Context Length (`32768` or `65536`), toggle Flash Attention, and start a local server on `http://127.0.0.1:1234/v1` which LiteLLM or Aider can connect to directly.',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: LM Studio Alternative',
  },
  {
    id: 33,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'What quantization level (Q4_K_M vs Q5_K_M vs Q8_0) should I download for coding?',
    answer:
      '`Q4_K_M` offers the best speed-to-VRAM ratio for 14B and 32B models. However, for smaller 7B models (`qwen2.5-coder:7b`), upgrading to `Q5_K_M` or `Q6_K` noticeably improves syntax precision on complex regular expressions and TypeScript generics.',
    chapterSlug: 'chapter-7',
    chapterLabel: 'Chapter 7: Quantization Guide',
  },
  {
    id: 34,
    category: 'local_ollama',
    categoryLabel: 'Path B: Local Ollama',
    question: 'Can I disconnect my Wi-Fi / Ethernet completely when using Path B?',
    answer:
      'Yes! Once your model weights are pulled via `ollama pull`, Path B operates with 100% air-gapped autonomy. Set `DISABLE_TELEMETRY=1` and `DISABLE_AUTOUPDATER=1` so Claude Code doesn’t even attempt outbound version checks.',
    commandSnippet: 'export DISABLE_TELEMETRY=1\nexport DISABLE_AUTOUPDATER=1',
    chapterSlug: 'chapter-19',
    chapterLabel: 'Chapter 19: Air-Gapped Operation',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORY 4: Path C1 & C2 — Aider CLI & Android Termux Mobile (11 FAQs: #35 – #45)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 35,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'When should I choose Path C1 (Aider CLI) instead of the Claude Code CLI?',
    answer:
      'Choose Path C1 (Aider) when you want a zero-proxy 2-minute setup! Unlike Claude Code (which requires a `/v1/messages` proxy for non-Anthropic models), Aider natively embeds LiteLLM inside its own binary—so you just export `GEMINI_API_KEY` and run `aider --model gemini/gemini-2.5-flash` with zero background daemons.',
    commandSnippet: 'pipx install aider-chat\nexport GEMINI_API_KEY="AIzaSy..."\naider --model gemini/gemini-2.5-flash',
    chapterSlug: 'chapter-8',
    chapterLabel: 'Chapter 8: Aider Direct CLI',
  },
  {
    id: 36,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'Why must I install Termux from F-Droid or GitHub Releases instead of the Google Play Store?',
    answer:
      'The Google Play Store build of Termux is deprecated due to Android targetSDK restrictions and has broken/outdated package mirrors. Always install the official signed APK from F-Droid (`f-droid.org`) or `github.com/termux/termux-app` so `pkg install nodejs-lts python git` works cleanly.',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Android Termux Setup',
  },
  {
    id: 37,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'Why does running native ELF binaries in Android Termux throw `Syntax error: "(" unexpected` or `No such file or directory`?',
    answer:
      'Standard Linux ARM64 binaries are compiled against GNU `glibc` (`/lib/ld-linux-aarch64.so.1`), whereas Android Termux uses Google’s `Bionic libc` (`/system/bin/linker64`). Installing `glibc-repo` and `glibc-runner` in Termux bridges this dynamic linker mismatch so official binaries execute natively on your phone.',
    commandSnippet: 'pkg install pacman patchelf -y\npkg install glibc-repo -y\npkg install glibc-runner -y',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Bionic vs glibc Linker',
  },
  {
    id: 38,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'How do I stop Android from killing my background LiteLLM proxy when I switch apps?',
    answer:
      'Android 12–15 aggressively terminates background processes (Phantom Process Killer) and sleeps the CPU when the screen dims. Always run `termux-wake-lock` at the start of your Termux session and set Termux Battery Usage to "Unrestricted" in Android Settings.',
    commandSnippet: 'termux-wake-lock',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Android WakeLock',
  },
  {
    id: 39,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'What is Android 12+ Phantom Process Killer and how do I disable the 32-process cap?',
    answer:
      'Android 12+ limits background child processes across all apps to 32. In Android 14/15 Developer Options, toggle ON "Disable child process restrictions" so Node.js, Python LiteLLM, Git, and test runners never get killed with `Process completed (signal 9)`.',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Signal 9 Mitigation',
  },
  {
    id: 40,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'How do I get arrow keys, `ESC`, `CTRL`, and `TAB` keys inside Termux on a touchscreen?',
    answer:
      'Termux includes a customizable Extra Keys bar right above the soft keyboard. Edit `~/.termux/termux.properties` to configure a 2-row developer key bar with `ESC`, `TAB`, `CTRL`, `ALT`, `/`, `-`, and all four directional arrows, then run `termux-reload-settings`.',
    commandSnippet: 'termux-reload-settings',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Mobile Ergonomics',
  },
  {
    id: 41,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'Should I clone Git repositories into `/sdcard/Download` or `~/projects` inside Termux?',
    answer:
      'ALWAYS clone repositories inside Termux’s native ext4 home directory (`~/projects`), NEVER inside `/sdcard`! Android’s `/sdcard` uses FUSE emulation which strips POSIX `chmod +x` permissions, breaks symbolic links inside `node_modules/.bin`, and slows `git status` by 20x.',
    commandSnippet: 'mkdir -p ~/projects && cd ~/projects',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Filesystem Performance',
  },
  {
    id: 42,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'Can I run a small local LLM offline on my Android phone inside Termux?',
    answer:
      'Yes! On an Android phone with 8GB–12GB RAM, you can compile `llama.cpp` or `ollama` in Termux and run `qwen2.5-coder:1.5b` or `3b` (`Q4_K_M`) offline at 8–14 tokens/sec. However, for battery life and 1M-context reasoning on mobile, Path C2 with cloud Gemini 2.5 Flash is strongly recommended.',
    chapterSlug: 'chapter-9',
    chapterLabel: 'Chapter 9: Mobile Local vs Cloud',
  },
  {
    id: 43,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'How does Aider’s Architect Mode (`/architect`) work with two different free models?',
    answer:
      'In Aider, you can pair a deep reasoning model (`gemini-2.5-pro-exp` or `deepseek-r1`) as the Architect to design the solution plan, and a fast coding model (`gemini-2.5-flash` or `qwen2.5-coder`) as the Editor to apply the exact file diffs.',
    commandSnippet: 'aider --architect --model gemini/gemini-2.5-pro-exp-03-25 --editor-model gemini/gemini-2.5-flash',
    chapterSlug: 'chapter-8',
    chapterLabel: 'Chapter 8: Dual-Model Architect Mode',
  },
  {
    id: 44,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'How do I undo an unwanted file change made by Aider or Claude Code?',
    answer:
      'In Aider, simply type `/undo` to revert the last automatic Git commit cleanly. In Claude Code, run `git checkout -- <file>` or `git reset --hard HEAD~1` inside your isolated feature branch.',
    commandSnippet: '/undo',
    chapterSlug: 'chapter-8',
    chapterLabel: 'Chapter 8: Safe Rollbacks',
  },
  {
    id: 45,
    category: 'mobile_aider',
    categoryLabel: 'Mobile & Aider CLI',
    question: 'What is the Windows PowerShell ExecutionPolicy error when running `claude` and how do I fix it?',
    answer:
      'Windows blocks npm `.ps1` wrapper scripts by default with `PSSecurityException: running scripts is disabled`. Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once in PowerShell to permanently allow local npm CLI scripts.',
    commandSnippet: 'Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned',
    chapterSlug: 'chapter-8',
    chapterLabel: 'Chapter 8: Windows Setup Guide',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CATEGORY 5: Agentic Workflows, Prompting, Worktrees & Security (10 FAQs: #46 – #55)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 46,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'What is `CLAUDE.md` and why does every project need one?',
    answer:
      '`CLAUDE.md` is a persistent project constitution file placed at your repository root. Claude Code automatically reads it at the start of every session to learn your exact build/test commands, folder architecture, TypeScript conventions, and forbidden anti-patterns—saving thousands of repetitive prompt tokens.',
    commandSnippet: '/init',
    chapterSlug: 'chapter-12',
    chapterLabel: 'Chapter 12: CLAUDE.md Engineering',
  },
  {
    id: 47,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'What does the `/compact` command do and when should I run it?',
    answer:
      'As a coding session grows past 15–20 turns, old file reads and test logs bloat the context window, slowing down responses and burning free-tier TPM quota. Running `/compact` instructs the agent to summarize the conversation history into a concise state checkpoint, cutting token usage by 65%–80% instantly.',
    commandSnippet: '/compact',
    chapterSlug: 'chapter-16',
    chapterLabel: 'Chapter 16: Context Hygiene',
  },
  {
    id: 48,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'What is the CCAV Prompt Engineering Framework taught in Chapter 15?',
    answer:
      'CCAV stands for **Context** (exact file paths & current behavior), **Constraints** (strict boundaries, no extra libraries, type safety), **Action** (the specific atomic implementation step), and **Verification** (the exact test command the agent must run and pass before finishing). Structured CCAV prompts eliminate agent hallucination on free models.',
    chapterSlug: 'chapter-15',
    chapterLabel: 'Chapter 15: CCAV Prompt Framework',
  },
  {
    id: 49,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'How can I run 3 or 4 autonomous coding agents in parallel without them overwriting each other’s files?',
    answer:
      'Never run multiple agents in the same working directory! Instead, use `git worktree add ../wt-feature-a -b feat/a` to spin up isolated sibling directories that share the same underlying Git object database, then launch a separate `claude` instance inside each worktree.',
    commandSnippet: 'git worktree add ../wt-auth -b feat/auth\ncd ../wt-auth && claude',
    chapterSlug: 'chapter-17',
    chapterLabel: 'Chapter 17: Git Worktree Parallelism',
  },
  {
    id: 50,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'What is the Model Context Protocol (MCP) and do MCP servers cost money?',
    answer:
      'MCP is an open standard that lets Claude Code connect to external tools (like PostgreSQL/SQLite databases, Git history, Playwright browsers, or documentation search). Reference MCP servers run locally via `npx` or `uvx` over `stdio` at 100% zero cost (₹0).',
    commandSnippet: 'claude mcp add sequential-thinking -- npx -y @modelcontextprotocol/server-sequential-thinking',
    chapterSlug: 'chapter-10',
    chapterLabel: 'Chapter 10: Zero-Cost MCP Servers',
  },
  {
    id: 51,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'How do I prevent Claude Code from reading `.env` secrets, SSH keys, or large `dist/` folders?',
    answer:
      'Create a `.claudeignore` file in your project root (using standard `.gitignore` syntax) and list `.env*`, `*.pem`, `*.key`, `node_modules/`, `dist/`, and `coverage/`. You can also add explicit `deny` rules in `.claude/settings.json` for `Read(.env*)`.',
    commandSnippet: 'printf ".env*\\n*.pem\\nnode_modules/\\ndist/\\n" > .claudeignore',
    chapterSlug: 'chapter-19',
    chapterLabel: 'Chapter 19: Secret Isolation',
  },
  {
    id: 52,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'Can I pipe compiler errors or Git diffs directly into Claude Code from the command line?',
    answer:
      'Yes! Using headless print mode (`claude -p`), you can pipe any stdout/stderr stream directly into the agent for automated triage or CI review, such as `npm run build 2>&1 | claude -p "Diagnose and fix these TypeScript build errors"`.',
    commandSnippet: 'git diff --staged | claude -p "Review this staged diff for bugs and security issues"',
    chapterSlug: 'chapter-18',
    chapterLabel: 'Chapter 18: Headless Unix Piping',
  },
  {
    id: 53,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'What does `/doctor` check when I run it inside Claude Code?',
    answer:
      '`/doctor` runs a built-in diagnostic suite verifying your Node.js runtime, Git binary availability, network reachability to your configured `ANTHROPIC_BASE_URL`, filesystem permissions, and active MCP server health.',
    commandSnippet: '/doctor',
    chapterSlug: 'chapter-21',
    chapterLabel: 'Chapter 21: Diagnostic Tools',
  },
  {
    id: 54,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'How do I resume a previous Claude Code conversation after closing my terminal?',
    answer:
      'Run `claude --continue` (or `claude -c`) to immediately resume your most recent session in the current directory, or run `claude --resume` to pick from an interactive list of past sessions.',
    commandSnippet: 'claude --continue',
    chapterSlug: 'chapter-2',
    chapterLabel: 'Chapter 2: Session Persistence',
  },
  {
    id: 55,
    category: 'workflows_security',
    categoryLabel: 'Workflows & Security',
    question: 'What should I do if an agent enters an infinite loop trying to fix a failing test?',
    answer:
      'Press `Escape` or `Ctrl+C` once to interrupt the current tool loop without losing your session context. Then run `/compact` and give the agent a narrower CCAV constraint (for example, instructing it to inspect the test fixture first rather than rewriting the implementation).',
    chapterSlug: 'chapter-21',
    chapterLabel: 'Chapter 21: Loop Recovery Runbook',
  },
];

interface FaqPageViewProps {
  onNavigateChapter: (slug: string) => void;
  onNavigateContact: () => void;
}

export const FaqPageView: React.FC<FaqPageViewProps> = ({
  onNavigateChapter,
  onNavigateContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Set<number>>(new Set([1, 2, 12, 24, 35, 46]));
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All FAQs', count: MASTER_FAQS.length, icon: Layers },
    {
      id: 'economics',
      label: 'General & ₹0 Economics',
      count: MASTER_FAQS.filter((f) => f.category === 'economics').length,
      icon: DollarSign,
    },
    {
      id: 'cloud_proxy',
      label: 'Path A: Cloud Proxy',
      count: MASTER_FAQS.filter((f) => f.category === 'cloud_proxy').length,
      icon: Terminal,
    },
    {
      id: 'local_ollama',
      label: 'Path B: Local Ollama',
      count: MASTER_FAQS.filter((f) => f.category === 'local_ollama').length,
      icon: Cpu,
    },
    {
      id: 'mobile_aider',
      label: 'Mobile & Aider CLI',
      count: MASTER_FAQS.filter((f) => f.category === 'mobile_aider').length,
      icon: Smartphone,
    },
    {
      id: 'workflows_security',
      label: 'Workflows & Security',
      count: MASTER_FAQS.filter((f) => f.category === 'workflows_security').length,
      icon: Shield,
    },
  ];

  const filteredFaqs = useMemo(() => {
    return MASTER_FAQS.filter((faq) => {
      const matchesCategory =
        activeCategory === 'all' || faq.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;
      const matchesText =
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q) ||
        (faq.commandSnippet && faq.commandSnippet.toLowerCase().includes(q));
      return matchesCategory && matchesText;
    });
  }, [activeCategory, searchQuery]);

  const toggleFaq = (id: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setOpenIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenIds(new Set());
  };

  const copyCommand = (id: number, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#141715] border border-neutral-800 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Verified Engineering Answers • Zero-Cost Knowledge Base</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Instant answers covering zero-cost token economics, LiteLLM loopback routing, Google AI Studio &amp; OpenRouter free tiers, 64K Ollama local quantization, Android Termux mobile execution, and multi-agent Git worktrees.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateContact}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 shrink-0 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask a Question</span>
          </button>
        </div>

        {/* Search & Expand/Collapse Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs (e.g., 429 rate limit, 64K context, Termux, output_config, /compact)..."
              className="w-full bg-[#0c0f0e] border border-neutral-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-white cursor-pointer"
                aria-label="Clear FAQ search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-medium cursor-pointer transition-colors"
            >
              Expand All ({filteredFaqs.length})
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-medium cursor-pointer transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 border-emerald-500 text-white font-semibold shadow-xs'
                    : 'bg-[#0d100f] border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`ml-0.5 px-1.5 py-0.2 rounded text-[10px] font-mono ${
                    isActive
                      ? 'bg-emerald-800/80 text-emerald-100'
                      : 'bg-neutral-900 text-neutral-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#141715] border border-neutral-800 text-center space-y-3">
          <div className="text-sm font-bold text-white">
            No FAQs matched &ldquo;{searchQuery}&rdquo;
          </div>
          <p className="text-xs text-neutral-400">
            Try clearing your filter or searching for a broader term like <code className="text-emerald-400 font-mono">LiteLLM</code>, <code className="text-emerald-400 font-mono">Ollama</code>, or <code className="text-emerald-400 font-mono">Termux</code>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.has(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#141816] border-emerald-600/60 shadow-md'
                    : 'bg-[#121514] border-neutral-800/90 hover:border-neutral-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="px-2 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                      #{String(faq.id).padStart(2, '0')}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-neutral-400">
                        <span className="text-emerald-400/90">{faq.categoryLabel}</span>
                        {faq.chapterLabel && (
                          <>
                            <span>&bull;</span>
                            <span>{faq.chapterLabel}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 shrink-0 mt-0.5">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-neutral-800/80 space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    <p className="text-neutral-200 leading-relaxed">{faq.answer}</p>

                    {faq.commandSnippet && (
                      <div className="rounded-xl bg-[#080a09] border border-neutral-800 overflow-hidden">
                        <div className="px-3.5 py-1.5 bg-[#101311] border-b border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3 h-3 text-emerald-400" />
                            <span>Verified Terminal Snippet</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => copyCommand(faq.id, faq.commandSnippet!)}
                            className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedId === faq.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                          {faq.commandSnippet}
                        </pre>
                      </div>
                    )}

                    {faq.chapterSlug && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-neutral-400">
                          Deep-dive reference available in the handbook:
                        </span>
                        <button
                          type="button"
                          onClick={() => onNavigateChapter(faq.chapterSlug!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-emerald-400 hover:text-emerald-300 text-xs font-semibold cursor-pointer transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read {faq.chapterLabel} &rarr;</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
