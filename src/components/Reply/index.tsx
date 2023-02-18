import { Api } from "@/utils/api";
import { TUser } from "@/utils/api/models/user/types";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

import ss from "./Reply.module.scss";

let AnswerEditor = dynamic(() => import("@/components/AnswerEditor"), {
  ssr: false,
});

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
          <div className={ss.user}>
            <Link href={`/profile/${user.id}`}>
              <img
                src={
                  user.avatar !== null
                    ? `http://localhost:7777/img/avatars/${user.avatar}`
                    : `../img/avatar.png`
                }
                alt="avatar"
                className={ss.avatar}
              />
            </Link>
            <div className="box">
              {user.firstName !== null ||
                (user.lastName !== null && (
                  <div className={ss.name}>
                    {user.firstName} {user.lastName}
                  </div>
                ))}
              <Link href={`/profile/${user.id}`}>
                <h6 className={ss.login}>@{user.login}</h6>
              </Link>
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
