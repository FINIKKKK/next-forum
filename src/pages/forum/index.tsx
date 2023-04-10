import { NextPage } from 'next';
import React from 'react';

import { MetaLayout } from '@/layouts/MetaLayout';
import { QuestionsLayout } from '@/layouts/QuestionsLayout';

interface ForumPageProps {}

const ForumPage: NextPage<ForumPageProps> = ({}) => {
  return (
    <MetaLayout title="Форум">
      <QuestionsLayout limit={4} label="Все вопросы"></QuestionsLayout>
    </MetaLayout>
  );
};

export default ForumPage;
