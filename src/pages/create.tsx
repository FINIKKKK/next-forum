import { NextPage } from 'next';
import React from 'react';

import { CreateQuestion } from '@/screens/CreateQuestion';

interface CreateQuestionPageProps {}

const CreateQuestionPage: NextPage<CreateQuestionPageProps> = ({}) => {
  return <CreateQuestion />;
};

export default CreateQuestionPage;
