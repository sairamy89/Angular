import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import { ProjectService } from '../shared/project.service';
// import { Project } from '../shared/project.model';
// import { Employee } from '../shared/employee.model';
// import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // projects: Project[];
  // employees: Employee[];
  term: string;
  taskList: Task[];
  isSelected: string;
  constructor(public taskService: TaskService, private toastr: ToastrService) { }

  ngOnInit() {
    /* const prjct = this.projectService.getData();
    prjct.snapshotChanges().subscribe(item => {
      this.projects = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.projects.push(y as Project); });
    });

    const employs = this.employeeService.getData();
    employs.snapshotChanges().subscribe(item => {
      this.employees = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.employees.push(y as Employee); });
    }); */

    // this.taskService.getData();
    this.getTasks();
    this.onReset();
  }

  getTasks() {
    const tsks = this.taskService.getData();
    tsks.snapshotChanges().subscribe(item => {
      this.taskList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.taskList.push(y as Task); });
    });
  }

  onEdit(tsks: Task) {
    this.isSelected = tsks.$key;
    this.taskService.selectedTask = Object.assign({}, tsks);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this entry ?') === true) {
      this.taskService.deleteTask(key);
      this.toastr.warning('Task Deleted!');
    }
  }

  onSubmit(taskForm: NgForm) {
    if (taskForm.value.$key == null) {
      this.taskService.insertTask(taskForm.value);
      this.onReset(taskForm);
      this.toastr.success('Task Added');
    } else {
      this.taskService.updateTask(taskForm.value);
      this.onReset(taskForm);
      this.isSelected = null;
      this.toastr.success('Task Updated');
    }
  }

  onReset(taskForm?: NgForm) {
    if (taskForm != null) {
      taskForm.reset();
      this.isSelected = null;
    }
    this.taskService.selectedTask = {
      $key: null,
      id: '',
      task: ''
      /* project: '',
      employee: '' */
    };
  }

}
