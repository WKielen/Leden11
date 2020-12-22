import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './my-pages/dashboard/dashboard.component';
import { LedenComponent } from './my-pages/leden/leden.component';
import { LedenManagerComponent } from './my-pages/ledenmanager/ledenmanager.component';
import { AgendaComponent } from './my-pages/agenda/agenda.component';
import { UsersComponent } from './my-pages/users/users.component';
import { OudLedenComponent } from './my-pages/oud-leden/oud-leden.component';
import { DownloadComponent } from './my-pages/download/download.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { OfflineComponent } from './app-nav/offline/offline.component';
import { MultiUpdateComponent } from './my-pages/multi-update/multi-update.component';
import { ContrBedragenComponent } from './my-pages/contr-bedragen/contr-bedragen.component';
import { WebsiteComponent } from './my-pages/website/website.component';
import { LadderComponent } from './my-pages/ladder/ladder.component';
import { PAGEROLES, ROUTE } from 'src/app/shared/classes/Page-Role-Variables';
import { SyncNttbComponent } from './my-pages/syncnttb/syncnttb.component';
import { TrainingDeelnameComponent } from './my-pages/trainingdeelname/trainingdeelname.component';
import { TrainingOverzichtComponent } from './my-pages/trainingoverzicht/trainingoverzicht.component';
import { DefaultComponent } from './app-nav/default/default.component';
import { NotallowedComponent } from './app-nav/notallowed/notallowed.component';
import { LoginComponent } from './app-nav/login/login.component';
import { MasterzComponent } from './my-pages/masterz/masterz.component';
import { KomendeWeekComponent } from './my-pages/komendeweek/komendeweek.component';
import { TodolistComponent } from './my-pages/todolist/todolist.component';
import { RegistrationComponent } from './app-nav/registration/registration.component';

const routes: Routes = [
  { path: ROUTE.loginPageRoute, component: LoginComponent },
  { path: ROUTE.offlinePageRoute, component: OfflineComponent },
  {
    path: '',
    component: DefaultComponent,canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent},
      { path: ROUTE.notAllowedPageRoute, component: NotallowedComponent  },
      { path: ROUTE.komendeweekPageRoute, component: KomendeWeekComponent, canActivate: [AuthGuard] },
      { path: ROUTE.dashboardPageRoute, component: DashboardComponent, canActivate: [AuthGuard] },
      { path: ROUTE.ledenPageRoute, component: LedenComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.ledenPageRoles } },
      { path: ROUTE.ledenmanagerPageRoute, component: LedenManagerComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.ledenmanagerPageRoles } },
      { path: ROUTE.agendaPageRoute, component: AgendaComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.agendaPageRoles } },
      { path: ROUTE.websitePageRoute, component: WebsiteComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.websitePageRoles } },
      { path: ROUTE.multiupdatePageRoute, component: MultiUpdateComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.multiupdatePageRoles } },
      { path: ROUTE.downloadPageRoute, component: DownloadComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.downloadPageRoles } },
      { path: ROUTE.oudledenPageRoute, component: OudLedenComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.oudledenPageRoles } },
      { path: ROUTE.contrbedragenPageRoute, component: ContrBedragenComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.contrbedragenPageRoles } },
      { path: ROUTE.usersPageRoute, component: UsersComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.usersPageRoles } },
      { path: ROUTE.ladderPageRoute, component: LadderComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.ladderPageRoles } },
      { path: ROUTE.syncnttbPageRoute, component: SyncNttbComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.syncnttbPageRoles } },
      { path: ROUTE.trainingdeelnamePageRoute, component: TrainingDeelnameComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.trainingdeelnamePageRoles } },
      { path: ROUTE.trainingoverzichtPageRoute, component: TrainingOverzichtComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.trainingdeelnamePageRoles } },
      { path: ROUTE.masterzPageRoute, component: MasterzComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.masterzPageRoles } },
      { path: ROUTE.todolistPageRoute, component: TodolistComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.todolistPageRoles } },
      { path: ROUTE.registrationPageRoute, component: RegistrationComponent, canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.registrationPageRoles } },
      { path: ROUTE.mailPageRoute, loadChildren: () => import('./my-pages/mail/module').then(m => m.Module), canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.mailPageRoles } },
      { path: ROUTE.testPageRoute, loadChildren: () => import('./my-pages/test/module').then(m => m.Module), canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.testPageRoles } },
      { path: ROUTE.compadminPageRoute, loadChildren: () => import('./my-pages/comp-admin/module').then(m => m.Module), canActivate: [AuthGuard, AdminAuthGuard], data: { roles: PAGEROLES.testPageRoles } },
      { path: '**', component: DashboardComponent, canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  // declarations: [OfflineComponent],
})

export class AppRoutingModule { }
