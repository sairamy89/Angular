import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ManagerComponent } from './manager/manager.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
        EmployeeComponent,
        ProjectComponent,
        TaskComponent,
        TimesheetComponent,
        ManagerComponent
       ],
      imports: [
        FormsModule,
        Ng2SearchPipeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
