import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from 'src/app/material.module';
import { CardHeaderSpinnerComponent } from './card.header.spinner';

@NgModule({
  declarations: [
    CardHeaderSpinnerComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    CardHeaderSpinnerComponent,
  ]
})
export class SharedComponentsModule { }
