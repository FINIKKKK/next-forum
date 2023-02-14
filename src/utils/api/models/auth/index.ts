import { AxiosInstance } from "axios";
import { TUser } from "../user/types";
import { LoginUserDto, RegisterUserDto } from "./types";

export const AuthApi = (instance: AxiosInstance) => ({
  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: TUser }>(
      "/auth/login",
      dto
    );
    return data;
  },
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: TUser }>(
      "/auth/register",
      dto
    );
    return data;
  },
});
