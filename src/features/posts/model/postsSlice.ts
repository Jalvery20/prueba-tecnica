import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../types';



// Definición del tipo del estado
interface PostsState {
  posts: Post[];
  selectedPost: Post | null; 
  notification: { message: string; type: 'success' | 'error' } | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null, 
  notification: null, 
  loading: false,
  error: null,
};

// Acciones asíncronas
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost: Omit<Post, 'id'>) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (updatedPost: Post) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, updatedPost);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return postId;
  }
);

// Slice de posts
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload; // Actualiza el post seleccionado
    },
    clearNotification: (state) => {
      state.notification = null; // Limpia la notificación
    }
  },
  extraReducers: (builder) => {
    // Fetch posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch posts';
    });

    // Create post
    builder.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
      state.notification = { message: 'Post creado exitosamente', type: 'success' };
    });

    // Update post
    builder.addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
        state.notification = { message: 'Post actualizado exitosamente', type: 'success' };
      }
    });

    // Delete post
    builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.notification = { message: 'Post eliminado exitosamente', type: 'success' };
    });

    // Errores en las acciones asíncronas
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state) => {
        state.notification = { message: 'Error en la operación', type: 'error' };
      }
    );
  },
});

export const { selectPost, clearNotification } = postsSlice.actions;

export default postsSlice.reducer;
