import { Component, OnInit, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PostState } from '../../states/reducers/post/post.reducer';
import { PostActions } from '../../states/actions/post/post.actions';
import { Observable } from 'rxjs';
import { selectPostEntities } from '../../states/selectors/post/post.selectors';
import { Post, PostFilter } from 'src/app/database/models/post';
import { CommonModule, NgFor } from '@angular/common';
import { AlertController, IonicModule, IonModal } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PostItemAudioComponent } from '../post-item-audio/post-item-audio.component';
import { Media, MediaObject } from "@awesome-cordova-plugins/media/ngx";
import { File } from '@awesome-cordova-plugins/file/ngx';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgFor,
    PostItemAudioComponent,
    CdTimerModule,
  ],
  providers: [
    File,
    Media,
  ],
  // https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent  implements OnInit {

  @ViewChild('playModal', { static: true }) playModal!: IonModal;
  @ViewChild(CdTimerComponent, { static: false }) cdTimer!: CdTimerComponent;

  public posts$!: Observable<{ data: any[], status: string }>;
  public filter!: PostFilter;
  public isPlay: WritableSignal<boolean> = signal<boolean>(false);
  public duration: number = 0; // in seconds
  public durationInMinutes!: string;
  public position: number = 0;

  private _mediaObject!: MediaObject;
  private _fileName!: string;

  constructor(
    private _store: Store<PostState>,
    private _sanitizer: DomSanitizer,
    private _media: Media,
    private _file: File,
    private _alertCtrl: AlertController,
  ) { 
    this.posts$ = this._store.pipe(select(selectPostEntities));
  }

  /**
   * Delete confirmation
   */
  async presentDeleteConfirmation(pid: any) {
    const alrt = await this._alertCtrl.create({
      backdropDismiss: true,
      message: 'Are you sure you want to permanently delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this._store.dispatch(PostActions.deletePost({ pid: pid }));
          }
        }
      ]
    });

    await alrt.present();
  }

  ngOnInit() { }

  getPosts(filter: PostFilter) {
    this.filter = {
      ...this.filter,
      ...filter,
    }

    this._store.dispatch(PostActions.getPosts({ filter: this.filter }));
  }

  presentHTMLContent(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }

  onDeleteHandler(pid: any) {
    this.presentDeleteConfirmation(pid);
  }

  getPlayer(post: Post) {
    const meta: any = post.meta as any;
    this.duration = meta?.duration ? meta.duration : 0;
    this.durationInMinutes = (this.duration / 60).toFixed(1);

    this._fileName = post.post_title as string;
    this.playModal.present();
  }

  onTimerTick(event: any) {
    const seconds = event.seconds;
    this.position = seconds / this.duration;

    console.log('timer tick', seconds, this.position);
  }

  onTimerComplete() {
    this.dismiss();
    console.log('timer complete');
  }

  onDidPresent(event: any) {
    setTimeout(() => {
      this.cdTimer.start();
      this.isPlay.set(true);

      this._mediaObject = this._media.create(this._file.dataDirectory.replace(/^file:\/\//, '') + this._fileName);
      this._mediaObject.play();
    }, 250);
  }

  onDidDismiss() {
    this.resetPlayer();
  }

  resetPlayer() {
    this._mediaObject.stop();
    this._mediaObject.release();

    this.isPlay.set(false);

    this.position = 0;
    this.duration = 0;
    this.durationInMinutes = '0';
  }

  dismiss() {
    this.playModal.dismiss();
  }

}
