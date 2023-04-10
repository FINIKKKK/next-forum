import { NextPage } from 'next';

import { SettingsLayout } from '@/layouts/SettingsLayout';
import { Account } from '@/screens/Settings/Account';

interface SettingsAccountPageProps {}

const SettingsAccountPage: NextPage<SettingsAccountPageProps> = ({}) => {
  return (
    <SettingsLayout title="Аккаунт">
      <Account />
    </SettingsLayout>
  );
};

export default SettingsAccountPage;
