import { Component, OnInit, OnDestroy, Inject, Optional } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MailService } from "src/app/services/mail.service";
import { UserService } from "src/app/services/user.service";
import { ParentComponent } from "src/app/shared/parent.component";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  providers: [ { provide: 'param', useValue: 'progress'} ]
})
export class TestComponent
  extends ParentComponent
  implements OnInit, OnDestroy {
  constructor(
  protected snackBar: MatSnackBar,
  protected userService: UserService,
  public mailService: MailService,
  ) {
    super(snackBar);
  }
  public theBoundCallback: Function;

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    this.theBoundCallback = this.dezeGraag.bind(this, "actionItem");
    this.userService.getAll$().subscribe();
  }
  progress = 0;

  holdHandler($event) {
    console.log($event)
  }

  dezeGraag($event) {
    console.log('dezeGraag', $event);
  }

  onClick() {
    const credentials = { 'database': 'ttest'};
    this.userService.register$(credentials)
      .subscribe(result => {
        if (result) {
      this.showSnackBar("OK", '');
          
        } else {
        //   this.registerForm = true;
        }
    },
    err => {
    //   this.registerForm = true;
    });


  }




}
