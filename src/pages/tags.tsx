import { LoadingElement, NotFound, Tag } from "@/components";
import { FiltersLayout } from "@/layouts/FiltersLayout";
import { TTag } from "@/utils/api/models/tag/types";
import { NextPage } from "next";
import React from "react";

interface TagsPageProps {}

const TagsPage: NextPage<TagsPageProps> = ({}) => {
  const [tags, setTags] = React.useState<TTag[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const limit = 6;

  return (
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
              <LoadingElement className="loading__tag" key={index} />
            ))
        ) : tags.length ? (
          tags.map((obj: TTag) => <Tag key={obj.id} {...obj} />)
        ) : (
          <NotFound />
        )}
      </div>
    </FiltersLayout>
  );
};

export default TagsPage;
