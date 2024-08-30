'use client'

/**
 * PostModalForm Component
 * 
 * Este componente representa un formulario modal para la creación y edición de posts.
 * Utiliza `react-hook-form` para la gestión de formularios y `react-quill` para un editor de texto enriquecido.
 * 
 * Props:
 * - `visible` (boolean): Determina si el modal es visible o no.
 * - `onClose` (function): Función a ejecutar cuando el modal se cierra.
 * - `post` (object | null): El post actual que se va a editar. Si es `null`, se crea un nuevo post.
 * 
 * Ejemplo de uso:
 * <PostModalForm visible={true} onClose={() => {}} post={null} />
 */

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { createPost, updatePost } from '@/features/model/postsSlice';
import CustomModal from '@/shared/ui/Modal';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

interface PostModalFormProps {
  visible: boolean;
  onClose: () => void;
  post: { id: number; title: string; body: string } | null;
}
// Importar ReactQuill dinámicamente solo en el cliente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PostModalForm: React.FC<PostModalFormProps> = ({ visible, onClose, post }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues: {
      title: '',
      body: '',
    }
  });

  // useEffect para resetear el formulario al cambiar el post o la visibilidad
  useEffect(() => {
    if (post && visible) {
      reset({ title: post.title, body: post.body });
    } else if (!visible) {
      reset({ title: '', body: '' });
    }
  }, [post, visible, reset]);

  // Maneja la acción de enviar el formulario para crear o actualizar un post
  const onSubmit = async (data: { title: string; body: string }) => {
    try {
      if (post) {
        await dispatch(updatePost({ ...post, ...data })).unwrap();
      } else {
        await dispatch(createPost(data)).unwrap();
      }
      onClose();
    } catch (error) {
      // Manejo de errores
    }
  };

  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
      title={post ? 'Editar Post' : 'Crear Nuevo Post'}
      body={
        <>
          <Input
            label='Título'
            placeholder='Ingresa el título del post'
            {...register('title', { required: 'El título es obligatorio' })}
            isInvalid={!!errors.title}
            errorMessage={errors.title?.message}
          />
          <div className='mt-4'>
            <Controller
              name="body"
              control={control}
              rules={{ required: 'El contenido es obligatorio' }}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Ingresa el contenido del post"
                />
              )}
            />
            {errors.body && <p className='text-red-500 text-sm mt-1'>{errors.body.message}</p>}
          </div>
        </>
      }
      footer={
        <>
          <Button color='danger' variant='flat' onClick={onClose}>
            Cancelar
          </Button>
          <Button color='primary' type='submit' onClick={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </>
      }
    />
  );
};

export default PostModalForm;
