import { create } from 'zustand';

interface TypeModalState {
  isTypeModalOpen: boolean;
}

interface TypeModalActions {
  open: () => void;
  close: () => void;
}

type TypeModalStore = TypeModalState & TypeModalActions;

export const useTypeModalStore = create<TypeModalStore>((set) => ({
  isTypeModalOpen: false,

  open: () => {
    set({ isTypeModalOpen: true });
  },

  close: () => {
    set({ isTypeModalOpen: false });
  },
}));
