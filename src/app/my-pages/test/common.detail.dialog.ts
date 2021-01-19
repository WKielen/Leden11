import { Component, ContentChild, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Widget } from './temp/widget.interface';
import { WIDGET } from './temp/widget.token';

@Component({
    selector: 'app-detail-dialog',
    templateUrl: './common.detail.dialog.html',
    styleUrls: ["./common.detail.dialog.scss"],
})
export class DetailDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog,
    ) {
    }
    public showButtons: boolean = true;

    ngOnInit() {

    }

    onClickModify() {
    }

    onClickCopy() {
    }

    onClickDelete() {

    }
}
