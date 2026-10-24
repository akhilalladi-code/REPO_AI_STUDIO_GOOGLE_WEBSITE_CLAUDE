/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapter 23: Indian GST & Integer-Paise Invoice Engine (ZeroCostInvoice)
 */

export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const ALLOWED_GST_RATES = [0, 5, 12, 18, 28] as const;
export type GSTRate = typeof ALLOWED_GST_RATES[number];
export type SupplyType = 'INTRA' | 'INTER';

export interface InvoiceLineResult {
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  totalTaxPaise: number;
  grandTotalPaise: number;
}

export function isValidGSTIN(gstin: unknown): boolean {
  return GSTIN_REGEX.test(String(gstin || '').trim().toUpperCase());
}

export function calculateInvoiceLine(
  unitPriceRupees: number | string,
  quantity: number | string,
  gstRatePercent: number | string,
  supplyType: SupplyType = 'INTRA'
): InvoiceLineResult {
  const qty = Number(quantity);
  const rate = Number(gstRatePercent);

  if (!Number.isFinite(qty) || qty <= 0) {
    throw new RangeError('Quantity must be positive.');
  }

  if (!ALLOWED_GST_RATES.includes(rate as GSTRate)) {
    throw new RangeError('GST rate must be one of standard slabs: 0, 5, 12, 18, or 28%.');
  }

  const unitPaise = Math.round(Number(unitPriceRupees) * 100);
  if (!Number.isFinite(unitPaise) || unitPaise < 0) {
    throw new RangeError('Invalid unit price.');
  }

  const taxablePaise = Math.round(unitPaise * qty);
  let cgstPaise = 0;
  let sgstPaise = 0;
  let igstPaise = 0;

  if (supplyType === 'INTRA') {
    // Split equally between Central GST (CGST) and State GST (SGST)
    cgstPaise = Math.round((taxablePaise * (rate / 2)) / 100);
    sgstPaise = cgstPaise;
  } else if (supplyType === 'INTER') {
    igstPaise = Math.round((taxablePaise * rate) / 100);
  } else {
    throw new Error("supplyType must be 'INTRA' or 'INTER'.");
  }

  const totalTaxPaise = cgstPaise + sgstPaise + igstPaise;
  const grandTotalPaise = taxablePaise + totalTaxPaise;

  return {
    taxablePaise,
    cgstPaise,
    sgstPaise,
    igstPaise,
    totalTaxPaise,
    grandTotalPaise,
  };
}
