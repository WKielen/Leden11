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

@NgModule({
  declarations: [
    CardHeaderSpinnerComponent,
    A2hsComponent,
    OldCheckboxListComponent,
    SelectLidDropdownComponent,
    CardHeaderDetailComponent,
    WaitingButtonComponent,
    CheckboxListComponent,
    DialogMessageBoxComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    HoldableModule,

  ],
  exports: [
    CardHeaderSpinnerComponent,
    A2hsComponent,
    OldCheckboxListComponent,
    SelectLidDropdownComponent,
    CardHeaderDetailComponent,
    WaitingButtonComponent,
    CheckboxListComponent,
    DialogMessageBoxComponent,
  ]
})
export class SharedComponentsModule { }
