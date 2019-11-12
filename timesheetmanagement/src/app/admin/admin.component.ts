import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/employee.service';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [EmployeeService]
})
export class AdminComponent implements OnInit {
  displayName: string;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private employeeService: EmployeeService, private firebaseAuth: AngularFireAuth, public authService: AuthService) {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.displayName = this.userDetails.displayName;
          // console.log(this.userDetails);
          // console.log(this.displayName);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  ngOnInit() {
  }
}
