import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/services/auth.service";
import { LedenItemExt, LedenService } from "src/app/services/leden.service";
import { MailItem, MailService } from "src/app/services/mail.service";
import { ParamService } from "src/app/services/param.service";
import { RatingService } from "src/app/services/rating.service";
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

    public dialogRef: MatDialogRef<EventSubscriptionsDialogComponent>,
    public dialog: MatDialog,) {
    super(snackBar);
  }

  // ledenLijst: Array<LedenItemExt> = [];

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
