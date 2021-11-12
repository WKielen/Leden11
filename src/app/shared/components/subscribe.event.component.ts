import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, TemplateRef, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-subscribe-event',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small>

`
})

export class SubscribeEventComponent extends BaseComponent implements OnInit, OnChanges {

  @Input()
  eventId: number = 0;

  ngOnInit() {
    console.log('',);
  }

  /***************************************************************************************************
  / De input is vanuit de parent aangepast
  /***************************************************************************************************/
  ngOnChanges(changes: SimpleChanges): void {
    console.log("SubscribeEventComponent --> ngOnChanges --> changes", changes);

  }

  /***************************************************************************************************
  / De tekst in de HTML box is aangepast
  /***************************************************************************************************/

}
