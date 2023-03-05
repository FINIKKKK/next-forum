import React from 'react';

import { FiltersLayout } from '@/layouts/FiltersLayout';
import { LoadingElement, User } from '@/components';

import { NextPage } from 'next';
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
    >
      <div className="list">
        {isLoading
          ? Array(limit)
              .fill(0)
              .map((_, index) => (
                <LoadingElement className="loading__user" key={index} />
              ))
          : users.map((obj: TUser) => <User key={obj.id} {...obj} />)}
      </div>
    </FiltersLayout>
  );
};

export default UsersPage;
