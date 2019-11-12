import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Manager } from './manager.model';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  managerList: AngularFireList<any>;
  empList: Employee;
  selectedManager: Manager = new Manager();
  constructor(private db: AngularFireDatabase) { }

  getManagers() {
    const managerList$ = this.db.list('/Employees', ref => ref.orderByChild('role').equalTo('Manager')).snapshotChanges();
    return managerList$;
  }

  getManagerProjects() {
    const ManagerEmpProjList = this.db.list('/ManagerProjects/').snapshotChanges();
    return ManagerEmpProjList;
  }

  getManagerEmployees(key: string) {
    console.log(key);
    const mngrempsList = this.db.list('/ManagerEmployees/' + key).snapshotChanges();
    return mngrempsList;
  }

  insertManager(manager: Manager) {
    const pushRef = this.db.database.ref('ManagerProjects/').push({
      mgr_uid: manager.manager.uid,
      mgr_id: manager.manager.id,
      mgr_name: manager.manager.name,
      proj_id: manager.project.id,
      proj_name: manager.project.name,
      empCount: manager.employees.length
    });
    manager.employees.forEach(item => {
      this.empList = item;
      this.db.database.ref('ManagerEmployees/' + pushRef.key + '/').update({
        [this.empList.id]: {
            id: this.empList.id,
            name: this.empList.name,
            uid: this.empList.uid,
            proj_name: manager.project.name
          }
      });
      this.db.database.ref('Employees/' + this.empList.id + '/projects/').update({
        [manager.project.id]: {
          id: manager.project.id,
          name: manager.project.name
        }
      });
    });
  }

  updateManager(manager: Manager) {
    this.db.database.ref('ManagerProjEmps/' + manager.$key).update({
      mgr_uid: manager.manager.uid,
      mgr_id: manager.manager.id,
      mgr_name: manager.manager.name,
      proj_id: manager.project.id,
      proj_name: manager.project.name
    });
    manager.employees.forEach(item => {
      this.empList = item;
      this.db.database.ref('ManagerProjEmps/' + manager.$key + '/' + 'employees/').update({
        [this.empList.id]: {
            id: this.empList.id,
            name: this.empList.name,
            uid: this.empList.uid,
          }
      });
    });
  }

  deleteRecord($key: string) {
    const pathRef1 = this.db.database.ref('ManagerProjects/');
    pathRef1.child($key).ref.remove();

    const pathRef2 = this.db.database.ref('ManagerEmployees/');
    pathRef2.child($key).ref.remove();
  }
}
