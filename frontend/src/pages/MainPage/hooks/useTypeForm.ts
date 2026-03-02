import { useState } from 'react';

import type { TaskType } from '../../../types';
import { useTypeModalStore, useTypeStore } from '../../../utils/stores';

const initialFormState: Omit<TaskType, 'id'> = {
  title: '',
};

export const useTypeForm = () => {
  const [form, setForm] = useState<Omit<TaskType, 'id'>>(initialFormState);
  const { addType } = useTypeStore();
  const { close } = useTypeModalStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    try {
      await addType(form);
      setForm(initialFormState);
    } catch (err) {
      console.log('Ошибка при создании типа', err);
    } finally {
      close();
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
