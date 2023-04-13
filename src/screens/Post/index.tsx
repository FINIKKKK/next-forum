import { OutputBlockData } from '@editorjs/editorjs';
import React from 'react';

import {
  Answer,
  NotFound,
  QuestionContent,
  CreateAnswer,
  SelectComponent,
} from '@/components';
import { useSelectors } from '@/hooks/useSelectors';
import { ForumLayout } from '@/layouts/ForumLayout';
import { TAnswer } from '@/utils/api/models/answer/types';
import { TQuestion } from '@/utils/api/models/question/types';

import ss from './Post.module.scss';

const options = [
  {
    id: 1,
    value: 'rating',
    label: 'По рейтингу',
  },
  { id: 2, value: 'date1', label: 'По дате (новые)' },
  { id: 3, value: 'date2', label: 'По дате (старые)' },
];

interface PostProps {
  post: TQuestion;
  comments: TAnswer[];
}

export const Post: React.FC<PostProps> = ({ post, comments }) => {
  const [option, setOption] = React.useState(options[0]);
  const { data: userData } = useSelectors((state) => state.user);
  const [solvedAnswerId, setSolvedAnswerId] = React.useState<number | null>(
    null,
  );
  const [answerBodyToCreateAnswer, setAnswerBodyToCreateAnswer] =
    React.useState<OutputBlockData[]>([]);
  const refCreateAnswer = React.useRef<HTMLDivElement>(null);

  return (
    <ForumLayout>
      <div className={`block content ${ss.question}`}>
        <QuestionContent question={post} />

        <div className={ss.answers}>
          <div className={ss.answers__header}>
            <h2 className={ss.answers__title}>Ответы</h2>
            {answers.length !== 0 && (
              <SelectComponent
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
          {userData?.id && userData?.id !== question.user.id && (
            <div ref={refCreateAnswer}>
              <CreateAnswer
                questionId={question.id}
                setAnswers={setAnswers}
                answerBody={answerBodyToCreateAnswer}
              />
            </div>
          )}
          {!userData && (
            <NotFound
              label="Войдите в аккаунт или зарегистрируйтесь, чтобы ответить на
            вопрос"
            />
          )}
        </div>
      </div>
    </ForumLayout>
  );
};
