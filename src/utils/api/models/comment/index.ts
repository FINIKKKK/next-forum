import { AxiosInstance } from "axios";
import { TComment, CommentDto, TComments, ParamsCommentDto } from "./types";

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(params: ParamsCommentDto) {
    const answer = params.answerId ? `answerId=${params.answerId}` : undefined;
    const question = params.questionId ? `questionId=${params.questionId}` : undefined;
    const { data } = await instance.get<TComments>(`/comments?${answer ? answer : ''}${question ? question : ''}`);
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TComment>(`/comments/${id}`);
    return data;
  },
  async create(dto: CommentDto) {
    const { data } = await instance.post<CommentDto, { data: TComment }>(
      "/comments",
      dto
    );
    return data;
  },
  async update(id: number, dto: CommentDto) {
    const { data } = await instance.patch<CommentDto, { data: TComment }>(
      `/comments/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TComment>(`/comments/${id}`);
    return data;
  },
});
