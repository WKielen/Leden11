import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ParentComponent } from 'src/app/shared/parent.component';
import { TodoListDetailDialogComponent } from './todolist.detail.dialog';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent extends ParentComponent implements OnInit {

  deleteprogress1 = 0;
  deleteprogress2 = 0;
  deleteprogress3 = 0;
  headerToggleChecked: boolean = false;
  actionList: Array<ActionItem> = [];

  columnsToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];
  filterValues = { LidNr: '' };
  filterFininshedValues = { LidNr: '' };
  dataSourceOpenActions = new MatTableDataSource<ActionItem>();
  dataSourceFinishedActions = new MatTableDataSource<ActionItem>();
  selectedAction: ISelectedAction;

  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
  }

  ngOnInit(): void {

    this.actionList = this.actionService.GetSome();
    this.dataSourceOpenActions.data = this.actionList;
    this.dataSourceOpenActions.filterPredicate = this.createOpenActionFilter();
    this.filterValues.LidNr = '';
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);

    this.dataSourceFinishedActions.data = this.actionList;
    this.dataSourceFinishedActions.filterPredicate = this.createFinishedActionFilter();
    this.filterFininshedValues.LidNr = '';
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);

  }

  onAddAction(): void {
    console.log('Add action',);
  }
  onDoneAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
    if (this.deleteprogress1 == 0) {
      this.selectedAction = { operation: "done", action: this.dataSourceOpenActions.data[index] };
    }
  }

  onHoldAction($event): void {   // uit de header
    console.log('onHoldAction', $event);
    if (this.selectedAction.operation == "done") {
      console.log('done geselecteerd', this.selectedAction.action);
      this.dataSourceOpenActions.data[0].EndDate = '2020-01-01'
      console.log('', this.dataSourceOpenActions.data);
      this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);
      this.dataSourceFinishedActions.filter = JSON.stringify(this.filterValues);

    }

  }

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


  onDeleteAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
  }
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


interface ISelectedAction {
  operation: string,
  action: ActionItem
}