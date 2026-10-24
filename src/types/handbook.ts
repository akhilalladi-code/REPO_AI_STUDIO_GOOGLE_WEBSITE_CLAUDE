/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CalloutType =
  | 'NOTE'
  | 'TIP'
  | 'WARNING'
  | 'IMPORTANT'
  | 'COST ALERT'
  | 'SECURITY ALERT'
  | 'VERIFICATION'
  | 'COMPATIBILITY';

export type VerificationBadge =
  | 'Verified from official documentation'
  | 'Tested successfully'
  | 'Community-reported'
  | 'Partially verified'
  | 'Not independently tested'
  | 'Outdated or unsupported';

export interface Callout {
  type: CalloutType;
  title?: string;
  badge?: VerificationBadge;
  content: string;
}

export interface CodeSnippet {
  language: string;
  filename?: string;
  environment?: 'PowerShell' | 'Bash' | 'Termux Bash' | 'Node.js' | 'YAML' | 'JSON' | 'Python' | 'HTML' | 'CSS' | 'Text';
  code: string;
  expectedOutput?: string;
  explanation?: string;
}

export interface TableColumn {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  isNumeric?: boolean;
}

export interface HandbookTable {
  id: string;
  title: string;
  caption?: string;
  pageRef?: number;
  columns: TableColumn[];
  rows: Record<string, string | number | boolean>[];
}

export interface HandbookFigure {
  id: string;
  number: string;
  title: string;
  pageRef: number;
  type: 'diagram' | 'flowchart' | 'hierarchy' | 'pipeline';
  description: string;
  svgData?: string; // Built-in accessible SVG visual
}

export interface SubSection {
  id: string;
  title: string;
  content: string[]; // Paragraphs / markdown
  callouts?: Callout[];
  codeSnippets?: CodeSnippet[];
  tables?: HandbookTable[];
  figures?: HandbookFigure[];
}

export interface Chapter {
  id: string;
  slug: string;
  part: 'Front Matter' | 'Part I: Foundations' | 'Part II: Setups & Platforms' | 'Part III: Practical Projects' | 'Part IV: Engineering Discipline' | 'Part V: Appendices & Reference';
  number: number | string; // e.g. 1, 2, "0.1", "A"
  title: string;
  subtitle?: string;
  purpose: string;
  learningObjectives?: string[];
  prerequisites?: string;
  readingTimeMinutes: number;
  difficulty: 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Intermediate to Advanced' | 'Advanced' | 'All Levels' | 'Progressive';
  keyTerminology?: string[];
  practicalOutcome?: string;
  sourcePageRange: string;
  sections: SubSection[];
  prevSlug?: string;
  nextSlug?: string;
}

export interface TroubleshootingItem {
  issueNumber: string;
  title: string;
  category: 'Installation & PATH' | 'Authentication & Gateway' | 'Rate Limits & OOM' | 'Android & Termux' | 'Permissions & Security' | 'Git & Deployment';
  symptoms: string;
  likelyCauses: string[];
  diagnosticCommand: {
    shell: string;
    command: string;
    note?: string;
  };
  correctiveSteps: {
    description: string;
    code?: string;
    language?: string;
  }[];
  verificationCheckpoint: string;
  whenToSwitch?: string;
  pageRef: number;
}

export interface PromptItem {
  id: string;
  code: string; // e.g. P01
  title: string;
  category: string;
  prompt: string;
  context: string;
  constraint: string;
  action: string;
  verification: string;
  targetAgents: string[];
}

export interface ModelSpec {
  name: string;
  provider: string;
  license: string;
  contextWindow: string;
  minHardware: string;
  costModel: string;
  toolUseSuitability: string;
  verificationDate: string;
  verificationBadge: VerificationBadge;
  recommendedRole: string;
}

export interface SourceReference {
  id: number;
  title: string;
  url: string;
  category?: string;
  note?: string;
}

export interface ContentManifestRecord {
  id: string;
  sourcePage: string;
  originalHeading: string;
  contentType: 'Front Matter' | 'Chapter' | 'Appendix' | 'Table' | 'Figure' | 'Source Directory' | 'Index';
  destinationUrl: string;
  extractionStatus: '100% Extracted';
  implementationStatus: 'Complete';
  sourceComparisonStatus: 'Verified against PDF';
  verificationStatus: VerificationBadge;
  notes?: string;
}
