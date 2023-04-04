import { NextPage } from 'next';
import React from 'react';

import { MetaLayout } from '@/layouts/MetaLayout';
import { wrapper } from '@/redux/store';
import { CreateQuestion } from '@/screens/CreateQuestion';

interface CreateQuestionPageProps {}

const CreateQuestionPage: NextPage<CreateQuestionPageProps> = ({}) => {
  return (
    <MetaLayout title="Задать вопрос">
      <CreateQuestion />
    </MetaLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const state = store.getState();

      if (!state?.user?.data) {
        return {
          redirect: {
            destination: `/register`,
            permanent: false,
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

export default CreateQuestionPage;
