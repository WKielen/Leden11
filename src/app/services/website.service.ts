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
    roles.push({ 'Id': '0', 'DisplayValue': 'Bestuur', 'Code': ROLES.BESTUUR });
    roles.push({ 'Id': '1', 'DisplayValue': 'Jeugdcommissie', 'Code': ROLES.JC });
    roles.push({ 'Id': '2', 'DisplayValue': 'Trainer', 'Code': ROLES.TRAINER });
    roles.push({ 'Id': '6', 'DisplayValue': 'Ledenadministratie', 'Code': ROLES.LEDENADMIN });
    roles.push({ 'Id': '7', 'DisplayValue': 'Penningmeester', 'Code': ROLES.PENNINGMEESTER });
    roles.push({ 'Id': '4', 'DisplayValue': 'Test pagina\'s', 'Code': ROLES.TEST });
    roles.push({ 'Id': '5', 'DisplayValue': 'Admin', 'Code': ROLES.ADMIN });
    return roles;
  }

  getPages() {
    let pages: Array<Page> = [];
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Dashboard', 'DisplayOnRoles': '*', 'Url': ROUTE.dashboardPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Komende week', 'DisplayOnRoles': '*', 'Url': ROUTE.komendeweekPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Ledenlijst', 'DisplayOnRoles': PAGEROLES.ledenPageRoles.join(), 'Url': ROUTE.ledenPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Ledenbeheer', 'DisplayOnRoles': PAGEROLES.ledenmanagerPageRoles.join(), 'Url': ROUTE.ledenmanagerPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Mail', 'DisplayOnRoles': PAGEROLES.mailPageRoles.join(), 'Url': ROUTE.mailPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Agenda', 'DisplayOnRoles': PAGEROLES.agendaPageRoles.join(), 'Url': ROUTE.agendaPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Website', 'DisplayOnRoles': PAGEROLES.websitePageRoles.join(), 'Url': ROUTE.websitePageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Actielijst', 'DisplayOnRoles': PAGEROLES.todolistPageRoles.join(), 'Url': ROUTE.todolistPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Ladder', 'DisplayOnRoles': PAGEROLES.ladderPageRoles.join(), 'Url': ROUTE.ladderPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Multi Update', 'DisplayOnRoles': PAGEROLES.multiupdatePageRoles.join(), 'Url': ROUTE.multiupdatePageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Download', 'DisplayOnRoles': PAGEROLES.downloadPageRoles.join(), 'Url': ROUTE.downloadPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Contributie', 'DisplayOnRoles': PAGEROLES.contrbedragenPageRoles.join(), 'Url': ROUTE.contrbedragenPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Oud Leden', 'DisplayOnRoles': PAGEROLES.oudledenPageRoles.join(), 'Url': ROUTE.oudledenPageRoute });
    // pages.push({ 'Id': '0', 'MenuDisplayValue': 'Gebruikers', 'DisplayOnRoles': 'AD,BS', 'Url': 'users' });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Gebruikersbeheer', 'DisplayOnRoles': PAGEROLES.registrationPageRoles.join(), 'Url': ROUTE.registrationPageRoute});
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Sync NTTB', 'DisplayOnRoles': PAGEROLES.syncnttbPageRoles.join(), 'Url': ROUTE.syncnttbPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Deelname training', 'DisplayOnRoles': PAGEROLES.trainingdeelnamePageRoles.join(), 'Url': ROUTE.trainingdeelnamePageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Training overzicht', 'DisplayOnRoles': PAGEROLES.trainingdeelnamePageRoles.join(), 'Url': ROUTE.trainingoverzichtPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Trainingsgroepen', 'DisplayOnRoles': PAGEROLES.traininggroupsPageRoles.join(), 'Url': ROUTE.traininggroupPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Masterz spelregels', 'DisplayOnRoles': PAGEROLES.masterzPageRoles.join(), 'Url': ROUTE.masterzPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Test', 'DisplayOnRoles': PAGEROLES.testPageRoles.join(), 'Url': ROUTE.testPageRoute });
    pages.push({ 'Id': '0', 'MenuDisplayValue': 'Comp Admin', 'DisplayOnRoles': PAGEROLES.testPageRoles.join(), 'Url': ROUTE.compadminPageRoute });

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

export const ROLES = {
  BESTUUR: 'BS',
  JC: 'JC',
  TRAINER: 'TR',
  LEDENADMIN: 'LA',
  PENNINGMEESTER: 'PM',
  ADMIN: 'AD',
  TEST: 'TE',
};

export const PAGEROLES = {
  ledenPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC, ROLES.TRAINER],
  ledenmanagerPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.LEDENADMIN],
  mailPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
  agendaPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
  websitePageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
  multiupdatePageRoles: [ROLES.ADMIN, ROLES.PENNINGMEESTER, ROLES.LEDENADMIN],
  downloadPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
  oudledenPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.LEDENADMIN],
  contrbedragenPageRoles: [ROLES.ADMIN, ROLES.PENNINGMEESTER],
  // usersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],
  ladderPageRoles: [ROLES.ADMIN, ROLES.JC],
  syncnttbPageRoles: [ROLES.ADMIN, ROLES.LEDENADMIN],
  testPageRoles: [ROLES.TEST],
  trainingdeelnamePageRoles: [ROLES.TRAINER, ROLES.JC, ROLES.ADMIN, ROLES.BESTUUR,],
  masterzPageRoles: [ROLES.TRAINER, ROLES.JC, ROLES.ADMIN, ROLES.BESTUUR,],
  todolistPageRoles: [ROLES.TEST],
  registrationPageRoles: [ROLES.ADMIN],
  traininggroupsPageRoles: [ROLES.TRAINER, ROLES.JC, ROLES.ADMIN]
};

export const ROUTE = {
  dashboardPageRoute: 'dashboard',
  komendeweekPageRoute: 'komendeweek',
  ledenPageRoute: 'leden',
  ledenmanagerPageRoute: 'ledenmanager',
  mailPageRoute: 'mail',
  agendaPageRoute: 'agenda',
  // agendaManagerPageRoute: 'agendamanager',
  websitePageRoute: 'website',
  multiupdatePageRoute: 'multiupdate',
  downloadPageRoute: 'download',
  oudledenPageRoute: 'oudleden',
  contrbedragenPageRoute: 'contrbedragen',
  // usersPageRoute: 'users',
  ladderPageRoute: 'ladder',
  syncnttbPageRoute: 'syncnttb',
  testPageRoute: 'test',
  trainingdeelnamePageRoute: 'trainingdeelname',
  trainingoverzichtPageRoute: 'trainingoverzicht',
  offlinePageRoute: 'offline',
  notAllowedPageRoute: 'notallowed',
  loginPageRoute: 'login',
  masterzPageRoute: 'masterz',
  compadminPageRoute: 'compadmin',
  todolistPageRoute: 'todo',
  registrationPageRoute: 'registration',
  traininggroupPageRoute: 'traininggroups',
};
