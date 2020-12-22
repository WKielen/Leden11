import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserItem, UserService } from 'src/app/services/user.service';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { DuplicateKeyError } from 'src/app/shared/error-handling/duplicate-key-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { Dictionary } from 'src/app/shared/modules/Dictionary';
import { ParentComponent } from 'src/app/shared/parent.component';
import { RegistrationDetailDialogComponent } from './registration.detail.dialog';
import { RegistrationDialogComponent } from './registration.dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends ParentComponent implements OnInit {

  public theBoundCallback: Function;

  newRegistrationSpinner = 0;
  existingRegistrationSpinner = 0;

  headerToggleChecked: boolean = false;
  registerList: Dictionary = new Dictionary([]);
  columnsNewToDisplay: string[] = ['Name', 'Userid', 'Email', 'actions3'];
  columnsExistingToDisplay: string[] = ['Name', 'Userid', 'Email', 'actions2'];

  dataSourceNewRegistrations = new MatTableDataSource<UserItem>();
  dataSourceExistingRegistrations = new MatTableDataSource<UserItem>();

  constructor(private registerService: UserService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
  }

  ngOnInit(): void {
    let sub = this.registerService.getAll$()
      .subscribe((data: Array<UserItem>) => {
        data.forEach((item) => {
          this.registerList.add(item.Userid, item);
        });
        this.createFilters();
      });
    this.registerSubscription(sub);
  }


  /***************************************************************************************************
  / Filters
  /***************************************************************************************************/
  createFilters(): void {
    this.dataSourceNewRegistrations.data = this.registerList.values();
    this.dataSourceNewRegistrations.filterPredicate = this.createRegisterFilter();

    this.dataSourceExistingRegistrations.data = this.registerList.values();
    this.dataSourceExistingRegistrations.filterPredicate = this.createRegisterFilter();

    this.refreshFilters();
  }

  refreshFilters(): void {
    this.dataSourceNewRegistrations.filter = JSON.stringify({ Activated: '0' });
    this.dataSourceExistingRegistrations.filter = JSON.stringify({ Activated: '1' });
  }


  /***************************************************************************************************
  / Callback from the timer buttons
  /***************************************************************************************************/
  triggerCallback: boolean = false;
  setCallBackParameters(index: number, dataSource: MatTableDataSource<UserItem>, func) {
    const registerItem = dataSource.filteredData[index];
    this.theBoundCallback = func.bind(this, registerItem);
  }

  /***************************************************************************************************
  / New Registrations
  /***************************************************************************************************/
  onAddRegistration(): void {
    const toBeAdded = new UserItem();
    toBeAdded.Activated = '0';

    // let tmp;
    this.dialog.open(RegistrationDialogComponent, {
      data: { 'method': 'Toevoegen', 'data': toBeAdded },
      disableClose: true
    })
      .afterClosed()  // returns an observable
      .subscribe(result => {
        if (result) {  // in case of cancel the result will be false
          let sub = this.registerService.create$(result)
            .subscribe(addResult => {
              this.showSnackBar(SnackbarTexts.SuccessNewRecord);
              this.registerList.add(result.Userid, result);
              this.dataSourceNewRegistrations.filter = JSON.stringify({ Activated: '0' });
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

  onDoneNewRegistration($event, index: number): void {
    this.newRegistrationSpinner = $event;  // openRegisterSpinner wordt gelezen door spinner
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceNewRegistrations, this.cbDoneNewRegistration)
    }
  }
  cbDoneNewRegistration($event): void {
    let toBeEdited: UserItem = this.registerList.get($event.Userid)
    toBeEdited.Activated = '1';
    this.updateRegister(toBeEdited);
  }


  onEditNewRegistation(index: number): void {
    let toBeEdited: UserItem = this.dataSourceNewRegistrations.filteredData[index];
    this.updateRegistrationWithDialog(toBeEdited);
  }


  onDeleteNewRegistation($event, index: number): void {
    this.newRegistrationSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceNewRegistrations, this.cbDeleteNewRegistation); // wordt 2x aangeroepen omdat na de callback de waarde weer op nul wordt gezet
    }
  }
  cbDeleteNewRegistation($event): void {
    // console.log('in call back', $event );
    let toBeEdited: UserItem = this.registerList.get($event.Userid)
    this.cbDeleteRegister(toBeEdited);
  }


  onDblclickNewRegistration($event, index: number): void {
    this.showDetailDialog(this.dataSourceNewRegistrations.filteredData[index]);
  }


  /***************************************************************************************************
  / Existing Registrations
  /***************************************************************************************************/
  onEditExistingRegistration(index: number): void {
    let toBeEdited: UserItem = this.dataSourceExistingRegistrations.filteredData[index];
    this.updateRegistrationWithDialog(toBeEdited);
  }

  onDeleteExistingRegistation($event, index: number): void {
    this.existingRegistrationSpinner = $event;
    if ($event == 0) {  // first time call
      this.setCallBackParameters(index, this.dataSourceExistingRegistrations, this.cbDeleteRegister)
    }
  }

  onDblclickExistingRegistration($event, index: number): void {
    this.showDetailDialog(this.dataSourceExistingRegistrations.filteredData[index]);
  }

  /***************************************************************************************************
  /
  /***************************************************************************************************/
  updateRegister(toBeEdited: UserItem): void {
    // console.log('updateRegister', toBeEdited);
    let sub = this.registerService.update$(toBeEdited)
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

  updateRegistrationWithDialog(toBeEdited: UserItem): void {
    this.dialog.open(RegistrationDialogComponent, {
      width: '500px',
      data: {
        method: "Wijzigen",
        data: toBeEdited,
      },
    })
      .afterClosed()
      .subscribe(result => {
        if (result)
          this.updateRegister(toBeEdited);
      });
  }

  cbDeleteRegister(toBeDeleted): void {
    let sub = this.registerService.delete$(toBeDeleted.Userid)
      .subscribe(data => {
        this.registerList.remove(toBeDeleted.Userid);
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

  showDetailDialog(item: UserItem): void {
    this.dialog.open(RegistrationDetailDialogComponent, {
      width: '500px',
      data: {
        data: item,
      },
    })
  }

  /***************************************************************************************************
  / This filter is created at initialize of the page.
  /***************************************************************************************************/
  private createRegisterFilter(): (data: UserItem, filter: string) => boolean {
    let filterFunction = function (data: UserItem, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.Activated == searchTerms.Activated);
    }
    return filterFunction;
  }
}
