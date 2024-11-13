// src/utils/notifications.ts
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type: 'success' | 'error' | 'info' | 'warning', message: string, options?: ToastOptions) => {
  const config: ToastOptions = {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  };

  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    case 'warning':
      toast.warning(message, config);
      break;
    default:
      break;
  }
};


