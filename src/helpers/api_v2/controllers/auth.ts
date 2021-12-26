import {
  ApolloClient,
  ApolloError,
  FetchResult,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { LOCAL_STORAGE_KEYS } from "../../localStorage/consts";
import { AuthLoginResponseT, AuthRegisterResponseT } from "./types/auth.types";
import { FetchResponse } from "../types";

export default class AuthController {
  constructor(private readonly _client: ApolloClient<InMemoryCache>) {}

  public register(email: string, username: string, password: string) {
    return this._client
      .mutate<FetchResponse<"register", AuthRegisterResponseT>>({
        mutation: gql`
          mutation{
              register(input:{email:"${email}", password:"${password}", username:"${username}"}){
                  jwt
                  user{
                      id
                      username
                      email
                  }
              }
          }
      `,
      })
      .then(
        (
          data: FetchResult<FetchResponse<"register", AuthRegisterResponseT>>
        ) => {
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.AUTH_TOKEN,
            data.data!.register.jwt
          );

          return {
            jwt: data.data!.register.jwt,
            user: data.data!.register.user,
          };
        }
      )
      .catch((error: ApolloError) => {
        throw error;
      });
  }

  public login(email: string, password: string) {
    return this._client
      .mutate<FetchResponse<"login", AuthLoginResponseT>>({
        mutation: gql`
        mutation {
            login(input: {identifier: "${email}", password: "${password}"}) {
                jwt
                user {
                    id
                    username
                    email
                }
            }
        }
      `,
      })
      .then((data: FetchResult<FetchResponse<"login", AuthLoginResponseT>>) => {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.AUTH_TOKEN,
          data.data!.login.jwt
        );

        return {
          jwt: data.data!.login.jwt,
          user: data.data!.login.user,
        };
      })
      .catch((error: ApolloError) => {
        throw error;
      });
  }

  public logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  }
}
