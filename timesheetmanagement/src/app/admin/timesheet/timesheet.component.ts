import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Timesheet } from './../shared/timesheet.model';
import { TimesheetService } from './../shared/timesheet.service';
import { Project } from './../shared/project.model';
import { ProjectService } from './../shared/project.service';
import { TaskService } from './../shared/task.service';
import { AuthService } from './../../services/auth.service';
import { Task } from './../shared/task.model';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter} /*{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}*/]
})
export class TimesheetComponent implements OnInit {
  timesheetsList: Timesheet[];
  projectList: Project[];
  taskList: Task[];
  selectedTimesheet: Timesheet = new Timesheet();
  displayName: string;
  term: string;
  isSelected: string;
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
  model = {
      approved: false,
      declined: false
    };

  constructor(public timeshtService: TimesheetService, private toastr: ToastrService, private projectService: ProjectService,
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

  getTimeSheets() {
    const usertoken = localStorage.getItem('id');
    const timesheets = this.timeshtService.getData(usertoken);
    timesheets.snapshotChanges().subscribe(item => {
      this.timesheetsList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.timesheetsList.push(y as Timesheet); });
    });
  }

  getProjects() {
    const projects = this.projectService.getData('E',  localStorage.getItem('_e'));
    projects.snapshotChanges().subscribe(item => {
      this.projectList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
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

  onEdit(timesheet: Timesheet) {
    this.isSelected = timesheet.$key;
    this.timeshtService.selectedTimesheet = Object.assign({}, timesheet);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this entry ?') === true) {
      this.timeshtService.deleteTimesheet(key, localStorage.getItem('id'));
      this.toastr.warning('Timesheet Deleted!');
    }
  }

  onSubmit(timesheetForm: NgForm) {
    if (timesheetForm.value.$key == null) {
      this.timeshtService.insertTimesheet(timesheetForm.value, this.userID, this.displayName);
      this.onReset(timesheetForm);
      this.toastr.success('Timesheet Added.');
    } else {
      this.timeshtService.updateTimesheet(timesheetForm.value, this.userID);
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
    this.timeshtService.selectedTimesheet = {
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
