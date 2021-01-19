import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedComponentsModule } from 'src/app/shared/components/component.module';
import { HoldableModule } from 'src/app/shared/directives/directives.module';
import { DetailDialogComponent } from './common.detail.dialog';
import { TempComponent } from './temp/temp.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';

@NgModule({
  declarations: [
    TestComponent,
    DetailDialogComponent,
    TempComponent,
    WidgetWrapperComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestComponent
      }
    ]),
    CommonModule,
    CustomMaterialModule,
    MatProgressBarModule,
    HoldableModule,
    SharedComponentsModule,
  ],
  exports: [
    TestComponent,
    DetailDialogComponent,
    TempComponent
  ]
})

export class Module { }
