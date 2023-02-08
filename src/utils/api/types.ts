export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = {
  login: string;
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  login: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};
