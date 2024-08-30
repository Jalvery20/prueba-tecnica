'use client';

import { useState } from 'react';
import PostTable from './PostTable';
//import PostModalForm from './PostModalForm';
import { Button } from '@nextui-org/react';
import ToastNotification from './ToastNotification';

const PostsContainer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleEditPost = (post: any) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

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
      {/*<ToastNotification />*/}
      <PostTable onEdit={handleEditPost} />
      {/*<PostModalForm visible={modalVisible} onClose={() => setModalVisible(false)} post={selectedPost} />*/}
    </>
  );
};

export default PostsContainer;
