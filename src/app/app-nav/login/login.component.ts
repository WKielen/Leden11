import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in.dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public signinDialog: MatDialog,
  ) { }

  openSigninDialog(): void {
    this.signinDialog.open(SignInDialogComponent, {
      panelClass: 'custom-dialog-container', width: '400px',
    });
  }
}
