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
        naam: new FormControl(
            '',
            [Validators.required]
        ),
        email: new FormControl(
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
    ) { super()
    }

    /***************************************************************************************************
    /
    /***************************************************************************************************/
    async onSubmit() {
        let user = new UserItem();
        user.Userid = this.userid.value;
        user.Email = this.email.value;
        user.Name = this.naam.value;
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

    sendMail(credentials: Object) {
        let mailItems: Array<MailItem> = [];
        let mailItem: MailItem = new MailItem();
        mailItem.To = 'secretaris@ttvn.nl';
        mailItem.ToName = 'Secretaris - TTVN';
        mailItem.Subject = "Aanmelding gebruiker TTVN app";
        mailItem.Message = JSON.stringify(credentials);
        mailItems.push(mailItem);
        this.mailService.mail$(mailItems).subscribe();
    }

    /***************************************************************************************************
    / Properties
    /***************************************************************************************************/
    get naam() {
        return this.registerForm.get('naam');
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

const toCharCodes = (arr: Uint8Array) => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return arr.map(x => validChars.charCodeAt(x % validChars.length));
}

const bufferToBase64UrlEncoded = (input: ArrayBuffer) => {
    const bytes = new Uint8Array(input);
    return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)));
}

const urlEncodeBase64 = (input: string) => {
    const chars = { '+': '-', '/': '_', '=': '' };
    return input.replace(/[\+\/=]/g, m => chars[m]);
}



