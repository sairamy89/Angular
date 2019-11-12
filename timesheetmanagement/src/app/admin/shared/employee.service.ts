import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();
  empID: String;
  constructor(private firebase: AngularFireDatabase) { }

  generateCustomKey() {
    this.firebase.list('Employees/', ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().subscribe(items => {
      const id = items[0].key.substr(3, 4);
      if (Number(id) >= 99) {
        this.empID = 'EMP' + (Number(id) + 1);
        return this.empID;
      } else if (Number(id) >= 9) {
        this.empID = 'EMP0' + (Number(id) + 1);
        return this.empID;
      } else {
        this.empID = 'EMP00' + (Number(id) + 1);
        return this.empID;
      }
    });
  }

  getData() {
      this.employeeList = this.firebase.list('Employees');
      return this.employeeList;
  }

  getManagerEmployees(key: string) {
    console.log(key);
    const mngrempsList = this.firebase.list('/ManagerEmployees/' + key).snapshotChanges();
    return mngrempsList;
  }

  insertEmployee(employee: Employee) {
    this.generateCustomKey();
    this.firebase.database.ref('Employees/' + this.empID).set({
      id: this.empID,
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      designation: employee.designation,
      salary: employee.salary,
      manager: employee.manager,
      manageremail: employee.manageremail,
      role: employee.role,
      companyID: employee.companyID
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      designation: employee.designation,
      salary: employee.salary,
      manager: employee.manager,
      manageremail: employee.manageremail,
      role: employee.role,
      companyID: employee.companyID
    });
    this.firebase.database.ref('Users/' + employee.uid).update({
      role: employee.role,
      email: employee.email
    });
  }

  deleteEmployee($key: string) {
    this.employeeList.update($key, {
      isActive: false
    });
  }
}
