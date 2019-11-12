import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { EmployeeView } from './employee-view.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeViewService {
  empViewList: AngularFireList<any>;
  selectedTimesheet: EmployeeView = new EmployeeView();
  customKey: string;
  day: string;
  month: string;
  year: string;
  weekStartDT: string;
  weekEndDT: string;
  time: string;
  date: string;

  constructor(private db: AngularFireDatabase) { }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  generateCustomKey() {
    this.customKey = 'TS' + Math.floor(Date.now() / 1000);
    return this.customKey.toString();
  }

  getConvertedDate(date: Date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'];
    this.date = moment(date).format('YYYY-MM-DD');
    this.day = days[moment(date).day()];
    this.year = moment(date).get('year').toString();
    this.month = months[moment(date).get('month')];
    this.weekStartDT = moment(date).startOf('week').format('YYYY-MM-DD');
    this.weekEndDT = moment(date).endOf('week').format('YYYY-MM-DD');
    this.time = moment(date).format('HH:MM:SS a');
    return [this.day, this.weekStartDT, this.weekEndDT, this.time, this.year, this.month, this.date];
  }

  getData(userId) {
    /* this.empViewList = this.db.list('/Timesheets', ref => ref.orderByChild('designation').equalTo('PM')).snapshotChanges();
    return this.empViewList;*/
    this.empViewList = this.db.list('Timesheets/' + userId);
    return this.empViewList;
  }

  insertTimesheet(empView: EmployeeView, empId, empName) {
    this.generateCustomKey();
    this.getConvertedDate(empView.d);
    this.db.database.ref('Timesheets/' + empId + '/' + this.customKey).update({
        employee: empName,
        year: this.year,
        month: this.month,
        week: this.weekStartDT + ' - ' + this.weekEndDT,
        day: this.day,
        d: empView.d,
        task: empView.task,
        project: empView.project,
        time: empView.time,
        formatedDate: this.date,
        formatedDate_project: this.date + '_' + empView.project,
        approved: false,
        declined: false,
        comment: {
          isActive: false
        }
    });
  }

  updateTimesheet(empView: EmployeeView, empId) {
    this.getConvertedDate(empView.d);
    this.db.database.ref('Timesheets/' + empId + '/' + empView.$key).update({
      project: empView.project,
      year: this.year,
      month: this.month,
      week: this.weekStartDT + ' - ' + this.weekEndDT,
      day: this.day,
      task: empView.task,
      time: empView.time,
      d: empView.d,
      formatedDate: this.date,
      formatedDate_project: this.date + '_' + empView.project,
      approved: false,
      declined: false,
      comment: {
        isActive: false
      }
    });
  }

  deleteTimesheet($key: string, empID) {
    const pathRef = this.db.database.ref('Timesheets/' + empID + '/');
    pathRef.child($key).ref.remove();
  }
}
