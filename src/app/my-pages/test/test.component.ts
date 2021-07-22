import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LedenItem } from "src/app/services/leden.service";
import { ParamService } from "src/app/services/param.service";
import { AppError } from "src/app/shared/error-handling/app-error";
import { ReplaceKeywords } from "src/app/shared/modules/ReplaceKeywords";
import { ParentComponent } from "src/app/shared/parent.component";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  // providers: [{ provide: 'param', useValue: 'progress' }]
})
export class TestComponent
  extends ParentComponent
  implements OnInit {
  constructor(
    protected snackBar: MatSnackBar,
    protected paramService: ParamService
  ) {
    super(snackBar);
  }



  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
  }



  onClick() {
    let lid = new LedenItem();
    let output = ReplaceKeywords(lid, '');


  }

  onClick2() {
  }




}
