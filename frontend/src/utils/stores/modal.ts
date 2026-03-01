import { create } from 'zustand';

import type { Task } from '../../types';

interface ModalStore {
  isModalOpen: boolean;
  editingTask: Task | null;

  openForCreate: () => void;
  openForEdit: (task: Task) => void;
  close: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  editingTask: null,

  openForCreate: () => {
    set({ isModalOpen: true, editingTask: null });
  },

  openForEdit: (task) => {
    set({ isModalOpen: true, editingTask: task });
  },

  close: () => {
    set({ isModalOpen: false, editingTask: null });
  }
}));
