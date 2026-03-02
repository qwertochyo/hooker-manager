import { useTypeForm } from '../../hooks/useTypeForm';
import { TypeForm } from '../TypeForm/TypeForm';

export const TypeContainer = () => {
  const { form, handleChange, handleSubmit } = useTypeForm();

  return <TypeForm form={form} onChange={handleChange} onSubmit={handleSubmit} />;
};
