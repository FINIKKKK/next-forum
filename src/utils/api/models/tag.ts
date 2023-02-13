import { AxiosInstance } from "axios";
import { TagDto, TTag } from "../types";

export const TagApi = (instance: AxiosInstance) => ({
  async search(name: string) {
    const { data } = await instance.get<string, { data: TTag[] }>(
      `/tags/search?name=${name}`
    );
    return data;
  },
  async getAll() {
    const { data } = await instance.get<TTag[]>("/tags");
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TTag>(`/tags/${id}`);
    return data;
  },
  async create(dto: TagDto) {
    const { data } = await instance.post<TagDto, { data: TTag }>("/tags", dto);
    return data;
  },
  async update(id: number, dto: TagDto) {
    const { data } = await instance.patch<TagDto, { data: TTag }>(
      `/tags/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TTag>(`/tags/${id}`);
    return data;
  },
});
