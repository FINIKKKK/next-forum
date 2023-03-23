import Link from 'next/link';
import React from 'react';

import { Avatar } from '@/components';
import { TUser } from '@/utils/api/models/user/types';

import ss from './UserBox.module.scss';

interface UserBoxProps {
  user: TUser | null;
  className: string;
}

export const UserBox: React.FC<UserBoxProps> = ({ user, className }) => {
  return (
    <div className={`${className} ${ss.user}`}>
      <Avatar avatar={user?.avatar} login={user?.login} className={ss.avatar} />
      <div className={ss.info}>
        {user?.name && <div className={ss.name}>{user?.name}</div>}
        <Link href={`/users/${user?.login}`}>
          <h6 className={ss.login}>@{user?.login}</h6>
        </Link>
      </div>
    </div>
  );
};
