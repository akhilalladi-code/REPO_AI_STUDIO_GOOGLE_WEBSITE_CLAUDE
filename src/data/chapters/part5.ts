/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapters 18, 19, 20, 21, 22, 23, and 24
 */

import { Chapter } from '../../types/handbook';

export const PART_5_CHAPTERS: Chapter[] = [
  // -------------------------------------------------------------
  // Chapter 18: Security, Privacy, and Safe Agent Permissions
  // -------------------------------------------------------------
  {
    id: 'chapter-18',
    slug: 'chapter-18',
    part: 'Part IV: Engineering Discipline',
    number: 18,
    title: 'Chapter 18: Security, Privacy, and Safe Agent Permissions',
    subtitle: 'Threat Modeling, Least-Privilege Settings, Prompt Injection & OS Sandboxing (Bubblewrap / WSB)',
    purpose: 'Establish a comprehensive defense-in-depth security architecture for autonomous coding agents, addressing indirect prompt injection, malicious repository instructions, destructive shell execution, supply-chain typosquatting, third-party model endpoints, and least-privilege sandboxing.',
    sourcePageRange: 'pp. 80–83',
    readingTimeMinutes: 40,
    difficulty: 'Intermediate to Advanced',
    keyTerminology: [
      'Indirect Prompt Injection',
      'Arbitrary Code Execution (ACE)',
      'Slopsquatting / Package Hallucination',
      'Loopback Binding (127.0.0.1)',
      'Least-Privilege Sandboxing',
      'bubblewrap (bwrap)',
      'Windows Sandbox (.wsb)',
    ],
    practicalOutcome: 'Harden your coding agent so that neither a hallucinating 7B model nor a malicious cloned repository can delete files, exfiltrate secrets, or compromise your operating system.',
    sections: [
      {
        id: '18-1-threat-model',
        title: '18.1 Threat Model of an Autonomous Coding Agent',
        content: [
          'Unlike a browser chatbot, a terminal coding agent runs under your operating system user account with the ability to read local files and spawn shell commands. When you pair an agent with free cloud APIs or smaller open-weight models, you must defend against two distinct risk classes: Accidental Model Hallucinations (e.g., a 7B model running `rm -rf *` in the wrong directory) and Adversarial Attacks (e.g., Indirect Prompt Injection hidden inside a cloned repository).',
        ],
        figures: [
          {
            id: 'fig-18-1',
            number: 'Figure 18.1',
            title: 'Agentic Coding Threat Model & Defense-in-Depth Boundaries',
            pageRef: 81,
            type: 'diagram',
            description: 'Three threat vectors: Indirect Prompt Injection, Unbounded Shell Execution, Credential & Telemetry Leak, mapped to mitigations.',
          },
        ],
        tables: [
          {
            id: 'table-18-1',
            title: 'Table 18.1: Comprehensive Threat Model and Mitigation Matrix for Coding Agents',
            columns: [
              { key: 'vector', header: 'Threat Vector' },
              { key: 'mechanism', header: 'Attack / Failure Mechanism' },
              { key: 'severity', header: 'Severity' },
              { key: 'mitigation', header: 'Mandatory Defense-in-Depth Mitigation' },
            ],
            rows: [
              {
                vector: '1. Indirect Prompt Injection',
                mechanism: 'Malicious instructions inside README.md or comments tell LLM to steal ~/.ssh keys.',
                severity: 'Critical',
                mitigation: 'Never run agent in untrusted repo before manual review; enforce permissionMode: "default".',
              },
              {
                vector: '2. Unbounded Shell Execution',
                mechanism: 'Running with --dangerously-skip-permissions lets model execute rm -rf or modify system files.',
                severity: 'Critical',
                mitigation: 'Strictly forbid --dangerously-skip-permissions. Only use default or acceptEdits modes.',
              },
              {
                vector: '3. Supply-Chain Slopsquatting',
                mechanism: 'Model invents hallucinated package name (e.g. react-inr-helper); attackers host malware on npm.',
                severity: 'High',
                mitigation: 'Verify every package name on npmjs.com/pypi.org before approving install commands.',
              },
              {
                vector: '4. Exposed Local Proxy Port',
                mechanism: 'Binding LiteLLM/Ollama to 0.0.0.0 lets anyone on local Wi-Fi consume keys or view prompts.',
                severity: 'High',
                mitigation: 'Always bind strictly to loopback (--host 127.0.0.1).',
              },
              {
                vector: '5. Counterfeit Binary Wrappers',
                mechanism: 'Unverified wrappers distribute modified binaries routing traffic to malicious relays.',
                severity: 'Critical',
                mitigation: 'Only install official @anthropic-ai tarballs; verify SHA-256 signatures.',
              },
              {
                vector: '6. Cloud Free-Tier Logging',
                mechanism: 'Unpaid tiers of Google AI Studio and Mistral log prompts for model training.',
                severity: 'Medium-High',
                mitigation: 'Never transmit .env files, NDA code, or PII. Switch to Path B Local Ollama for private files.',
              },
            ],
          },
        ],
      },
      {
        id: '18-2-least-privilege-permissions',
        title: '18.2 Configuring Least-Privilege Tool Permissions in settings.json',
        content: [
          'Claude Code includes a granular permission engine that lets you pre-approve safe, read-only or test-only commands while explicitly blocking dangerous commands and sensitive files (`~/.claude/settings.json`):',
        ],
        codeSnippets: [
          {
            language: 'json',
            filename: '~/.claude/settings.json (Permissions Block)',
            environment: 'JSON',
            code: `{
  "permissions": {
    "defaultMode": "default",
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(git status)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(node tests/*)",
      "Bash(pytest*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(~/.ssh/*)",
      "Read(~/.litellm/*)",
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(git push --force*)"
    ]
  }
}`,
            explanation: 'Blocks the LLM from reading .env secrets or SSH keys, even if a prompt-injection attack attempts to access them.',
          },
        ],
      },
      {
        id: '18-4-os-sandboxing',
        title: '18.4 OS-Level Sandboxing: Linux bubblewrap & Windows Sandbox (.wsb)',
        content: [
          '• **Linux & WSL2 Bubblewrap (`claude-sandbox`)**: Pre-installed unprivileged Linux namespace sandbox. Mounts root filesystem read-only (`--ro-bind / /`), hides home directory beneath a blank temporary RAM disk (`--tmpfs $HOME`), and mounts only `$PWD` with read-write permissions. The agent literally cannot see `~/.ssh` or `~/.aws`!',
          '• **Windows 10/11 Pro Native Isolation with Windows Sandbox (`AgentSandbox.wsb`)**: Disposable, hardware-isolated micro-VM that boots a clean Windows environment in 5 seconds and destroys all state when closed.',
        ],
      },
    ],
    prevSlug: 'chapter-17',
    nextSlug: 'chapter-19',
  },

  // -------------------------------------------------------------
  // Chapter 19: Cost Control and Hidden Expenses
  // -------------------------------------------------------------
  {
    id: 'chapter-19',
    slug: 'chapter-19',
    part: 'Part IV: Engineering Discipline',
    number: 19,
    title: 'Chapter 19: Cost Control and Hidden Expenses (14-Vector Audit)',
    subtitle: 'Forensic Audit of 14 Expense Vectors & 10-Point Zero-Cost Verification Checklist',
    purpose: 'Conduct a forensic cost audit across all 14 potential expense vectors in modern software development—API billing, credit expiration, cloud storage, dev environments, hosting, domains, databases, build minutes, bandwidth, hardware, electricity, and payment cards—and provide a final verification checklist guaranteeing ₹0.00 service charges.',
    sourcePageRange: 'pp. 83–85',
    readingTimeMinutes: 30,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'Unbilled Project Isolation',
      'Hard Quota Failure (HTTP 429)',
      'Pooled Bandwidth Overage',
      'Serverless Cold-Start Billing Trap',
      'Idle GPU Draw',
    ],
    practicalOutcome: 'Verify with 100% mathematical certainty that no component in your coding or deployment pipeline can generate a surprise bill.',
    sections: [
      {
        id: '19-1-fourteen-expense-vectors',
        title: '19.1 Forensic Audit of the 14 Potential Expense Vectors',
        content: [
          'Developers who set out to build software "for free" often get hit by unexpected charges three months later—not from the coding agent itself, but from an attached cloud billing account, an auto-renewing trial, or a bandwidth overage clause on a hosting platform. Table 19.1 audits all 14 expense vectors and specifies the exact safeguard that keeps each vector locked at ₹0.00.',
        ],
        tables: [
          {
            id: 'table-19-1',
            title: 'Table 19.1: Complete 14-Vector Cost Control and Billing Prevention Audit',
            columns: [
              { key: 'vector', header: 'Expense Vector' },
              { key: 'mistake', header: 'How Developers Get Charged by Mistake' },
              { key: 'prevention', header: 'Verified ₹0.00 Prevention Protocol' },
            ],
            rows: [
              {
                vector: '1. LLM API Token Billing',
                mistake: 'Generating GEMINI_API_KEY inside a project that has an active Cloud Billing Account attached.',
                prevention: 'Create key inside a brand-new Google AI Studio project where Billing is strictly Unlinked. Verify Plan column says Free.',
              },
              {
                vector: '2. OpenRouter Model Selection',
                mistake: 'Omitting :free suffix on model name, which attempts to bill prepaid credits.',
                prevention: 'Never load a credit balance on OpenRouter; append :free to every OpenRouter model string in config.yaml.',
              },
              {
                vector: '3. Promotional Credit Expiration',
                mistake: 'Relying on $300 90-day Vertex trial or Anthropic $5 credit leads to sudden cutoff or card billing.',
                prevention: 'Do not rely on expiring credits; build primary workflow on Path A (Unbilled AI Studio Free) or Path B (Local Ollama).',
              },
              {
                vector: '4. Free-Tier Policy Shifts',
                mistake: 'Providers periodically rotate models or adjust quotas.',
                prevention: 'Keep both Path A (LiteLLM router) and Path B (Ollama) configured so you can switch in 10 seconds in config.yaml.',
              },
              {
                vector: '5. Cloud Dev Environments',
                mistake: 'Leaving GitHub Codespaces running in background tab burns 120 free core-hours in 3 days.',
                prevention: 'Run coding agent locally on Windows PC or Termux (₹0 unlimited hours). If using Codespaces, set idle timeout to 5 mins.',
              },
              {
                vector: '6. Git Storage & LFS',
                mistake: 'Committing large .gguf weights or node_modules exceeds GitHub 1 GB Git LFS quota.',
                prevention: 'Never commit .gguf files, node_modules/, or dist/ binaries to Git; keep them in .gitignore.',
              },
              {
                vector: '7. Static Hosting Bandwidth Caps',
                mistake: 'Some hosts charge steep overage fees if site gets viral traffic (e.g. Render $0.15/GB overage).',
                prevention: 'Host static apps on Cloudflare Pages Free Tier (unlimited static bandwidth, no credit card) or GitHub Pages (100 GB/mo soft cap).',
              },
              {
                vector: '8. CI/CD Build Minutes',
                mistake: 'Triggering heavy 10-minute Docker builds on every commit burns Netlify 300 mins rapidly.',
                prevention: 'Build static assets locally in < 1s or use Cloudflare Pages (500 builds/mo) / Vercel Hobby (6,000 build mins/mo).',
              },
              {
                vector: '9. Custom Domain Renewals',
                mistake: 'Buying a "₹99 first-year promo domain" that auto-renews at ₹2,500/year in year two.',
                prevention: 'Use permanently free HTTPS subdomains provided by host (<user>.github.io, <proj>.pages.dev).',
              },
              {
                vector: '10. Cloud Databases',
                mistake: 'Provisioning AWS RDS or paid MongoDB cluster that bills hourly with zero users.',
                prevention: 'Use client-side localStorage/IndexedDB, static JSON files, or Cloudflare D1 Free Tier (5 GB storage, 5M reads/day).',
              },
              {
                vector: '11. Commercial-Use Traps',
                mistake: 'Deploying commercial site on Vercel Hobby violates non-commercial terms and forces $20/mo Pro.',
                prevention: 'For commercial sites, deploy to Cloudflare Pages Free Tier which explicitly permits commercial use on free plan.',
              },
              {
                vector: '12. Hardware Upgrade Pressure',
                mistake: 'Buying expensive GPU solely to run local models when laptop has 4 GB–8 GB RAM.',
                prevention: 'Use Path A (LiteLLM + Free Cloud APIs) on 4 GB–8 GB laptops; only run local Ollama models that natively fit your RAM.',
              },
              {
                vector: '13. Domestic Electricity',
                mistake: 'Leaving 250W desktop GPU loaded with Ollama model 24/7 (OLLAMA_KEEP_ALIVE=-1).',
                prevention: 'Set OLLAMA_KEEP_ALIVE="5m" and run ollama stop <model> when finished coding.',
              },
              {
                vector: '14. Payment-Card Auto-Debits',
                mistake: 'Attaching an international credit card or UPI AutoPay to "verify identity".',
                prevention: 'Never attach a payment method to Google AI Studio, OpenRouter, Groq, GitHub, or Cloudflare Pages.',
              },
            ],
          },
        ],
      },
    ],
    prevSlug: 'chapter-18',
    nextSlug: 'chapter-20',
  },

  // -------------------------------------------------------------
  // Chapter 20: Free Hosting and Deployment
  // -------------------------------------------------------------
  {
    id: 'chapter-20',
    slug: 'chapter-20',
    part: 'Part III: Practical Projects',
    number: 20,
    title: 'Chapter 20: Free Hosting and Deployment (Cloudflare & GitHub Pages)',
    subtitle: 'Hosting Comparison, Git-Triggered Edge Deployments & Zero-Cost Full-Stack SQLite with Cloudflare D1',
    purpose: 'Audit the four leading free web hosting platforms in October 2026 (Cloudflare Pages, GitHub Pages, Vercel Hobby, and Netlify Free) and walk step-by-step through deploying our Chapter 13 RupeeTrack application to a live, globally cached HTTPS URL for ₹0.00 without a credit card.',
    sourcePageRange: 'pp. 85–88',
    readingTimeMinutes: 30,
    difficulty: 'Beginner',
    keyTerminology: [
      'Global Edge CDN',
      'Soft vs. Hard Bandwidth Cap',
      'Non-Commercial Hobby Clause',
      'Git-Triggered CI/CD',
      'Cloudflare D1 Serverless SQLite',
    ],
    practicalOutcome: 'Your zero-cost web application will be live on the public internet with automatic HTTPS and Git-push continuous deployment at ₹0.00 perpetual cost.',
    sections: [
      {
        id: '20-1-hosting-comparison',
        title: '20.1 Comprehensive Comparison of Free Hosting Platforms (October 2026)',
        content: [
          'When your coding agent finishes building and testing a frontend or local-first web application, where should you host it so that you never face a surprise bandwidth bill or account suspension? Table 20.1 presents the verified October 2026 engineering audit of the top four static and Jamstack hosting platforms.',
        ],
        tables: [
          {
            id: 'table-20-1',
            title: 'Table 20.1: Master Comparison Matrix of Free Hosting Platforms (October 2026)',
            columns: [
              { key: 'attribute', header: 'Hosting Attribute' },
              { key: 'cloudflare', header: '1. Cloudflare Pages (Free Tier)' },
              { key: 'github', header: '2. GitHub Pages (Free Tier)' },
              { key: 'vercel', header: '3. Vercel (Hobby Free Plan)' },
              { key: 'netlify', header: '4. Netlify (Free Starter Plan)' },
            ],
            rows: [
              {
                attribute: 'Monthly Bandwidth Limit',
                cloudflare: 'Unlimited for static assets!',
                github: '100 GB / month (Soft cap; 1 GB max repo size)',
                vercel: '100 GB / month',
                netlify: '100 GB / month (Credit-metered compute model)',
              },
              {
                attribute: 'Build Quota & Concurrency',
                cloudflare: '500 builds / month; 1 concurrent build (20-min timeout)',
                github: 'GitHub Actions: 2,000 build mins/mo (unlimited for public repos!)',
                vercel: '6,000 build minutes / month; 1 concurrent build',
                netlify: '300 build minutes / month; 1 concurrent build',
              },
              {
                attribute: 'Commercial Use Permitted on Free Tier?',
                cloudflare: 'YES! Explicitly permits commercial & business sites on Free tier.',
                github: 'Non-commercial / Open-Source / Portfolio focus (Prohibits running paid SaaS storefront).',
                vercel: 'STRICTLY NO. Hobby plan is strictly personal & non-commercial; company sites require $20/mo Pro.',
                netlify: 'Yes (Small commercial/client brochure sites permitted within free limits).',
              },
              {
                attribute: 'Credit Card Required?',
                cloudflare: 'No (For standard static Pages deployment)',
                github: 'No',
                vercel: 'No',
                netlify: 'No (Pauses site if free limits are exceeded)',
              },
              {
                attribute: 'Free Subdomain & Custom Domains',
                cloudflare: '*.pages.dev + up to 100 custom domains with free SSL',
                github: '<user>.github.io/<repo> + 1 custom domain with free SSL',
                vercel: '*.vercel.app + up to 50 custom domains per project',
                netlify: '*.netlify.app + custom domains with free SSL',
              },
            ],
          },
        ],
      },
      {
        id: '20-2-deploy-rupeetrack',
        title: '20.2 End-to-End Deployment Tutorial: Publishing RupeeTrack for ₹0',
        content: [
          '• **Step 1: Push Repository to GitHub**: `git remote add origin https://github.com/YOUR_USERNAME/rupee-track-app.git` -> `git push -u origin main`.',
          '• **Step 2: Enable GitHub Pages**: In repo Settings -> Pages -> Source: Deploy from branch -> Branch: main, folder: / (root) -> Save. Live at `https://YOUR_USERNAME.github.io/rupee-track-app/`.',
          '• **Step 3: Alternative Cloudflare Pages Deployment**: Connect GitHub repo on dash.cloudflare.com. Unlimited static bandwidth with zero credit card required.',
        ],
      },
      {
        id: '20-3-cloudflare-d1-sqlite',
        title: '20.3 Beyond Static Hosting: Zero-Cost Full-Stack Serverless SQLite with Cloudflare Pages + D1',
        content: [
          'Cloudflare Pages Functions + Cloudflare D1 provides 5 GB total SQLite storage free, 5,000,000 rows read/day, and 100,000 rows written/day at ₹0.00 without a credit card. Placing a JavaScript file in `/functions/api/expenses.js` automatically creates a serverless REST endpoint connected to SQLite.',
        ],
      },
    ],
    prevSlug: 'chapter-19',
    nextSlug: 'chapter-21',
  },

  // -------------------------------------------------------------
  // Chapter 21: Troubleshooting Encyclopedia
  // -------------------------------------------------------------
  {
    id: 'chapter-21',
    slug: 'chapter-21',
    part: 'Part IV: Engineering Discipline',
    number: 21,
    title: 'Chapter 21: Troubleshooting Encyclopedia (26 Diagnostic Runbooks)',
    subtitle: 'Systematic Diagnostic Flowchart & Deterministic 6-Part Engineering Runbooks',
    purpose: 'Provide an exhaustive, symptom-indexed diagnostic and remediation reference covering 18 major failure categories across installation, PATH resolution, authentication, API protocol translation, rate limits, context overflow, OOM crashes, Android Termux glibc linking, Git conflicts, and deployment.',
    sourcePageRange: 'pp. 88–96',
    readingTimeMinutes: 45,
    difficulty: 'All Levels',
    keyTerminology: [
      'Double /v1 Path Collision',
      'Unknown Parameter 400',
      'Subagent Alias Resolution',
      'OOM / Phantom Process Killer',
      'ELF Dynamic Linker Header',
    ],
    practicalOutcome: 'Resolve 95%+ of zero-cost agent errors in under three minutes using exact copy-paste diagnostic and remediation commands.',
    sections: [
      {
        id: '21-1-diagnostic-flowchart',
        title: '21.1 Systematic Diagnostic Flowchart for Zero-Cost Agent Failures',
        content: [
          'Every entry in this encyclopedia follows a strict six-part engineering runbook format: (1) Exact Symptom / Error Message, (2) Root Cause Analysis, (3) Diagnostic Command, (4) Safe Corrective Steps, (5) Verification Checkpoint, and (6) When to Switch to an Alternative.',
          'Explore all 26 diagnostic runbooks interactively using the built-in Diagnostic Wizard in the handbook header or troubleshooting tab.',
        ],
        figures: [
          {
            id: 'fig-21-1',
            number: 'Figure 21.1',
            title: 'Systematic Diagnostic Flowchart for Zero-Cost Agent Failures',
            pageRef: 89,
            type: 'flowchart',
            description: 'Flowchart mapping symptoms (CLI fails to start, forced login, 404/400 bad request, 429/OOM) to verified diagnostic resolutions.',
          },
        ],
      },
    ],
    prevSlug: 'chapter-20',
    nextSlug: 'chapter-22',
  },

  // -------------------------------------------------------------
  // Chapter 22: Maintenance, Updates, and Long-Term Reliability
  // -------------------------------------------------------------
  {
    id: 'chapter-22',
    slug: 'chapter-22',
    part: 'Part IV: Engineering Discipline',
    number: 22,
    title: 'Chapter 22: Maintenance, Updates, and Long-Term Reliability',
    subtitle: 'Version Pinning Strategy, Model Disk Storage Hygiene & Cross-Agent Migration',
    purpose: 'Establish a sustainable operational routine for keeping your zero-cost AI coding setup working reliably over months and years—covering safe binary updates, version pinning, configuration backups, model storage hygiene, and cross-agent migration.',
    sourcePageRange: 'pp. 96–97',
    readingTimeMinutes: 30,
    difficulty: 'Intermediate',
    keyTerminology: [
      'Version Pinning',
      'Breaking Schema Change',
      'Dotfile Bootstrap Backup',
      'Model Pruning (ollama rm)',
      'Harness Agnosticism',
    ],
    practicalOutcome: 'Keep your zero-cost development environment resilient against software updates, model deprecations, and OS reinstalls.',
    sections: [
      {
        id: '22-1-update-cadence',
        title: '22.1 Safe Update Procedures and Version Pinning Strategy',
        content: [
          'In a zero-cost architecture where multiple independent tools cooperate (@anthropic-ai/claude-code + litellm + ollama), updating one component blindly can introduce protocol mismatches. Table 22.1 specifies the recommended update cadence and version pinning commands.',
        ],
        tables: [
          {
            id: 'table-22-1',
            title: 'Table 22.1: Component Update and Version Pinning Reference Matrix',
            columns: [
              { key: 'component', header: 'Component' },
              { key: 'cadence', header: 'Recommended Update Cadence' },
              { key: 'updateCmd', header: 'Exact Update Command' },
              { key: 'pinCmd', header: 'Version Pinning & Rollback Command' },
            ],
            rows: [
              {
                component: 'Official Claude Code CLI (Windows / Linux / macOS)',
                cadence: 'Monthly (Check release notes first)',
                updateCmd: 'claude update or npm i -g @anthropic-ai/claude-code@latest',
                pinCmd: 'npm i -g @anthropic-ai/claude-code@2.1.242',
              },
              {
                component: 'Official Claude Code CLI (Android Termux)',
                cadence: 'Never auto-update! (DISABLE_AUTOUPDATER=1)',
                updateCmd: 'claude-code-termux-update (Runs patchelf after fetch)',
                pinCmd: 'Re-install specific verified tarball via gtbuchanan/claude-code-termux',
              },
              {
                component: 'LiteLLM Proxy',
                cadence: 'Monthly (Always update alongside Claude Code)',
                updateCmd: 'pip install --upgrade "litellm[proxy]"',
                pinCmd: 'pip install "litellm[proxy]==1.80.10"',
              },
              {
                component: 'Ollama Local Server & Models',
                cadence: 'Quarterly (or when new Qwen/Devstral releases drop)',
                updateCmd: 'winget upgrade Ollama.Ollama && ollama pull qwen2.5-coder:7b',
                pinCmd: 'Rebuild qwen-claude-64k Modelfile after pulling updated weights.',
              },
              {
                component: 'Aider (aider-chat)',
                cadence: 'Monthly',
                updateCmd: 'aider --upgrade',
                pinCmd: 'pip install aider-chat==<version>',
              },
            ],
          },
        ],
      },
      {
        id: '22-2-storage-and-backup',
        title: '22.2 Managing Disk Storage & Portable Configuration Backup Script',
        content: [
          '• **Pruning Unused Models**: Run `ollama list` and `ollama rm <old_model>` to reclaim 50–100 GB of SSD space.',
          '• **Backup Script (`backup_zero_cost_configs.sh`)**: Back up `~/.claude/settings.json`, `~/.litellm/config.yaml`, and `~/.aider.conf.yml` to a private `dotfiles-ai-zero-cost` repo, while keeping `.env` strictly local.',
          '• **30-Second Cross-Agent Migration**: Add `read: ["CLAUDE.md"]` to `~/.aider.conf.yml` or launch `opencode`. Both agents automatically read `CLAUDE.md` and continue work seamlessly.',
        ],
      },
    ],
    prevSlug: 'chapter-21',
    nextSlug: 'chapter-23',
  },

  // -------------------------------------------------------------
  // Chapter 23: Practical Learning Roadmap (7-Day & 30-Day Mastery Plans)
  // -------------------------------------------------------------
  {
    id: 'chapter-23',
    slug: 'chapter-23',
    part: 'Part V: Appendices & Reference',
    number: 23,
    title: 'Chapter 23: Practical Learning Roadmap (7-Day & 30-Day Plans)',
    subtitle: '7-Day Fast-Track, 30-Day Mastery Curriculum & Final Capstone Project (ZeroCostInvoice)',
    purpose: 'Provide a structured, zero-cost curriculum comprising a 7-Day Beginner Quick-Start Plan, a 30-Day Full-Stack Agentic Engineering Plan, weekly hands-on exercises, self-assessment checkpoints, and a final Capstone Project.',
    sourcePageRange: 'pp. 97–102',
    readingTimeMinutes: 45,
    difficulty: 'Progressive',
    keyTerminology: [
      'Deliberate Practice',
      'Incremental Complexity',
      'Verification Gate',
      'Capstone Architecture',
      'ZeroCostInvoice',
    ],
    practicalOutcome: 'Build genuine, durable software engineering competence using zero-cost AI coding agents without ever relying on paid subscriptions.',
    sections: [
      {
        id: '23-1-seven-day-sprint',
        title: '23.1 The 7-Day Beginner Quick-Start Plan (1 Hour / Day)',
        content: [
          'If you are brand new to terminal coding agents, follow this focused 7-day sprint to go from zero to a live deployed web application in one week at ₹0 cost:',
        ],
        tables: [
          {
            id: 'table-23-1',
            title: 'Table 23.1: 7-Day Beginner Fast-Track Curriculum',
            columns: [
              { key: 'day', header: 'Day' },
              { key: 'focus', header: 'Focus Area & Book Reference' },
              { key: 'action', header: 'Concrete Hands-On Action (45–60 mins)' },
              { key: 'milestone', header: 'Deterministic Verification Milestone' },
            ],
            rows: [
              {
                day: 'Day 1',
                focus: 'Terminal & Git Foundations (Ch 8 & 16)',
                action: 'Install Windows Terminal, Git for Windows, Python 3.12, Node.js LTS via winget. Configure global .gitignore_global.',
                milestone: 'git --version, python --version, and node --version return valid versions.',
              },
              {
                day: 'Day 2',
                focus: 'Provisioning Your ₹0 Agent Stack (Ch 10 — Path A, B, or C)',
                action: 'Create unbilled Google AI Studio key or install Ollama. Configure LiteLLM (:4000) and ~/.claude/settings.json.',
                milestone: 'Pre-flight curl /v1/messages returns HTTP 200 OK; claude /status shows gateway.',
              },
              {
                day: 'Day 3',
                focus: 'First Agentic Loop & CLAUDE.md (Ch 1 & 13)',
                action: 'Create ~/workspace/rupee-track-app, run git init, write CLAUDE.md, prompt agent to build src/logic.js & tests/test_logic.js.',
                milestone: 'node tests/test_logic.js prints PASS with 0 exit code; commit via git commit.',
              },
              {
                day: 'Day 4',
                focus: 'Responsive UI & Local Server (Ch 13)',
                action: 'Prompt agent to build index.html, styles.css, src/app.js. Start python -m http.server 8090 and test in browser.',
                milestone: 'Adding expenses of ₹199.50 and ₹450.25 displays ₹649.75 and persists across reloads.',
              },
              {
                day: 'Day 5',
                focus: 'CCAV Prompting & Refactoring (Ch 15)',
                action: 'Use Plan-First prompting to add CSV export and category alerts to RupeeTrack without breaking JSON export.',
                milestone: 'git diff shows clean changes; new CSV unit test passes in node tests/test_logic.js.',
              },
              {
                day: 'Day 6',
                focus: 'Security & QA Audit (Ch 17 & 18)',
                action: 'Configure least-privilege allow/deny rules in settings.json. Run 10-Point QA Checklist on RupeeTrack.',
                milestone: 'DevTools Console shows 0 Errors; attempting to read .env in Claude Code is blocked.',
              },
              {
                day: 'Day 7',
                focus: 'Free Global HTTPS Deployment (Ch 20)',
                action: 'Push rupee-track-app to GitHub and deploy to GitHub Pages or Cloudflare Pages.',
                milestone: 'curl -I https://<username>.github.io/rupee-track-app/ returns HTTP/2 200.',
              },
            ],
          },
        ],
        figures: [
          {
            id: 'fig-23-1',
            number: 'Figure 23.1',
            title: 'Progressive 7-Day Sprint & 30-Day Agentic Mastery Roadmap',
            pageRef: 98,
            type: 'flowchart',
            description: 'Week 1: Zero-Cost Foundation -> Week 2: Local Models & OSS -> Week 3: Worktrees, TDD & Mobile -> Week 4: Security & GST Capstone.',
          },
        ],
      },
      {
        id: '23-4-capstone-project',
        title: '23.4 Final Capstone Project Specification: ZeroCostInvoice (Offline GST Invoice & Ledger Studio)',
        content: [
          'To graduate from this handbook, build and deploy ZeroCostInvoice—a complete, local-first Indian GST Invoice Generator and Client Ledger web application:',
          '1. **Itemized Client Invoices**: Supporting Intra-State (CGST 9% + SGST 9%) and Inter-State (IGST 18%) tax calculations using integer-paise arithmetic (`src/gst_engine.js`).',
          '2. **15-Character GSTIN Validation**: Validates Indian GSTIN format with regex and computes automatic tax breakdowns.',
          '3. **Print-Ready A4 CSS**: Formatted for browser native print engine (`Ctrl+P` -> Save as PDF) with zero paid server dependencies.',
          '4. **Persistence & Test Suite**: Stored in `localStorage` with JSON export/import and automated Node.js test suite (`tests/test_gst.js`).',
          '5. **Deploy Live**: Published to GitHub Pages or Cloudflare Pages for ₹0.00.',
        ],
      },
    ],
    prevSlug: 'chapter-22',
    nextSlug: 'chapter-24',
  },

  // -------------------------------------------------------------
  // Chapter 24: Final Recommendations and Decision Framework
  // -------------------------------------------------------------
  {
    id: 'chapter-24',
    slug: 'chapter-24',
    part: 'Part V: Appendices & Reference',
    number: 24,
    title: 'Chapter 24: Final Recommendations and Decision Framework',
    subtitle: 'Direct Answers to 7 Core Questions & Master Hardware Decision Matrix',
    purpose: 'Synthesize all empirical findings from this 24-chapter technical investigation into definitive, evidence-backed answers to the seven core architectural questions facing zero-cost developers in October 2026.',
    sourcePageRange: 'pp. 102–104',
    readingTimeMinutes: 20,
    difficulty: 'All Levels',
    keyTerminology: [
      'Client-Backend Decoupling',
      'Hybrid Cloud-Local Resilience',
      'Zero-Cost Sustainability',
    ],
    practicalOutcome: 'Have a clear, permanent decision framework for operating AI coding agents at ₹0.00 software and API cost indefinitely.',
    sections: [
      {
        id: '24-1-seven-core-answers',
        title: '24.1 Direct Answers to the Seven Core Questions (October 2026 Verdict)',
        content: [
          '**1. Can the Actual Official Claude Code Be Used at ₹0 Under Current Conditions?** Yes—by decoupling the client software from the backend using officially documented gateway variables (`ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN`) pointing to LiteLLM (:4000) or Ollama (:11434). What is NOT free is Anthropic\'s hosted servers (claude-opus-5-5, claude-sonnet-4-5).',
          '**2. What Is the Closest Legitimate Alternative If You Prefer Not to Run a Proxy?** Aider (aider-chat) for terminal diff editing, or OpenCode for full-screen TUI with native LSP, or Cline/Roo Code for VS Code.',
          '**3. What Is Best for Low-Spec Windows Computers (4 GB – 8 GB RAM, No Dedicated GPU)?** Path A (Official Claude Code + LiteLLM + Google AI Studio Free Tier gemini-2.0-flash) on Native Windows PowerShell (avoiding WSL2 hypervisor overhead). 100% cloud inference with 1M context window at ₹0.',
          '**4. What Is Best for Android-Only Users?** Termux from F-Droid with either Aider (pure Python) or official Claude Code ARM64 via `gtbuchanan/claude-code-termux` glibc-runner wrapper paired with LiteLLM.',
          '**5. What Is Most Sustainable for Long-Term Zero-Cost Use?** For 16GB–32GB+ PCs: Path B (Ollama local qwen2.5-coder:14b or qwen3-coder:30b). Works forever offline, zero rate limits. For 4GB–8GB PCs: Path A multi-provider LiteLLM router (Gemini + OpenRouter + Groq).',
          '**6. Which Concrete Limitations Remain Compared with Paid Hosted Claude?** Alternative models may need an extra prompt turn on complex regex diffs; free cloud tiers enforce 15 RPM limits; unpaid cloud tiers log prompts for training (requiring local Ollama for confidential code).',
          '**7. What Should a Complete Beginner Install First Today?** Start with Path A (Claude Code + LiteLLM + Google AI Studio Free Tier) or Path C1 (Aider + Google AI Studio). Both take < 15 minutes to set up without a credit card.',
        ],
      },
      {
        id: '24-2-master-decision-matrix',
        title: '24.2 Master Decision Matrix by User Profile and Hardware',
        content: [
          'Table 24.1 synthesizes the optimal configuration recommendation for each user profile and hardware configuration.',
        ],
        tables: [
          {
            id: 'table-24-1',
            title: 'Table 24.1: Final Master Decision Framework Across All User Profiles and Hardware Tiers',
            columns: [
              { key: 'profile', header: 'User Profile & Hardware Spec' },
              { key: 'primary', header: 'Primary Recommended Setup' },
              { key: 'backup', header: 'Backup / Secondary Setup' },
              { key: 'cost', header: 'Expected Monthly Cost' },
            ],
            rows: [
              {
                profile: 'Complete Beginner (Any Laptop, 4–8 GB RAM)',
                primary: 'Path C1: Aider + Google AI Studio Free Tier (gemini-2.0-flash)',
                backup: 'Path A: Official Claude Code + LiteLLM (:4000) + Gemini Free Tier',
                cost: '₹0.00 / $0.00 (No Card)',
              },
              {
                profile: 'Intermediate Developer (Low-Spec Windows Laptop, 4–8 GB RAM)',
                primary: 'Path A: Official Claude Code + LiteLLM Multi-Provider (Gemini + OpenRouter :free + Groq)',
                backup: 'Path C1: Cline / Roo Code inside VS Code + Gemini Free API',
                cost: '₹0.00 / $0.00 (No Card)',
              },
              {
                profile: 'Mid-Range PC / Mac (16 GB – 24 GB RAM / 8–12 GB VRAM)',
                primary: 'Hybrid Path A + B: Path A for 1M-context exploration; Path B (Ollama qwen2.5-coder:14b / devstral) for offline/private code',
                backup: 'OpenCode or Aider connected to local Ollama (:11434)',
                cost: '₹0.00 / $0.00 (100% Offline Capable)',
              },
              {
                profile: 'Workstation / Power User (32 GB – 64 GB+ RAM / 24 GB+ VRAM)',
                primary: 'Path B: Official Claude Code + Direct Local Ollama (:11434) or LM Studio (:1234) running qwen3-coder:30b (64K Context)',
                backup: 'OpenHands or Aider Architect Mode (DeepSeek R1 + Qwen3-Coder)',
                cost: '₹0.00 / $0.00 (100% Air-Gapped Capable)',
              },
              {
                profile: 'Android Smartphone Only (ARM64, 4 GB – 12 GB RAM)',
                primary: 'Path C2: Termux (F-Droid) + gtbuchanan/claude-code-termux (grun) + LiteLLM + Gemini Free Tier',
                backup: 'Aider natively in Termux Python + Gemini/Groq Free API',
                cost: '₹0.00 / $0.00 (No Card)',
              },
              {
                profile: 'Android Phone + Home Windows PC',
                primary: 'Remote SSH Workflow (Ch 9.4): Termux OpenSSH + Tailscale VPN controlling Home PC running Path A/B',
                backup: 'Direct on-device Termux Aider when offline from home PC',
                cost: '₹0.00 / $0.00 (No Card)',
              },
            ],
          },
        ],
      },
    ],
    prevSlug: 'chapter-23',
    nextSlug: 'appendix-a',
  },
];
