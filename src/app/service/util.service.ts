import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd/message";

declare var HOST: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  //WS_URL = 'http://localhost:11000/';
  WS_URL = HOST;
  JWT_TTL = 360; //6 hour
  CACHE_TTL = 10; // 10 min
  LONG_CACHE_TTL = 60//1 hour

  constructor() {
  }

  buttonPermission = new Array<string>(0);

  // exchangeApiUrl = window.EXCHANGE_API_URL;

  addHttpParam(params: HttpParams, key: string, value: any): HttpParams {
    if (value == null || String(value) === '') {
      return params;
    }
    return params.set(key, String(value));
  }

  addHttpHeader(headers: HttpHeaders, key: string, value: any): HttpHeaders {
    if (value == null || String(value) === '') {
      return headers;
    }
    return headers.set(key, String(value));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };



}
