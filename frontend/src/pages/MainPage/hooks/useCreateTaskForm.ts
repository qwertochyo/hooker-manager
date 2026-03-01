import { useState } from 'react';

import type { Task } from '../../../types';
import { useTaskStore } from '../../../utils/stores';
import { useModalStore } from '../../../utils/stores/modal';

export const useCreateTaskForm = () => {
  const { addTask } = useTaskStore();
  const { setIsModal } = useModalStore();

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
      [name]: name === 'priority' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTask(form);
    setIsModal(false);
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
