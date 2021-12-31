import { Directus, DirectusOptions } from "@directus/sdk";
import DirectusModel from "./model";

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
}
