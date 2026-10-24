/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CalloutType, VerificationBadge } from '../types/handbook';
import {
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Coins,
  Cpu,
  BadgeAlert,
} from 'lucide-react';

interface CalloutBoxProps {
  type: CalloutType;
  title?: string;
  badge?: VerificationBadge;
  content: string;
}

export const CalloutBox: React.FC<CalloutBoxProps> = ({
  type,
  title,
  badge,
  content,
}) => {
  const getStyle = () => {
    switch (type) {
      case 'NOTE':
        return {
          border: 'border-blue-200 dark:border-blue-900/60',
          bg: 'bg-blue-50/70 dark:bg-blue-950/20',
          badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
          icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />,
        };
      case 'TIP':
        return {
          border: 'border-emerald-200 dark:border-emerald-900/60',
          bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
          badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300',
          icon: <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />,
        };
      case 'WARNING':
        return {
          border: 'border-amber-200 dark:border-amber-900/60',
          bg: 'bg-amber-50/70 dark:bg-amber-950/20',
          badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />,
        };
      case 'IMPORTANT':
        return {
          border: 'border-purple-200 dark:border-purple-900/60',
          bg: 'bg-purple-50/70 dark:bg-purple-950/20',
          badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300',
          icon: <BadgeAlert className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />,
        };
      case 'COST ALERT':
        return {
          border: 'border-rose-200 dark:border-rose-900/60',
          bg: 'bg-rose-50/70 dark:bg-rose-950/20',
          badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300',
          icon: <Coins className="w-4 h-4 text-rose-600 dark:text-rose-400 mt-0.5 shrink-0" />,
        };
      case 'SECURITY ALERT':
        return {
          border: 'border-red-300 dark:border-red-900/70',
          bg: 'bg-red-50/80 dark:bg-red-950/30',
          badgeBg: 'bg-red-100 text-red-900 dark:bg-red-900/70 dark:text-red-200',
          icon: <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />,
        };
      case 'VERIFICATION':
        return {
          border: 'border-teal-200 dark:border-teal-900/60',
          bg: 'bg-teal-50/70 dark:bg-teal-950/20',
          badgeBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300',
          icon: <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />,
        };
      case 'COMPATIBILITY':
        return {
          border: 'border-indigo-200 dark:border-indigo-900/60',
          bg: 'bg-indigo-50/70 dark:bg-indigo-950/20',
          badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300',
          icon: <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />,
        };
      default:
        return {
          border: 'border-gray-200 dark:border-gray-800',
          bg: 'bg-gray-50 dark:bg-gray-900/40',
          badgeBg: 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
          icon: <Info className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />,
        };
    }
  };

  const style = getStyle();

  return (
    <div
      role="region"
      aria-label={`${type} callout`}
      className={`my-5 rounded-lg border p-4.5 text-sm transition-colors ${style.border} ${style.bg}`}
    >
      <div className="flex items-start gap-3">
        {style.icon}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded ${style.badgeBg}`}>
              [{type}]
            </span>
            {title && (
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </span>
            )}
            {badge && (
              <span className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                ✓ {badge}
              </span>
            )}
          </div>
          <div className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
