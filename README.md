# Claude Code at ₹0 — Complete Handbook

An interactive technical documentation platform for **Claude Code at ₹0: The Complete AI Coding Agent Handbook**. The site organizes practical guidance on low-cost AI coding workflows, local models, open-source alternatives, and deployment into a searchable, chapter-based learning experience.

> This repository contains the website implementation and its handbook content. Check provider pricing, model availability, and usage limits before relying on any workflow described as free.

## Features

- **Chapter-based handbook** with navigation, section links, and previous/next chapter controls.
- **Global documentation search** with the `Ctrl+K` / `⌘K` keyboard shortcut.
- **Reading progress and bookmarks** saved in the browser's local storage.
- **Interactive practical projects and labs** for hands-on learning.
- **Troubleshooting wizard** with guided diagnostic runbooks.
- **Prompt library** for reusable coding-agent prompts.
- **Model compatibility matrix** for comparing cloud and local model options.
- **CLI command and keyboard-shortcut reference.**
- **FAQ, privacy policy, legal disclaimer, and contact pages.**
- **Responsive interface** with a dark theme and mobile navigation.

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) for icons
- [Motion](https://motion.dev/) for animations
- [Google Gen AI SDK](https://github.com/googleapis/js-genai) for Gemini-powered functionality
- [Express](https://expressjs.com/) for server-side functionality

## Getting started

### Prerequisites

- Node.js **22 or newer** (use a version supported by the installed Vite release).
- A package manager: **Bun** is recommended because the repository includes `bun.lock`; npm can also be used.

### 1. Clone the repository

```bash
git clone https://github.com/akhilalladi-code/claude-code-at-zero-cost.git
cd claude-code-at-zero-cost
```

### 2. Install dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` (or to the environment file used by your deployment) and set the values required for your environment.

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | API key for Gemini-powered server-side functionality. Keep it private. |
| `APP_URL` | Base URL of the deployed application when the server-side flow requires it. |

For local development, use a valid Gemini API key if you plan to use features that call the Gemini API. Google AI Studio may inject configured secrets automatically when running in its hosted environment.

**Security:** Never commit real API keys, tokens, passwords, or production secrets. The `.env.example` file contains placeholders only.

### 4. Start the development server

Using Bun:

```bash
bun run dev
```

Or using npm:

```bash
npm run dev
```

Vite starts the development server on **http://localhost:3000**.

## Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` / `npm run dev` | Start the Vite development server on port 3000. |
| `bun run build` / `npm run build` | Build the production frontend into `dist/`. |
| `bun run preview` / `npm run preview` | Preview the production build locally. |
| `bun run lint` / `npm run lint` | Run TypeScript checks with `tsc --noEmit`. |
| `bun run test` / `npm test` | Run the configured logic and search/manifest tests. |

Run a production build before deploying:

```bash
npm run lint
npm test
npm run build
```

If a command fails, check the error output and confirm that your Node.js version and dependencies meet the project requirements.

## Project structure

```text
.
├── .aistudio/          # Google AI Studio project artifacts/configuration
├── public/             # Static public assets
├── src/
│   ├── components/     # UI, handbook views, search, labs and reference pages
│   ├── data/            # Handbook chapters, appendices and structured content
│   ├── lib/             # Search and supporting utilities
│   ├── tests/           # Logic and search/manifest tests
│   ├── types/           # TypeScript types
│   ├── App.tsx          # Main application and navigation state
│   ├── index.css        # Global styles
│   └── main.tsx         # React entry point
├── .env.example        # Example environment variables (placeholders only)
├── index.html          # HTML entry point
├── package.json        # Scripts and dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Using the handbook

1. Open the homepage and start reading the handbook.
2. Browse chapters through the documentation sidebar.
3. Use the search dialog to find topics quickly (`Ctrl+K` on Windows/Linux or `⌘K` on macOS).
4. Bookmark chapters and mark them as completed. These preferences are stored locally in your browser.
5. Explore the prompt library, model matrix, command reference, practical labs, troubleshooting wizard, and FAQ.

## Deployment

The frontend can be built with `npm run build` or `bun run build`; the generated static assets are written to `dist/`.

If deploying to a static host, verify whether any server-side Gemini/API functionality is required. Features that need secrets or server endpoints must be deployed with the appropriate backend/runtime and environment variables; do not expose API keys in client-side code. Configure `APP_URL` to match the deployment URL if required by the server-side implementation.

## Testing and quality checks

Run the project's configured checks before submitting changes:

```bash
npm run lint
npm test
npm run build
```

These commands check TypeScript, run the available automated tests, and build the frontend. They do not replace browser-based testing of navigation, responsive layouts, search, bookmarks, and any API-backed features.

## Contributing

Contributions and corrections are welcome.

1. Fork the repository.
2. Create a branch for your change.
3. Make focused changes and run the checks above.
4. Open a pull request describing the change and any relevant testing.

For changes to handbook content, keep technical instructions accurate and identify details that may change over time, such as pricing, quotas, model names, and provider policies.

## License

The source files include Apache License 2.0 SPDX identifiers. Before redistributing the project, review the repository's licensing files and any third-party asset or content licenses.

## Author

Created by **Akhil Alladi**.

- GitHub: [@akhilalladi-code](https://github.com/akhilalladi-code)
- Repository: [claude-code-at-zero-cost](https://github.com/akhilalladi-code/claude-code-at-zero-cost)
