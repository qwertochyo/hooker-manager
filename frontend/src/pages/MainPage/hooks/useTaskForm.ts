import { useEffect, useState } from 'react';

import type { Task } from '../../../types';
import { useTaskStore } from '../../../utils/stores';
import { useModalStore } from '../../../utils/stores/modal';

const initialFormState: Omit<Task, 'id'> = {
  title: '',
  description: '',
  type: '',
  priority: 1,
  deadline: '',
};

export const useTaskForm = () => {
  const { addTask, updateTask } = useTaskStore();
  const { close, editingTask } = useModalStore();

  const [form, setForm] = useState<Omit<Task, 'id'>>(initialFormState);

  useEffect(() => {
    if (!editingTask) {
      setForm(initialFormState);
      return;
    }

    const { id, ...rest } = editingTask;
    setForm(rest);
  }, [editingTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask(editingTask.id, form);
      } else {
        await addTask(form);
      }
    } catch (error) {
      console.log('Ошибка сохранения задачи', error);
    } finally {
      close();
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    isEditing: Boolean(editingTask),
  };
};
