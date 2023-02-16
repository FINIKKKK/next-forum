import React from "react";
import qs from "qs";
import { useRouter } from "next/router";
import Select from "react-select";

import { ForumLayout } from "@/layouts/ForumLayout";
import { Pagination, Question } from "@/components";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";
import classNames from "classnames";
import debounce from "lodash.debounce";

export const options = [
  { value: "date", label: "Последние" },
  { value: "popular", label: "Популярные" },
];

export const options2 = [
  { value: "forewer", label: "Всё время" },
  { value: "year", label: "Год" },
  { value: "mouth", label: "Месяц" },
  { value: "weak", label: "Неделя" },
  { value: "day", label: "День" },
];

export const filters = ["С ответом", "Без ответа"];

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const [selectedOption2, setSelectedOption2] = React.useState(options2[0]);
  const isMounted = React.useRef(false);
  const limit = 2;
  const [filterActive, setFilterActive] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValue2, setSearchValue2] = React.useState("");
  const [tag, setTag] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: limit,
          page: page,
          orderBy: selectedOption.value,
          tagBy: tag,
          search: searchValue2,
        };
        const { total, items } = await Api().question.getAll(params);
        setQuestions(items);
        setTotal(total);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении вопросов");
      }
    })();
  }, [page, selectedOption, tag, searchValue2]);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        page: page,
        orderBy: selectedOption.value,
        tagBy: tag,
        search: searchValue2,
      });
      router.push(`?${params}`);
    }
  }, [page, selectedOption, tag, searchValue2]);

  React.useEffect(() => {
    const params = router.query;
    const orderByItem = options.find((obj) => obj.value === params.orderBy);
    if (params.page) {
      setPage(Number(params.page));
    }
    if (orderByItem) {
      setSelectedOption(orderByItem);
    }
    if (params.search) {
      setSearchValue(params.search);
    }
    if (params.tagBy) {
      setTag(params.tagBy);
    }
    isMounted.current = true;
  }, []);

  const onSetFilterActive = (index: number) => {
    if (filters[index] === filterActive) {
      setFilterActive(null);
    } else {
      setFilterActive(filters[index]);
    }
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearch(e.target.value);
  };

  const setSearch = React.useCallback(
    debounce((value: string) => {
      setSearchValue2(value);
    }, 250),
    []
  );

  return (
    <ForumLayout>
      <div className="content block">
        <h1 className="title">Все вопросы</h1>

        <div className="search input block hover">
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            type="text"
            placeholder="Поиск вопросов"
          />
          <svg width="20" height="20">
            <use xlinkHref="./img/icons/icons.svg#search" />
          </svg>
        </div>

        <div className="filters">
          <div className="selects">
            <Select
              className="select block"
              classNamePrefix="select"
              value={selectedOption}
              onChange={(value: any) => setSelectedOption(value)}
              options={options}
            />

            {selectedOption === options[1] && (
              <Select
                className="select block"
                classNamePrefix="select"
                value={selectedOption2}
                onChange={(value: any) => setSelectedOption2(value)}
                options={options2}
              />
            )}
          </div>

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
