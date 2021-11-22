import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-mat-dialog-header-detail',
  template: `
  <h2 mat-dialog-title>
    <mat-toolbar class="task-header">
      <span> {{ title }}</span>
      <span class="fx-spacer"></span>

      <button *ngIf="showButtons" mat-icon-button color="white" (click)="onClickModify($event)">
        <mat-icon>edit</mat-icon>
      </button>
      <button *ngIf="showButtons" mat-icon-button color="white" (click)="onClickCopy($event)">
        <mat-icon>content_copy</mat-icon>
      </button>
      <button *ngIf="showButtons" mat-icon-button color="warn" (click)="onClickDelete($event)">
        <mat-icon>delete</mat-icon>
      </button>
      <ng-container *ngTemplateOutlet="extraButtonsTemplate"></ng-container>
      <button mat-icon-button color="white" cdkFocusInitial mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </mat-toolbar>
  </h2>

  <small class="development" *ngIf="developmentMode">{{ me }}</small>
  `,
  styles: [
    'h2 { margin: 0px; }',
    '#left { display: flex; justify-content: flex-end; }',
    `.task-header {
      background-color: transparent;
      color: white;
      padding: 0;
      height: 25px;
    }`,
    `.fx-spacer {
      flex: 1 1 auto;
    }`
  ]
})

export class CardHeaderDetailComponent extends BaseComponent{

  @Input() title: string;
  @Input() showButtons: boolean = false;
  @Input() extraButtonsTemplate: TemplateRef<any>;

  @Output('onClickModify') modify = new EventEmitter();
  @Output('onClickCopy') createcopy = new EventEmitter();
  @Output('onClickDelete') delete = new EventEmitter();

  onClickModify($event) {
    this.modify.emit($event);
  }
  onClickCopy($event) {
    this.createcopy.emit($event);
  }
  onClickDelete($event) {
    this.delete.emit($event);
  }
}
