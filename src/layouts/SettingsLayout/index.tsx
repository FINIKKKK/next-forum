import { useSelectors } from '@/hooks/useSelectors';

import { MainLayout } from '../MainLayout';
import { MetaLayout } from '../MetaLayout';
import ss from './SettingsLayout.module.scss';
import { Sidebar } from './Sidebar';

type SettingsLayoutsProps = {
  children: React.ReactNode;
  title: string;
};

export const SettingsLayout: React.FC<SettingsLayoutsProps> = ({
  children,
  title,
}) => {
  return (
    <MetaLayout title="Настройки аккаунта">
      <MainLayout>
        <div className={ss.settings}>
          <div className="container">
            <div className={ss.inner}>
              <Sidebar />

              <main className={ss.main}>
                <h2 className={ss.title}>Настройки аккаунта</h2>

                <div className={`block ${ss.main__inner}`}>
                  <h4 className={ss.main__title}>{title}</h4>

                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </MainLayout>
    </MetaLayout>
  );
};
