import { EmployeeComponent } from './pages/employee/employee.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './_authGuard/authguard';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig, JwtHelper } from 'angular2-jwt';
import { EmployeeService } from './employee.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { LeaveComponent } from './pages/leave/leave.component';
import { LeaveService } from './leave.service';
import { LeaveApplyComponent } from './pages/leave-apply/leave-apply.component';
import { LeaveHistoryComponent } from './pages/leave-history/leave-history.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    EmployeeComponent,
    LeaveComponent,
    LeaveApplyComponent,
    LeaveHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    JwtHelper,
    EmployeeService,
    LeaveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
