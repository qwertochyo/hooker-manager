import { CirclePlus } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '../../../components/ui';
import { useTypeStore } from '../../../features';
import { useTaskStore } from '../../../features/tasks';
import { useModalStore } from '../../../utils/stores';
import { TaskTypeGroup } from './TaskTypeGroup';

export const TaskList = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { types, fetchTypes } = useTypeStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  return (
    <div className="flex flex-wrap gap-3 justify-between">
      {types.map((type) => (
        <TaskTypeGroup key={type.id} tasks={tasks} type={type} />
      ))}

      <Button
        onClick={() => openModal({ type: 'typeCreate' })}
        variant="ghost"
        className="flex gap-1 items-center justify-center min-h-screen w-[30%]"
      >
        <CirclePlus />
        Add new type, <span className="text-red-600 uppercase">asshole</span>
      </Button>
    </div>
  );
};
