import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../shared/manager.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import { Manager } from '../shared/manager.model';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProjectService } from './../shared/project.service';
import { EmployeeService } from './../shared/employee.service';
import { Project } from './../shared/project.model';
import { Employee } from './../shared/employee.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ManagerComponent implements OnInit {
  managerList: Manager[];
  mngrEmpList: Manager[];
  projectList: Project[];
  empList: Employee[];
  mgrProjEmpsList: Manager[];
  isSelected: string;
  term: string;
  constructor(public managerService: ManagerService, private toastr: ToastrService, private projectService: ProjectService,
              private empService: EmployeeService, config: NgbModalConfig, private modalService: NgbModal) {
                config.backdrop = 'static';
                config.keyboard = false;
  }

  ngOnInit() {
    this.onReset();
    this.getManagers();
    this.getProjects();
    this.getEmployees();
    this.getMngrProjects();
  }

  getMngrProjects() {
    this.managerService.getManagerProjects().subscribe(item => {
      this.mgrProjEmpsList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.mgrProjEmpsList.push(y as Manager);
      });
    });
  }

  getMngrEmployees(key: string, content: string) {
    this.managerService.getManagerEmployees(key).subscribe(item2 => {
      this.mngrEmpList = [];
      item2.forEach(element2 => {
        const x = element2.payload.toJSON();
        x['$key'] = element2.key;
        this.mngrEmpList.push(x as Manager);
      });
    });
    this.modalService.open(content);
  }

  getManagers() {
    this.managerService.getManagers().subscribe(item => {
      this.managerList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.managerList.push(y as Manager); });
    });
  }

  getProjects() {
    this.projectService.getData('MN', 'NO').snapshotChanges().subscribe(item => {
      this.projectList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.projectList.push(y as Project); });
    });
  }

  getEmployees() {
    this.empService.getData().snapshotChanges().subscribe(item => {
      this.empList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.empList.push(y as Employee); });
    });
  }

  onEdit(mngr: Manager) {
    console.log(mngr);
    this.managerService.selectedManager = Object.assign({}, mngr);
    console.log(this.managerService.selectedManager);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this entry ?') === true) {
      this.managerService.deleteRecord(key);
      this.toastr.warning('Manager Deleted!');
    }
  }

  onSubmit(managerForm: NgForm) {
    if (managerForm.value.$key == null) {
      this.managerService.insertManager(managerForm.value);
      this.onReset(managerForm);
      this.toastr.success('Registered Successfully');
    } else {
      this.managerService.updateManager(managerForm.value);
      this.onReset(managerForm);
      this.toastr.success('Updated..');
    }
  }

  onReset(managerForm?: NgForm) {
    if (managerForm != null) {
      managerForm.reset();
    }
    this.managerService.selectedManager = {
      $key: null,
      id: '',
      name: '',
      employees: [],
      project: {
        id: '',
        name: ''
      },
      manager: {
        id: '',
        uid: '',
        name: ''
      }
    };
  }

}
