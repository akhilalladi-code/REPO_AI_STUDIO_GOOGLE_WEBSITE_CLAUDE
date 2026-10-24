/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Chapter 14.2: Deterministic Kanban State & WIP-Limit Engine (FlowBoard)
 */

export const COLUMNS = ['Backlog', 'In Progress', 'Code Review', 'Done'] as const;
export type KanbanColumn = typeof COLUMNS[number];
export const DEFAULT_WIP_LIMIT = 3;

export interface KanbanTask {
  id: string;
  title: string;
  priority: 'Low' | 'Medium' | 'High';
  column: KanbanColumn;
  estimatePomodoros: number;
  completedPomodoros: number;
}

export interface KanbanBoard {
  wipLimit: number;
  tasks: KanbanTask[];
}

export function createBoard(wipLimit = DEFAULT_WIP_LIMIT): KanbanBoard {
  return { wipLimit, tasks: [] };
}

export function addTask(
  board: KanbanBoard,
  title: string,
  priority: 'Low' | 'Medium' | 'High' = 'Medium',
  estimatePomodoros = 1
): KanbanBoard {
  const cleanTitle = String(title || '').trim();
  if (!cleanTitle) throw new Error('Task title cannot be empty.');
  const task: KanbanTask = {
    id: 'tsk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    title: cleanTitle,
    priority,
    column: 'Backlog',
    estimatePomodoros: Math.max(1, Number(estimatePomodoros) || 1),
    completedPomodoros: 0,
  };
  return { ...board, tasks: [...board.tasks, task] };
}

export function moveTask(
  board: KanbanBoard,
  taskId: string,
  targetColumn: KanbanColumn
): KanbanBoard {
  if (!COLUMNS.includes(targetColumn)) {
    throw new Error('Invalid column: ' + targetColumn);
  }
  if (targetColumn === 'In Progress') {
    const activeCount = board.tasks.filter(
      (t) => t.column === 'In Progress' && t.id !== taskId
    ).length;
    if (activeCount >= board.wipLimit) {
      throw new Error(`WIP Limit Reached: Maximum ${board.wipLimit} tasks allowed in 'In Progress'.`);
    }
  }
  const updated = board.tasks.map((t) =>
    t.id === taskId ? { ...t, column: targetColumn } : t
  );
  return { ...board, tasks: updated };
}

export function recordPomodoro(board: KanbanBoard, taskId: string): KanbanBoard {
  const updated = board.tasks.map((t) =>
    t.id === taskId ? { ...t, completedPomodoros: t.completedPomodoros + 1 } : t
  );
  return { ...board, tasks: updated };
}
