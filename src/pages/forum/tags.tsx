import { NextPage } from 'next';
import React from 'react';

import { LoadingElem, NotFound, Tag } from '@/components';
import { FiltersLayout } from '@/layouts/FiltersLayout';
import { TTag } from '@/utils/api/models/tag/types';
import { MetaLayout } from '@/layouts/MetaLayout';

interface TagsPageProps {}

const TagsPage: NextPage<TagsPageProps> = ({}) => {
  const [tags, setTags] = React.useState<TTag[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const limit = 9;

  return (
    <MetaLayout title="Все метки">
      <FiltersLayout
        type="tag"
        limit={limit}
        label="Все метки"
        setItems={setTags}
        setIsLoading={setIsLoading}
        itemsLength={tags.length}
      >
        <div className="list">
          {isLoading ? (
            Array(limit)
              .fill(0)
              .map((_, index) => (
                <LoadingElem className="loading__tag" key={index} />
              ))
          ) : tags.length ? (
            tags.map((obj: TTag) => <Tag key={obj.id} {...obj} />)
          ) : (
            <NotFound />
          )}
        </div>
      </FiltersLayout>
    </MetaLayout>
  );
};

export default TagsPage;
