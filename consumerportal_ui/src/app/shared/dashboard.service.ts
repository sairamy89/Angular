import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ' + btoa('msedcl:esya@321')
    })
  };

  getHTReadingDetails(Cons_id: string, date: string) {
    return this.http.get('/api/dashboard/' + Cons_id + '/' + date, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getHTLoadProfileData(Cons_num: string, fdate: string, tdate: string) {
    return this.http.get('/api/dashboard/' + Cons_num + '/' + fdate + '/' + tdate, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getdashboardInfo(Cons_num: string, month: number) {
    return this.http.get('/api/dashboard/data/' + Cons_num + '/' + month, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getViewPayBillInfo(Cons_num: string) {
    return this.http.get('/api/dashboard/' + Cons_num, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // setConsumerProfileData(input) {
  //   this.data = input;
  // }

  // getData() {
  //   const temp = this.data;
  //   return temp;
  // }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ' + {error} + '\nMessage: ' + {error};
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
