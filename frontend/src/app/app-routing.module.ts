import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AdminPageComponent,
  HomePageComponent,
  MapMarkSettingPageComponent,
  NotFoundPageComponent,
  OrderHistoryPageComponent,
  OrdersPageComponent,
  ProductsPageComponent,
  ProfilePageComponent,
  UsersPageComponent,
} from '../pages';
import { RoleGuard } from '../common/guards/role.guard';
import { RouterPathEnum } from '../common/enums';
import { CatalogPageComponent } from '../pages/catalog-page/catalog-page.component';
import { CheckoutPageComponent } from '../pages/checkout-page/checkout-page.component';
import { ThankYouPageComponent } from '../pages/thank-you-page/thank-you-page.component';
import { IdGuard } from '../common/guards/id.guard';
import { orderNumberGuard } from '../common/guards/orderNumber.guard';
import { LogoutPageComponent } from '../pages/logout-page/logout-page.component';

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
    path: RouterPathEnum.Catalog,
    canActivate: [IdGuard],
    component: CatalogPageComponent,
  },
  {
    path: RouterPathEnum.Logout,
    component: LogoutPageComponent,
  },
  {
    path: RouterPathEnum.Checkout,
    canActivate: [IdGuard],
    component: CheckoutPageComponent,
  },
  {
    path: RouterPathEnum.ThankYou,
    canActivate: [orderNumberGuard],
    component: ThankYouPageComponent,
  },
  {
    path: RouterPathEnum.Orders,
    component: OrderHistoryPageComponent,
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
