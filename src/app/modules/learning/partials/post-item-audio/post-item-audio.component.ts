import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-post-item-audio',
  templateUrl: './post-item-audio.component.html',
  styleUrls: ['./post-item-audio.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
  ],

  // https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular
  encapsulation: ViewEncapsulation.None,
})
export class PostItemAudioComponent  implements OnInit {

  @Output() player: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  @Input('post') post!: any;
  @Input('last') last: boolean = false;

  public duration: number = 0; // in seconds
  public durationInMinutes!: string;
  public position: number = 0;

  constructor(
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() { 
    this.setVariableValue();
  }

  ngOnChanges() {
    this.setVariableValue();
  }

  setVariableValue() {
    this.duration = this.post.meta?.duration ? this.post.meta.duration : 0;
    this.durationInMinutes = (this.duration / 60).toFixed(1);
  }

  onPlay() {
    this.player.emit(this.post);
  }

  onDeleteHandler(pid: any) {
    this.onDelete.emit(pid);
  }

  presentHTMLContent(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }

}
