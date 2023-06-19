import { NextPage } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import React from 'react';

import {
  NotFound,
  options,
  options2,
  Pagination,
  Post,
  PostLoading,
  Search,
  SelectComponent,
  Selects,
} from '@/components';
import { MetaLayout } from '@/layouts/MetaLayout';
import { PostsLayout } from '@/layouts/PostsLayout';
import { Api } from '@/utils/api';
import { TPost } from '@/utils/api/models/post/types';

interface FeedPageProps {}

const FeedPage: NextPage<FeedPageProps> = ({}) => {
  const limit = 5;
  const [posts, setPosts] = React.useState<TPost[]>([]);
  const [isLoading, setisLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [tag, setTag] = React.useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchValue2, setSearchValue2] = React.useState('');
  const [option, setOption] = React.useState(options[0]);
  const router = useRouter();
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit,
          page,
          searchBy: searchValue2,
          ...(option && { orderBy: option.value }),
          ...(tag && { tagBy: tag }),
        };

        let data;
        data = await Api().post.getAll(params);
        if (data) {
          const { total, items } = data;
          setPosts(items);
          setTotal(total);
        }
      } catch (err) {
        console.warn(err);
        alert('Ошибка при получении постов');
      } finally {
        setisLoading(false);
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
    <MetaLayout title="Лента">
      <PostsLayout>
        <div className="posts">
          <div className="posts__header">
            <h1 className="title">
              {tag ? `Поиск по метке "${tag}"` : 'Все посты'}
            </h1>

            <div className="posts__filters">
              <Search
                value={searchValue}
                setValue={setSearchValue}
                setSearchValue={setSearchValue2}
              />

              <SelectComponent
                className="select"
                value={option}
                setValue={setOption}
                options={options}
              />
            </div>
          </div>

          {isLoading ? (
            Array(limit)
              .fill(0)
              .map((_, index) => <PostLoading key={index} />)
          ) : posts.length ? (
            posts.map((obj) => <Post key={obj.id} post={obj} />)
          ) : (
            <NotFound />
          )}
          
          {!!posts.length && (
            <Pagination
              className="pagination"
              page={page}
              setPage={setPage}
              total={total}
              limit={limit}
            />
          )}
        </div>
      </PostsLayout>
    </MetaLayout>
  );
};

export default FeedPage;
