import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICheckboxDictionaryItem } from 'src/app/shared/components/checkbox.list.component';
import { Role, WebsiteService } from 'src/app/services/website.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { RolesDialogComponent } from './roles.dialog';


@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration.dialog.html',
  styles: ['#right { display: flex; justify-content: flex-end; }']
})

export class RegistrationDialogComponent extends BaseComponent implements OnInit {
  actionItemForm = new FormGroup({
    userid: new FormControl(
      '',
      [Validators.required]
    ),
    name: new FormControl(),
    email: new FormControl(
      '',
      [Validators.email]
    ),
    password: new FormControl(),
    role: new FormControl(),
  });

  public myCheckboxDictionairy: Array<ICheckboxDictionaryItem> = [];
  public roles: Array<Role> = [];

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    public websiteService: WebsiteService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data,
  ) { super()
  }

  ngOnInit(): void {
    this.roles = this.websiteService.getRoles();
    this.roles.forEach(role => {
      let present: boolean = false;
      if (this.data.data.Role.includes(role.Code))
        present = true;
      this.myCheckboxDictionairy.push({ 'DisplayValue': role.DisplayValue, 'Value': present },);
    });

    this.userid.setValue(this.data.data.Userid);
    this.name.setValue(this.data.data.Name);
    this.email.setValue(this.data.data.Email);
    this.password.setValue(this.data.data.Password);
  }

  /***************************************************************************************************
  / Sluit dialog
  /***************************************************************************************************/
  onSubmit(): void {
    this.data.data.Userid = this.userid.value;
    this.data.data.Name = this.name.value;
    this.data.data.Email = this.email.value;
    this.data.data.Password = this.password.value;
    this.data.data.Role = '';

    let rollen:Array<string> = [];
    for (let i = 0; i < this.myCheckboxDictionairy.length; i++) {
      if (this.myCheckboxDictionairy[i].Value)
        rollen.push(this.roles[i].Code)
    }
    this.data.data.Role = rollen.join();
    this.dialogRef.close(this.data.data);
  }
  /******************************************************************************************;
  /
  /***************************************************************************************************/
  onRoleClicked($event): void {
    if ($event instanceof MouseEvent) return;
    this.myCheckboxDictionairy[$event.RowNr].Value = $event.Value;
  }
  /***************************************************************************************************
  /
  /***************************************************************************************************/
  onShowRoles() {
    this.dialog.open(RolesDialogComponent, {
      data: ''
  })
  }

  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/
  get userid() {
    return this.actionItemForm.get('userid');
  }
  get name() {
    return this.actionItemForm.get('name');
  }
  get email() {
    return this.actionItemForm.get('email');
  }
  get password() {
    return this.actionItemForm.get('password');
  }
}
