import { AxiosInstance } from "axios";
import { ParamsTagDto, SearchTagDto, TagDto, TTag, TTags } from "./types";

export const TagApi = (instance: AxiosInstance) => ({
  async search(dto: SearchTagDto) {
    const { data } = await instance.get<SearchTagDto, { data: TTags }>(
      `/tags/search?name=${dto.name}&limit=${dto.limit}`
    );
    return data;
  },
  async getAll(params: ParamsTagDto) {
    console.log("params.search", params.search);
    const search =
      params.search !== "" && params.search !== undefined ? `&search=${params.search}` : undefined;

    const { data } = await instance.get<TTags>(
      `/tags?limit=${params.limit}&page=${params.page}${
        search ? search : ""
      }`
    );
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
