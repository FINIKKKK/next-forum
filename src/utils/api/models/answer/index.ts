import { AxiosInstance } from 'axios';

import { TAnswer, AnswerDto, ParamsAnswerDto, UpdateAnswerDto } from './types';

export const AnswerApi = (instance: AxiosInstance) => ({
  async getAll(params: ParamsAnswerDto) {
    const { data } = await instance.get<ParamsAnswerDto, { data: TAnswer[] }>(
      `/answers?questionId=${params.questionId}&orderBy=${params.orderBy}`,
    );
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TAnswer>(`/answers/${id}`);
    return data;
  },
  async create(dto: AnswerDto) {
    const { data } = await instance.post<AnswerDto, { data: TAnswer }>(
      '/answers',
      dto,
    );
    return data;
  },
  async updateIsAnswer(id: number, dto: UpdateAnswerDto) {
    const { data } = await instance.patch<UpdateAnswerDto, { data: TAnswer }>(
      `/answers/isAnswer/${id}`,
      dto,
    );
    return data;
  },
  async update(id: number, dto: UpdateAnswerDto) {
    const { data } = await instance.patch<UpdateAnswerDto, { data: TAnswer }>(
      `/answers/${id}`,
      dto,
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TAnswer>(`/answers/${id}`);
    return data;
  },
});
