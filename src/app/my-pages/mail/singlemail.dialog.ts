import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LedenItem } from 'src/app/services/leden.service';
import { ReadTextFileService } from 'src/app/services/readtextfile.service';
import { ReplaceKeywords } from 'src/app/shared/modules/ReplaceKeywords';
import { MailDialogComponent } from './mail.dialog';
import { MailItem, MailItemTo } from 'src/app/services/mail.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'singlemail-dialog',
  templateUrl: './singlemail.dialog.html',
  styleUrls: ['./singlemail.dialog.scss']

})
export class SingleMailDialogComponent extends BaseComponent implements OnInit {

  websiteItemForm = new FormGroup({
    Subject: new FormControl(
      '',
      [Validators.required]
    ),
    HtmlContent: new FormControl(
      '',
      [Validators.required]
    ),
  });

//  itemsToMail: Array<MailItem> = [];

  constructor(
    public dialogRef: MatDialogRef<SingleMailDialogComponent>,
    public readTextFileService: ReadTextFileService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public singleMailInputDialog: SingleMail  // Dit is een interface
  ) { super() }

  ngOnInit(): void {
    this.readTextFileService.read(this.singleMailInputDialog.TemplatePathandName)
      .subscribe({
        next: data => {
          this.Subject.setValue(this.singleMailInputDialog.Subject);
          this.HtmlContent.setValue(ReplaceKeywords(this.singleMailInputDialog.Lid, data));
        }
      });
  }

  /***************************************************************************************************
  / Verstuur de email
  /***************************************************************************************************/
  onSendMail($event): void {
    let mailItems = new Array<MailItem>();

    let mailAddresses: Array<MailItemTo> = LedenItem.GetEmailList(this.singleMailInputDialog.Lid);
    mailAddresses.forEach(element => {
      let itemToMail = new MailItem();

      itemToMail.Message = this.HtmlContent.value;
      itemToMail.Subject = this.Subject.value;
      itemToMail.To = element.To;
      itemToMail.ToName = element.ToName;
      mailItems.push(itemToMail);
    });

    // console.log('data from sender', mailDialogInputMessage);
    const dialogRef = this.dialog.open(MailDialogComponent, {
      panelClass: 'custom-dialog-container', width: '400px',
      data: mailItems
    });

    dialogRef.afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {  // in case of cancel the result will be false
            console.log('result', result);
          }
        }
      });
  }

  /***************************************************************************************************
  / de inhoud van de HTML is gewijzigd
  /***************************************************************************************************/
  onHtmlOutputChange($event) {
    this.HtmlContent.setValue($event);
  }

  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/
  get Subject() {
    return this.websiteItemForm.get('Subject');
  }
  get HtmlContent() {
    return this.websiteItemForm.get('HtmlContent');
  }
}

/***************************************************************************************************
/ De interface naar de SingleMail Dialog.
/***************************************************************************************************/
export class SingleMail {
  Lid: LedenItem;
  Subject: string;
  TemplatePathandName: string;
}
