import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';

import { GreenColorDirective } from './directives/green-color.directive';
import { NgUnlessDirective } from './directives/ng-unless.directive';
import { RoutingModule } from './router/routing.module';
//import { HttpTestComponent } from './http-test/http-test.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
//import { LogInterceptor } from './http-test/log.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GreenColorDirective,
    NgUnlessDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
