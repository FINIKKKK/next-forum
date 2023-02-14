import React from "react";

import { ForumLayout } from "@/layouts/ForumLayout";
import { Question } from "@/components";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";

export default function Home() {
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { total, items } = await Api().question.getAll();
        setQuestions(items);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении вопросов");
      }
    })();
  }, []);

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
      </div>
    </ForumLayout>
  );
}
