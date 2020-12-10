import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/action', http);
  }

  GetSome() {
    let list:Array<ActionItem> = [];
    let x = new ActionItem();
    x.StartDate = '2020-12-01';
    x.TargetDate = '2020-12-02';
    x.HolderName = 'Wim';
    x.Title = 'Action1';
    x.Finished = "0";
    x.Description = 'Beschrijving 1'
    list.push(x);
    x.Title = 'Action2';
    x.TargetDate = '2020-12-03';
    x.Description = 'Beschrijving 2';
    list.push(x);
    x.Title = 'Action3';
    x.TargetDate = '2020-12-04';
    x.Description = 'Beschrijving 3';
    list.push(x);
    return list;
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
  Finished?: string = '';

}
