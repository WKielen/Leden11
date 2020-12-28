import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserItem, UserService } from 'src/app/services/user.service';
import { DuplicateKeyError } from 'src/app/shared/error-handling/duplicate-key-error';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { MailItem, MailService } from 'src/app/services/mail.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register.dialog.html',
  styles: ['mat-form-field {width: 100%; }',
    `.internalcard {border: 1px solid rgba(0, 0, 0, 0.03); box-shadow: 2px 5px 5px lightgrey;
                margin: 15px; border-radius: 5px;}`,
    '.internalcardcontent { margin: 10px 10px 10px 20px;'
  ],
  providers: [{ provide: 'param', useValue: 'progress' }]
})

// De provider is om door een param door te geven aan de MailService.
// Dit lukt nog niet.

export class RegisterDialogComponent extends BaseComponent {

  showPw: boolean = false;
  responseText: string = '';
  boxColor: string = '#85e085';

  registerForm = new FormGroup({
    firstname: new FormControl(
      '',
      [Validators.required]
    ),
    lastname: new FormControl(
      '',
      [Validators.required]
    ), email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    userid: new FormControl(
      '',
      [Validators.required]
    ),
    password: new FormControl(
      '',
      [Validators.required, Validators.minLength(6)]
    ),
  });

  constructor(
    private userService: UserService,
    private mailService: MailService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
  ) {
    super()
  }

  /***************************************************************************************************
  /
  /***************************************************************************************************/
  async onSubmit() {
    let user = new UserItem();
    user.Userid = this.userid.value;
    user.Email = this.email.value;
    user.FirstName = this.firstname.value;
    user.LastName = this.lastname.value;
    user.Password = this.password.value;

    this.userService.register$(user)
      .subscribe(addResult => {
        if (addResult.hasOwnProperty('Key')) {
          this.responseText = 'Registratie gelukt. \nNa goedkeuring door de vereniging krijg je een mail dat je account is geactiveerd. Vanaf dat moment kan je aanloggen.';
          this.boxColor = "#85e085";
          this.sendMail(user);
        } else {
          this.responseText = addResult;
        }
      },
        (error: AppError) => {
          if (error instanceof DuplicateKeyError) {
            this.responseText = "Deze gebruiker bestaat al";
            this.boxColor = "#ff6666";
          } else { throw error; }
        }
      );

  }

  sendMail(credentials: UserItem) {
    let mailItems: Array<MailItem> = [];
    let mailItem: MailItem = new MailItem();
    mailItem.To = 'secretaris@ttvn.nl';
    mailItem.ToName = 'Secretaris - TTVN';
    mailItem.Subject = "Aanmelding gebruiker TTVN app";
    mailItem.Message = "Naam   : " + credentials.FirstName + " " + credentials.FirstName + "<br>" +
                       "Userid : " + credentials.Userid + "<br>" +
                       "Email  : " + credentials.Email
    mailItems.push(mailItem);
    this.mailService.mail$(mailItems).subscribe();
  }

  /***************************************************************************************************
  / Properties
  /***************************************************************************************************/
  get firstname() {
    return this.registerForm.get('firstname');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get userid() {
    return this.registerForm.get('userid');
  }
  get password() {
    return this.registerForm.get('password');
  }
}


