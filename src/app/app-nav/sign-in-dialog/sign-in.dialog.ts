import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE } from 'src/app/shared/classes/Page-Role-Variables';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterDialogComponent } from '../register-dialog/register.dialog';

@Component({
    selector: 'app-signin-dialog',
    templateUrl: './sign-in.dialog.html',
    styles: ['mat-form-field {width: 100%;}']

})
export class SignInDialogComponent {

    showPw = false;
    keepSignedIn: boolean;
    invalidLogin: boolean;

    loginForm = new FormGroup({
        userid: new FormControl(
            '',
            [Validators.required, Validators.minLength(7), Validators.maxLength(7)]
        ),
        password: new FormControl(
            '',
            [Validators.required, Validators.minLength(6)]
        ),
        keepSignedIn: new FormControl()
    });

    constructor(
        private router: Router,
        private authService: AuthService,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<SignInDialogComponent>,
        public registerDialog: MatDialog,

    ) {
        this.testRegisterpage = !environment.production;
    }
    public testRegisterpage: boolean;

    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    onSubmit(): void {
        const credentials = {
            'userid': this.loginForm.value['userid'], 'password': this.loginForm.value['password'],
            'database': environment.databaseName, 'keepsignedin': this.loginForm.value['keepSignedIn'] ? 'true' : 'false'
        };
        this.authService.login$(credentials)
            .subscribe(result => {
                if (result) {
                    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                    this.router.navigate([returnUrl || ROUTE.dashboardPageRoute]);
                    this.dialogRef.close(true);
                } else {
                    this.invalidLogin = true;
                }
            },
                err => {
                    this.invalidLogin = true;
                });

    }

    /***************************************************************************************************
    / 
    /***************************************************************************************************/
    onRegister(): void {
        this.registerDialog.open(RegisterDialogComponent, { width: '400px' });
        this.dialogRef.close();
    }

    onResetPassword(): void {
        this.router.navigate([ROUTE.offlinePageRoute]);
        this.dialogRef.close();
    }

    /***************************************************************************************************
    / Properties
    /***************************************************************************************************/
    get userid() {
        return this.loginForm.get('userid');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
