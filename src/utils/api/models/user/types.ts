export type TUser = {
  id: number;
  login: string;
  email: string;
  password?: string;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
  token: string;
};
