import { createReducer, on } from '@ngrx/store';
import { PostActions } from '../../actions/post/post.actions';
import { Post } from 'src/app/database/models/post';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Status } from 'src/app/modules/shared/constats';

export const postFeatureKey = 'post';

export interface PostState {
  lists: {
    data: any[]
    status: string
    error: any
  }
  post: {
    data: any
    status: string
    error: any
  }
}

export const initialState: PostState = {
  lists: {
    data: [],
    status: Status.IDLE,
    error: null,
  },
  post: {
    data: null,
    status: Status.IDLE,
    error: null,
  }
}

export const PostReducer = createReducer(
  initialState,

  // ...
  // ADD POST
  // ...
  on(PostActions.addPostSuccess, (state, { data }) => {
    return {
      ...state,
      lists: {
        ...state.lists,
        data: [data, ...state.lists.data],
      }
    }
  }),

  // ...
  // GET POSTS
  // ...
  on(PostActions.getPosts, (state) => {
    return {
      ...state,
      lists: {
        ...state.lists,
        status: Status.LOADING,
        error: null,
      }
    }
  }),
  on(PostActions.getPostsSuccess, (state, { data }) => {
    return {
      ...state,
      lists: {
        ...state.lists,
        data: data,
        status: Status.SUCCESS,
        error: null,
      }
    }
  }),
  on(PostActions.getPostsFailure, (state, { error }) => {
    return {
      ...state,
      lists: {
        ...state.lists,
        status: Status.IDLE,
        error: error,
      }
    }
  }),


  // ...
  // GET POST
  // ...
  on(PostActions.getPost, (state) => {
    return {
      ...state,
      post: {
        ...state.post,
        status: Status.LOADING,
        error: null,
      }
    }
  }),
  on(PostActions.getPostSuccess, (state, { data }) => {
    return {
      ...state,
      post: {
        ...state.post,
        data: data,
        status: Status.SUCCESS,
        error: null,
      }
    }
  }),
  on(PostActions.getPostFailure, (state, { error }) => {
    return {
      ...state,
      post: {
        ...state.post,
        status: Status.IDLE,
        error: error,
      }
    }
  }),


  // ...
  // DELETE POST
  // ...
  on(PostActions.deletePostSuccess, (state, { data }) => {
    return {
      ...state,
      lists: {
        ...state.lists,
        data: state.lists.data.filter(item => item.ID != data.ID),
      }
    }
  }),
);