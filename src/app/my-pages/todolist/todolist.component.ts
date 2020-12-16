import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { DuplicateKeyError } from 'src/app/shared/error-handling/duplicate-key-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { Dictionary } from 'src/app/shared/modules/Dictionary';
import { ParentComponent } from 'src/app/shared/parent.component';
import { TodoListDetailDialogComponent } from './todolist.detail.dialog';
import { TodoListDialogComponent } from './todolist.dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent extends ParentComponent implements OnInit {

  public theBoundCallback: Function;

  openActionSpinner = 0;
  finishedActionSpinner = 0;
  archivedActionSpinner = 0;
  repeatingActionSpinner = 0;

  headerToggleChecked: boolean = false;
  actionList: Dictionary = new Dictionary([]);

  columnsOpenToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];
  columnsFinishedToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'EndDate', 'actions2'];
  columnsArchiveToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'EndDate', 'actions2'];
  columnsRepeatingToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];

  filterOpenValues = { Voornaam: '' };
  filterFininshedValues = { Voornaam: '' };
  filterArchiveValues = { Voornaam: '' };
  filterRepeatingValues = { Voornaam: '' };

  dataSourceOpenActions = new MatTableDataSource<ActionItem>();
  dataSourceFinishedActions = new MatTableDataSource<ActionItem>();
  dataSourceArchiveActions = new MatTableDataSource<ActionItem>();
  dataSourceRepeatingActions = new MatTableDataSource<ActionItem>();

  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
  }

  ngOnInit(): void {
    let sub = this.actionService.getAll$()
      .subscribe((data: Array<ActionItem>) => {
        data.forEach((item) => {
          this.actionList.add(item.Id, item);
        });
        this.createFilters();
      });
    this.registerSubscription(sub);

    // this.actionService.GetSome().values().forEach(element => {this.actionList.add(element.Id, element); });
  }

  createFilters(): void {
    this.filterOpenValues.Voornaam = '';
    this.dataSourceOpenActions.data = this.actionList.values();
    this.dataSourceOpenActions.filterPredicate = this.createOpenActionFilter();
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);

    this.filterOpenValues.Voornaam = '';
    this.dataSourceFinishedActions.data = this.actionList.values();
    this.dataSourceFinishedActions.filterPredicate = this.createFinishedActionFilter();
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);

    this.filterArchiveValues.Voornaam = '';
    this.dataSourceArchiveActions.data = this.actionList.values();
    this.dataSourceArchiveActions.filterPredicate = this.createArchiveActionFilter();
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);

    this.filterRepeatingValues.Voornaam = '';
    this.dataSourceRepeatingActions.data = this.actionList.values();
    this.dataSourceRepeatingActions.filterPredicate = this.createRepeatingActionFilter();
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);

  }

  refreshFilters(): void {
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);
  }

  triggerCallback: boolean = false;
  setCallBackParameters(index: number, dataSource: MatTableDataSource<ActionItem>, func) {
    const actionItem = dataSource.filteredData[index];
    this.theBoundCallback = func.bind(this, actionItem);
  }

  /***************************************************************************************************
  / Open Actions Table Add Knop
  /***************************************************************************************************/
  onAddOpenAction(): void {
    const toBeAdded = new ActionItem();
    toBeAdded.StartDate = new Date().to_YYYY_MM_DD();
    toBeAdded.Status = '0';
    this.addAction(toBeAdded);
  }

  addAction(toBeAdded: ActionItem): void {
    // let tmp;
    this.dialog.open(TodoListDialogComponent, {
      data: { 'method': 'Toevoegen', 'data': toBeAdded },
      disableClose: true
    })
      .afterClosed()  // returns an observable
      .subscribe(result => {
        if (result) {  // in case of cancel the result will be false
          let sub = this.actionService.create$(result)
            .subscribe(addResult => {
              this.showSnackBar(SnackbarTexts.SuccessNewRecord);
              result.Id = addResult['Key'];
              this.actionList.add(result.Id, result);
              this.refreshFilters();
            },
              (error: AppError) => {
                if (error instanceof DuplicateKeyError) {
                  this.showSnackBar(SnackbarTexts.DuplicateKey);
                } else { throw error; }
              }
            );
          this.registerSubscription(sub);
        }
      });
  }


  /***************************************************************************************************
  / Open Actions Table Done Knop
  /***************************************************************************************************/
  onDoneOpenAction($event, index: number): void {
    this.openActionSpinner = $event;  // openActionSpinner wordt gelezen door spinner
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceOpenActions, this.cbDoneOpenAction)
    }
  }

  /***************************************************************************************************
  / Deze functie wordt aangeroepen vanuit de callback uit de header.
  /***************************************************************************************************/
  cbDoneOpenAction($event): void {
    let toBeEdited: ActionItem = this.actionList.get($event.Id)
    toBeEdited.Status = '1';
    toBeEdited.EndDate = '2020-01-01';
    this.updateAction(toBeEdited);
  }

  updateAction(toBeEdited: ActionItem): void {
    // console.log('updateAction', toBeEdited);
    let sub = this.actionService.update$(toBeEdited)
      .subscribe(data => {
        this.refreshFilters();
        this.showSnackBar(SnackbarTexts.SuccessFulSaved);
      },
        (error: AppError) => {
          if (error instanceof NoChangesMadeError) {
            this.showSnackBar(SnackbarTexts.NoChanges);
          } else { throw error; }
        });
    this.registerSubscription(sub);
  }

  updateActionWithDialog(toBeEdited: ActionItem): void {
    this.dialog.open(TodoListDialogComponent, {
      width: '500px',
      data: {
        method: "Wijzigen",
        data: toBeEdited,
      },
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.updateAction(toBeEdited);
        }
      });
  }

  /***************************************************************************************************
  / Open Actions Table Edit Knop
  /***************************************************************************************************/
  onEditAction(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceOpenActions.filteredData[index];
    this.updateActionWithDialog(toBeEdited);
  }

  /***************************************************************************************************
  / Open Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteOpenAction($event, index: number): void {
    this.openActionSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceOpenActions, this.cbDeleteOpenAction); // wordt 2x aangeroepen omdat na de callback de waarde weer op nul wordt gezet
      // console.log('set call back', index );
    }
  }

  cbDeleteOpenAction($event): void {
    // console.log('in call back', $event );
    let toBeEdited: ActionItem = this.actionList.get($event.Id)
    toBeEdited.Status = '2';
    this.updateAction(toBeEdited);
  }

  /***************************************************************************************************
  / Open Actions Table Dubbel Klik op regels geeft details
  /***************************************************************************************************/
  onDblclickOpenAction($event, index: number): void {
    this.showDetailDialog(this.dataSourceOpenActions.filteredData[index]);
  }

  /***************************************************************************************************
  / Finished Actions Table Edit Knop
  /***************************************************************************************************/
  onEditFinished(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceFinishedActions.filteredData[index];
    this.updateActionWithDialog(toBeEdited);
  }

  /***************************************************************************************************
  / Finished Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteFinishedAction($event, index: number): void {
    this.finishedActionSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceFinishedActions, this.cbDeleteFinishedAction)
    }
  }
  cbDeleteFinishedAction($event): void {
    let toBeDeleted: ActionItem = this.actionList.get($event.Id)
    toBeDeleted.Status = '2';
    this.updateAction(toBeDeleted);
  }

  /***************************************************************************************************
  / Finished Actions Table Dubbel Klik op regels geeft details
  /***************************************************************************************************/
  onDblclickFinishedAction($event, index: number): void {
    this.showDetailDialog(this.dataSourceFinishedActions.filteredData[index]);
  }

  /***************************************************************************************************
  / Open Actions Table Add Knop
  /***************************************************************************************************/
  onAddRepeatingAction(): void {
    const toBeAdded = new ActionItem();
    toBeAdded.StartDate = new Date().to_YYYY_MM_DD();
    toBeAdded.Status = '9';
    this.addAction(toBeAdded);
  }

  /***************************************************************************************************
  / Repeating Actions Table Done Knop
  /***************************************************************************************************/
  onDoneRepeatingAction($event, index: number): void {
    this.repeatingActionSpinner = $event;  // RepeatingActionSpinner wordt gelezen door spinner
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceRepeatingActions, this.cbDoneRepeatingAction)
    }
  }

  /***************************************************************************************************
  / Deze functie wordt aangeroepen vanuit de callback uit de header.
  /***************************************************************************************************/
  cbDoneRepeatingAction($event): void {
    let toBeEdited: ActionItem = this.actionList.get($event.Id)
    toBeEdited.StartDate = moment(toBeEdited.StartDate).add(1, 'year').toDate().to_YYYY_MM_DD();
    toBeEdited.TargetDate = moment(toBeEdited.TargetDate).add(1, 'year').toDate().to_YYYY_MM_DD();
    this.updateAction(toBeEdited);

  }

  /***************************************************************************************************
  / Repeating Actions Table Edit Knop
  /***************************************************************************************************/
  onEditRepeatingAction(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceRepeatingActions.filteredData[index];
    this.updateActionWithDialog(toBeEdited);
  }

  /***************************************************************************************************
  / Repeating Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteRepeatingAction($event, index: number): void {
    this.repeatingActionSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceRepeatingActions, this.deleteAction); // wordt 2x aangeroepen omdat na de callback de waarde weer op nul wordt gezet
      // console.log('set call back', index );
    }
  }

  /***************************************************************************************************
  / Repeating Actions Table Dubbel Klik op regels geeft details
  /***************************************************************************************************/
  onDblclickRepeatingAction($event, index: number): void {
    this.showDetailDialog(this.dataSourceRepeatingActions.filteredData[index]);
  }

  /***************************************************************************************************
  / Archived Actions Table Edit Knop
  /***************************************************************************************************/
  onEditArchived(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceArchiveActions.filteredData[index];

    this.dialog.open(TodoListDialogComponent, {
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
  / Archived Actions Table Dubbel Klik op regels geeft details
  /***************************************************************************************************/
  onDblclickArchiveAction($event, index: number): void {
    this.showDetailDialog(this.dataSourceArchiveActions.filteredData[index]);
  }


  /***************************************************************************************************
  / Archived Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteArchiveAction($event, index: number): void {
    this.archivedActionSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceArchiveActions, this.deleteAction)
    }
  }

  deleteAction(toBeDeleted: ActionItem): void {
    let sub = this.actionService.delete$(toBeDeleted.Id)
      .subscribe(data => {
        this.actionList.remove(toBeDeleted.Id);
        this.refreshFilters();
        this.showSnackBar(SnackbarTexts.SuccessDelete);
      },
        (error: AppError) => {
          console.log('error', error);
          if (error instanceof NotFoundError) {
            this.showSnackBar(SnackbarTexts.NotFound);
          } else { throw error; } // global error handler
        }
      );
    this.registerSubscription(sub);
  }







  onSliderChanged($event): void {
    if ($event.checked) {
      this.filterOpenValues.Voornaam = this.authService.firstname;
    } else {
      this.filterOpenValues.Voornaam = '';
    }
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);
  }

  onSliderFinishedChanged($event): void {
    if ($event.checked) {
      this.filterFininshedValues.Voornaam = this.authService.firstname;
    } else {
      this.filterFininshedValues.Voornaam = '';
    }
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);
  }

  onSliderRepeatingChanged($event): void {
    if ($event.checked) {
      this.filterRepeatingValues.Voornaam = this.authService.firstname;
    } else {
      this.filterRepeatingValues.Voornaam = '';
    }
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);
  }
  /***************************************************************************************************
  / Show the detail dialog
  /***************************************************************************************************/
  showDetailDialog(item: ActionItem): void {
    this.dialog.open(TodoListDetailDialogComponent, {
      width: '500px',
      data: {
        data: item,
      },
    })
  }

  /***************************************************************************************************
  / This filter is created at initialize of the page.
  /***************************************************************************************************/
  private createOpenActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return ((data.HolderName == searchTerms.Voornaam || searchTerms.Voornaam == '') && data.Status == '0');
    }
    return filterFunction;
  }

  private createFinishedActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return ((data.HolderName == searchTerms.Voornaam || searchTerms.Voornaam == '') && data.Status == '1');
    }
    return filterFunction;
  }

  private createArchiveActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return ((data.HolderName == searchTerms.Voornaam || searchTerms.Voornaam == '') && data.Status == '2');
    }
    return filterFunction;
  }

  private createRepeatingActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return ((data.HolderName == searchTerms.Voornaam || searchTerms.Voornaam == '') && data.Status == '9');
    }
    return filterFunction;
  }

}