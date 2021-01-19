import { Component, OnInit, OnDestroy, Inject, Optional } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LedenItem, LedenService } from "src/app/services/leden.service";
import { MailService } from "src/app/services/mail.service";
import { UserItem, UserService } from "src/app/services/user.service";
import { ParentComponent } from "src/app/shared/parent.component";
import { Md5 } from "ts-md5";
import { DetailDialogComponent } from "./common.detail.dialog";
import { MyTel } from "./telephone/telephone.field.component";

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

  selected = '';
  ledenLijst: Array<LedenItem> = [];

  testForm = new FormGroup({
    Field1: new FormControl(
      'waarde 1',
      [Validators.required]
    ),
    Field2: new FormControl(
      'Waarde 2',
      [Validators.required]
    ),
    tel: new FormControl(
      new MyTel('123', '233', '1234'),
      [Validators.required]
    ),
  });



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

  onTestClick() {
    console.log('TestCompoment --> onTestClick', );
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

  get Field1() {
    return this.testForm.get('Field1');
  }
  get Field2() {
    return this.testForm.get('Field2');
  }
  get tel() {
    return this.testForm.get('tel');
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
