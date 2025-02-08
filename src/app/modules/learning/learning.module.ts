import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningRoutingModule } from './learning-routing.module';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LearningRoutingModule
  ],
  providers: [
    File,
  ]
})
export class LearningModule { }
