import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';


@Component({
    selector: 'app-registration-dialog',
    templateUrl: './register.dialog.html',
})

export class RegistrationDialogComponent implements OnInit {
    actionItemForm = new FormGroup({
        userid: new FormControl(
            '',
            [Validators.required]
        ),
        name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        role: new FormControl(),
    });


    constructor(
        public dialogRef: MatDialogRef<RegistrationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        ) {
    }

    ngOnInit(): void {
        this.userid.setValue(this.data.data.Userid);
        this.name.setValue(this.data.data.Name);
        this.email.setValue(this.data.data.Email);
        this.password.setValue(this.data.data.Password);
        this.role.setValue(this.data.data.Role);
    }

    /***************************************************************************************************
    / Sluit dialog
    /***************************************************************************************************/
    onSubmit(): void {
        this.data.data.Userid = this.userid.value;
        this.data.data.Name = this.name.value;
        this.data.data.Email = this.email.value;
        this.data.data.Password = this.password.value;
        this.data.data.Role = this.role.value;

        this.dialogRef.close(this.data.data);
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
    get role() {
        return this.actionItemForm.get('role');
    }
}
