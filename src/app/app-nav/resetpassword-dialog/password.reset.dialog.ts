import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserItem, UserService } from 'src/app/services/user.service';
import { MailItem, MailService } from 'src/app/services/mail.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { passwordMatchValidator } from './passwordValidator';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { ParentComponent } from 'src/app/shared/parent.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';

@Component({
  selector: 'app-password-reset-dialog',
  templateUrl: './password.reset.dialog.html',
  styles: ['mat-form-field {width: 100%; }',
    `.internalcard {border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 2px 5px 5px lightgrey;
                margin: 15px; border-radius: 5px;}`,
    '.internalcardcontent { margin: 10px 10px 10px 20px;'
  ],
  providers: [{ provide: 'param', useValue: 'progress' }]
})

// De provider is om door een param door te geven aan de MailService.
// Dit lukt nog niet.

export class ResetPasswordDialogComponent extends ParentComponent {

  showPw: boolean = false;
  responseText: string = '';
  boxColor: string = '#85e085';

  registerForm = new FormGroup({
    userid: new FormControl(
      '',
      [Validators.required]
    ),
    password1: new FormControl(
      '',
      [Validators.required, Validators.minLength(6)]
    ),
    password2: new FormControl(
      '',
      [Validators.required]
    )
  }, { validators: passwordMatchValidator }
  );

  constructor(
    private userService: UserService,
    private mailService: MailService,
    protected snackBar: MatSnackBar,

    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
  ) {
    super(snackBar)

  }

  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch'))
      this.password2.setErrors([{ 'passwordMismatch': true }]);
    else
      this.password2.setErrors(null);
  }

  onChangePassword() {
    let user = new UserItem();
    user.Userid = this.userid.value;
    user.ProposedPassword = this.password1.value;
    user.ChangePasswordToken = 'xyz';

    this.registerSubscription(
      this.userService.storeNewPassword$(user)
        .subscribe(data => {
          this.responseText = "Je ontvangt een mail met een link. Als je op deze link klikt dan wordt je nieuwe password geactiveerd."
        },
          (error: AppError) => {
            if (error instanceof NoChangesMadeError) {
              this.showSnackBar(SnackbarTexts.NoChanges);
            } else { throw error; }
          })
    );






    // nu moeten we dit password opslaan en bij de userid en gebruiker deactiveren

    // De email moet een link bevatten die een webservice aanroept. 
    // als de call goed gaat dan moet er een de userid gepakt worden en het passoword worden vervanngen
    /* console.log('hash', hash, x) */
    // de gebruiker wordt nu doorgelinkt naar de login pagina. of een pagina waarin staat dat de login is gelukt
  }

  sendMail(credentials: Object) {
    /* let mailItems: Array<MailItem> = [];
    let mailItem: MailItem = new MailItem();
    mailItem.To = 'secretaris@ttvn.nl';
    mailItem.ToName = 'Secretaris - TTVN';
    mailItem.Subject = "Aanmelding gebruiker TTVN app";
    mailItem.Message = JSON.stringify(credentials);
    mailItems.push(mailItem);
    this.mailService.mail$(mailItems).subscribe(); */
  }

  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/

  get userid() {
    return this.registerForm.get('userid');
  }
  get password1() {
    return this.registerForm.get('password1');
  }
  get password2() {
    return this.registerForm.get('password2');
  }

}

const toCharCodes = (arr: Uint8Array) => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return arr.map(x => validChars.charCodeAt(x % validChars.length));
}




