import { CircleX } from 'lucide-react';

import { Button, Input } from '../../../../components/ui';
import type { TaskType } from '../../../../types';
import { useTypeModalStore } from '../../../../utils/stores';

interface Props {
  form: Omit<TaskType, 'id'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export const TypeForm = ({ form, onChange, onSubmit }: Props) => {
  const { close } = useTypeModalStore();

  return (
    <div className="bg-background w-[35%] min-w-80 mx-auto border px-4 py-6 relative">
      <div className="text-xl text-center mb-3">
        <p>Create type</p>
        <Button
          onClick={close}
          variant="ghost"
          size="icon"
          className="rounded-full absolute top-6 right-4"
        >
          <CircleX />
        </Button>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label>
          Task type
          <Input name="title" onChange={onChange} value={form.title} />
        </label>
        <Button type="submit">Create type</Button>
      </form>
    </div>
  );
};
