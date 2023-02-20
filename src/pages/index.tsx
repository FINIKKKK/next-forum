import React from "react";
import qs from "qs";
import { useRouter } from "next/router";

import { ForumLayout } from "@/layouts/ForumLayout";
import {
  Filters,
  options,
  options2,
  Pagination,
  Question,
  Search,
  Selects,
} from "@/components";
import { Api } from "@/utils/api";
import { TQuestion } from "@/utils/api/models/question/types";

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = React.useState<TQuestion[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [option, setOption] = React.useState(options[0]);
  const [option2, setOption2] = React.useState(options2[0]);
  const isMounted = React.useRef(false);
  const limit = 2;
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValue2, setSearchValue2] = React.useState("");
  const [tag, setTag] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: limit,
          page: page,
          orderBy: option.value,
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
  }, [page, option, tag, searchValue2]);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        page: page,
        orderBy: option.value,
        tagBy: tag,
        search: searchValue2,
      });
      router.push(`?${params}`);
    }
  }, [page, option, tag, searchValue2]);

  React.useEffect(() => {
    const params = router.query;
    const orderByItem = options.find((obj) => obj.value === params.orderBy);
    if (params.page) {
      setPage(Number(params.page));
    }
    if (orderByItem) {
      setOption(orderByItem);
    }
    if (params.search) {
      setSearchValue(params.search);
      setSearchValue2(params.search);
    }
    if (params.tagBy) {
      setTag(params.tagBy);
    }
    isMounted.current = true;
  }, []);

  return (
    <ForumLayout>
      <div className="content block">
        <h1 className="title">Все вопросы</h1>

        <Search
          value={searchValue}
          setValue={setSearchValue}
          setSearchValue={setSearchValue2}
        />

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

        <Pagination page={page} limit={limit} total={total} setPage={setPage} />
      </div>
    </ForumLayout>
  );
}
