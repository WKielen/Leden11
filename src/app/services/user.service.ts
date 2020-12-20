import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { tap, map, retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class UserService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/user', http);
  }


  register$(credentials) {
    return this.http.post<string>(environment.baseUrl + '/user/register', credentials)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.errorHandler)
      );
  }





}
/***************************************************************************************************
/ 
/***************************************************************************************************/
export class UserItem {
  Id?: string = '';
  Datum?: string = '';
  Tijd?: string = '';
  EvenementNaam?: string = '';
  Lokatie?: string = '';
  Type?: string = '';
  DoelGroep?: string = '';
  Toelichting?: string = '';
  Inschrijven?: string = '';
  Inschrijfgeld?: string = '';
  BetaalMethode?: string = '';
  ContactPersoon?: string = '';
  Vervoer?: string = '';
  VerzamelAfspraak?: string = '';
  Extra1?: string = '';
  Extra2?: string = '';
}

