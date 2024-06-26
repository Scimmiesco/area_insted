import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './pages/profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ResetPasswordModule } from './pages/reset-password/reset-password.module';
import { InputMaskModule } from 'primeng/inputmask';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CpfCnpjPipe } from './pipes/cpf-format.pipe';
import { RetornoRequisicaoModalModule } from './components/modais/retornoRequisicao/retornoRequisicao.module';
import { HorarioModule } from './components/modais/horario/horario.module';
import { SideNavModule } from './components/side-nav/side-nav.module';
import { RouterModule } from '@angular/router';
import { FinanceiroModule } from './components/modais/financeiro/financeiro.module';
import { MateriaAtividadesModule } from './pages/materiaAtividades/materiaAtividades.module';
import { MaterialModule } from './components/material/material.module';
import { HorarioAulasComponent } from './pages/horario-aulas/horario-aulas.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AtividadesModule } from './components/atividades/atividades.module';
import { AtividadeModule } from './components/modais/atividade/atividade.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CriarOuEditarAtividadeModule } from './shared/Atividade/CriarOuEditar.module';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);
register();

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    AreaComponent,
    HorarioAulasComponent,
  ],
  imports: [
    ResetPasswordModule,
    ProfileModule,
    MateriaAtividadesModule,
    HomeModule,
    AtividadesModule,
    SideNavModule,
    FinanceiroModule,
    MenuBottomModule,
    RetornoRequisicaoModalModule,
    AtividadeModule,
    HorarioModule,
    CriarOuEditarAtividadeModule,

    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,

    InputMaskModule,
    CpfCnpjPipe,

    StoreModule.forRoot({ app: appReducer }),
    AngularSvgIconModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      trace: true,
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    provideNgxMask(),
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
