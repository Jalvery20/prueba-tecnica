'use client'

/**
 * ToastNotification Component
 * 
 * Este componente configura el contenedor de notificaciones toast para mostrar mensajes de éxito o error.
 * Utiliza `react-toastify` para las notificaciones y proporciona una función para mostrar toasts de manera programática.
 * 
 * Función `showToast`:
 * - `message` (string): El mensaje a mostrar en la notificación.
 * - `type` ('success' | 'error'): El tipo de notificación (éxito o error).
 * 
 * Ejemplo de uso:
 * showToast('¡Operación exitosa!', 'success');
 * <ToastNotification />
 */

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
