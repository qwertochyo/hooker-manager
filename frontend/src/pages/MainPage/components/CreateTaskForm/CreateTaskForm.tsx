import { CircleX } from 'lucide-react';

import { Button, Input, Textarea } from '../../../../components/ui';
import type { Task } from '../../../../types';
import { useModalStore } from '../../../../utils/stores/modal';

interface Props {
  form: Omit<Task, 'id'>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const CreateTaskForm = ({ form, onChange, onSubmit }: Props) => {
  const { setIsModal } = useModalStore();

  return (
    <div className="bg-background w-[40%] min-w-80 mx-auto border px-4 py-6 relative">
      <div className="text-xl text-center mb-3">
        <p>Create task</p>
        <Button
          onClick={() => setIsModal(false)}
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
          Give your description, <span className="uppercase">bitch</span>
          <Textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={5}
          />
        </label>
        <label>
          Task type
          <Input name="type" value={form.type} onChange={onChange} />
        </label>
        <label>
          Priority
          <Input name="priority" value={form.priority} onChange={onChange} />
        </label>
        <label>
          Deadline
          <Input name="deadline" value={form.deadline} onChange={onChange} />
        </label>
        <Button type="submit">
          Create task
        </Button>
      </form>
    </div>
  );
};
