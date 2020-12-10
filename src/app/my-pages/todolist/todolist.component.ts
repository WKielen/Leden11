import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActionItem, ActionService } from 'src/app/services/action.service';
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
  dataSource = new MatTableDataSource<ActionItem>();

  constructor(private actionService: ActionService,
    protected notificationService: NotificationService,
    protected snackBar: MatSnackBar,
    public dialog: MatDialog) {
    super(snackBar)
}

  ngOnInit(): void {
    this.actionList = this.actionService.GetSome();
    this.dataSource.data = this.actionList;
  }

  onAddAction(): void {
    console.log('Add action', );
  }
  onDoneAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
    if (this.deleteprogress1 != 100) return;
    this.deleteprogress1 = 0;

    console.log('Done action', );
  }
  onEditAction(index: number): void {
    console.log('Edit action', );
  }
  onDeleteAction($event, index: number): void {
    this.deleteprogress1 = $event / 10;
    if (this.deleteprogress1 != 100) return;
    this.deleteprogress1 = 0;

    console.log('Delete action', );
  }
  onDblclickAction($event, index: number): void {
    console.log('Double click action', );
  }
}
