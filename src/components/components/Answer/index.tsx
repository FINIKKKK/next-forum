import { Comments, UserBox } from "@/components";
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
    <div className={ss.answer}>
      <div className={ss.rating}>
        <svg className={ss.sarrow} width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#arrow-up" />
        </svg>
        <div className={ss.number}>10</div>
        <svg className={ss.arrow} width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#arrow-down" />
        </svg>
      </div>
      <div className={ss.content}>
        <svg className={ss.options} width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#options" />
        </svg>

        <div className={ss.header}>
          <UserBox user={user} />
          <div className={`bb ${ss.isAnswer}`}>
            <p>Ответ</p>
            <svg width="20" height="20">
              <use xlinkHref="../img/icons/icons.svg#check" />
            </svg>
          </div>
        </div>

        <QuestionBody body={body} />

        <div className={ss.footer}>
          <button className={`btn ${ss.btn}`}>Ответить</button>
          <Comments />
        </div>
      </div>
    </div>
  );
};
