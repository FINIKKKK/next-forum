import { ProfileNav, Question, UserAbout, UserInfo } from "@/components";
import { MainLayout } from "@/layouts/MainLayout";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import { TUser } from "@/utils/api/models/user/types";
import { GetServerSideProps, NextPage } from "next";
import React from "react";

interface ProfilePageProps {
  user: TUser;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: 4,
          page: 1,
          orderBy: "date",
          userId: user.id,
        };
        const questions = await Api().question.getAll(params);
        setQuestions(questions.items);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении вопросов");
      }
    })();
  }, []);

  return (
    <MainLayout>
      <div className="profile">
        <div className="container">
          <div className="profile__inner">
            <div className="user__info">
              <UserInfo user={user} />

              <UserAbout
                questionCount={user.questionCount}
                answerCount={user.answerCount}
              />
            </div>

            <div className="user__work">
              <ProfileNav userId={user.id} />

              <div className="questions__wrapper block">
                <div className="questions">
                  {questions.map((obj) => (
                    <Question
                      className="profile__question"
                      key={obj.id}
                      {...obj}
                    />
                  ))}
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
    console.log(login);
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
    alert("Ошибка при получении пользователя");
    return {
      props: {},
    };
  }
};

export default ProfilePage;
