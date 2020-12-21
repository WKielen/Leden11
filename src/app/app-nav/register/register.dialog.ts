import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';
import { CheckboxDictionairy } from 'src/app/shared/components/checkbox.list.component';
import { ROLES } from 'src/app/shared/classes/Page-Role-Variables';


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
        email: new FormControl(
            '',
            [Validators.email]
        ),
        password: new FormControl(),
        role: new FormControl(),
    });

    myCheckboxDictionairy: CheckboxDictionairy[] = [
        { 'Id': ROLES.BESTUUR, 'Value': 'Bestuur' },
        { 'Id': ROLES.JC, 'Value': 'Jeugdcommissie' },
        { 'Id': ROLES.TRAINER, 'Value': 'Trainer' },
        { 'Id': ROLES.LEDENADMIN, 'Value': 'Ledenadministratie' },
        { 'Id': ROLES.PENNINGMEESTER, 'Value': 'Penningmeester' },
        { 'Id': ROLES.TEST, 'Value': 'Test pagina\'s' },
        { 'Id': ROLES.ADMIN, 'Value': 'Admin' },
    ];
    stringWithRoles:string = 'BS';


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
    / 
    /***************************************************************************************************/
    onRoleClicked($event): void {
        console.log('onRoleClicked', $event, this.stringWithRoles);
        // // I don't why but I also get a MouseEvent here. I just ignore it.
        // if (!this.lidRol || $event instanceof MouseEvent) {
        //     return;
        // }
        // this.lidRol.Rol = $event.type;
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
