import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import {
  LoadingElement,
  NotFound,
  ProfileNav,
  Question,
  UserAbout,
  UserInfo,
} from '@/components';
import { MainLayout } from '@/layouts/MainLayout';
import { Api } from '@/utils/api';
import { TQuestion } from '@/utils/api/models/question/types';
import { TUser } from '@/utils/api/models/user/types';

interface ProfilePageProps {
  user: TUser;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const limit = 4;
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        if (isFetching) {
          setIsLoading(true);
          const params = {
            limit,
            page,
            orderBy: 'date',
            userId: user.id,
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
    <MainLayout>
      <div className="profile">
        <div className="container">
          <div className="profile__inner">
            <UserInfo isEdit={isEdit} setIsEdit={setIsEdit} user={user} />

            <div className="leftSide">
              <UserAbout
                isEdit={isEdit}
                about={user.about}
                questionCount={user.questionCount}
                answerCount={user.answerCount}
              />

              <div className="user__work">
                <ProfileNav userId={user.id} />

                <div className="questions__wrapper block">
                  <div className="questions">
                    {/* {isLoading ? (
                    Array(limit)
                      .fill(0)
                      .map((_, index) => <LoadingElement key={index} />) */}
                    {questions.length > 0 ? (
                      questions.map((obj) => (
                        <Question
                          className="profile__question"
                          key={obj.id}
                          {...obj}
                        />
                      ))
                    ) : (
                      <NotFound label="Здесь пока ничего нет :(" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const login = ctx?.params?.slug;
    if (login) {
      const user = await Api().user.getOne(`${login}`);
      return {
        props: {
          user,
        },
      };
    }
    return {
      props: {},
    };
  } catch (err) {
    console.warn(err);
    alert('Ошибка при получении пользователя');
    return {
      props: {},
    };
  }
};

export default ProfilePage;
