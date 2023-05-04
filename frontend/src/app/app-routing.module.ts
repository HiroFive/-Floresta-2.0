import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminPageComponent,
  HomePageComponent,
  MapMarkSettingPageComponent,
  NotFoundPageComponent,
  OrdersPageComponent,
  ProductsPageComponent,
  ProfilePageComponent,
  UsersPageComponent,
} from '../pages';
import { RoleGuard } from '../common/guards/role.guard';
import { RouterPathEnum } from '../common/enums';

const routes: Routes = [
  { path: '', redirectTo: RouterPathEnum.Home, pathMatch: 'full' },
  {
    path: RouterPathEnum.Home,
    component: HomePageComponent,
  },
  {
    path: RouterPathEnum.Profile,
    component: ProfilePageComponent,
  },

  {
    path: RouterPathEnum.Admin,
    canActivate: [RoleGuard],
    component: AdminPageComponent,
    data: {
      expectedRole: 'admin',
    },
    children: [
      {
        path: RouterPathEnum.MapMarks,
        component: MapMarkSettingPageComponent,
      },
      {
        path: RouterPathEnum.Users,
        component: UsersPageComponent,
      },
      {
        path: RouterPathEnum.Products,
        component: ProductsPageComponent,
      },
      {
        path: RouterPathEnum.Orders,
        component: OrdersPageComponent,
      },
    ],
  },

  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
