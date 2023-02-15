import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

import { appEffects, appReducer, appSelectors, RootState } from './store';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './login/services/auth.service';
import { LoginGuard } from './login/guards/login.guard';
import { MainGuard } from './core/guards/main.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TopItems } from './profile/services/topitems.service';
import { TrackService } from './tracks/services/track.service';
import { ArtistinfoService } from './artists/services/artistinfo.service';
import { CheckerService } from './core/services/checker.service';

export function localStorageSyncReducer(
  reducer: ActionReducer<RootState>
): ActionReducer<RootState> {
  return localStorageSync({
    keys: [
      'album',
      'track',
      'playlist',
      'myMusic',
      'following',
      'recommendations',
      'profile',
      'categories',
      'artist',
    ],
    rehydrate: true,
  })(reducer);
}

const metaReducers = [localStorageSyncReducer, storeFreeze];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot(appReducer, { metaReducers }),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    BrowserAnimationsModule,
    CoreModule,
  ],
  providers: [
    appSelectors,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    LoginGuard,
    MainGuard,
    TopItems,
    TrackService,
    ArtistinfoService,
    CheckerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
