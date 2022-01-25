import {
  default as mbxStaticClient,
  StaticMapService,
} from "@mapbox/mapbox-sdk/services/static";

export default class MapboxHelper {
  private static _token: string;
  private static _instance: MapboxHelper;
  private static _staticClient: StaticMapService;

  private constructor() {
    if (!process.env.REACT_APP_MAPBOX_TOKEN)
      throw new Error("Mapbox token is not defined");

    MapboxHelper._token = process.env.REACT_APP_MAPBOX_TOKEN;

    MapboxHelper._staticClient = mbxStaticClient({
      accessToken: MapboxHelper._token,
    });
  }

  public static getInstance() {
    if (!MapboxHelper._instance) MapboxHelper._instance = new MapboxHelper();

    return MapboxHelper._instance;
  }

  get staticClient(): StaticMapService {
    return MapboxHelper._staticClient;
  }
}
