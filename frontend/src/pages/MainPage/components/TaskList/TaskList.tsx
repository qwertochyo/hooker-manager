import { SquarePlus } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '../../../../components/ui';
import { useTaskStore } from '../../../../utils/stores';
import { useModalStore } from '../../../../utils/stores/modal';
import { TaskConatiner } from '../TaskContainer/TaskContainer';
import { TaskCard } from '../TaskItem/TaskCard';

export const TaskList = () => {
  const { isModalOpen, openForCreate, openForEdit } = useModalStore();
  const { tasks, fetchTasks, removeTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col gap-3 relative">
      <div className="flex flex-wrap gap-10 min-w-70 justify-between">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => removeTask(task.id)}
            onEdit={() => openForEdit(task)}
          />
        ))}
      </div>
      <Button
        onClick={openForCreate}
        variant="ghost"
        className="flex gap-1 items-center self-start"
      >
        <SquarePlus className="opacity-50" />
        <span className="opacity-60">Add new task</span>
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <TaskConatiner />
        </div>
      )}
    </div>
  );
};
