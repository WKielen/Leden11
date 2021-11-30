import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { A2hsComponent } from './a2hs/a2hs.component';
import { CardHeaderDetailComponent } from './dialog.header.detail';
import { CardHeaderSpinnerComponent } from './card.header.spinner';
import { OldCheckboxListComponent } from './oldcheckbox.list.component';
import { SelectLidDropdownComponent } from './select.lid.dropdown.component';
import { WaitingButtonComponent } from './waiting-button.component';
import { HoldableModule } from '../directives/directives.module';
import { CheckboxListComponent } from './checkbox.list.component';
import { DialogMessageBoxComponent } from './dialog.message.box';
import { MemberSelectionBoxComponent } from './member.selectionbox.component';
import { MemberSelectionBoxWrapperComponent } from './member.selectionbox.wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HtmlEditorComponent } from './html.editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HtmlEditorEvenementWrapperComponent } from './html.editor.evenement.wrapper.component';
import { SendMailComponent } from './send.mail.component';
import { DisplayAgendaDetailsComponent } from './display.agenda.details.component';
import { DisplaySubscriptionsAgendaDetailsComponent } from './display.subscribtions.details.component';
import { UpdateRatingComponent } from './update.ratings.component';

const componentList = [
  CardHeaderSpinnerComponent,
  A2hsComponent,
  OldCheckboxListComponent,
  SelectLidDropdownComponent,
  CardHeaderDetailComponent,
  WaitingButtonComponent,
  CheckboxListComponent,
  DialogMessageBoxComponent,
  MemberSelectionBoxComponent,
  MemberSelectionBoxWrapperComponent,
  HtmlEditorComponent,
  HtmlEditorEvenementWrapperComponent,
  SendMailComponent,
  UpdateRatingComponent,
  DisplaySubscriptionsAgendaDetailsComponent,
  DisplayAgendaDetailsComponent,
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    HoldableModule,
    FlexLayoutModule,
    AngularEditorModule,

  ],
  declarations: [
    ...componentList
  ],
  exports: [
    ...componentList
  ]
})
export class SharedComponentsModule { }
