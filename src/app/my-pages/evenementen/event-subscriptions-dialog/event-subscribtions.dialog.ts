import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InschrijvingItem, InschrijvingService } from 'src/app/services/inschrijving.service';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { ParentComponent } from 'src/app/shared/parent.component';

@Component({
  selector: 'app-event-subscribtions-dialog',
  templateUrl: './event-subscribtions.dialog.html',
  styles: []
})

export class EventSubscriptionsDialogComponent extends ParentComponent implements OnInit {
  constructor(
    protected snackBar: MatSnackBar,
    private inschrijvingService: InschrijvingService,
    public dialogRef: MatDialogRef<EventSubscriptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    super(snackBar)
  }

  public subscriptions: Array<InschrijvingItem> = [];

  ngOnInit(): void {
    this.registerSubscription(
      this.inschrijvingService.getSubscriptionsEvent$(this.data.data.Id)
        .subscribe({
          next: (data: Array<InschrijvingItem>) => {
              this.subscriptions = data;
          },
          error: (error: AppError) => {
            if (error instanceof NotFoundError) {
              this.showSnackBar(SnackbarTexts.NotFound, '');
            }
          }
        }));

  }
}
