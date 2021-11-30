import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InschrijvingItem, InschrijvingService } from 'src/app/services/inschrijving.service';
import { LedenItemExt, LedenService } from 'src/app/services/leden.service';
import { AppError } from 'src/app/shared/error-handling/app-error';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { ParentComponent } from 'src/app/shared/parent.component';
import { ExportToCsv } from 'export-to-csv';
import { AgendaItem } from 'src/app/services/agenda.service';
import { LidDifference } from '../../syncnttb/syncnttb.component';

@Component({
  selector: 'app-event-subscribtions-dialog',
  templateUrl: './event-subscribtions.dialog.html',
  styles: []
})

export class EventSubscriptionsDialogComponent extends ParentComponent implements OnInit {
  constructor(
    protected snackBar: MatSnackBar,
    private inschrijvingService: InschrijvingService,
    protected ledenService: LedenService,
    public dialogRef: MatDialogRef<EventSubscriptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    super(snackBar)
  }

  public subscriptions: Array<InschrijvingItem> = [];
  public ledenLijst: LedenItemExt[] = [];
  public event: AgendaItem = this.data.data as AgendaItem;

  csvOptions = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalSeparator: ',',
    showLabels: true,
    showTitle: false,
    title: 'Ledenlijst',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    filename: ''
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

  ngOnInit(): void {
    this.registerSubscription(
      this.inschrijvingService.getSubscriptionsEvent$(this.data.data.Id)
        .subscribe({
          next: (data: Array<InschrijvingItem>) => {
            this.subscriptions = data;
            console.log("EventSubscriptionsDialogComponent --> ngOnInit --> this.subscriptions", this.subscriptions);
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        }));

    this.registerSubscription(
      this.ledenService.getActiveMembersWithRatings$()
        .subscribe({
          next: (data) => {
            this.ledenLijst = data;
          },
          error: (error: AppError) => {
            console.log("error", error);
          }
        })
    );
  }

  onClickDownload(): void {
    let localList: ReportItem[] = [];
    this.csvOptions.filename = this.event.EvenementNaam + '-' + new Date().to_YYYY_MM_DD();

    this.subscriptions.forEach((element: InschrijvingItem) => {
      let reportItem = new ReportItem();

      reportItem.Naam = element.Naam;
      reportItem.Email = element.Email;
      reportItem.ExtraInformatie = element.ExtraInformatie;

      let index = this.ledenLijst.findIndex((lid: LedenItemExt) => (lid.LidNr == element.LidNr));

      if (element.LidNr != 0 && index != -1) {

        let lid: LedenItemExt = this.ledenLijst[index];

        reportItem.NaamGeregistreerd = lid.VolledigeNaam;
        reportItem.LeeftijdCategorieBond = lid.LeeftijdCategorieBond
        reportItem.Voornaam = lid.Voornaam;
        reportItem.Achternaam = lid.Achternaam;
        reportItem.Tussenvoegsel = lid.Tussenvoegsel;
        reportItem.BondsNr = lid.BondsNr
        reportItem.Geslacht = lid.Geslacht
        reportItem.GeboorteDatum = lid.GeboorteDatum;
        reportItem.Rating = (lid.Rating !== 0 ? lid.Rating.toString() : '');
        reportItem.Licentie_Jun = lid.LicentieJun != undefined ? lid.LicentieJun : '';
        reportItem.Licentie_Sen = lid.LicentieSen != undefined ? lid.LicentieSen : '';
      }
      localList.push(reportItem);
    });

    console.log("EventSubscriptionsDialogComponent --> this.subscriptions.forEach --> localList", localList);
    let csvExporter = new ExportToCsv(this.csvOptions);
    csvExporter.generateCsv(localList);
  }
}

export class ReportItem {
  Email: string = '';
  Naam: string = '';
  ExtraInformatie: string = '';

  NaamGeregistreerd: string = '';
  LeeftijdCategorieBond: string = '';
  Voornaam: string = '';
  Achternaam: string = '';
  Tussenvoegsel: string = '';

  BondsNr: string = '';
  Geslacht: string = '';
  GeboorteDatum: string = '';
  Rating : string = '';
  Licentie_Sen: string = '';
  Licentie_Jun: string = '';

}
