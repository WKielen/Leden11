import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ParamService } from "src/app/services/param.service";
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

    // this.paramService.delete$("abc").subscribe();
    this.paramService.readParamData$("getinstantwebsitetext").subscribe();


  }




}
