import React from "react";
import qs from "qs";
import { useRouter } from "next/router";

import { ForumLayout } from "@/layouts/ForumLayout";
import { Pagination, Tag } from "@/components";
import { Api } from "@/utils/api";
import { Search } from "@/components/PageHome";
import { TTag } from "@/utils/api/models/tag/types";

export default function Home() {
  const router = useRouter();
  const [tags, setTags] = React.useState<TTag[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const isMounted = React.useRef(false);
  const limit = 2;
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
        const { total, items } = await Api().tag.getAll(params);
        setTags(items);
        setTotal(total);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении меток");
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

        <div className="tags">
          {tags.map((obj: TTag) => (
            <Tag key={obj.id} {...obj} />
          ))}
        </div>

        <Pagination page={page} limit={limit} total={total} setPage={setPage} />
      </div>
    </ForumLayout>
  );
}
