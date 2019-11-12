import { Injectable, Pipe } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeViewService } from './../shared/employee-view.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private router: Router, private authService: AuthService, private empViewService: EmployeeViewService) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else if (this.empViewService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
