import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LedenItem, LedenItemExt } from 'src/app/services/leden.service';
import { ExternalMailApiRecord, MailItem, MailItemTo, MailService } from 'src/app/services/mail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MailDialogComponent } from 'src/app/my-pages/mail/mail.dialog';
import { ParentComponent } from '../parent.component';
import { Replace, ReplaceKeywords } from '../modules/ReplaceKeywords';
import { Observable, ReplaySubject } from 'rxjs';
import { AppError } from '../error-handling/app-error';

@Component({
  selector: 'app-send-mail',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small>
  <mat-card>
    <mat-card-header>
          <mat-card-title>Verstuur Mail</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <button mat-raised-button color="primary" (click)="onSendMail($event)" [disabled]='itemsToMail.length === 0'
            matBadge={{itemsToMail.length}} matBadgePosition="after" matBadgeColor="warn">Verzend mail</button>
    </mat-card-content>
  </mat-card>
`,
  styles: []
})

export class SendMailComponent extends ParentComponent implements OnChanges {

  @Input()
  itemsToMail: Array<LedenItemExt> = [];

  @Input()
  htmlContent: string = '';

  @Input()
  emailSubject: string = '';

  @Input()
  attachmentFile: File | null = null;

  @Input()
  public replaceLinkCallback: Function;


  private attachmentContent: string = '';

  constructor(
    protected mailService: MailService,
    protected snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    super(snackBar)
  }

  /***************************************************************************************************
  / Verstuur de email
  /***************************************************************************************************/
  async onSendMail($event): Promise<void> {

    let mailDialogInputMessage = new ExternalMailApiRecord();

    mailDialogInputMessage.MailItems = new Array<MailItem>();

    this.itemsToMail.forEach(lid => {
      let mailAddresses: Array<MailItemTo> = LedenItem.GetEmailList(lid);

      mailAddresses.forEach(element => {
        let itemToMail = new MailItem();
        itemToMail.Message = ReplaceKeywords(lid, this.htmlContent);
        itemToMail.Subject = this.emailSubject;
        itemToMail.To = element.To;
        itemToMail.ToName = element.ToName;

        itemToMail.Attachment = this.attachmentContent ?? '';
        itemToMail.Type = this.attachmentFile?.type ?? '';
        itemToMail.FileName = this.attachmentFile?.name ?? '';

        let myPersonaliedLink = this.replaceLinkCallback(lid);
        itemToMail.Message = Replace(itemToMail.Message, /%link%/gi, myPersonaliedLink);


        mailDialogInputMessage.MailItems.push(itemToMail);
      });
    });

    if (mailDialogInputMessage.MailItems.length <= 0) {
      this.showSnackBar('Er zijn geen email adressen geselecteerd', '');
      return;
    }

    const dialogRef = this.dialog.open(MailDialogComponent, {
      panelClass: 'custom-dialog-container', width: '400px',
      data: mailDialogInputMessage
    });

    dialogRef
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {  // in case of cancel the result will be false
            console.log('result', result);
          }
        }
      });
  }

  /***************************************************************************************************
  / De attachment file is gewijzigd. We lezen deze nieuwe file direct in
  /***************************************************************************************************/
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('attachmentFile')) {
      if (changes['attachmentFile'].currentValue != undefined && changes['attachmentFile'].firstChange == false) {
        this.convertFile(this.attachmentFile).subscribe({
          next: (data) => {
            this.attachmentContent = data;
          },
          error: (error: AppError) => {
            console.log("SendMailComponent --> this.convertFile --> error", error);
          }
        });
      }
    }
  }


  /**
  * Converts file
  * @param file
  * @returns file
  */
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }


}
