/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapter 13 & Chapter 17: Indian Rupee (₹) Financial Arithmetic & Validation Engine
 */

export const VALID_CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Coding/Tech',
  'Healthcare',
  'Other',
] as const;

export type ExpenseCategory = typeof VALID_CATEGORIES[number];

export interface ExpenseRecord {
  id: string;
  title: string;
  category: ExpenseCategory;
  amountPaise: number;
  date: string;
}

export interface ExpenseInput {
  id?: string;
  title?: unknown;
  category?: unknown;
  amount?: unknown;
  date?: unknown;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  record?: ExpenseRecord;
}

export interface ExpenseSummary {
  filteredRecords: ExpenseRecord[];
  count: number;
  totalPaise: number;
  totalFormatted: string;
  byCategoryPaise: Record<string, number>;
}

/**
 * Converts decimal Rupees into integer Paise (1 Rupee = 100 Paise).
 * Eliminates IEEE-754 floating point rounding drift.
 * Handles space-padded inputs, commas, and optional currency symbols (₹/Rs) per Chapter 17.3 TDD specs.
 */
export function toPaise(rupeeAmount: unknown): number {
  if (typeof rupeeAmount === 'string') {
    // Strip currency symbols, commas, and whitespace
    const cleaned = rupeeAmount.replace(/[₹\s,]|Rs\.?/gi, '');
    const num = Number(cleaned);
    if (!Number.isFinite(num) || num <= 0 || num > 100000000) {
      throw new RangeError('Amount must be a positive number up to ₹10,00,00,000.');
    }
    return Math.round(num * 100);
  }

  const num = Number(rupeeAmount);
  if (!Number.isFinite(num) || num <= 0 || num > 100000000) {
    throw new RangeError('Amount must be a positive number up to ₹10,00,00,000.');
  }
  return Math.round(num * 100);
}

/**
 * Formats integer Paise as an Indian Rupee string using en-IN lakh/crore grouping.
 */
export function formatINR(paise: number): string {
  if (!Number.isInteger(paise)) {
    throw new TypeError('formatINR expects an integer paise value.');
  }
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rupees);
}

/**
 * Validates an expense payload before storage.
 */
export function validateExpense(input: ExpenseInput): ValidationResult {
  if (!input || typeof input !== 'object') {
    return { valid: false, error: 'Invalid expense payload.' };
  }
  const title = String(input.title || '').trim();
  if (title.length < 2 || title.length > 80) {
    return { valid: false, error: 'Title must be between 2 and 80 characters.' };
  }
  const category = String(input.category || '') as ExpenseCategory;
  if (!VALID_CATEGORIES.includes(category)) {
    return {
      valid: false,
      error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
    };
  }

  let amountPaise = 0;
  try {
    amountPaise = toPaise(input.amount);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { valid: false, error: message };
  }

  const rawDate = typeof input.date === 'string' ? input.date.trim() : '';
  const dateStr = /^\d{4}-\d{2}-\d{2}$/.test(rawDate)
    ? rawDate
    : new Date().toISOString().slice(0, 10);

  return {
    valid: true,
    record: {
      id: input.id || `exp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title,
      category,
      amountPaise,
      date: dateStr,
    },
  };
}

/**
 * Summarizes an array of expense records with category totals and filtering.
 */
export function summarizeExpenses(
  records: ExpenseRecord[] | null | undefined,
  categoryFilter?: string | null
): ExpenseSummary {
  const activeFilter =
    categoryFilter && categoryFilter !== 'ALL' ? categoryFilter : null;
  const filtered: ExpenseRecord[] = [];
  let totalPaise = 0;
  const byCategoryPaise: Record<string, number> = {};

  for (const cat of VALID_CATEGORIES) {
    byCategoryPaise[cat] = 0;
  }

  for (const rec of records || []) {
    if (!rec || !Number.isInteger(rec.amountPaise)) continue;
    byCategoryPaise[rec.category] =
      (byCategoryPaise[rec.category] || 0) + rec.amountPaise;
    if (!activeFilter || rec.category === activeFilter) {
      filtered.push(rec);
      totalPaise += rec.amountPaise;
    }
  }

  return {
    filteredRecords: filtered,
    count: filtered.length,
    totalPaise,
    totalFormatted: formatINR(totalPaise),
    byCategoryPaise,
  };
}
