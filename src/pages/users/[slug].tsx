import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { ProfileWorks, UserAbout, UserInfo } from '@/components';
import { MainLayout } from '@/layouts/MainLayout';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';
import { useSelectors } from '@/hooks/useSelectors';

interface ProfilePageProps {
  user: TUser;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  const { data: userData } = useSelectors((state) => state.user);
  const isAuthor = userData?.id === user.id;
  const [isEdit, setIsEdit] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [location, setLocation] = React.useState(user.location);
  const [about, setAbout] = React.useState(user.about);
  const [showEmail, setShowEmail] = React.useState(user.showEmail);

  const onUpdateUserData = async () => {
    if (isEdit === false) {
      setIsEdit(true);
    } else {
      try {
        const dto = {
          name,
          location,
          about,
          showEmail
        };
        await Api().user.update(user.id, dto);
        setIsEdit(false);
      } catch (err) {
        console.warn(err);
        alert('Ошибка при изменении данных пользователя');
      }
    }
  };

  return (
    <MainLayout>
      <div className="profile">
        <div className="container">
          <div className="profile__inner">
            <UserInfo
              isAuthor={isAuthor}
              isEdit={isEdit}
              user={user}
              onUpdateUserData={onUpdateUserData}
              name={name}
              setName={setName}
              location={location}
              setLocation={setLocation}
              showEmail={showEmail}
              setShowEmail={setShowEmail}
            />

            <div className="leftSide">
              <UserAbout
                isEdit={isEdit}
                questionCount={user.questionCount}
                answerCount={user.answerCount}
                setAbout={setAbout}
                about={about}
              />

              <ProfileWorks isAuthor={isAuthor} userId={user.id} />
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
