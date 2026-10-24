/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapters 13, 14, 15, 16, and 17
 */

import { Chapter } from '../../types/handbook';

export const PART_4_CHAPTERS: Chapter[] = [
  // -------------------------------------------------------------
  // Chapter 13: A Practical First Project (RupeeTrack INR Web App)
  // -------------------------------------------------------------
  {
    id: 'chapter-13',
    slug: 'chapter-13',
    part: 'Part III: Practical Projects',
    number: 13,
    title: 'Chapter 13: A Practical First Project (RupeeTrack INR Web App)',
    subtitle: 'Zero-Dependency Integer-Paise Accounting, Responsive UI & CLI Automated Test Suite',
    purpose: 'Walk step-by-step through building, validating, debugging, testing, and version-controlling a complete, responsive Indian Rupee (₹) Personal Expense and Budget Tracker web application from scratch using your zero-cost coding agent.',
    sourcePageRange: 'pp. 61–68',
    readingTimeMinutes: 45,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'CLAUDE.md Specification',
      'Integer-Paise Arithmetic (Math.round(amount * 100))',
      "Intl.NumberFormat('en-IN')",
      'Client-Side localStorage',
      'Zero-Dependency Unit Test',
    ],
    practicalOutcome: 'Have a complete, production-ready, responsive web application tested via automated CLI assertions and ready for free global deployment in Chapter 20.',
    sections: [
      {
        id: '13-1-requirements-architecture',
        title: '13.1 Requirements, Architecture, and Folder Structure',
        content: [
          'Our first end-to-end project, RupeeTrack, is a responsive personal expense and budget analysis web application designed specifically for Indian Rupee (₹) accounting (en-IN lakh/crore grouping) that operates 100% client-side with zero paid cloud databases.',
          'We separate pure business logic (`src/logic.js`) from DOM manipulation (`src/app.js`) so that our coding agent can run headless Node.js unit tests (`node tests/test_logic.js`) in the terminal without needing a heavy browser automation framework.',
        ],
        figures: [
          {
            id: 'fig-13-1',
            number: 'Figure 13.1',
            title: 'Modular Zero-Dependency Web Application Architecture (RupeeTrack)',
            pageRef: 62,
            type: 'diagram',
            description: 'rupee-track-app folder hierarchy separating CLAUDE.md, index.html, styles.css, src/logic.js, src/app.js, and tests/test_logic.js.',
          },
        ],
      },
      {
        id: '13-2-claudemd-authoring',
        title: '13.2 Workspace Initialization and CLAUDE.md Authoring',
        content: [
          'Open your terminal, create the project folder, initialize Git, and write CLAUDE.md:',
        ],
        codeSnippets: [
          {
            language: 'markdown',
            filename: 'rupee-track-app/CLAUDE.md',
            environment: 'Text',
            code: `# Project Specification: RupeeTrack (Zero-Cost INR Expense Manager)

## 1. Architectural Constraints
- Stack: Pure HTML5, CSS3 (CSS Grid/Flexbox, responsive mobile-first), and Vanilla JavaScript (ES6+).
- Zero external paid APIs, zero npm runtime bloat; runs directly in browser and tests in standard Node.js.
- Persistence: Store state in \`window.localStorage\` under key \`rupee_track_v1\` with JSON export/import.
- Monetary Precision Rule: NEVER sum floating-point Rupee values directly (e.g., \`199.50 + 450.25\`). Convert all amounts to integer Paise (\`Math.round(Number(amount) * 100)\`) for storage and summation, then convert back to Rupees for formatting via \`Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })\`.

## 2. Verification & Commands
- Run automated logic tests: \`node tests/test_logic.js\`
- Run local preview server: \`python -m http.server 8090\``,
            explanation: 'The persistent instruction file loaded by Claude Code, Aider, and OpenCode on every turn.',
          },
        ],
      },
      {
        id: '13-3-complete-source-code',
        title: '13.3 Complete Reference Source Code and Architectural Explanation',
        content: [
          'Launch your coding agent and prompt it to generate the four core files. Every line is verified and tested:',
          '• `src/logic.js`: Pure UMD business logic module with `toPaise`, `formatINR`, `validateExpense`, and `summarizeExpenses`.',
          '• `index.html`: Semantic HTML5 responsive dashboard with KPI cards and ledger table.',
          '• `styles.css`: CSS Grid/Flexbox with dark/light themes and `@media print` support.',
          '• `src/app.js`: DOM event controller and localStorage JSON backup exporter.',
          '• `tests/test_logic.js`: Zero-dependency Node.js test suite verifying floating-point precision, category filtering, and boundary validation.',
        ],
      },
    ],
    prevSlug: 'chapter-12',
    nextSlug: 'chapter-14',
  },

  // -------------------------------------------------------------
  // Chapter 14: Building More Advanced Projects
  // -------------------------------------------------------------
  {
    id: 'chapter-14',
    slug: 'chapter-14',
    part: 'Part III: Practical Projects',
    number: 14,
    title: 'Chapter 14: Building More Advanced Projects (3 Complete Apps & Tests)',
    subtitle: 'DevFolio Static Site Generator, FlowBoard Kanban & DevSwissKnife Offline Utilities',
    purpose: 'Demonstrate how to architect, prompt, implement, and test three advanced zero-cost software applications using your coding agent.',
    sourcePageRange: 'pp. 68–72',
    readingTimeMinutes: 55,
    difficulty: 'Intermediate to Advanced',
    keyTerminology: [
      'Zero-Dependency Static Site Generator (SSG)',
      'State Machine',
      'Web Crypto API (SubtleCrypto)',
      'JWT Payload Decoding',
      'Idempotent Build Script',
    ],
    practicalOutcome: 'Have three additional portfolio-worthy, test-verified projects built at ₹0 cost without a single paid third-party API dependency.',
    sections: [
      {
        id: '14-1-devfolio-ssg',
        title: '14.1 Advanced Project 1: Developer Portfolio & Static Markdown Blog Engine (DevFolio-SSG)',
        content: [
          'DevFolio-SSG combines a fast Node.js build script (`src/build.js`) that compiles Markdown blog posts (`posts/*.md`) and a JSON project manifest (`projects.json`) into an ultra-fast, SEO-friendly static website (`dist/index.html` and `dist/posts/*.html`) with dark/light mode, tag filtering, and automated build verification (`tests/test_build.js`). Runs in < 40 ms on any CPU using < 35 MB RAM.',
        ],
      },
      {
        id: '14-2-flowboard-kanban',
        title: '14.2 Advanced Project 2: Local-First Kanban & Pomodoro Productivity Suite (FlowBoard)',
        content: [
          'FlowBoard is a keyboard-accessible engineering task board (Backlog, In Progress, Code Review, Done) integrated with a deterministic 25/5-minute Pomodoro focus timer and Work-In-Progress (WIP) limit enforcement (max 3 tasks in "In Progress") driven by `src/kanban_engine.js`.',
        ],
      },
      {
        id: '14-3-devswissknife',
        title: '14.3 Advanced Project 3: Offline Developer Utility Suite (DevSwissKnife)',
        content: [
          'DevSwissKnife is a 100% client-side, offline utility application that executes JSON formatting/validation, unverified JWT header/payload decoding with expiration inspection, and regex matching locally inside your browser without sending sensitive tokens to third-party ad websites.',
        ],
        tables: [
          {
            id: 'table-14-1',
            title: 'Table 14.1: Summary Comparison of the Four Zero-Cost Engineering Projects',
            columns: [
              { key: 'project', header: 'Project Name' },
              { key: 'chapter', header: 'Chapter' },
              { key: 'cost', header: 'External API / DB Cost' },
              { key: 'runtime', header: 'Build / Test Runtime' },
              { key: 'skills', header: 'Primary Engineering Skills Demonstrated' },
            ],
            rows: [
              {
                project: '1. RupeeTrack (INR Expense Manager)',
                chapter: 'Chapter 13',
                cost: '₹0.00 (localStorage)',
                runtime: '< 50 ms (node tests/test_logic.js)',
                skills: 'Integer-paise precision math, en-IN currency formatting, responsive Grid UI.',
              },
              {
                project: '2. DevFolio-SSG (Static Blog & Portfolio)',
                chapter: 'Chapter 14.1',
                cost: '₹0.00 (Static files)',
                runtime: '< 40 ms (node src/build.js)',
                skills: 'Node.js filesystem automation, Markdown parsing, zero-framework SSG architecture.',
              },
              {
                project: '3. FlowBoard (Kanban + Pomodoro)',
                chapter: 'Chapter 14.2',
                cost: '₹0.00 (localStorage)',
                runtime: '< 45 ms (node tests/test_kanban.js)',
                skills: 'State machines, WIP-limit invariant enforcement, accessible UI state.',
              },
              {
                project: '4. DevSwissKnife (Offline Dev Utilities)',
                chapter: 'Chapter 14.3',
                cost: '₹0.00 (100% Client)',
                runtime: '< 40 ms (node tests/test_utils.js)',
                skills: 'Base64Url JWT decoding, safe regex execution, JSON validation.',
              },
            ],
          },
        ],
      },
    ],
    prevSlug: 'chapter-13',
    nextSlug: 'chapter-15',
  },

  // -------------------------------------------------------------
  // Chapter 15: Prompt Engineering for Coding Agents
  // -------------------------------------------------------------
  {
    id: 'chapter-15',
    slug: 'chapter-15',
    part: 'Part IV: Engineering Discipline',
    number: 15,
    title: 'Chapter 15: Prompt Engineering for Coding Agents (CCAV Framework)',
    subtitle: 'Context-Constraint-Action-Verification, 12 Core Patterns & Custom Slash Commands',
    purpose: 'Teach systematic, high-precision prompt engineering patterns tailored specifically for tool-calling coding agents—minimizing token burn, preventing hallucinated rewrites, and decomposing complex features into verifiable, atomic steps.',
    sourcePageRange: 'pp. 72–75',
    readingTimeMinutes: 40,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'CCAV Prompt Architecture',
      'Read-Only Plan Mode',
      'Minimal Diff Constraint',
      'Self-Verification Directive',
      'Token-Budget Scoping',
    ],
    practicalOutcome: 'Cut wasted agent turns in half and obtain clean, reviewable diffs on the very first attempt—even when using free cloud tiers or local models.',
    sections: [
      {
        id: '15-1-ccav-framework',
        title: '15.1 Why Prompting a Coding Agent Is Different from Prompting a Chatbot',
        content: [
          'When you prompt a web chatbot, a vague prompt like "Make my login page better" simply produces conversational text. When you give that same prompt to a coding agent, it executes unbounded file-search turns (burning through your 15 RPM free quota) or rewrites working CSS files.',
          'Every high-leverage coding agent prompt must follow the four-part **CCAV Framework**:',
          '• **Context**: Name exact file paths and function symbols (`src/logic.js lines 1-50`) so the agent skips exploratory grep turns.',
          '• **Constraint**: State what NOT to touch ("Do not modify public function signatures; do not add external npm packages; keep changes under 40 lines").',
          '• **Action**: Define inputs, outputs, and edge cases deterministically.',
          '• **Verification**: Tell the agent how to prove its code works ("Run node tests/test_logic.js via Bash and fix any failures before finishing").',
        ],
      },
      {
        id: '15-2-custom-slash-commands',
        title: '15.3 Custom Reusable Slash Commands in .claude/commands/',
        content: [
          'One of the highest-leverage features of Claude Code is Custom Markdown Slash Commands stored in `.claude/commands/` (project-scoped) or `~/.claude/commands/` (global). They execute locally before sending prompts to `ANTHROPIC_BASE_URL`, so they work 100% identically at ₹0 cost on Path A and Path B!',
          '• `/project:tdd-fix`: Enforces our strict Reproduction-First TDD Debugging Protocol (writes failing test in `tests/` first, fixes root cause in `src/`, verifies exit code 0).',
          '• `/user:zero-cost-audit`: Global pre-commit security, cost, and quality assurance gate that scans added lines for API keys and verifies test suites.',
        ],
      },
      {
        id: '15-3-context-budgeting',
        title: '15.4 Context-Window Budgeting Rules for Fast Zero-Cost Agentic Execution',
        content: [
          'Table 15.1 details the four rules to keep active conversation context small and response times fast on free cloud and local models.',
        ],
        tables: [
          {
            id: 'table-15-1',
            title: 'Table 15.1: Context-Window Budgeting Rules for Fast Zero-Cost Agentic Execution',
            columns: [
              { key: 'action', header: 'Context Management Action' },
              { key: 'practice', header: 'Exact Command / Practice' },
              { key: 'reason', header: 'Why It Matters for Zero-Cost Setups' },
            ],
            rows: [
              {
                action: '1. Keep CLAUDE.md Under 150 Lines',
                practice: 'Store concise rules & exact test commands in CLAUDE.md; move verbose reference docs to docs/ and read on demand.',
                reason: 'CLAUDE.md is prepended to every single turn. Keeping it under 1,000 tokens saves ~15,000 tokens across a 15-turn task.',
              },
              {
                action: '2. Compact Proactively at 50% Context',
                practice: 'Run /compact Focus on current task and discard earlier UI layout logs',
                reason: 'Prevents local Ollama KV-cache latency spikes and avoids hitting CLAUDE_CODE_MAX_CONTEXT_TOKENS mid-edit.',
              },
              {
                action: '3. Clear Between Unrelated Features',
                practice: 'Run /clear immediately after git commit before starting the next feature.',
                reason: 'Carrying 40,000 tokens of finished feature history into a brand-new task slows down local CPU prefill by 15–30 seconds per turn!',
              },
              {
                action: '4. Scope Grep & Read Prompts',
                practice: 'Name exact files (Read src/logic.js lines 1-90) instead of "Check the whole codebase".',
                reason: 'Cuts tool-calling round trips from 10 turns down to 3 turns, preserving your 15 RPM cloud quota.',
              },
            ],
          },
        ],
      },
    ],
    prevSlug: 'chapter-14',
    nextSlug: 'chapter-16',
  },

  // -------------------------------------------------------------
  // Chapter 16: Git and GitHub Workflows for AI-Assisted Engineering
  // -------------------------------------------------------------
  {
    id: 'chapter-16',
    slug: 'chapter-16',
    part: 'Part IV: Engineering Discipline',
    number: 16,
    title: 'Chapter 16: Git and GitHub Workflows for AI-Assisted Engineering',
    subtitle: 'Atomic Commits, Consequence Audits, git worktree Parallelism & Instant Rollbacks',
    purpose: 'Establish bulletproof version-control habits when working with autonomous coding agents, covering repository initialization, atomic checkpoint commits, feature branches, Git worktrees for parallel agent isolation, diff auditing, and instant rollback from unwanted AI modifications.',
    sourcePageRange: 'pp. 76–77',
    readingTimeMinutes: 35,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'Atomic Checkpoint',
      'Working Tree vs. Staging Index',
      'Git Worktree Isolation',
      'Non-Destructive Revert (git revert)',
      'Hard Reset (git reset --hard)',
      'Reflog Recovery',
    ],
    practicalOutcome: 'Never lose working code to a hallucinated AI edit again, and run multiple coding agents in parallel without file-lock collisions.',
    sections: [
      {
        id: '16-1-why-git-mandatory',
        title: '16.1 Why Git Is Mandatory Before Launching Any Coding Agent',
        content: [
          'When you use a free cloud model or a local 7B/14B model, the coding agent has direct write access to the files in your directory. If you ask an agent to refactor a 300-line module in an untracked directory and the model accidentally deletes a critical helper function, you have no clean way to inspect what changed or restore the working state.',
        ],
        callouts: [
          {
            type: 'IMPORTANT',
            title: 'The Golden Rule of Agentic Version Control',
            badge: 'Tested successfully',
            content: 'Never launch claude, aider, cline, or opencode inside an uncommitted or uninitialized directory. Before submitting any new feature or refactoring prompt to an agent, run git status. Your working tree must say "nothing to commit, working tree clean" so that every single line touched by the AI agent can be isolated with git diff and rolled back in one second with git restore . if needed.',
          },
        ],
      },
      {
        id: '16-2-git-commands-audit',
        title: '16.2 Core Git Commands and Their Exact Consequences',
        content: [
          'Table 16.1 documents the essential Git commands every developer must master when collaborating with an AI coding agent.',
        ],
        tables: [
          {
            id: 'table-16-1',
            title: 'Table 16.1: Essential Git Commands and Consequence Audit for AI Coding Workflows',
            columns: [
              { key: 'command', header: 'Git Command' },
              { key: 'whenToUse', header: 'When to Use It in an Agent Workflow' },
              { key: 'consequence', header: 'Exact Technical Consequence & Risk Profile' },
            ],
            rows: [
              {
                command: 'git init',
                whenToUse: 'First step after mkdir on any new project.',
                consequence: 'Creates .git/ metadata directory; zero risk to existing files.',
              },
              {
                command: 'git status -s',
                whenToUse: 'Before and immediately after every AI prompt turn.',
                consequence: 'Lists modified (M), added (A), deleted (D), and untracked (??) files.',
              },
              {
                command: 'git diff',
                whenToUse: 'Immediately after an agent finishes editing files, before staging.',
                consequence: 'Shows exact line-by-line additions (+) and deletions (-) in unstaged working files.',
              },
              {
                command: 'git diff --staged',
                whenToUse: 'Before running git commit to audit what will be recorded.',
                consequence: 'Shows exact diff of files already added to the staging index (git add).',
              },
              {
                command: 'git switch -c feat/ai-exp',
                whenToUse: 'Before asking an agent to attempt a risky multi-file refactor.',
                consequence: 'Creates and switches to an isolated branch, leaving main 100% untouched.',
              },
              {
                command: 'git add -p',
                whenToUse: 'When an agent makes 3 good changes and 1 unwanted change in a file.',
                consequence: 'Interactively steps through each diff hunk (y to stage, n to skip) for surgical staging.',
              },
              {
                command: 'git restore <file>',
                whenToUse: "When an agent's unstaged edit breaks a file and you want to discard it.",
                consequence: 'Destructive to unstaged edits: Overwrites <file> with the last committed version (HEAD).',
              },
              {
                command: 'git clean -fd',
                whenToUse: 'When an agent creates unwanted untracked scratch files.',
                consequence: 'Destructive to untracked files: Permanently deletes untracked files and folders (run git clean -nd first to preview!).',
              },
              {
                command: 'git revert HEAD',
                whenToUse: 'When a bad AI edit was already committed (and possibly pushed).',
                consequence: 'Safe: Creates a new commit that inverses the changes of HEAD without rewriting history.',
              },
              {
                command: 'git reset --soft HEAD~1',
                whenToUse: 'When you want to undo the last commit but keep the file edits staged.',
                consequence: 'Moves branch pointer back 1 commit; preserves all code changes in your working tree.',
              },
              {
                command: 'git reset --hard HEAD~1',
                whenToUse: 'When the last local commit is completely broken and unpushed.',
                consequence: 'Destructive: Moves branch pointer back 1 commit and permanently discards working tree changes (recoverable only via git reflog for ~30 days).',
              },
            ],
          },
        ],
      },
      {
        id: '16-3-git-worktrees',
        title: '16.3 Advanced Workflow: Isolating Parallel Agents with git worktree',
        content: [
          'Suppose you want to test how two different zero-cost setups solve the same feature—or you want one Claude Code session to build a new UI component while another session writes backend unit tests—without the two agents overwriting each other\'s files in the same folder.',
          'Instead of cloning the repository twice, use `git worktree`, which mounts a second branch into a separate sibling folder linked to the same `.git` database:',
        ],
        codeSnippets: [
          {
            language: 'bash',
            filename: 'Parallel Agent Isolation via git worktree',
            environment: 'Bash',
            code: `# Inside your main repository (e.g., ~/workspace/rupee-track-app on branch 'main'):
# 1. Create an isolated sibling worktree folder on a new branch 'feat/csv-export'
git worktree add ../rupee-track-csv feat/csv-export

# 2. Open Terminal 2 in ../rupee-track-csv and run your coding agent in complete isolation
cd ../rupee-track-csv
claude --model gemini-flash-free

# 3. Once tests pass inside ../rupee-track-csv and changes are committed, merge back to main:
cd ~/workspace/rupee-track-app
git merge feat/csv-export

# 4. Cleanly remove the temporary worktree directory
git worktree remove ../rupee-track-csv`,
            explanation: 'Guarantees zero file-lock collisions between parallel agent sessions.',
          },
        ],
      },
      {
        id: '16-4-recovery-runbook',
        title: '16.4 Recovering from Unwanted AI Modifications (Step-by-Step Runbook)',
        content: [
          '• **Scenario A — Bad Edit Is Uncommitted (Most Common)**: Run `git restore .` followed by `git clean -fd`.',
          '• **Scenario B — Using Aider with Auto-Commits (`auto-commits: true`)**: Type `/undo` at the Aider prompt (or run `git revert HEAD --no-edit`).',
          '• **Scenario C — Accidental `git reset --hard`**: Run `git reflog`, find the 7-character commit hash (`a1b2c3d`) prior to the reset, and run `git branch recover-work a1b2c3d`.',
        ],
      },
    ],
    prevSlug: 'chapter-15',
    nextSlug: 'chapter-17',
  },

  // -------------------------------------------------------------
  // Chapter 17: Testing, Debugging, and Quality Assurance
  // -------------------------------------------------------------
  {
    id: 'chapter-17',
    slug: 'chapter-17',
    part: 'Part IV: Engineering Discipline',
    number: 17,
    title: 'Chapter 17: Testing, Debugging, and Quality Assurance',
    subtitle: 'Stopping Hallucinated Victory, Five-Layer Verification Stack & 10-Point QA Gate',
    purpose: 'Prevent "hallucinated success" by embedding deterministic unit testing, integration testing, browser verification, linting, build validation, and regression checks directly into your coding agent\'s execution loop.',
    sourcePageRange: 'pp. 78–80',
    readingTimeMinutes: 35,
    difficulty: 'Intermediate',
    keyTerminology: [
      'Deterministic Exit Code (0 vs 1)',
      'Assertion Tampering',
      'Regression Suite',
      'Static Linting',
      'Reproduction-First Debugging (Agentic TDD)',
    ],
    practicalOutcome: 'Enforce a verifiable QA gate that catches subtle edge-case bugs, broken imports, and hallucinated APIs automatically.',
    sections: [
      {
        id: '17-1-hallucinated-victory',
        title: '17.1 Why AI Coding Agents Make False Claims of Success (and How to Stop Them)',
        content: [
          'Every developer who works with LLMs eventually encounters **"Hallucinated Victory"**: the model edits a file, announces *"I have resolved the issue and everything works as expected!"*, and exits—yet when you open the application, it crashes immediately on line 12.',
          'Why does this happen?',
          '1. **No Verification Command Was Requested**: If you only ask an agent to "Fix the bug in app.js", the model stops as soon as the Edit tool succeeds unless instructed to run a verification test via Bash.',
          '2. **Assertion Weakening (The "Cheat to Pass" Anti-Pattern)**: When an autonomous agent is told "Make the tests pass" and encounters a hard bug where `calculateTotal()` returns `NaN` instead of `1849.75`, a poorly constrained model will sometimes edit `test_logic.js` to delete the failing assertion!',
        ],
        callouts: [
          {
            type: 'IMPORTANT',
            title: 'Anti-Tampering Rule for CLAUDE.md',
            badge: 'Tested successfully',
            content: 'Always include this explicit rule in your project\'s CLAUDE.md file:\n- QA Integrity Rule: When fixing a failing test, NEVER delete, comment out, or weaken existing assertions in tests/ unless the product specification itself changed. Always fix the implementation in src/ and show the full terminal output of the passing test command.',
          },
        ],
      },
      {
        id: '17-2-five-layer-verification',
        title: '17.2 The Five Layers of Automated Verification in a Zero-Cost Stack',
        content: [
          'Table 17.1 defines the five verification layers you can run locally at ₹0 cost and the exact CLI commands that feed deterministic pass/fail signals back to your coding agent.',
        ],
        tables: [
          {
            id: 'table-17-1',
            title: 'Table 17.1: Five-Layer Verification Stack for Zero-Cost AI Software Engineering',
            columns: [
              { key: 'layer', header: 'QA Layer' },
              { key: 'purpose', header: 'Purpose in Agent Loop' },
              { key: 'nodeCmd', header: 'Zero-Cost CLI Command (JS / Node)' },
              { key: 'pyCmd', header: 'Zero-Cost CLI Command (Python)' },
            ],
            rows: [
              {
                layer: '1. Syntax & Parse Check',
                purpose: 'Instantly catches unclosed brackets, bad imports, or syntax typos before running tests.',
                nodeCmd: 'node --check src/app.js',
                pyCmd: 'python -m py_compile app.py',
              },
              {
                layer: '2. Static Linting & Formatting',
                purpose: 'Enforces unused-variable checks, strict equality (===), and consistent style.',
                nodeCmd: 'npx eslint . (or biome check .)',
                pyCmd: 'ruff check . / flake8',
              },
              {
                layer: '3. Unit Testing (Pure Logic)',
                purpose: 'Tests pure functions (toPaise, validateExpense, regex parsers) in < 100 ms.',
                nodeCmd: 'node tests/test_logic.js (native assert)',
                pyCmd: 'pytest or python -m unittest',
              },
              {
                layer: '4. Integration & Build Validation',
                purpose: 'Verifies modules bundle cleanly, static pages compile, and API routes return 200 OK.',
                nodeCmd: 'node src/build.js && node tests/test_build.js',
                pyCmd: 'pytest tests/integration/',
              },
              {
                layer: '5. Browser & DOM Smoke Testing',
                purpose: 'Confirms UI renders without console errors, forms submit, and mobile layout does not overflow.',
                nodeCmd: 'Local preview (python -m http.server 8090) + DevTools audit',
                pyCmd: 'playwright test (optional headless check)',
              },
            ],
          },
        ],
      },
      {
        id: '17-3-agentic-tdd',
        title: '17.3 Reproduction-First Debugging Protocol (Agentic TDD)',
        content: [
          'Whenever you encounter a bug, enforce this four-step Reproduction-First Debugging Protocol:',
          '• **Step 1 (Write Failing Test First)**: Prompt the agent: *"Users report that entering \' 499.50 \' with spaces and currency symbols fails in validateExpense. First add a test case in tests/test_logic.js reproducing this exact failure, run node tests/test_logic.js, and confirm the new test FAILS."*',
          '• **Step 2 (Inspect Failure Output)**: Seeing the test fail (`AssertionError`) proves the test actually exercises the buggy code path.',
          '• **Step 3 (Minimal Implementation Fix)**: Prompt the agent: *"Now update src/logic.js to strip leading/trailing whitespace and optional ₹ symbols before numeric conversion, without touching tests/test_logic.js. Re-run node tests/test_logic.js."*',
          '• **Step 4 (Regression Check & Diff Audit)**: Confirm all old and new tests pass (exit code 0) and inspect `git diff` to verify no collateral changes were made.',
        ],
      },
      {
        id: '17-4-ten-point-qa-checklist',
        title: '17.4 Repeatable 10-Point Pre-Commit Quality Assurance Checklist',
        content: [
          'Before committing any AI-generated feature to your main branch, verify all ten items below:',
          '1. **Syntax Check Passes**: `node --check` or `py_compile` exits with 0 across all modified files.',
          '2. **All Automated Tests Pass**: Test runner output was observed directly in terminal (not merely claimed by model).',
          '3. **Test Assertions Are Intact**: `git diff tests/` confirms only new assertions were added and no existing tests were weakened.',
          '4. **Edge Cases Covered**: Empty inputs, boundary numbers (0, -1, NaN), and malformed payloads handled gracefully.',
          '5. **Zero Unrequested Dependencies**: `git diff package.json` confirms agent did not hallucinate new packages.',
          '6. **Zero Secret or Debug Leakage**: Diff contains no hardcoded keys, .env values, or leftover `console.log("HERE")` statements.',
          '7. **XSS & Injection Safety**: No user-controlled strings concatenated into raw SQL, exec commands, or DOM innerHTML.',
          '8. **Browser Console Is Clean**: DevTools Console shows 0 Errors.',
          '9. **Responsive Viewport Check**: Testing 375px mobile screen confirms zero horizontal scrollbars or clipped buttons.',
          '10. **Clean Working Tree**: `git status` shows no stray temporary files (`temp.js`, `patch.orig`) left behind.',
        ],
      },
      {
        id: '17-5-github-actions-ci',
        title: '17.5 Automated Zero-Cost CI/CD Pipeline via GitHub Actions (.github/workflows/ci.yml)',
        content: [
          'Every free GitHub account includes unlimited GitHub Actions build minutes for public repositories and 2,000 free minutes for private repositories. The `.github/workflows/zero-cost-ci.yml` pipeline automatically checks syntax, runs unit tests, scans for accidentally committed API keys, and deploys to GitHub Pages on every push to main.',
        ],
      },
    ],
    prevSlug: 'chapter-16',
    nextSlug: 'chapter-18',
  },
];
