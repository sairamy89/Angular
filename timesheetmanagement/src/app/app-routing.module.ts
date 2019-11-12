import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ExecutiveViewComponent } from './executive-view/executive-view.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { AdminComponent } from './admin/admin.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TimesheetComponent } from './admin/timesheet/timesheet.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'null',
    component: LoginComponent
  },
  {
    path: 'cf0in00x',
    canActivate: [AuthGuardService],
    component: AdminComponent
  },
  {
    path: 'dn5j0zffl',
    canActivate: [AuthGuardService],
    component: EmployeeViewComponent
  },
  {
    path: 'mamcxf5l1he',
    canActivate: [AuthGuardService],
    component: ManagerViewComponent
  },
  {
    path: 'fze6vqitdl001',
    canActivate: [AuthGuardService],
    component: ExecutiveViewComponent
  },
  {
    path: 'error',
    canActivate: [AuthGuardService],
    component: ErrorPageComponent
  },
  {
    path: 'manager',
    redirectTo: 'error'
  },
  {
    path: 'employee',
    redirectTo: 'error'
  },
  {
    path: 'executive',
    redirectTo: 'error'
  },
  {
    path: 'admin',
    redirectTo: 'error'
  }
];
// export const AppRoutes = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
