import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/services/auth.service";
import { LedenItem, LedenItemExt, LedenService } from "src/app/services/leden.service";
import { MailService } from "src/app/services/mail.service";
import { ParamService } from "src/app/services/param.service";
import { AppError } from "src/app/shared/error-handling/app-error";
import { ReplaceKeywords } from "src/app/shared/modules/ReplaceKeywords";
import { ParentComponent } from "src/app/shared/parent.component";
import { MailNameList, MailSaveItem } from "../mail/mail.component";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  // providers: [{ provide: 'param', useValue: 'progress' }]
})
export class TestComponent
  extends ParentComponent implements OnInit {

  constructor(
    protected snackBar: MatSnackBar,
    protected paramService: ParamService,
    protected ledenService: LedenService,
    protected authService: AuthService,
    protected mailService: MailService,
  ) {
    super(snackBar);
  }

  ledenLijst: Array<LedenItemExt> = [];

  htmlContent: string="<b>Dit is mijn tekst</b>";
  htmlOutput: string = '';
  eventlist = new MailNameList();

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    this.registerSubscription(
      this.ledenService.getActiveMembers$()
        .subscribe({
          next: (data: Array<LedenItemExt>) => {
            this.ledenLijst = data;
          }
        }));
  }



  onClick() {
    let lid = this.ledenLijst[0];
    let output = ReplaceKeywords(lid, '');
    console.log("onClick --> output", output);
  }

  onClick2() {
  }

  onSelectionChanged($event) {
    console.log("onSelectionChanged --> $event", $event);
  }

  onHtmlOutputChange($event) {
    this.htmlOutput = $event
  }

}
