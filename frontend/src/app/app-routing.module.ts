import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminComponentPage,
  HomeComponentPage,
  ProfileComponentPage,
  UsersComponentPage,
} from '../pages';
import { MapMarkSettingComponentPage } from '../pages/admin-path/map-mark-setting-page/map-mark-setting-page.component';
import { NotFoundComponentPage } from '../pages/not-found-page/not-found-page.component';
import { RoleGuard } from '../common/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponentPage,
  },
  {
    path: 'profile',
    component: ProfileComponentPage,
  },

  {
    path: 'admin',
    canActivate: [RoleGuard],
    component: AdminComponentPage,
    data: {
      expectedRole: 'admin',
    },
    children: [
      {
        path: 'map-marks',
        component: MapMarkSettingComponentPage,
      },
      {
        path: 'users',
        component: UsersComponentPage,
      },
    ],
  },

  { path: '**', component: NotFoundComponentPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
