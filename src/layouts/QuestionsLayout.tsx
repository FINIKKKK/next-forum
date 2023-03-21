import { FiltersLayout } from "./FiltersLayout";
import {
  Filters,
  LoadingElement,
  NotFound,
  options,
  options2,
  Question,
  Selects,
} from "@/components";
import { TQuestion } from "@/utils/api/models/question/types";
import React from "react";

type QuestionsLayoutsProps = {
  limit: number;
  label: string;
  userId?: number;
  favorites?: boolean;
};

export const QuestionsLayout: React.FC<QuestionsLayoutsProps> = ({
  limit,
  label,
  userId,
  favorites,
}) => {
  const [option, setOption] = React.useState(options[0]);
  const [option2, setOption2] = React.useState(options2[0]);
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <FiltersLayout
      type="question"
      limit={limit}
      label={label}
      setItems={setQuestions}
      option={option}
      setOption={setOption}
      userId={userId}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      setIsLoading={setIsLoading}
      itemsLength={questions.length}
      favorites={favorites}
    >
      <div className="filters">
        <Selects
          option={option}
          setOption={setOption}
          option2={option2}
          setOption2={setOption2}
        />

        <Filters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      <div className="questions">
        {isLoading ? (
          Array(limit)
            .fill(0)
            .map((_, index) => <LoadingElement key={index} />)
        ) : questions.length ? (
          questions.map((obj: TQuestion) => <Question key={obj.id} {...obj} />)
        ) : (
          <NotFound />
        )}
      </div>
    </FiltersLayout>
  );
};
