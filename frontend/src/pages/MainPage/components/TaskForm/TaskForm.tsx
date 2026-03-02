import { CircleX } from 'lucide-react';

import { Button, Input, Textarea } from '../../../../components/ui';
import type { Task } from '../../../../types';
import { useTaskModalStore, useTypeStore } from '../../../../utils/stores';

interface Props {
  form: Omit<Task, 'id'>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
  isEditing: boolean;
}

export const TaskForm = ({ form, onChange, onSubmit, isEditing }: Props) => {
  const { creatingTypeId, close } = useTaskModalStore();
  const { types } = useTypeStore();

  const typeName = creatingTypeId
    ? types.find((t) => t.id === creatingTypeId)?.title
    : (types.find((t) => t.id === form.typeId)?.title ?? '');

  return (
    <div className="bg-background w-[40%] min-w-80 mx-auto border px-4 py-6 relative">
      <div className="text-xl text-center mb-3">
        <p>{isEditing ? 'Update' : 'Create'} task</p>
        <Button
          onClick={() => close()}
          variant="ghost"
          size="icon"
          className="rounded-full absolute top-6 right-4"
        >
          <CircleX />
        </Button>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label>
          Task title
          <Input name="title" value={form.title} onChange={onChange} />
        </label>
        <label>
          {isEditing ? 'Change' : 'Give'} your description,{' '}
          <span className="uppercase">bitch</span>
          <Textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={5}
          />
        </label>
        <label>
          Task type
          <Input disabled name="type" value={typeName} onChange={onChange} />
        </label>
        <label>
          Priority
          <Input name="priority" value={form.priority} onChange={onChange} />
        </label>
        <label>
          Deadline
          <Input name="deadline" value={form.deadline} onChange={onChange} />
        </label>
        <Button type="submit">{isEditing ? 'Update' : 'Create'} task</Button>
      </form>
    </div>
  );
};
