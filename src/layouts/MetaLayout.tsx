import Head from 'next/head';
import React from 'react';

import { useSelectors } from '@/hooks/useSelectors';
import { Theme } from '@/redux/user/types';

interface MetaLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  noIndex?: boolean;
  noTitle?: boolean;
}

export const MetaLayout: React.FC<MetaLayoutProps> = ({
  children,
  title,
  description,
  noIndex,
  noTitle,
}) => {
  const { theme } = useSelectors((state) => state.user);
  const desc = description
    ? description
    : 'Платформа для IT-специалистов, позволяющая общаться, обмениваться знаниями, опытом и ресурсами, а также получать образовательные и профессиональные материалы.';

  return (
    <>
      <Head>
        <title>
          {title} {noTitle ? '' : '| NeoCode'}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!noIndex ? (
          <>
            <meta name="description" content={desc} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={desc} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}

        {theme === Theme.light ? (
          <link rel="icon" href="/favicon2.png" />
        ) : (
          <link rel="icon" href="/favicon.png" />
        )}
      </Head>

      {children}
    </>
  );
};
