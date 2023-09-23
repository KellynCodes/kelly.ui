import { TemplatePageTitleStrategy } from './extension/title.strategy';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TitleStrategy } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './routes/app-routing.module';
import { JwtTokenInterceptor } from './extension/http.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './state/app/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './router/implementations/custom.serializer';
import { AuthEffect } from './modules/auth/state/auth.effect';
import { ContactEffect } from './pages/contact/state/contact.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    PagesModule,
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffect, ContactEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
