import {
  AuthCredentials,
  AuthResult,
  Directus,
  DirectusOptions,
} from "@directus/sdk";
import DirectusModel from "./model";
import { LOCAL_STORAGE_KEYS } from "../localStorage/consts";

export default class Api extends Directus<DirectusModel> {
  private static _instance: Api;
  private static _baseUrl: string = process.env.REACT_APP_API_URL!;

  private constructor(url: string, options: DirectusOptions) {
    super(url, options);
  }

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api(Api._baseUrl, {
        auth: {
          autoRefresh: true,
          mode: "cookie",
        },
      });
    }
    return Api._instance;
  }

  public login(credentials: AuthCredentials): Promise<AuthResult> {
    return this.auth.login(credentials).then((auth: AuthResult) => {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.AUTH_EXPIRES_AT,
        `${Date.now() + auth.expires}`
      );
      return auth;
    });
  }

  public async logout(): Promise<void> {
    return this.auth.logout().catch(() => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_EXPIRES);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_EXPIRES_AT);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_REFRESH_TOKEN);
    });
  }

  static get url(): string {
    return Api._baseUrl;
  }
}
