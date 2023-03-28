import { OutputBlockData } from '@editorjs/editorjs';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import React from 'react';

import { UserBox } from '@/components';
import { useSelectors } from '@/hooks/useSelectors';
import { TError } from '@/layouts/CreateQuestionLayout';
import { Api } from '@/utils/api';
import { TAnswer } from '@/utils/api/models/answer/types';
import { AnswerScheme } from '@/utils/validation';

import ss from './Reply.module.scss';

let Editor = dynamic(() => import('@/components/blocks/Editor'), {
  ssr: false,
});

interface ReplyProps {
  questionId: number;
  setAnswers: any;
  answerBody: OutputBlockData[];
}

export const Reply: React.FC<ReplyProps> = ({
  questionId,
  setAnswers,
  answerBody,
}) => {
  const [body, setBody] = React.useState<OutputBlockData[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<TError | null>([]);
  const { data: userData } = useSelectors((state) => state.user);
  const [isClear, setIsClear] = React.useState(false);

  // React.useEffect(() => {
  //   setBody(answerBody);
  // }, [answerBody]);

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
            setIsClear(true);
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
      alert('Ошибка при публикации ответа');
    } finally {
      setIsClear(false);
      setIsLoading(false);
    }
  };

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
              isClear={isClear}
            />
          </div>
          {errors?.body && <div className={ss.error}>{errors?.body}</div>}
        </div>

        <button
          onClick={onSumbit}
          className={classNames('btn', ss.btn, {
            disabled: isLoading || !body.length,
          })}
        >
          Опубликовать
        </button>
      </div>
    </div>
  );
};
