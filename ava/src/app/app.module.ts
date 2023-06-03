import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './pages/profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './components/material/material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HomeModule } from './pages/home/home.module';
import { register } from 'swiper/element/bundle';
import { MenuBottomModule } from './components/menu-bottom/menu-bottom.module';
import { LayoutsComponent } from 'app/layouts/layouts.component';
import { CalendarComponent } from './components/modais/calendar/calendar.component';

register();
@NgModule({
  declarations: [AppComponent, LoadingComponent, LayoutsComponent, CalendarComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, ProfileModule, BrowserAnimationsModule, MaterialModule, HomeModule,MenuBottomModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {


}
