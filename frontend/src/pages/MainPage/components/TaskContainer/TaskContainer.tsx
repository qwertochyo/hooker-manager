import { useTaskForm } from '../../hooks/useTaskForm';
import { TaskForm } from '../TaskForm/TaskForm';

export const TaskConatiner = () => {
  const { form, handleChange, handleSubmit, isEditing } = useTaskForm();

  return (
    <TaskForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEditing={isEditing}
    />
  );
};
