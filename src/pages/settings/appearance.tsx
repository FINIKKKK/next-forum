import { NextPage } from 'next';

import { SettingsLayout } from '@/layouts/SettingsLayout';
import { Appearance } from '@/screens/Settings/Appearance';

interface SeetingsAppearancePageProps {}

const SeetingsAppearancePage: NextPage<SeetingsAppearancePageProps> = ({}) => {
  return (
    <SettingsLayout title="Внешность">
      <Appearance />
    </SettingsLayout>
  );
};

export default SeetingsAppearancePage;
