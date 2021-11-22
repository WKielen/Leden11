import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InschrijvingItem, InschrijvingService } from 'src/app/services/inschrijving.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-event-subscribtions-dialog',
  templateUrl: './event-subscribtions.dialog.html',
  styles: [
    '[hidden] { display: none!important; }',
    '.mat-dialog-content:{ height: 900px; width: 400px;}'
  ]
})

export class EventSubscriptionsDialogComponent extends BaseComponent implements OnInit {
  constructor(
    private inschrijvingService: InschrijvingService,
    public dialogRef: MatDialogRef<EventSubscriptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    super()
  }

  public subscriptions: Array<InschrijvingItem> = [];

  ngOnInit(): void {
    this.registerSubscription(
      this.inschrijvingService.getAll$()
        .subscribe({
          next: (data: Array<InschrijvingItem>) => {
            this.subscriptions = data;
          }
        }));






  }

}
