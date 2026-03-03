import { TaskModal } from '../../features/tasks';
import { TypeModal } from '../../features/types/components/TypeModal';
import { useModalStore } from '../../utils/stores/modal';

export const ModalRoot = () => {
  const { activeModal, modalData, closeModal } = useModalStore();

  if (!activeModal || !modalData) return null;

  switch (modalData.type) {
    case 'taskCreate':
      return <TaskModal typeId={modalData.typeId} onClose={closeModal} />;
    case 'taskEdit':
      return <TaskModal task={modalData.task} onClose={closeModal} />;
    case 'typeCreate':
      return <TypeModal onClose={closeModal} />;
    default:
      return null;
  }
};
