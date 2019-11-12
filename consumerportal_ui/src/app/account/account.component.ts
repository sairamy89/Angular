import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MustMatch } from './../directives/must-match.validator';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  login = true;
  register = false;
  forgotpwd = false;

  loginfrm = {
    userid: '',
    password: '',
    captcha: ''
  };

  signupfrm = {
    consumerNumber: '',
    mobile: '',
    email: '',
    userid: '',
    password: '',
    cnfrmpassword: ''
  };

  forgotfrm = {
    email: '',
    mobile: '',
    newpassword: ''
  };

  constructor(private router: Router) { }

  ngOnInit() { }

  toggleLoginForm() {
    this.register = false;
    this.forgotpwd = false;
    this.login = !this.register;
  }

  toggleRegisterForm() {
    this.login = false;
    this.forgotpwd = false;
    this.register = !this.login;
  }

  toggleForgotForm() {
    this.login = false;
    this.register = false;
    this.forgotpwd = !this.login;
  }

  signInwithUserID() {
    if(this.loginfrm.userid === 'esya' && this.loginfrm.password === 'esya@123' ) {
      this.router.navigate(['dashboard']);
    }
  }

  // resolved(captchaResponse: string) {
  //   console.log(`Resolved captcha with response: ${captchaResponse}`);
  // }

}
