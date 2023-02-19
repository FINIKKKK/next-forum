import React from "react";
import dynamic from "next/dynamic";

import { UserBox } from "@/components";
import { Api } from "@/utils/api";
import { TUser } from "@/utils/api/models/user/types";

import ss from "./Reply.module.scss";
import { TAnswer } from "@/utils/api/models/answer/types";

let Editor = dynamic(() => import("@/components/components/Editor"), {
  ssr: false,
});

interface ReplyProps {
  questionId: number;
  user: TUser;
  setAnswers: React.Dispatch<React.SetStateAction<TAnswer[]>>;
}

export const Reply: React.FC<ReplyProps> = ({
  questionId,
  user,
  setAnswers,
}) => {
  const [body, setBody] = React.useState([]);

  const onSumbit = async () => {
    try {
      const dto = {
        questionId,
        body,
      };
      const answer = await Api().answer.create(dto);
      setAnswers((prev: TAnswer[]) => [...prev, answer]);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при публикации ответа");
    }
  };

  return (
    <div className={ss.reply}>
      <div className={ss.answer__content}>
        <div className={ss.answer__header}>
          <UserBox user={user} />
        </div>

        <div className={`block ${ss.editor}`}>
          <Editor
            className="editor--answer"
            initialValue={body}
            onChange={(blocks: any) => setBody(blocks)}
            isAnswer={true}
            placeholder="Введите текст"
          />
        </div>

        <button onClick={onSumbit} className={`btn ${ss.btn}`}>
          Опубликовать
        </button>
      </div>
    </div>
  );
};
