/// <reference types="@capacitor-firebase/authentication" />
/// <reference types="@capacitor-community/safe-area" />
/// <reference types="@capacitor/keyboard" />

import type { CapacitorConfig } from '@capacitor/cli';
import '@capacitor-community/safe-area';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.wdylt.app',
  appName: 'What Did You Learn Today',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#000000',
      statusBarContent: 'light',
      navigationBarColor: '#000000',
      navigationBarContent: 'light',
      offset: 0,
    },
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'wdylt-sqlite-database',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
      },
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
};

export default config;
