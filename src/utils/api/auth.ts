import { AxiosInstance } from "axios";
import { LoginUserDto, RegisterUserDto } from "./types";

export const AuthApi = (instance: AxiosInstance) => ({
  async login(dto: LoginUserDto) {
    const { data } = await instance.post<LoginUserDto, { data: string }>(
      "/",
      dto
    );
    return data;
  },
  async register(dto: RegisterUserDto) {
    const { data } = await instance.post<RegisterUserDto, { data: string }>(
      "/",
      dto
    );
    return data;
  },
});
