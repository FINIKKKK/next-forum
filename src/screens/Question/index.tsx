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
  const [isAnswer, setIsAnswer] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (option.value === 'rating') {
      answers.sort((a, b) => a.rating - b.rating);
    } else if (option.value === 'date') {
      answers.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
  }, [option]);

  const setAnswer = (id: number) => {
    setIsAnswer(id);
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
                setAnswer={setAnswer}
                answerId={isAnswer}
                key={obj.id}
                {...obj}
                setAnswers={setAnswers}
              />
            ))
          )}
          {userData && userData.id !== question.user.id && (
            <Reply questionId={question.id} setAnswers={setAnswers} />
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
