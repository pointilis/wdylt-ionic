import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { PostStorageService } from './post.storage.service';
import { SQLiteService } from './sqlite.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private postStorageService: PostStorageService,
  ) { }

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      this._initializePostDatabase();
    });
  }

  private async _initializePostDatabase() {
    this.platform = this.sqliteService.platform;
    try {
      if (this.sqliteService.platform === 'web') {
        await this.sqliteService.initWebStore();
      }
      // Initialize the postdb database
      const DB_POSTS = 'postdb'
      await this.postStorageService.initializeDatabase(DB_POSTS);
      // Here Initialize MOCK_DATA if required

      // Initialize whatever database and/or MOCK_DATA you like

      if( this.sqliteService.platform === 'web') {
          await this.sqliteService.saveToStore(DB_POSTS);
      }

      this.isAppInit = true;
    } catch (error) {
      console.log(`initializeAppError: ${error}`);
      await Toast.show({
        text: `initializeAppError: ${error}`,
        duration: 'long'
      });
    }
  }

}