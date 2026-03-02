import { MoveDown, SquarePlus, Trash } from 'lucide-react';

import { Button } from '../../../../components/ui';
import type { Task, TaskType } from '../../../../types';
import {
  useTaskModalStore,
  useTaskStore,
  useTypeStore,
} from '../../../../utils/stores';
import { TaskCard } from '../TaskItem/TaskCard';
import { TaskConatiner } from '../TaskContainer/TaskContainer';

interface Props {
  tasks: Task[];
  type: TaskType;
}

export const TaskTypeGroup = ({ tasks, type }: Props) => {
  const { removeTask } = useTaskStore();
  const { openForCreate, openForEdit } = useTaskModalStore();
  const { removeType } = useTypeStore();
  const { isTaskModalOpen } = useTaskModalStore();

  return (
    <div className="min-w-80 w-[30%]">
      <details>
        <summary className="flex items-center gap-2 justify-between mb-4 text-xl cursor-pointer">
          <div className="flex items-center justify-between gap-1">
            <MoveDown />
            <span className="uppercase">{type.title}</span>
          </div>
          <Button
            onClick={() => removeType(type.id)}
            size="icon"
            variant="ghost"
          >
            <Trash />
          </Button>
        </summary>
        <div className="flex flex-col gap-3 min-w-80 justify-between">
          {tasks
            .filter((task) => task.typeId === type.id)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => removeTask(task.id)}
                onEdit={() => openForEdit(task)}
              />
            ))}
          <Button
            onClick={() => openForCreate(type.id)}
            variant="ghost"
            className="flex gap-1 items-center justify-center"
          >
            <SquarePlus className="opacity-50" />
            <span className="opacity-60">Add new task</span>
          </Button>
        </div>
      </details>
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <TaskConatiner />
        </div>
      )}
    </div>
  );
};
