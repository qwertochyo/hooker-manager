import { CirclePlus } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '../../../../components/ui';
import {
  useTaskStore,
  useTypeModalStore,
  useTypeStore,
} from '../../../../utils/stores';
import { TaskTypeGroup } from '../TaskTypeGroup/TaskTypeGroup';
import { TypeContainer } from '../TypeContainer/TypeContainer';

export const TaskList = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { types, fetchTypes } = useTypeStore();
  const { isTypeModalOpen, open } = useTypeModalStore();

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
        onClick={open}
        variant="ghost"
        className="flex gap-1 items-center justify-center min-h-screen w-[30%]"
      >
        <CirclePlus />
        Add new type, <span className="text-red-600 uppercase">asshole</span>
      </Button>

      {isTypeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <TypeContainer />
        </div>
      )}
    </div>
  );
};
