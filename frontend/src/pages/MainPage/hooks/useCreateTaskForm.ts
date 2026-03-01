import { useState } from 'react';

import type { Task } from '../../../types';
import { useTaskStore } from '../../../utils/stores';

export const useCreateTaskForm = () => {
  const { addTask } = useTaskStore();

  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    type: '',
    priority: 1,
    deadline: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask(form);
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
