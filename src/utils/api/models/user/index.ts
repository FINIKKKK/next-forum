import { TUser, ParamsUserDto, TUsers, UpdateUserDto } from "./types";
import { AxiosInstance } from "axios";

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
  async getOne(login: string) {
    const { data } = await instance.get<TUser>(`/users/${login}`);
    return data;
  },
  async updateAvatar(id: number, file: any) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imagePath", 'avatars');

    const userAvatar = await instance.patch(`/users/avatar/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return userAvatar;
  },
  async update(id: number, dto: UpdateUserDto) {
    const { data } = await instance.patch<UpdateUserDto, { data: TUser }>(
      `/users/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TUser>(`/users/${id}`);
    return data;
  },
});
