import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { tap, map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InschrijvingService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/inschrijving', http);
  }


  register$(inschrijving: InschrijvingItem) {
    return this.http.post<string>(environment.baseUrl + '/inschrijving/register', inschrijving)
      .pipe(
        retry(3),
        map(response => {
          return response;
        }),
        tap({ // Log the result or error
          next: data => console.log('Received: ', data),
          error: error => console.log('Oeps: ', error)
        }),
        catchError(this.errorHandler)
      );
  }
}
/***************************************************************************************************
/
/***************************************************************************************************/
export class InschrijvingItem {
  Id?: number = 0;
  Agenda_Id?: number = 0;
  Email?: string = '';
  Naam?: string = '';
}
