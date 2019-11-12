import { Injectable } from '@angular/core';
import { ManagerView, EmpTimeSheets, ProjectView } from './manager-view.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ManagerViewService {
  selectedTimesheet: ManagerView = new ManagerView();
  employeeTimesheets: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getEmployeeTimesheets(mngrView: ManagerView) {
    const date = moment(mngrView.d).format('YYYY-MM-DD');
    console.log(date);
    const formatedDate_project = date + '_' + mngrView.employee.proj_name;
    console.log(formatedDate_project);
    this.employeeTimesheets = this.db.list('/Timesheets/' + mngrView.employee.uid + '/',
                                            ref => ref.orderByChild('formatedDate_project').equalTo(formatedDate_project));
    localStorage.setItem('empID', mngrView.employee.uid);
    return this.employeeTimesheets;
  }

  declineTimeSheet(tskey, empID) {
    this.db.database.ref('Timesheets/' + empID + '/' + tskey).update({
      approved: false,
      declined: true,
      comment: {
        isActive: true
      }
    });
  }

  addComment(tskey, empID, message) {
  this.db.database.ref('Timesheets/' + empID + '/' + tskey + '/comment').update({
      isActive: true,
      message: message
    });
  }

  approveTimesheet(tskey, empID) {
    this.db.database.ref('Timesheets/' + empID + '/' + tskey).update({
      approved: true,
      declined: false,
      comment: {
        isActive: false
      }
    });
  }
}
