/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * High-performance full-text search indexer and ranker
 */

export interface SearchDocument {
  id: string;
  title: string;
  category: 'Chapter' | 'Appendix' | 'Troubleshooting' | 'Prompt' | 'Command' | 'Glossary' | 'Project' | 'Config';
  route: string;
  anchor?: string;
  sourcePage?: string | number;
  content: string;
  keywords?: string[];
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  highlightedTitle: string;
  snippet: string;
  matchedTokens: string[];
}

export class SearchEngine {
  private docs: SearchDocument[] = [];
  private tokenIndex: Map<string, Set<number>> = new Map();

  constructor(docs: SearchDocument[] = []) {
    this.setDocuments(docs);
  }

  public setDocuments(docs: SearchDocument[]) {
    this.docs = docs;
    this.tokenIndex.clear();

    docs.forEach((doc, idx) => {
      const fullText = `${doc.title} ${doc.category} ${doc.keywords?.join(' ') || ''} ${doc.content}`.toLowerCase();
      const tokens = this.tokenize(fullText);
      for (const token of tokens) {
        if (!this.tokenIndex.has(token)) {
          this.tokenIndex.set(token, new Set());
        }
        this.tokenIndex.get(token)!.add(idx);
      }
    });
  }

  public getDocumentCount(): number {
    return this.docs.length;
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\d.:/-]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 1);
  }

  public search(query: string, limit = 20): SearchResult[] {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    const queryTokens = this.tokenize(cleanQuery);
    if (queryTokens.length === 0) return [];

    const docScores = new Map<number, number>();

    // Candidate docs that match at least one token
    for (const token of queryTokens) {
      // Exact matches
      const exactMatches = this.tokenIndex.get(token);
      if (exactMatches) {
        for (const docIdx of exactMatches) {
          docScores.set(docIdx, (docScores.get(docIdx) || 0) + 10);
        }
      }

      // Prefix matches
      for (const [indexedToken, docIndices] of this.tokenIndex.entries()) {
        if (indexedToken.startsWith(token) && indexedToken !== token) {
          for (const docIdx of docIndices) {
            docScores.set(docIdx, (docScores.get(docIdx) || 0) + 3);
          }
        }
      }
    }

    // Additional scoring for exact substring matches in title or content
    const results: SearchResult[] = [];

    for (const [docIdx, baseScore] of docScores.entries()) {
      const doc = this.docs[docIdx];
      let score = baseScore;

      const lowerTitle = doc.title.toLowerCase();
      const lowerContent = doc.content.toLowerCase();

      // Title exact phrase match
      if (lowerTitle.includes(cleanQuery)) {
        score += 50;
      }
      // Content exact phrase match
      if (lowerContent.includes(cleanQuery)) {
        score += 25;
      }

      // Keyword boost
      if (doc.keywords?.some((k) => k.toLowerCase().includes(cleanQuery))) {
        score += 30;
      }

      // Category priority
      if (doc.category === 'Chapter') score += 5;
      if (doc.category === 'Troubleshooting') score += 4;

      // Generate snippet
      const snippet = this.generateSnippet(doc.content, queryTokens);
      const highlightedTitle = this.highlightMatches(doc.title, queryTokens);

      results.push({
        document: doc,
        score,
        highlightedTitle,
        snippet,
        matchedTokens: queryTokens,
      });
    }

    // Sort by descending score
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }

  private generateSnippet(content: string, tokens: string[], maxLen = 160): string {
    const lower = content.toLowerCase();
    let bestPos = -1;

    for (const token of tokens) {
      const pos = lower.indexOf(token);
      if (pos !== -1) {
        if (bestPos === -1 || pos < bestPos) {
          bestPos = pos;
        }
      }
    }

    if (bestPos === -1) {
      return content.slice(0, maxLen) + (content.length > maxLen ? '...' : '');
    }

    const start = Math.max(0, bestPos - 40);
    const end = Math.min(content.length, start + maxLen);
    let snippet = (start > 0 ? '...' : '') + content.slice(start, end) + (end < content.length ? '...' : '');

    return snippet;
  }

  private highlightMatches(text: string, tokens: string[]): string {
    let result = text;
    for (const token of tokens) {
      const re = new RegExp(`(${this.escapeRegex(token)})`, 'gi');
      result = result.replace(re, '**$1**');
    }
    return result;
  }

  private escapeRegex(s: string): string {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}
