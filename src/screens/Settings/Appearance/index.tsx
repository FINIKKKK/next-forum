import Image from 'next/image';
import React from 'react';

import { useActions } from '@/hooks/useActions';
import { useSelectors } from '@/hooks/useSelectors';
import { Theme } from '@/redux/user/types';

import ss from './Appearance.module.scss';

interface AppearanceProps {}

export const Appearance: React.FC<AppearanceProps> = ({}) => {
  const { setTheme } = useActions();
  const { theme } = useSelectors((state) => state.user);

  return (
    <>
      <ul className={ss.list}>
        <li className={ss.item}>
          <Image
            src="/img/dark_theme.svg"
            alt="dark_theme"
            width={350}
            height={230}
          />
          <div className={ss.input}>
            <label onClick={() => setTheme(Theme.dark)} className={ss.radio}>
              <input
                type="radio"
                id="radio1"
                name="radio1"
                value="RadioButton1"
                checked={theme === Theme.dark}
              />
              <span>Темная тема</span>
            </label>
          </div>
        </li>
        <li className={ss.item}>
          <Image
            src="/img/light_theme.svg"
            alt="dark_theme"
            width={350}
            height={230}
          />
          <div className={ss.input}>
            <label onClick={() => setTheme(Theme.light)} className={ss.radio}>
              <input
                type="radio"
                id="radio2"
                name="radio1"
                value="RadioButton2"
                checked={theme === Theme.light}
              />
              <span>Светлая тема</span>
            </label>
          </div>
        </li>
      </ul>
    </>
  );
};
