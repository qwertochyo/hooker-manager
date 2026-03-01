import { useTaskStore } from '../../../utils/stores';

export const useCompleteTask = () => {
  const { removeTask } = useTaskStore();

  const handleCompleteTask = (id: number) => {
    removeTask(id);
  };

  return {
    handleCompleteTask,
  };
};
