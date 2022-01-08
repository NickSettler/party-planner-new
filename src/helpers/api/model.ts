import { API_TABLES } from "./consts";
import { ID, ManyItems } from "@directus/sdk";

type DirectusModel = {
  [API_TABLES.DIRECTUS_USERS]: UserModel;
  [API_TABLES.PARTIES]: PartyModel;
};

type CollectionStatus = "published" | "archived" | "draft";

export type PartyModel = {
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
  members: ID[];
};

export type EventModel = PartyModel;

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
