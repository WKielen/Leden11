import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { tap, map, retry, catchError } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})

export class UserService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/user', http);
  }


  register$(credentials: UserItem) {
    credentials.Password = <string>Md5.hashStr(credentials.Password);
    return this.http.post<string>(environment.baseUrl + '/user/register', credentials)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.errorHandler)
      );
  }

  storeNewPassword$(credentials: UserItem) {
    credentials.ProposedPassword = <string>Md5.hashStr(credentials.ProposedPassword);
    return this.http.post<string>(environment.baseUrl + '/user/storenewpassword', credentials)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this.errorHandler)
      );
  }

  /***************************************************************************************************
  / Returns email from user
  /***************************************************************************************************/
  readUserData$(Id: string) {
    return this.http.get(environment.baseUrl + "/user/get?Id=" + Id + "")
      .pipe(
        map(response => {
          return response;
        }),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
        catchError(this.errorHandler)
      );
  }

  delete$(userid) {
    return this.http.delete(this.url + '/Delete?Userid=' + '"' + userid + '"')
      .pipe(
        retry(3),
        tap(
          data => console.log('Deleted: ', data),
          error => console.log('Oeps: ', error)
        ),
        catchError(this.errorHandler)
      );
  }


}
/***************************************************************************************************
/
/***************************************************************************************************/
export class UserItem {
  Userid?: string = '';
  Password?: string = '';
  Email?: string = '';
  FirstName?: string = '';
  LastName?: string = '';
  Role?: string = '';
  ProposedPassword?: string = '';
  ChangePasswordToken?: string = '';
  Activated?: string = '';

  // public async setPwToHashPw(pw: string) {
  //   this.Password = await hashPasswordFunction(pw);
  // }
}

export const ACTIVATIONSTATUS = {
  NEW: '0',
  ACTIVATED: '1',
};
