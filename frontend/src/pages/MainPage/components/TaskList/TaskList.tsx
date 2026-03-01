import { useEffect } from 'react';

import { useTaskStore } from '../../../../utils/stores';
import { useCompleteTask } from '../../hooks/useCompleteTask';
import { TaskCard } from '../TaskItem/TaskCard';

export const TaskList = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { handleCompleteTask } = useCompleteTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className='flex flex-wrap gap-10 min-w-70 justify-between'>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClick={() => handleCompleteTask(task.id)}
        />
      ))}
    </div>
  );
};
