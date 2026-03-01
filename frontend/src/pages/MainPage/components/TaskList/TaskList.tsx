import { SquarePlus } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '../../../../components/ui';
import { useTaskStore } from '../../../../utils/stores';
import { useModalStore } from '../../../../utils/stores/modal';
import { useCompleteTask } from '../../hooks/useCompleteTask';
import { CreateTaskConatiner } from '../CreateTaskContainer/CreateTaskContainer';
import { TaskCard } from '../TaskItem/TaskCard';

export const TaskList = () => {
  const { isModalOpen, setIsModal } = useModalStore();
  const { tasks, fetchTasks } = useTaskStore();
  const { handleCompleteTask } = useCompleteTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col items-start gap-3 relative">
      <div className="flex flex-wrap gap-10 min-w-70 justify-between">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleCompleteTask(task.id)}
          />
        ))}
      </div>
      <Button
        onClick={() => setIsModal(true)}
        variant="ghost"
        className="flex gap-1 items-center"
      >
        <SquarePlus className="opacity-50" />
        <span className="opacity-60">Add new task</span>
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <CreateTaskConatiner />
        </div>
      )}
    </div>
  );
};
