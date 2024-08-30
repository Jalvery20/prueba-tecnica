'use client'

/**
 * TableActions Component
 * 
 * Este componente representa un conjunto de acciones que se pueden realizar en una tabla, como editar o eliminar.
 * Utiliza iconos de `react-icons` y `Tooltip` de `@nextui-org/react` para mejorar la experiencia de usuario.
 * 
 * Props:
 * - `onEdit` (function): Función a ejecutar cuando se selecciona la acción de editar.
 * - `onDelete` (function): Función a ejecutar cuando se selecciona la acción de eliminar.
 * 
 * Ejemplo de uso:
 * <TableActions 
 *   onEdit={() => console.log('Editar post')} 
 *   onDelete={() => console.log('Eliminar post')} 
 * />
 */

import React from 'react';
import { Tooltip } from '@nextui-org/react';
import { FiEdit as PostEditIcon } from 'react-icons/fi';
import { MdDelete as PostDeleteIcon } from 'react-icons/md';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className='flex items-center justify-center gap-3'>
      <Tooltip content='Editar post'>
        <span
          className='text-lg text-default-400 text-center cursor-pointer active:opacity-50'
          onClick={onEdit}
        >
          <PostEditIcon />
        </span>
      </Tooltip>
      <Tooltip color='danger' content='Eliminar post'>
        <span
          className='text-lg text-danger cursor-pointer active:opacity-50'
          onClick={onDelete}
        >
          <PostDeleteIcon />
        </span>
      </Tooltip>
    </div>
  );
};

export default TableActions;
