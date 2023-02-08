import { AxiosInstance } from "axios";
import { RegisterUserDto, TUser } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
  async getProfile() {
    const { data } = await instance.get<TUser>("/users/profile");
    return data;
  },
  async getAll() {
    const { data } = await instance.get<TUser[]>("/users");
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TUser>(`/users/${id}`);
    return data;
  },
  // async update(id: number, dto: RegisterUserDto) {
  //   const { data } = await instance.patch<RegisterUserDto, { data: TUser }>(
  //     `/users/${id}`,
  //     dto
  //   );
  //   return data;
  // },
  async remove(id: number) {
    const { data } = await instance.delete<TUser>(`/users/${id}`);
    return data;
  },
});
