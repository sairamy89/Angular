import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { ProjectComponent } from './admin/project/project.component';
import { TaskComponent } from './admin/task/task.component';
import { ManagerComponent } from './admin/manager/manager.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SearchFilterPipe } from './admin/SearchFilterPipe';
import { TimesheetComponent } from './admin/timesheet/timesheet.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { ExecutiveViewComponent } from './executive-view/executive-view.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ErrorPageComponent } from './error-page/error-page.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EmployeeComponent,
    ProjectComponent,
    TaskComponent,
    ManagerComponent,
    SearchFilterPipe,
    TimesheetComponent,
    EmployeeViewComponent,
    ManagerViewComponent,
    ExecutiveViewComponent,
    LoginComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    Ng2SearchPipeModule
  ],
  providers: [AuthService, AuthGuardService],
  exports: [
    EmployeeComponent,
    ProjectComponent,
    TaskComponent,
    TimesheetComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
