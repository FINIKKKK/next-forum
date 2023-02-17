import { AxiosInstance } from "axios";
import { TUser, ParamsUserDto, TUsers } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
  async getProfile() {
    const { data } = await instance.get<TUser>("/users/profile");
    return data;
  },
  async getAll(params: ParamsUserDto) {
    const search =
      params.search !== "" && params.search !== undefined
        ? `&search=${params.search}`
        : undefined;

    const { data } = await instance.get<TUsers>(
      `/users?limit=${params.limit}&page=${params.page}${search ? search : ""}`
    );
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
