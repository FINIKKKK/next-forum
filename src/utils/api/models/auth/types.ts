export type LoginUserDto = {
  email: string;
  password: string;
};

export type RegisterUserDto = LoginUserDto & {
  login: string;
};
