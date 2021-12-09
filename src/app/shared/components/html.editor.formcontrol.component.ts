import { Component, OnInit, Optional, Self, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-html-editor-formcontrol',
  template: `
    <small class="development" *ngIf="developmentMode">{{ me }}</small>
    <app-html-editor [htmlInputContent]="receivedHtmlInput" (htmlOutputContent)='onHtmlChanged($event)'></app-html-editor>
  `,
  providers: [{
    provide: FormControl,
    useExisting: HtmlEditorFormControlComponent
  }]
})
export class HtmlEditorFormControlComponent extends BaseComponent implements OnInit, ControlValueAccessor {

  @Output()
  htmlContent = new EventEmitter<string>(); // Hiermee geven we een gewijzigde html terug

  public receivedHtmlInput:string = '';  // Deze ontvangen we via setvalue

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.receivedHtmlInput == '') {
      this.ngControl.control?.setErrors({});  // we maken de control invalid
    }
  }

  /***************************************************************************************************
  / de inhoud van de HTML is gewijzigd
  /***************************************************************************************************/
  onHtmlChanged ($event) {
    if ($event == '') {
      this.ngControl.control?.setErrors({});  // we maken de control invalid
    }
    else {
      this.ngControl.control?.setErrors(null);
    }

    this.htmlContent.emit($event);
  }

  /***************************************************************************************************
  / Implementatie van ControlValueAccessor
  /***************************************************************************************************/
  writeValue(obj: string): void {
    this.receivedHtmlInput = obj;
  }

  OnChange!: (value: string) => {};
  registerOnChange(fn: any): void {
    this.OnChange = fn;
  }

  OnTouched!: () => void;
  registerOnTouched(fn: any): void {
    this.OnTouched = fn;
  }

  /***************************************************************************************************
  / Einde implementatie van ControlValueAccessor
  /***************************************************************************************************/
}
