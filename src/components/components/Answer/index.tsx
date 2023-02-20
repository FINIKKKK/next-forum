import { Comments, UserBox } from "@/components";
import { useSelectors } from "@/hooks/useSelectors";
import { Api } from "@/utils/api";
import { TComment } from "@/utils/api/models/comments/types";
import { TUser } from "@/utils/api/models/user/types";
import { OutputBlockData } from "@editorjs/editorjs";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { QuestionBody } from "../QuestionBody";

import ss from "./Answer.module.scss";

interface AnswerProps {
  id: number;
  body: OutputBlockData[];
  user: TUser;
  isAnswer: boolean;
  rating: number;
}

export const Answer: React.FC<AnswerProps> = ({
  id,
  body,
  user,
  isAnswer: isAnswerProp,
  rating: ratingProp,
}) => {
  const refPopup = React.useRef<HTMLDivElement>(null);
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const { data: userData } = useSelectors((state) => state.user);
  const [isAnswer, setIsAnswer] = React.useState(isAnswerProp);
  const [rating, setRating] = React.useState(ratingProp);
  const [commentValue, setCommentValue] = React.useState("");
  const [comments, setComments] = React.useState<TComment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);

  const onDeleteAnswer = async () => {
    try {
      await Api().answer.remove(id);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при удалении ответа");
    }
  };

  const onSetIsAnswer = async () => {
    try {
      await Api().answer.update(id, { isAnswer: !isAnswer });
      setIsAnswer(!isAnswer);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при изменении статуса");
    }
  };

  const onChangeRating = async (type: string) => {
    try {
      if (type === "+") {
        await Api().answer.update(id, { rating: rating + 1 });
        setRating(rating + 1);
      } else if (type === "-") {
        await Api().answer.update(id, { rating: rating - 1 });
        setRating(rating - 1);
      }
    } catch (err) {
      console.warn(err);
      alert("Ошибка при изменении рейтинга");
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          answerId: id,
        };
        const comments = await Api().comment.getAll(params);
        setComments(comments.items);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении комментариев");
      }
    })();
  }, []);

  const onCreateComment = async () => {
    try {
      setIsLoading(true);
      const dto = {
        text: commentValue,
        answerId: id,
      };
      const comment = await Api().comment.create(dto);
      setOpenInput(false);
      setComments([...comments, comment]);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={ss.answer}>
      <div className={ss.side}>
        <div className={ss.rating}>
          <svg
            onClick={() => onChangeRating("+")}
            className={ss.arrow}
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#arrow-up" />
          </svg>
          <div className={ss.number}>{rating}</div>
          <svg
            onClick={() => onChangeRating("-")}
            className={ss.arrow}
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#arrow-down" />
          </svg>
        </div>
        {userData?.id === user.id && (
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
        )}
      </div>

      <div className={ss.content}>
        <div ref={refPopup} className={`popup__wrapper ${ss.popup}`}>
          <svg
            onClick={() => setVisiblePopup(!visiblePopup)}
            className={ss.options}
            width="20"
            height="20"
          >
            <use xlinkHref="../img/icons/icons.svg#options" />
          </svg>
          {visiblePopup && (
            <div className="popup block">
              {userData?.id !== user.id ? (
                <>
                  <div className="popup__item">Пожаловаться</div>
                </>
              ) : (
                <>
                  <div className="popup__item">Редактировать</div>
                  <div onClick={onDeleteAnswer} className="popup__item">
                    Удалить
                  </div>
                </>
              )}
            </div>
          )}
        </div>

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
          <button
            onClick={() => setOpenInput(!openInput)}
            className={`btn ${ss.btn}`}
          >
            {!openInput ? "Ответить" : "Закрыть"}
          </button>
          <Comments comments={comments} />
        </div>
        {openInput && (
          <div className={`input ${ss.input}`}>
            <input
              value={commentValue}
              onChange={(e: any) => setCommentValue(e.target.value)}
              type="text"
              placeholder="Введите сообщение"
            />
            {commentValue && (
              <svg
                onClick={onCreateComment}
                className={classNames(ss.icon, {
                  [ss.disabled]: isLoading,
                })}
                width="20"
                height="20"
              >
                <use xlinkHref="../img/icons/icons.svg#check" />
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
