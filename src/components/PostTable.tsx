"use client"
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
} from '@nextui-org/react';
import { useAsyncList } from '@react-stately/data';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { fetchPosts, deletePost, clearNotification } from '@/features/posts/model/postsSlice';
import { showToast } from './ToastNotification';
import TableActions from '@/shared/ui/TableActions';
import PostSearchInput from '@/shared/ui/PostSearchInput';

interface Post {
  id: number;
  title: string;
  body: string;
}

const columns = [
  { name: 'TÍTULO DEL POST', uid: 'title' },
  { name: 'CONTENIDO', uid: 'body' },
  { name: 'ACCIONES', uid: 'actions' },
];

export default function PostTable({ onEdit }: { onEdit: (post: Post) => void }) {
  const dispatch = useAppDispatch();
  const { posts, loading, notification } = useAppSelector((state) => state.posts);
  const [filterValue, setFilterValue] = useState('');
  const [page, setPage] = useState(1);

  let list = useAsyncList<Post>({
    async load() {
      if (posts.length === 0) {
        const { payload } = await dispatch(fetchPosts());
        return { items: payload };
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

  const filteredPosts = list.items.filter((post) => {
    const searchTerm = filterValue.toLowerCase();
    return Object.values(post).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    );
  });

  const paginatedPosts = filteredPosts.slice((page - 1) * 10, page * 10);
  const totalPages = Math.ceil(filteredPosts.length / 10);

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
      <PostSearchInput value={filterValue} onChange={setFilterValue} />
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