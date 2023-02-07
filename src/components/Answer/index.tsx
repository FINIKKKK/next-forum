import React from "react";

import ss from "./Answer.module.scss";

interface AnswerProps {}

export const Answer: React.FC<AnswerProps> = ({}) => {
  return (
    <div className="answer">
      <div className="review">
        <svg className="arrow" width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#arrow-up" />
        </svg>
        <div className="number">10</div>
        <svg className="arrow" width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#arrow-down" />
        </svg>
      </div>
      <div className="answer__content">
        <svg className="options" width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#options" />
        </svg>

        <div className="answer__header">
          <div className="userInfo">
            <a href="#">
              <img src="../img/avatar.png" alt="avatar" className="avatar" />
            </a>
            <div className="box">
              <a href="#">
                <h6 className="name">Dmitriy Bozhko</h6>
              </a>
              <div className="date">3 часа назад</div>
            </div>
          </div>
          <div className="isAnswer">
            <p>Ответ</p>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#check" />
            </svg>
          </div>
        </div>

        <div className="ques__content">
          <p className="text">
            В строке <b>myStructure* dataBase;</b> вы определили указатель, но
            не сказали куда ему ссылаться. Далее в методе <b>NewDataBase</b> вы
            обращаетесь к элементу массива:{" "}
            <b>dataBase[index].ExamName = EnterExamName();</b> , а так как
            указатель ссылается "в никуда" - при выполнении этого участка
            получаете ошибку. Чтобы этого избежать необходимо предварительно
            выделить память:
          </p>

          <div className="code">
            <div className="code__inner">
              ... <br />
              dataBaseSize = EnterSize(); <br />
              dataBase = new myStructure[dataBaseSize];
              <br />
              ...
              <br />
            </div>
          </div>

          <p className="text">
            Может быть, это какая-то проблема со string?
            <br />
            <br />
            Так как память выделяется вами, вами же она и должна быть
            возвращена, для этого необходимо добавить delete[] dataBase; в
            нужном вам месте, учитывая вашу архитектуру приложения - лучше всего
            в деструкторе класса. Хотя архитектуру приложения тоже лучше
            пересмотреть.
            <br />
            <br />
            P.S. ваши циклы do...while лучше заменить на обычные while (в первом
            случае) и for (во втором).
          </p>
        </div>

        <div className="answer__footer">
          <button className="btn">Ответить</button>
          <div className="comments__box">
            <button className="comments__btn">Комментарии (2)</button>
            <div className="comments">
              <p className="comment">
                <b>Dmitriy Bozhko</b> - Если коротко - то в базе данных.
              </p>
              <p className="comment">
                <b>Dmitriy Bozhko</b> - Если коротко - то в базе данных.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
