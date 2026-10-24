/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Unit test for search engine, master handbook coverage, and manifest completeness
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_DOCS, buildSearchIndex } from '../data/masterHandbook';
import { SearchEngine } from '../lib/searchEngine';
import { MANIFEST_RECORDS } from '../data/manifestData';
import { TROUBLESHOOTING_DATA } from '../data/troubleshootingData';
import { PROMPTS_DATA } from '../data/promptsData';
import { MODELS_DATA } from '../data/modelsData';
import { SOURCES_DATA } from '../data/sourcesData';

test('Handbook Completeness: all 24 chapters + front matter + 10 appendices present', () => {
  // Front matter + 24 chapters + 10 appendices = 35 documents
  assert.equal(ALL_DOCS.length, 35, 'Must contain Front Matter + 24 Chapters + 10 Appendices');

  // Verify every chapter has valid slug, title, purpose, and non-empty sections
  const slugs = new Set<string>();
  for (const doc of ALL_DOCS) {
    assert.ok(doc.slug, `Doc ${doc.id} must have slug`);
    assert.ok(!slugs.has(doc.slug), `Duplicate slug detected: ${doc.slug}`);
    slugs.add(doc.slug);

    assert.ok(doc.title.length > 5, `Doc ${doc.slug} title too short`);
    assert.ok(doc.purpose.length > 10, `Doc ${doc.slug} purpose too short`);
    assert.ok(doc.sections.length > 0, `Doc ${doc.slug} has no sections`);
  }
});

test('Completeness Gate: 100% of required source items accounted for in manifest', () => {
  assert.ok(MANIFEST_RECORDS.length >= 35, 'Manifest must cover all primary source elements');

  const completeCount = MANIFEST_RECORDS.filter(
    (r) => r.extractionStatus === '100% Extracted' && r.implementationStatus === 'Complete'
  ).length;

  const percentage = Math.round((completeCount / MANIFEST_RECORDS.length) * 100);
  assert.equal(percentage, 100, 'Content completeness gate must be exactly 100%');
});

test('Troubleshooting Encyclopedia: all 26 verified issues present with 6-part schema', () => {
  assert.equal(TROUBLESHOOTING_DATA.length, 26, 'Must contain exactly 26 runbooks');

  for (const issue of TROUBLESHOOTING_DATA) {
    assert.ok(issue.issueNumber, 'Issue must have number');
    assert.ok(issue.title, 'Issue must have title');
    assert.ok(issue.symptoms, 'Issue must have symptoms');
    assert.ok(issue.likelyCauses.length > 0, 'Issue must have causes');
    assert.ok(issue.diagnosticCommand.command, 'Issue must have diagnostic command');
    assert.ok(issue.correctiveSteps.length > 0, 'Issue must have corrective steps');
    assert.ok(issue.verificationCheckpoint, 'Issue must have verification checkpoint');
  }
});

test('Prompt Library: all 35 CCAV prompts present', () => {
  assert.equal(PROMPTS_DATA.length, 35, 'Must contain exactly 35 prompt templates');
  assert.equal(PROMPTS_DATA[0].code, 'P01');
  assert.equal(PROMPTS_DATA[34].code, 'P35');
});

test('Sources Directory: all 58 verified sources with URLs', () => {
  assert.equal(SOURCES_DATA.length, 58, 'Must contain all 58 verified primary sources');
  for (const src of SOURCES_DATA) {
    assert.ok(src.url.startsWith('https://'), `Source ${src.id} has invalid URL: ${src.url}`);
  }
});

test('Search Engine: indexing and querying known terms from handbook', () => {
  const docs = buildSearchIndex();
  assert.ok(docs.length > 50, 'Search index must contain docs across chapters, issues, prompts, etc.');

  const engine = new SearchEngine(docs);

  // Test 1: Search for output_config parameter scrubbing
  const res1 = engine.search('output_config');
  assert.ok(res1.length > 0, 'Must find results for output_config');
  assert.ok(res1.some((r) => r.document.title.includes('LiteLLM') || r.document.title.includes('output_config') || r.document.title.includes('400')));

  // Test 2: Search for 64K context window
  const res2 = engine.search('64K context');
  assert.ok(res2.length > 0, 'Must find results for 64K context');

  // Test 3: Search for GSTIN regex
  const res3 = engine.search('GSTIN');
  assert.ok(res3.length > 0, 'Must find results for GSTIN');

  // Test 4: Search for Android termux glibc
  const res4 = engine.search('glibc-runner');
  assert.ok(res4.length > 0, 'Must find results for glibc-runner');

  // Test 5: Empty search returns empty array
  assert.equal(engine.search('').length, 0);
});
