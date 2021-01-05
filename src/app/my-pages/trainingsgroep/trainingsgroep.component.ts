import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { LedenService, LedenItem } from '../../services/leden.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { ParentComponent } from 'src/app/shared/parent.component';
import { TrainingstijdItem, TrainingstijdService } from 'src/app/services/trainingstijd.service';

@Component({
  selector: 'app-trainingsgroep',
  templateUrl: './trainingsgroep.component.html',
  styleUrls: ['./trainingsgroep.component.scss']
})
export class TrainingGroupsComponent extends ParentComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  predefinedDisplayColumns: string[] = ['Naam', 'Ma1','Ma2','Di1','Di2','Wo1','Wo2','Do1','Do2','Vr1','Vr2','Za1','Za2','Zo1','Zo2' ];
  displayedColumns: string[] = ['Naam'];
  dataSource = new MatTableDataSource<trainingsgroepLine>();
  selection = new SelectionModel<LedenItem>(true, []); //used for checkboxes
  fabButtons = [];  // dit zijn de buttons op het scherm
  fabIcons = [{ icon: 'save' }];
  trainingsTijden: Array<TrainingstijdItem> = [];

  constructor(
    protected ledenService: LedenService,
    protected trainingstijdService: TrainingstijdService,
    protected snackBar: MatSnackBar,
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.trainingstijdService.getAll$()
        .subscribe((data: Array<TrainingstijdItem>) => {
          this.trainingsTijden = data;
          this.trainingsTijden.forEach(tijdstip => {
            this.displayedColumns.push(tijdstip.Code);
          });
          this.vulLidInGroepLijst();
        }));
    this.fabButtons = this.fabIcons;  // plaats add button op scherm
  }

  vulLidInGroepLijst() {
    this.dataSource.data = [];
    this.registerSubscription(
      this.ledenService.getActiveMembers$()
        .subscribe((data: Array<LedenItemExt>) => {
          data.forEach(lid => {
            let tmp: trainingsgroepLine = Object();
            tmp.Naam = lid['Naam'];
            this.trainingsTijden.forEach(tijdstip => {
              tmp[tijdstip.Code] = false;
            });

            this.dataSource.data.push(tmp);
          });
          console.log('this.dataSource.data', this.dataSource.data);
          this.table.renderRows();
        }));
  }

  onCheckboxLidBondChange(event, row): void {
    // row.LidBond = event.checked;
    // row.Dirty = true;
  }

  onCheckboxCompGerechtigdChange(event, row): void {
    // row.CompGerechtigd = event.checked;
    // row.Dirty = true;
  }

  onCheckboxVrijwilligersKortingChange(event, row): void {
    // row.VrijwilligersKorting = event.checked;
    // row.Dirty = true;
  }

  onFabClick(event, buttonNbr): void {
    // try {
    //   this.dataSource.data.forEach(element => {
    //     if (element.Dirty) {
    //       element.Dirty = false;
    //       const updateRecord = {
    //         'LidNr': element.LidNr,
    //         'LidBond': element.LidBond,
    //         'CompGerechtigd': element.CompGerechtigd,
    //         'VrijwilligersKorting': element.VrijwilligersKorting,
    //       };
    //       let sub = this.ledenService.update$(updateRecord)
    //         .subscribe();
    //       this.registerSubscription(sub);
    //     }
    //   });
    //   this.showSnackBar(SnackbarTexts.SuccessFulSaved, '');
    // }
    // catch (e) {
    //   this.showSnackBar(SnackbarTexts.UpdateError, '');
    // }
  }
}

/***************************************************************************************************
/ Met dit veld controleren we of een rij is aangepast
/***************************************************************************************************/
class LedenItemExt extends LedenItem {
  Dirty = false;
}


export function objectFactory(prop: string) {
  let data: any = {};
  data[prop] = {};
  data[prop].valid = false;
  return data;
}
export interface trainingsgroepLine {
  Naam: string;
}
