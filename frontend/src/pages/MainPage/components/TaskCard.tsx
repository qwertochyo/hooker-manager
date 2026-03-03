import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  SquarePen,
  Trash,
} from 'lucide-react';

import { Button } from '../../../components/ui';
import type { Task } from '../../../types';

interface Props {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
}

export const TaskCard = ({ task, onDelete, onEdit }: Props) => {
  return (
    <div className="flex flex-col self-start gap-5 w-full border p-3">
      <div className="flex justify-between items-center gap-2">
        <h3>
          name: <span className="uppercase">{task.title}</span>
        </h3>
        <div className="flex gap-1">
          <ChartNoAxesColumnIncreasing
            className={
              task.priority === 5
                ? 'text-red-600'
                : task.priority >= 3
                  ? 'text-yellow-500'
                  : 'text-green-600'
            }
            strokeWidth={3}
          />
          <span className="text-lg">{task.priority}</span>
        </div>
      </div>
      <p>desc: {task.description}</p>
      <div className="flex gap-1 items-center">
        <CalendarDays />
        {task.deadline}
      </div>
      <div className="flex justify-between gap-2">
        <Button onClick={onDelete} variant="complete" className="flex-1">
          Complete
        </Button>
        <Button onClick={onEdit} size="icon" variant="ghost">
          <SquarePen />
        </Button>
        <Button onClick={onDelete} size="icon" variant="ghost">
          <Trash />
        </Button>
      </div>
    </div>
  );
};
