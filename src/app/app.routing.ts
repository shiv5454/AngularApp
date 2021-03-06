import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { LoginHomeComponent } from './login/login-home/login-home.component';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginHomeComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate:[AuthGaurdService]
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      canActivate:[AuthGaurdService]
  }]},
  {
    path: '**',
    redirectTo: 'home',
    canActivate:[AuthGaurdService]
  }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
