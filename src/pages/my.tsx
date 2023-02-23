import { NextPage } from "next";

import { QuestionsLayout } from "@/layouts/QuestionsLayout";
import { useSelectors } from "@/hooks/useSelectors";

interface MyQuestionsPageProps {}

const MyQuestionsPage: NextPage<MyQuestionsPageProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);

  return (
    <QuestionsLayout
      limit={4}
      label="Мои вопросы"
      userId={userData?.id}
    ></QuestionsLayout>
  );
};

export default MyQuestionsPage;
