import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './pages/profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/material/material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HomeModule } from './pages/home/home.module';
import { register } from 'swiper/element/bundle';
import { MenuBottomModule } from './components/menu-bottom/menu-bottom.module';
import { AreaComponent } from 'app/layouts/area/area.component';
import { appReducer } from './store/app.state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordModule } from './pages/reset-password/reset-password.module';
register();
@NgModule({
  declarations: [AppComponent, LoadingComponent, AreaComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ResetPasswordModule,
    AppRoutingModule,
    ProfileModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
    MenuBottomModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      trace: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
