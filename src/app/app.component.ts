import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SafeArea } from '@capacitor-community/safe-area';

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
    this._platform.ready().then(async () => {
      SafeArea.enable({
        config: {
          customColorsForSystemBars: true,
          statusBarColor: '#000000',
          statusBarContent: 'light',
          navigationBarColor: '#000000',
          navigationBarContent: 'light',
        },
      });
    });
  }

}
