import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SubscribeEventPageComponent } from './subscribe-event.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { SharedComponentsModule } from 'src/app/shared/components/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubscribeEventPageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SubscribeEventPageComponent
      }
    ]),
    CommonModule,
    CustomMaterialModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SubscribeEventPageComponent,
  ]
})

export class Module { }
