import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService extends DataService {

  constructor(
    http: HttpClient) {
    super(environment.baseUrl + '/website', http);
  }

  getRoles() {
    let roles: Array<Role> = [];
    roles.push({ 'Id': '0', 'DisplayValue': 'Bestuur', 'Code': 'BS' });
    roles.push({ 'Id': '1', 'DisplayValue': 'Jeugdcommissie', 'Code': 'JC' });
    roles.push({ 'Id': '2', 'DisplayValue': 'Trainer', 'Code': 'TR' });
    roles.push({ 'Id': '6', 'DisplayValue': 'Ledenadministratie', 'Code': 'LA' });
    roles.push({ 'Id': '7', 'DisplayValue': 'Penningmeester', 'Code': 'PM' });
    roles.push({ 'Id': '4', 'DisplayValue': 'Test pagina\'s', 'Code': 'TE' });
    roles.push({ 'Id': '5', 'DisplayValue': 'Admin', 'Code': 'AD' });
    return roles;
  }

  getPages() {
    let pages: Array<Page> = [];
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Gebruikersbeheer', 'DisplayOnRoles': 'TE', 'Url': 'registration' });
  }
}
export class Role {
  Id: string = '';
  DisplayValue: string = '';
  Code: string = '';
}

export class Page {
  Id: string = '';
  MenuDisplayValue: string = '';
  DisplayOnRoles: string = '';
  Url: string = '';
}
