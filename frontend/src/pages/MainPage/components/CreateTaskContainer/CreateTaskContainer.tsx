import { useCreateTaskForm } from '../../hooks/useCreateTaskForm';
import { CreateTaskForm } from '../CreateTaskForm/CreateTaskForm';

export const CreateTaskConatiner = () => {
  const { form, handleChange, handleSubmit } = useCreateTaskForm();

  return (
    <CreateTaskForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};
