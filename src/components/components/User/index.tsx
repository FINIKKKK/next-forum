import Link from 'next/link';
import React from 'react';

import { Avatar } from '@/components';
import { useWordEnding } from '@/hooks/useWordEnding';

import ss from './User.module.scss';

interface UserProps {
  id: number;
  login: string;
  avatar?: string | null;
  name?: string;
  questionCount: number;
  answerCount: number;
}

export const User: React.FC<UserProps> = ({
  id,
  login,
  avatar,
  name,
  questionCount,
  answerCount,
}) => {
  const questionWord = useWordEnding(questionCount, 'вопрос');
  const answerWord = useWordEnding(answerCount, 'ответ');

  return (
    <div className={`block hover ${ss.user}`}>
      <Avatar avatar={avatar} login={login} className={ss.avatar} />
      <div className={ss.info}>
        <p className={ss.name}>{name}</p>
        <Link className={ss.login} href={`/users/${login}`}>
          @{login}
        </Link>
      </div>
      <ul className={ss.results}>
        <li>{questionWord}</li>
        <li>{answerWord}</li>
      </ul>
    </div>
  );
};
