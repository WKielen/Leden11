import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LedenService, LedenItemExt } from '../../services/leden.service';
import { TrainingService, TrainingDag, TrainingItem } from '../../services/training.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDatepicker } from '@angular/material/datepicker';
import { SnackbarTexts } from 'src/app/shared/error-handling/SnackbarTexts';
import { ParentComponent } from 'src/app/shared/parent.component';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';

import { AppError } from 'src/app/shared/error-handling/app-error';
import { NotFoundError } from 'src/app/shared/error-handling/not-found-error';
import { NoChangesMadeError } from 'src/app/shared/error-handling/no-changes-made-error';
import { TrainingstijdItem, TrainingstijdService } from 'src/app/services/trainingstijd.service';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Dictionary } from 'src/app/shared/modules/Dictionary';
@Component({
  selector: 'app-trainingdeelname',
  templateUrl: './trainingdeelname.component.html',
  styleUrls: ['./trainingdeelname.component.scss'],
  providers: [
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } }   // veranderd het click gedrag van (alle) checkboxen. Zie material docs
  ],
})
export class TrainingDeelnameComponent extends ParentComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild('picker', { static: false }) picker: MatDatepicker<any>;

  public displayedColumns: string[] = ['actions1', 'Naam'];
  public dataSource = [];
  public fabButtons = [];  // dit zijn de buttons op het scherm
  public fabIcons = [{ icon: 'save' }, { icon: 'event' }];
  // When I change the date, the ledenlist will not be refreshed. It is read just once at page load.
  public ledenList: Array<LedenItemExt> = [];
  public trainingDag = new TrainingDag();  // contains the Date and a array of players who where present
  public trainingsTijden: Array<TrainingstijdItem> = [];
  public groups: Array<TrainingsGroupForUI> = [];

  constructor(
    protected ledenService: LedenService,
    protected trainingService: TrainingService,
    protected snackBar: MatSnackBar,
    protected trainingstijdService: TrainingstijdService,
    protected adapter: DateAdapter<any>
  ) {
    super(snackBar)
    this.adapter.setLocale('nl');
  }

  ngOnInit(): void {
    this.loadData(new Date);
    this.fabButtons = this.fabIcons;  // plaats add button op scherm
  }

  private subTrainingsTijden: Observable<Object>;
  private subLeden: Observable<Object>;
  private subTrainingDays: Observable<Object>;

  /***************************************************************************************************
  / Load data door middel van forkJoin
  /***************************************************************************************************/
  private loadData(date: Date): void {
    this.subTrainingsTijden = this.trainingstijdService.getAll$().pipe(catchError(err => of(err.status)));
    this.subLeden = this.ledenService.getYouthMembers$().pipe(catchError(err => of(err.status)));
    this.subTrainingDays = this.trainingService.getDate$(date)
      .pipe(catchError(err => {
        return of(new TrainingDag(date))
      }));
    // Als er nog geen trainingsdag is in de trainingtabel dan krijgen we een 404 terug. Die wordt opgevangen door
    // de catchError. (err.status zal de waarde 404 hebben) In de catch geef ik een 'of(object)' terug. De 'of'
    // creeert een Observable die het object doorgeeft.
    // Hierdoor krijgt de subscribe van het observable geen fout maar het object binnen. Dit kan dan goed verwerkt worden.

    // De forkJoin wacht totdat alle observable klaar zijn voordat de gemeenschappelijke subscribe terug komt. Er is dan ook een
    // gemeenschappelijke foutafhandeling. Als dat niet wenselijk is dan moet je het met een pipe oplossing op de individuele
    // Observable zoal hierboven gebeurd.
    forkJoin([this.subTrainingsTijden, this.subLeden, this.subTrainingDays]).subscribe(results => {
      this.trainingsTijden = results[0] as Array<TrainingstijdItem>;
      this.ledenList = results[1] as Array<LedenItemExt>;
      this.trainingDag = results[2] as TrainingDag;

      this.combineResults();
    },
      error => console.error("TrainingDeelnameComponent --> loadData --> error", error)
    );
  }

  /***************************************************************************************************
  / Alle obserables zijn klaar, dus resultaten combineren.
  /***************************************************************************************************/
  private combineResults(): void {
    const dagnaam = moment(this.trainingDag.Datum).locale('NL-nl').format('dd').toLowerCase();
    this.trainingsTijden.forEach(tijdstip => {
      if (dagnaam != tijdstip.Code.substring(0, 2).toLowerCase()) {
        return;
      }
      let group: TrainingsGroupForUI = new Object() as TrainingsGroupForUI;
      group.Name = tijdstip.Day;
      group.Code = tijdstip.Code;
      this.groups.push(group);
    });

    this.dataSource = this.mergeLedenAndPresence(this.ledenList, this.trainingDag);
  }

  /***************************************************************************************************
  / Merge ledenlist with presencelist
  /***************************************************************************************************/
  private mergeLedenAndPresence(ledenList: Array<LedenItemExt>, trainingDag): Array<LedenItemTableRow> {
    let newList = new Dictionary([]);
    this.groups.forEach(item => { newList.add(item.Code, []) });

    // merge beide tabellen
    ledenList.forEach(lid => {
      if (!lid.ExtraA) return; // niet ingedeelde leden

      // het juiste groepen voor deze dag zijn hier al geselecteerd.
      let newElement = new LedenItemTableRow(lid.LidNr, lid.Naam);
      trainingDag.DeelnameList.forEach(spelerMetStatus => {

        if (lid.LidNr == spelerMetStatus.LidNr) {
          newElement.SetState(spelerMetStatus.State)  // Copy the state
          return;
        }
      });

      for (let index = 0; index < this.groups.length; index++) {
        if (lid.ExtraA.indexOf(this.groups[index].Code) > -1) {
          let list = newList.get(this.groups[index].Code);
          list.push(newElement);
        }
      }
    });

    return newList.values;
  }

  /***************************************************************************************************
  / Is triggered when datapicker changed the date.
  /***************************************************************************************************/
  onChangeDate(event: MatDatepickerInputEvent<Moment>) {
    this.loadData(event.value.toDate());
  }

  /***************************************************************************************************
  / A Floating Action Button has been pressed.
  /***************************************************************************************************/
  onFabClick(event, buttonNbr): void {
    switch (buttonNbr) {
      case 0:
        this.savePresence();
        break;
      case 1:
        this.picker.open();
        break;
    }
  }

  /***************************************************************************************************
  / Save the presence for this day
  /***************************************************************************************************/
  private savePresence(): void {
    this.trainingDag.DeelnameList = [];

    this.dataSource.forEach(element => {
      if (element.Dirty) {
        let trainingItem = new TrainingItem();
        trainingItem.LidNr = element.LidNr;
        trainingItem.State = element.State;
        this.trainingDag.DeelnameList.push(trainingItem);
      }
    });

    let sub = this.trainingService.updateRec$(this.trainingDag)
      .subscribe(data => {
        this.showSnackBar(SnackbarTexts.SuccessFulSaved, '');
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            // Als het record niet is gevonden dan voeg ik het toe.
            let sub2 = this.trainingService.insertRec$(this.trainingDag)
              .subscribe(result => {
                let tmp: any = result;
                this.trainingDag.Id = tmp.Key;
                this.showSnackBar(SnackbarTexts.SuccessNewRecord);
              });
            this.registerSubscription(sub2);
          }
          // Er zijn geen wijzigingen aangebracht.
          else if (error instanceof NoChangesMadeError) {
            this.showSnackBar(SnackbarTexts.NoChanges, '');
          }
          else {
            this.showSnackBar(SnackbarTexts.UpdateError, '');
          }
        });
    this.registerSubscription(sub);
  }

  /***************************************************************************************************
  / The onRowClick from a row that has been hit
  /***************************************************************************************************/
  onRowClick(row: LedenItemTableRow): void {
    // console.log('onRowClick', row.State );
    row.SetNextState();
  }
}

interface TrainingsGroupForUI {
  Name: string;
  Code: string;
  Members: number;
  Present: number;
  SignOff: number;
  Absent: number;
}


/***************************************************************************************************
/ Extra velden voor iedere lidregel om de checkbox te besturen.
/***************************************************************************************************/
class LedenItemTableRow {
  constructor(LidNr: number, Naam: string) {
    this.Naam = Naam;
    this.LidNr = LidNr;
    this.Dirty = false;
    this.Checked = null;
    this.Indeterminate = false;
    this.State = TrainingItem.AFWEZIG;
  }

  public SetNextState(): void {
    switch (this.State) { // huidige status
      case TrainingItem.AFGEMELD:
        this.SetState(TrainingItem.AFWEZIG);   // volgende status
        break;
      case TrainingItem.AANWEZIG:
        this.SetState(TrainingItem.AFGEMELD);   // volgende status
        break;
      case TrainingItem.AFWEZIG:
        this.SetState(TrainingItem.AANWEZIG);   // volgende status
        break;
    }
  }

  public SetState(State: number): void {
    //console.log('this', this, State);
    switch (State) {
      case TrainingItem.AANWEZIG:
        // console.log('van afwezig naar aanwezig');
        this.Checked = true;
        this.Indeterminate = false;
        this.State = TrainingItem.AANWEZIG;
        break;
      case TrainingItem.AFGEMELD:
        // console.log('van aanwezig naar afgemeld');
        this.Checked = false;
        this.Indeterminate = true;
        this.State = TrainingItem.AFGEMELD;
        break;
      case TrainingItem.AFWEZIG:
        // console.log('van afgemeld naar afwezig');
        this.Checked = false;
        this.Indeterminate = false;
        this.State = TrainingItem.AFWEZIG;
        break;
    }
    this.Dirty = true;
  }

  Naam: string;
  LidNr: number;
  Dirty: boolean;
  Checked: any;
  Indeterminate: boolean;;
  State: number;
}
