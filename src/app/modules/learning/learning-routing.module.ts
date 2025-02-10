import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WritingScreenComponent } from './screens/writing-screen/writing-screen.component';
import { ListScreenComponent } from './screens/list-screen/list-screen.component';
import { RecordScreenComponent } from './screens/record-screen/record-screen.component';
import { leaveRecordingGuard } from 'src/app/modules/shared/guards/leave-recording.guard';

const routes: Routes = [
  {
    path: 'write',
    children: [
      {
        path: '',
        component: WritingScreenComponent,
      },
      {
        path: ':pid',
        component: WritingScreenComponent,
      }
    ]
  },
  {
    path: 'record',
    canDeactivate: [leaveRecordingGuard],
    component: RecordScreenComponent,
  },
  {
    path: '',
    component: ListScreenComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
