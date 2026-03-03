import { MoveDown, SquarePlus, Trash } from 'lucide-react';

import { Button } from '../../../components/ui';
import { useTypeStore } from '../../../features';
import { useTaskStore } from '../../../features/tasks';
import type { Task, TaskType } from '../../../types';
import { useModalStore } from '../../../utils/stores';
import { TaskCard } from './TaskCard';

interface Props {
  tasks: Task[];
  type: TaskType;
}

export const TaskTypeGroup = ({ tasks, type }: Props) => {
  const { removeTask } = useTaskStore();
  const { removeType } = useTypeStore();
  const { openModal } = useModalStore();

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
            .filter((task) => Number(task.typeId) === type.id)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => removeTask(task.id)}
                onEdit={() => openModal({ type: 'taskEdit', task: task })}
              />
            ))}
          <Button
            onClick={() => openModal({ type: 'taskCreate', typeId: type.id })}
            variant="ghost"
            className="flex gap-1 items-center justify-center"
          >
            <SquarePlus className="opacity-50" />
            <span className="opacity-60">Add new task</span>
          </Button>
        </div>
      </details>
    </div>
  );
};
