import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  public data;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'access-control-allow-origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ' + btoa('msedcl:esya@321')
    })
  };

  getConsumer(Cons_num: string, month: number) {
    return this.http.get('/api/account/' + Cons_num + '/' + month, this.httpOptions).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  setConsumerProfileData(input) {
    this.data = input;
  }

  getData() {
    const temp = this.data;
    return temp;
  }

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
