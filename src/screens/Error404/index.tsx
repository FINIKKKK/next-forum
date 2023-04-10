import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { useSelectors } from '@/hooks/useSelectors';
import { Theme } from '@/redux/user/types';

import ss from './Error404.module.scss';

interface Error404Props {
  title: string;
  text: string;
}

export const Error404: React.FC<Error404Props> = ({ title, text }) => {
  const { theme } = useSelectors((state) => state.user);

  return (
    <div className={ss.error404}>
      <div className={ss.inner}>
        <h1>{title}</h1>
        {theme !== Theme.light ? (
          <Image
            src="./img/error404.svg"
            alt="error404"
            width={400}
            height={400}
          />
        ) : (
          <Image
            src="./img/error404(2).svg"
            alt="error404"
            width={400}
            height={400}
          />
        )}
        <h3>{text}</h3>
        <Link href="/" className={ss.btn}>
          <svg width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#back" />
          </svg>
          <p>На главную</p>
        </Link>
      </div>
    </div>
  );
};
