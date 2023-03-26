import { GetServerSideProps, NextPage } from 'next';
import React from 'react';

import { Question } from '@/screens/Question';
import { Api } from '@/utils/api';
import { TAnswer } from '@/utils/api/models/answer/types';
import { TQuestion } from '@/utils/api/models/question/types';

interface QuestionPageProps {
  question: TQuestion;
  answers: TAnswer[];
}

const QuestionPage: NextPage<QuestionPageProps> = ({ question, answers }) => {
  return <Question question={question} answerList={answers} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    if (id) {
      const question = await Api().question.getOne(+id);
      const answers = await Api().answer.getAll({ questionId: question.id });
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
