import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from 'src/app/material.module';
import { MailComponent } from './mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedComponentsModule } from 'src/app/shared/components/component.module';

@NgModule({
  declarations: [
    MailComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MailComponent
      }
    ]),
    CommonModule,
    AngularEditorModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ]
})

export class Module { }
