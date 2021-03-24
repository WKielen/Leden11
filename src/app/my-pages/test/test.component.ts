import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
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

  ) {
    super(snackBar);
  }



  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
  }



  onClick() {

  }




}
