import { Component, OnInit, ViewChild } from '@angular/core';
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
export class TodolistComponent extends ParentComponent implements OnInit {

  // @ViewChild(MatTable, {static: false}) tableOpenActions: MatTable<any>;


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

    this.dataSourceOpenActions.data = this.actionList.values();
    this.dataSourceOpenActions.filterPredicate = this.createOpenActionFilter();
    this.filterValues.LidNr = '';
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterValues);

    this.dataSourceFinishedActions.data = this.actionList.values();
    this.dataSourceFinishedActions.filterPredicate = this.createFinishedActionFilter();
    this.filterFininshedValues.LidNr = '';
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);

  }

/***************************************************************************************************
/ De klik op de Done en Delete knop start 'timer' in de header. Na een seconde komt er een event
/ Dit event kikt deze method af.
/ Aan de hand van de selected item bepaal ik welke actie is doe op welk record
/***************************************************************************************************/
  onHoldAction($event): void {   // uit de header
    console.log('onHoldAction', this.selectedAction);
    // Dus Done knop. Vul Eind datum in zodat hij doorschuift naar volgende tabel
    if (this.selectedAction.operation == "done") {
      const id = this.selectedAction.action.Id;
      let action: ActionItem = this.actionList.get(id)
      action.EndDate = '2020-01-01';
      this.refreshFilters();
      return;
    }

    if (this.selectedAction.operation == "delete") {
      const id = this.selectedAction.action.Id;
      this.actionList.remove(id);
      this.refreshFilters();
      return;
    }



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

  /***************************************************************************************************
  / Open Actions Table Done Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDoneOpenAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
    if (this.deleteprogress1 == 0) {
      this.selectedAction = { operation: "done", action: this.dataSourceOpenActions.filteredData[index] };
    }
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
      this.selectedAction = { operation: "delete", action: this.dataSourceOpenActions.filteredData[index] };
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


interface ISelectedAction {
  operation: string,
  action: ActionItem
}