export type LoginUserDto = {
  email: string;
  password?: string;
};

export type RegisterUserDto = {
  name: string;
  email: string;
  password?: string;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
};
