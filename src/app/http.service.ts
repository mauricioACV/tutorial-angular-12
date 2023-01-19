import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getRequest(url: string): void {
    this.http.get(url).subscribe(response => {
      console.log(response);
    });
  }

  getRequestReusable(url: string): Observable<any> {
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  postRequest(url: string, data: any, option?: any): Observable<any> {
    return this.http.post(url, data, option).pipe(catchError(this.handleError));
  }

  updateRequest(url: string, data: any, option?: any): Observable<any> {
    return this.http.put(url, data, option).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error ocurred: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `Body was: ${error.error}`
      );
    }
    return throwError('Something bad happended; please try again later.');
  }
}
