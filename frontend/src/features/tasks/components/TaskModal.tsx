import { useTaskForm } from '..';
import { useTypeStore } from '../..';
import type { Task } from '../../../types';
import { TaskForm } from './TaskForm';

interface Props {
  typeId?: number;
  task?: Task;
  onClose: () => void;
}

export const TaskModal = ({ typeId, task, onClose }: Props) => {
  const { types } = useTypeStore();
  const { form, handleChange, handleSubmit, isEditing } = useTaskForm({
    initialTask: task,
    typeId,
  });

  const typeName = typeId
    ? types.find((t) => t.id === typeId)!.title
    : (types.find((t) => t.id === form.typeId)!.title ?? '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <TaskForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        typeName={typeName}
        onClose={onClose}
      />
    </div>
  );
};
