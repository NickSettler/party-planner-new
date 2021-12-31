import { API_TABLES } from "./consts";
import { ID } from "@directus/sdk";

type DirectusModel = {
  [API_TABLES.DIRECTUS_USERS]: UserModel;
};

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
