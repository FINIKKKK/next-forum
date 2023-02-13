import { Answer } from "@/components";
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

          <div className="body">
            {question.body.map((obj) =>
              obj.type === "paragraph" ? (
                <p
                  className="text el"
                  dangerouslySetInnerHTML={{
                    __html: obj.data.text,
                  }}
                />
              ) : obj.type === "list" ? (
                <ul
                  className={classNames("list el", {
                    ordered: obj.data.style === "ordered",
                  })}
                >
                  {obj.data.items.map((item: string) => (
                    <li>{item}</li>
                  ))}
                </ul>
              ) : obj.type === "delimiter" ? (
                <div className="delimeter el">***</div>
              ) : obj.type === "header" ? (
                obj.data.level === 6 ? (
                  <h6 className="title">{obj.data.text}</h6>
                ) : obj.data.level === 5 ? (
                  <h5 className="title">{obj.data.text}</h5>
                ) : obj.data.level === 4 ? (
                  <h4 className="title">{obj.data.text}</h4>
                ) : obj.data.level === 3 ? (
                  <h3 className="title">{obj.data.text}</h3>
                ) : obj.data.level === 2 ? (
                  <h2 className="title">{obj.data.text}</h2>
                ) : obj.data.level === 1 ? (
                  <h1 className="title">{obj.data.text}</h1>
                ) : null
              ) : obj.type === "codeBox" ? (
                <div className="code el">
                  <div className="code__lg">{obj.data.language}</div>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: obj.data.code,
                    }}
                  />
                </div>
              ) : obj.type === "quote" ? (
                <div className="quote el">
                  <svg width="20" height="20">
                    <use xlinkHref="../img/icons/icons.svg#answers" />
                  </svg>
                  <div className="quote__content">
                    <h3>{obj.data.text}</h3>
                    <p>{obj.data.caption}</p>
                  </div>
                </div>
              ) : obj.type === "image" ? (
                <div className="img el">
                  <img src={obj.data.file.url} alt="img" />
                </div>
              ) : null
            )}
          </div>

          {/* <div className="ques__content">
            <p className="text">
              Всем привет!
              <br />
              <br />
              Помогите, пожалуйста, найти ошибку в коде. Прошу прощения заранее,
              если мой вопрос кажется вам глупым, я только изучаю с++ и никак не
              могу понять, что делаю не так.
              <br />
              <br />
              Я писала лабораторную для института, суть: создать базу данных на
              основе структуры, а также управлять этими структурами, используя
              методы класса. Вывод на экран разных сообщений обязательно должен
              быть где-то вне класса (в классе не может быть cin, cout).
              <br />
              <br />
              С проблемой я столкнулась уже в процессе создания базы данных
              (поэтому других функций пока нет). Я могу ввести название
              экзамена, и выполнение программы останавливается, хотя по задумке
              она должна попросить ввести еще дату, фамилию (и так всего 3 раза,
              т.е. мы должны заполнить 3 структуры, потому что введенный размер
              базы данных = 3).
              <br />
              <br />
              Вот код:
            </p>

            <div className="code">
              <div className="code__inner">
                struct myStructure <br />
                string ExamName;
                <br />
                string ExamDate;
                <br />
                string ProfessorLastname;
                <br />
                bool isEmpty = true;
                <br />
              </div>
            </div>

            <img src="../img/test-img.png" alt="img" className="img" />

            <p className="text">
              Может быть, это какая-то проблема со string?
              <br />
              <br />
              (если есть замечания по поводу стиля, логичности\нелогичности, с
              радостью выслушаю!)
              <br />
              <br />
              Благодарю за внимание!
            </p>
          </div> */}

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
