import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppCommonModule } from './app-common.module';

import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './+store/reducers/_index';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule, RoutingComponents, CommonComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AuthenticationInterceptor } from './interceptors/index';
import { ImageEffects } from './+store/effects/image.effect';
import { IndustryEffects } from './+store/effects/industry.effect';
@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    CommonComponents,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppCommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([
      ImageEffects,
      IndustryEffects
    ])
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
