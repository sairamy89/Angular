import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectList: Project[];
  isSelected: string;
  term: string;
  categories: Array<Object> = [
    {name: 'Capital-Expenses', value: 'Cap-Ex'},
    {name: 'Operational-Expenses', value: 'Op-Ex'}
  ];

  constructor(public projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit() {
    // this.projectService.getData();
    this.projectService.generateCustomKey();
    this.getProjects();
    this.onReset();
  }

  getProjects() {
    const prjct = this.projectService.getData('P', 'NO');
    prjct.snapshotChanges().subscribe(item => {
      this.projectList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.projectList.push(y as Project); });
    });
  }

  onEdit(prjct: Project) {
    this.isSelected = prjct.$key;
    this.projectService.selectedProject = Object.assign({}, prjct);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this entry ?') === true) {
      this.projectService.deleteProject(key);
      this.toastr.warning('Project Deleted!');
    }
  }

  onSubmit(projectForm: NgForm) {
    if (projectForm.value.$key == null) {
      this.projectService.insertProject(projectForm.value);
      this.onReset(projectForm);
      this.toastr.success('Registered Successfully');
    } else {
      this.projectService.updateProject(projectForm.value);
      this.onReset(projectForm);
      this.isSelected = null;
      this.toastr.success('Updated..');
    }
  }

  onReset(projectForm?: NgForm) {
    if (projectForm != null) {
      projectForm.reset();
      this.isSelected = null;
    }
    this.projectService.selectedProject = {
      $key: null,
      name: '',
      category: ''
    };
  }
}
