import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDetails: firebase.User = null;
  private user: Observable<firebase.User>;
  private $key: string;
  private role: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          // console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInRegular(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpRegular(email, password) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  insertIntoUsersAndEmployees(uid, email, displayname, isActive: boolean) {
    this.db.database.ref('Users/' + uid).set({
      uid: uid,
      name: displayname,
      email: email,
      isActive: isActive
    });
    this.db.list('/Employees', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().subscribe(item => {
      item.forEach(element => {
        this.$key = element.payload.key;
        this.role = element.payload.toJSON()['role'];
        this.db.database.ref('Employees/' + this.$key).update({
          uid: uid,
          isActive: isActive
        });
        this.db.database.ref('Users/' + uid).update({
          empID: this.$key,
          role: this.role
        });
      });
    });
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('empID');
    localStorage.removeItem('_e');
    this.firebaseAuth.auth.signOut()
    .then((result) => this.router.navigate(['/']));
  }

  hasToken() {
    return !!localStorage.getItem('token');
  }
}
