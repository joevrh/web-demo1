import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, retry, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AccessorService {

  constructor(private http: HttpClient) { }


  get(url: string){

    return this.http.get<any>(url)
      .pipe(
        //retry(1), // retry a failed request up to 3 times
        tap(
          data => {

          }
        )
      );
  }

  post(url: string,  data: any) {
    return this.http.post<any>(url, data)
      .pipe(
        //retry(1), // retry a failed request up to 3 times
      );
  }

  postWithHeader(url: string,  data: any, options: any) {
    return this.http.post<any>(url, data, options)
      .pipe(
        //retry(1), // retry a failed request up to 3 times
      );
  }

}
