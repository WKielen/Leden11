import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaItem, DoelgroepValues, OrganisatieValues, TypeValues } from 'src/app/services/agenda.service';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { AgendaDialogComponent } from './agenda.dialog';

@Component({
    selector: 'app-agenda-detail-dialog',
    templateUrl: './agenda.detail.dialog.html',
    styleUrls: ["./agenda.detail.dialog.scss"],
})
export class AgendaDetailDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AgendaDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
    ) {
    }
    public showButtons: boolean = this.data.data.Type != 'A' && this.data.data.Type != '';
    public organisatie: string = OrganisatieValues.GetLabel(this.data.data.Extra1);
    public doelGroep: string = DoelgroepValues.GetLabel(this.data.data.DoelGroep);
    public type: string = TypeValues.GetLabel(this.data.data.Type);
    public inschrijfGeld: string = Number(this.data.data.Inschrijfgeld).AmountFormat();
    public toelichting: string = this.data.data.Toelichting.replace(new RegExp('\n', 'g'), "<br>")

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
        const dialogRef = this.dialog.open(AgendaDialogComponent, {
            data: {
                method: actiontype,        // for display in the header of the pop-up
                data: this.data.data,
            },
        });

        dialogRef.afterClosed()
        .subscribe({
          next: (data: AgendaItem) => {
            if (data) {
              this.data.data = data;
              this.data.method = actiontype;
              this.dialogRef.close(this.data);
          }
          else {
              this.data.method = 'Cancel';
              this.dialogRef.close(this.data);
          }
        },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    }
}
