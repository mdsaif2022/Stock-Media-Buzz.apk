import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.genztools.freemediabuzz',
  appName: 'FreeMediaBuzz',
  webDir: 'dist/spa',
  server: {
    // Use production URL for API calls
    // Remove this if you want to use the embedded web app
    // url: 'https://genztools.top',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    // Required for API calls over HTTP
    usesCleartextTraffic: true,
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true
    }
  }
};

export default config;

