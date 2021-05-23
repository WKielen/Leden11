import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ParamService } from "src/app/services/param.service";
import { AppError } from "src/app/shared/error-handling/app-error";
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
    //this.paramService.readParamData$("getinstantwebsitetext").subscribe();

    let sub = this.paramService.readParamData$("ladderstand")
      .subscribe({
        next: (data) => {
          let result = data as string;
          // this.dataSource.data = this.createDummyData().LadderItems;
          let tmp = JSON.parse(result);
        },
        error: (error: AppError) => {
          console.log("error", error);
        }
      })
    this.registerSubscription(sub);
  }

  onClick2() {

    let sub = this.paramService.readParamData$("ladderstand4")
      .subscribe({
        next: (data) => console.log(data),
        error: (e) => console.error(e)
      });

    // .subscribe(data => {
    //   let result = data as string;
    //   // this.dataSource.data = this.createDummyData().LadderItems;
    //   let tmp = JSON.parse(result);
    // },
    //   (error: AppError) => {
    //     console.log("error", error);
    //   }
    // )
    this.registerSubscription(sub);
  }




}
