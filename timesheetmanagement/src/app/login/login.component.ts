import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { TaskService } from '../admin/shared/task.service';
import { ToastrService } from 'ngx-toastr';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin = {
    email: '',
    password: ''
  };
  userSignUp = {
    displayname: '',
    email: '',
    password: ''
  };
  signUpError: string;
  signInError: string;
  emailError: string;
  emailSuccess: string;
  verifiedToggle1: boolean;
  verifiedToggle2: boolean;
  role: any;
  login = true;
  signup = false;
  errorToggle1 = false;
  errorToggle2 = false;
  errorToggle3 = false;
  errorToggle4 = false;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth,
              private db: AngularFireDatabase, private tstr: ToastrService) { }

  ngOnInit() {
  }

  toggleLoginForm() {
    this.signup = false;
    this.login = !this.signup;
  }

  toggleRegisterForm() {
    this.login = false;
    this.signup = !this.login;
  }

  getRoleAndRedirect(uid: string) {
    this.db.list('Users/', ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges().subscribe(item => {
      item.forEach(itemRef => {
        this.role = itemRef.payload.toJSON()['role'];
        const name = itemRef.payload.toJSON()['name'];
        const _e = itemRef.payload.toJSON()['empID'];
        if (this.role === 'Admin' && uid === 'Wda2iOIzPWW6Ye6D0LsM79t8GaI2') {
          localStorage.setItem('token', 'true');
          localStorage.setItem('id', uid);
          this.router.navigate(['cf0in00x']);
        } else if (this.role === 'Employee') {
          localStorage.setItem('token', 'true');
          localStorage.setItem('id', uid);
          localStorage.setItem('_e', _e);
          this.router.navigate(['dn5j0zffl']);
        } else if (this.role === 'Manager') {
          localStorage.setItem('token', 'true');
          localStorage.setItem('id', uid);
          localStorage.setItem('_e', _e);
          this.router.navigate(['mamcxf5l1he']);
        } else if (this.role === 'Executive') {
          localStorage.setItem('token', 'true');
          localStorage.setItem('id', uid);
          this.router.navigate(['fze6vqitdl001']);
        } else {
          this.router.navigate(['/']);
          this.tstr.info(name + ', Please check with Admin.', 'Role is not Assigned');
        }
      });
    });
  }

  checkEmailDomain(value: string, type: number) {
    if (type === 1) {
      const domain = value.split('@')[1];
      if (['esyasoft.com', 'gmail.com'].indexOf(domain) > -1) {
        this.errorToggle3 = false;
        this.verifiedToggle1 = true;
        this.emailSuccess = 'Correct';
      } else {
        this.verifiedToggle1 = false;
        this.errorToggle3 = true;
        this.emailError = 'Email should be esyasoft.com / gmail.com';
      }
    } else {
      const domain = value.split('@')[1];
      if (['esyasoft.com', 'gmail.com'].indexOf(domain) > -1) {
        this.errorToggle4 = false;
        this.verifiedToggle2 = true;
        this.emailSuccess = 'Correct';
      } else {
        this.verifiedToggle2 = false;
        this.errorToggle4 = true;
        this.emailError = 'Email should be esyasoft.com / gmail.com';
      }
    }
  }

  signInWithEmail() {
    this.authService.signInRegular(this.userLogin.email, this.userLogin.password)
    .then((result) => {
      /*const user = this.afAuth.auth.currentUser;
      console.log(user);*/
      if (result.user.emailVerified === false) {
          this.errorToggle1 = true;
          this.signInError = 'ERROR: Email is not Verified, We have sent verification mail, Please verify and try to login';
          result.user.sendEmailVerification();
      } else {
        this.getRoleAndRedirect(result.user.uid);
      }
    }) .catch((err) => {
      this.errorToggle1 = true;
        this.signInError = err;
    });
  }

  signUpWithEmail() {
    this.db.database.ref('Employees/').orderByChild('email').equalTo(this.userSignUp.email).once('value').then((snapshot) => {
      const isExist = snapshot.exists();
      // console.log(isExist);
      if (isExist !== false) {
          this.authService.signUpRegular(this.userSignUp.email, this.userSignUp.password).then((result) => {
          const user = this.afAuth.auth.currentUser;
          // console.log(user);
          user.sendEmailVerification().then((sent) => {
            this.tstr.success('Verification mail is sent to ' + this.userSignUp.email + '. Please Verify before Login.');
          }).catch((Error) => {
            console.log(Error);
          });
          result.user.updateProfile({
            displayName: this.userSignUp.displayname,
            photoURL: null
          }).then((res) => {
            this.authService.insertIntoUsersAndEmployees(result.user.uid, result.user.email, result.user.displayName, true);
          });
          this.router.navigate(['null']);
        }) .catch((err) => {
          this.errorToggle2 = true;
          this.signUpError = err;
        });
    } else {
      this.errorToggle2 = true;
      this.signUpError = 'Error: Please contact Admin to check your email ID is Proper or Not.';
    }
    }).catch((err) => {
      this.errorToggle2 = true;
      this.signUpError = err;
    });
  }
}
