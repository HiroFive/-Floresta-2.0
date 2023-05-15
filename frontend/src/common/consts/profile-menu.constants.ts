import { NbMenuItem } from '@nebular/theme';
import { RouterPathEnum } from '../enums';

export const profileMenuConstants: NbMenuItem[] = [
  {
    title: 'Мій профіль',
    link: `/${RouterPathEnum.Profile}`,
    icon: 'person-outline',
  },
  {
    title: 'Мої замовлення',
    link: `/${RouterPathEnum.Orders}`,
    icon: 'shopping-bag-outline',
  },
];
