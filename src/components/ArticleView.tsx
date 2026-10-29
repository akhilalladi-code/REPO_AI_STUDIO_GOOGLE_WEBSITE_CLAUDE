/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Chapter } from '../types/handbook';
import { CalloutBox } from './CalloutBox';
import { CodeBlock } from './CodeBlock';
import { DiagramViewer } from './DiagramViewer';
import {
  Home,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Clock,
  Gauge,
  Tag,
  Link as LinkIcon,
} from 'lucide-react';

interface ArticleViewProps {
  chapter: Chapter;
  onNavigateChapter: (slug: string) => void;
  onNavigateHome?: () => void;
  prevChapter?: Chapter;
  nextChapter?: Chapter;
}

/**
 * Parses markdown inline formatting (**bold**, `inline code`, *italic*)
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      const codeContent = token.slice(1, -1);
      return (
        <code
          key={idx}
          className="font-mono text-xs sm:text-[13px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-emerald-800 dark:text-emerald-300 border border-neutral-200 dark:border-neutral-700/60 font-semibold"
        >
          {codeContent}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      const boldContent = token.slice(2, -2);
      if (boldContent.includes('`')) {
        return (
          <strong key={idx} className="font-bold text-neutral-900 dark:text-neutral-50">
            {parseInlineMarkdown(boldContent)}
          </strong>
        );
      }
      return (
        <strong key={idx} className="font-bold text-neutral-900 dark:text-neutral-50">
          {boldContent}
        </strong>
      );
    }
    return <span key={idx}>{token}</span>;
  });
}

/**
 * Formats multi-line text into styled paragraphs, lists, and bold headings
 */
const FormattedParagraph: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  return (
    <div className="space-y-2">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Numbered list item: e.g. "1. **Something**..."
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2.5 my-1.5 pl-1">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 shrink-0 mt-0.5">
                {numMatch[1]}
              </span>
              <div className="flex-1 leading-relaxed text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
                {parseInlineMarkdown(numMatch[2])}
              </div>
            </div>
          );
        }

        // Bullet item: e.g. "- Something..." or "* Something..."
        const bulletMatch = trimmed.match(/^[-*]\s+(.*)/);
        if (bulletMatch) {
          return (
            <div key={lIdx} className="flex items-start gap-2.5 my-1 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0 mt-2.5" />
              <div className="flex-1 leading-relaxed text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
                {parseInlineMarkdown(bulletMatch[1])}
              </div>
            </div>
          );
        }

        // Regular paragraph line
        return (
          <p key={lIdx} className="leading-relaxed text-neutral-800 dark:text-neutral-200 text-sm sm:text-base">
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
};

export const ArticleView: React.FC<ArticleViewProps> = ({
  chapter,
  onNavigateChapter,
  onNavigateHome,
  prevChapter,
  nextChapter,
}) => {
  const copyHeadingLink = (sectionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <article className="max-w-4xl min-w-0 pb-16 space-y-8">
      {/* Top Breadcrumb & Home Navigation Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3 pb-3 border-b border-neutral-800">
          <button
            type="button"
            onClick={onNavigateHome ? onNavigateHome : () => { window.location.hash = 'home'; }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors font-medium cursor-pointer shadow-xs group"
            title="Return to Claude Code ₹0 Homepage"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>&larr; Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>{chapter.part}</span>
            <span>/</span>
            <span className="text-emerald-400 font-semibold">
              {chapter.number === '0' ? 'Front Matter' : `Chapter ${chapter.number}`}
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
          {chapter.title}
        </h1>

        {chapter.subtitle && (
          <p className="mt-2 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-medium">
            {chapter.subtitle}
          </p>
        )}

        {/* Badges strip */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs">

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>~{chapter.readingTimeMinutes} mins</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-2xs">
            <Gauge className="w-3.5 h-3.5 text-neutral-500" />
            <span>{chapter.difficulty}</span>
          </span>
        </div>

        {/* Purpose Card */}
        {chapter.purpose && (
          <div className="mt-5 p-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed shadow-2xs">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-1">
              Purpose &amp; Engineering Scope:
            </span>
            {parseInlineMarkdown(chapter.purpose)}
          </div>
        )}

        {/* Terminology pills */}
        {chapter.keyTerminology && chapter.keyTerminology.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="text-neutral-400 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3" />
              <span>Keywords:</span>
            </span>
            {chapter.keyTerminology.map((term) => (
              <span
                key={term}
                className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60 font-mono"
              >
                {term}
              </span>
            ))}
          </div>
        )}
      </div>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      {/* Chapter Subsections */}
      <div className="space-y-12">
        {chapter.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
            <div className="flex items-center justify-between group">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {sec.title}
              </h2>
              <button
                type="button"
                onClick={() => copyHeadingLink(sec.id)}
                aria-label={`Copy link to section ${sec.title}`}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-emerald-600 transition-opacity cursor-pointer"
                title="Copy section link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Paragraphs with Markdown Formatting */}
            <div className="space-y-3.5">
              {sec.content.map((p, pIdx) => (
                <FormattedParagraph key={pIdx} text={p} />
              ))}
            </div>

            {/* Figures */}
            {sec.figures?.map((fig) => (
              <DiagramViewer key={fig.id} figure={fig} />
            ))}

            {/* Tables */}
            {sec.tables?.map((table) => (
              <div
                key={table.id}
                className="my-6 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#161817] overflow-hidden shadow-xs"
              >
                <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/40">
                  <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                    {table.title}
                  </h3>
                  {table.caption && (
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">{table.caption}</p>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold bg-neutral-50 dark:bg-neutral-900/20">
                      <tr>
                        {table.columns.map((col) => (
                          <th
                            key={col.key}
                            className={`py-2.5 px-3.5 ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                          >
                            {col.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/60">
                      {table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30">
                          {table.columns.map((col) => (
                            <td
                              key={col.key}
                              className={`py-2.5 px-3.5 ${col.align === 'right' ? 'text-right font-mono' : 'text-left'} text-neutral-800 dark:text-neutral-200`}
                            >
                              {String(row[col.key] ?? '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Code Snippets */}
            {sec.codeSnippets?.map((snip, sIdx) => (
              <CodeBlock
                key={sIdx}
                code={snip.code}
                language={snip.language}
                filename={snip.filename}
                environment={snip.environment}
                expectedOutput={snip.expectedOutput}
                explanation={snip.explanation}
              />
            ))}

            {/* Callouts */}
            {sec.callouts?.map((callout, cIdx) => (
              <CalloutBox
                key={cIdx}
                type={callout.type}
                title={callout.title}
                badge={callout.badge}
                content={callout.content}
              />
            ))}
          </section>
        ))}
      </div>

      {/* Bottom Previous & Next Navigation */}
      <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevChapter ? (
          <button
            type="button"
            onClick={() => onNavigateChapter(prevChapter.slug)}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] hover:border-emerald-500 text-left transition-colors cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Previous Chapter</span>
            </div>
            <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate">
              {prevChapter.number === '0' ? 'Front Matter' : `Ch ${prevChapter.number}: ${prevChapter.title.split(':')[1]?.trim() || prevChapter.title}`}
            </div>
          </button>
        ) : <div />}

        {nextChapter && (
          <button
            type="button"
            onClick={() => onNavigateChapter(nextChapter.slug)}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161817] hover:border-emerald-500 text-right transition-colors cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-end gap-1.5 text-xs text-neutral-500 mb-1">
              <span>Next Chapter</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate">
              {nextChapter.part.includes('Appendices')
                ? `Appendix ${nextChapter.number}: ${nextChapter.title.split(':')[0]}`
                : `Ch ${nextChapter.number}: ${nextChapter.title.split(':')[1]?.trim() || nextChapter.title}`}
            </div>
          </button>
        )}
      </div>

      {/* Bottom Home Action */}
      <div className="pt-4 flex justify-center">
        <button
          type="button"
          onClick={onNavigateHome ? onNavigateHome : () => { window.location.hash = 'home'; }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium cursor-pointer transition-colors shadow-xs"
          title="Return to Claude Code ₹0 Homepage"
        >
          <Home className="w-3.5 h-3.5 text-emerald-400" />
          <span>Return to Handbook Homepage</span>
        </button>
      </div>
    </article>
  );
};
