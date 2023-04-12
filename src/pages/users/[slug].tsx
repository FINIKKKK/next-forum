import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { wrapper } from '@/redux/store';
import { Profile } from '@/screens/Profile';
import { Api } from '@/utils/api';
import { TUser } from '@/utils/api/models/user/types';

interface ProfilePageProps {
  user: TUser;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  return <Profile user={user} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const login = ctx?.params?.slug;
      const state = store.getState();

      if (login) {
        const user = await Api().user.getOne(`${login}`);
        if (!state?.user?.data?.isAdmin && user.isAdmin) {
          return {
            redirect: {
              destination: `/users/${state?.wuser?.data?.login}`,
              permanent: false,
            },
          };
        }
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
      return {
        props: {},
      };
    }
  },
);

export default ProfilePage;
