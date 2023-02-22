import { options, Pagination, Search, TOption } from "@/components";
import { Api } from "@/utils/api";
import { useRouter } from "next/router";
import qs from "qs";
import React from "react";
import { ForumLayout } from "./ForumLayout";

type FiltersLayoutsProps = {
  children: any;
  setItems: (value: any) => void;
  type: string;
  option?: TOption;
  setOption?: (value: TOption) => void;
};

export const FiltersLayout: React.FC<FiltersLayoutsProps> = ({
  children,
  setItems,
  type,
  option,
  setOption,
}) => {
  const router = useRouter();
  const limit = 4;
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const isMounted = React.useRef(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValue2, setSearchValue2] = React.useState("");
  const [tag, setTag] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: limit,
          page: page,
          search: searchValue2,
          ...(option && { orderBy: option.value }),
          ...(tag && { tagBy: tag }),
        };
        let data;
        if (type === "tag") {
          data = await Api().tag.getAll(params);
        } else if (type === "user") {
          data = await Api().user.getAll(params);
        } else if (type === "question") {
          data = await Api().question.getAll(params);
        }

        if (data) {
          const { total, items } = data;
          setItems(items);
          setTotal(total);
        }
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении");
      }
    })();
  }, [page, searchValue2, option, tag]);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        page: page,
        ...(searchValue2 && { search: searchValue2 }),
        ...(tag && { tagBy: tag }),
        ...(option && { orderBy: option.value }),
      });
      router.push(`?${params}`);
    }
  }, [page, searchValue2, option, tag]);

  React.useEffect(() => {
    const params = router.query;
    const orderByItem = options.find((obj) => obj.value === params.orderBy);
    if (params.page) {
      setPage(Number(params.page));
    }
    if (params.search) {
      setSearchValue(params.search);
      setSearchValue2(params.search);
    }
    if (setOption && orderByItem) {
      setOption(orderByItem);
    }
    if (params.tagBy) {
      setTag(params.tagBy);
    }
    isMounted.current = true;
  }, []);

  return (
    <ForumLayout>
      <div className="content block">
        <h1 className="title">Все метки</h1>

        <Search
          value={searchValue}
          setValue={setSearchValue}
          setSearchValue={setSearchValue2}
        />

        {children}

        <Pagination page={page} limit={limit} total={total} setPage={setPage} />
      </div>
    </ForumLayout>
  );
};
