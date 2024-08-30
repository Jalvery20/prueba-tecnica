'use client'
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
