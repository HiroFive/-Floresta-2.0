import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbThemeModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from 'src/components/navbar';
import { ButtonComponent } from '../components/button/button.component';
import { NavigationItemComponent } from '../components/navbar/navigation-item/navigation-item.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  AdminComponentPage,
  HomeComponentPage,
  MapMarkSettingComponentPage,
  NotFoundComponentPage,
  ProfileComponentPage,
} from '../pages';
import { AuthModule } from '@auth0/auth0-angular';
import {
  cartReducer,
  mapMarkerReducer,
  profileReducer,
} from '../store/reducers';
import { EffectsModule } from '@ngrx/effects';
import {
  CartEffects,
  MapMarkersEffects,
  ProfileEffects,
} from '../store/effects';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from '../components/google-map/google-map.component';
import { AdminPanelSidebarComponent } from '../components/admin-panel-sidebar/admin-panel-sidebar.component';
import { SidebarItemsComponent } from '../components/admin-panel-sidebar/sidebar-items/sidebar-items.component';
import { ModalComponent } from '../components/modal/modal.component';
import { AddMapMarkerComponent } from '../components/forms';
import { FormInputComponent } from '../components/form-input/form-input.component';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';
import { DeleteMapMarkerComponent } from '../components/forms/delete';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    NavbarComponent,
    NavigationItemComponent,
    ButtonComponent,
    GoogleMapComponent,
    AdminPanelSidebarComponent,
    SidebarItemsComponent,
    AddMapMarkerComponent,
    CheckboxComponent,
    FormInputComponent,
    DeleteMapMarkerComponent,
    ModalComponent,
    // Pages
    HomeComponentPage,
    ProfileComponentPage,
    NotFoundComponentPage,
    AdminComponentPage,
    MapMarkSettingComponentPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbInputModule,
    NbCheckboxModule,
    StoreModule.forRoot({
      ...profileReducer,
      ...cartReducer,
      ...mapMarkerReducer,
    }),
    NbThemeModule.forRoot({ name: 'default2' }),
    AuthModule.forRoot({
      domain: 'dev-yn6tinfev7nut3ap.eu.auth0.com',
      clientId: 'XRauFMnZ8PkPNK3NKnNIIOaxWS63UNL3',
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    EffectsModule.forRoot([ProfileEffects, CartEffects, MapMarkersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !true, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
