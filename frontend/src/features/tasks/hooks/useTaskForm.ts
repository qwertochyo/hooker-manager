import { useEffect, useState } from 'react';

import { useTaskStore } from '..';
import type { Task } from '../../../types';
import { useModalStore } from '../../../utils/stores';

const initialFormState: Omit<Task, 'id'> = {
  title: '',
  description: '',
  typeId: null,
  priority: 1,
  deadline: '',
};

interface Props {
  initialTask?: Task;
  typeId?: number;
}

export const useTaskForm = ({ initialTask, typeId }: Props = {}) => {
  const { addTask, updateTask } = useTaskStore();
  const { closeModal } = useModalStore();

  const [form, setForm] = useState<Omit<Task, 'id'>>({
    ...initialFormState,
    typeId: typeId ?? null,
  });

  useEffect(() => {
    if (initialTask) {
      const { id, ...rest } = initialTask;
      setForm(rest);
    } else {
      setForm({ ...initialFormState, typeId: typeId ?? null });
    }
  }, [initialTask, typeId]);

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
      if (initialTask) {
        await updateTask(initialTask.id, form);
      } else {
        await addTask(form);
      }
    } catch (error) {
      console.log('Ошибка сохранения задачи', error);
    } finally {
      closeModal();
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    isEditing: Boolean(initialTask),
  };
};
