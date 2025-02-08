import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPost from '../../reducers/post/post.reducer';

export const selectPostState = createFeatureSelector<fromPost.PostState>(fromPost.postFeatureKey);

export const selectPostEntities = createSelector(
    selectPostState,
    (state: fromPost.PostState) => state.lists,
);

export const selectPost = createSelector(
    selectPostState,
    (state: fromPost.PostState) => state.post,
);