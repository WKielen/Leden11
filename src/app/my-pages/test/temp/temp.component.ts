import { Component, OnInit } from '@angular/core';
import { Widget } from './widget.interface';
import { WIDGET } from './widget.token';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.scss'],
  providers: [
    { provide: WIDGET,
      useExisting: TempComponent
    }
  ]
})
export class TempComponent implements OnInit, Widget {

  constructor() { }
  load: () => void;
  refresh: () => void;
  onClickModify(): void {
    console.log('TempComponent -> onClickModify works', );
  }

  onClickCopy: () => void;
  onClickDelete: () => void;

  ngOnInit(): void {
  }

  public myProperty: string = "Dit is mijn property";
}
