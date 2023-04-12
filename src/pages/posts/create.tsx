import { NextPage } from 'next';
import React from 'react';

import { MetaLayout } from '@/layouts/MetaLayout';
import { wrapper } from '@/redux/store';
import { CreateQuestion } from '@/screens/CreateQuestion';
import { Api } from '@/utils/api';
import { TCategory } from '@/utils/api/models/category/types';

interface CreatePostPageProps {
  categories: TCategory[];
}

const CreatePostPage: NextPage<CreatePostPageProps> = ({ categories }) => {
  return (
    <MetaLayout title="Создать пост">
      <CreateQuestion label="Создать пост" type="post" categories={categories} />
    </MetaLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const state = store.getState();
      const categories = await Api().category.getAll();

      if (!state?.user?.data) {
        return {
          redirect: {
            destination: `/register`,
            permanent: false,
          },
        };
      }
      return {
        props: {
          categories,
        },
      };
    } catch (err) {
      return {
        props: {},
      };
    }
  },
);

export default CreatePostPage;
