'use client';

/**
 * PostsContainer Component
 * 
 * Este componente se encarga de mostrar la tabla de posts y manejar la creación y edición de posts.
 * Utiliza un modal para el formulario de edición/creación de posts y muestra notificaciones.
 * 
 * Props: No recibe props directamente.
 * 
 * Ejemplo de uso:
 * <PostsContainer />
 */

import { useState } from 'react';
import PostTable from './PostTable';
import PostModalForm from './PostModalForm';
import { Button } from '@nextui-org/react';
import ToastNotification from './ToastNotification';

const PostsContainer = () => {
  // Estado para manejar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  // Estado para manejar el post seleccionado para edición
  const [selectedPost, setSelectedPost] = useState(null);

  // Maneja la acción de editar un post
  const handleEditPost = (post: any) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  // Maneja la acción de crear un nuevo post
  const handleCreatePost = () => {
    setSelectedPost(null);
    setModalVisible(true);
  };

  return (
    <>
      <Button
        radius='sm'
        variant='solid'
        className='ms-auto my-5 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
        onClick={handleCreatePost}
      >
        Crear Nuevo Post
      </Button>
      <ToastNotification />
      <PostTable onEdit={handleEditPost} />
      <PostModalForm visible={modalVisible} onClose={() => setModalVisible(false)} post={selectedPost} />
    </>
  );
};

export default PostsContainer;
