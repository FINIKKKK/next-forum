import React from "react";

import { Filters, options, options2, Question, Selects } from "@/components";
import { FiltersLayout } from "./FiltersLayout";
import { TQuestion } from "@/utils/api/models/question/types";

type QuestionsLayoutsProps = {};

export const QuestionsLayout: React.FC<QuestionsLayoutsProps> = ({}) => {
  const [option, setOption] = React.useState(options[0]);
  const [option2, setOption2] = React.useState(options2[0]);
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);

  return (
    <FiltersLayout
      type="question"
      setItems={setQuestions}
      option={option}
      setOption={setOption}
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
        {questions.map((obj: TQuestion) => (
          <Question key={obj.id} {...obj} />
        ))}
      </div>
    </FiltersLayout>
  );
};
