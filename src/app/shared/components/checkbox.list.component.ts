//<mat-checkbox-list [checkboxDictionary]="myDictionairy" (click)="onRoleClicked($event)"></mat-checkbox-list>
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mat-checkbox-list',
  template: `
    <div *ngFor="let item; index as i of myDictionary">
    <mat-checkbox (change)="onCheckBoxChanged($event)" [id]="i" [checked]="item.Value" color="primary">
      {{item.DisplayValue}}
    </mat-checkbox>
  </div>
  `,
  styles: []
})
export class CheckboxListComponent {
  @Input('checkboxDictionary') myDictionary: ICheckboxDictionaryItem[];
  @Output('click') clicked = new EventEmitter<Event>();

  onCheckBoxChanged($event) {
    const tmp: any = { RowNr: $event.source.id, Value: $event.checked };
    this.clicked.emit(tmp);
  }
}
export interface ICheckboxDictionaryItem {
  DisplayValue: string,
  Value: boolean;
}
