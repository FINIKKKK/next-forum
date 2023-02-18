import { UserBox } from "@/components";
import { Api } from "@/utils/api";
import { TUser } from "@/utils/api/models/user/types";
import dynamic from "next/dynamic";
import React from "react";

import ss from "./Reply.module.scss";

let AnswerEditor = dynamic(
  () => import("@/components/components/AnswerEditor"),
  {
    ssr: false,
  }
);

interface ReplyProps {
  questionId: number;
  user: TUser;
}

export const Reply: React.FC<ReplyProps> = ({ questionId, user }) => {
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
          <UserBox user={user} />
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
