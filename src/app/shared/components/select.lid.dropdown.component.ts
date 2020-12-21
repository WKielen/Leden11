//
// use as: <app-select-lid-dropdown [leden-array]="ledenArray" (valueSelected)="onValueSelected($event)"></app-select-lid-dropdown>
//
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-select-lid-dropdown',
  template: `
              <small class="development" *ngIf="developmentMode">{{ me }}</small>
              <mat-form-field>
              <mat-select placeholder="Kies lid" (selectionChange)="onChanged($event)">
              <mat-option *ngFor="let Lid of leden" [value]="Lid.LidNr">{{Lid.Voornaam + " " + Lid.Tussenvoegsel + " " + Lid.Achternaam }}</mat-option>
              </mat-select>
              </mat-form-field>`
})

export class SelectLidDropdownComponent extends BaseComponent {
  @Input('leden-array') leden: LidExtract[];
  @Output('valueSelected') valueSelected = new EventEmitter();
  lid: LidExtract;

  onChanged($event) {
    this.lid = this.leden.filter(function(item) {
      return item.LidNr === $event.value;
    })[0];
    this.valueSelected.emit(this.lid);
  }
}

export interface LidExtract {
  LidNr: number;
  Voornaam: string;
  Achternaam: string;
  Tussenvoegsel: string;
  Rol: string;
}
