import React from "react";

import { TTag } from "@/utils/api/models/tag/types";
import { FiltersLayout } from "@/layouts/FiltersLayout";

export default function TagsPage() {
  const [tags, setTags] = React.useState<TTag[]>([]);

  return (
    <FiltersLayout setItems={setTags} type="tag">
      <div className="tags">
        {tags.map((obj: TTag) => (
          <Tag key={obj.id} {...obj} />
        ))}
      </div>
    </FiltersLayout>
  );
}
