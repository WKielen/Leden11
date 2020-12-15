import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Dictionary } from 'src/app/shared/modules/Dictionary';
import { ParentComponent } from 'src/app/shared/parent.component';
import { TodoListDetailDialogComponent } from './todolist.detail.dialog';
import { TodoListDialogComponent } from './todolist.dialog';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent extends ParentComponent implements OnInit {

  public theBoundCallback: Function;

  deleteprogress1 = 0;
  deleteprogress2 = 0;
  deleteprogress3 = 0;

  headerToggleChecked: boolean = false;
  actionList: Dictionary = new Dictionary([]);

  columnsOpenToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'TargetDate', 'actions3'];
  columnsFinishedToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'EndDate', 'actions2'];
  columnsArchiveToDisplay: string[] = ['Title', 'HolderName', 'StartDate', 'EndDate', 'actions2'];

  filterOpenValues = { Voornaam: '' };
  filterFininshedValues = { Voornaam: '' };
  filterArchiveValues = { Voornaam: '' };

  dataSourceOpenActions = new MatTableDataSource<ActionItem>();
  dataSourceFinishedActions = new MatTableDataSource<ActionItem>();
  dataSourceArchiveActions = new MatTableDataSource<ActionItem>();

  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
  }

  ngOnInit(): void {

    this.actionList = this.actionService.GetSome();

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
  }

  refreshFilters() {
    this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);
    this.dataSourceFinishedActions.filter = JSON.stringify(this.filterFininshedValues);
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);
  }

  triggerCallback: boolean = false;
  mooieNaam($event, index: number, dataSource: MatTableDataSource<ActionItem>, func) {
    if ($event == 0) {  // first time call
      const actionItem = dataSource.filteredData[index];
      this.theBoundCallback = func.bind(this, actionItem);
    }
  }

  /***************************************************************************************************
  / Open Actions Table Add Knop
  /***************************************************************************************************/
  onAddOpenAction(): void {
    const toBeAdded = new ActionItem();
    toBeAdded.StartDate = new Date().to_YYYY_MM_DD();
    toBeAdded.Status = '0';

    // let tmp;
    this.dialog.open(TodoListDialogComponent, {
      data: { 'method': 'Toevoegen', 'data': toBeAdded },
      disableClose: true
    })
      .afterClosed()  // returns an observable
      .subscribe(result => {
        if (result) {  // in case of cancel the result will be false
          this.actionList.add(result.Id, result);


          // let sub = this.ledenService.create$(result)
          //   .subscribe(addResult => {
          //     result.Naam = LedenItem.getFullNameAkCt(result.Voornaam, result.Tussenvoegsel, result.Achternaam);
          //     result.LeeftijdCategorieBond = DateRoutines.LeeftijdCategorieBond(result.GeboorteDatum);
          //     result.Leeftijd = DateRoutines.Age(result.GeboorteDatum);


          //     result.VolledigeNaam = LedenItem.getFullNameVtA(result.Voornaam, result.Tussenvoegsel, result.Achternaam);

          //     this.dataSource.data.unshift(result);

          //     this.refreshTableLayout();
          //     this.showSnackBar(SnackbarTexts.SuccessNewRecord);

          //     if (LedenItem.GetEmailList(toBeAdded).length > 0) {
          //       this.showMailDialog(toBeAdded, 'add');
          //     }

          //     let message = "Nieuw lid: " + result.VolledigeNaam + " , " + result.Leeftijd + " jaar"
          //     this.notificationService.sendNotificationsForRole([ROLES.BESTUUR], "Ledenadministratie", message);
          //   },
          //     (error: AppError) => {
          //       if (error instanceof DuplicateKeyError) {
          //         this.showSnackBar(SnackbarTexts.DuplicateKey);
          //       } else { throw error; }
          //     }
          //   );
          // this.registerSubscription(sub);
          this.dataSourceOpenActions.filter = JSON.stringify(this.filterOpenValues);

        }
      });
  }


  /***************************************************************************************************
  / Open Actions Table Done Knop
  /***************************************************************************************************/
  onDoneOpenAction($event, index: number): void {
    this.deleteprogress1 = $event;
    this.mooieNaam($event, index, this.dataSourceOpenActions, this.cbDoneOpenAction)
  }

  /***************************************************************************************************
  / Deze functie wordt aangeroepen vanuit de callback uit de header.
  /***************************************************************************************************/
  cbDoneOpenAction($event) {
    let action: ActionItem = this.actionList.get($event.Id)
    action.Status = '1';
    action.EndDate = '2020-01-01';
    this.refreshFilters();
  }

  /***************************************************************************************************
  / Open Actions Table Edit Knop
  /***************************************************************************************************/
  onEditAction(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceOpenActions.filteredData[index];

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
  / Open Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteOpenAction($event, index: number): void {
    this.deleteprogress1 = $event;
    this.mooieNaam($event, index, this.dataSourceOpenActions, this.cbDeleteOpenAction)
  }

  cbDeleteOpenAction($event): void {
    let action: ActionItem = this.actionList.get($event.Id)
    action.Status = '2';
    this.refreshFilters();
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


  /***************************************************************************************************
  / Finished Actions Table Edit Knop
  /***************************************************************************************************/
  onEditFinished(index: number): void {
    let toBeEdited: ActionItem = this.dataSourceFinishedActions.filteredData[index];

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
  / Finished Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteFinishedAction($event, index: number): void {
    this.deleteprogress2 = $event;
    this.mooieNaam($event, index, this.dataSourceFinishedActions, this.cbDeleteFinishedAction)
  }

  cbDeleteFinishedAction($event): void {
    let action: ActionItem = this.actionList.get($event.Id)
    action.Status = '2';
    this.refreshFilters();
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
  / Archived Actions Table Delete Knop
  / De actie zelf gaat via het event uit de header onHoldAction
  /***************************************************************************************************/
  onDeleteArchiveAction($event, index: number): void {
    this.deleteprogress3 = $event;
    this.mooieNaam($event, index, this.dataSourceArchiveActions, this.cbDeleteArchiveAction)
  }

  cbDeleteArchiveAction($event): void {
    this.actionList.remove($event.Id);
    this.dataSourceArchiveActions.filter = JSON.stringify(this.filterArchiveValues);
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
}