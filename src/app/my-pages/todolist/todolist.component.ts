import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService, ACTIONSTATUS } from 'src/app/services/action.service';
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
import { DecisionDialogComponent } from './decision.dialog';
import { ROLES } from 'src/app/services/website.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent extends ParentComponent implements OnInit {

  public theBoundCallback: Function;
  public amIBestuur: boolean = this.authService.isRole(ROLES.BESTUUR);
  toggleTitle2: string = '';

  openActionSpinner = 0;
  finishedActionSpinner = 0;
  archivedActionSpinner = 0;
  repeatingActionSpinner = 0;
  decisionSpinner = 0;

  headerToggleChecked: boolean = false;
  actionList: Dictionary = new Dictionary([]);

  columnsOpenToDisplay: string[] = ['Id', 'Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];
  columnsFinishedToDisplay: string[] = ['Id', 'Title', 'HolderName', 'StartDate', 'EndDate', 'actions2'];
  columnsArchiveToDisplay: string[] = ['Id', 'Title', 'HolderName', 'StartDate', 'EndDate', 'actions2'];
  columnsRepeatingToDisplay: string[] = ['Id', 'Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];
  columnsDecisionsToDisplay: string[] = ['Id', 'Title', 'StartDate', 'actions2'];

  filterOpenValues = { Voornaam: '', ShowOnlyBestuur: false, Status: ACTIONSTATUS.OPEN };
  filterFininshedValues = { Voornaam: '', ShowOnlyBestuur: false, Status: ACTIONSTATUS.CLOSED };
  filterArchiveValues = { Voornaam: '', ShowOnlyBestuur: false, Status: ACTIONSTATUS.ARCHIVED };
  filterDecisionValues = { Voornaam: '', ShowOnlyBestuur: false, Status: ACTIONSTATUS.DECISION };
  filterRepeatingValues = { Voornaam: '', ShowOnlyBestuur: false, Status: ACTIONSTATUS.REPEATING };

  dataSourceOpenActions = new MatTableDataSource<ActionItem>();
  dataSourceFinishedActions = new MatTableDataSource<ActionItem>();
  dataSourceArchiveActions = new MatTableDataSource<ActionItem>();
  dataSourceRepeatingActions = new MatTableDataSource<ActionItem>();
  dataSourceDecisions = new MatTableDataSource<ActionItem>();

  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
  }

  ngOnInit(): void {

    this.registerSubscription(
      this.actionService.getAllActions$()
        .subscribe({
          next: (data) => {
            if (data) {
              data.forEach((item) => {
                this.actionList.add(item.Id, item);
              });
            }
            this.createFilters();
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    );

    if (this.amIBestuur) {
      this.toggleTitle2 = "Alleen bestuur"
    }


    // this.actionService.GetSome().values().forEach(element => {this.actionList.add(element.Id, element); });
  }

  createFilters(): void {
    this.filterOpenValues.Voornaam = '';
    this.dataSourceOpenActions.data = this.actionList.values;
    this.dataSourceOpenActions.filterPredicate = this.createActionFilter();
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);

    this.filterOpenValues.Voornaam = '';
    this.dataSourceFinishedActions.data = this.actionList.values;
    this.dataSourceFinishedActions.filterPredicate = this.createActionFilter();
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);

    this.filterArchiveValues.Voornaam = '';
    this.dataSourceArchiveActions.data = this.actionList.values;
    this.dataSourceArchiveActions.filterPredicate = this.createActionFilter();
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);

    this.filterRepeatingValues.Voornaam = '';
    this.dataSourceRepeatingActions.data = this.actionList.values;
    this.dataSourceRepeatingActions.filterPredicate = this.createActionFilter();
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);

    this.filterDecisionValues.Voornaam = '';
    this.dataSourceDecisions.data = this.actionList.values;
    this.dataSourceDecisions.filterPredicate = this.createActionFilter();
    this.dataSourceDecisions.filter = JSON.stringify(this.filterDecisionValues);
  }

  refreshFilters(): void {
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);
    this.dataSourceDecisions.filter = JSON.stringify(this.filterDecisionValues);
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
    toBeAdded.TargetDate = new Date().to_YYYY_MM_DD();
    toBeAdded.Status = ACTIONSTATUS.OPEN;
    this.addAction(toBeAdded);
  }

  addAction(toBeAdded: ActionItem, component?): void {
    if (!component) {
      console.log('addAction', component);
      component = TodoListDialogComponent;
    }

    this.dialog.open(component, {
      data: { 'method': 'Toevoegen', 'data': toBeAdded },
      disableClose: true
    })
      .afterClosed()  // returns an observable
      .subscribe({
        next: result => {
          if (result) {  // in case of cancel the result will be false
            let sub = this.actionService.create$(result)
              .subscribe({
                next: (data) => {
                  this.showSnackBar(SnackbarTexts.SuccessNewRecord);
                  result.Id = data['Key'];
                  this.actionList.add(result.Id, result);
                  this.refreshFilters();
                },
                error: (error: AppError) => {
                  if (error instanceof DuplicateKeyError) {
                    this.showSnackBar(SnackbarTexts.DuplicateKey);
                  } else { throw error; }
                }
              })
            this.registerSubscription(sub);
          }
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
    toBeEdited.Status = ACTIONSTATUS.CLOSED;
    toBeEdited.EndDate = '2020-01-01';
    this.updateAction(toBeEdited);
  }

  updateAction(toBeEdited: ActionItem): void {
    this.registerSubscription(
      this.actionService.update$(toBeEdited)
        .subscribe({
          next: (data) => {
            this.refreshFilters();
            this.showSnackBar(SnackbarTexts.SuccessFulSaved);
          },
          error: (error: AppError) => {
            if (error instanceof NoChangesMadeError) {
              this.showSnackBar(SnackbarTexts.NoChanges);
            } else { throw error; }
          }
        })
    );
  }

  updateActionWithDialog(toBeEdited: ActionItem, component?): void {
    if (!component)
      component = TodoListDialogComponent;

    this.dialog.open(component, {
      width: '500px',
      data: {
        method: "Wijzigen",
        data: toBeEdited,
      },
    })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.updateAction(toBeEdited);
          }
        },
        error: (error: AppError) => {
          console.log("error", error);
        }
      })
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
    toBeEdited.Status = ACTIONSTATUS.ARCHIVED;
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
    toBeDeleted.Status = ACTIONSTATUS.ARCHIVED;
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
    toBeAdded.TargetDate = new Date().to_YYYY_MM_DD();
    toBeAdded.Status = ACTIONSTATUS.REPEATING;
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
    this.updateActionWithDialog(toBeEdited);
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
      .subscribe({
        next: (data) => {
          this.actionList.remove(toBeDeleted.Id);
          this.refreshFilters();
          this.showSnackBar(SnackbarTexts.SuccessDelete);
        },
        error: (error: AppError) => {
          console.log('error', error);
          if (error instanceof NotFoundError) {
            this.showSnackBar(SnackbarTexts.NotFound);
          } else { throw error; } // global error handler
        }
      })
    this.registerSubscription(sub);
  }


  /***************************************************************************************************
  / Decision Table Add Knop
  /***************************************************************************************************/
  onAddDecision(): void {
    const toBeAdded = new ActionItem();
    toBeAdded.StartDate = new Date().to_YYYY_MM_DD();
    toBeAdded.Status = ACTIONSTATUS.DECISION;
    this.addAction(toBeAdded, DecisionDialogComponent);
  }

  /***************************************************************************************************
  / Decision Table Edit Knop
  /***************************************************************************************************/
  onEditDecision(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceDecisions.filteredData[index];
    console.log('onEditDecision', toBeEdited)
    this.updateActionWithDialog(toBeEdited, DecisionDialogComponent);
  }

  /***************************************************************************************************
  / Decision Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteDecision($event, index: number): void {
    this.decisionSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceDecisions, this.deleteAction); // wordt 2x aangeroepen omdat na de callback de waarde weer op nul wordt gezet
      // console.log('set call back', index );
    }
  }

  /***************************************************************************************************
  / Decision Table Dubbel Klik op regels geeft details
  /***************************************************************************************************/
  onDblclickDecision($event, index: number): void {
    this.showDetailDialog(this.dataSourceDecisions.filteredData[index]);
  }


  onSliderChanged($event): void {
    this.filterOpenValues.Voornaam = $event.checked ? this.authService.firstname : '';
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);
  }
  onSliderChanged2($event): void {
    this.filterOpenValues.ShowOnlyBestuur = $event.checked;
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);
  }
  onSliderFinishedChanged($event): void {
    this.filterFininshedValues.Voornaam = $event.checked ? this.authService.firstname : '';
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);
  }
  onSliderFinishedChanged2($event): void {
    this.filterFininshedValues.ShowOnlyBestuur = $event.checked;
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);
  }
  onSliderRepeatingChanged($event): void {
    this.filterRepeatingValues.Voornaam = $event.checked ? this.authService.firstname : '';
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);
  }
  onSliderRepeatingChanged2($event): void {
    this.filterRepeatingValues.ShowOnlyBestuur = $event.checked;
    this.dataSourceRepeatingActions.filter = JSON.stringify(this.filterRepeatingValues);
  }
  onSliderDecisionChanged($event): void {
    this.filterDecisionValues.ShowOnlyBestuur = $event.checked;
    this.dataSourceDecisions.filter = JSON.stringify(this.filterDecisionValues);
  }
  onSliderArchivedChanged($event): void {
    this.filterArchiveValues.ShowOnlyBestuur = $event.checked;
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);
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
  private createActionFilter(): (data: ActionItem, filter: string) => boolean {
    let filterFunction = function (data: ActionItem, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      // console.log('createActionFilter', data, filter);

      if (searchTerms.ShowOnlyBestuur && data.Role.indexOf(ROLES.BESTUUR) == -1) {
        return false;
      }


      return ((data.HolderName == searchTerms.Voornaam || searchTerms.Voornaam == '') && data.Status == searchTerms.Status);
    }
    return filterFunction;
  }
}
