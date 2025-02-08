import { Component } from '@angular/core';
import { SafeArea } from '@capacitor-community/safe-area';
import { Platform } from '@ionic/angular';
import '@capacitor-community/safe-area';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  constructor(
    private _platform: Platform,
  ) {
    this._platform.ready().then(() => {
      SafeArea.disable({
        config: {
          customColorsForSystemBars: false,
          statusBarColor: '#000000', // transparent
          statusBarContent: 'light',
          navigationBarColor: '#000000', // transparent
          navigationBarContent: 'light',
        },
      });
    });
  }

}
