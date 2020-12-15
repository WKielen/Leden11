import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  GetSome() {

    let actions: Dictionary = new Dictionary([]);


    let list:Array<ActionItem> = [];
    let x = new ActionItem();
    x.Id = "1";
    x.StartDate = '2020-12-01';
    x.TargetDate = '2020-12-02';
    x.HolderName = 'Wim';
    x.Title = 'Action1';
    x.Status = "0";
    x.Description = 'Beschrijving 1'
    actions.add(x.Id, x);
    list.push(x);

    x = new ActionItem();
    x.Id = "2";
    x.Title = 'Action2';
    x.StartDate = '2020-12-01';
    x.HolderName = 'Wim';
    x.TargetDate = '2020-12-03';
    x.Description = 'Beschrijving 2\nTweede regel';
    x.Status = "0";
    list.push(x);
    actions.add(x.Id, x);

    x = new ActionItem();
    x.Id = "3";
    x.Title = 'Action3';
    x.StartDate = '2020-12-01';
    x.TargetDate = '2020-12-04';
    x.Description = 'Beschrijving 3';
    x.HolderName = 'Kees';
    x.Status = "2";
    list.push(x);
    actions.add(x.Id, x);

    x = new ActionItem();
    x.Id = "4";
    x.Title = 'Action4';
    x.StartDate = '2020-12-01';
    x.TargetDate = '2020-12-04';
    x.Description = 'Beschrijving 3';
    x.HolderName = 'Piet';
    x.EndDate = '2020-12-01';
    x.Status = "1";

    list.push(x);
    actions.add(x.Id, x);

    x = new ActionItem();
    x.Id = "5";
    x.Title = 'Action5';
    x.StartDate = '2020-12-01';
    x.TargetDate = '2020-12-04';
    x.Description = 'Beschrijving 3';
    x.HolderName = 'Wim';
    x.EndDate = '2020-12-01';
    x.Status = "1";

    list.push(x);
    actions.add(x.Id, x);

    x = new ActionItem();
    x.Id = "6";
    x.Title = 'Action6';
    x.StartDate = '2020-12-01';
    x.TargetDate = '2020-12-04';
    x.Description = 'Beschrijving 3';
    x.HolderName = 'Piet';
    x.EndDate = '2020-12-01';
    x.Status = "0";

    list.push(x);
    actions.add(x.Id, x);

    return actions;
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
