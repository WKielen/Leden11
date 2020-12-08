import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ParentComponent } from "src/app/shared/parent.component";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent
  extends ParentComponent
  implements OnInit, OnDestroy {
  constructor(
    protected snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
  }
  progress = 0;

  holdHandler($event) {
    console.log($event)
    this.progress = $event / 10;
    if (this.progress == 100) {
      console.log('%c============> HIT', 'color: black; font-weight:bolder');
      this.showSnackBar('Doe iets na een seconde');
    }
  }
}
