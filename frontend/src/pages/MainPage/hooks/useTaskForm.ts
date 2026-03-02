import { useEffect, useState } from 'react';

import type { Task } from '../../../types';
import { useTaskModalStore, useTaskStore } from '../../../utils/stores';

const initialFormState: Omit<Task, 'id'> = {
  title: '',
  description: '',
  typeId: null,
  priority: 1,
  deadline: '',
};

export const useTaskForm = () => {
  const { addTask, updateTask } = useTaskStore();
  const { close, editingTask, creatingTypeId } = useTaskModalStore();

  const [form, setForm] = useState<Omit<Task, 'id'>>({
    ...initialFormState,
    typeId: creatingTypeId,
  });

  useEffect(() => {
    if (editingTask) {
      const { id, ...rest } = editingTask;
      setForm(rest);
    } else {
      setForm({ ...initialFormState, typeId: creatingTypeId });
    }
  }, [editingTask, creatingTypeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'priority'
          ? isNaN(Number(value))
            ? 1
            : Number(value)
          : value,
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
