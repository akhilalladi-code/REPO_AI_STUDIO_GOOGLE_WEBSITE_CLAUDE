/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapter 21: Troubleshooting Encyclopedia — 26 Deterministic Diagnostic Runbooks
 * Follows exact 6-part runbook format from Pages 88–96 of the Handbook
 */

import { TroubleshootingItem } from '../types/handbook';

export const TROUBLESHOOTING_DATA: TroubleshootingItem[] = [
  {
    issueNumber: '21.1',
    title: "'claude' is not recognized as an internal or external command (Windows) or command not found: claude (Linux/macOS/Termux)",
    category: 'Installation & PATH',
    symptoms: "Installing Claude Code via irm https://claude.ai/install.ps1 | iex or npm install -g @anthropic-ai/claude-code finishes without error, but typing claude fails to find the executable.",
    likelyCauses: [
      "The global binary folder (~/.local/bin or npm config get prefix) is missing from your shell's PATH environment variable.",
      "The terminal window has not been restarted since installation."
    ],
    diagnosticCommand: {
      shell: 'PowerShell / Bash',
      command: 'Test-Path "$HOME\\.local\\bin\\claude.exe"   # Windows\nls -la ~/.local/bin/claude $(npm config get prefix)/bin/claude   # Linux/Termux',
      note: 'Inspects whether the binary exists on disk independent of the PATH variable.'
    },
    correctiveSteps: [
      {
        description: 'Windows: Permanently add ~/.local/bin to User PATH and refresh session',
        code: '$uPath = [Environment]::GetEnvironmentVariable("Path", "User")\nif ($uPath -notlike "*\\.local\\bin*") {\n  [Environment]::SetEnvironmentVariable("Path", "$uPath;$HOME\\.local\\bin", "User")\n}\n$env:Path += ";$HOME\\.local\\bin"',
        language: 'powershell'
      },
      {
        description: 'Linux / macOS / Termux Bash: Export PATH in ~/.bashrc',
        code: 'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.bashrc && source ~/.bashrc',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Run claude --version and confirm a version string (e.g., 2.1.x (Claude Code)) prints.',
    whenToSwitch: 'If corporate group policies block native .exe execution under $HOME\\.local\\bin, install via Node.js (npm install -g @anthropic-ai/claude-code) or use Aider (python -m aider).',
    pageRef: 89,
  },
  {
    issueNumber: '21.2',
    title: 'PowerShell Blocks Script Execution (cannot be loaded because running scripts is disabled on this system)',
    category: 'Installation & PATH',
    symptoms: 'Running irm https://claude.ai/install.ps1 | iex or activating a Python virtual environment (.\\venv\\Scripts\\Activate.ps1) prints PSSecurityException: UnauthorizedAccess.',
    likelyCauses: [
      'Windows PowerShell defaults to Restricted ExecutionPolicy on fresh consumer installations.'
    ],
    diagnosticCommand: {
      shell: 'PowerShell',
      command: 'Get-ExecutionPolicy -List',
      note: 'Shows execution policy scopes across MachinePolicy, UserPolicy, Process, and CurrentUser.'
    },
    correctiveSteps: [
      {
        description: 'Enable RemoteSigned execution for CurrentUser safely',
        code: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force',
        language: 'powershell'
      }
    ],
    verificationCheckpoint: 'Get-ExecutionPolicy -Scope CurrentUser returns RemoteSigned.',
    whenToSwitch: 'Never use Bypass globally; keep scope strictly to CurrentUser.',
    pageRef: 90,
  },
  {
    issueNumber: '21.3',
    title: 'Claude Code on Windows Fails to Execute Bash Commands (Git Bash not found or POSIX Syntax Errors)',
    category: 'Installation & PATH',
    symptoms: 'Claude Code starts, but every time the model tries to run ls, grep, or node tests/test_logic.js, the tool fails or complains that bash is unavailable.',
    likelyCauses: [
      'Git for Windows is either not installed, or installed to a custom directory where Claude Code cannot auto-detect bash.exe.'
    ],
    diagnosticCommand: {
      shell: 'PowerShell',
      command: 'Test-Path "C:\\Program Files\\Git\\bin\\bash.exe"',
      note: 'Checks if Git Bash POSIX binary is at standard installation path.'
    },
    correctiveSteps: [
      {
        description: 'Install Git for Windows via winget and declare CLAUDE_CODE_GIT_BASH_PATH in settings.json',
        code: 'winget install --id Git.Git -e\n# In ~/.claude/settings.json under "env":\n"CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"',
        language: 'json'
      }
    ],
    verificationCheckpoint: 'Launch claude and ask it to run echo $SHELL && uname -s via Bash.',
    pageRef: 90,
  },
  {
    issueNumber: '21.4',
    title: 'Claude Code Still Opens the Browser /login Prompt Despite Setting ANTHROPIC_BASE_URL',
    category: 'Authentication & Gateway',
    symptoms: 'You configured ANTHROPIC_BASE_URL in ~/.claude/settings.json to point to http://localhost:4000 (LiteLLM) or http://localhost:11434 (Ollama), yet running claude still asks you to log in with a paid claude.ai account.',
    likelyCauses: [
      'ANTHROPIC_AUTH_TOKEN is missing or empty in ~/.claude/settings.json.',
      'There is a JSON syntax error (such as a trailing comma) in ~/.claude/settings.json, causing Claude Code to ignore the file.',
      'On first launch with a custom token, Claude Code displays a confirmation prompt ("Do you want to use this API key?") and defaults to No if you press Enter without selecting Yes.'
    ],
    diagnosticCommand: {
      shell: 'Bash / PowerShell',
      command: 'python -m json.tool ~/.claude/settings.json',
      note: 'Validates JSON syntax and reveals invalid formatting or trailing commas.'
    },
    correctiveSteps: [
      {
        description: 'Ensure ANTHROPIC_AUTH_TOKEN is set and ANTHROPIC_API_KEY is an explicit empty string',
        code: '{\n  "env": {\n    "ANTHROPIC_BASE_URL": "http://localhost:4000",\n    "ANTHROPIC_AUTH_TOKEN": "sk-local-free-proxy",\n    "ANTHROPIC_API_KEY": ""\n  }\n}',
        language: 'json'
      }
    ],
    verificationCheckpoint: 'Run claude and type /status; confirm API Base URL displays your localhost address without prompting for browser login.',
    pageRef: 91,
  },
  {
    issueNumber: '21.5',
    title: '404 Not Found on Every Prompt (POST /v1/v1/messages)',
    category: 'Authentication & Gateway',
    symptoms: 'LiteLLM or Ollama logs show incoming requests to POST /v1/v1/messages returning 404 Not Found.',
    likelyCauses: [
      'You included /v1 at the end of ANTHROPIC_BASE_URL (e.g., "http://localhost:4000/v1" or "http://localhost:11434/v1"). Because the Anthropic SDK automatically appends /v1/messages, including /v1 in the base URL doubles the path.'
    ],
    diagnosticCommand: {
      shell: 'PowerShell / Bash',
      command: 'Get-Content ~/.claude/settings.json | Select-String "ANTHROPIC_BASE_URL"',
      note: 'Inspect ANTHROPIC_BASE_URL for trailing /v1 or /.'
    },
    correctiveSteps: [
      {
        description: 'Remove /v1 from ANTHROPIC_BASE_URL so it is strictly http://localhost:4000 or http://localhost:11434',
        code: '"ANTHROPIC_BASE_URL": "http://localhost:4000"',
        language: 'json'
      }
    ],
    verificationCheckpoint: 'Re-run curl -X POST http://localhost:4000/v1/messages ... and confirm HTTP 200 OK.',
    pageRef: 91,
  },
  {
    issueNumber: '21.6',
    title: "400 Bad Request: Unknown parameter 'output_config' or 'thinking'",
    category: 'Authentication & Gateway',
    symptoms: 'Prompts fail immediately when routed through LiteLLM to Google AI Studio, OpenRouter, or Groq with an Unknown parameter or Invalid JSON payload error.',
    likelyCauses: [
      'Claude Code attaches proprietary Anthropic fields (output_config, thinking, cache_control) that non-Anthropic APIs reject unless scrubbed by LiteLLM.'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'tail -n 30 ~/.litellm/proxy.log',
      note: 'Check if LiteLLM threw 400 Bad Request from upstream provider with output_config error.'
    },
    correctiveSteps: [
      {
        description: 'Add drop_params: true and additional_drop_params: ["output_config"] under litellm_settings: in config.yaml',
        code: 'litellm_settings:\n  drop_params: true\n  additional_drop_params:\n    - output_config',
        language: 'yaml'
      }
    ],
    verificationCheckpoint: 'Send a test prompt in Claude Code and verify LiteLLM logs 200 OK.',
    pageRef: 91,
  },
  {
    issueNumber: '21.7',
    title: 'Background Subagent or File-Search Tasks Fail with Model not found: claude-3-5-haiku... or claude-sonnet-4-5',
    category: 'Authentication & Gateway',
    symptoms: 'Basic chat replies work in Claude Code, but as soon as the agent spawns a background task or summarizes a conversation, it errors out with model_not_found for an official Anthropic model name.',
    likelyCauses: [
      'You set ANTHROPIC_MODEL, but forgot to override the internal tier aliases (ANTHROPIC_DEFAULT_HAIKU_MODEL, ANTHROPIC_DEFAULT_SONNET_MODEL, ANTHROPIC_DEFAULT_OPUS_MODEL, CLAUDE_CODE_SUBAGENT_MODEL).'
    ],
    diagnosticCommand: {
      shell: 'PowerShell / Bash',
      command: 'Get-Content ~/.claude/settings.json | Select-String "_MODEL"',
      note: 'Checks if all 5 model override environment variables are present.'
    },
    correctiveSteps: [
      {
        description: 'Set all model aliases to your free gateway model in ~/.claude/settings.json',
        code: '"ANTHROPIC_MODEL": "gemini-flash-free",\n"ANTHROPIC_DEFAULT_OPUS_MODEL": "gemini-pro-free",\n"ANTHROPIC_DEFAULT_SONNET_MODEL": "gemini-flash-free",\n"ANTHROPIC_DEFAULT_HAIKU_MODEL": "gemini-flash-free",\n"CLAUDE_CODE_SUBAGENT_MODEL": "gemini-flash-free"',
        language: 'json'
      }
    ],
    verificationCheckpoint: 'Ask Claude Code: "Use a subagent task to count the lines of code in this directory."',
    pageRef: 92,
  },
  {
    issueNumber: '21.8',
    title: '429 Too Many Requests / Resource Exhausted on Google AI Studio or OpenRouter :free',
    category: 'Rate Limits & OOM',
    symptoms: 'During rapid multi-file search or test loops, the agent pauses or prints a 429 Rate Limit Exceeded warning.',
    likelyCauses: [
      'You exceeded the per-minute request cap (15 RPM on gemini-2.0-flash, 2 RPM on gemini-1.5-pro, or 20 RPM on OpenRouter :free).'
    ],
    diagnosticCommand: {
      shell: 'Python',
      command: 'python tools/check_free_quotas.py',
      note: 'Pings all configured free endpoints and measures latency/status.'
    },
    correctiveSteps: [
      {
        description: 'Keep gemini-flash-free as default workhorse; configure LiteLLM multi-provider fallbacks in config.yaml',
        code: 'fallbacks: [{"gemini-flash-free": ["openrouter-qwen-free", "groq-llama-free"]}]',
        language: 'yaml'
      },
      {
        description: 'Compact context proactively or start a fresh session with /clear',
        code: '/compact Discard past exploratory search logs and focus on current file',
        language: 'text'
      }
    ],
    verificationCheckpoint: 'Verify requests smoothly switch to fallback provider without session abort.',
    pageRef: 92,
  },
  {
    issueNumber: '21.9',
    title: 'Context Overflow, Ignored Tool Schemas, or Mid-Turn Hangs on Local Ollama',
    category: 'Rate Limits & OOM',
    symptoms: "On Path B (Local Ollama), the model either replies with plain text instead of calling Read/Edit tools, or crashes halfway through a multi-file task.",
    likelyCauses: [
      "You ran ollama pull qwen2.5-coder:7b directly without creating a Modelfile setting PARAMETER num_ctx 65536, leaving Ollama at its tiny default context window (2048/4096), which truncates Claude Code's 15,000-token system prompt!",
      'Or you omitted "CLAUDE_CODE_MAX_CONTEXT_TOKENS": "65536" in ~/.claude/settings.json, causing Claude Code to send 150,000 tokens before compacting.'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'ollama show qwen-claude-64k --parameters',
      note: 'Inspects num_ctx parameter on the running model.'
    },
    correctiveSteps: [
      {
        description: 'Rebuild the Modelfile with PARAMETER num_ctx 65536 and set CLAUDE_CODE_MAX_CONTEXT_TOKENS',
        code: 'cat << \'EOF\' > Modelfile-claude-64k\nFROM qwen2.5-coder:7b\nPARAMETER num_ctx 65536\nPARAMETER temperature 0.2\nEOF\nollama create qwen-claude-64k -f Modelfile-claude-64k',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Run claude --model qwen-claude-64k and verify Edit tool executes cleanly.',
    whenToSwitch: 'If your computer has only 8 GB of RAM and struggles with Claude Code on CPU, switch to Path A (LiteLLM + Free Gemini) or Path C1 (Aider + Ollama).',
    pageRef: 92,
  },
  {
    issueNumber: '21.10',
    title: 'Out-Of-Memory (OOM) Crashes or Extremely Slow Token Generation (< 2 tok/s)',
    category: 'Rate Limits & OOM',
    symptoms: 'Your computer freezes, Ollama exits with CUDA error: out of memory or ggml_gallocr_reserve_n: failed to allocate, or each response takes 3 minutes.',
    likelyCauses: [
      'The combined size of your model weights + 64K FP16 KV cache exceeds your GPU VRAM or system RAM, forcing OS swap-file thrashing on your SSD.'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'ollama ps',
      note: 'Check PROCESSOR column: if it says 20% GPU / 80% CPU, model spilled out of VRAM into slow system RAM.'
    },
    correctiveSteps: [
      {
        description: 'Enable KV-cache quantization and Flash Attention to halve context memory by 50–75%',
        code: 'export OLLAMA_FLASH_ATTENTION=1\nexport OLLAMA_KV_CACHE_TYPE=q8_0\nexport OLLAMA_KEEP_ALIVE=5m',
        language: 'bash'
      },
      {
        description: 'Or step down one model size (from 14b to 7b, or reduce num_ctx to 32768)',
        code: 'ollama pull qwen2.5-coder:7b',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Verify ollama ps shows 100% GPU offload and tokens/second stays above 20 tok/s.',
    pageRef: 93,
  },
  {
    issueNumber: '21.11',
    title: 'claude: cannot execute: required file not found on Android Termux',
    category: 'Android & Termux',
    symptoms: 'Running claude in Android Termux immediately fails with cannot execute: required file not found or No such file or directory.',
    likelyCauses: [
      'An unpatched Linux ARM64 ELF binary is looking for the standard GNU dynamic linker /lib/ld-linux-aarch64.so.1, which does not exist on Android Bionic. This happens if you installed @anthropic-ai/claude-code directly via npm without the glibc-runner wrapper, or if Claude Code auto-updater overwrote the binary.'
    ],
    diagnosticCommand: {
      shell: 'Termux',
      command: 'file $(which claude) && ldd $(which claude) 2>&1',
      note: 'Shows dynamic linker and library dependencies of the binary.'
    },
    correctiveSteps: [
      {
        description: 'Set DISABLE_AUTOUPDATER=1 in ~/.claude/settings.json and install via gtbuchanan glibc-runner',
        code: 'curl -fsSL https://raw.githubusercontent.com/gtbuchanan/claude-code-termux/main/install.sh | bash\n# In ~/.claude/settings.json under "env":\n"DISABLE_AUTOUPDATER": "1"',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Run claude --version and confirm version string prints cleanly inside Termux.',
    pageRef: 93,
  },
  {
    issueNumber: '21.12',
    title: '-G: cannot open shared object file or getaddrinfo ENOTIMP on Android Termux',
    category: 'Android & Termux',
    symptoms: 'Inside Termux, Claude Code launches, but file searches (grep/find) fail with -G: cannot open shared object file, or network requests fail with getaddrinfo ENOTIMP.',
    likelyCauses: [
      'When Claude Code spawns embedded ugrep/bfs tools using custom argv[0], a naive grun wrapper misinterprets argv[0] flags.',
      'On custom Android ROMs, glibc DNS resolver looks for /etc/resolv.conf which Android omits.'
    ],
    diagnosticCommand: {
      shell: 'Termux',
      command: 'claude --version && echo $LD_PRELOAD',
      note: 'Checks if libtermux-exec-ld-preload.so is active.'
    },
    correctiveSteps: [
      {
        description: 'Set LD_PRELOAD in ~/.claude/settings.json to use libtermux-exec',
        code: '"LD_PRELOAD": "/data/data/com.termux/files/usr/lib/libtermux-exec-ld-preload.so"',
        language: 'json'
      }
    ],
    verificationCheckpoint: 'Run a search query in Claude Code and verify ugrep/bfs executes without shared object errors.',
    pageRef: 93,
  },
  {
    issueNumber: '21.13',
    title: 'Tool Permission Loop (Permission denied on Edit/Bash)',
    category: 'Permissions & Security',
    symptoms: 'Claude Code repeatedly prompts for permission or gets Permission Denied when modifying files or running test commands.',
    likelyCauses: [
      'Running inside a root-owned folder, or a deny rule in settings.json matches the target path.'
    ],
    diagnosticCommand: {
      shell: 'Bash',
      command: 'ls -ld . && cat ~/.claude/settings.json | grep -A 10 "permissions"',
      note: 'Inspects directory ownership and active deny rules.'
    },
    correctiveSteps: [
      {
        description: 'Work inside user workspace (~/workspace/) and press Shift+Tab in Claude Code to toggle acceptEdits mode',
        code: 'cd ~/workspace/my-project\n# In Claude Code TUI: press Shift+Tab to toggle acceptEdits',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Edits to local files apply without prompting, while Bash commands still ask for confirmation.',
    pageRef: 93,
  },
  {
    issueNumber: '21.14',
    title: 'Git Merge Conflict or index.lock Exists',
    category: 'Git & Deployment',
    symptoms: 'Git commands fail with fatal: Unable to create .git/index.lock: File exists or merge conflict markers remain in code.',
    likelyCauses: [
      'Two terminals or OneDrive sync locked .git/index, or parallel branches edited the same lines.'
    ],
    diagnosticCommand: {
      shell: 'Bash / PowerShell',
      command: 'git status && ls -la .git/index.lock',
      note: 'Checks for stale lock file.'
    },
    correctiveSteps: [
      {
        description: 'Remove stale lock if no Git process is running; resolve conflict markers',
        code: 'rm -f .git/index.lock\ngit status',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'git status returns clean or shows uncommitted files ready for staging.',
    pageRef: 93,
  },
  {
    issueNumber: '21.15',
    title: 'Hallucinated NPM / PyPI Package (404 Not Found on install)',
    category: 'Permissions & Security',
    symptoms: 'Model proposes npm install react-inr-currency-helper or pip install py-paise-calc which fails with 404 Not Found.',
    likelyCauses: [
      'Model invented a non-existent library name (slopsquatting risk).'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'npm view <pkg-name> || pip index versions <pkg-name>',
      note: 'Checks if package exists in official registry before approving install.'
    },
    correctiveSteps: [
      {
        description: 'Reject the install! Instruct the agent in CLAUDE.md to use standard library APIs',
        code: '# Add to CLAUDE.md:\n- Standard Library Rule: NEVER install unverified packages. Use standard Intl, crypto, and fs.',
        language: 'text'
      }
    ],
    verificationCheckpoint: 'Agent implements solution using built-in language capabilities with zero extra dependencies.',
    pageRef: 94,
  },
  {
    issueNumber: '21.16',
    title: 'Local Preview Port Already in Use (EADDRINUSE :8090)',
    category: 'Installation & PATH',
    symptoms: 'python -m http.server 8090 or vite fails with Error: listen EADDRINUSE: address already in use :::8090.',
    likelyCauses: [
      'A previous test server is still running in the background.'
    ],
    diagnosticCommand: {
      shell: 'PowerShell / Linux',
      command: 'netstat -ano | findstr :8090   # Windows\nlsof -i :8090   # Linux',
      note: 'Finds the PID holding the port.'
    },
    correctiveSteps: [
      {
        description: 'Kill the stale PID or launch on port 8091',
        code: 'taskkill /PID <pid> /F   # Windows\nkill -9 <pid>   # Linux\n# Or run on alternate port:\npython -m http.server 8091',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Preview server starts cleanly on the port.',
    pageRef: 94,
  },
  {
    issueNumber: '21.17',
    title: 'GitHub Pages Shows 404 or Unstyled HTML After Deploy',
    category: 'Git & Deployment',
    symptoms: 'Application is deployed to GitHub Pages, but CSS and JS fail to load with 404 errors.',
    likelyCauses: [
      'Absolute asset paths (href="/styles.css") break on GitHub Pages project subpaths (/repo-name/).'
    ],
    diagnosticCommand: {
      shell: 'Browser DevTools',
      command: 'Inspect Browser DevTools Network tab (F12) for 404 on .css / .js requests.',
      note: 'Shows failed absolute URL paths.'
    },
    correctiveSteps: [
      {
        description: 'Use relative paths without leading slash so assets resolve on both root and subpaths',
        code: '<!-- Replace href="/styles.css" with: -->\n<link rel="stylesheet" href="styles.css" />\n<script src="src/app.js"></script>',
        language: 'html'
      }
    ],
    verificationCheckpoint: 'Refresh deployed GitHub Pages site; styles and scripts load with HTTP 200.',
    pageRef: 94,
  },
  {
    issueNumber: '21.18',
    title: 'WSL2 Cannot Reach Windows Host Ollama (Connection refused :11434)',
    category: 'Installation & PATH',
    symptoms: 'Inside WSL2 Ubuntu, curl http://localhost:11434 returns Connection refused while Ollama is running on Windows.',
    likelyCauses: [
      'WSL2 NAT virtual switch isolates localhost from Windows host loopback by default.'
    ],
    diagnosticCommand: {
      shell: 'WSL2 Bash',
      command: 'curl -I http://localhost:11434',
      note: 'Tests connectivity to Windows host port 11434.'
    },
    correctiveSteps: [
      {
        description: 'Add networkingMode=mirrored in C:\\Users\\<User>\\.wslconfig',
        code: '[wsl2]\nnetworkingMode=mirrored\n# Then in PowerShell run: wsl --shutdown',
        language: 'ini'
      }
    ],
    verificationCheckpoint: 'Inside WSL2, curl -I http://localhost:11434 returns HTTP 200 OK.',
    pageRef: 94,
  },
  {
    issueNumber: '21.19',
    title: 'Invalid model name passed in When Selecting a Model with /model in Claude Code',
    category: 'Authentication & Gateway',
    symptoms: 'You type /model inside Claude Code to switch models or pass claude --model gemini-flash-free, and receive an invalid model identifier error.',
    likelyCauses: [
      'Versions of Claude Code prior to v2.1.129 validated /model selections against a static list of Anthropic model names unless gateway discovery was enabled.'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'claude --version',
      note: 'Verifies Claude Code is v2.1.129 or newer.'
    },
    correctiveSteps: [
      {
        description: 'Update Claude Code and enable gateway model discovery in settings.json',
        code: 'claude update\n# In ~/.claude/settings.json:\n"CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1"',
        language: 'json'
      }
    ],
    verificationCheckpoint: 'Type /model in Claude Code; your custom models from LiteLLM appear in the list.',
    pageRef: 94,
  },
  {
    issueNumber: '21.20',
    title: "LiteLLM Crashes on Startup with ModuleNotFoundError: No module named 'backoff' or 'uvicorn'",
    category: 'Installation & PATH',
    symptoms: 'Running litellm --config config.yaml fails immediately with a Python ModuleNotFoundError.',
    likelyCauses: [
      'You installed the base library (pip install litellm) instead of the proxy extra (pip install "litellm[proxy]").'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'pip show litellm uvicorn',
      note: 'Checks if proxy server dependencies are installed.'
    },
    correctiveSteps: [
      {
        description: 'Install litellm with proxy extra dependencies',
        code: 'pip install --upgrade "litellm[proxy]"',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'litellm --version prints version and starts Uvicorn cleanly on port 4000.',
    pageRef: 94,
  },
  {
    issueNumber: '21.21',
    title: 'Google AI Studio Returns 400 Bad Request: API key not valid Despite Copying Key from Console',
    category: 'Authentication & Gateway',
    symptoms: 'LiteLLM or Aider fails with API_KEY_INVALID when calling gemini/gemini-2.0-flash.',
    likelyCauses: [
      'Trailing newline, space, or literal quote marks ("AIzaSy...") were included inside the environment variable.',
      'In PowerShell, you set $env:GEMINI_API_KEY in one window, but started LiteLLM in a second window where the variable was not exported.'
    ],
    diagnosticCommand: {
      shell: 'PowerShell',
      command: 'Write-Host "Key length: $($env:GEMINI_API_KEY.Length)"',
      note: 'Google AI Studio AIzaSy keys are exactly 39 characters.'
    },
    correctiveSteps: [
      {
        description: 'Trim quotes and whitespace from GEMINI_API_KEY',
        code: '$env:GEMINI_API_KEY = $env:GEMINI_API_KEY.Trim(\'"\').Trim()',
        language: 'powershell'
      }
    ],
    verificationCheckpoint: 'curl against generativelanguage.googleapis.com returns 200 OK.',
    pageRef: 95,
  },
  {
    issueNumber: '21.22',
    title: 'Tool Calls Return Raw XML (<tool_call>) in Chat Text Instead of Executing Tools',
    category: 'Authentication & Gateway',
    symptoms: 'When using a local model in Ollama or OpenRouter, the assistant prints raw <tool_call>{"name": "Read"...}</tool_call> text to screen instead of executing tools.',
    likelyCauses: [
      'Selected model checkpoint lacks native tool-calling chat template support in Ollama, or num_ctx overflowed.'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'ollama show <model> --template',
      note: 'Inspects chat template for tool_call tokens.'
    },
    correctiveSteps: [
      {
        description: 'Switch to a model family with verified native tool-calling (qwen2.5-coder:7b/14b or devstral-small-2), or use Aider diff mode',
        code: 'ollama pull qwen2.5-coder:7b\n# Or in Aider:\naider --model ollama_chat/qwen2.5-coder:7b --edit-format diff',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'Claude Code executes Read/Edit tools instead of printing raw text blocks.',
    pageRef: 95,
  },
  {
    issueNumber: '21.23',
    title: 'Windows Defender (MsMpEng.exe) Causes High CPU and Slow git status / Edit Operations',
    category: 'Installation & PATH',
    symptoms: 'On Windows 10/11, running claude or node tests/test_logic.js takes 4–8 seconds while Antimalware Service Executable spikes to 80% CPU.',
    likelyCauses: [
      'Real-time antivirus scanning intercepts every temporary file created by Node, Python, and Git inside your workspace.'
    ],
    diagnosticCommand: {
      shell: 'Task Manager / PowerShell',
      command: 'Get-Process MsMpEng | Select-Object CPU, WorkingSet64',
      note: 'Checks CPU consumption of Windows Defender.'
    },
    correctiveSteps: [
      {
        description: 'Keep all projects in a dedicated workspace folder outside OneDrive and add workspace folder or node.exe to exclusions if policy allows',
        code: 'Add-MpPreference -ExclusionPath "$HOME\\workspace"',
        language: 'powershell'
      }
    ],
    verificationCheckpoint: 'git status and node test execution drop from 6s to < 200ms.',
    pageRef: 95,
  },
  {
    issueNumber: '21.24',
    title: 'OpenRouter :free Endpoint Returns 404 No endpoints found matching your data policy',
    category: 'Authentication & Gateway',
    symptoms: 'Calling an OpenRouter :free model returns HTTP 404 stating no upstream provider matches account data policy.',
    likelyCauses: [
      'Most :free community endpoints on OpenRouter require enabling "Allow providers that may train on inputs" in privacy settings.'
    ],
    diagnosticCommand: {
      shell: 'Browser',
      command: 'Open https://openrouter.ai/settings/privacy in browser and check model training toggle.',
      note: 'Verifies data policy status on OpenRouter account.'
    },
    correctiveSteps: [
      {
        description: 'Enable free model routing for non-sensitive projects; never send proprietary code to :free endpoints',
        code: '# Toggle ON "Allow providers that may train on inputs" at openrouter.ai/settings/privacy',
        language: 'text'
      }
    ],
    verificationCheckpoint: 'curl request to OpenRouter :free endpoint returns valid completion.',
    pageRef: 95,
  },
  {
    issueNumber: '21.25',
    title: 'Error: EACCES: permission denied When Installing Global NPM Packages on Linux / macOS',
    category: 'Installation & PATH',
    symptoms: "Running npm install -g @anthropic-ai/claude-code fails with EACCES: permission denied, mkdir '/usr/local/lib/node_modules/...'.",
    likelyCauses: [
      'Global npm prefix points to a system root directory (/usr/local or /usr). Never run sudo npm install -g!'
    ],
    diagnosticCommand: {
      shell: 'Terminal',
      command: 'npm config get prefix',
      note: 'Shows current global prefix directory.'
    },
    correctiveSteps: [
      {
        description: 'Configure npm to install global binaries into user-owned ~/.local directory',
        code: 'mkdir -p ~/.local\nnpm config set prefix "$HOME/.local"\nexport PATH="$HOME/.local/bin:$PATH"',
        language: 'bash'
      }
    ],
    verificationCheckpoint: 'npm install -g @anthropic-ai/claude-code completes without sudo.',
    pageRef: 95,
  },
  {
    issueNumber: '21.26',
    title: 'Claude Code Terminal UI Garbled or Box-Drawing Characters Broken on Windows',
    category: 'Installation & PATH',
    symptoms: 'Borders, spinners, or diff blocks inside Claude Code appear as question marks (???) or garbled ASCII characters.',
    likelyCauses: [
      'Running inside legacy conhost.exe (old Command Prompt) with non-UTF-8 codepage and a raster font.'
    ],
    diagnosticCommand: {
      shell: 'PowerShell',
      command: '[Console]::OutputEncoding.EncodingName',
      note: 'Shows active terminal character encoding.'
    },
    correctiveSteps: [
      {
        description: 'Launch shell inside Windows Terminal (wt.exe), set font to Cascadia Mono, and enable UTF-8 output',
        code: '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8',
        language: 'powershell'
      }
    ],
    verificationCheckpoint: 'Borders and Unicode spinners in Claude Code render smoothly.',
    pageRef: 96,
  },
];
