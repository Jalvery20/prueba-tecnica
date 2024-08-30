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
