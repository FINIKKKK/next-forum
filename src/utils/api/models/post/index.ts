import { AxiosInstance } from 'axios';

import { TPost, PostDto, ParamsPostDto, TPosts } from './types';

export const PostApi = (instance: AxiosInstance) => ({
  async getAll(params: ParamsPostDto) {
    const tag = params.tagBy ? `&tagBy=${params.tagBy}` : undefined;
    const search =
      params.searchBy && params.searchBy !== ''
        ? `&searchBy=${params.searchBy}`
        : undefined;
    const user = params.userId ? `&userId=${params.userId}` : undefined;
    const category = params.categoryId
      ? `&categoryId=${params.categoryId}`
      : undefined;
    const favorites = params.favorites
      ? `&favorites=${params.favorites}`
      : undefined;

    const { data } = await instance.get<TPosts>(
      `/posts?limit=${params.limit}&page=${params.page}&orderBy=${
        params.orderBy
      }${tag ? tag : ''}${search ? search : ''}${user ? user : ''}${
        category ? category : ''
      }${favorites ? favorites : ''}`,
    );
    return data;
  },

  async getOne(id: number) {
    const { data } = await instance.get<TPost>(`/posts/${id}`);
    return data;
  },

  async create(dto: PostDto) {
    const { data } = await instance.post<PostDto, { data: TPost }>(
      '/posts',
      dto,
    );
    return data;
  },

  async update(id: number, dto: PostDto) {
    const { data } = await instance.patch<PostDto, { data: TPost }>(
      `/posts/${id}`,
      dto,
    );
    return data;
  },

  async remove(id: number) {
    const { data } = await instance.delete<TPost>(`/posts/${id}`);
    return data;
  },
});
