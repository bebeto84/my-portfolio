import { Route } from '@angular/router';
import { Home } from './home';
import { UsheruExperience } from './usheru-experience';
import { SuprNationExperience } from './suprnation-experience';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Home,
    title: 'Miguel Soler — Lead Frontend Engineer',
  },
  {
    path: 'experience/usheru',
    component: UsheruExperience,
    title: 'Usheru Experience — Miguel Soler',
  },
  {
    path: 'experience/suprnation',
    component: SuprNationExperience,
    title: 'SuprNation Experience — Miguel Soler',
  },
];
