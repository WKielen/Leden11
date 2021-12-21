import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, of, forkJoin } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { InschrijvingItem, InschrijvingService } from "src/app/services/inschrijving.service";
import { LedenItemExt, LedenService } from "src/app/services/leden.service";
import { MailItem, MailService } from "src/app/services/mail.service";
import { ParamService } from "src/app/services/param.service";
import { RatingService } from "src/app/services/rating.service";
import { AppError } from "src/app/shared/error-handling/app-error";
import { ParentComponent } from "src/app/shared/parent.component";
import { EventSubscriptionsDialogComponent } from "../evenementen/event-subscriptions-dialog/event-subscribtions.dialog";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
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
    protected inschrijvingService: InschrijvingService,

    public dialogRef: MatDialogRef<EventSubscriptionsDialogComponent>,
    public dialog: MatDialog,) {
    super(snackBar);
  }

  // ledenLijst: Array<LedenItemExt> = [];
  public subscriptions: Array<InschrijvingItem> = [];
  public reportList: Array<LedenItemExt> = [];

  htmlContent: string = "<b>Dit is mijn tekst</b>";
  // eventlist = new MailNameList();

  myForm = new FormGroup({
    demoControl: new FormControl('',
      [Validators.required]
    ),
    chipscontrol: new FormControl(),
  });


  get demoControl(): any {
    return this.myForm.get('demoControl');
  }

  get chipscontrol(): any {
    return this.myForm.get('chipscontrol');
  }

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    // this.chipscontrol.disable({ emitEvent: false });
    this.chipscontrol.setValue(this.htmlContent);
    this.demoControl.setValue(this.htmlContent);
    // this.registerSubscription(
    //   this.ledenService.getActiveMembersWithRatings$()
    //     .subscribe({
    //       next: (data: Array<LedenItemExt>) => {
    //         this.ledenLijst = data;
    //         console.log("ngOnInit --> this.ledenLijst", this.ledenLijst);
    //       }
    //     }));


    let subInschrijvingen = this.inschrijvingService.getSubscriptionsEvent$(2146)
      .pipe(
        catchError(err => of(new Array<InschrijvingItem>()))
      );

    let subLeden = this.ledenService.getActiveMembers$()
      .pipe(
        catchError(err => of(new Array<LedenItemExt>()))
      );

    this.registerSubscription(
      forkJoin([subInschrijvingen, subLeden,])
        .subscribe({
          next: (data) => {
            this.subscriptions = data[0];
            let ledenLijst = data[1];

            this.subscriptions.forEach((inschrijving: InschrijvingItem) => {
              // let reportItem = new ReportItem();
              let lid: LedenItemExt = new LedenItemExt();

              let index = ledenLijst.findIndex((lid: LedenItemExt) => (lid.LidNr == inschrijving.LidNr));

              if (inschrijving.LidNr != 0 && index != -1) {
                lid = ledenLijst[index];
              }

              lid['OpgegevenNaam'] = inschrijving.Naam;
              lid['Email'] = inschrijving.Email;
              lid['ExtraInformatie'] = inschrijving.ExtraInformatie;

              this.reportList.push(lid);
            });
            // this.list = localList;

          },
          error: (error: AppError) => {
            console.log("EventSubscriptionsDialogComponent --> ngOnInit --> error", error);
          }
        })
    )















  }


  onClick() {
  }

  // onHTMLChanged($event) {
  //   this.htmlOutput = $event;
  //   console.log("onHTMLChanged --> $event", $event);

  // }



  onClick3() {
    this.htmlContent = this.chipscontrol.value;
  }


  onClick2() {
    // var index = this.ledenLijst.findIndex(obj => obj.LidNr == 1378);
    // console.log('x', index);
  }

  //   onSelectionChanged($event) {
  //     this.myControl.setValue($event);
  //     console.log("onSelectionChanged --> $event", $event);
  //   }

  //   onHtmlOutputChange($event) {
  //     this.htmlOutput = $event
  //   }
  //   /***************************************************************************************************
  //    / Properties
  //    /***************************************************************************************************/
  //   get myControl() {
  //     return this.myForm.get('myControl');
  //   }
  // }
}
