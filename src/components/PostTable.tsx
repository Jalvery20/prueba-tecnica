'use client'

/**
 * PostTable Component
 * 
 * Este componente representa una tabla de posts con opciones de búsqueda, paginación y acciones (editar/eliminar).
 * Utiliza `@nextui-org/react` para los componentes de interfaz de usuario y `@react-stately/data` para la gestión de datos asincrónicos.
 * 
 * Props:
 * - `onEdit` (function): Función a ejecutar cuando se selecciona la opción de editar un post.
 * 
 * Ejemplo de uso:
 * <PostTable onEdit={(post) => console.log(post)} />
 */

import React, { useEffect, useState } from 'react';
import {
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchPosts, deletePost, clearNotification } from '@/features/model/postsSlice';
import { showToast } from './ToastNotification';
import TableActions from '@/shared/ui/TableActions';
import { Post } from '@/features/types';



const columns = [
  { name: 'TÍTULO DEL POST', uid: 'title' },
  { name: 'CONTENIDO', uid: 'body' },
  { name: 'ACCIONES', uid: 'actions' },
];

interface PostsState {
  posts: Post[];
  loading: boolean;
  notification: { message: string; type: 'success' | 'error' } | null;
}

export default function PostTable({ onEdit }: { onEdit: (post: Post) => void }) {
  const dispatch = useAppDispatch();
  const { posts, loading, notification } = useAppSelector((state: { posts: PostsState }) => state.posts);
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(1);

  // Carga y gestión de datos de la tabla
  let list = useAsyncList<Post>({
    async load() {
      if (posts.length === 0) {
        const { payload } = await dispatch(fetchPosts());
        return { items: payload ? payload : [] };
      }
      return { items: posts };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column as keyof Post];
          let second = b[sortDescriptor.column as keyof Post];
          let cmp = first < second ? -1 : 1;
          if (sortDescriptor.direction === 'descending') cmp *= -1;
          return cmp;
        }),
      };
    },
  });

  useEffect(() => {
    if(posts.length ===0) return
    list.reload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  useEffect(() => {
    if (notification) {
      showToast(notification.message, notification.type);
      dispatch(clearNotification());
    }
  }, [notification, dispatch]);

  const handleDelete = async (postId: number) => {
    try {
      await dispatch(deletePost(postId)).unwrap();
    } catch (error) {}
  };

  // Filtrado y paginación de los posts
  const filteredPosts = list.items.filter((post) => {
    const searchTerm = filterValue.toLowerCase();
    return Object.values(post).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    );
  });

  const paginatedPosts = filteredPosts.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(filteredPosts.length / 10);

  // Renderizado de cada celda de la tabla
  const renderCell = (post: Post, columnKey: React.Key) => {
    const cellValue = post[columnKey as keyof Post];
    switch (columnKey) {
      case 'title':
        return <h3>{post.title}</h3>;
      case 'body':
        return (
          <div className='flex flex-col'>
            <div
            className="text-sm capitalize"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          </div>
        );
      case 'actions':
        return (
          <TableActions
            onEdit={() => onEdit(post)}
            onDelete={() => handleDelete(post.id)}
          />
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      <Input
        isClearable
        fullWidth
        color='secondary'
        placeholder='Buscar por título...'
        value={filterValue}
        className='mb-4'
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <Table
        aria-label='A posts Table'
        classNames={{ table: 'min-h-[200px]' }}
        bottomContent={
          totalPages !== 0 && (
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='secondary'
                page={page}        
                classNames={{
                  cursor: 'bg-gradient-to-tr from-pink-500 to-yellow-500',
                }}
                total={totalPages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          )
        }
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.uid !== 'actions'}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={paginatedPosts}
          isLoading={loading || list.isLoading}
          emptyContent='No hay posts disponibles'
          loadingContent={<Spinner />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}