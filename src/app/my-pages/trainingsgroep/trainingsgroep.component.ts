import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { LedenService, LedenItem, LedenItemExt } from '../../services/leden.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ParentComponent } from 'src/app/shared/parent.component';
import { TrainingstijdItem, TrainingstijdService } from 'src/app/services/trainingstijd.service';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';

@Component({
  selector: 'app-trainingsgroep',
  templateUrl: './trainingsgroep.component.html',
  styleUrls: ['./trainingsgroep.component.scss']
})
export class TrainingGroupsComponent extends ParentComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  predefinedDisplayColumns: string[] = ['Naam', 'Ma1', 'Ma2', 'Di1', 'Di2', 'Wo1', 'Wo2', 'Do1', 'Do2', 'Vr1', 'Vr2', 'Za1', 'Za2', 'Zo1', 'Zo2'];
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
      this.ledenService.getYouthMembers$()
        .subscribe((data: Array<LedenItemExt>) => {
          data.forEach(lid => {
            let tmp: trainingsgroepLine = Object();
            tmp.Naam = lid.VolledigeNaam;
            this.trainingsTijden.forEach(tijdstip => {
              tmp[tijdstip.Code] = false;
            });
            lid.Trainingsgroepen.forEach(tijdstip => {
              tmp[tijdstip] = true;
            });
            tmp.Dirty = false;
            tmp.LidNr = lid.LidNr;
            this.dataSource.data.push(tmp);
          });
          console.log('this.dataSource.data', this.dataSource.data);
          this.table.renderRows();
        }));
  }

  onCheckboxChange(event, row, column, rowindex, colindex): void {
    row[column] = event.checked;
    row.Dirty = true;
  }

  onFabClick(event, buttonNbr): void {
    try {
      this.dataSource.data.forEach(element => {
        if (element.Dirty) {
          element.Dirty = false;

          let geselecteerdeDagen = [];
          this.trainingsTijden.forEach(tijdstip => {
            if (element[tijdstip.Code]) {
              geselecteerdeDagen.push(tijdstip.Code);
            }
          });

          const updateRecord = {
            'LidNr': element.LidNr,
            'Trainingsgroepen': geselecteerdeDagen,
          };
          let sub = this.ledenService.update$(updateRecord)
            .subscribe();
          this.registerSubscription(sub);
        }
      });
      this.showSnackBar(SnackbarTexts.SuccessFulSaved, '');
    }
    catch (e) {
      this.showSnackBar(SnackbarTexts.UpdateError, '');
    }
    this.dataSource.data.forEach(element => {
      if (element.Dirty) {
        console.log('ditry', element);
      }
    });
  }
}

export interface trainingsgroepLine {
  LidNr: number;
  Naam: string;
  Dirty: boolean;
}
