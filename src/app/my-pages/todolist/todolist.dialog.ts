import { Component, Inject, OnInit, Input } from '@angular/core';
// import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';
import { BaseComponent } from 'src/app/shared/base.component';
import { ROLES } from 'src/app/services/website.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './todolist.dialog.html',
})

export class TodoListDialogComponent extends BaseComponent implements OnInit {
  actionItemForm = new FormGroup({
    title: new FormControl(
      '',
      [Validators.required]
    ),
    startdate: new FormControl(),
    targetdate: new FormControl(),
    description: new FormControl(),
    holdername: new FormControl(),
    bestuuronly: new FormControl(),
  });
  public thisIsADecision: boolean = false;
  public amIBestuur: boolean = this.authService.isRole(ROLES.BESTUUR);

  constructor(
    public dialogRef: MatDialogRef<TodoListDialogComponent>,
    public authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    super()
  }

  ngOnInit(): void {
    this.title.setValue(this.data.data.Title);
    this.startdate.setValue(this.data.data.StartDate);
    this.targetdate.setValue(this.data.data.TargetDate);
    this.description.setValue(this.data.data.Description);
    if (this.data.data.Role.indexOf(ROLES.BESTUUR) !== -1) {
      this.bestuuronly.setValue(true);
    }
    this.holdername.setValue(this.data.data.HolderName);
  }

  /***************************************************************************************************
  / Sluit dialog
  /***************************************************************************************************/
  onSubmit(): void {
    this.data.data.Title = this.title.value;
    this.data.data.TargetDate = FormValueToDutchDateString(this.targetdate.value);
    this.data.data.StartDate = FormValueToDutchDateString(this.startdate.value);
    this.data.data.Description = this.description.value;
    this.data.data.HolderName = this.holdername.value;
    this.data.data.Role = this.bestuuronly.value ? ROLES.BESTUUR : '';
    this.dialogRef.close(this.data.data);
  }

  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/
  get title() {
    return this.actionItemForm.get('title');
  }
  get startdate() {
    return this.actionItemForm.get('startdate');
  }
  get targetdate() {
    return this.actionItemForm.get('targetdate');
  }
  get description() {
    return this.actionItemForm.get('description');
  }
  get holdername() {
    return this.actionItemForm.get('holdername');
  }
  get bestuuronly() {
    return this.actionItemForm.get('bestuuronly');
  }
}
