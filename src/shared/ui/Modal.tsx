'use client'

/**
 * CustomModal Component
 * 
 * Este componente representa un modal personalizable utilizando los componentes de `@nextui-org/react`.
 * Permite mostrar un modal con un título, cuerpo y pie de página específicos.
 * 
 * Props:
 * - `visible` (boolean): Determina si el modal es visible o no.
 * - `onClose` (function): Función a ejecutar cuando el modal se cierra o cambia su visibilidad.
 * - `title` (string): El título que se muestra en la cabecera del modal.
 * - `body` (React.ReactNode): El contenido que se muestra en el cuerpo del modal.
 * - `footer` (React.ReactNode): El contenido que se muestra en el pie de página del modal.
 * 
 * Ejemplo de uso:
 * <CustomModal 
 *   visible={true} 
 *   onClose={() => {}} 
 *   title="Título del Modal" 
 *   body={<p>Este es el contenido del modal.</p>} 
 *   footer={<button>Cerrar</button>} 
 * />
 */

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, title, body, footer }) => {
  return (
    <Modal isOpen={visible} onOpenChange={onClose} placement='top-center'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {title}
            </ModalHeader>
            <ModalBody>
              {body}
            </ModalBody>
            <ModalFooter>
              {footer}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
