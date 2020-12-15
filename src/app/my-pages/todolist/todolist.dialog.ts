import { Component, Inject, OnInit, Input } from '@angular/core';
// import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';


@Component({
    selector: 'app-action-dialog',
    templateUrl: './todolist.dialog.html',
})

// Title
// TargetDate
// Description
// HolderName



export class TodoListDialogComponent implements OnInit {
    actionItemForm = new FormGroup({
        title: new FormControl(
            '',
            [Validators.required]
        ),
        targetdate: new FormControl(),
        description: new FormControl(),
        holdername: new FormControl(),
    });


    constructor(
        public dialogRef: MatDialogRef<TodoListDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        // private adapter: DateAdapter<any>
        ) {
        // this.adapter.setLocale('nl');
    }

    ngOnInit(): void {
        this.title.setValue(this.data.data.Title);
        this.targetdate.setValue(this.data.data.TargetDate);
        this.description.setValue(this.data.data.Description);
        this.holdername.setValue(this.data.data.HolderName);
    }

    /***************************************************************************************************
    / Sluit dialog
    /***************************************************************************************************/
    onSubmit(): void {
        this.data.data.Title = this.title.value;
        this.data.data.TargetDate = FormValueToDutchDateString(this.targetdate.value);
        this.data.data.Description = this.description.value;
        this.data.data.HolderName = this.holdername.value;
        this.dialogRef.close(this.data.data);
    }

    /***************************************************************************************************
    / Properties
    /***************************************************************************************************/
    get title() {
        return this.actionItemForm.get('title');
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
}
