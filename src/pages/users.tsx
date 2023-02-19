import React from "react";

import { TUser } from "@/utils/api/models/user/types";
import { FiltersLayout } from "@/layouts/FiltersLayout";
import { User } from "@/components";

export default function UsersPage() {
  const [users, setUsers] = React.useState<TUser[]>([]);

  return (
    <FiltersLayout setItems={setUsers} type="user">
      <div className="tags">
        {users.map((obj: TUser) => (
          <User key={obj.id} {...obj} />
        ))}
      </div>
    </FiltersLayout>
  );
}
