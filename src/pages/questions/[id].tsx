import { Answer, QuestionBody } from "@/components";
import { ForumLayout } from "@/layouts/ForumLayout";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/types";
import classNames from "classnames";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import moment from "moment";
import ruLocale from "moment/locale/ru";

interface QuestionPageProps {
  question: TQuestion;
}

const QuestionPage: NextPage<QuestionPageProps> = ({ question }) => {
  moment.locale("ru", [ruLocale]);
  const date = moment(question.createdAt).fromNow();

  return (
    <ForumLayout>
      <div className="ques block rightSide">
        <div className="ques__inner">
          <div className="ques__title">
            <div className="item">{date}</div>
            <div className="item">
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
            <div className="item">
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#answers" />
              </svg>
              <p>0</p>
            </div>
          </div>

          <svg className="options" width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#options" />
          </svg>

          <h1 className="title">{question.title}</h1>

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

          <ul className="tagList">
            {question.tags.map((obj) => (
              <li key={obj.id} className="tag hover">
                <a href="#">{obj.name}</a>
              </li>
            ))}
          </ul>

          <QuestionBody value={question.body} />

          <div className="ques__footer"></div>
        </div>

        <div className="answers">
          <h2 className="answer__title">Ответы</h2>
          <Answer />
        </div>
      </div>
    </ForumLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    console.log(id);
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
