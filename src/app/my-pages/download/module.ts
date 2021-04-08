import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomMaterialModule } from 'src/app/material.module';
import { SharedComponentsModule } from 'src/app/shared/components/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DownloadComponent } from './download.component';

@NgModule({
  declarations: [
    DownloadComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DownloadComponent
      }
    ]),
    CommonModule,
    CustomMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    DownloadComponent,
  ]
})

export class Module { }
