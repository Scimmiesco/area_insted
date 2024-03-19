import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.areainsted.app',
  appName: 'ava',
  webDir: 'dist/ava',
  server: {
    androidScheme: 'https'
  }
};

export default config;
