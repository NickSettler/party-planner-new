import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";

export const firebaseConfig = {
  apiKey: "AIzaSyAO-4HLk08R98dV9Ro0CqMAJxCzA8RYAG8",
  authDomain: "party-planner-app-15b47.firebaseapp.com",
  projectId: "party-planner-app-15b47",
  storageBucket: "party-planner-app-15b47.appspot.com",
  messagingSenderId: "72324198320",
  appId: "1:72324198320:web:f3f478202592d8da2ab075",
  measurementId: "G-LFX8QECN4V",
};

export default class FirebaseHelper {
  private static _instance: FirebaseHelper;
  private _app?: FirebaseApp;

  private constructor(private config: FirebaseOptions) {}

  public static getInstance(): FirebaseHelper {
    if (!FirebaseHelper._instance)
      FirebaseHelper._instance = new FirebaseHelper(firebaseConfig);

    return FirebaseHelper._instance;
  }

  public init() {
    this._app = initializeApp(this.config);
    const remoteConfig = getRemoteConfig(this._app);
    remoteConfig.defaultConfig = {
      use_roles_autocomplete: false,
    };
    fetchAndActivate(remoteConfig);
  }

  get app(): FirebaseApp {
    if (!this._app) throw new Error("Firebase app is not initialized");
    return this._app;
  }
}
