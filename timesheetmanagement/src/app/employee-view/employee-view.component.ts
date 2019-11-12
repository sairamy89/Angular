import { Component, OnInit, Injectable } from '@angular/core';
import { EmployeeViewService } from '../shared/employee-view.service';
import { EmployeeView } from '../shared/employee-view.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../admin/shared/project.service';
import { TaskService } from '../admin/shared/task.service';
import { Project } from './../admin/shared/project.model';
import { Task } from '../admin/shared/task.model';
import { NgForm } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

/* @Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
} */
@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} /*{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}*/]
})

export class EmployeeViewComponent implements OnInit {
  timesheetsList: EmployeeView[];
  projectList: Project[];
  taskList: Task[];
  selectedTimesheet: EmployeeView = new EmployeeView();
  displayName: string;
  isSelected: string;
  term: string;
  userID: string;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  hours: Array<Object> = [
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
    {name: '4', value: 4},
    {name: '5', value: 5},
    {name: '6', value: 6},
    {name: '7', value: 7},
    {name: '8', value: 8} ];

  constructor(public empService: EmployeeViewService, private toastr: ToastrService, private projectService: ProjectService,
              private taskService: TaskService, public authService: AuthService, private firebaseAuth: AngularFireAuth) {
        this.user = this.firebaseAuth.authState;
        this.user.subscribe(
          (user) => {
            if (user) {
              this.userDetails = user;
              this.displayName = this.userDetails.displayName;
              this.userID = this.userDetails.uid;
            } else {
              this.userDetails = null;
            }
          }
        );
  }

  ngOnInit() {
    this.getTimeSheets();
    this.getProjects();
    this.getTasks();
  }

  getProjects() {
    const projects = this.projectService.getData('E', localStorage.getItem('_e'));
    projects.snapshotChanges().subscribe(item => {
      this.projectList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        console.log(y);
        y['$key'] = element.key;
        this.projectList.push(y as Project); });
    });
  }

  getTasks() {
    const tasks = this.taskService.getData();
    tasks.snapshotChanges().subscribe(item => {
      this.taskList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.taskList.push(y as Task); });
    });
  }

  getTimeSheets() {
    const usertoken = localStorage.getItem('id');
    const timesheets = this.empService.getData(usertoken);
    timesheets.snapshotChanges().subscribe(item => {
      this.timesheetsList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.timesheetsList.push(y as EmployeeView); });
    });
  }

  onEdit(timesheet: EmployeeView) {
    this.isSelected = timesheet.$key;
    this.empService.selectedTimesheet = Object.assign({}, timesheet);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this entry ?') === true) {
      this.empService.deleteTimesheet(key, localStorage.getItem('id'));
      this.toastr.warning('Timesheet Deleted!');
    }
  }

  onSubmit(timesheetForm: NgForm) {
    if (timesheetForm.value.$key == null) {
      this.empService.insertTimesheet(timesheetForm.value, this.userID, this.displayName);
      this.onReset(timesheetForm);
      this.toastr.success('Timesheet Added.');
    } else {
      this.empService.updateTimesheet(timesheetForm.value, this.userID);
      this.onReset(timesheetForm);
      this.isSelected = null;
      this.toastr.success('Timesheet Updated.');
    }
  }

  onReset(timesheetForm?: NgForm) {
    if (timesheetForm != null) {
      timesheetForm.reset();
      this.isSelected = null;
    }
    this.empService.selectedTimesheet = {
      $key: null,
      project: '',
      task: '',
      d: null,
      employee: '',
      year: '',
      month: '',
      day: '',
      week: '',
      time: ''
    };
  }
}
