import { NextPage } from 'next';
import React from 'react';

import { LoadingElem, NotFound, User } from '@/components';
import { FiltersLayout } from '@/layouts/FiltersLayout';
import { TUser } from '@/utils/api/models/user/types';

interface UsersPageProps {}

const UsersPage: NextPage<UsersPageProps> = ({}) => {
  const [users, setUsers] = React.useState<TUser[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const limit = 6;

  return (
    <FiltersLayout
      type="user"
      limit={limit}
      label="Все пользователи"
      setItems={setUsers}
      setIsLoading={setIsLoading}
      itemsLength={users.length}
    >
      <div className="list">
        {isLoading ? (
          Array(limit)
            .fill(0)
            .map((_, index) => (
              <LoadingElem className="loading__user" key={index} />
            ))
        ) : users.length ? (
          users.map((obj: TUser) => <User key={obj.id} {...obj} />)
        ) : (
          <NotFound />
        )}
      </div>
    </FiltersLayout>
  );
};

export default UsersPage;
