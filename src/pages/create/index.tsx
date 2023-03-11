import { CreateQuestionLayout } from "@/layouts/CreateQuestionLayout";
import { NextPage } from "next";
import React from "react";

interface CreateQuestionPageProps {}

const CreateQuestionPage: NextPage<CreateQuestionPageProps> = ({}) => {
  return <CreateQuestionLayout/>;
};

export default CreateQuestionPage;
