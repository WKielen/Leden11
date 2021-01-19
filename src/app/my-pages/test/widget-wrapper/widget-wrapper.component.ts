import { Component, ContentChild, OnInit } from '@angular/core';
import { Widget } from '../temp/widget.interface';
import { WIDGET } from '../temp/widget.token';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss']
})
export class WidgetWrapperComponent implements OnInit {
  @ContentChild(WIDGET as any, { static: true })
  widget: Widget;

  constructor() { }
  public showButtons: boolean = true;

  ngOnInit(): void {
  }
  onClickModify() {
    this.widget.onClickModify();
  }

  onClickCopy() {
  }

  onClickDelete() {

  }
}
