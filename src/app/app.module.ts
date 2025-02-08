import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { defineCustomElements as pwaElements} from '@ionic/pwa-elements/loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Capacitor } from '@capacitor/core';
import { InitializeAppService } from './database/services/initialize-app.service';
import { SQLiteService } from './database/services/sqlite.service';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostReducer } from './modules/learning/states/reducers/post/post.reducer';
import { PostEffects } from './modules/learning/states/effects/post/post.effects';
import { File } from '@awesome-cordova-plugins/file/ngx';

// --> Below only required if you want to use a web platform
const platform = Capacitor.getPlatform();
if (platform === "web") {
  // Web platform
  // required for toast component in Browser
  pwaElements(window);

  // required for jeep-sqlite Stencil component
  // to use a SQLite database in Browser
  jeepSqlite(window);

  window.addEventListener("DOMContentLoaded", async () => {
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    await customElements.whenDefined('jeep-sqlite');
    // @ts-ignore
    jeepEl.autoSave = true;
  });
}
// Above only required if you want to use a web platform <--

// Define the APP_INITIALIZER factory
export function initializeFactory(init: InitializeAppService) {
  return () => init.initializeApp();
}

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'md',
    }), 
    AppRoutingModule, 
    StoreModule.forRoot({
      post: PostReducer,
    }, {}), 
    EffectsModule.forRoot([
      PostEffects,
    ]),
  ],
  providers: [
    File,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    SQLiteService,
    InitializeAppService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
