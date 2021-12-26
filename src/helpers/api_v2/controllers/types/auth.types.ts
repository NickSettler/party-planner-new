import { UsersPermissionsUser } from "../../schema";

export type AuthRegisterResponseT = {
  jwt: string;
  user: Pick<UsersPermissionsUser, "id" | "email" | "username">;
};

export type AuthLoginResponseT = {
  jwt: string;
  user: Pick<UsersPermissionsUser, "id" | "email" | "username">;
};
