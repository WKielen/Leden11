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
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Dashboard', 'DisplayOnRoles': '*', 'Url': 'dashboard' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Komende week', 'DisplayOnRoles': '*', 'Url': 'komendeweek' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Ledenlijst', 'DisplayOnRoles': 'AD,BS,JC,TR', 'Url': 'leden' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Ledenbeheer', 'DisplayOnRoles': 'AD,BS,LA', 'Url': 'ledenmanager' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Mail', 'DisplayOnRoles': 'AD,BS,JC', 'Url': 'mail' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Agenda', 'DisplayOnRoles': 'AD,BS,JC', 'Url': 'agenda' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Website', 'DisplayOnRoles': 'AD,BS,JC', 'Url': 'website' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Actielijst', 'DisplayOnRoles': 'TE', 'Url': 'todo' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Ladder', 'DisplayOnRoles': 'AD,JC', 'Url': 'ladder' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Multi Update', 'DisplayOnRoles': 'AD,PM,LA', 'Url': 'multiupdate' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Download', 'DisplayOnRoles': 'AD,BS,JC', 'Url': 'download' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Contributie', 'DisplayOnRoles': 'AD,PM', 'Url': 'contrbedragen' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Oud Leden', 'DisplayOnRoles': 'AD,BS,LA', 'Url': 'oudleden' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Gebruikers', 'DisplayOnRoles': 'AD,BS', 'Url': 'users' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Gebruikers beheer', 'DisplayOnRoles': 'TE', 'Url': 'registration' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Sync NTTB', 'DisplayOnRoles': 'AD,LA', 'Url': 'syncnttb' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Deelname training', 'DisplayOnRoles': 'TR,JC,AD,BS', 'Url': 'trainingdeelname' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Training overzicht', 'DisplayOnRoles': 'TR,JC,AD,BS', 'Url': 'trainingoverzicht' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Masterz spelregels', 'DisplayOnRoles': 'TR,JC,AD,BS', 'Url': 'masterz' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Test', 'DisplayOnRoles': 'TE', 'Url': 'test' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Comp Admin', 'DisplayOnRoles': 'TE', 'Url': 'compadmin' });

    return pages;
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
