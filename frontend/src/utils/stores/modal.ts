import { create } from 'zustand';

interface ModalStore {
  isModalOpen: boolean;
  setIsModal: (value: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalOpen: false,
  setIsModal: (value) => {
    set({ isModalOpen: value });
  },
}));
