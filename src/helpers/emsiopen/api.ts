import axios from "axios";
import { EMSIJob } from "./types";
import FirebaseHelper from "../firebase";
import { getRemoteConfig, getValue } from "firebase/remote-config";

export default class EMSIOpenApi {
  private static API_URL = "https://emsiservices.com";
  private static AUTH_URL = "https://auth.emsicloud.com/connect/token";
  private token: string | false = false;
  private static _instance: EMSIOpenApi;

  private constructor(
    private clientID: string | undefined,
    private clientSecret: string | undefined
  ) {
    const firebaseRemoteConfig = getRemoteConfig(
      FirebaseHelper.getInstance().app
    );

    if (!getValue(firebaseRemoteConfig, "use_roles_autocomplete").asBoolean()) {
      throw new Error("Autocomplete is disabled in Firebase Remote Config");
    }

    if (!this.clientID || !this.clientSecret) {
      throw new Error("Missing EMSI Client ID or Client Secret");
    }
  }

  private async auth() {
    const authData = {
      client_id: "hzj5ffgrxe0asc12",
      client_secret: "HkY62TEj",
      grant_type: "client_credentials",
      scope: "emsi_open",
    };

    await axios
      .post(EMSIOpenApi.AUTH_URL, new URLSearchParams(authData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(({ data }) => data)
      .then(({ access_token }) => {
        this.token = access_token;
      });
  }

  public static async getInstance(): Promise<EMSIOpenApi> {
    if (!this._instance) {
      this._instance = new EMSIOpenApi(
        process.env.REACT_APP_EMSI_CLIENT_ID,
        process.env.REACT_APP_EMSI_CLIENT_SECRET
      );

      await this._instance.auth();
    }

    return this._instance;
  }

  public findTitles(query: string) {
    if (!this.token) return;

    return axios
      .get<{ data: Array<EMSIJob> }>(
        `${EMSIOpenApi.API_URL}/titles/versions/latest/titles?q=${query}&limit=25`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      )
      .then(({ data }) => data);
  }
}
