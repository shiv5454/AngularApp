import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginHomeComponent } from './login/login-home/login-home.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { CustomeEqualValidatorDirective } from './directives/custome-equal-validator.directive';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    NgbModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DashboardComponent,
    LoginHomeComponent,
    SignUpComponent,
    CarouselComponent,
    CustomeEqualValidatorDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
