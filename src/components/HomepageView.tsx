/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Claude Code at ₹0 — Master Technical Documentation & Interactive Platform
 * High-craft editorial design, interactive ROI playground, token flow simulator,
 * gamified stack configurator, and live terminal sandbox.
 */

import React, { useState, useEffect, useRef } from 'react';
import { ALL_DOCS } from '../data/masterHandbook';
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
  Code2,
  FileText,
  Workflow,
  Sparkles,
  ExternalLink,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CornerDownLeft,
  Filter,
  BookMarked,
  Eye,
  X,
  Laptop,
  CheckSquare,
  Square,
  Flame,
  Calculator,
  Coffee,
  Trophy,
  Volume2,
  VolumeX,
  FastForward,
  Award,
  Compass,
  Sliders,
  DollarSign,
  PlayCircle,
  HelpCircle,
} from 'lucide-react';

interface HomepageViewProps {
  onStartReading: () => void;
  onNavigateChapter: (slug: string) => void;
  onOpenSearch: () => void;
  onOpenPdfViewer: () => void;
  onSelectTab: (tab: any) => void;
}

type PlatformOS = 'windows' | 'mac' | 'linux' | 'android';
type ArchitecturePath = 'pathA' | 'pathB' | 'pathC1' | 'pathC2';

export const HomepageView: React.FC<HomepageViewProps> = ({
  onStartReading,
  onNavigateChapter,
  onOpenSearch,
  onOpenPdfViewer,
  onSelectTab,
}) => {
  // --------------------------------------------------------------------------
  // 1. Audio Click Synthesizer (Optional Playful Feedback)
  // --------------------------------------------------------------------------
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = (frequency = 600, duration = 0.04) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  };

  // --------------------------------------------------------------------------
  // 2. Savings & ROI Playground State
  // --------------------------------------------------------------------------
  const [dailyTasks, setDailyTasks] = useState(25);
  const [contextTokensK, setContextTokensK] = useState(65);
  const [comparisonModel, setComparisonModel] = useState<'claude37' | 'cursorPro' | 'copilot' | 'o3mini'>('claude37');
  const [showCelebrationBadge, setShowCelebrationBadge] = useState(false);

  // Commercial model cost estimations
  const calculateSavings = () => {
    // 25 tasks with avg 65k tokens = 1.625M tokens/day
    const dailyTokensM = (dailyTasks * contextTokensK * 1000) / 1000000;
    let dailyCostUSD = 0;

    if (comparisonModel === 'claude37') {
      // Claude 3.7 Sonnet: $3.00/MTok input + $15.00/MTok output (assumed 85% input, 15% output)
      dailyCostUSD = dailyTokensM * (0.85 * 3.0 + 0.15 * 15.0);
    } else if (comparisonModel === 'o3mini') {
      dailyCostUSD = dailyTokensM * (0.85 * 1.1 + 0.15 * 4.4);
    } else if (comparisonModel === 'cursorPro') {
      // Pro fixed $20/mo + overage for heavy reasoning
      dailyCostUSD = (20 / 30) + (dailyTokensM > 1 ? (dailyTokensM - 1) * 6 : 0);
    } else {
      // GitHub Copilot Enterprise: $39/mo
      dailyCostUSD = (39 / 30) + (dailyTokensM > 1 ? (dailyTokensM - 1) * 5 : 0);
    }

    const monthlyCostUSD = dailyCostUSD * 30;
    const annualCostUSD = dailyCostUSD * 365;
    const inrRate = 84;
    const monthlyCostINR = monthlyCostUSD * inrRate;
    const annualCostINR = annualCostUSD * inrRate;

    // Playful real-world equivalents
    const cupsOfChai = Math.floor(monthlyCostINR / 15);
    const macbooks = (annualCostINR / 250000).toFixed(1);
    const pizzas = Math.floor(monthlyCostINR / 450);

    return {
      dailyCostUSD: dailyCostUSD.toFixed(2),
      monthlyCostUSD: monthlyCostUSD.toFixed(0),
      annualCostUSD: annualCostUSD.toFixed(0),
      monthlyCostINR: monthlyCostINR.toLocaleString('en-IN', { maximumFractionDigits: 0 }),
      annualCostINR: annualCostINR.toLocaleString('en-IN', { maximumFractionDigits: 0 }),
      cupsOfChai: cupsOfChai.toLocaleString('en-IN'),
      macbooks,
      pizzas: pizzas.toLocaleString('en-IN'),
    };
  };

  const savings = calculateSavings();

  // --------------------------------------------------------------------------
  // 3. Matchmaker Quiz State
  // --------------------------------------------------------------------------
  const [quizHardware, setQuizHardware] = useState<'laptop' | 'android' | 'offline' | 'apple'>('laptop');
  const [quizCompute, setQuizCompute] = useState<'cloud_free' | 'offline_local' | 'fast_cli' | 'mobile'>('cloud_free');
  const [quizMatchedArch, setQuizMatchedArch] = useState<ArchitecturePath>('pathA');

  useEffect(() => {
    if (quizHardware === 'android' || quizCompute === 'mobile') {
      setQuizMatchedArch('pathC2');
    } else if (quizHardware === 'offline' || quizCompute === 'offline_local') {
      setQuizMatchedArch('pathB');
    } else if (quizCompute === 'fast_cli') {
      setQuizMatchedArch('pathC1');
    } else {
      setQuizMatchedArch('pathA');
    }
  }, [quizHardware, quizCompute]);

  // --------------------------------------------------------------------------
  // 4. Live Token Flow Simulation State
  // --------------------------------------------------------------------------
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<'gst' | 'refactor' | 'tests'>('gst');

  const startTokenSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    playClickSound(800, 0.08);

    setTimeout(() => {
      setSimStep(2);
      playClickSound(950, 0.08);
      setTimeout(() => {
        setSimStep(3);
        playClickSound(1100, 0.08);
        setTimeout(() => {
          setSimStep(4);
          playClickSound(1300, 0.12);
          setIsSimulating(false);
        }, 800);
      }, 800);
    }, 800);
  };

  const resetTokenSimulation = () => {
    setSimStep(0);
    setIsSimulating(false);
    playClickSound(400, 0.05);
  };

  // --------------------------------------------------------------------------
  // 5. Stack Configurator & Gamified Checklist State
  // --------------------------------------------------------------------------
  const [selectedOS, setSelectedOS] = useState<PlatformOS>('windows');
  const [selectedArch, setSelectedArch] = useState<ArchitecturePath>('pathA');
  const [copiedStep, setCopiedStep] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, stepId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepId);
      playClickSound(1200, 0.06);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch {}
  };

  const toggleStepCheck = (stepId: string) => {
    setCheckedSteps((prev) => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      playClickSound(updated[stepId] ? 1000 : 500, 0.05);
      return updated;
    });
  };

  const countCheckedSteps = () => {
    return Object.values(checkedSteps).filter(Boolean).length;
  };

  // --------------------------------------------------------------------------
  // 6. Interactive Book Peek Drawer (4 Pages)
  // --------------------------------------------------------------------------
  const [peekPage, setPeekPage] = useState<number>(1);
  const [isPeekModalOpen, setIsPeekModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // 7. Quick CCAV Prompt Generator Mini-Lab State
  // --------------------------------------------------------------------------
  const [promptTask, setPromptTask] = useState<'bugfix' | 'feature' | 'test' | 'refactor'>('bugfix');
  const [promptLang, setPromptLang] = useState<'TypeScript' | 'Python' | 'Go' | 'Rust'>('TypeScript');
  const [copiedCcav, setCopiedCcav] = useState(false);

  const generateCcavPrompt = () => {
    if (promptTask === 'bugfix') {
      return `CONTEXT: Working in ${promptLang} codebase. Issue: Runtime exception in state synchronization loop.
CONSTRAINTS: Zero breaking API changes. No extra npm/pip dependencies. Maintain 100% strict typing.
ACTION: Inspect the failing assertion in the test suite, isolate the root cause, and apply an atomic patch.
VERIFICATION: Run npm test / pytest and verify all test suites exit with code 0 before concluding.`;
    } else if (promptTask === 'feature') {
      return `CONTEXT: Adding automated JSON validation module in ${promptLang} for developer tool suite.
CONSTRAINTS: Strict adherence to existing error schemas. Memory footprint must stay under 15MB.
ACTION: Scaffold schema validator with line-number syntax highlight and error boundary.
VERIFICATION: Write comprehensive unit test suite with 10 edge cases and verify clean pass.`;
    } else if (promptTask === 'test') {
      return `CONTEXT: Core business logic functions in ${promptLang} require 100% branch coverage.
CONSTRAINTS: Pure unit tests only. No network calls or file system side-effects.
ACTION: Generate boundary test cases for null inputs, overflow numbers, and invalid format strings.
VERIFICATION: Run test coverage runner and assert 100% branch coverage.`;
    } else {
      return `CONTEXT: Legacy module in ${promptLang} has cyclomatic complexity of 18.
CONSTRAINTS: Preserve public function signatures and return types exactly.
ACTION: Extract inner validation logic into pure helper functions with tabular formatting.
VERIFICATION: Run regression test suite and ensure zero regressions.`;
    }
  };

  // --------------------------------------------------------------------------
  // 8. Terminal Simulator State (With Playful Easter Eggs)
  // --------------------------------------------------------------------------
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: 'input' | 'output' | 'error' | 'success'; text: string }>>([
    { type: 'output', text: 'Claude Code CLI [Zero-Cost Architecture v1.0.28]' },
    { type: 'output', text: 'Active Endpoint: http://127.0.0.1:4000 (LiteLLM Proxy -> Google AI Studio)' },
    { type: 'success', text: 'Model: gemini-2.5-flash | Daily Free Quota: 1,500 RPD | Cost: Rs 0.00 ($0.00)' },
    { type: 'output', text: 'Type a command or click a quick action below (try "help", "/cost", "chai", "matrix").' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  const executeTerminalCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    playClickSound(750, 0.04);
    const newHistory = [...terminalHistory, { type: 'input' as const, text: `>_ ${trimmed}` }];
    const lower = trimmed.toLowerCase();

    if (lower === 'clear' || lower === 'cls') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lower === 'chai') {
      newHistory.push(
        { type: 'success', text: 'Fresh cup of hot cutting chai ready for your zero-cost coding session!' },
        { type: 'output', text: '   ( (' },
        { type: 'output', text: '    ) )' },
        { type: 'output', text: ' .______.' },
        { type: 'output', text: ' |  ₹0  |]' },
        { type: 'output', text: ' \\______/' },
        { type: 'output', text: 'Total expenditure: ₹0.00. Fuel for infinite autonomous coding.' }
      );
    } else if (lower === 'matrix') {
      newHistory.push(
        { type: 'success', text: 'Wake up, Neo... The ₹0 loop is real.' },
        { type: 'output', text: '01000011 01101100 01100001 01110101 01100100 01100101' },
        { type: 'output', text: '01000011 01101111 01100100 01100101 00100000 00110000' },
        { type: 'success', text: 'Anthropic Cloud API connection: BYPASSED -> Local Loopback: ACTIVE.' }
      );
    } else if (lower === 'help') {
      newHistory.push(
        { type: 'output', text: 'Available simulated interactive commands:' },
        { type: 'output', text: '  claude    - Launch autonomous agent session' },
        { type: 'output', text: '  /cost     - Audit current token spend and API accounting' },
        { type: 'output', text: '  /doctor   - Verify proxy endpoint, latency, and context health' },
        { type: 'output', text: '  /init     - Scaffold CLAUDE.md architectural memory' },
        { type: 'output', text: '  /compact  - Run context window compression' },
        { type: 'output', text: '  chai      - Pour a cup of hot developer chai (₹0 easter egg)' },
        { type: 'output', text: '  matrix    - Enter the zero-cost digital stream' },
        { type: 'output', text: '  clear     - Clear terminal screen' }
      );
    } else if (lower === 'claude' || lower.startsWith('claude ')) {
      newHistory.push(
        { type: 'success', text: 'Claude Code (Free Proxy Engine) initialized in /workspace/app' },
        { type: 'output', text: 'Found git repository: branch main (clean)' },
        { type: 'output', text: 'System prompt loaded with 4 MCP tools (filesystem, git, shell, test)' },
        { type: 'output', text: 'Agent ready. What would you like to build or refactor?' }
      );
    } else if (lower === '/cost') {
      newHistory.push(
        { type: 'output', text: '+-- Claude Code Token Cost Audit ------------------------+' },
        { type: 'output', text: '| Input Tokens:      42,850 tokens                      |' },
        { type: 'output', text: '| Output Tokens:      3,410 tokens                      |' },
        { type: 'output', text: '| Cache Read:        38,200 tokens (90% hit rate)       |' },
        { type: 'success', text: '| Current Billing:   $0.000000 (Rs. 0.00 / ₹0)          |' },
        { type: 'output', text: '| Backend:           Google AI Studio Gemini 2.5 Flash   |' },
        { type: 'output', text: '| Remaining Free:    1,358 / 1,500 daily requests       |' },
        { type: 'output', text: '+--------------------------------------------------------+' }
      );
    } else if (lower === '/doctor') {
      newHistory.push(
        { type: 'output', text: 'Running Zero-Cost Infrastructure Diagnostic Checklist...' },
        { type: 'success', text: '  [PASS] Local Proxy: 127.0.0.1:4000 responding (latency: 14ms)' },
        { type: 'success', text: '  [PASS] Backend API: Google AI Studio Gemini 2.5 Flash active' },
        { type: 'success', text: '  [PASS] Context Window: 1,048,576 tokens verified' },
        { type: 'success', text: '  [PASS] Git Worktree Isolation: Enabled in .git/worktrees' },
        { type: 'success', text: '  [PASS] Financial Invariant: Rs 0.00 ($0.00) cost verified' }
      );
    } else if (lower === '/init') {
      newHistory.push(
        { type: 'output', text: 'Analyzing repository structure and toolchains...' },
        { type: 'success', text: 'Created CLAUDE.md with project conventions and test commands.' },
        { type: 'output', text: 'Rules registered: Strict TypeScript, Tabular Numerals, Zero Pill Badges.' }
      );
    } else if (lower === '/compact') {
      newHistory.push(
        { type: 'output', text: 'Compacting conversation context...' },
        { type: 'output', text: 'Pruned redundant git diff outputs and tool traces.' },
        { type: 'success', text: 'Context compressed: 48,200 tokens -> 4,120 tokens (88% reduction)' }
      );
    } else {
      newHistory.push({
        type: 'output',
        text: `Executed: "${trimmed}". In live terminal, Claude Code would inspect codebase and propose an action. Type "help" or click a preset command above.`,
      });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  // --------------------------------------------------------------------------
  // 9. Architecture Stack Specifications
  // --------------------------------------------------------------------------
  const getArchitectureDetails = () => {
    switch (selectedArch) {
      case 'pathA':
        return {
          title: 'Path A: LiteLLM Proxy + Google AI Studio Free Tier',
          tag: 'Recommended for Most Developers',
          cost: '₹0.00 / month forever',
          quota: '1,500 Requests / Day (Gemini 2.5 Flash)',
          context: '1,048,576 Tokens Context Window',
          ram: 'Minimal (Any PC / Laptop, 2GB+ RAM)',
          description:
            'Routes official Claude Code CLI calls through an ultra-lightweight local LiteLLM protocol adapter to Google AI Studio Gemini 2.5 Flash, translating Anthropic Messages API format into Gemini format with zero modifications to source code.',
          steps: [
            {
              id: 'a1',
              title: 'Install Official Claude Code CLI',
              command:
                selectedOS === 'windows'
                  ? 'irm https://claude.ai/install.ps1 | iex'
                  : selectedOS === 'mac'
                  ? 'curl -fsSL https://claude.ai/install.sh | bash'
                  : selectedOS === 'linux'
                  ? 'curl -fsSL https://claude.ai/install.sh | bash'
                  : 'curl -fsSL https://raw.githubusercontent.com/gtbuchanan/claude-code-termux/main/install.sh | bash',
              note: 'Installs the official Anthropic Claude Code standalone binary without Node.js dependencies.',
            },
            {
              id: 'a2',
              title: 'Install & Launch LiteLLM Proxy',
              command:
                selectedOS === 'windows'
                  ? 'pip install "litellm[proxy]"\n$env:GEMINI_API_KEY = "your_free_ai_studio_key"\nlitellm --model gemini/gemini-2.5-flash --port 4000'
                  : 'pip install "litellm[proxy]"\nexport GEMINI_API_KEY="your_free_ai_studio_key"\nlitellm --model gemini/gemini-2.5-flash --port 4000',
              note: 'Get your perpetual free API key from aistudio.google.com. No credit card required.',
            },
            {
              id: 'a3',
              title: 'Point Claude Code to Local Proxy (~/.claude/settings.json)',
              command: JSON.stringify(
                {
                  env: {
                    ANTHROPIC_BASE_URL: 'http://localhost:4000',
                    ANTHROPIC_AUTH_TOKEN: 'sk-local-free-proxy',
                    ANTHROPIC_MODEL: 'gemini-2.5-flash',
                    ANTHROPIC_DEFAULT_SONNET_MODEL: 'gemini-2.5-flash',
                    CLAUDE_CODE_SUBAGENT_MODEL: 'gemini-2.5-flash',
                  },
                },
                null,
                2
              ),
              note: 'Place in ~/.claude/settings.json. Claude Code now operates 100% free of charge.',
            },
          ],
        };
      case 'pathB':
        return {
          title: 'Path B: Native Claude Code + Local Ollama 64K',
          tag: '100% Offline & Private',
          cost: '₹0.00 perpetual hardware loopback',
          quota: 'Unlimited local inferences',
          context: '65,536 Tokens Context (Configured Modelfile)',
          ram: '8GB RAM minimum (7B Q4) or 16GB RAM (7B Q8)',
          description:
            'Connects Claude Code directly to a locally hosted Ollama instance running Qwen 2.5 Coder 7B with custom 64K KV cache quantization. Zero internet connection required; completely airgapped and private.',
          steps: [
            {
              id: 'b1',
              title: 'Install Ollama & Pull Qwen 2.5 Coder',
              command:
                selectedOS === 'windows'
                  ? 'winget install -e --id Ollama.Ollama\nollama pull qwen2.5-coder:7b'
                  : selectedOS === 'mac'
                  ? 'brew install ollama\nollama serve &\nollama pull qwen2.5-coder:7b'
                  : 'curl -fsSL https://ollama.com/install.sh | sh\nollama pull qwen2.5-coder:7b',
              note: 'Downloads the state-of-the-art open coding model optimized for code completion and refactoring.',
            },
            {
              id: 'b2',
              title: 'Build 64K Context Modelfile',
              command:
                'cat << \'EOF\' > Modelfile-claude-64k\nFROM qwen2.5-coder:7b\nPARAMETER num_ctx 65536\nPARAMETER temperature 0.2\nEOF\nollama create qwen-claude-64k -f Modelfile-claude-64k',
              note: 'Expands Ollama default 2K context to a massive 64K window suitable for reading large codebases.',
            },
            {
              id: 'b3',
              title: 'Configure Claude Code Loopback Settings',
              command: JSON.stringify(
                {
                  env: {
                    ANTHROPIC_BASE_URL: 'http://127.0.0.1:11434',
                    ANTHROPIC_AUTH_TOKEN: 'ollama',
                    ANTHROPIC_MODEL: 'qwen-claude-64k',
                    CLAUDE_CODE_MAX_CONTEXT_TOKENS: '65536',
                  },
                },
                null,
                2
              ),
              note: 'Point Claude Code directly to port 11434 without any intermediate proxy.',
            },
          ],
        };
      case 'pathC1':
        return {
          title: 'Path C1: Aider + Direct Google AI Studio Key',
          tag: 'Fastest 2-Minute Setup',
          cost: '₹0.00 / month forever',
          quota: '1,500 Requests / Day',
          context: '1,048,576 Tokens Context Window',
          ram: 'Any machine (Runs in Python venv)',
          description:
            'Aider is the leading open-source CLI coding agent. It has native support for Google Gemini without requiring any proxy daemon, making it the fastest route from zero to autonomous coding.',
          steps: [
            {
              id: 'c1_1',
              title: 'Install Aider CLI via Official Installer',
              command:
                selectedOS === 'windows'
                  ? 'irm https://aider.chat/install.ps1 | iex'
                  : 'curl -LsSf https://aider.chat/install.sh | sh',
              note: 'Installs Aider into an isolated hermetic Python environment with git repository integration.',
            },
            {
              id: 'c1_2',
              title: 'Set Gemini API Key Environment Variable',
              command:
                selectedOS === 'windows'
                  ? '$env:GEMINI_API_KEY = "your_free_ai_studio_key"'
                  : 'export GEMINI_API_KEY="your_free_ai_studio_key"',
              note: 'Export your free Google AI Studio key in your terminal session or shell profile.',
            },
            {
              id: 'c1_3',
              title: 'Launch Aider with Gemini 2.0 Flash',
              command: 'aider --model gemini/gemini-2.0-flash',
              note: 'Launches full terminal coding session with automatic git commits, diff reviews, and multi-file editing.',
            },
          ],
        };
      case 'pathC2':
        return {
          title: 'Path C2: Android Termux Native Mobile Architecture',
          tag: 'Pocket Autonomous Agent',
          cost: '₹0.00 on any Android Device',
          quota: '1,500 Requests / Day via Gemini Flash',
          context: '1,048,576 Tokens Context Window',
          ram: '4GB Android Phone or Tablet',
          description:
            'Execute the official Claude Code binary natively inside Android Termux using a custom glibc-runner ELF dynamic linker patch that bypasses Android Bionic libc limitations.',
          steps: [
            {
              id: 'c2_1',
              title: 'Prepare Termux Core Packages (F-Droid Build)',
              command: 'termux-wake-lock\npkg update -y\npkg install nodejs-lts git python curl -y\npip install "litellm[proxy]"',
              note: 'Always use Termux downloaded from F-Droid (not Google Play) to ensure up-to-date repository packages.',
            },
            {
              id: 'c2_2',
              title: 'Install glibc-runner ELF Dynamic Wrapper',
              command: 'curl -fsSL https://raw.githubusercontent.com/gtbuchanan/claude-code-termux/main/install.sh | bash',
              note: 'Patches the ELF binary headers to route glibc calls correctly on ARM64 Android.',
            },
            {
              id: 'c2_3',
              title: 'Start Background LiteLLM & Launch Mobile Agent',
              command: 'export GEMINI_API_KEY="your_key"\nlitellm --model gemini/gemini-2.5-flash --port 4000 &\nclaude',
              note: 'Run full autonomous coding agent from your smartphone terminal on the go at ₹0.',
            },
          ],
        };
    }
  };

  const archDetails = getArchitectureDetails();

  // --------------------------------------------------------------------------
  // 10. Triage & Curriculum State
  // --------------------------------------------------------------------------
  const [selectedTriageIssue, setSelectedTriageIssue] = useState<number>(0);
  const [curriculumPartFilter, setCurriculumPartFilter] = useState<string>('all');
  const [curriculumSearch, setCurriculumSearch] = useState<string>('');

  const triageIssues = [
    {
      title: '404 Not Found on Anthropic API Endpoint',
      symptom: 'Claude Code exits with "Error: 404 Not Found" or attempts to connect to api.anthropic.com.',
      cause: 'Missing ANTHROPIC_BASE_URL setting in ~/.claude/settings.json, causing the CLI to call the official cloud API instead of your local LiteLLM proxy.',
      fix: 'Ensure ~/.claude/settings.json contains "ANTHROPIC_BASE_URL": "http://localhost:4000" and restart your terminal.',
      fixCommand: 'cat ~/.claude/settings.json',
      chapter: 'chapter-10',
    },
    {
      title: '429 Rate Limit / Quota Exceeded (AI Studio)',
      symptom: 'HTTP 429 Too Many Requests after running multiple heavy subagent reasoning loops.',
      cause: 'Exceeded 15 RPM (requests per minute) free tier burst threshold on Google AI Studio.',
      fix: 'Add LiteLLM router failover with 2 free Google AI Studio keys or inject 2-second subagent throttle.',
      fixCommand: 'litellm --config litellm_config.yaml --port 4000',
      chapter: 'chapter-7',
    },
    {
      title: 'Android Termux: Syntax error: "(" unexpected',
      symptom: 'Running claude in Termux outputs syntax error or crashes on ELF header execution.',
      cause: 'Official Claude Code binary is compiled against glibc; Termux natively uses Android Bionic libc.',
      fix: 'Execute via the verified glibc-runner dynamic ELF patch installer.',
      fixCommand: 'curl -fsSL https://raw.githubusercontent.com/gtbuchanan/claude-code-termux/main/install.sh | bash',
      chapter: 'chapter-11',
    },
    {
      title: 'Ollama 64K: Context Window Truncated at 2,048 Tokens',
      symptom: 'Ollama model forgets code files after a single file edit or outputs repetitive hallucinated loops.',
      cause: 'Ollama defaults to num_ctx: 2048 unless explicitly expanded in a custom Modelfile.',
      fix: 'Create Modelfile with "PARAMETER num_ctx 65536" and run "ollama create qwen-claude-64k".',
      fixCommand: 'ollama create qwen-claude-64k -f Modelfile-claude-64k',
      chapter: 'chapter-6',
    },
    {
      title: 'LiteLLM Proxy: Connection Refused 127.0.0.1:4000',
      symptom: 'Claude CLI hangs for 30s and throws "ECONNREFUSED 127.0.0.1:4000".',
      cause: 'The LiteLLM background daemon stopped or failed to bind to port 4000.',
      fix: 'Check running python processes or launch LiteLLM with verbose logging to confirm port binding.',
      fixCommand: 'litellm --model gemini/gemini-2.5-flash --port 4000 --debug',
      chapter: 'chapter-8',
    },
  ];

  const filteredChapters = ALL_DOCS.filter((doc) => {
    const matchesFilter =
      curriculumPartFilter === 'all'
        ? true
        : curriculumPartFilter === 'foundations'
        ? doc.part === 'Part I: Foundations' || doc.part === 'Front Matter'
        : curriculumPartFilter === 'setups'
        ? doc.part === 'Part II: Setups & Platforms'
        : curriculumPartFilter === 'projects'
        ? doc.part === 'Part III: Practical Projects'
        : curriculumPartFilter === 'discipline'
        ? doc.part === 'Part IV: Engineering Discipline'
        : doc.part === 'Part V: Appendices & Reference';

    const matchesSearch =
      curriculumSearch.trim() === ''
        ? true
        : doc.title.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
          doc.part.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
          (doc.purpose && doc.purpose.toLowerCase().includes(curriculumSearch.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* ─────────────────────────────────────────────────────────────
          1. Editorial Hero Section
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium tracking-wide">
                <span>OPEN ENGINEERING REFERENCE MANUAL</span>
                <span aria-hidden="true">&bull;</span>
                <span className="text-neutral-400">OCTOBER 2026 EDITION</span>
              </div>

              {/* Sound Toggle Easter Egg */}
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  playClickSound(1000, 0.05);
                }}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                  soundEnabled
                    ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300'
                    : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                }`}
                title={soundEnabled ? 'Mechanical terminal audio clicks ON' : 'Turn audio clicks ON'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="text-[10px] font-mono hidden sm:inline">{soundEnabled ? 'FX ON' : 'FX OFF'}</span>
              </button>
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

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onStartReading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md hover:shadow-emerald-900/40 cursor-pointer group"
              >
                <BookOpen className="w-4 h-4" />
                <span>Start Reading Handbook</span>
                <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
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
                <span>35 CCAV Prompts</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-sans">₹0 Forever</span>
              </span>
            </div>
          </div>

          {/* Right Column: Tactile Hardcover Physical Book Showcase & Interactive Peek */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group max-w-sm w-full mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-transparent rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Physical Hardcover Book Container */}
              <div className="relative bg-[#0d100e] border border-[#232a25] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:-translate-y-1.5 flex flex-col aspect-[3/4] p-6 text-neutral-100 select-none">
                <div className="absolute inset-2 border border-emerald-500/25 rounded-lg pointer-events-none" />
                <div className="absolute inset-2.5 border border-amber-500/20 rounded-lg pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-neutral-950 via-neutral-800 to-transparent" />

                {/* Silk Ribbon Bookmark */}
                <div className="absolute right-8 top-0 w-4 h-12 bg-emerald-600 shadow-md">
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#0d100e] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
                </div>

                <div className="pt-2 pl-3">
                  <div className="text-[9px] font-mono tracking-[0.25em] text-emerald-400 uppercase font-semibold">
                    Autonomous Systems Engineering Manual
                  </div>
                  <div className="text-[8px] font-mono tracking-widest text-neutral-400 mt-0.5">
                    First Complete Reference Edition &bull; 2026
                  </div>
                </div>

                <div className="my-auto pl-3 flex flex-col items-center justify-center text-center py-4">
                  <div className="relative w-28 h-28 mb-3">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500/80">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                      <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                      <polygon points="50,14 82,72 18,72" fill="none" stroke="#eab308" strokeWidth="1.2" opacity="0.5" />
                      <polygon points="50,86 18,28 82,28" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
                      <circle cx="50" cy="50" r="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                      <path d="M46 47 L52 50 L46 53" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight font-serif">
                    CLAUDE CODE
                  </div>
                  <div className="text-3xl font-black tracking-tight text-emerald-400 leading-none mt-1">
                    AT <span className="font-sans">₹0</span>
                  </div>
                  <div className="text-[10px] tracking-widest text-neutral-300 uppercase font-medium mt-2 max-w-[200px]">
                    The Complete AI Coding Agent Handbook
                  </div>
                </div>

                <div className="pl-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                  <div>
                    <span className="text-neutral-200 font-semibold">120 Pages</span> &bull; 24 Chapters
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPeekModalOpen(true);
                      playClickSound(850, 0.05);
                    }}
                    className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer bg-neutral-900/90 px-2.5 py-1 rounded border border-neutral-700/60 hover:border-emerald-500/50 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Flip &amp; Peek Inside</span>
                  </button>
                </div>
              </div>

              <div className="w-[92%] mx-auto h-3 bg-neutral-950 rounded-b-lg -mt-1 blur-[1px] opacity-80" />
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400 font-mono">
              <button
                type="button"
                onClick={() => {
                  setIsPeekModalOpen(true);
                  playClickSound(850, 0.05);
                }}
                className="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read Sample Pages (1–4)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={onOpenPdfViewer}
                className="text-neutral-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect PDF Source</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Interactive Feature: The ₹0 Savings & ROI Playground
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#121614] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>01. Interactive Economics Playground</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                How Much Money Does Claude Code at <span className="font-sans text-emerald-400">₹0</span> Save You?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Drag the sliders below to calculate your daily token consumption, commercial bill vs. ₹0 loopback savings, and fun real-world equivalents.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Your Operating Cost:</span>
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-600 font-bold">
                <span className="font-sans">₹</span>0.00 FOREVER
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls: Sliders & Commercial Baseline */}
            <div className="lg:col-span-6 space-y-5">
              {/* Slider 1: Tasks per Day */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-200">Daily Autonomous Coding Tasks:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm bg-neutral-900 px-2.5 py-0.5 rounded border border-neutral-800">
                    {dailyTasks} tasks / day
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={dailyTasks}
                  onChange={(e) => {
                    setDailyTasks(Number(e.target.value));
                    playClickSound(500 + Number(e.target.value) * 4, 0.02);
                  }}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>5 (Casual)</span>
                  <span>50 (Full-time Dev)</span>
                  <span>150 (Heavy Agent Fleet)</span>
                </div>
              </div>

              {/* Slider 2: Average Context Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-200">Average Repository Context Per Task:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm bg-neutral-900 px-2.5 py-0.5 rounded border border-neutral-800">
                    {contextTokensK}K tokens
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="180"
                  step="5"
                  value={contextTokensK}
                  onChange={(e) => {
                    setContextTokensK(Number(e.target.value));
                    playClickSound(400 + Number(e.target.value) * 3, 0.02);
                  }}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>20K (Small script)</span>
                  <span>65K (Standard app)</span>
                  <span>180K (Monorepo)</span>
                </div>
              </div>

              {/* Selector: Comparison Commercial Plan */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-neutral-300 block">Compare Against Commercial Option:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'claude37', label: 'Claude 3.7 Sonnet', sub: '$3/$15 MTok' },
                    { id: 'o3mini', label: 'OpenAI o3-mini', sub: '$1.1/$4.4 MTok' },
                    { id: 'cursorPro', label: 'Cursor Pro', sub: '$20/mo + fees' },
                    { id: 'copilot', label: 'Copilot Enterprise', sub: '$39/mo + fees' },
                  ].map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setComparisonModel(model.id as any);
                        playClickSound(800, 0.04);
                      }}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                        comparisonModel === model.id
                          ? 'border-emerald-500 bg-emerald-950/40 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px] truncate font-semibold">{model.label}</div>
                      <div className="text-[9px] text-neutral-500 font-mono">{model.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Display: Savings Board & Fun Equivalencies */}
            <div className="lg:col-span-6 bg-[#0a0d0c] border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4 border-b border-neutral-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Commercial Monthly Bill</span>
                  <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">
                    ${savings.monthlyCostUSD} <span className="text-xs font-sans text-neutral-400 font-normal">/ mo</span>
                  </div>
                  <div className="text-xs text-neutral-500 font-mono">
                    <span className="font-sans">₹</span>{savings.monthlyCostINR} INR
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Annual Cash Saved</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    <span className="font-sans">₹</span>{savings.annualCostINR}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    (${savings.annualCostUSD} USD in your pocket)
                  </div>
                </div>
              </div>

              {/* Playful Real-World Equivalents */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>What that ₹0 savings buys you instead:</span>
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#121614] border border-neutral-800/90 rounded-lg p-2.5">
                    <div className="text-base sm:text-lg font-bold text-white font-mono">{savings.cupsOfChai}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">Cups of Chai ☕</div>
                  </div>
                  <div className="bg-[#121614] border border-neutral-800/90 rounded-lg p-2.5">
                    <div className="text-base sm:text-lg font-bold text-white font-mono">{savings.macbooks}x</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">M4 Max Laptops 💻</div>
                  </div>
                  <div className="bg-[#121614] border border-neutral-800/90 rounded-lg p-2.5">
                    <div className="text-base sm:text-lg font-bold text-white font-mono">{savings.pizzas}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5">Team Pizzas 🍕</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowCelebrationBadge(true);
                    playClickSound(1400, 0.15);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Claim ₹0 Freedom Certificate</span>
                </button>
                <span className="text-[11px] text-neutral-500 font-mono">Zero cost forever invariant</span>
              </div>

              {showCelebrationBadge && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/80 text-xs text-emerald-300 flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Certified Zero-Cost Engineer!</strong> You are saving <span className="font-sans">₹</span>{savings.annualCostINR} every single year.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCelebrationBadge(false)}
                    className="text-neutral-400 hover:text-white cursor-pointer ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. Interactive Feature: 3-Question Setup Matchmaker Quiz
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#141715] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>02. Smart Setup Matchmaker</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Find Your Ideal ₹0 Architecture in 15 Seconds
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Answer two quick questions about your machine and coding situation to get the optimal setup recommendation.
              </p>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              Instant Hardware Matcher
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Quiz Questions */}
            <div className="lg:col-span-7 space-y-5">
              {/* Question 1: Hardware */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-200">1. What hardware device are you using right now?</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'laptop', label: 'PC / Laptop', desc: 'Windows / Linux' },
                    { id: 'apple', label: 'Apple Mac', desc: 'M-Series / Intel' },
                    { id: 'offline', label: 'Desktop Rig', desc: 'NVIDIA GPU (8GB+)' },
                    { id: 'android', label: 'Smartphone', desc: 'Android Termux' },
                  ].map((hw) => (
                    <button
                      key={hw.id}
                      onClick={() => {
                        setQuizHardware(hw.id as any);
                        playClickSound(600, 0.03);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        quizHardware === hw.id
                          ? 'border-purple-500 bg-purple-950/40 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{hw.label}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{hw.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Compute Preference */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-200">2. What is your compute priority?</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cloud_free', label: '1,500 Daily Free RPD', desc: 'Gemini 2.5 Flash' },
                    { id: 'offline_local', label: '100% Offline & Private', desc: 'Local Ollama 64K' },
                    { id: 'fast_cli', label: 'Fastest 2-Min Setup', desc: 'Aider Direct Key' },
                    { id: 'mobile', label: 'Coding in Pocket', desc: 'Android glibc' },
                  ].map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => {
                        setQuizCompute(comp.id as any);
                        playClickSound(700, 0.03);
                      }}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        quizCompute === comp.id
                          ? 'border-purple-500 bg-purple-950/40 text-white font-semibold'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{comp.label}</div>
                      <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{comp.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matched Recommendation Card */}
            <div className="lg:col-span-5 bg-[#0e1110] border border-purple-500/40 rounded-xl p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/80 font-bold uppercase">
                  99% Optimal Match
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">Perpetual <span className="font-sans">₹0</span></span>
              </div>

              <div>
                <h3 className="font-bold text-base text-white">
                  {quizMatchedArch === 'pathA' && 'Path A: LiteLLM + Google AI Studio 2.5 Flash'}
                  {quizMatchedArch === 'pathB' && 'Path B: Local Ollama 64K Qwen 2.5 Coder'}
                  {quizMatchedArch === 'pathC1' && 'Path C1: Aider + Direct Gemini Key'}
                  {quizMatchedArch === 'pathC2' && 'Path C2: Android Termux ARM64 ELF'}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {quizMatchedArch === 'pathA' &&
                    'Best balance of reasoning speed, 1M token context window, and official Claude Code CLI capability without spending a single rupee.'}
                  {quizMatchedArch === 'pathB' &&
                    'Completely private, zero cloud telemetry, unlimited inferences, runs entirely on your local CPU/GPU.'}
                  {quizMatchedArch === 'pathC1' &&
                    'Instant 2-minute setup, native git diff integration, zero proxy daemon maintenance required.'}
                  {quizMatchedArch === 'pathC2' &&
                    'Verified mobile autonomous developer setup that runs official Claude Code binaries on your phone.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedArch(quizMatchedArch);
                  if (quizHardware === 'android') setSelectedOS('android');
                  else if (quizHardware === 'apple') setSelectedOS('mac');
                  else setSelectedOS('windows');
                  playClickSound(1100, 0.08);

                  // Smooth scroll to stack builder
                  const el = document.getElementById('stack-builder-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <span>Load Tailored Commands in Configurator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Interactive Feature: Live Animated Token Routing Simulator
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#121513] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-emerald-400" />
                <span>03. Token Flow Visualization</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                How A Prompt Travels at <span className="font-sans text-emerald-400">₹0</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Click "Simulate Query" to watch a real agent prompt pass through the protocol translation pipeline in real time.
              </p>
            </div>

            {/* Play Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={startTokenSimulation}
                disabled={isSimulating}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSimulating ? 'Routing Tokens...' : 'Simulate Query'}</span>
              </button>
              <button
                type="button"
                onClick={resetTokenSimulation}
                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Prompt Selector for the Simulator */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-400 font-mono mr-1">Choose Test Prompt:</span>
            {[
              { id: 'gst', label: '1. "Fix GST 18% Rounding Bug in Invoices"' },
              { id: 'refactor', label: '2. "Refactor Kanban WIP Limits in TypeScript"' },
              { id: 'tests', label: '3. "Generate 10 Unit Tests for JWT Parser"' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPrompt(p.id as any);
                  playClickSound(600, 0.02);
                }}
                className={`px-3 py-1 rounded-md border text-xs cursor-pointer transition-colors ${
                  selectedPrompt === p.id
                    ? 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-medium'
                    : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Interactive Topology Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
            {/* Step 1: Official Binary */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simStep >= 1
                  ? 'border-emerald-500 bg-emerald-950/30 shadow-md ring-1 ring-emerald-500/50'
                  : 'border-neutral-800 bg-[#0c0f0d]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-neutral-400">NODE 1</span>
                {simStep >= 1 && <span className="text-emerald-400 font-bold animate-pulse">DISPATCHED</span>}
              </div>
              <div className="font-bold text-xs text-white">Official Binary</div>
              <div className="font-mono text-[11px] text-emerald-400 mt-0.5">claude-code CLI</div>
              <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                Formats standard Anthropic Messages API payload with repo AST.
              </p>
            </div>

            {/* Step 2: Protocol Proxy */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simStep >= 2
                  ? 'border-blue-500 bg-blue-950/30 shadow-md ring-1 ring-blue-500/50'
                  : 'border-neutral-800 bg-[#0c0f0d]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-neutral-400">NODE 2</span>
                {simStep >= 2 && <span className="text-blue-400 font-bold animate-pulse">TRANSLATED</span>}
              </div>
              <div className="font-bold text-xs text-white">LiteLLM Adapter</div>
              <div className="font-mono text-[11px] text-blue-400 mt-0.5">127.0.0.1:4000</div>
              <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                Maps Anthropic tools and schemas into Google Gemini generateContent.
              </p>
            </div>

            {/* Step 3: Google AI Studio / Ollama */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simStep >= 3
                  ? 'border-amber-500 bg-amber-950/30 shadow-md ring-1 ring-amber-500/50'
                  : 'border-neutral-800 bg-[#0c0f0d]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-neutral-400">NODE 3</span>
                {simStep >= 3 && <span className="text-amber-400 font-bold animate-pulse">PROCESSED (₹0)</span>}
              </div>
              <div className="font-bold text-xs text-white">Gemini 2.5 Flash</div>
              <div className="font-mono text-[11px] text-amber-400 mt-0.5">Free Cloud Pool</div>
              <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                Generates atomic file edit AST diff in 280ms latency. Zero cost deducted.
              </p>
            </div>

            {/* Step 4: Local Worktree */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                simStep >= 4
                  ? 'border-emerald-500 bg-emerald-950/30 shadow-md ring-1 ring-emerald-500/50'
                  : 'border-neutral-800 bg-[#0c0f0d]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-neutral-400">NODE 4</span>
                {simStep >= 4 && <span className="text-emerald-400 font-bold">COMMITTED</span>}
              </div>
              <div className="font-bold text-xs text-white">Isolated Worktree</div>
              <div className="font-mono text-[11px] text-emerald-400 mt-0.5">.git/worktrees/agent-1</div>
              <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                Applies patch, runs test suite, and commits without touching main.
              </p>
            </div>
          </div>

          {/* Telemetry Result Strip */}
          <div className="bg-[#090b0a] border border-neutral-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="text-neutral-400">Simulation Status:</span>
              <span className={`font-semibold ${simStep === 4 ? 'text-emerald-400' : simStep > 0 ? 'text-amber-400' : 'text-neutral-500'}`}>
                {simStep === 0 && 'Ready to send test prompt'}
                {simStep === 1 && '1/4: Packet outgoing from claude CLI...'}
                {simStep === 2 && '2/4: LiteLLM converting schemas...'}
                {simStep === 3 && '3/4: Model inferencing at 1,500 RPD tier...'}
                {simStep === 4 && '4/4: Atomic file patch applied and verified clean!'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-neutral-400">
              <span>Tokens: <strong className="text-white">{simStep === 4 ? '1,420' : '0'}</strong></span>
              <span>Cost: <strong className="text-emerald-400"><span className="font-sans">₹</span>0.00 ($0.00)</strong></span>
              <span>Time: <strong className="text-white">{simStep === 4 ? '310ms' : '0ms'}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Interactive Feature: Stack Builder & Gamified Checklist
          ───────────────────────────────────────────────────────────── */}
      <section id="stack-builder-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#141715] p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                04. Interactive Stack Builder
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Generate Your Zero-Cost Terminal Setup
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Select your operating system and preferred compute model to get a tailored, step-by-step command pipeline.
              </p>
            </div>

            {/* Gamified Checklist Progress Tracker */}
            <div className="flex items-center gap-3 bg-neutral-900/90 px-3.5 py-2 rounded-xl border border-neutral-800">
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 font-mono block">Setup Readiness</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {countCheckedSteps()} of 3 Steps Done ({Math.round((countCheckedSteps() / 3) * 100)}%)
                </span>
              </div>
              <div className="w-16 h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${(countCheckedSteps() / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Selector 1: Operating System */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Step 1: Choose Your Operating System</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'windows', label: 'Windows 10/11', sub: 'PowerShell / Winget' },
                { id: 'mac', label: 'macOS (Apple Silicon/Intel)', sub: 'Homebrew / Zsh' },
                { id: 'linux', label: 'Linux (Ubuntu/Debian/Arch)', sub: 'Bash / Native' },
                { id: 'android', label: 'Android Phone / Tablet', sub: 'Termux ARM64' },
              ].map((os) => (
                <button
                  key={os.id}
                  onClick={() => {
                    setSelectedOS(os.id as PlatformOS);
                    if (os.id === 'android') setSelectedArch('pathC2');
                    playClickSound(650, 0.03);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedOS === os.id
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-xs'
                      : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{os.label}</div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{os.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selector 2: Compute Architecture Engine */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Step 2: Choose Compute Engine &amp; Model</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: 'pathA',
                  title: 'Path A: LiteLLM + AI Studio',
                  badge: 'Primary (₹0)',
                  badgeColor: 'text-emerald-400',
                  desc: 'Official Claude Code CLI routed to Google Gemini 2.5 Flash via local proxy.',
                },
                {
                  id: 'pathB',
                  title: 'Path B: Local Ollama 64K',
                  badge: '100% Offline',
                  badgeColor: 'text-blue-400',
                  desc: 'Airgapped Qwen 2.5 Coder 7B with custom 64K context Modelfile.',
                },
                {
                  id: 'pathC1',
                  title: 'Path C1: Aider Direct Key',
                  badge: 'Fastest Setup',
                  badgeColor: 'text-purple-400',
                  desc: 'Open-source Aider agent with direct Gemini 2.0 key (zero proxy daemon).',
                },
                {
                  id: 'pathC2',
                  title: 'Path C2: Termux Android',
                  badge: 'Mobile Pocket',
                  badgeColor: 'text-teal-400',
                  desc: 'Native Claude Code execution on Android smartphones via glibc-runner ELF.',
                },
              ].map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => {
                    setSelectedArch(arch.id as ArchitecturePath);
                    playClickSound(750, 0.03);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    selectedArch === arch.id
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-xs'
                      : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{arch.title}</span>
                      <span className={`text-[10px] font-sans font-medium ${arch.badgeColor}`} style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{arch.badge}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">{arch.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Architecture Overview Banner */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{archDetails.title}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-normal">({archDetails.tag})</span>
              </div>
              <p className="text-xs text-neutral-400 max-w-2xl">{archDetails.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block uppercase">Cost</span>
                <span className="font-bold text-emerald-400 font-sans" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
                  {archDetails.cost}
                </span>
              </div>
              <div className="text-right border-l border-neutral-800 pl-4">
                <span className="text-[10px] text-neutral-400 block uppercase">Quota</span>
                <span className="font-semibold text-neutral-200">{archDetails.quota}</span>
              </div>
              <div className="text-right border-l border-neutral-800 pl-4">
                <span className="text-[10px] text-neutral-400 block uppercase">Context</span>
                <span className="font-semibold text-neutral-200">{archDetails.context}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Executable Commands */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-300 font-semibold">
              <span>Step 3: Run Verified Installation Commands</span>
              <span className="text-[11px] font-mono text-neutral-400">
                Click checkbox to mark steps done
              </span>
            </div>

            <div className="space-y-4">
              {archDetails.steps.map((step, idx) => {
                const isChecked = !!checkedSteps[step.id];
                const isCopied = copiedStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`rounded-xl border transition-colors ${
                      isChecked
                        ? 'border-emerald-800/80 bg-emerald-950/20'
                        : 'border-neutral-800 bg-[#0e1110]'
                    } p-4 space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleStepCheck(step.id)}
                          className="text-neutral-400 hover:text-emerald-400 cursor-pointer"
                          title="Mark step completed"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-500" />
                          )}
                        </button>
                        <span className="font-bold text-xs text-white">
                          {idx + 1}. {step.title}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(step.command, step.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium cursor-pointer transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-mono">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-neutral-400" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-[#070908] border border-neutral-800/80 rounded-lg p-3 overflow-x-auto">
                      <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                        {step.command}
                      </pre>
                    </div>

                    <div className="text-[11px] text-neutral-400 font-mono pt-1">
                      &bull; {step.note}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. Interactive Feature: Live CLI Sandbox
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#121513] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                05. Live CLI Sandbox
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Test-Drive the Claude Code <span className="font-sans text-emerald-400">₹0</span> Engine
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Interact with the simulated terminal below. Click presets or type real commands to preview zero-cost execution.
              </p>
            </div>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-neutral-400 mr-1 text-[11px]">Quick Commands:</span>
              <button
                type="button"
                onClick={() => executeTerminalCommand('/cost')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-200 cursor-pointer border border-neutral-700/60 transition-colors"
              >
                /cost
              </button>
              <button
                type="button"
                onClick={() => executeTerminalCommand('/doctor')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-200 cursor-pointer border border-neutral-700/60 transition-colors"
              >
                /doctor
              </button>
              <button
                type="button"
                onClick={() => executeTerminalCommand('/compact')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-200 cursor-pointer border border-neutral-700/60 transition-colors"
              >
                /compact
              </button>
              <button
                type="button"
                onClick={() => executeTerminalCommand('chai')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-amber-300 cursor-pointer border border-amber-600/40 transition-colors"
                title="Pour hot tea"
              >
                chai ☕
              </button>
              <button
                type="button"
                onClick={() => executeTerminalCommand('matrix')}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-emerald-300 cursor-pointer border border-emerald-600/40 transition-colors"
                title="Digital stream"
              >
                matrix
              </button>
              <button
                type="button"
                onClick={() => executeTerminalCommand('clear')}
                className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer border border-neutral-800 transition-colors"
                title="Clear terminal screen"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Terminal Window Container */}
          <div className="rounded-xl border border-neutral-800 bg-[#080a09] overflow-hidden shadow-2xl">
            {/* Terminal Window Header */}
            <div className="px-4 py-2.5 bg-[#141816] border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-neutral-300">
                  claude-code-session — 127.0.0.1:4000 (Gemini 2.5 Flash Proxy)
                </span>
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold font-sans">
                ACTIVE &bull; ₹0.00 BILLING (ZERO-COST)
              </div>
            </div>

            {/* Terminal Screen Body */}
            <div className="p-4 font-mono text-xs space-y-1.5 min-h-[220px] max-h-[340px] overflow-y-auto leading-relaxed">
              {terminalHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    item.type === 'input'
                      ? 'text-white font-bold'
                      : item.type === 'success'
                      ? 'text-emerald-400 font-semibold'
                      : item.type === 'error'
                      ? 'text-rose-400 font-semibold'
                      : 'text-neutral-300'
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            {/* Terminal Command Input Line */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeTerminalCommand(terminalInput);
              }}
              className="px-4 py-2.5 bg-[#0e1210] border-t border-neutral-800 flex items-center gap-2"
            >
              <span className="text-emerald-400 font-mono text-xs font-bold">&gt;_</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type a command (try /cost, /doctor, chai, matrix, or claude fix)..."
                className="flex-1 bg-transparent text-xs text-neutral-100 font-mono focus:outline-none placeholder-neutral-500"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs cursor-pointer flex items-center gap-1 transition-colors"
              >
                <span>Run</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. Interactive Feature: Quick CCAV Prompt Generator Mini-Lab
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#141715] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="text-[11px] font-mono text-teal-400 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>06. Interactive Prompt Studio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Live CCAV Prompt Generator (Chapter 15)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Generate production-grade Context, Constraints, Action, and Verification prompt blocks ready to feed directly into Claude Code.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('prompts')}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <span>Explore All 35 CCAV Prompts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Prompt Selector Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-neutral-300">Target Objective:</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'bugfix', label: 'Atomic Bugfix' },
                    { id: 'feature', label: 'Feature Scaffold' },
                    { id: 'test', label: 'Test Suite Gen' },
                    { id: 'refactor', label: 'Refactor Clean' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setPromptTask(t.id as any);
                        playClickSound(700, 0.02);
                      }}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                        promptTask === t.id
                          ? 'border-teal-500 bg-teal-950/40 text-teal-200 font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs">{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-neutral-300">Codebase Language:</span>
                <div className="grid grid-cols-4 gap-2">
                  {['TypeScript', 'Python', 'Go', 'Rust'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setPromptLang(lang as any);
                        playClickSound(800, 0.02);
                      }}
                      className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                        promptLang === lang
                          ? 'border-teal-500 bg-teal-950/40 text-teal-200 font-semibold'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-mono">{lang}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Output Box */}
            <div className="lg:col-span-7 bg-[#0b0e0c] border border-neutral-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-teal-400 font-semibold">Generated CCAV Directive:</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generateCcavPrompt());
                    setCopiedCcav(true);
                    playClickSound(1200, 0.05);
                    setTimeout(() => setCopiedCcav(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedCcav ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                  <span>{copiedCcav ? 'Copied to Clipboard' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="bg-[#050706] border border-neutral-800/80 rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs font-mono text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {generateCcavPrompt()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. Interactive Feature: 1-Click Diagnostic Runbook Resolver
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-[#141715] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div>
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-semibold mb-1">
                07. Instant Runbook Resolver
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Troubleshooting Triage (26 Verified Runbooks)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Click any common setup symptom below to inspect the verified root cause and copy the 10-second terminal fix.
              </p>
            </div>

            <button
              onClick={() => onSelectTab('troubleshooting')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5 cursor-pointer px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition-colors"
            >
              <span>Launch Full Diagnostic Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Symptom List */}
            <div className="lg:col-span-5 space-y-2">
              {triageIssues.map((issue, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTriageIssue(idx);
                    playClickSound(650, 0.03);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedTriageIssue === idx
                      ? 'border-amber-500 bg-amber-950/30 shadow-xs'
                      : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850'
                  }`}
                >
                  <div className="font-semibold text-xs text-neutral-200">
                    {issue.title}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5 font-mono">
                    {issue.symptom}
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Instant Fix Detail */}
            <div className="lg:col-span-7 bg-[#0b0e0c] border border-neutral-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 font-semibold uppercase">
                    Root Cause Diagnosis
                  </span>
                  <button
                    onClick={() => onNavigateChapter(triageIssues[selectedTriageIssue].chapter)}
                    className="text-xs text-emerald-400 hover:underline font-mono flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Handbook Chapter</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-white">
                  {triageIssues[selectedTriageIssue].title}
                </h3>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-neutral-400 font-semibold">Symptom: </span>
                    <span className="text-neutral-300 font-mono">
                      {triageIssues[selectedTriageIssue].symptom}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-semibold">Technical Cause: </span>
                    <span className="text-neutral-300">
                      {triageIssues[selectedTriageIssue].cause}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified 10-Second Terminal Fix:</span>
                  </div>
                  <div className="bg-[#060807] border border-neutral-800 rounded-lg p-3 flex items-center justify-between gap-3">
                    <code className="text-xs font-mono text-emerald-300 overflow-x-auto">
                      {triageIssues[selectedTriageIssue].fixCommand}
                    </code>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(triageIssues[selectedTriageIssue].fixCommand, 'triage_fix')
                      }
                      className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-mono flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                    >
                      {copiedStep === 'triage_fix' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                      <span>{copiedStep === 'triage_fix' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 font-mono border-t border-neutral-800/80 pt-3">
                &bull; Full step-by-step resolution available in the Diagnostic Wizard tab.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. Interactive Feature: Peek Inside Modal (Multi-Page Reader)
          ───────────────────────────────────────────────────────────── */}
      {isPeekModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121513] border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-white">
                  Handbook Excerpt Reader &bull; Page {peekPage} of 4
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPeekModalOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Page Navigation Tabs */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { page: 1, label: 'Page 1: ₹0 Invariant' },
                { page: 2, label: 'Page 2: Ollama 64K' },
                { page: 3, label: 'Page 3: LiteLLM Router' },
                { page: 4, label: 'Page 4: CCAV Prompts' },
              ].map((tab) => (
                <button
                  key={tab.page}
                  onClick={() => {
                    setPeekPage(tab.page);
                    playClickSound(700, 0.03);
                  }}
                  className={`p-2 rounded-lg border text-center cursor-pointer transition-colors ${
                    peekPage === tab.page
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Excerpt Body */}
            <div className="bg-[#0a0c0b] border border-neutral-800 p-5 rounded-xl text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed max-h-80 overflow-y-auto">
              {peekPage === 1 && (
                <div className="space-y-3">
                  <div className="text-emerald-400 font-bold">Chapter 1 &bull; The Architecture of Autonomy at Zero Cost</div>
                  <p>
                    Autonomous AI coding agents present a paradox in 2026: while their software capability has reached junior-to-mid engineering parity, their operating economics have become prohibitive. A standard Claude 3.7 Sonnet session running an agentic loop consumes approximately 80,000 to 250,000 tokens per complex bug fix. At $3.00 per million input tokens and $15.00 per million output tokens, a single workday costs $15 to $45 USD (<span className="font-sans">₹</span>1,250 to <span className="font-sans">₹</span>3,750 INR).
                  </p>
                  <p className="text-neutral-400">
                    The core invariant of this handbook is simple: <strong>Zero Cost (<span className="font-sans">₹0.00</span>) is defined as zero expenditure on software licenses, zero cloud API fees, and zero hosting subscriptions</strong> over the infinite life of your development workflow.
                  </p>
                </div>
              )}
              {peekPage === 2 && (
                <div className="space-y-3">
                  <div className="text-emerald-400 font-bold">Chapter 6 &bull; Ollama 64K KV Cache Quantization</div>
                  <p>
                    By default, Ollama initializes models with a 2,048-token context window. For an autonomous coding agent, 2,048 tokens is exhausted before the system prompt, directory tree, and first source file are ingested.
                  </p>
                  <p className="text-neutral-400">
                    To enable true 64K context on consumer hardware (e.g. 16GB RAM or 8GB VRAM), we enforce 8-bit KV cache quantization (q8_0) in conjunction with Qwen 2.5 Coder 7B, reducing memory pressure from 18.4GB to 5.8GB without degradation in code AST comprehension.
                  </p>
                </div>
              )}
              {peekPage === 3 && (
                <div className="space-y-3">
                  <div className="text-emerald-400 font-bold">Chapter 10 &bull; The LiteLLM Zero-Cost Routing Pattern</div>
                  <p>
                    The official Anthropic Claude Code CLI relies on the Anthropic Messages API format (/v1/messages). LiteLLM functions as a high-performance protocol adapter running on loopback (127.0.0.1:4000).
                  </p>
                  <p className="text-neutral-400">
                    When Claude Code initiates a message, LiteLLM intercepts the payload, maps tool calls and JSON schemas to Google Gemini API specifications, and dispatches the request to Google AI Studio's 1,500 free daily requests pool.
                  </p>
                </div>
              )}
              {peekPage === 4 && (
                <div className="space-y-3">
                  <div className="text-emerald-400 font-bold">Chapter 15 &bull; The CCAV Prompt Engineering Framework</div>
                  <p>
                    Unconstrained prompts fail on free models. The CCAV framework enforces:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 text-neutral-400">
                    <li><strong className="text-neutral-200">Context:</strong> Current project AST, exact file paths, reproduction steps.</li>
                    <li><strong className="text-neutral-200">Constraints:</strong> No breaking changes, zero additional dependencies, strict TypeScript.</li>
                    <li><strong className="text-neutral-200">Action:</strong> Single atomic edit block or test case creation.</li>
                    <li><strong className="text-neutral-200">Verification:</strong> Exact test command to execute and assert truth before exit.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Footer with Page Turners */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={peekPage <= 1}
                  onClick={() => {
                    setPeekPage((p) => Math.max(1, p - 1));
                    playClickSound(600, 0.03);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-neutral-200 text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Page</span>
                </button>
                <button
                  type="button"
                  disabled={peekPage >= 4}
                  onClick={() => {
                    setPeekPage((p) => Math.min(4, p + 1));
                    playClickSound(750, 0.03);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-neutral-200 text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsPeekModalOpen(false);
                  if (peekPage === 1) onNavigateChapter('chapter-1');
                  else if (peekPage === 2) onNavigateChapter('chapter-6');
                  else if (peekPage === 3) onNavigateChapter('chapter-10');
                  else if (peekPage === 4) onNavigateChapter('chapter-15');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Read Full Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          10. Curriculum Explorer (The 24 Chapters)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold mb-1">
              08. Master Curriculum
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The 24 Chapters &bull; Complete Master Reference
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Browse all chapters, deep architectural breakdowns, and reference appendices.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={curriculumSearch}
              onChange={(e) => setCurriculumSearch(e.target.value)}
              placeholder="Filter chapters by title..."
              className="w-full bg-[#121513] border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-emerald-500 placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Part Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'all', label: 'All 35 Sections' },
            { id: 'foundations', label: 'Part I: Foundations' },
            { id: 'setups', label: 'Part II: Setups' },
            { id: 'projects', label: 'Part III: Projects' },
            { id: 'discipline', label: 'Part IV: Discipline' },
            { id: 'reference', label: 'Part V: Appendices' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setCurriculumPartFilter(tab.id);
                playClickSound(600, 0.02);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                curriculumPartFilter === tab.id
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-850'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChapters.slice(0, 12).map((chapter) => (
            <div
              key={chapter.slug}
              onClick={() => onNavigateChapter(chapter.slug)}
              className="p-5 rounded-xl border border-neutral-800 bg-[#141715] hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="text-emerald-400">{chapter.part}</span>
                  <span>{chapter.readingTimeMinutes} min read</span>
                </div>
                <h3 className="font-bold text-sm text-neutral-100 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {chapter.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {chapter.purpose || chapter.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{chapter.sections.length} Sections</span>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  <span>Read Chapter</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredChapters.length > 12 && (
          <div className="text-center pt-2">
            <button
              onClick={onStartReading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              <span>View All 35 Documentation Chapters in Reader</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. Publication Disclaimer Footer
          ───────────────────────────────────────────────────────────── */}
      <footer className="max-w-4xl mx-auto px-4 pt-10 border-t border-neutral-800 text-xs text-neutral-400 text-center space-y-2">
        <p>
          <strong>Independent Publication Disclaimer:</strong> This documentation platform and the underlying handbook are an independent educational engineering publication and are not affiliated with, endorsed by, sponsored by, or officially approved by Anthropic PBC, Google LLC, Microsoft Corporation, GitHub Inc., OpenRouter Inc., Ollama Inc., or any other commercial entity.
        </p>
        <p className="font-mono text-[11px] text-neutral-400">
          Document ID: TECH-HB-CC0-2026-V1 &bull; First Complete Reference Edition &bull; Verified October 2026
        </p>
      </footer>
    </div>
  );
};
