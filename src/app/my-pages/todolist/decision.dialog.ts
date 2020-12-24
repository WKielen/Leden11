import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValueToDutchDateString } from 'src/app/shared/modules/DateRoutines';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'app-decision-dialog',
    templateUrl: './decision.dialog.html',
})

export class DecisionDialogComponent extends BaseComponent implements OnInit {
    actionItemForm = new FormGroup({
        title: new FormControl(
            '',
            [Validators.required]
        ),
        startdate: new FormControl(
          '',
          [Validators.required]
      ),
        description: new FormControl(),
    });
    public thisIsADecision: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DecisionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
    ) { super()
    }

    ngOnInit(): void {
        this.title.setValue(this.data.data.Title);
        this.startdate.setValue(this.data.data.StartDate);
        this.description.setValue(this.data.data.Description);
    }

    /***************************************************************************************************
    / Sluit dialog
    /***************************************************************************************************/
    onSubmit(): void {
        this.data.data.Title = this.title.value;
        this.data.data.StartDate = FormValueToDutchDateString(this.startdate.value);
        this.data.data.Description = this.description.value;
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
    get description() {
        return this.actionItemForm.get('description');

    }
}
