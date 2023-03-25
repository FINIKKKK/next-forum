import React from 'react';

import { NotFound, ProfileNav, Question } from '@/components';
import { Api } from '@/utils/api';
import { TQuestion } from '@/utils/api/models/question/types';

import ss from './ProfileWorks.module.scss';

interface ProfileWorksProps {
  userId: number;
}

export const ProfileWorks: React.FC<ProfileWorksProps> = ({ userId }) => {
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const limit = 4;
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      try {
        if (isFetching) {
          setIsLoading(true);
          const params = {
            limit,
            page,
            orderBy: 'date',
            userId,
          };
          const { items, total } = await Api().question.getAll(params);
          setQuestions([...questions, ...items]);
          setTotal(total);
          setPage((prev) => prev + 1);
        }
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получении вопросов');
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    })();
  }, [isFetching]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
      // && questions.length !== total
    ) {
      setIsFetching(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className="user__work">
      <ProfileNav userId={userId} />

      <div className="questions__wrapper block">
        <div className="questions">
          {/* {isLoading ? (
                    Array(limit)
                      .fill(0)
                      .map((_, index) => <LoadingElement key={index} />) */}
          {questions.length > 0 ? (
            questions.map((obj) => (
              <Question className="profile__question" key={obj.id} {...obj} />
            ))
          ) : (
            <NotFound label="Здесь пока ничего нет :(" />
          )}
        </div>
      </div>
    </div>
  );
};
