import { TaskList } from './components/TaskList/TaskList';

export const MainPage = () => {
  return (
    <div className="py-4 flex flex-col gap-3">
      <TaskList />
    </div>
  );
};
