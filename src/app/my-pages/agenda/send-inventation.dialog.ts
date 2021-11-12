import { TypeValues, OrganisatieValues, DoelgroepValues, AgendaItem } from '../../services/agenda.service';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { LedenItemExt } from 'src/app/services/leden.service';


@Component({
  selector: 'app-send-inventation-dialog',
  templateUrl: './send-inventation.dialog.html',
  styles: [
    '[hidden] { display: none!important; }'
  ]
})
export class SendInventationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SendInventationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // public dialog: MatDialog,

    // private adapter: DateAdapter<any>
  ) {
    // this.adapter.setLocale('nl');
  }

  public itemsToMail: Array<LedenItemExt> = [];

  public attachmentFile: File | null = null;
  public emailSubject: string = '';
  public htmlContent: string = '';


  ngOnInit(): void {
    console.log('', );
  }

  /***************************************************************************************************
  / Sluit dialog
  /***************************************************************************************************/
  onSubmit(): void {
    this.dialogRef.close(this.data.data);
  }

  onSelectionChanged($event) {
    this.itemsToMail = $event;
  }

  onHtmlContentChanged($event) {
    this.htmlContent = $event;
    console.log("SendInventationDialogComponent --> onHtmlContentChanged --> this.htmlContent", this.htmlContent);
  }
  onEmailSubjectChanged($event) {
    this.emailSubject = $event;

  }
  onAttachmentFileChanged($event) {
    this.attachmentFile = $event;
  }




}
