import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Task } from './task.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: AngularFireList<any>;
  customKey: string;
  selectedTask: Task = new Task();

  constructor(private db: AngularFireDatabase) { }

  generateCustomKey() {
    // this.customKey = 'TSK' +  Math.random().toString(36).substr(2, 9);
    this.customKey = 'TSK' + Math.floor(Date.now() / 1000);
    // console.log(customKey);
    return this.customKey.toString();
  }

  getData() {
    this.taskList = this.db.list('Tasks');
    return this.taskList;
  }

  /*insertTask(task: Task) {
    this.generateCustomKey();
    this.taskList.push({
      id: this.customKey,
      name: task.name,
      project: task.project
    });
  }*/

  insertTask(task: Task) {
    this.generateCustomKey();
    this.db.database.ref('Tasks/' + this.customKey).set({
      id: this.customKey,
      task: task.task
      /*project: task.project,
      employee: task.employee*/
    });
  }

  updateTask(task: Task) {
    this.taskList.update(task.$key,
      { task: task.task,
        /* project: task.project,
        employee: task.employee */
      });
  }

  deleteTask($key: string) {
    this.taskList.remove($key);
  }
}
