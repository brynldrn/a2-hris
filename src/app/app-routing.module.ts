import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_authGuard/authguard';
import { EmployeeComponent } from './pages/employee/employee.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { LeaveApplyComponent } from './pages/leave-apply/leave-apply.component';
import { LeaveHistoryComponent } from './pages/leave-history/leave-history.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leave-list',
    component: LeaveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leave-apply',
    component: LeaveApplyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leave-history',
    component: LeaveHistoryComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
