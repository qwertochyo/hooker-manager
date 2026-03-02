import { create } from 'zustand';

import type { Task } from '../../types';

interface TaskModalState {
  isTaskModalOpen: boolean;
  editingTask: Task | null;
  creatingTypeId: number | null;
}

interface TaskModalActions {
  openForCreate: (typeId: number) => void;
  openForEdit: (task: Task) => void;
  close: () => void;
}

type TaskModalStore = TaskModalState & TaskModalActions;

export const useTaskModalStore = create<TaskModalStore>((set) => ({
  isTaskModalOpen: false,
  editingTask: null,
  creatingTypeId: null,

  openForCreate: (typeId) => {
    set({ isTaskModalOpen: true, editingTask: null, creatingTypeId: typeId});
  },

  openForEdit: (task) => {
    set({ isTaskModalOpen: true, editingTask: task, creatingTypeId: null });
  },

  close: () => {
    set({ isTaskModalOpen: false, editingTask: null, creatingTypeId: null });
  },
}));
