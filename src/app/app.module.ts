import { ClipboardModule } from '@angular/cdk/clipboard';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplatePageTitleStrategy } from './extension/title.strategy';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ComponentsModule } from './components/components.module';
import { JwtTokenInterceptor } from './extension/http.interceptor';
import { PagesModule } from './pages/pages.module';
import { CustomSerializer } from './router/implementations/custom.serializer';
import { AppRoutingModule } from './routes/app-routing.module';
import { appEffects } from './state/app/app.effects';
import { appReducer } from './state/app/app.reducer';

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
    EffectsModule.forRoot(appEffects),
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
export class AppModule {}
