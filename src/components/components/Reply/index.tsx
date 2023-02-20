import React from "react";
import dynamic from "next/dynamic";

import { UserBox } from "@/components";
import { Api } from "@/utils/api";
1;
import ss from "./Reply.module.scss";
import { TAnswer } from "@/utils/api/models/answer/types";
import { useSelectors } from "@/hooks/useSelectors";
import { AnswerScheme } from "@/utils/validation";
import { TError } from "@/pages/create";
import classNames from "classnames";

let Editor = dynamic(() => import("@/components/components/Editor"), {
  ssr: false,
});

interface ReplyProps {
  questionId: number;
  setAnswers: React.Dispatch<React.SetStateAction<TAnswer[]>>;
}

export const Reply: React.FC<ReplyProps> = ({ questionId, setAnswers }) => {
  const [body, setBody] = React.useState([]);
  const { data: userData } = useSelectors((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<TError | null>([]);

  const onSumbit = async () => {
    try {
      AnswerScheme.validate({ body: body }, { abortEarly: false })
        .then(() => {
          (async () => {
            setIsLoading(true);
            const dto = {
              questionId,
              body,
            };
            const answer = await Api().answer.create(dto);
            setAnswers((prev: TAnswer[]) => [
              ...prev,
              { ...answer, user: userData },
            ]);
          })();
        })
        .catch((errors) => {
          const errorData = errors.inner.reduce((sum: any, obj: any) => {
            sum[obj.path] = obj.message;
            return sum;
          }, {});
          setErrors(errorData);
        });
    } catch (err) {
      console.warn(err);
      alert("Ошибка при публикации ответа");
    }
  };

  if (userData) {
    return (
      <div className={ss.reply}>
        <div className={ss.answer__content}>
          <div className={ss.answer__header}>
            <UserBox className={ss.user} user={userData} />
          </div>

          <div className={ss.editor}>
            <div className={`block2 ${ss.input}`}>
              <Editor
                className="editor--answer"
                initialValue={body}
                onChange={(blocks: any) => setBody(blocks)}
                isAnswer={true}
                placeholder="Введите текст"
              />
            </div>
            {errors?.body && <div className={ss.error}>{errors?.body}</div>}
          </div>

          <button
            onClick={onSumbit}
            className={classNames("btn", ss.btn, {
              disabled: isLoading,
            })}
          >
            Опубликовать
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={ss.noreply}>
        <h3>
          Войдите в аккаунт или зарегистрируйтесь, чтобы ответить на вопрос
        </h3>
      </div>
    );
  }
};
