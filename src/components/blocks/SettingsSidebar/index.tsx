import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Sticky from 'react-stickynode';

import { useBottomBoundary } from '@/hooks/useBottomBoundary';

import ss from './SettingsSidebar.module.scss';

interface SettingsSidebarProps {}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({}) => {
  const router = useRouter();
  const [bottomBord, setBottomBord] = React.useState<number | null>(null);
  useBottomBoundary(setBottomBord);

  return (
    <Sticky
      top={45}
      bottomBoundary={bottomBord ? bottomBord : 'window'}
      className={`sidebar ${ss.sidebar}`}
    >
      <Link
        href="/settings/profile"
        className={classNames('hover item', ss.item, {
          active: router.pathname === '/settings/profile',
        })}
      >
        <svg width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#user" />
        </svg>
        <p>Профиль</p>
      </Link>
      <Link
        href="/settings/account"
        className={classNames('hover item', ss.item, {
          active: router.pathname === '/settings/account',
        })}
      >
        <svg width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#settings" />
        </svg>
        <p>Аккаунт</p>
      </Link>
      <Link
        href="/settings/appearance"
        className={classNames('hover item', ss.item, {
          active: router.pathname === '/settings/appearance',
        })}
      >
        <svg width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#appearance" />
        </svg>
        <p>Внешность</p>
      </Link>
    </Sticky>
  );
};
