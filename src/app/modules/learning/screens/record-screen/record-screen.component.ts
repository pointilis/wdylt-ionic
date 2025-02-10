import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Media as NGXMedia, MediaObject } from "@awesome-cordova-plugins/media/ngx";
import { UTCDate } from '@date-fns/utc';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
import { ActionsSubject, Store } from '@ngrx/store';
import { PostState } from '../../states/reducers/post/post.reducer';
import { PostActions } from '../../states/actions/post/post.actions';
import { Post } from 'src/app/database/models/post';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { reject } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-screen',
  templateUrl: './record-screen.component.html',
  styleUrls: ['./record-screen.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    CdTimerModule,
  ],
  providers: [
    NGXMedia,
    File,
    AndroidPermissions,
  ]
})
export class RecordScreenComponent  implements OnInit {

  @ViewChild(CdTimerComponent, { static: true }) cdTimer!: CdTimerComponent;

  public isPaused: WritableSignal<boolean> = signal<boolean>(false);
  public isRecording: WritableSignal<boolean> = signal<boolean>(false);
  public amplitude: WritableSignal<number> = signal<number>(0);

  private _postData: WritableSignal<Post> = signal<Post>({
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
    post_mime_type: 'audio/mpeg',
    tags: '',
    meta: '',
  });

  private _recorder!: MediaObject;
  private _timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private _dateFormater: string = 'yyyy-MM-dd hh:mm:ss';
  private _fileName!: string;
  private _amplitudeTimer!: any;
  private _duration: number = 0;
  
  public pid!: string;
  public currentPost!: any;
  public postContent: string | null = this._route.snapshot.queryParamMap.get('postContent');

  constructor(
    private _ngxMedia: NGXMedia,
    private _store: Store<PostState>,
    private _actionsSubject$: ActionsSubject,
    private _file: File,
    private _androidPermissions: AndroidPermissions,
    private _route: ActivatedRoute,
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
    const gmtDate = new TZDate(new Date(), this._timezone);
    this._fileName = `learn_${format(gmtDate, 'yyyyMMdd_hhmmss')}.mp3`;
  }

  /**
   * Request permissions
   */
  async obtainPermissions() {
    const audio = await this._androidPermissions.requestPermission(this._androidPermissions.PERMISSION.RECORD_AUDIO);
    const modifyAudio = await this._androidPermissions.requestPermission(this._androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS);
    const readExtStorage = await this._androidPermissions.requestPermission(this._androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
    const writeExtStorage = await this._androidPermissions.requestPermission(this._androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);

    const pass = audio.hasPermission && modifyAudio.hasPermission && readExtStorage.hasPermission && writeExtStorage.hasPermission;
    return new Promise((resolve, reject) => {
      return resolve(pass);
    });
  }

  stopRecording() {
    this._recorder.stopRecord();
    this._recorder.release();

    this.savePostHandler('publish');
  }

  /**
   * Save post handler
   */
  async savePostHandler(postStatus: string = 'draft') {
    // put default value such as `post_date`
    const utcDate = new UTCDate(new Date());
    const gmtDate = new TZDate(new Date(), this._timezone);
    
    this._postData.update((value: Post) => {
      return {
        ...value,
        post_title: this._fileName,
        post_content: this.postContent ? this.postContent : '',
        post_status: postStatus,
        post_date: format(utcDate, this._dateFormater),
        post_date_gmt: format(gmtDate, this._dateFormater),
        post_modified: format(utcDate, this._dateFormater),
        post_modified_gmt: format(gmtDate, this._dateFormater),
        meta: JSON.stringify({
          file: this._fileName,
          duration: this._duration,
        }),
      }
    });

    if (postStatus == 'publish') {
      clearInterval(this._amplitudeTimer);
    }

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

  async startRecording() {
    const pass = await this.obtainPermissions();

    console.log('permissions pas', pass);

    if (pass == false) {
      this._androidPermissions.requestPermissions([
        this._androidPermissions.PERMISSION.RECORD_AUDIO,
        this._androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
        this._androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this._androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      ]);

      return;
    }

    await this.performRecording();
  }

  async performRecording() {
    if (!this.isRecording()) {
      this.isRecording.set(true);
    }

    // start timer
    this.cdTimer.start();

    // initialize post
    this.savePostHandler('draft');

    if (Capacitor.isNativePlatform()) {
      this._file.createFile(this._file.dataDirectory, this._fileName, true).then((result) => {
        this._recorder = this._ngxMedia.create(this._file.dataDirectory.replace(/^file:\/\//, '') + this._fileName);
        this._recorder.startRecord();

        this._amplitudeTimer = setInterval(() => {
          // get media amplitude
          this._recorder.getCurrentAmplitude().then(value => {
            this.amplitude.set(value);
          });
        }, 10);
      });
    }
  }

  changeProgress() {
    this.isPaused.set(!this.isPaused());

    if (!this.isPaused()) {
      this.cdTimer.resume();
      if (Capacitor.isNativePlatform()) this._recorder.resumeRecord();
    } else {
      this.cdTimer.stop();
      if (Capacitor.isNativePlatform()) this._recorder.pauseRecord();
    }
  }

  onTimerTick(event: any) {
    this._duration = event.tick_count;
    
    // max. 50 minutes
    if ((this._duration / 60) >= 50) {
      this.savePostHandler('publish');
    }
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');

    if (Capacitor.isNativePlatform()) {
      this._recorder.stopRecord();
      this._recorder.release();
    }
  }

}
