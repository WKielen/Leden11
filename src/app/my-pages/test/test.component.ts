import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/services/auth.service";
import { LedenItemExt, LedenService } from "src/app/services/leden.service";
import { MailService } from "src/app/services/mail.service";
import { ParamService } from "src/app/services/param.service";
import { RatingService } from "src/app/services/rating.service";
import { ReplaceKeywords } from "src/app/shared/modules/ReplaceKeywords";
import { ParentComponent } from "src/app/shared/parent.component";
import { EventSubscriptionsDialogComponent } from "../evenementen/event-subscriptions-dialog/event-subscribtions.dialog";
import { MailNameList } from "../mail/mail.component";

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
    protected ratingService: RatingService,

    public dialogRef: MatDialogRef<EventSubscriptionsDialogComponent>,
    public dialog: MatDialog,) {
    super(snackBar);
  }

  ledenLijst: Array<LedenItemExt> = [];

  htmlContent: string = "<b>Dit is mijn tekst</b>";
  htmlOutput: string = '';
  eventlist = new MailNameList();

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    this.registerSubscription(
      this.ledenService.getActiveMembersWithRatings$()
        .subscribe({
          next: (data: Array<LedenItemExt>) => {
            this.ledenLijst = data;
            console.log("ngOnInit --> this.ledenLijst", this.ledenLijst);
          }
        }));
  }



  onClick() {
    let lid = this.ledenLijst[0];
    let output = ReplaceKeywords(lid, '');
    console.log("onClick --> output", output);
  }

  onClick2() {
    var index = this.ledenLijst.findIndex(obj => obj.LidNr == 1378);
    console.log('x', index);
  }

  onSelectionChanged($event) {
    console.log("onSelectionChanged --> $event", $event);
  }

  onHtmlOutputChange($event) {
    this.htmlOutput = $event
  }

}
