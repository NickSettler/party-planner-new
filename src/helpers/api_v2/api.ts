import { ApolloClient, InMemoryCache } from "@apollo/client";
import AuthController from "./controllers/auth";

export default class Api {
  private static _client: ApolloClient<any>;
  private readonly _authController: AuthController;

  constructor() {
    this._authController = new AuthController(Api._client);
  }

  public static getInstance() {
    if (!Api._client) {
      Api._client = new ApolloClient({
        uri: `${process.env.REACT_APP_API_URL}/graphql`,
        cache: new InMemoryCache(),
      });
    }

    return new Api();
  }

  get auth(): AuthController {
    return this._authController;
  }
}
