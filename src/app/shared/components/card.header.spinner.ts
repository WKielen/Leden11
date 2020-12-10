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
      <div class="alternative-theme">
      <mat-slide-toggle *ngIf="toggleTitle" color="primary"
      labelPosition="before" [checked]="checked">
        <div id="toggleTitle">
          {{ toggleTitle }}
        </div>
      </mat-slide-toggle>
      </div>
      <div fxFlex fxLayout="row" fxLayoutAlign="flex-end">
        <mat-spinner color="warn" mode="determinate" diameter="35" [value]="Value" strokeWidth="7">
        </mat-spinner>
      </div>
    </mat-card-header>
  `,
  styles: ['mat-spinner { margin-top: 3px; margin-right: 20px; }',
           'mat-slide-toggle { margin-top: 8px; margin-right: 10px; }',
           '#toggleTitle { color: white; }'
          ]
})

export class CardHeaderSpinnerComponent {
  @Input('progress') progress: number;
  @Input('title') title: string;
  @Input('toggleChecked') checked: boolean = true;
  @Input('toggleTitle') toggleTitle: string; 
  get Value() {
    return this.progress * 1.4;
  }
}
