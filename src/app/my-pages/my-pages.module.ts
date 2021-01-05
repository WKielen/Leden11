import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedenComponent } from './../my-pages/leden/leden.component';
import { LedenManagerComponent } from './../my-pages/ledenmanager/ledenmanager.component';
import { AgendaComponent } from './../my-pages/agenda/agenda.component';
import { WebsiteComponent } from './../my-pages/website/website.component';
import { LadderComponent } from './../my-pages/ladder/ladder.component';
import { MultiUpdateComponent } from './../my-pages/multi-update/multi-update.component';
import { DownloadComponent } from './../my-pages/download/download.component';
import { ContrBedragenComponent } from './../my-pages/contr-bedragen/contr-bedragen.component';
import { OudLedenComponent } from './../my-pages/oud-leden/oud-leden.component';
import { UsersComponent } from './../my-pages/users/users.component';
import { SyncNttbComponent } from './../my-pages/syncnttb/syncnttb.component';
import { TrainingDeelnameComponent } from './../my-pages/trainingdeelname/trainingdeelname.component';
import { TrainingOverzichtComponent } from './../my-pages/trainingoverzicht/trainingoverzicht.component';

import { AgendaDialogComponent } from './../my-pages/agenda/agenda.dialog';
import { AgendaDetailDialogComponent } from './../my-pages/agenda/agenda.detail.dialog';
import { LedenDialogComponent } from './../my-pages/ledenmanager/ledenmanager.dialog';
import { LedenDeleteDialogComponent } from './../my-pages/ledenmanager/ledendelete.dialog';
import { MailDialogComponent } from './../my-pages/mail/mail.dialog';
import { SingleMailDialogComponent } from './../my-pages/mail/singlemail.dialog';
import { TrainingOverzichtDialogComponent } from './../my-pages/trainingoverzicht/trainingoverzicht.dialog';
import { WebsiteDialogComponent } from './../my-pages/website/website.dialog';

import { CustomMaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighGraphsModule } from '../shared/widgets/graphs.module';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import listPlugin from '@fullcalendar/list';

import { FullCalendarModule } from '@fullcalendar/angular';
import { MasterzComponent } from './masterz/masterz.component';
import { KomendeWeekComponent } from './komendeweek/komendeweek.component'; // the main connector. must go first
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularIbanModule } from 'angular-iban';
import { SharedComponentsModule } from '../shared/components/component.module';
import { HoldableModule } from '../shared/directives/directives.module';
import { TodolistComponent } from './todolist/todolist.component';
import { TodoListDetailDialogComponent } from './todolist/todolist.detail.dialog';
import { TodoListDialogComponent } from './todolist/todolist.dialog';
import { DecisionDialogComponent } from './todolist/decision.dialog';
import { TrainingGroupsComponent } from './trainingsgroep/trainingsgroep.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);


@NgModule({
  declarations: [
    DashboardComponent,
    LedenComponent,
    LedenManagerComponent,
    AgendaComponent,
    AgendaDialogComponent,
    AgendaDetailDialogComponent,
    WebsiteComponent,
    LadderComponent,
    MultiUpdateComponent,
    DownloadComponent,
    ContrBedragenComponent,
    OudLedenComponent,
    UsersComponent,
    SyncNttbComponent,
    TrainingDeelnameComponent,
    TrainingOverzichtComponent,

    LedenDialogComponent,
    LedenDeleteDialogComponent,
    MailDialogComponent,
    SingleMailDialogComponent,
    TrainingOverzichtDialogComponent,
    WebsiteDialogComponent,
    DecisionDialogComponent,

    MasterzComponent,
    KomendeWeekComponent,
    TodolistComponent,
    TodoListDetailDialogComponent,
    TodoListDialogComponent,
    TrainingGroupsComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    HighGraphsModule,
    FullCalendarModule,
    AngularEditorModule,
    HoldableModule,
    AngularIbanModule,
    SharedComponentsModule,

  ],
})
export class MyPagesModule { }
