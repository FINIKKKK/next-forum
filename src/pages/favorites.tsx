import { useSelectors } from "@/hooks/useSelectors";
import { QuestionsLayout } from "@/layouts/QuestionsLayout";
import { NextPage } from "next";

interface MyQuestionsPageProps {}

const MyQuestionsPage: NextPage<MyQuestionsPageProps> = ({}) => {
  const { data: userData } = useSelectors((state) => state.user);

  return (
    <QuestionsLayout
      limit={4}
      label="Мое избранное"
      userId={userData?.id}
      favorites={true}
    ></QuestionsLayout>
  );
};

export default MyQuestionsPage;
