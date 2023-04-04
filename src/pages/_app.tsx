import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import { useSelectors } from '@/hooks/useSelectors';
import { wrapper } from '@/redux/store';
import { setUserData } from '@/redux/user/slice';
import { Theme } from '@/redux/user/types';
import '@/styles/style.scss';
import { Api } from '@/utils/api';

interface AppComponentProps {
  Component: any;
  props: any;
}

function useTheme(theme: Theme) {
  React.useEffect(() => {
    document.body.classList.add(theme.toLowerCase());
    document.documentElement.classList.add(theme.toLowerCase());
    return () => {
      document.body.classList.remove(theme.toLowerCase());
      document.documentElement.classList.remove(theme.toLowerCase());
    };
  }, [theme]);
}

export const AppComponent: React.FC<AppComponentProps> = ({
  Component,
  props,
}) => {
  const { theme } = useSelectors((state) => state.user);
  useTheme(theme);

  return <Component {...props.pageProps} />;
};

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <AppComponent Component={Component} props={props} />
    </Provider>
  );
};

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.getProfile();
        store.dispatch(setUserData(userData));
      } catch (err) {
        console.log('Error Authorization');
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    },
);

export default App;
