import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeList: Employee[];
  isSelected: string;
  designations: Array<Object> = [
    {name: 'CEO', value: 'CEO'},
    {name: 'CTO', value: 'CTO'},
    {name: 'HRAdmin', value: 'HRAdmin'},
    {name: 'Finance', value: 'Finance'},
    {name: 'Operations', value: 'Operations'},
    {name: 'Project Manager', value: 'PM'},
    {name: 'Delivery Manager', value: 'DM'},
    {name: 'Team Lead', value: 'TL'},
    {name: 'Sr.Software Developer', value: 'SSD'},
    {name: 'Jr.Software Developer', value: 'JSD'},
    {name: 'Trainee Engineer', value: 'TE'},
    {name: 'Sr.Test Engineer', value: 'STE'},
    {name: 'Jr.Test Engineer', value: 'JTE'},
    {name: 'Tr.Test Engineer', value: 'TTE'},
    {name: 'Sales Team', value: 'ST'},
    {name: 'Marketing Team', value: 'MT'},
    {name: 'Customer Support Team', value: 'CST'},
    {name: 'Internship', value: 'INTERN'},
    {name: 'OfficeStaff', value: 'OFCSTF'} ];

  roles: Array<Object> = [
    {name: 'Admin', value: 'Admin'},
    {name: 'Manager', value: 'Manager'},
    {name: 'Employee', value: 'Employee'},
    {name: 'Executive', value: 'Executive'} ];
  term: string;
  emailError: string;
  emailSuccess: string;
  verifiedToggle: boolean;
  errorToggle = false;

  constructor(public employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.employeeService.getData();
    this.employeeService.generateCustomKey();
    this.getEmployees();
    this.onReset();
  }

  getEmployees() {
    const emp = this.employeeService.getData();
    emp.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.employeeList.push(y as Employee); });
    });
  }

  checkEmailDomain(value: string) {
      const domain = value.split('@')[1];
      if (['esyasoft.com', 'gmail.com'].indexOf(domain) > -1) {
        this.errorToggle = false;
        this.verifiedToggle = true;
        this.emailSuccess = 'Correct';
      } else {
        this.verifiedToggle = false;
        this.errorToggle = true;
        this.emailError = 'Mail Domian should be esyasoft/gmail.com.';
      }
  }

  onSubmit(employeeForm: NgForm) {
    if (employeeForm.value.$key == null) {
      this.employeeService.insertEmployee(employeeForm.value);
      this.onReset(employeeForm);
      this.toastr.success('Employee Added');
    } else {
      this.employeeService.updateEmployee(employeeForm.value);
      this.onReset(employeeForm);
      this.isSelected = null;
      this.toastr.success('Updated');
    }
  }

  onEdit(emp: Employee) {
    this.isSelected = emp.$key;
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this entry ?') === true) {
      this.employeeService.deleteEmployee(key);
      this.toastr.warning('Employee Deleted!');
    }
  }

  onReset(employeeForm?: NgForm) {
    if (employeeForm != null) {
      employeeForm.reset();
      this.isSelected = null;
    }
    this.employeeService.selectedEmployee = {
      $key: null,
      id: '',
      name: '',
      email: '',
      mobile: '',
      designation: '',
      salary: 0,
      manager: '',
      manageremail: '',
      role: '',
      companyID: '',
      uid: ''
    };
  }
}
