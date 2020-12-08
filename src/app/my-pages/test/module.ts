import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { A2hsComponent } from 'src/app/shared/components/a2hs/a2hs.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HoldableModule } from 'src/app/shared/directives/holdable.directive';
import { CardHeaderSpinnerComponent } from 'src/app/shared/components/card.header.spinner';

@NgModule({
  declarations: [
    TestComponent,
    A2hsComponent,
    CardHeaderSpinnerComponent,

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
  ]
})

export class Module { }
