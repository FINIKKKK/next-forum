import React from "react";
import { NextPage } from "next";

import { TTag } from "@/utils/api/models/tag/types";
import { FiltersLayout } from "@/layouts/FiltersLayout";
import { LoadingElement, Tag } from "@/components";

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
    >
      <div className="list">
        {isLoading
          ? Array(limit)
              .fill(0)
              .map((_, index) => (
                <LoadingElement className="loading__tag" key={index} />
              ))
          : tags.map((obj: TTag) => <Tag key={obj.id} {...obj} />)}
      </div>
    </FiltersLayout>
  );
};

export default TagsPage;
