import { Comments, Popup, Textarea, UserBox } from "@/components";
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
  setAnswers: (value: any) => void;
}

export const Answer: React.FC<AnswerProps> = ({
  id,
  body,
  user,
  isAnswer: isAnswerProp,
  rating: ratingProp,
  setAnswers,
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
  const [openComments, setOpenComments] = React.useState(false);

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
      setComments([{ ...comment, user: userData }, ...comments]);
      setOpenComments(true);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeComment = async (commentId: number, value: string) => {
    setCommentValue(value);
  };

  const onOpenInput = () => {
    setOpenInput(!openInput);
    setCommentValue("");
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
        {userData && userData.id === user.id && (
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
          <div className={ss.comments}>
            <Comments
              comments={comments}
              setComments={setComments}
              isOpen={openComments}
              setIsOpen={setOpenComments}
              onChangeComment={onChangeComment}
            />
            {openInput && (
              <Textarea
                value={commentValue}
                setValue={setCommentValue}
                onSubmit={onCreateComment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
