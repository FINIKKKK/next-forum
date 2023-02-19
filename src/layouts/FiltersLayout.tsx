import { Pagination, Search } from "@/components";
import { Api } from "@/utils/api";
import { useRouter } from "next/router";
import qs from "qs";
import React from "react";
import { ForumLayout } from "./ForumLayout";

type FiltersLayoutsProps = {
  children: any;
  setItems: any;
  type: any;
};

export const FiltersLayout: React.FC<FiltersLayoutsProps> = ({
  children,
  setItems,
  type,
}) => {
  const router = useRouter();
  const limit = 2;
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const isMounted = React.useRef(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [searchValue2, setSearchValue2] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: limit,
          page: page,
          search: searchValue2,
        };
        let data;
        if (type === "tag") {
          data = await Api().tag.getAll(params);
        } else if (type === "user") {
          data = await Api().user.getAll(params);
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
  }, [page, searchValue2]);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        page: page,
        search: searchValue2,
      });
      router.push(`?${params}`);
    }
  }, [page, searchValue2]);

  React.useEffect(() => {
    const params = router.query;
    if (params.page) {
      setPage(Number(params.page));
    }
    if (params.search) {
      setSearchValue(params.search);
      setSearchValue2(params.search);
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
