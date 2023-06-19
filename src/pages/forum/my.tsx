import { NextPage } from 'next';

import { useSelectors } from '@/hooks/useSelectors';
import { MetaLayout } from '@/layouts/MetaLayout';
import { QuestionsLayout } from '@/layouts/QuestionsLayout';

interface MyQuestionsPageProps {}

const MyQuestionsPage: NextPage<MyQuestionsPageProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);

  return (
    <MetaLayout title="Мои вопросы">
      <QuestionsLayout
        limit={15}
        label="Мои вопросы"
        userId={userData?.id}
      ></QuestionsLayout>
    </MetaLayout>
  );
};

export default MyQuestionsPage;
