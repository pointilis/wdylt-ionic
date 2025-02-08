import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, IonModal } from '@ionic/angular';
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
  private _dateFormater: string = 'yyyy-MM-dd hh:mm:ss';
  private _filter!: PostFilter;
  public selectedDate!: string;

  constructor() { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
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
