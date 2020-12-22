import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-registration-detail-dialog',
    templateUrl: './registration.detail.dialog.html',
    styles: ['#table { tr { td { text-align: left; vertical-align: top; } } }  h2 { margin: 0px; } '],
})
export class RegistrationDetailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<RegistrationDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
    ) {
    }
}
