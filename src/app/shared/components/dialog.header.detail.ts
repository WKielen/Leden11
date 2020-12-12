import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mat-dialog-header-detail',
  template: `

  <h2 mat-dialog-title>{{ title }}
    <div id="left">
      <button mat-icon-button color="white" (click)="onClickModify($event)">
        <mat-icon>edit</mat-icon>
      </button>
      <button mat-icon-button color="white" (click)="onClickCopy($event)">
        <mat-icon>content_copy</mat-icon>
      </button>
      <button mat-icon-button color="warn" (click)="onClickDelete($event)">
        <mat-icon>delete</mat-icon>
      </button>
      <button mat-icon-button color="white" cdkFocusInitial mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </h2>
  `,
  styles: [
    'h2 { margin: 0px; }',
    '#left { display: flex; justify-content: flex-end; }'
  ]
})

export class CardHeaderDetailComponent {
  
  @Input('title') title: string;
  
  @Output('onClickModify') modify = new EventEmitter();
  @Output('onClickCopy') copy = new EventEmitter();
  @Output('onClickDelete') delete = new EventEmitter();



  onClickModify($event) {
    this.modify.emit($event);
  }
  onClickCopy($event) {
    this.copy.emit($event);
  }
  onClickDelete($event) {
    this.delete.emit($event);
  }
}
