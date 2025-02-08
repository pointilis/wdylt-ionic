import { Component, ElementRef, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { WritingEditorComponent } from '../../partials/writing-editor/writing-editor.component';
import { 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonContent,
  IonText,
  IonButton,
  IonIcon,
  IonTitle,
} from '@ionic/angular/standalone';
import { Post } from 'src/app/database/models/post';
import { ActionsSubject, Store } from '@ngrx/store';
import { PostState } from '../../states/reducers/post/post.reducer';
import { PostActions } from '../../states/actions/post/post.actions';
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { UTCDate } from "@date-fns/utc";
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-writing-screen',
  templateUrl: './writing-screen.component.html',
  styleUrls: ['./writing-screen.component.scss'],
  imports: [
    WritingEditorComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonTitle,
    IonButton,
    IonIcon,
    IonText,
  ]
})
export class WritingScreenComponent  implements OnInit {

  @ViewChild(IonHeader, { read: ElementRef }) ionHeader: ElementRef | null = null;
  
  public headerElementHeight: number = 0;
  public postContent: string | undefined = undefined;
  private _postData: WritableSignal<Post> = signal({
    post_date: '',
    post_date_gmt: '',
    post_title: '',
    post_content: '',
    post_author: '',
    post_status: 'publish',
    post_parent: 0,
    post_excerpt: '',
    post_modified: '',
    post_modified_gmt: '',
    post_type: 'learn',
    tags: '',
    meta: '',
  });
  private _timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private _dateFormater: string = 'yyyy-MM-dd hh:mm:ss';
  public pid: string | null = this._route.snapshot.paramMap.get('pid');
  public currentPost!: any;

  constructor(
    private _store: Store<PostState>,
    private _route: ActivatedRoute,
    private _actionsSubject$: ActionsSubject,
  ) { 
    this._actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case PostActions.addPostSuccess.type:
          this.pid = action.data.ID;
          this.currentPost = action.data;
          break;
      }
    });
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.headerElementHeight = this.ionHeader?.nativeElement.offsetHeight;

    if (this.pid) {
      this._store.dispatch(PostActions.getPost({ pid: this.pid as string }));
    }
  }

  /**
   * CKEditor get content handler
   * @param content 
   */
  getContentHandler(content: string) {
    this.postContent = content;

    this._postData.update((value: Post) => {
      return {
        ...value,
        post_content: content,
      }
    });

    if (content) {
      // save as draft
      this.savePostHandler('draft');
    }
  }

  /**
   * Save post handler
   */
  async savePostHandler(postStatus: string = 'draft') {
    // put default value such as `post_date`
    const utcDate = new UTCDate(new Date());
    const gmtDate = new TZDate(new Date(), this._timezone);
    
    // remove html tags from content
    let div = document.createElement("div");
    div.innerHTML = this._postData().post_content as string;
    const postTitle = div.innerText;

    this._postData.update((value: Post) => {
      return {
        ...value,
        post_title: _.truncate(postTitle, {
          length: 125,
          separator: /,? +/
        }),
        post_status: postStatus,
        post_date: format(utcDate, this._dateFormater),
        post_date_gmt: format(gmtDate, this._dateFormater),
        post_modified: format(utcDate, this._dateFormater),
        post_modified_gmt: format(gmtDate, this._dateFormater),
      }
    });

    if (this.pid) {
      this._postData.update((value: Post) => {
        return {
          ...value,
          post_date: this.currentPost?.post_date ? this.currentPost?.post_date : value.post_date,
          post_date_gmt: this.currentPost?.post_date_gmt ? this.currentPost?.post_date_gmt : value.post_date_gmt,
        }
      });

      this._store.dispatch(PostActions.updatePost({ pid: this.pid, payload: this._postData() }));
    } else {
      this._store.dispatch(PostActions.addPost({ payload: this._postData() }));
    }
  }

  doneHandler() {
    this.savePostHandler('publish');
  }

}
