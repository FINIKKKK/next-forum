import React from 'react';

import { ProfileWorks, ProfileAbout, ProfileInfo } from '@/components';
import { useSelectors } from '@/hooks/useSelectors';
import { MetaLayout } from '@/layouts/MetaLayout';
import { MainLayout } from '@/layouts/MainLayout';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';

import ss from './Profile.module.scss';

interface ProfileProps {
  user: TUser;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
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
          showEmail,
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
    <MetaLayout
      title={`${user.login} ${user.name ? '(' + user.name + ')' : ''}`}
      description={`${
        user.about ? user.about : `Профиль пользователя @${user.login}`
      }`}
      noTitle
    >
      <MainLayout>
        <div className={ss.profile}>
          <div className="container">
            <div className={ss.inner}>
              <ProfileInfo
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

              <div className={ss.leftSide}>
                <ProfileAbout
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
    </MetaLayout>
  );
};
