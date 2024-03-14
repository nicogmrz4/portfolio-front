import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HomeModule } from '@modules/home/home.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '@modules/dashboard/interceptors/token.interceptor';
import { authInterceptor } from '@modules/dashboard/interceptors/auth.interceptor';
import { dashboardInterceptor } from '@modules/dashboard/interceptors/dashboard.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([tokenInterceptor, authInterceptor, dashboardInterceptor])
    )
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
