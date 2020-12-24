import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AgendaDialogComponent } from './todolist.dialog';

@Component({
    selector: 'app-todolist-detail-dialog',
    templateUrl: './todolist.detail.dialog.html',
    styleUrls: ["./todolist.detail.dialog.scss"],
})
export class TodoListDetailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<TodoListDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
    ) {
    }

    public toelichting: string = this.data.data.Description.replace(new RegExp('\n', 'g'), "<br>")
}
