import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-post-item-audio',
  templateUrl: './post-item-audio.component.html',
  styleUrls: ['./post-item-audio.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
  ],
})
export class PostItemAudioComponent  implements OnInit {

  @Output() player: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  @Input('post') post!: any;
  @Input('last') last: boolean = false;

  public duration: number = 0; // in seconds
  public durationInMinutes!: string;
  public position: number = 0;

  constructor() { }

  ngOnInit() {
    this.duration = this.post.meta?.duration ? this.post.meta.duration : 0;
    this.durationInMinutes = (this.duration / 60).toFixed(1);
  }

  onPlay() {
    this.player.emit(this.post);
  }

  onDeleteHandler(pid: any) {
    this.onDelete.emit(pid);
  }

}
