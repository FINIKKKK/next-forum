import { QuestionBody } from "../QuestionBody";
import ss from "./Answer.module.scss";
import {
  Comments,
  CommentsBox,
  Popup,
  Rating,
  Textarea,
  UserBox,
} from "@/components";
import { useSelectors } from "@/hooks/useSelectors";
import { Api } from "@/utils/api";
import { TComment } from "@/utils/api/models/comments/types";
import { TUser } from "@/utils/api/models/user/types";
import { OutputBlockData } from "@editorjs/editorjs";
import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface AnswerProps {
  id: number;
  body: OutputBlockData[];
  user: TUser;
  isAnswer: boolean;
  rating: number;
  setAnswers: (value: any) => void;
  setAnswer: (value: any) => void;
  answerId: number | null;
}

export const Answer: React.FC<AnswerProps> = ({
  id,
  body,
  user,
  isAnswer: isAnswerProp,
  rating,
  setAnswers,
  setAnswer,
  answerId,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [isAnswer, setIsAnswer] = React.useState(
    answerId === id ? isAnswerProp : null
  );
  const [openInput, setOpenInput] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState("");



  const onRemoveAnswer = async () => {
    if (window.confirm("Вы действительно хотите удалить ответ?")) {
      try {
        await Api().answer.remove(id);
        setAnswers((prev: any) => prev.filter((obj: any) => obj.id !== id));
      } catch (err) {
        console.warn(err);
        alert("Ошибка при удалении ответа");
      }
    } else {
      setVisiblePopup(false);
    }
  };

  const onSetIsAnswer = async () => {
    try {
      // await Api().answer.update(id, { isAnswer: !isAnswer });
      if (answerId === id) {
        setIsAnswer(!isAnswer);
      }
      setAnswer(id);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при изменении статуса");
    }
  };

  const onOpenInput = () => {
    setOpenInput(!openInput);
    setCommentValue("");
  };


  return (
    <div className={ss.answer}>
      <div className={ss.side}>
        <Rating rating={rating} />
        <svg
          onClick={onSetIsAnswer}
          className={classNames(ss.isAnswer__icon, {
            [ss.active]: isAnswer,
          })}
          width="20"
          height="20"
        >
          <use xlinkHref="../img/icons/icons.svg#check" />
        </svg>
      </div>

      <div className={ss.content}>
        <Popup
          type="answer"
          isVisible={visiblePopup}
          setIsVisible={setVisiblePopup}
          onRemove={onRemoveAnswer}
          userId={user.id}
        />

        <div className={ss.header}>
          <UserBox className={ss.user} user={user} />
          {isAnswer && (
            <div className={`bb ${ss.isAnswer}`}>
              <p>Ответ</p>
              <svg width="20" height="20">
                <use xlinkHref="../img/icons/icons.svg#check" />
              </svg>
            </div>
          )}
        </div>

        <QuestionBody body={body} />

        <div className={ss.footer}>
          <button onClick={onOpenInput} className={`btn ${ss.btn}`}>
            {!openInput ? "Ответить" : "Закрыть"}
          </button>
          <CommentsBox answerId={id} openInput={openInput} setOpenInput={setOpenInput} commentValue={commentValue} setCommentValue={setCommentValue} />
        </div>
      </div>
    </div>
  );
};
