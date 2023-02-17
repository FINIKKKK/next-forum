import { Api } from "@/utils/api";
import dynamic from "next/dynamic";
import React from "react";

import ss from "./Reply.module.scss";

let AnswerEditor = dynamic(() => import("@/components/AnswerEditor"), {
  ssr: false,
});

interface ReplyProps {
  questionId: number;
}

export const Reply: React.FC<ReplyProps> = ({ questionId }) => {
  const [body, setBody] = React.useState([]);

  const onSumbit = async () => {
    try {
      const dto = {
        questionId,
        body,
      };
      const answer = await Api().answer.create(dto);
      console.log(answer);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при публикации ответа");
    }
  };

  return (
    <div className={ss.reply}>
      <div className={ss.answer__content}>
        <div className={ss.answer__header}>
          <div className={ss.user}>
            <a href="#">
              <img src="../img/avatar.png" alt="avatar" className={ss.avatar} />
            </a>
            <div className="box">
              <div className={ss.name}>Dmitriy Bozhko</div>
              <a href="#">
                <h6 className={ss.login}>@digikrash</h6>
              </a>
            </div>
          </div>
        </div>

        <div className={`block ${ss.editor}`}>
          <AnswerEditor
            className="editor__answer"
            initialValue={body}
            onChange={(blocks: any) => setBody(blocks)}
          />
        </div>

        <button onClick={onSumbit} className={`btn ${ss.btn}`}>
          Опубликовать
        </button>
      </div>
    </div>
  );
};
