import Link from 'next/link';
import React from 'react';

import { useSelectors } from '@/hooks/useSelectors';
import { Theme } from '@/redux/user/types';

import ss from './Error404.module.scss';

interface Error404Props {}

export const Error404: React.FC<Error404Props> = ({}) => {
  const { theme } = useSelectors((state) => state.user);

  return (
    <div className={ss.error404}>
      <div className={ss.inner}>
        {theme !== Theme.light ? (
          <img src="./img/error404.svg" alt="error404" />
        ) : (
          <img src="./img/error404(2).svg" alt="error404" />
        )}
        <h3>Страница не найдена</h3>
        <Link href="/" className="btn">
          На главную
        </Link>
      </div>
    </div>
  );
};
