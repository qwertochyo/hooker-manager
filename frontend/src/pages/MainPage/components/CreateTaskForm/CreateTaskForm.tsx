import { Button, Input, Textarea } from '../../../../components/ui';
import type { Task } from '../../../../types';

interface Props {
  form: Omit<Task, 'id'>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const CreateTaskForm = ({ form, onChange, onSubmit }: Props) => {
  return (
    <div className="w-[50%] min-w-72 mx-auto border px-4 py-6">
      <p className="text-xl text-center mb-3">Create task</p>
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
        <Button type="submit">Create task</Button>
      </form>
    </div>
  );
};
