import { NextPage } from 'next';

import { SettingsLayout } from '@/layouts/SettingsLayout';
import { Profile } from '@/screens/Settings/Profile';

interface SettingsProfilePageProps {}

const SettingsProfilePage: NextPage<SettingsProfilePageProps> = ({}) => {
  return (
    <SettingsLayout title="Профиль">
      <Profile />
    </SettingsLayout>
  );
};

export default SettingsProfilePage;
