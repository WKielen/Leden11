import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dictionary } from '../shared/modules/Dictionary';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/action', http);
  }

  /***************************************************************************************************
  / Get all actions in the future
  /***************************************************************************************************/
  nextWeek$(): Observable<Array<ActionItem>> {
    return this.http.get(environment.baseUrl + '/action/komendeweek') //getallfromnow
      .pipe(
        retry(3),
        tap( // Log the result or error
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
        map(function (value) {
          this.localdata = value;
          this.localdata.forEach(element => {

          });
          return this.localdata;
        })
      );
  }
}


export class ActionItem {
  Id?: string = '';
  StartDate?: string = '';
  TargetDate?: string = '';
  EndDate?: string = '';
  Title?: string = '';
  Description?: string = '';
  HolderName?: string = '';
  Status?: string = '';

}
