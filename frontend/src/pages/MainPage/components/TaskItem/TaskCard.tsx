import {
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  SquarePen,
} from 'lucide-react';

import { Button } from '../../../../components/ui';
import type { Task } from '../../../../types';

interface Props {
  task: Task;
  onClick: () => void;
}

export const TaskCard = ({ task, onClick }: Props) => {
  return (
    <div className="flex flex-col self-start gap-5 w-[30%] min-w-70 border p-3">
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
        <Button onClick={onClick} variant="complete" className="flex-1">
          Done
        </Button>
        <Button size="icon" variant="ghost">
          <SquarePen />
        </Button>
      </div>
    </div>
  );
};
