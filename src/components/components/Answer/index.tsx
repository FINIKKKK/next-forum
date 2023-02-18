import { UserBox } from "@/components";
import { TUser } from "@/utils/api/models/user/types";
import { OutputBlockData } from "@editorjs/editorjs";
import Link from "next/link";
import React from "react";
import { QuestionBody } from "../QuestionBody";

import ss from "./Answer.module.scss";

interface AnswerProps {
  body: OutputBlockData[];
  user: TUser;
}

export const Answer: React.FC<AnswerProps> = ({ body, user }) => {
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
          <UserBox user={user} />
          <div className="isAnswer">
            <p>Ответ</p>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#check" />
            </svg>
          </div>
        </div>

        <QuestionBody body={body} />

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
