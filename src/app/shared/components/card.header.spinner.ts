//
// use as: <app-select-lid-dropdown [leden-array]="ledenArray" (valueSelected)="onValueSelected($event)"></app-select-lid-dropdown>
//
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'mat-card-header-spinner',
  template: `
  <mat-card-header>
    <mat-card-title> {{ title }}</mat-card-title>
      <div style="flex: 1;"></div>
      <div class="alternative-theme">
        <mat-slide-toggle *ngIf="toggleTitle" color="primary" (change)="onToggleClicked($event)"
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

export class CardHeaderSpinnerComponent implements OnChanges {
  @Input('progress') progress: number;
  @Input('title') title: string;
  @Input('toggleChecked') checked: boolean = true;
  @Input('toggleTitle') toggleTitle: string;
  @Output('onSliderChanged') slided = new EventEmitter();
  @Output('onHoldAction') holdAction = new EventEmitter();

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('progress')) {
      if (this.progress == 100) {
        this.holdAction.emit("nog bedenken");
        this.progress = 0;
      }
    }
  }

  get Value() {
    return this.progress * 1.4;
  }

  onToggleClicked($event) {
    this.slided.emit($event);
  }
}
