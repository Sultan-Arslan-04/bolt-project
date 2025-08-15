import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.offgrid.talk',
  appName: 'OffGridTalk',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    BluetoothMesh: {},
    WifiDirect: {}
  }
};

export default config;
