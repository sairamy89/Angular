import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Timesheet } from './timesheet.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  timeSheetList: AngularFireList<any>;
  selectedTimesheet: Timesheet = new Timesheet();
  customKey: string;
  day: string;
  month: string;
  year: string;
  weekStartDT: string;
  weekEndDT: string;
  time: string;
  date: string;

  constructor(private db: AngularFireDatabase) { }

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
    this.timeSheetList = this.db.list('Timesheets/' + userId);
    return this.timeSheetList;
  }

  insertTimesheet(timeSheet: Timesheet, empId, empName) {
    this.generateCustomKey();
    this.getConvertedDate(timeSheet.d);
    this.db.database.ref('Timesheets/' + empId + '/' + this.customKey).update({
        employee: empName,
        year: this.year,
        month: this.month,
        week: this.weekStartDT + ' - ' + this.weekEndDT,
        day: this.day,
        d: timeSheet.d,
        task: timeSheet.task,
        project: timeSheet.project,
        time: timeSheet.time,
        formatedDate: this.date,
        formatedDate_project: this.date + '_' + timeSheet.project,
        approved: false,
        declined: false,
        comment: {
          isActive: false
        }
    });
  }

  updateTimesheet(timeSheet: Timesheet, empId) {
    this.getConvertedDate(timeSheet.d);
    this.db.database.ref('Timesheets/' + empId + '/' + timeSheet.$key).update({
      project: timeSheet.project,
      year: this.year,
      month: this.month,
      week: this.weekStartDT + ' - ' + this.weekEndDT,
      day: this.day,
      task: timeSheet.task,
      time: timeSheet.time,
      d: timeSheet.d,
      formatedDate: this.date,
      formatedDate_project: this.date + '_' + timeSheet.project,
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
