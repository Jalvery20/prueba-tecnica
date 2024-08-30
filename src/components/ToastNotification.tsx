'use client'
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Función genérica para mostrar toasts
export const showToast = (message: string, type: 'success' | 'error') => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: true,
    theme: 'dark',
  };

  if (type === 'success') {
    toast.success(message, options);
  } else if (type === 'error') {
    toast.error(message, options);
  }
};

const ToastNotification = () => {
  return <ToastContainer />;
};

export default ToastNotification;
