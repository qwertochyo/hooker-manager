import { useTypeForm } from '..';
import { TypeForm } from './TypeForm';

interface Props {
  onClose: () => void;
}

export const TypeModal = ({ onClose }: Props) => {
  const { form, handleChange, handleSubmit } = useTypeForm();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <TypeForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};
