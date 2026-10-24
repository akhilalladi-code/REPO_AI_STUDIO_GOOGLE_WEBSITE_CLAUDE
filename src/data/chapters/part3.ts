/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapters 8, 9, 10, 11, and 12
 */

import { Chapter } from '../../types/handbook';

export const PART_3_CHAPTERS: Chapter[] = [
  // -------------------------------------------------------------
  // Chapter 8: Windows Installation and Development Environment
  // -------------------------------------------------------------
  {
    id: 'chapter-8',
    slug: 'chapter-8',
    part: 'Part II: Setups & Platforms',
    number: 8,
    title: 'Chapter 8: Windows Installation and Development Environment',
    subtitle: 'Native PowerShell vs. WSL2, Winget Toolchains & Automated Windows Doctor Script',
    purpose: 'Provide a complete, beginner-friendly engineering guide to configuring Windows 10 and Windows 11 for zero-cost AI coding agents, covering PowerShell, Windows Terminal, Git for Windows (bash.exe), Python, Node.js, and safe PATH management.',
    sourcePageRange: 'pp. 39–42',
    readingTimeMinutes: 30,
    difficulty: 'Beginner',
    keyTerminology: [
      'Winget (Windows Package Manager)',
      'ExecutionPolicy (RemoteSigned)',
      'POSIX Layer (Git Bash)',
      'User vs. System PATH',
      '.wslconfig Memory Cap',
    ],
    practicalOutcome: 'Have a clean, reproducible Windows development environment ready to run Claude Code, LiteLLM, Ollama, and Aider without permission or PATH errors.',
    sections: [
      {
        id: '8-1-native-vs-wsl2',
        title: '8.1 Architectural Decision: Native Windows vs. WSL2 on Low-Spec vs. High-Spec PCs',
        content: [
          'On Windows 10/11, Anthropic officially supports running Claude Code either natively in Windows PowerShell/CMD (backed by Git Bash) or inside Windows Subsystem for Linux (WSL2). Before installing anything, consult Table 8.1 to choose the right environment for your hardware.',
        ],
        tables: [
          {
            id: 'table-8-1',
            title: 'Table 8.1: Architectural Trade-Offs Between Native Windows and WSL2',
            columns: [
              { key: 'dimension', header: 'Evaluation Dimension' },
              { key: 'native', header: 'Option 1: Native Windows (PowerShell + Git Bash)' },
              { key: 'wsl2', header: 'Option 2: WSL2 (Ubuntu 22.04 / 24.04 on Hyper-V)' },
            ],
            rows: [
              {
                dimension: 'Idle Memory Overhead',
                native: '0 MB extra (Runs directly on Windows NT kernel)',
                wsl2: '1.5 GB to 4.0 GB RAM reserved by vmmemWSL hypervisor',
              },
              {
                dimension: 'Recommended Hardware Tier',
                native: 'Best for 4 GB to 8 GB RAM laptops (Preserves RAM for browser/editor)',
                wsl2: 'Best for 16 GB to 32 GB+ RAM desktops/laptops',
              },
              {
                dimension: 'POSIX Shell Compatibility',
                native: 'Good (Requires Git for Windows bash.exe for Claude Code Bash tool)',
                wsl2: '100% Native Linux (Full apt, grep, sed, chmod, Docker support)',
              },
              {
                dimension: 'File I/O Performance',
                native: 'Fast on C:\\Users\\<User>\\...',
                wsl2: 'Fast inside /home/<user>/...; Slow across /mnt/c/... boundary',
              },
              {
                dimension: 'Local GPU / Ollama Sharing',
                native: 'Direct native access to localhost:11434',
                wsl2: 'Requires WSL2 mirrored networking or binding Ollama to 0.0.0.0',
              },
            ],
          },
        ],
        callouts: [
          {
            type: 'TIP',
            title: 'Memory Cap for WSL2 Users on 8 GB – 16 GB Laptops',
            badge: 'Tested successfully',
            content: 'If you choose WSL2 on an 8 GB or 16 GB Windows laptop, create C:\\Users\\<Username>\\.wslconfig containing:\n[wsl2]\nmemory=4GB\nnetworkingMode=mirrored\nThis prevents the Linux VM from consuming 50% of your RAM and shares localhost:11434 and localhost:4000 seamlessly between Windows and Ubuntu.',
          },
        ],
      },
      {
        id: '8-2-windows-shells',
        title: '8.2 Understanding Windows Shells: PowerShell vs. Command Prompt vs. Git Bash',
        content: [
          '• **Windows Terminal (`wt.exe`)**: Modern multi-tab container built by Microsoft. Always use this as your primary terminal application.',
          '• **PowerShell (`pwsh.exe`)**: Primary administrative shell for winget, setting environment variables (`$env:VAR = "value"`), and running native `install.ps1`.',
          '• **Command Prompt (`cmd.exe`)**: Legacy 1980s MS-DOS shell. Avoid for modern agentic development.',
          '• **Git Bash (`bash.exe`)**: Lightweight POSIX shell installed by Git for Windows. Claude Code uses Git Bash internally whenever the model invokes its `Bash` tool.',
        ],
      },
      {
        id: '8-3-winget-prerequisites',
        title: '8.3 Step-by-Step Windows Prerequisites Installation via winget',
        content: [
          'Install all foundational runtimes cleanly via official Microsoft winget commands:',
        ],
        codeSnippets: [
          {
            language: 'powershell',
            filename: 'PowerShell Installation Suite',
            environment: 'PowerShell',
            code: `# Step 1: Allow local scripts for CurrentUser
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Step 2: Install Git, Python 3.12, and Node.js 22 LTS
winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
winget install --id Python.Python.3.12 -e --source winget --accept-package-agreements --accept-source-agreements
winget install --id OpenJS.NodeJS.LTS -e --source winget --accept-package-agreements --accept-source-agreements

# Step 3: Add ~/.local/bin and Python Scripts to PATH permanently
$LocalBin = "$HOME\\.local\\bin"
$PyScripts = (python -c "import os, sysconfig; print(sysconfig.get_path('scripts'))")
$UserPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
foreach ($Dir in @($LocalBin, $PyScripts)) {
  if ($Dir -and ($UserPath -split ";" -notcontains $Dir)) {
    $UserPath = "$UserPath;$Dir"
  }
}
[System.Environment]::SetEnvironmentVariable("Path", $UserPath.Trim(";"), "User")`,
            explanation: 'Ensures runtimes and global CLI bins (~/.local/bin) are permanently accessible from PowerShell.',
          },
        ],
      },
      {
        id: '8-5-doctor-script',
        title: '8.5 Automated Windows Zero-Cost Environment Doctor Script (doctor-windows.ps1)',
        content: [
          'To eliminate manual verification guesswork on Windows 10 and 11, save and run `doctor-windows.ps1`. It checks your Windows build, RAM, ExecutionPolicy, Git Bash path, Python, Node, LiteLLM, Ollama port status, and `settings.json` JSON validity:',
        ],
        codeSnippets: [
          {
            language: 'powershell',
            filename: 'doctor-windows.ps1',
            environment: 'PowerShell',
            code: `# File: doctor-windows.ps1 — Comprehensive Zero-Cost Windows Readiness Audit
$os = Get-CimInstance Win32_OperatingSystem
$ramGB = [math]::Round($os.TotalVisibleMemorySize / 1MB, 1)
Write-Host "[OS] $($os.Caption) (Build $($os.BuildNumber)) | Usable RAM: $ramGB GB"

$gitBash = "C:\\Program Files\\Git\\bin\\bash.exe"
if (Test-Path $gitBash) { Write-Host "[PASS] Git Bash found" -ForegroundColor Green }
else { Write-Host "[FAIL] Git Bash missing at $gitBash" -ForegroundColor Red }

foreach ($cmd in @("git", "python", "node", "claude", "litellm", "ollama", "aider")) {
  $found = Get-Command $cmd -ErrorAction SilentlyContinue
  if ($found) { Write-Host "[PASS] Found '$cmd' -> $($found.Source)" -ForegroundColor Green }
  else { Write-Host "[INFO] '$cmd' not in PATH." -ForegroundColor Yellow }
}`,
            explanation: 'Self-contained diagnostic script verifying Windows readiness in one pass.',
          },
        ],
      },
    ],
    prevSlug: 'chapter-7',
    nextSlug: 'chapter-9',
  },

  // -------------------------------------------------------------
  // Chapter 9: Android and Mobile Workflows
  // -------------------------------------------------------------
  {
    id: 'chapter-9',
    slug: 'chapter-9',
    part: 'Part II: Setups & Platforms',
    number: 9,
    title: 'Chapter 9: Android and Mobile Workflows',
    subtitle: 'Termux glibc-runner ELF Wrapper, Phantom Process Killer & Remote SSH via Tailscale',
    purpose: 'Provide a realistic, technically accurate guide for developers operating on Android smartphones and tablets—distinguishing between running official Claude Code or Aider directly on Android via Termux versus remote control via SSH and Tailscale.',
    sourcePageRange: 'pp. 43–46',
    readingTimeMinutes: 45,
    difficulty: 'Intermediate to Advanced',
    keyTerminology: [
      'Bionic libc vs. GNU glibc',
      'ELF Interpreter (ld-linux-aarch64.so.1)',
      'glibc-runner (grun)',
      'LD_PRELOAD Shebang Shim',
      'Phantom Process Killer',
      'Tailscale WireGuard Mesh',
    ],
    practicalOutcome: 'Execute genuine agentic coding workflows directly on an Android phone at ₹0 cost or securely control a home PC agent from anywhere over mobile data.',
    sections: [
      {
        id: '9-1-mobile-architectures',
        title: '9.1 Architectural Reality Check: Direct On-Device Execution vs. Remote Control',
        content: [
          '• **Architecture M1 — Direct On-Device Agent + Free Cloud API** (Best for Android-Only Users): Run the agent harness (Claude Code via glibc-runner or Aider in Python) inside Termux on your phone, with model inference offloaded to Google AI Studio Free Tier. Uses only ~150 MB of mobile RAM.',
          '• **Architecture M2 — Remote SSH / Tailscale Control of a Home PC** (Best if You Own a PC): Windows/Linux PC at home runs Claude Code + Ollama or LiteLLM. Phone runs Termux OpenSSH + tmux over a free Tailscale private WireGuard network. Consumes < 2 MB mobile data per hour with zero phone battery drain.',
          '• **Architecture M3 — Cloud Dev Containers** (GitHub Codespaces Free 120 core-hours/month).',
        ],
        figures: [
          {
            id: 'fig-9-1',
            number: 'Figure 9.1',
            title: 'Android Termux Bionic-to-Glibc ELF Execution & Remote SSH Workflows',
            pageRef: 43,
            type: 'diagram',
            description: 'Workflow 1: Native Termux on Android with glibc-runner + LiteLLM. Workflow 2: Remote SSH over Tailscale to home PC.',
          },
        ],
      },
      {
        id: '9-2-v2-1-114-elf-transition',
        title: '9.2 Why Stock Claude Code Fails on Android Termux (The April 2026 v2.1.114 ELF Transition)',
        content: [
          'Starting in version 2.1.114 (April 17, 2026), Anthropic transitioned `@anthropic-ai/claude-code` from a cross-platform JavaScript bundle (`cli.js`) to precompiled native Linux ARM64 ELF binaries dynamically linked against GNU glibc (`/lib/ld-linux-aarch64.so.1`).',
          'Because Android uses Google\'s Bionic libc (`/system/bin/linker64`), executing the stock binary produces `claude: cannot execute: required file not found`.',
          'The verified solution uses community tools (`gtbuchanan/claude-code-termux` or `bd-loser/claude-code-termux`) which install `glibc-runner` (`grun`), patch the ELF header using `patchelf-glibc`, and set `LD_PRELOAD=$PREFIX/lib/libtermux-exec-ld-preload.so` so spawned subshells resolve cleanly to Termux paths.',
        ],
      },
      {
        id: '9-3-phantom-process-killer',
        title: "9.3 Defeating Android's Phantom Process Killer and Background Sleep",
        content: [
          'Android 12+ includes a background daemon that kills background processes if total children exceed 32. Prevent crashes via two steps:',
          '1. **Termux Wake Lock**: Run `termux-wake-lock` and grant Unrestricted Battery Usage in Android Settings.',
          '2. **Disable Phantom Process Restrictions**: On Android 14/15/16, enable "Disable child process restrictions" under Developer Options. On Android 12/13, run ADB: `adb shell "/system/bin/device_config put activity_manager max_phantom_processes 2147483647"`.',
        ],
      },
      {
        id: '9-4-remote-ssh-tailscale',
        title: '9.4 Remote Workflow: Controlling a Windows-Hosted Agent from Android',
        content: [
          '1. Install Tailscale on Windows (`winget install Tailscale.Tailscale`) and Android (from Play Store / F-Droid). Both connect to private 100.x.y.z WireGuard mesh.',
          '2. Enable OpenSSH Server on Windows: `Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0` and `Start-Service sshd`.',
          '3. Connect from Termux: `pkg install openssh tmux` -> `ssh-keygen -t ed25519` -> `ssh Username@100.x.y.z`.',
        ],
      },
    ],
    prevSlug: 'chapter-8',
    nextSlug: 'chapter-10',
  },

  // -------------------------------------------------------------
  // Chapter 10: Three Complete Installation Paths
  // -------------------------------------------------------------
  {
    id: 'chapter-10',
    slug: 'chapter-10',
    part: 'Part II: Setups & Platforms',
    number: 10,
    title: 'Chapter 10: Three Complete Installation Paths (Paths A, B, and C)',
    subtitle: 'End-to-End Walkthroughs, Configuration Templates & Self-Healing Launcher Scripts',
    purpose: 'Provide three complete, independently usable, end-to-end installation and verification tutorials covering Path A (Official Claude Code Baseline + LiteLLM Cloud Proxy), Path B (Official Claude Code + Direct Local Ollama 64K Setup), and Path C (Open-Source Agent Aider & Android Termux Native Setup).',
    sourcePageRange: 'pp. 46–55',
    readingTimeMinutes: 50,
    difficulty: 'Beginner to Intermediate',
    keyTerminology: [
      'Pre-Flight Endpoint Check',
      'Gateway Model Discovery',
      'Alias Mapping',
      'Modelfile Context Lock',
      'Self-Healing Launcher Scripts',
    ],
    practicalOutcome: 'Complete any of the three paths and have a verified, working coding agent executing real file and shell operations at ₹0.00 cost.',
    sections: [
      {
        id: '10-1-path-a-tutorial',
        title: '10.1 Path A — Official Claude Code + LiteLLM Proxy + Google AI Studio Free Tier',
        content: [
          'Path A installs the genuine `@anthropic-ai/claude-code` CLI and pairs it with a local LiteLLM Proxy (`localhost:4000`) connected to Google AI Studio\'s Free Tier (`gemini-2.0-flash` with 1,500 RPD and 1M token context window). Requires zero GPU and runs on any 4 GB RAM PC.',
          '**Step 1: Install Official Claude Code & LiteLLM**:',
        ],
        codeSnippets: [
          {
            language: 'powershell',
            filename: 'Path A Installation (PowerShell)',
            environment: 'PowerShell',
            code: `# 1. Install Claude Code natively
irm https://claude.ai/install.ps1 | iex
claude --version

# 2. Install LiteLLM Proxy
pip install "litellm[proxy]"
litellm --version`,
            explanation: 'Installs official Claude Code binary and LiteLLM proxy.',
          },
          {
            language: 'yaml',
            filename: '~/.litellm/config.yaml',
            environment: 'YAML',
            code: `# File: ~/.litellm/config.yaml
model_list:
  - model_name: gemini-flash-free
    litellm_params:
      model: gemini/gemini-2.0-flash
      api_key: os.environ/GEMINI_API_KEY
      rpm: 15
      drop_params: true
    model_info:
      display_name: "Gemini 2.0 Flash (Free 1500/day)"
      max_input_tokens: 1000000

  - model_name: gemini-pro-free
    litellm_params:
      model: gemini/gemini-1.5-pro
      api_key: os.environ/GEMINI_API_KEY
      rpm: 2
      drop_params: true
    model_info:
      display_name: "Gemini 1.5 Pro (Free Deep Reasoning)"
      max_input_tokens: 2000000

litellm_settings:
  drop_params: true
  request_timeout: 600
  additional_drop_params:
    - output_config

general_settings:
  master_key: sk-local-free-proxy`,
            explanation: 'Routes gemini-flash-free (1500 RPD) and gemini-pro-free, stripping Anthropic proprietary parameters.',
          },
          {
            language: 'json',
            filename: '~/.claude/settings.json (Path A)',
            environment: 'JSON',
            code: `{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:4000",
    "ANTHROPIC_AUTH_TOKEN": "sk-local-free-proxy",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_MODEL": "gemini-flash-free",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "gemini-pro-free",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "gemini-flash-free",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "gemini-flash-free",
    "CLAUDE_CODE_SUBAGENT_MODEL": "gemini-flash-free",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_TELEMETRY": "1",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "8192",
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"
  }
}`,
            explanation: 'Configures Claude Code to route all traffic to LiteLLM loopback port 4000.',
          },
        ],
        callouts: [
          {
            type: 'VERIFICATION',
            title: 'Pre-Flight Endpoint Verification Before Launching Claude Code',
            badge: 'Tested successfully',
            content: 'curl.exe -s -X POST http://localhost:4000/v1/messages `\n  -H "Authorization: Bearer sk-local-free-proxy" `\n  -H "Content-Type: application/json" `\n  -d "{\\"model\\": \\"gemini-flash-free\\", \\"max_tokens\\": 64, \\"messages\\": [{\\"role\\": \\"user\\", \\"content\\": \\"Reply with PATH_A_READY\\"}]}"\nExpected Output: JSON containing "text":"PATH_A_READY".',
          },
        ],
      },
      {
        id: '10-2-path-b-tutorial',
        title: '10.2 Path B — Official Claude Code + Direct Local Model via Ollama (100% Offline)',
        content: [
          'Path B connects `@anthropic-ai/claude-code` directly to Ollama\'s native Anthropic `/v1/messages` endpoint on `http://localhost:11434`. No proxy and no internet connection required after initial model download.',
        ],
        codeSnippets: [
          {
            language: 'powershell',
            filename: 'Path B Setup Commands',
            environment: 'PowerShell',
            code: `# 1. Install Ollama and enable KV cache optimization
winget install --id Ollama.Ollama -e
[System.Environment]::SetEnvironmentVariable("OLLAMA_FLASH_ATTENTION", "1", "User")
[System.Environment]::SetEnvironmentVariable("OLLAMA_KV_CACHE_TYPE", "q8_0", "User")

# 2. Pull model and build 64K Modelfile
ollama pull qwen2.5-coder:7b
Set-Content -Path "$HOME\\Modelfile-claude" -Value "FROM qwen2.5-coder:7b\`nPARAMETER num_ctx 65536\`nPARAMETER temperature 0.2"
ollama create qwen-claude-64k -f "$HOME\\Modelfile-claude"`,
            explanation: 'Builds qwen-claude-64k with 65,536 token context window for Claude Code tool schemas.',
          },
          {
            language: 'json',
            filename: '~/.claude/settings.json (Path B)',
            environment: 'JSON',
            code: `{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:11434",
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_MODEL": "qwen-claude-64k",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "qwen-claude-64k",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "qwen-claude-64k",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen-claude-64k",
    "CLAUDE_CODE_SUBAGENT_MODEL": "qwen-claude-64k",
    "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "65536",
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "8192",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "DISABLE_TELEMETRY": "1",
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"
  }
}`,
            explanation: 'Points Claude Code directly to Ollama loopback port 11434.',
          },
        ],
      },
      {
        id: '10-3-path-c-tutorial',
        title: '10.3 Path C — Open-Source Agent (Aider) & Android Termux Native Setup',
        content: [
          '• **Sub-Path C1: Aider on Windows, Linux, macOS, or Termux**: Install via `pip install aider-install && aider-install`. Set `$env:GEMINI_API_KEY="your_key"` and configure `~/.aider.conf.yml` with `model: gemini/gemini-2.0-flash`, `architect: true`, and `auto-commits: true`.',
          '• **Sub-Path C2: Official Claude Code on Android Termux (glibc-runner)**: Install Termux from F-Droid. Run `pkg install nodejs-lts git ripgrep python rust binutils curl`. Run `curl -fsSL https://raw.githubusercontent.com/gtbuchanan/claude-code-termux/main/install.sh | bash`. Set `DISABLE_AUTOUPDATER=1` in `~/.claude/settings.json`.',
        ],
      },
      {
        id: '10-4-launcher-scripts',
        title: '10.4 Automated Self-Healing Launcher Scripts',
        content: [
          'Opening two terminal windows every day (one for LiteLLM and one for Claude Code) introduces friction. Use the self-healing launcher scripts that check port 4000, start LiteLLM in the background if missing, wait for `HTTP 200 OK`, and launch Claude Code in your current directory:',
          '• Windows: `Start-ZeroCostClaude.ps1` (Page 52)',
          '• Linux / macOS / Termux: `~/.local/bin/claude-free` (Page 53)',
        ],
      },
    ],
    prevSlug: 'chapter-9',
    nextSlug: 'chapter-11',
  },

  // -------------------------------------------------------------
  // Chapter 11: Environment Variables, Configuration, and Secrets
  // -------------------------------------------------------------
  {
    id: 'chapter-11',
    slug: 'chapter-11',
    part: 'Part II: Setups & Platforms',
    number: 11,
    title: 'Chapter 11: Environment Variables, Configuration, and Secrets',
    subtitle: '5-Level Precedence Hierarchy, Complete Variable Reference, and Git Leaks Purge',
    purpose: 'Master the configuration hierarchy, environment variables, .env secret files, .gitignore rules, log redaction, key rotation, and Git history scrubbing required to operate AI coding agents safely.',
    sourcePageRange: 'pp. 55–58',
    readingTimeMinutes: 35,
    difficulty: 'Intermediate',
    keyTerminology: [
      'Configuration Precedence',
      'Process Environment',
      '.claude/settings.local.json',
      'Secret Leakage',
      'Credential Rotation',
      'git filter-repo',
    ],
    practicalOutcome: 'Maintain a clean, deterministic configuration architecture where model endpoints switch effortlessly and API keys can never be accidentally pushed to GitHub.',
    sections: [
      {
        id: '11-1-precedence-hierarchy',
        title: '11.1 The Five-Level Configuration Precedence Hierarchy in Claude Code',
        content: [
          'Claude Code resolves settings across a strict five-level precedence hierarchy (from highest priority to lowest priority):',
          '1. **Level 1 (Highest Priority) — Enterprise Managed Policy (`managed-settings.json`)**: System-wide policies deployed by IT administrators (`C:\\ProgramData\\ClaudeCode\\managed-settings.json` on Windows or `/etc/claude-code/managed-settings.json` on Linux). Absent on personal machines.',
          '2. **Level 2 — Command-Line Flags (`--model`, `--permission-mode`)**: Explicit CLI flags override all JSON settings and shell variables for that session.',
          '3. **Level 3 — Local Project Settings (`.claude/settings.local.json`)**: Located inside project repo, automatically git-ignored.',
          '4. **Level 4 — Shared Project Settings (`.claude/settings.json`)**: Checked into Git to share safe tool permissions and hooks. Never store API keys here!',
          '5. **Level 5 (Baseline Priority) — User-Level Settings (`~/.claude/settings.json`) & Shell Environment**: Stored at `C:\\Users\\<User>\\.claude\\settings.json` or `~/.claude/settings.json`. Values defined inside the `"env": { ... }` block are injected into the process environment.',
        ],
        callouts: [
          {
            type: 'WARNING',
            title: 'The Shell vs. settings.json Override Trap',
            badge: 'Tested successfully',
            content: 'If you previously set ANTHROPIC_API_KEY in your system environment variables, and do not explicitly overwrite "ANTHROPIC_API_KEY": "" inside the "env" block of ~/.claude/settings.json, Claude Code will send the stale key to api.anthropic.com or your local proxy, causing immediate 401 Unauthorized errors. Always include "ANTHROPIC_API_KEY": "" in ~/.claude/settings.json when using ANTHROPIC_AUTH_TOKEN.',
          },
        ],
      },
      {
        id: '11-2-variables-reference',
        title: '11.2 Complete Reference of Gateway, Model, and Privacy Environment Variables',
        content: [
          'Table 11.1 documents every environment variable used in zero-cost Claude Code architectures and its verified values for Path A and Path B.',
        ],
        tables: [
          {
            id: 'table-11-1',
            title: 'Table 11.1: Complete Reference of Zero-Cost Environment Variables in @anthropic-ai/claude-code',
            columns: [
              { key: 'variable', header: 'Environment Variable' },
              { key: 'function', header: 'Exact Technical Function' },
              { key: 'pathA', header: 'Path A Value (LiteLLM + Gemini)' },
              { key: 'pathB', header: 'Path B Value (Direct Local Ollama)' },
            ],
            rows: [
              {
                variable: 'ANTHROPIC_BASE_URL',
                function: 'Root URL for Anthropic /v1/messages API calls (never append /v1)',
                pathA: '"http://localhost:4000"',
                pathB: '"http://localhost:11434"',
              },
              {
                variable: 'ANTHROPIC_AUTH_TOKEN',
                function: 'Sends Authorization: Bearer <token> and bypasses browser /login',
                pathA: '"sk-local-free-proxy"',
                pathB: '"ollama"',
              },
              {
                variable: 'ANTHROPIC_API_KEY',
                function: 'Explicit empty string clears any stale shell API keys',
                pathA: '""',
                pathB: '""',
              },
              {
                variable: 'ANTHROPIC_MODEL',
                function: 'Primary active model for main interactive conversation turns',
                pathA: '"gemini-flash-free"',
                pathB: '"qwen-claude-64k"',
              },
              {
                variable: 'ANTHROPIC_DEFAULT_OPUS_MODEL',
                function: 'Maps internal opus alias (used in /plan or deep tasks) to free model',
                pathA: '"gemini-pro-free"',
                pathB: '"qwen-claude-64k"',
              },
              {
                variable: 'ANTHROPIC_DEFAULT_SONNET_MODEL',
                function: 'Maps internal sonnet alias to free model',
                pathA: '"gemini-flash-free"',
                pathB: '"qwen-claude-64k"',
              },
              {
                variable: 'ANTHROPIC_DEFAULT_HAIKU_MODEL',
                function: 'Maps internal haiku background file-search / title generation alias',
                pathA: '"gemini-flash-free"',
                pathB: '"qwen-claude-64k"',
              },
              {
                variable: 'CLAUDE_CODE_SUBAGENT_MODEL',
                function: 'Overrides the model spawned by the Task / subagent tool',
                pathA: '"gemini-flash-free"',
                pathB: '"qwen-claude-64k"',
              },
              {
                variable: 'CLAUDE_CODE_MAX_CONTEXT_TOKENS',
                function: 'Caps context window before auto-compaction (/compact) triggers',
                pathA: '"200000" (or omit)',
                pathB: '"65536" (Mandatory for 64K Modelfile)',
              },
              {
                variable: 'CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY',
                function: 'Queries GET /v1/models on gateway when running /model (v2.1.129+)',
                pathA: '"1"',
                pathB: '"1"',
              },
              {
                variable: 'CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC',
                function: 'Disables background telemetry, auto-updater checks, and error pings',
                pathA: '"1"',
                pathB: '"1"',
              },
              {
                variable: 'DISABLE_TELEMETRY',
                function: 'Prevents Statsig/Sentry analytics events from leaving client',
                pathA: '"1"',
                pathB: '"1"',
              },
              {
                variable: 'DISABLE_AUTOUPDATER',
                function: 'Prevents background binary replacement (Mandatory on Android Termux)',
                pathA: '"0" (PC) / "1" (Termux)',
                pathB: '"0" (PC) / "1" (Termux)',
              },
            ],
          },
        ],
      },
      {
        id: '11-3-secrets-and-git-purging',
        title: '11.3 Secrets Management, .env Isolation, and Preventing Git Leaks',
        content: [
          '• **Rule 1: Never Hardcode Real Keys in config.yaml or settings.json**: Store keys in `~/.litellm/.env` outside all project Git repositories with `chmod 600` (or NTFS user-only ACL). Reference them via `os.environ/GEMINI_API_KEY`.',
          '• **Rule 2: Global .gitignore Protection**: Set up `~/.gitignore_global` containing `.env`, `.env.*`, `*.pem`, `*.key`, and `.claude/settings.local.json`.',
          '• **Rule 3: Emergency Git Purge**: If a key is accidentally committed: revoke and rotate the key immediately in AI Studio; purge from history using `git filter-repo --path .env --invert-paths`.',
        ],
      },
    ],
    prevSlug: 'chapter-10',
    nextSlug: 'chapter-12',
  },

  // -------------------------------------------------------------
  // Chapter 12: Model Selection and Performance Tuning
  // -------------------------------------------------------------
  {
    id: 'chapter-12',
    slug: 'chapter-12',
    part: 'Part II: Setups & Platforms',
    number: 12,
    title: 'Chapter 12: Model Selection and Performance Tuning',
    subtitle: 'Ten-Factor Matrix, Tiered Task Routing & Repeatable Local Benchmarking',
    purpose: 'Establish an evidence-based methodology for selecting and tuning local and free cloud models across ten operational dimensions—coding accuracy, context length, hardware footprint, latency, tool-use reliability, reasoning depth, licensing, privacy, and rate limits.',
    sourcePageRange: 'pp. 58–61',
    readingTimeMinutes: 40,
    difficulty: 'Intermediate',
    keyTerminology: [
      'Time to First Token (TTFT)',
      'Prompt Prefill Bandwidth',
      'Tool-Schema Adherence',
      'Dual-Model Routing',
      'Deterministic Sampling (temperature: 0.1–0.2)',
    ],
    practicalOutcome: 'Configure dynamic task-based model switching and measure actual token throughput and tool-calling accuracy on your machine.',
    sections: [
      {
        id: '12-1-ten-factor-framework',
        title: '12.1 Ten-Factor Model Selection Framework for Agentic Coding',
        content: [
          'General chatbot leaderboards (which measure creative writing or trivia) are poor predictors of how a model performs inside Claude Code or Aider. An agentic coding model succeeds or fails on **Tool-Schema Adherence** (emitting valid JSON for Edit search-and-replace blocks without corrupting surrounding lines) and **Long-Context Retrieval** (maintaining accuracy when 40,000 tokens of codebase files are loaded into the prompt).',
          'See Table 12.1 and Appendix C for complete evaluations across all ten engineering criteria.',
        ],
        figures: [
          {
            id: 'fig-12-1',
            number: 'Figure 12.1',
            title: 'Visual Model-Selection Matrix — Hardware Capacity vs. Task Complexity',
            pageRef: 60,
            type: 'diagram',
            description: 'Quadrant 1: Cloud Deep Reasoning (Gemini Pro/DeepSeek R1). Quadrant 2: Local Frontier Workstation (Qwen3 30B/Devstral). Quadrant 3: Cloud High-Speed Workhorse (Gemini Flash/Groq). Quadrant 4: Local Entry & Mid-Range (Qwen 7B/14B).',
          },
        ],
      },
      {
        id: '12-2-tiered-task-routing',
        title: '12.2 Task-to-Model Routing Strategy (How to Conserve Quotas and Maximize Speed)',
        content: [
          'Never use a slow, quota-restricted reasoning model (`gemini-1.5-pro` at 2 RPM / 50 RPD) for routine file searches or CSS tweaks, and never ask a small 7B local model (`qwen2.5-coder:7b`) to redesign a 25-file database schema in a single shot. Instead, apply **Tiered Task Routing**:',
          '• **Routine Exploration, File Creation, Unit Tests, and CSS/HTML UI (90% of turns)**: Use `gemini-flash-free` (1,500 RPD) on Path A, or `qwen2.5-coder:7b` / `14b` on Path B.',
          '• **Hard Architectural Planning and Subtle Race-Condition Debugging (10% of turns)**: In Claude Code (Path A), type `/model gemini-pro-free`, ask the model to analyze the bug and formulate a step-by-step fix plan (consuming only 2 or 3 of your 50 daily Pro requests), and then type `/model gemini-flash-free` to execute the edits and run the test loop!',
        ],
      },
      {
        id: '12-3-empirical-benchmarking',
        title: '12.3 Repeatable Local Empirical Benchmarking Procedure',
        content: [
          'Run `tools/benchmark_agent_model.py` against your local Ollama or LiteLLM endpoint. It sends a structured Edit tool definition, measures Time to First Token (TTFT), tokens/second, and validates that the response is a syntactically valid Anthropic `tool_use` block.',
        ],
      },
    ],
    prevSlug: 'chapter-11',
    nextSlug: 'chapter-13',
  },
];
