import { NextPage } from 'next';

import { useSelectors } from '@/hooks/useSelectors';
import { MetaLayout } from '@/layouts/MetaLayout';
import { QuestionsLayout } from '@/layouts/QuestionsLayout';

interface MyQuestionsPageProps {}

const MyQuestionsPage: NextPage<MyQuestionsPageProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);

  return (
    <MetaLayout title="Мое избранное">
      <QuestionsLayout
        limit={4}
        label="Мое избранное"
        userId={userData?.id}
        favorites={true}
      ></QuestionsLayout>
    </MetaLayout>
  );
};

export default MyQuestionsPage;
