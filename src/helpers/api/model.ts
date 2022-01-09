import { API_TABLES } from "./consts";
import { ID, ManyItems } from "@directus/sdk";

type DirectusModel = {
  [API_TABLES.DIRECTUS_USERS]: UserModel;
  [API_TABLES.PARTIES]: PartyModel;
  [API_TABLES.PARTIES_DIRECTUS_USERS]: PartiesToDirectusUsersModel;
};

export type PartiesToDirectusUsersModel<S extends "API" | "WEB" = "WEB"> = {
  id: ID;
  directus_users_id: S extends "API" ? ID : S extends "WEB" ? UserModel : never;
  parties_id: S extends "API" ? ID : S extends "WEB" ? PartyModel<S> : never;
  came: boolean;
};

type CollectionStatus = "published" | "archived" | "draft";

export type PartyModel<S extends "API" | "WEB" = "WEB"> = {
  id: ID;
  name: string;
  status: CollectionStatus;
  sort: number;
  user_created: ID;
  user_updated: ID;
  date_created: string;
  date_updated: string;
  people: ManyItems<any>;
  goods: ID[];
  members: S extends "API"
    ? ID[]
    : S extends "WEB"
    ? PartiesToDirectusUsersModel[]
    : never;
};

export type EventModel<S extends "API" | "WEB" = "WEB"> = PartyModel<S>;

export type UserModel = {
  id: ID;
  first_name: string;
  last_name: string | null;
  email: string;
  password: string;
  avatar: string | null;
  location: string;
  title: string;
  description: string;
  tags: string;
  language: string;
  theme: string;
  tfa_secret: boolean;
  email_notifications: boolean;
  status: string;
  role: string;
  token: string;
};

export default DirectusModel;
