import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import { MetaLayout } from '@/layouts/MetaLayout';
import { Question } from '@/screens/Question';
import { Api } from '@/utils/api';
import { TAnswer } from '@/utils/api/models/answer/types';
import { TQuestion } from '@/utils/api/models/question/types';

interface QuestionPageProps {
  question: TQuestion;
  answers: TAnswer[];
}

const QuestionPage: NextPage<QuestionPageProps> = ({ question, answers }) => {
  const description = question.body.find((obj) => obj.type === 'paragraph')
    ?.data?.text;

  return (
    <MetaLayout title={`${question.title}`} description={description} noTitle>
      <Question question={question} answerList={answers} />
    </MetaLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    if (id) {
      const question = await Api().question.getOne(+id);
      const answers = await Api().answer.getAll({ questionId: question.id, orderBy: 'rating' });
      return {
        props: {
          question,
          answers,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (err) {
    console.warn(err);
    return {
      props: {},
    };
  }
};

export default QuestionPage;
