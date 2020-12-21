//
// use as: <app-select-lid-dropdown [leden-array]="ledenArray" (valueSelected)="onValueSelected($event)"></app-select-lid-dropdown>
//
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'mat-waiting-button',
  template: `<button mat-icon-button [color]="color" holdable (holdTime)="onHoldTimeChanged($event)">
              <mat-icon>{{icon}}</mat-icon>
             </button>
            `
})
export class WaitingButtonComponent extends BaseComponent {
  @Input('icon') icon: string;
  @Input('color') color: string = "primary";
  @Input() public myCallback: Function;
  @Output('holdTime') time = new EventEmitter();

  /***************************************************************************************************
  / Geef de wachttijd die je van de holdable directive ontvangt verder aan het aanroepende component
  /***************************************************************************************************/
  onHoldTimeChanged($event): void {
    this.time.emit($event);
    if ($event == 1000 && this.myCallback) {
      this.myCallback();
    }
  }
}

