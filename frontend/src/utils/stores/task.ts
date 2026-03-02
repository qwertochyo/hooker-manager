import { create } from 'zustand';

import type { Task } from '../../types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

interface TaskActions {
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: number, updated: Partial<Task>) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
  removeTasksByType: (typeId: number) => Promise<void>;
}

type TaskStore = TaskState & TaskActions;

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch('http://localhost:5001/tasks');
      const data: Task[] = await res.json();

      set({ tasks: data });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch('http://localhost:5001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      const newTask: Task = await res.json();

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  removeTask: async (id) => {
    try {
      set({ loading: true, error: null });

      await fetch(`http://localhost:5001/tasks/${id}`, {
        method: 'DELETE',
      });

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (id, updated) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`http://localhost:5001/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      const updatedTask: Task = await res.json();

      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  removeTasksByType: async (typeId) => {
    try {
      set({ loading: true, error: null });
  
      const tasksToDelete = useTaskStore.getState().tasks.filter(t => t.typeId === typeId);
  
      await Promise.all(
        tasksToDelete.map(t =>
          fetch(`http://localhost:5001/tasks/${t.id}`, { method: 'DELETE' })
        )
      );
  
      set((state) => ({
        tasks: state.tasks.filter((t) => t.typeId !== typeId),
      }));
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  }
}));
