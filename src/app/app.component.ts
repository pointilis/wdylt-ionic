declare var window: any;

import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { IonApp, Platform } from '@ionic/angular';
import { SafeArea } from '@capacitor-community/safe-area';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const insetBottom = this.getInsetBottom();
    this.setIonAppMarginBottom(insetBottom);
  }

  @ViewChild(IonApp, { read: ElementRef }) ionApp!: IonApp;

  private initialInsetBottom: number = 0;
  
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

  ionViewDidEnter() {
    this.initialInsetBottom = this.getInsetBottom();
    this.setIonAppMarginBottom(this.initialInsetBottom);
  }

  setIonAppMarginBottom(marginBottom: number = 0) {
    const ionAppEl = document.getElementsByTagName('ion-app')?.[0];
    if (ionAppEl && marginBottom <= 0) {
      ionAppEl.style.marginBottom = `${this.initialInsetBottom}px`;
    }
  }

  getInsetBottom() {
    let value: number = 0;
    const styles = document.documentElement.getAttribute('style')?.split(';');
    if (styles && styles?.length > 0) {
      const styleInsetBottom = styles.find(el => el.includes('--safe-area-inset-bottom'));
      if (styleInsetBottom) {
        const insetBottomValue = styleInsetBottom?.split(',')?.[1]?.match(/\d+/g)?.join();
        if (insetBottomValue) {
          value = parseInt(insetBottomValue);
        }
      }
    }

    return value;
  }

}
