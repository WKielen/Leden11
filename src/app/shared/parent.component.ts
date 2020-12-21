import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '@fullcalendar/angular';

@Component({
  template: '',
})
export class ParentComponent extends BaseComponent {

  constructor(
    protected snackBar: MatSnackBar
  ) {
    super();
  }

  public showSnackBar(message: string, consolelog?: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });

    if (consolelog) {
      console.log(consolelog);
    }
  }

}
