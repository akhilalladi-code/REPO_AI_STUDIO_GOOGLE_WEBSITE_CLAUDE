/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Comprehensive Unit Tests for Core Handbook Logic Engines
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { toPaise, formatINR, validateExpense, summarizeExpenses } from '../lib/rupeeLogic';
import { isValidGSTIN, calculateInvoiceLine } from '../lib/gstLogic';
import { createBoard, addTask, moveTask, recordPomodoro } from '../lib/kanbanLogic';
import { formatAndValidateJson, decodeJwtUnverified, evaluateRegex } from '../lib/devUtilitiesLogic';

// -------------------------------------------------------------
// Test Suite 1: Chapter 13 & 17 — RupeeTrack Currency Precision
// -------------------------------------------------------------

test('RupeeTrack: exact paise conversion and formatting', () => {
  assert.equal(toPaise(199.5), 19950);
  assert.equal(toPaise('450.25'), 45025);
  assert.equal(toPaise('₹1,200.50'), 120050); // TDD Prompt P17 requirement
  assert.equal(toPaise(' 499.50 '), 49950); // Leading/trailing whitespace
  assert.equal(toPaise('Rs 99.00'), 9900);

  // Formatting check
  const formatted = formatINR(184975);
  assert.ok(formatted.includes('1,849.75'));
});

test('RupeeTrack: validation and bounds checking', () => {
  const validExp = validateExpense({
    title: 'Broadband Fiber',
    amount: 1499.0,
    category: 'Utilities',
    date: '2026-10-24',
  });
  assert.equal(validExp.valid, true);
  assert.equal(validExp.record?.amountPaise, 149900);

  // Negative amount rejected
  const negExp = validateExpense({ title: 'Invalid', amount: -50, category: 'Food' });
  assert.equal(negExp.valid, false);

  // Missing or short title rejected
  const shortTitle = validateExpense({ title: 'A', amount: 100, category: 'Food' });
  assert.equal(shortTitle.valid, false);

  // Invalid category rejected
  const badCat = validateExpense({ title: 'Coffee', amount: 100, category: 'Gambling' });
  assert.equal(badCat.valid, false);
});

test('RupeeTrack: summary calculations and category filtering', () => {
  const r1 = validateExpense({ title: 'Jio Fiber', amount: '199.50', category: 'Utilities', date: '2026-10-24' }).record!;
  const r2 = validateExpense({ title: 'Metro Pass', amount: '450.25', category: 'Transport', date: '2026-10-24' }).record!;
  const r3 = validateExpense({ title: 'NVMe SSD Case', amount: '1200.00', category: 'Coding/Tech', date: '2026-10-24' }).record!;

  const summary = summarizeExpenses([r1, r2, r3], 'ALL');
  assert.equal(summary.count, 3);
  assert.equal(summary.totalPaise, 184975); // 19950 + 45025 + 120000 = 184975 exactly!
  assert.ok(summary.totalFormatted.includes('1,849.75'));

  const utilSummary = summarizeExpenses([r1, r2, r3], 'Utilities');
  assert.equal(utilSummary.count, 1);
  assert.equal(utilSummary.totalPaise, 19950);
});

// -------------------------------------------------------------
// Test Suite 2: Chapter 23 — Indian GST Tax Calculation Engine
// -------------------------------------------------------------

test('GST Engine: GSTIN Regex format validation', () => {
  assert.equal(isValidGSTIN('36ABCDE1234F1Z5'), true); // Valid Telangana
  assert.equal(isValidGSTIN('27AAPFU0939F1ZV'), true); // Valid Maharashtra
  assert.equal(isValidGSTIN('36ABCDE1234F1Z'), false); // 14 chars (invalid)
  assert.equal(isValidGSTIN('99123451234F1Z5'), false); // Invalid PAN segment
  assert.equal(isValidGSTIN(''), false);
});

test('GST Engine: Intra-State 18% GST (9% CGST + 9% SGST)', () => {
  const intra = calculateInvoiceLine(10000, 1, 18, 'INTRA');
  assert.equal(intra.taxablePaise, 1000000);
  assert.equal(intra.cgstPaise, 90000); // ₹900.00
  assert.equal(intra.sgstPaise, 90000); // ₹900.00
  assert.equal(intra.igstPaise, 0);
  assert.equal(intra.grandTotalPaise, 1180000); // ₹11,800.00
});

test('GST Engine: Inter-State 18% IGST on multi-unit item', () => {
  const inter = calculateInvoiceLine(2500.5, 2, 18, 'INTER');
  assert.equal(inter.taxablePaise, 500100); // ₹5,001.00
  assert.equal(inter.igstPaise, 90018); // ₹900.18
  assert.equal(inter.grandTotalPaise, 590118); // ₹5,901.18
});

// -------------------------------------------------------------
// Test Suite 3: Chapter 14.2 — Kanban Board & WIP Limit Invariant
// -------------------------------------------------------------

test('Kanban Engine: Task addition and WIP limit enforcement', () => {
  let board = createBoard(3);
  board = addTask(board, 'Task 1', 'High');
  board = addTask(board, 'Task 2', 'Medium');
  board = addTask(board, 'Task 3', 'Low');
  board = addTask(board, 'Task 4', 'Medium');

  const id1 = board.tasks[0].id;
  const id2 = board.tasks[1].id;
  const id3 = board.tasks[2].id;
  const id4 = board.tasks[3].id;

  // Move 3 tasks to 'In Progress'
  board = moveTask(board, id1, 'In Progress');
  board = moveTask(board, id2, 'In Progress');
  board = moveTask(board, id3, 'In Progress');

  // Attempting to move 4th task must throw WIP limit error!
  assert.throws(
    () => moveTask(board, id4, 'In Progress'),
    /WIP Limit Reached/
  );

  // Completing a pomodoro
  board = recordPomodoro(board, id1);
  assert.equal(board.tasks.find((t) => t.id === id1)?.completedPomodoros, 1);
});

// -------------------------------------------------------------
// Test Suite 4: Chapter 14.3 — Developer Utilities
// -------------------------------------------------------------

test('DevSwissKnife: JSON formatting and JWT decoding', () => {
  const jsonTest = formatAndValidateJson('{"name": "Claude Code", "cost": 0}');
  assert.equal(jsonTest.valid, true);
  assert.equal(jsonTest.keysCount, 2);

  const badJson = formatAndValidateJson('{invalid: json}');
  assert.equal(badJson.valid, false);

  // JWT test: test token header.payload.signature
  const headerB64 = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payloadB64 = Buffer.from(JSON.stringify({ sub: 'user_123', exp: 9999999999 })).toString('base64url');
  const sampleJwt = `${headerB64}.${payloadB64}.testSignature`;

  const jwtRes = decodeJwtUnverified(sampleJwt);
  assert.equal(jwtRes.payload.sub, 'user_123');
  assert.equal(jwtRes.isExpired, false);

  // Regex testing
  const regexRes = evaluateRegex('(\\w+)@(\\w+\\.\\w+)', 'g', 'Contact us at test@example.com and dev@local.in');
  assert.equal(regexRes.valid, true);
  assert.equal(regexRes.count, 2);
});
