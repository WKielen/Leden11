import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HoldableModule } from 'src/app/shared/directives/holdable.directive';
import { SharedComponentsModule } from 'src/app/shared/components/component.module';

@NgModule({
  declarations: [
    TestComponent,
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
  ]
})

export class Module { }
