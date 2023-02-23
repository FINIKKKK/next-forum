import React from "react";

import { FiltersLayout } from "@/layouts/FiltersLayout";
import { User } from "@/components";

import { NextPage } from "next";
import { TUser } from "@/utils/api/models/user/types";

interface UsersPageProps {}

const UsersPage: NextPage<UsersPageProps> = ({}) => {
  const [users, setUsers] = React.useState<TUser[]>([]);

  return (
    <FiltersLayout type="user" limit={4} label="Все пользователи" setItems={setUsers} >
      <div className="tags">
        {users.map((obj: TUser) => (
          <User key={obj.id} {...obj} />
        ))}
      </div>
    </FiltersLayout>
  );
};

export default UsersPage;
