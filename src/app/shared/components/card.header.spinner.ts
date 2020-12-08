//
// use as: <app-select-lid-dropdown [leden-array]="ledenArray" (valueSelected)="onValueSelected($event)"></app-select-lid-dropdown>
//
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mat-card-header-spinner',
  template: `
  <mat-card-header>
    <mat-card-title> {{ title }}</mat-card-title>
      <div style="flex: 1;"></div>
      <div fxFlex fxLayout='row' fxLayoutAlign='flex-end'>
        <mat-spinner color="warn" mode="determinate" diameter="35" [value]="Value" strokeWidth="7">
        </mat-spinner>
      </div>
    </mat-card-header>
  `,
  styles: ['mat-spinner { margin-top: 3px; margin-right: 20px; }']
})

export class CardHeaderSpinnerComponent {
  @Input('progress') progress: number;
  @Input('title') title: string;
  get Value() {
    return this.progress * 1.5;
  }
}
