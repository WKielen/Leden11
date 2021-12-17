import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { A2hsComponent } from './a2hs/a2hs.component';
import { CardHeaderDetailComponent } from './dialog.header.detail';
import { CardHeaderSpinnerComponent } from './card.header.spinner';
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
import { HtmlEditorMailWrapperComponent } from './html.editor.mail.wrapper.component';
import { SendMailComponent } from './send.mail.component';
import { DisplayAgendaDetailsComponent } from './display.agenda.details.component';
import { DisplaySubscriptionsAgendaDetailsComponent } from './display.subscribtions.details.component';
import { HtmlEditorFormControlComponent } from './html.editor.formcontrol.component';
import { SendMailSettingsComponent } from './send.mail.setting.component';
import { DemoFormControlComponent } from './demo.formcontrol.component';

const componentList = [
  CardHeaderSpinnerComponent,
  A2hsComponent,
  SelectLidDropdownComponent,
  CardHeaderDetailComponent,
  WaitingButtonComponent,
  CheckboxListComponent,
  DialogMessageBoxComponent,
  MemberSelectionBoxComponent,
  MemberSelectionBoxWrapperComponent,
  HtmlEditorComponent,
  HtmlEditorMailWrapperComponent,
  SendMailComponent,
  DisplaySubscriptionsAgendaDetailsComponent,
  DisplayAgendaDetailsComponent,
  HtmlEditorFormControlComponent,
  SendMailSettingsComponent,
  DemoFormControlComponent
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
