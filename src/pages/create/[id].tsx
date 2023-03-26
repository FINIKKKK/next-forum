import { NextPage } from 'next';
import React from 'react';

import { CreateQuestionLayout } from '@/layouts/CreateQuestionLayout';
import { wrapper } from '@/redux/store';
import { Api } from '@/utils/api';
import { TQuestion } from '@/utils/api/models/question/types';

interface EditQuestionPageProps {
  question: TQuestion;
}

const EditQuestionPage: NextPage<EditQuestionPageProps> = ({ question }) => {
  return <CreateQuestionLayout questionData={question} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    try {
      const id = ctx?.params?.id;
      const state = store.getState();

      if (id) {
        const question = await Api().question.getOne(+id);
        if (state?.user?.data?.id !== question.user.id) {
          return {
            redirect: {
              destination: `/questions/${question.id}`,
              permanent: false,
            },
          };
        }
        return {
          props: {
            question,
          },
        };
      }
      return {
        props: {
          question: {},
        },
      };
    } catch (err) {
      console.warn(err);
      return {
        props: {
          question: {},
        },
      };
    }
  },
);

export default EditQuestionPage;
