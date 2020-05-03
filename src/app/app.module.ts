import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginHomeComponent } from './login/login-home/login-home.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { CustomeEqualValidatorDirective } from './directives/custome-equal-validator.directive';
import { LbdModule } from './lbd/lbd.module';
import { TaskComponent } from './task/task/task.component';
import { CommentComponent } from './comments/comment/comment.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,    
    LbdModule,
    SidebarModule,
    AppRoutingModule,
    MatTableModule,
    MatInputModule,
    NgxSpinnerModule ,
    NgSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DashboardComponent,
    LoginHomeComponent,
    SignUpComponent,
    CustomeEqualValidatorDirective,
    TaskComponent,
    CommentComponent,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
