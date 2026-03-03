import { create } from 'zustand';

import type { TaskType } from '../../../types';
import { useTaskStore } from '../../tasks';

interface TypeState {
  types: TaskType[];
  loading: boolean;
  error: string | null;
}

interface TypeActions {
  fetchTypes: () => Promise<void>;
  addType: (type: Omit<TaskType, 'id'>) => Promise<void>;
  removeType: (id: number) => Promise<void>;
}

type TypeStore = TypeState & TypeActions;

export const useTypeStore = create<TypeStore>((set) => ({
  types: [],
  loading: false,
  error: null,

  fetchTypes: async () => {
    try {
      set({ loading: true });

      const res = await fetch('http://localhost:5001/tasks/types');
      const data = await res.json();

      set({ types: data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addType: async (type) => {
    try {
      set({ loading: true });

      const res = await fetch('http://localhost:5001/tasks/types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(type),
      });

      const newType: TaskType = await res.json();
      set((state) => ({ types: [...state.types, newType] }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  removeType: async (id) => {
    try {
      set({ loading: true });

      await fetch(`http://localhost:5001/tasks/types/${id}`, {
        method: 'DELETE',
      });

      set((state) => ({
        types: state.types.filter((type) => type.id !== id),
      }));

      await useTaskStore.getState().removeTasksByType(id);
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
