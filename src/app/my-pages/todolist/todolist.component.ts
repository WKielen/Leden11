import { Component, DoCheck, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Dictionary } from 'src/app/shared/modules/Dictionary';
import { ParentComponent } from 'src/app/shared/parent.component';
import { TodoListDetailDialogComponent } from './todolist.detail.dialog';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent extends ParentComponent implements OnInit, OnChanges, DoCheck {

  public theBoundCallback: Function;

  deleteprogress1 = 0;
  deleteprogress2 = 0;
  deleteprogress3 = 0;
  headerToggleChecked: boolean = false;
  actionList: Dictionary = new Dictionary([]);

  columnsToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];
  filterValues = { LidNr: '' };
  filterFininshedValues = { LidNr: '' };
  dataSourceOpenActions = new MatTableDataSource<ActionItem>();

  dataSourceFinishedActions = new MatTableDataSource<ActionItem>();

  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
  }

  ngOnInit(): void {

    this.actionList = this.actionService.GetSome();

    this.dataSourceOpenActions.data = this.actionList.values();
    this.dataSourceOpenActions.filterPredicate = this.createOpenActionFilter();
    this.filterValues.LidNr = '';
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);

    this.dataSourceFinishedActions.data = this.actionList.values();
    this.dataSourceFinishedActions.filterPredicate = this.createFinishedActionFilter();
    this.filterFininshedValues.LidNr = '';
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);

  }

  ngOnChanges(changes): void {
    console.log('chnges', changes);
  }

  ngDoCheck() {


  }


  refreshFilters() {
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterValues);
  }

  /***************************************************************************************************
  / Open Actions Table Add Knop
  /***************************************************************************************************/
  onAddOpenAction(): void {
    let x = new ActionItem();
    x.Id = "9";
    x.StartDate = '2020-12-01';
    x.LidNr = "23";
    x.TargetDate = '2020-12-02';
    x.HolderName = 'Wim';
    x.Title = 'Action9';
    x.Finished = "0";
    x.Description = 'Beschrijving 1'
    console.log('Add action',);
    this.actionList.add(x.Id, x)
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);
    console.log('list ', this.actionList);

  }

  // progress1Enabled: boolean = true;
  triggerCallback: boolean = false;
  /***************************************************************************************************
  / Open Actions Table Done Knop
  /***************************************************************************************************/
  onDoneOpenAction($event, index: number): void {
    // console.log('$event', $event);
    this.deleteprogress1 = $event / 10;
    if ($event == 0) {
      this.triggerCallback = false;
      const actionItem = this.dataSourceOpenActions.filteredData[index];
      this.theBoundCallback = this.cbDoneOpenAction.bind(this, actionItem);
    }
    if ($event == 1000) {
      this.triggerCallback = true;
      this.deleteprogress1 = 0;
    }
  }

  /***************************************************************************************************
  / Deze functie wordt aangeroepen vanuit de callback uit de header.
  /***************************************************************************************************/
  cbDoneOpenAction($event) {
    let action: ActionItem = this.actionList.get($event.Id)
    action.EndDate = '2020-01-01';
    this.refreshFilters();
    // this.progress1Enabled = true;
  }

  /***************************************************************************************************
  / Open Actions Table Edit Knop
  /***************************************************************************************************/
  onEditAction(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceOpenActions.data[index];

    this.dialog.open(TodoListDetailDialogComponent, {
      width: '500px',
      data: {
        method: "Wijzigen",
        data: toBeEdited,
      },
    })
      .afterClosed()
      .subscribe(result => {
        // this.storeResults(clickInfo.event, result);
      });
  }


  /***************************************************************************************************
  / Open Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
    if (this.deleteprogress1 == 0) {
      // this.selectedAction = { operation: "delete", action: this.dataSourceOpenActions.filteredData[index] };
    }
  }

  /***************************************************************************************************
  / Open Actions Table Dubbel Klik op regels geeft details
  /***************************************************************************************************/
  onDblclickAction($event, index: number): void {
    let toBetoBeShown: ActionItem = this.dataSourceOpenActions.data[index];

    this.dialog.open(TodoListDetailDialogComponent, {
      width: '500px',
      data: {
        data: toBetoBeShown,
      },
    })
  }

  onSliderChanged($event): void {
    if ($event.checked) {
      this.filterValues.LidNr = this.authService.LidNr;
    } else {
      this.filterValues.LidNr = '';
    }
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);
  }



  onSliderFinishedChanged($event): void {
    if ($event.checked) {
      this.filterValues.LidNr = this.authService.LidNr;
    } else {
      this.filterValues.LidNr = '';
    }
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterValues);
  }


  /***************************************************************************************************
  / This filter is created at initialize of the page.
  /***************************************************************************************************/
  private createOpenActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms: ActionItem = JSON.parse(filter);
      return ((data.LidNr == searchTerms.LidNr || searchTerms.LidNr == '') && data.EndDate == '');
    }
    return filterFunction;
  }
  private createFinishedActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms: ActionItem = JSON.parse(filter);
      return ((data.LidNr == searchTerms.LidNr || searchTerms.LidNr == '') && data.EndDate != '');
    }
    return filterFunction;
  }
}