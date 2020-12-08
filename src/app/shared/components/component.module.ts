import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { A2hsComponent } from './a2hs/a2hs.component';
import { CardHeaderSpinnerComponent } from './card.header.spinner';
import { CheckboxListComponent } from './checkbox.list.component';
import { SelectLidDropdownComponent } from './select.lid.dropdown.component';

@NgModule({
  declarations: [
    CardHeaderSpinnerComponent,
    A2hsComponent,
    CheckboxListComponent,
    SelectLidDropdownComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    CardHeaderSpinnerComponent,
    A2hsComponent,
    CheckboxListComponent,
    SelectLidDropdownComponent,
  ]
})
export class SharedComponentsModule { }
