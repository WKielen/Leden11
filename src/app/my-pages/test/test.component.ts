import { Component, OnInit, OnDestroy, Inject, Optional } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LedenItem, LedenService } from "src/app/services/leden.service";
import { MailService } from "src/app/services/mail.service";
import { UserItem, UserService } from "src/app/services/user.service";
import { ParentComponent } from "src/app/shared/parent.component";
import { Md5 } from "ts-md5";
import { DetailDialogComponent } from "./common.detail.dialog";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  // providers: [{ provide: 'param', useValue: 'progress' }]
})
export class TestComponent
  extends ParentComponent
  implements OnInit, OnDestroy {
  constructor(
    protected snackBar: MatSnackBar,
    protected userService: UserService,
    public mailService: MailService,
    public ledenService: LedenService,
    public dialog: MatDialog,

  ) {
    super(snackBar);
  }
  public theBoundCallback: Function;

  selected = '' ;
  ledenLijst: Array<LedenItem> = [];

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    this.theBoundCallback = this.dezeGraag.bind(this, "actionItem");
    this.userService.getAll$().subscribe();
    this.ledenService.getActiveMembers$().subscribe(data => {
      this.ledenLijst = data;
      this.selected = '23';
    });
    // let y: DictionaryModule = new DictionaryModule();
  }

  onUserSelectedRole($event) {
    console.log('in test', $event);
    this.selected = $event
  }
  onTest() {
    this.dialog
      .open(DetailDialogComponent, {
        data: { method: "Toevoegen", data: {} },
      })
      .afterClosed() // returns an observable
      .subscribe((result) => {
        if (result) {
          // this.storeResults(null, { 'method': 'Toevoegen', 'data': result });
        }
      });
  }









  progress = 0;

  holdHandler($event) {
    console.log($event)
  }

  dezeGraag($event) {
    console.log('dezeGraag', $event);
  }

  onClick() {

  }




}
