import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { Answer, QuestionBody, Reply } from "@/components";
import { ForumLayout } from "@/layouts/ForumLayout";
import { Api } from "@/utils/api";
import { useTimeNow } from "@/hooks/useTimeNow";
import { TQuestion } from "@/utils/api/models/question/types";
import { useSelectors } from "@/hooks/useSelectors";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface QuestionPageProps {
  question: TQuestion;
}

const QuestionPage: NextPage<QuestionPageProps> = ({ question }) => {
  const { data } = useSelectors((state) => state.user);
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const refPopup = React.useRef<HTMLDivElement>(null);

  useOutsideClick(refPopup, setVisiblePopup);

  return (
    <ForumLayout>
      <div className="ques block rightSide">
        <div className="ques__inner">
          <div className="ques__header">
            <div className="item">{useTimeNow(question.createdAt)}</div>
            <div className="item eye">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#eye" />
              </svg>
              <p>{question.views}</p>
            </div>
            <div className="item">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#answers" />
              </svg>
              <p>3</p>
            </div>
            <div className="item favorite">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#favorite2" />
              </svg>
              <p>0</p>
            </div>
          </div>

          <div ref={refPopup} className="popup__wrapper">
            <svg
              onClick={() => setVisiblePopup(!visiblePopup)}
              className="options"
              width="20"
              height="20"
            >
              <use xlinkHref="../img/icons/icons.svg#options" />
            </svg>
            {visiblePopup && (
              <div className="popup block">
                {data.id !== question.user.id ? (
                  <>
                    <div className="popup__item">Пожаловаться</div>
                  </>
                ) : (
                  <>
                    <div className="popup__item">
                      <a href={`/create/${question.id}`}>Редактировать</a>
                    </div>
                    <div className="popup__item">Удалить</div>
                  </>
                )}
              </div>
            )}
          </div>

          <h1 className="title">{question.title}</h1>

          <ul className="tagList">
            {question.tags.map((obj) => (
              <li key={obj.id} className="tag hover">
                <a href="#">{obj.name}</a>
              </li>
            ))}
          </ul>

          <div className="userInfo">
            <a href="#">
              <img
                src={
                  question.user.avatar !== null
                    ? `http://localhost:7777/img/avatars/${question.user.avatar}`
                    : "../img/avatar.png"
                }
                alt="avatar"
                className="avatar"
              />
            </a>
            <div className="box">
              <a href="#">
                <h6 className="username">@{question.user.login}</h6>
                <h6 className="name">
                  {question.user.firstName} {question.user.lastName}
                </h6>
              </a>
            </div>
          </div>

          <QuestionBody value={question.body} />

          <div className="ques__footer">
            <div className="ques__btn">Подписаться</div>
            <div className="ques__btn">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#share" />
              </svg>
              <p>Поделиться</p>
            </div>
          </div>
        </div>

        <div className="answers">
          <h2 className="answer__title">Ответы</h2>
          <Reply questionId={question.id} />
          <Answer />
        </div>
      </div>
    </ForumLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    const question = await Api().question.getOne(id);
    return {
      props: {
        question,
      },
    };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении вопроса");
    return {
      props: {},
    };
  }
};

export default QuestionPage;
