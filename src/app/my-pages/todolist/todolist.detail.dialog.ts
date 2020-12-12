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

    onClickModify() {
        this.showDialog('Wijzigen');
    }

    onClickCopy() {
        this.showDialog('Toevoegen');
    }

    onClickDelete() {
        this.data.method = 'Verwijderen'
        this.dialogRef.close(this.data);
    }

    showDialog(actiontype: string) {
        this.showDialog(actiontype);

        // const dialogRef = this.dialog.open(AgendaDialogComponent, {
        //     // panelClass: "custom-dialog-container",
        //     // width: "1200px",
        //     data: {
        //         method: actiontype,        // for display in the header of the pop-up
        //         data: this.data.data,
        //     },
        // });

        // dialogRef.afterClosed().subscribe((result: AgendaItem) => {
        //     if (result) {
        //         this.data.data = result;
        //         this.data.method = actiontype;
        //         this.dialogRef.close(this.data);
        //     }
        //     else {
        //         this.data.method = 'Cancel';
        //         this.dialogRef.close(this.data);               
        //     }
        // });
    }
}
