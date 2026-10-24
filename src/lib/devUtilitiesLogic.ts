/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapter 14.3: Zero-Dependency Developer Utilities (DevSwissKnife)
 */

export interface JsonValidationResult {
  valid: boolean;
  formatted?: string;
  keysCount?: number;
  error?: string;
}

export function formatAndValidateJson(rawJson: string, indent = 2): JsonValidationResult {
  try {
    const parsed = JSON.parse(rawJson);
    return {
      valid: true,
      formatted: JSON.stringify(parsed, null, indent),
      keysCount: Object.keys(parsed || {}).length,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { valid: false, error: message };
  }
}

export interface JwtDecodeResult {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  isExpired: boolean | null;
}

export function decodeJwtUnverified(token: string): JwtDecodeResult {
  const parts = String(token || '').trim().split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format: expected 3 dot-separated Base64Url segments.');
  }

  const decodeSegment = (seg: string) => {
    let base64 = seg.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    // Cross-environment Base64 decoding (Browser atob or Node Buffer)
    const jsonStr = typeof atob === 'function'
      ? decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      : Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(jsonStr);
  };

  const header = decodeSegment(parts[0]);
  const payload = decodeSegment(parts[1]);
  const nowSec = Math.floor(Date.now() / 1000);
  const isExpired = typeof payload.exp === 'number' ? payload.exp < nowSec : null;

  return { header, payload, isExpired };
}

export interface RegexMatchResult {
  valid: boolean;
  count: number;
  matches: { match: string; index?: number; groups?: (string | undefined)[] }[];
  error?: string;
}

export function evaluateRegex(pattern: string, flags: string, sampleText: string): RegexMatchResult {
  try {
    const re = new RegExp(pattern, flags);
    const matches: { match: string; index?: number; groups?: (string | undefined)[] }[] = [];
    if (flags.includes('g')) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(sampleText)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      const m = re.exec(sampleText);
      if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
    }
    return { valid: true, count: matches.length, matches };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { valid: false, count: 0, matches: [], error: message };
  }
}
