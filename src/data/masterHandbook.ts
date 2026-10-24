/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Master Handbook Hub: Bundles all chapters, appendices, metadata, and search documents
 */

import { Chapter } from '../types/handbook';
import { CHAPTERS_DATA as PART_1_CHAPTERS } from './chaptersData';
import { PART_2_CHAPTERS } from './chapters/part2';
import { PART_3_CHAPTERS } from './chapters/part3';
import { PART_4_CHAPTERS } from './chapters/part4';
import { PART_5_CHAPTERS } from './chapters/part5';
import { APPENDICES_DATA } from './appendicesData';
import { SearchDocument } from '../lib/searchEngine';
import { TROUBLESHOOTING_DATA } from './troubleshootingData';
import { PROMPTS_DATA } from './promptsData';
import { COMMANDS_DATA } from './commandsData';
import { MODELS_DATA } from './modelsData';

export const ALL_DOCS: Chapter[] = [
  ...PART_1_CHAPTERS,
  ...PART_2_CHAPTERS,
  ...PART_3_CHAPTERS,
  ...PART_4_CHAPTERS,
  ...PART_5_CHAPTERS,
  ...APPENDICES_DATA,
];

export const CHAPTER_BY_SLUG = new Map<string, Chapter>();
ALL_DOCS.forEach((ch) => {
  CHAPTER_BY_SLUG.set(ch.slug, ch);
});

export function getChapterBySlug(slug: string): Chapter | undefined {
  return CHAPTER_BY_SLUG.get(slug);
}

/**
 * Builds the comprehensive full-text search document catalog
 */
export function buildSearchIndex(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  // Index all chapters and subsections
  for (const ch of ALL_DOCS) {
    const isAppendix = ch.part.includes('Appendices');
    const category = isAppendix ? 'Appendix' : 'Chapter';

    // Index chapter level
    docs.push({
      id: ch.id,
      title: ch.title,
      category,
      route: `/docs/${ch.slug}`,
      sourcePage: ch.sourcePageRange,
      content: `${ch.subtitle || ''} ${ch.purpose} ${ch.keyTerminology?.join(' ') || ''} ${ch.practicalOutcome || ''}`,
      keywords: ch.keyTerminology,
    });

    // Index sections
    for (const sec of ch.sections) {
      const codeText = sec.codeSnippets
        ? sec.codeSnippets
            .map(
              (s) =>
                `${s.filename || ''} ${s.environment || ''} ${s.language || ''} ${s.code} ${s.explanation || ''} ${s.expectedOutput || ''}`
            )
            .join(' ')
        : '';
      const tableText = sec.tables
        ? sec.tables
            .map(
              (t) =>
                `${t.title} ${t.caption || ''} ${t.columns.map((c) => c.header).join(' ')} ${t.rows
                  .map((r) => Object.values(r).join(' '))
                  .join(' ')}`
            )
            .join(' ')
        : '';
      const calloutText = sec.callouts
        ? sec.callouts.map((c) => `${c.type} ${c.title || ''} ${c.content}`).join(' ')
        : '';

      const snippetFilenames = sec.codeSnippets
        ? (sec.codeSnippets.map((s) => s.filename).filter(Boolean) as string[])
        : [];

      docs.push({
        id: `${ch.id}-${sec.id}`,
        title: `${ch.title}: ${sec.title}`,
        category,
        route: `/docs/${ch.slug}`,
        anchor: sec.id,
        sourcePage: ch.sourcePageRange,
        content: `${sec.content.join(' ')} ${codeText} ${tableText} ${calloutText}`,
        keywords: [ch.title, sec.title, ...snippetFilenames],
      });
    }
  }

  // Index all 26 troubleshooting issues
  for (const item of TROUBLESHOOTING_DATA) {
    docs.push({
      id: `ts-${item.issueNumber}`,
      title: `Issue ${item.issueNumber}: ${item.title}`,
      category: 'Troubleshooting',
      route: `/docs/troubleshooting`,
      anchor: `issue-${item.issueNumber}`,
      sourcePage: item.pageRef,
      content: `Symptoms: ${item.symptoms}. Causes: ${item.likelyCauses.join(' ')}. Verification: ${item.verificationCheckpoint}. Category: ${item.category}`,
      keywords: [item.category, item.issueNumber, 'error', 'runbook', 'diagnostic'],
    });
  }

  // Index all 35 CCAV prompts
  for (const p of PROMPTS_DATA) {
    docs.push({
      id: `prompt-${p.code.toLowerCase()}`,
      title: `${p.code}: ${p.title}`,
      category: 'Prompt',
      route: `/docs/prompts`,
      anchor: p.code.toLowerCase(),
      sourcePage: '110-111',
      content: `${p.prompt} Context: ${p.context}. Constraint: ${p.constraint}. Action: ${p.action}. Target agents: ${p.targetAgents.join(' ')}`,
      keywords: [p.code, p.category, ...p.targetAgents],
    });
  }

  // Index commands
  for (const cmd of COMMANDS_DATA) {
    docs.push({
      id: `cmd-${cmd.id}`,
      title: `${cmd.utility.toUpperCase()}: ${cmd.command}`,
      category: 'Command',
      route: `/docs/commands`,
      anchor: cmd.id,
      sourcePage: cmd.pageRef,
      content: `${cmd.purpose} Risk: ${cmd.riskNote}. OS: ${cmd.os}`,
      keywords: [cmd.utility, cmd.os, 'cli', 'command'],
    });
  }

  // Index models
  for (const m of MODELS_DATA) {
    docs.push({
      id: `model-${m.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: `Model: ${m.name} (${m.provider})`,
      category: 'Chapter',
      route: `/docs/models`,
      sourcePage: '109',
      content: `Context: ${m.contextWindow}. Hardware: ${m.minHardware}. Cost: ${m.costModel}. Suitability: ${m.toolUseSuitability}. Role: ${m.recommendedRole}`,
      keywords: [m.provider, m.license, 'model', 'gguf', 'llm'],
    });
  }

  return docs;
}
