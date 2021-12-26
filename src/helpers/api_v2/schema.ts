export type ID = number | string;

export type UsersPermissionsUser = {
  id: ID;
  email: string;
  username: string;
  blocked?: boolean;
  confirmed?: boolean;
  role?: UsersPermissionsRole;
  created_at: Date;
  provider?: string;
  updated_at: Date;
};

export type UsersPermissionsRole = {
  id: ID;
  name: string;
  description?: string;
  permissions?: Array<UsersPermissionsPermission>;
  type?: string;
  users?: Array<UsersPermissionsUser>;
};

export type UsersPermissionsPermission = {
  id: ID;
  action: string;
  controller: string;
  enabled: boolean;
  type: string;
  policy?: string;
  role?: UsersPermissionsRole;
};
