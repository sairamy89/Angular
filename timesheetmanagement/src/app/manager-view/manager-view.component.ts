import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Project } from './../admin/shared/project.model';
import { ProjectService } from './../admin/shared/project.service';
import { Employee } from './../admin/shared/employee.model';
import { EmployeeService } from './../admin/shared/employee.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrService } from 'ngx-toastr';
import { ManagerView, EmpTimeSheets, ProjectView } from './../shared/manager-view.model';
import { ManagerViewService } from './../shared/manager-view.service';
import { Timesheet } from './../admin/shared/timesheet.model';
import { Manager } from './../admin/shared/manager.model';


@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} /*{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}*/]
})
export class ManagerViewComponent implements OnInit {
  displayName: string;
  projectList: Project[];
  employeeList: Employee[];
  empTimesheetList: EmpTimeSheets[];
  isSelected: string;
  term: string;
  noData: boolean;
  loadData: boolean;
  ngValue: string;
  empName: string;
  managerFormToggle: boolean;
  commentFormToggle: boolean;
  timesheetID: string;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public authService: AuthService, private afAuth: AngularFireAuth, private tostr: ToastrService,
              private projectService: ProjectService, private employeeService: EmployeeService, public mngrService: ManagerViewService) {
    this.user = this.afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.displayName = this.userDetails.displayName;
        } else {
          this.userDetails = null;
        }
      }
    );
   }

  ngOnInit() {
    this.getProjects();
    this.managerFormToggle = true;
  }

  getProjects() {
    const projects = this.projectService.getData('M', localStorage.getItem('id'));
    projects.snapshotChanges().subscribe(item => {
      this.projectList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        console.log(y);
        y['$key'] = element.key;
        this.projectList.push(y as Project); });
    });
  }

  getEmployees(prjKey: any) {
    const key = prjKey.split(': ').pop();
    this.employeeService.getManagerEmployees(key).subscribe(item2 => {
      this.employeeList = [];
      console.log(item2);
      item2.forEach(element2 => {
        const x = element2.payload.toJSON();
        console.log(x);
        x['$key'] = element2.key;
        this.employeeList.push(x as Employee); });
    });
  }

   onSubmit(managerViewForm: NgForm) {
    const empTimesheet = this.mngrService.getEmployeeTimesheets(managerViewForm.value);
    empTimesheet.snapshotChanges().subscribe(item => {
      this.empTimesheetList = [];
      if (item.length > 0 ) {
        item.forEach(element => {
          const y = element.payload.toJSON();
          this.empName = element.payload.toJSON()['employee'];
          y['$key'] = element.key;
          this.noData = false;
          this.loadData = true;
          this.empTimesheetList.push(y as EmpTimeSheets);
        });
      } else {
        this.loadData = false;
        this.noData = true;
      }
    });
    this.onReset(managerViewForm);
  }

  onReset(managerViewForm?: NgForm) {
    if (managerViewForm != null) {
      managerViewForm.reset();
      this.isSelected = null;
    }
    this.mngrService.selectedTimesheet = {
      project: '',
      d: null,
      employee: {
        uid: '',
        proj_name: ''
      }
    };
  }

  onApprove(key: string) {
    // this.isSelected = timesheet.$key;
    this.mngrService.approveTimesheet(key, localStorage.getItem('empID'));
  }

  onDecline(key: string) {
   this.mngrService.declineTimeSheet(key, localStorage.getItem('empID'));
  }

   onComment(ID: string, message: string) {
    console.log(ID, message);
    this.mngrService.addComment(ID, localStorage.getItem('empID'), message);
    this.tostr.success('Your Comment is sent', 'Hi');
    this.commentFormToggle = false;
    this.managerFormToggle = true;
    this.isSelected = null;
  }

  toggleCommentForm(empComment: EmpTimeSheets) {
    if (empComment != null) {
      this.isSelected = empComment.$key;
      this.managerFormToggle = false;
      this.commentFormToggle = true;
      this.timesheetID = empComment.$key;
    } else {
      console.log('No Comments are given to toggle ManagerForm');
    }
  }
  closeCommentForm() {
      this.commentFormToggle = false;
      this.managerFormToggle = true;
      this.isSelected = null;
  }
}
