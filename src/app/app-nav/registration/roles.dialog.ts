import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dictionary } from 'src/app/shared/modules/Dictionary';
import { CheckboxDictionairy } from 'src/app/shared/components/oldcheckbox.list.component';
import { BaseComponent } from 'src/app/shared/base.component';
import { Page, Role, WebsiteService } from 'src/app/services/website.service';


@Component({
    selector: 'app-roles-dialog',
    templateUrl: './roles.dialog.html',
})
export class RolesDialogComponent extends BaseComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<RolesDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public myCheckboxDictionairy:CheckboxDictionairy[],
        public websiteService: WebsiteService
    ) { super() }

    public pages: Array<Page> = [];
    public roles: Array<Role> = [];

    public toPrintDict: Dictionary = new Dictionary([]);
    public rolesList: Section[] = []; // for the html

    ngOnInit(): void {
        this.roles = this.websiteService.getRoles();
        this.pages = this.websiteService.getPages();
        this.getPagesPerRoles();
        this.fillDisplayList();
    }

    /***************************************************************************************************
    /
    /***************************************************************************************************/
    private getPagesPerRoles(): void {
        this.roles.forEach(role => {
          let pagesToDisplay: Array<string> = [];
          this.pages.forEach(page => {
            if (page.DisplayOnRoles.includes(role.Code)) {
              pagesToDisplay.push(page.MenuDisplayValue);
            }
          });
          this.toPrintDict.add(role.DisplayValue,pagesToDisplay)
        });
    }

    /***************************************************************************************************
    /
    /***************************************************************************************************/
    private fillDisplayList(): void {
        for (let i = 0; i < this.toPrintDict.length(); i++) {
            let section: Section = Object();
            section.header = this.toPrintDict.keys()[i];
            section.pages = this.toPrintDict.values()[i].toString().split(',').join(', ');
            this.rolesList.push(section); // add section to list
        }
    }
}

export interface Section {
    header: string;
    pages: string;
}
