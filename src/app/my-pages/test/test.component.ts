import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/services/auth.service";
import { LedenItemExt, LedenService } from "src/app/services/leden.service";
import { ParamService } from "src/app/services/param.service";
import { ParentComponent } from "src/app/shared/parent.component";

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

    ) {
    super(snackBar);
  }

  public ledenLijst: Array<LedenItemExt> = [];

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


  }

}
