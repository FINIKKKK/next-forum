import { NextPage } from 'next';
import React from 'react';

import { CreateQuestionLayout } from '@/layouts/CreateQuestionLayout';

interface CreateQuestionPageProps {}

const CreateQuestionPage: NextPage<CreateQuestionPageProps> = ({}) => {
  return <CreateQuestionLayout />;
};

export default CreateQuestionPage;
