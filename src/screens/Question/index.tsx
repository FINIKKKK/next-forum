import { OutputBlockData } from '@editorjs/editorjs';
import React from 'react';

import {
  Answer,
  NotFound,
  QuestionContent,
  Reply,
  SelectComponent,
} from '@/components';
import { useSelectors } from '@/hooks/useSelectors';
import { ForumLayout } from '@/layouts/ForumLayout';
import { TAnswer } from '@/utils/api/models/answer/types';
import { TQuestion } from '@/utils/api/models/question/types';

import ss from './Question.module.scss';

const options = [
  {
    value: 'rating',
    label: 'По рейтингу',
  },
  {
    value: 'date',
    label: 'По дате',
  },
];

interface QuestionProps {
  question: TQuestion;
  answerList: TAnswer[];
}

export const Question: React.FC<QuestionProps> = ({ question, answerList }) => {
  const [answers, setAnswers] = React.useState<TAnswer[]>(answerList || []);
  const [option, setOption] = React.useState(options[0]);
  const { data: userData } = useSelectors((state) => state.user);
  const [solvedAnswerId, setSolvedAnswerId] = React.useState<number | null>(
    null,
  );
  const [answerBodyToReply, setAnswerBodyToReply] = React.useState<
    OutputBlockData[]
  >([]);
  const refReply = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (option.value === 'rating') {
      answers.sort((a, b) => {
        if (a.isAnswer && !b.isAnswer) {
          return -1;
        } else if (!a.isAnswer && b.isAnswer) {
          return 1;
        } else {
          return b.rating - a.rating;
        }
      });
    } else if (option.value === 'date') {
      answers.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
  }, [option]);

  const changeIsAnswer = (id: number) => {
    if (solvedAnswerId === id) {
      setSolvedAnswerId(null);
    } else {
      setSolvedAnswerId(id);
    }
  };

  const onUpdateAnswer = (value: OutputBlockData[]) => {
    setAnswerBodyToReply(value);
    refReply.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ForumLayout>
      <div className={`block ${ss.question}`}>
        <QuestionContent question={question} />

        <div className={ss.answers}>
          <div className={ss.answers__header}>
            <h2 className={ss.answers__title}>Ответы</h2>
            {answers.length !== 0 && (
              <SelectComponent
                className={ss.answers__select}
                value={option}
                options={options}
                setValue={setOption}
              />
            )}
          </div>
          {userData?.id === question.user.id && answers.length === 0 ? (
            <NotFound label="На данный вопрос пока никто не ответил :(" />
          ) : (
            answers.map((obj: TAnswer) => (
              <Answer
                key={obj.id}
                answer={obj}
                isAuthor={userData?.id === question.user.id}
                setAnswers={setAnswers}
                changeIsAnswer={changeIsAnswer}
                solvedAnswerId={solvedAnswerId}
                setSolvedAnswerId={setSolvedAnswerId}
                setUpdadeAnswer={onUpdateAnswer}
              />
            ))
          )}
          {userData?.id !== question.user.id && (
            <div ref={refReply}>
              <Reply
                questionId={question.id}
                setAnswers={setAnswers}
                answerBody={answerBodyToReply}
              />
            </div>
          )}
          {!userData && (
            <div className={ss.noreply}>
              <h3>
                Войдите в аккаунт или зарегистрируйтесь, чтобы ответить на
                вопрос
              </h3>
            </div>
          )}
        </div>
      </div>
    </ForumLayout>
  );
};
