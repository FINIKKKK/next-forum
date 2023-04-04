import React from 'react';

import { MetaLayout } from '@/layouts/MetaLayout';
import { QuestionsLayout } from '@/layouts/QuestionsLayout';

export default function Home() {
  return (
    <MetaLayout title="Форум">
      <QuestionsLayout limit={4} label="Все вопросы"></QuestionsLayout>
    </MetaLayout>
  );
}
