import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../../services/post.service';
import { PostActions } from '../../actions/post/post.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable()
export class PostEffects {

  constructor(
    private _actions$: Actions,
    private _postService: PostService,
    private _toastCtrl: ToastController,
    private _router: Router,
    private _file: File, 
  ) {}

  // ...
  // PRESENT A TOAST
  // ...
  async presentToast(message: string, color: string = '', duration: number = 2500) {
    const toast = await this._toastCtrl.create({
      message: message,
      color: color,
      duration: duration,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  }


  // ...
  // ADD POST
  // ...
  addPost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.addPost),
      mergeMap(action => {
        return this._postService.create(action.payload).pipe(
          map(res => {
            return PostActions.addPostSuccess({ data: { ...res }})
          }),
          catchError(err => of(PostActions.addPostFailure({ error: { ...err }}))),
        )
      })
    )
  });

  addPostSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.addPostSuccess),
      tap(res => {
        console.log(res);

        const { data } = res;
        const postStatus = data.post_status;
        
        if (postStatus == 'publish') {
          this.presentToast('Successfully saved!', 'success');
          this._router.navigate(['/'], { replaceUrl: true });
        } else if (postStatus == 'draft') {
          this.presentToast('Auto save', 'light', 500);
        }
      }),
    )
  }, { dispatch: false });

  addPostFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.addPostFailure),
      tap(error => {
        console.log(error);
      })
    )
  }, { dispatch: false });


  // ...
  // UPDATE POST
  // ...
  updatePost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.updatePost),
      mergeMap(action => {
        return this._postService.update(action.pid, action.payload).pipe(
          map(res => {
            return PostActions.updatePostSuccess({ data: { ...res }})
          }),
          catchError(err => of(PostActions.updatePostFailure({ error: { ...err }}))),
        )
      })
    )
  });

  updatePostSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.updatePostSuccess),
      tap(res => {
        console.log(res);

        const { data } = res;
        const postStatus = data.post_status;
        
        if (postStatus == 'publish') {
          this.presentToast('Update successfully saved!', 'success');
          this._router.navigate(['/'], { replaceUrl: true });
        } else if (postStatus == 'draft') {
          this.presentToast('Auto save', 'light', 500);
        }
      }),
    )
  }, { dispatch: false });

  updatePostFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.updatePostFailure),
      tap(error => {
        console.log(error);
      })
    )
  }, { dispatch: false });


  // ...
  // GET POSTS
  // ...
  getPosts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.getPosts),
      mergeMap(action => {
        return this._postService.getPosts(action.filter).pipe(
          map(res => {
            return PostActions.getPostsSuccess({ data: res, filter: action.filter })
          }),
          catchError(err => of(PostActions.getPostsFailure({ error: err, filter: action.filter }))),
        )
      })
    )
  });

  getPostsSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.getPostsSuccess),
      tap(res => {
        console.log(res);
      }),
    )
  }, { dispatch: false });

  getPostsFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.getPostsFailure),
      tap(error => {
        console.log(error);
      })
    )
  }, { dispatch: false });


  // ...
  // GET POST
  // ...
  getPost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.getPost),
      mergeMap(action => {
        return this._postService.getPost(action.pid).pipe(
          map(res => {
            return PostActions.getPostSuccess({ data: res })
          }),
          catchError(err => of(PostActions.getPostsFailure({ error: err }))),
        )
      })
    )
  });

  getPostSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.getPostSuccess),
      tap(res => {
        console.log(res);
      }),
    )
  }, { dispatch: false });

  getPostFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.getPostFailure),
      tap(error => {
        console.log(error);
      })
    )
  }, { dispatch: false });


  // ...
  // DELETE POST
  // ...
  deletePost$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap(action => {
        return this._postService.deletePost(action.pid).pipe(
          map(res => {
            return PostActions.deletePostSuccess({ data: res })
          }),
          catchError(err => of(PostActions.getPostsFailure({ error: err }))),
        )
      })
    )
  });

  deletePostSuccess$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.deletePostSuccess),
      tap(res => {
        console.log(res);

        const postMimeType = res.data.post_mime_type;
        const postTitle = res.data.post_title;

        if (postMimeType == 'audio/mpeg') {
          // delete file from device
          try {
            this._file.removeFile(this._file.dataDirectory, postTitle);
          } catch(error) {
            console.log('delete file error', error);
          }
        }
      }),
    )
  }, { dispatch: false });

  deletePostFailure$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(PostActions.deletePostFailure),
      tap(error => {
        console.log(error);
      })
    )
  }, { dispatch: false });

}
