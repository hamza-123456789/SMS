import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  baseUrl: any='https://localhost:44387'
  constructor(
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    
  ) { }
  postData(url: string, data: any): Observable<any> {
    this.spinner.show(); // Show the spinner before making the request

    return this.httpClient.post<any>(this.baseUrl+url, data).pipe(
      finalize(() => {
        this.spinner.hide(); // Hide the spinner after the request completes (success or error)
      })
    );
  }

  getData(url: string): Observable<any> {
    this.spinner.show(); // Show the spinner before making the request

    return this.httpClient.get<any>(this.baseUrl + url).pipe(
      finalize(() => {
        this.spinner.hide(); // Hide the spinner after the request completes (success or error)
      })
    );
  }

  deleteData(url: string): Observable<any> {
    this.spinner.show(); // Show the spinner before making the request

    return this.httpClient.delete<any>(this.baseUrl + url).pipe(
      finalize(() => {
        this.spinner.hide(); // Hide the spinner after the request completes (success or error)
      })
    );
  }
}




