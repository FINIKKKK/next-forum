import React from "react";
import qs from "qs";
import { useRouter } from "next/router";
import Select from "react-select";

import { ForumLayout } from "@/layouts/ForumLayout";
import { Pagination, Question } from "@/components";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import classNames from "classnames";

export const options = [
  { value: "date", label: "Последние" },
  { value: "popular", label: "Популярные" },
];

export const filters = ["С ответом", "Без ответа"];

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const isMounted = React.useRef(false);
  const limit = 2;
  const [filterActive, setFilterActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: limit,
          page: page,
          orderBy: selectedOption.value,
        };
        const { total, items } = await Api().question.getAll(params);
        setQuestions(items);
        setTotal(total);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении вопросов");
      }
    })();
  }, [page, selectedOption]);

  React.useEffect(() => {
    if (isMounted.current) {
      console.log("3");
      const params = qs.stringify({
        page: page,
        orderBy: selectedOption.value,
      });
      router.push(`?${params}`);
    }
  }, [page, selectedOption]);

  React.useEffect(() => {
    console.log("1");
    const params = router.query;
    const orderByItem = options.find((obj) => obj.value === params.orderBy);
    console.log(params);
    if (params.page) {
      console.log(params.page);
      setPage(Number(params.page));
      console.log(page);
    }
    if (orderByItem) {
      setSelectedOption(orderByItem);
    }
    isMounted.current = true;
  }, []);

  const onSelectOption = (value: any) => {
    setSelectedOption(value);
  };

  const onSetFilterActive = (index: number) => {
    if (filters[index] === filterActive) {
      setFilterActive(null);
    } else {
      setFilterActive(filters[index]);
    }
  };

  return (
    <ForumLayout>
      <div className="content block">
        <h1 className="title">Все вопросы</h1>

        <div className="search input block hover">
          <input type="text" placeholder="Поиск вопросов" />
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#search" />
          </svg>
        </div>

        <div className="filters">
          <Select
            className="select block"
            classNamePrefix="select"
            value={selectedOption}
            onChange={onSelectOption}
            options={options}
          />

          <div className="chooseAnswers">
            {filters.map((label, index) => (
              <div
                onClick={() => onSetFilterActive(index)}
                key={index}
                className={classNames("item", {
                  active: filterActive === label,
                })}
              >
                <p>{label}</p>
                <svg width="20" height="20">
                  <use xlinkHref="./img/icons/icons.svg#check" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="questions">
          {questions.map((obj: TQuestion) => (
            <Question key={obj.id} {...obj} />
          ))}
        </div>

        <Pagination page={page} limit={limit} total={total} setPage={setPage} />
      </div>
    </ForumLayout>
  );
}
