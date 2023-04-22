import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import {
  NbButtonModule,
  NbIconModule,
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
import { HomeComponent, ProfileComponent } from '../pages';
import { AuthModule } from '@auth0/auth0-angular';
import { profileReducer } from '../store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from '../store/effects';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from '../components/google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavigationItemComponent,
    ButtonComponent,
    HomeComponent,
    ProfileComponent,
    GoogleMapComponent,
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
    StoreModule.forRoot({ ...profileReducer }),
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
    EffectsModule.forRoot([ProfileEffects]),
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
