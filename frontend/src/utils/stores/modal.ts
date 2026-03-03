import { create } from 'zustand';

import type { Task } from '../../types';

type ActiveModal = 'taskCreate' | 'taskEdit' | 'typeCreate';

type ModalData =
  | { type: 'taskCreate'; typeId: number }
  | { type: 'taskEdit'; task: Task }
  | { type: 'typeCreate' };

interface ModalState {
  activeModal: ActiveModal | null;
  modalData: ModalData | null;
}

interface ModalActions {
  openModal: (modal: ModalData) => void;
  closeModal: () => void;
}

type ModalStore = ModalState & ModalActions;

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  modalData: null,

  openModal: (modal) => {
    set({ activeModal: modal.type, modalData: modal });
  },

  closeModal: () => {
    set({ activeModal: null, modalData: null });
  },
}));
