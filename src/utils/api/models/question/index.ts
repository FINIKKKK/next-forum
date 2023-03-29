import { TQuestion, QuestionDto, TQuestions, ParamsQuestionDto, UpdateQuestionDto } from "./types";
import { AxiosInstance } from "axios";

export const QuestionApi = (instance: AxiosInstance) => ({
  async getAll(params: ParamsQuestionDto) {
    const tag = params.tagBy ? `&tagBy=${params.tagBy}` : undefined;
    const search =
      params.search && params.search !== ""
        ? `&search=${params.search}`
        : undefined;
    const user = params.userId ? `&userId=${params.userId}` : undefined;
    const isAnswer = params.isAnswer ? `&isAnswer=${params.isAnswer}` : undefined;
    const favorites = params.favorites ? `&favorites=${params.favorites}` : undefined;

    const { data } = await instance.get<TQuestions>(
      `/questions?limit=${params.limit}&page=${params.page}&orderBy=${
        params.orderBy
      }${tag ? tag : ""}${search ? search : ""}${user ? user : ""}${isAnswer ? isAnswer : ""}${favorites ? favorites : ""}`
    );
    return data;
  },
  async getOne(id: number) {
    const { data } = await instance.get<TQuestion>(`/questions/${id}`);
    return data;
  },
  async create(dto: QuestionDto) {
    const { data } = await instance.post<QuestionDto, { data: TQuestion }>(
      "/questions",
      dto
    );
    return data;
  },
  async update(id: number, dto: UpdateQuestionDto) {
    const { data } = await instance.patch<UpdateQuestionDto, { data: TQuestion }>(
      `/questions/${id}`,
      dto
    );
    return data;
  },
  async remove(id: number) {
    const { data } = await instance.delete<TQuestion>(`/questions/${id}`);
    return data;
  },
});
