import { TaskList } from './components/TaskList';

export const MainPage = () => {
  return (
    <div className="py-4 flex flex-col gap-3">
      <TaskList />
    </div>
  );
};
