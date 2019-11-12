import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Esya-TimeSheet';
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('Employees');
    this.item = this.itemRef.valueChanges();
  }
  AddID(newID: number) {
    this.itemRef.set({Doc: newID});
  }
  save(newName: string) {
    this.itemRef.set({ ID: 1, Name: newName });
  }
  Update(newSize: string) {
    this.itemRef.update({ size: newSize});
  }
  Delete() {
    const promise = this.itemRef.remove();
    promise
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'Something went wrong!'));
  }
}
