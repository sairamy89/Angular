import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectList: AngularFireList<any>;
  selectedProject: Project = new Project();
  customKey: string;

  constructor(private db: AngularFireDatabase) { }

  generateCustomKey() {
    this.db.list('Projects/', ref => ref.orderByChild('id').limitToLast(1)).snapshotChanges().subscribe(items => {
      const id = items[0].key.substr(3, 4);
      if (Number(id) >= 99) {
        this.customKey = 'PR' + (Number(id) + 1);
        return this.customKey;
      } else if (Number(id) >= 9) {
        this.customKey = 'PR0' + (Number(id) + 1);
        return this.customKey;
      } else {
        this.customKey = 'PR00' + (Number(id) + 1);
        return this.customKey;
      }
    });
  }

  getData(flag: any, key: string) {
    if (flag === 'M') {
      this.projectList = this.db.list('ManagerProjects', ref => ref.orderByChild('mgr_uid').equalTo(key));
      return this.projectList;
    } else if (flag === 'E') {
      this.projectList = this.db.list('Employees/' + key + '/projects/');
      return this.projectList;
    } else {
      this.projectList = this.db.list('Projects');
      return this.projectList;
    }
  }

  insertProject(project: Project) {
    this.generateCustomKey();
    console.log(this.customKey);
    this.db.database.ref('Projects/' + this.customKey).set({
      id: this.customKey,
      name: project.name,
      category: project.category
    });
  }

  updateProject(project: Project) {
    this.projectList.update(project.$key,
      { name: project.name,
        category: project.category
      });
  }

  deleteProject($key: string) {
    this.projectList.remove($key);
  }
}
