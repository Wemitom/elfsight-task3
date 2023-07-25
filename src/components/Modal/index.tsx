import { ReactNode, useEffect, useRef, useState } from 'react';

import { classNames } from 'utils';
import useEscapeKey from 'utils/hooks/useEscapeKey';
import useOutsideClickDetect from 'utils/hooks/useOutsideClickDetect';

const Modal = ({
  onClose,
  children
}: {
  onClose: () => void;
  children: ReactNode;
}) => {
  const [leave, setLeave] = useState(false);
  const handleClose = () => {
    setLeave(true);
    setTimeout(() => onClose(), 300);
  };
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClickDetect(ref, handleClose);
  useEscapeKey(handleClose, true); // Для обработки Esc

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-transparent/50 pb-6 pt-12"
      aria-modal
    >
      <div
        className={classNames(
          'bg-primary rounded-md max-w-[70%] opacity-100 translate-y-0',
          leave ? 'animate-leave' : 'animate-enter'
        )}
        ref={ref}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
