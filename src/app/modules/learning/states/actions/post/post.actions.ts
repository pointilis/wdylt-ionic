import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post, PostFilter } from 'src/app/database/models/post';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'Add Post': props<{ payload: Post }>(),
    'Add Post Success': props<{ data: Post }>(),
    'Add Post Failure': props<{ error: any }>(),

    'Update Post': props<{ pid: string, payload: Post }>(),
    'Update Post Success': props<{ data: Post }>(),
    'Update Post Failure': props<{ error: any }>(),

    'Get Posts': props<{ filter?: PostFilter }>(),
    'Get Posts Success': props<{ data: any, filter?: PostFilter }>(),
    'Get Posts Failure': props<{ error: any, filter?: PostFilter }>(),

    'Get Post': props<{ pid: string | number }>(),
    'Get Post Success': props<{ data: any }>(),
    'Get Post Failure': props<{ error: any }>(),

    'Delete Post': props<{ pid: string | number }>(),
    'Delete Post Success': props<{ data: any }>(),
    'Delete Post Failure': props<{ error: any }>(),
  }
});
