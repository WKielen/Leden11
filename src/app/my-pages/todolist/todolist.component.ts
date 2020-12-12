import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ParentComponent } from 'src/app/shared/parent.component';

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
  filterValues = {
    LidNr: '',
  };
  dataSource = new MatTableDataSource<ActionItem>();




  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected authService: AuthService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
}

  ngOnInit(): void {
    this.actionList = this.actionService.GetSome();
    this.dataSource.data = this.actionList;
    this.dataSource.filterPredicate = this.createFilter();
    this.filterValues.LidNr = '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  onAddAction(): void {
    console.log('Add action', );
  }
  onDoneAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
  }

  onHoldAction($event): void {   // uit de header
    console.log('onHoldAction',$event );
  }

  onEditAction(index: number): void {
    console.log('Edit action', );
  }
  onDeleteAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
  }
  onDblclickAction($event, index: number): void {
    console.log('Double click action', );
  }

  onSliderChanged($event): void {
    if ($event.checked) {
      this.filterValues.LidNr = this.authService.LidNr;
    } else {
      this.filterValues.LidNr = '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  /***************************************************************************************************
  / This filter is created at initialize of the page.
  /***************************************************************************************************/
  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.LidNr == searchTerms.LidNr || searchTerms.LidNr == '';
    }
    return filterFunction;
  }


}
