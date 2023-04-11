import { AxiosInstance } from 'axios';

import { TUser, ParamsUserDto, TUsers, UpdateUserDto } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async getProfile() {
    const { data } = await instance.get<TUser>('/users/profile');
    return data;
  },
  
  async getAll(params: ParamsUserDto) {
    const search =
      params.search !== '' && params.search !== undefined
        ? `&search=${params.search}`
        : undefined;

    const { data } = await instance.get<TUsers>(
      `/users?limit=${params.limit}&page=${params.page}${search ? search : ''}`,
    );
    return data;
  },

  async getOne(login: string) {
    const { data } = await instance.get<TUser>(`/users/${login}`);
    return data;
  },

  async updateAvatar(id: number, file: any) {
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await instance.patch(`/users/avatar/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async updatePassword(
    id: number,
    dto: { oldPassword: string; newPassword: string },
  ) {
    const { data } = await instance.patch<
      { oldPassword: string; newPassword: string },
      { data: TUser }
    >(`/users/password/${id}`, dto);
    return data;
  },

  async update(id: number, dto: UpdateUserDto) {
    const { data } = await instance.patch<UpdateUserDto, { data: TUser }>(
      `/users/${id}`,
      dto,
    );
    return data;
  },

  async favorite(questionId: number) {
    const { data } = await instance.post<
      { questionId: number },
      { data: TUser }
    >(`/users/favorite`, { questionId });
    return data;
  },

  async remove(id: number) {
    const { data } = await instance.delete<TUser>(`/users/${id}`);
    return data;
  },
});
