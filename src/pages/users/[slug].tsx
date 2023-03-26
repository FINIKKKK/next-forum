import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { Profile } from '@/screens/Profile';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';

interface ProfilePageProps {
  user: TUser;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return <Profile user={user} />;
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
