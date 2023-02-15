import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { ForumLayout } from "@/layouts/ForumLayout";
import { Pagination, Question } from "@/components";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import { useRouter } from "next/router";

export default function Home() {
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [total, setTotal] = React.useState(0);
  const [limit, setLimit] = React.useState(2);
  const [page, setPage] = React.useState(1);
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: 2,
          page: page,
        };
        const { total, items } = await Api().question.getAll(params);
        setQuestions(items);
        setTotal(total);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении вопросов");
      }
    })();
  }, [page]);

  React.useEffect(() => {
    const params = qs.stringify({
      page,
    });

    router.push(`?${params}`);
  }, [page]);

  return (
    <ForumLayout>
      <div className="content block">
        <h1 className="title">Все вопросы</h1>

        <div className="search input block hover">
          <input type="text" placeholder="Поиск вопросов" />
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#search" />
          </svg>
        </div>

        <div className="filters">
          <div className="select block hover">
            <p>Последние</p>
            <svg width="20" height="20">
              <use xlinkHref="./img/icons/icons.svg#arrow-down" />
            </svg>
          </div>

          <div className="chooseAnswers">
            <div className="item active">
              <p>С ответом</p>
              <svg width="20" height="20">
                <use xlinkHref="./img/icons/icons.svg#check" />
              </svg>
            </div>
            <div className="item">
              <p>Без ответа</p>
              <svg width="20" height="20">
                <use xlinkHref="./img/icons/icons.svg#check" />
              </svg>
            </div>
          </div>
        </div>

        <div className="questions">
          {questions.map((obj: TQuestion) => (
            <Question key={obj.id} {...obj} />
          ))}
        </div>

        <Pagination limit={limit} total={total} setPage={setPage} />
      </div>
    </ForumLayout>
  );
}
