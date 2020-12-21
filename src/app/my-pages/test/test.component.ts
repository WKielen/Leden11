import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ICheckboxDictionaryItem } from "src/app/shared/components/checkbox2.list.component";
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
  public theBoundCallback: Function;
  public myDictionairy: ICheckboxDictionaryItem[];

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    this.theBoundCallback = this.dezeGraag.bind(this, "actionItem");

    let item1: ICheckboxDictionaryItem = {  DisplayValue: "Adminstrator", Value: true}
    let item2: ICheckboxDictionaryItem = {  DisplayValue: "Bestuur", Value: false}
    this.myDictionairy = [item1, item2];

  }
  progress = 0;

  holdHandler($event) {
    console.log($event)
  }

  dezeGraag($event) {
    console.log('dezeGraag', $event);
  }

  onRoleClicked($event): void {
    if ($event instanceof MouseEvent) return;
    this.myDictionairy[$event.RowNr].Value = $event.Value;
  }


}
