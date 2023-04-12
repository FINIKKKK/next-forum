import { AxiosInstance } from 'axios';

import { TCategory } from './types';

export const CategoryApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<TCategory[]>('/categories');
    return data;
  },
});
