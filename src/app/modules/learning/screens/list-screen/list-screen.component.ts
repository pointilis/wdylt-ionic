import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule, IonModal } from '@ionic/angular';
import { PostListComponent } from '../../partials/post-list/post-list.component';
import { UTCDate } from '@date-fns/utc';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
import { PostFilter } from 'src/app/database/models/post';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    PostListComponent,
  ]
})
export class ListScreenComponent  implements OnInit {

  @ViewChild(PostListComponent) postListComponent!: PostListComponent;
  @ViewChild('filterModal') filterModal!: IonModal;

  private _timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private _filter!: PostFilter;
  public selectedDate!: string;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  /**
   * Given note alert
   */
  async addNote() {
    const alrt = await this.alertCtrl.create({
      header: 'Confirmation',
      subHeader: 'Make sure you are in the right place before starting to record.',
      inputs: [
        {
          type: 'textarea',
          placeholder: 'Add note (optional)',
          name: 'post_content',
          cssClass: '!mt-0',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Start',
          role: 'confirm',
          handler: (data) => {
            this.router.navigate(['/record'], { queryParams: { postContent: data.post_content }});
          }
        },
      ]
    });

    await alrt.present();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // put default value such as `post_date`
    const gmtDate = new TZDate(new Date(), this._timezone);
    this.selectedDate = format(gmtDate, 'yyyy-MM-dd');
    
    this._filter = {
      ...this._filter,
      post_date_gmt: this.selectedDate,
    }

    this.postListComponent.getPosts(this._filter);
  }

  onDateChange(event: any) {
    this._filter = {
      post_date_gmt: event.detail.value,
    }

    this.onConfirm();
  }

  onConfirm() {
    this.postListComponent.getPosts(this._filter);
    this.filterModal.dismiss();
    this.selectedDate = this._filter.post_date_gmt as string;
  }

  onCancel() {
    this.filterModal.dismiss();
  }

}
