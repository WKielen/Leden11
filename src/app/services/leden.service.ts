import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { retry, tap, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class LedenService extends DataService {

  constructor(http: HttpClient) {
    super(environment.baseUrl + '/lid', http);
  }

  /***************************************************************************************************
  / Geeft alle leden terug exclusief opgezegde leden. Als the INCLIBAN param op true staat komen ook
  / de IBAN's mee. Dit is alleen voor de penningmeester
  / Tevens worden er enkele velden aan het record toegevoegd. Deze moeten bij de update weer worden
  / verwijderd.
  /***************************************************************************************************/
  getActiveMembers$(inclIBAN?: boolean): Observable<Array<LedenItemExt>> {
    let subUrl = '/lid/getonlyactivemembers';
    if (inclIBAN) {
      subUrl = '/lid/getonlyactivememberswithiban';
    }

    return this.http.get(environment.baseUrl + subUrl)
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
        map(function (value: LedenItemExt[]) {
          let localdata = value;
          localdata.forEach(element => {
            element.Naam = LedenItem.getFullNameAkCt(element.Voornaam, element.Tussenvoegsel, element.Achternaam);
            element.VolledigeNaam = LedenItem.getFullNameVtA(element.Voornaam, element.Tussenvoegsel, element.Achternaam);
            element.LeeftijdCategorieBond = DateRoutines.LeeftijdCategorieBond(element.GeboorteDatum);
            element.LeeftijdCategorie = DateRoutines.LeeftijdCategorie(element.GeboorteDatum);
            element.LeeftijdCategorieWithSex = DateRoutines.LeeftijdCategorieWithSex(element);
            element.Leeftijd = DateRoutines.Age(element.GeboorteDatum);
            if (element.ExtraA == '_ExtraA') element.ExtraA = '';
            element.Trainingsgroepen = element.ExtraA ? element.ExtraA.split(',') : [];
            if (element.LidType === '0') { element.LidType = ''; }
            if (element.BetaalWijze === '0') { element.BetaalWijze = ''; }
          });
          return localdata;
        })
      );
  }

  /***************************************************************************************************
  / Ik heb deze attributen bij het inlezen toegevoegd. Voor de update moeten ze er af.
  /***************************************************************************************************/
  update$(element): Observable<Object> {
    delete element['Naam'];
    delete element['VolledigeNaam'];
    delete element['LeeftijdCategorieBond'];
    delete element['LeeftijdCategorie'];
    delete element['LeeftijdCategorieWithSex'];
    delete element['Leeftijd'];
    if (element['Trainingsgroepen'])
      element['ExtraA'] = element['Trainingsgroepen'].join();
    delete element['Trainingsgroepen'];
    return super.update$(element);
  }

  /***************************************************************************************************
  / Get a role of a member
  /***************************************************************************************************/
  getRol$(): Observable<Object> {
    return this.http.get(environment.baseUrl + '/lid/getrol')
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
      );
  }

  /***************************************************************************************************
  / Get a membernumber for a new member
  /***************************************************************************************************/
  getNewLidnr$(): Observable<Object> {
    return this.http.get(environment.baseUrl + '/lid/getnewlidnr')
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
      );
  }

  /***************************************************************************************************
  / Get alleen JEUGDleden
  /***************************************************************************************************/
  getYouthMembers$(): Observable<Array<LedenItem>> {
    return this.getActiveMembers$(false)
      .pipe(
        map(function (value: LedenItemExt[]) {
          return value.filter(isJeugdlidFilter());
        })
      )
  }

  /***************************************************************************************************
  / Get alleen opgezegde leden
  /***************************************************************************************************/
  getRetiredMembers$(): Observable<Array<LedenItem>> {
    return this.http.get(environment.baseUrl + '/lid/getretiredmembers')
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
        map(function (value: LedenItemExt[]) {
          let localdata = value;
          localdata.forEach(element => {
            element.Naam = LedenItem.getFullNameAkCt(element.Voornaam, element.Tussenvoegsel, element.Achternaam);
          });
          return localdata;
        })
      );
  }

  /***************************************************************************************************
  / Haal de laatste 5 nieuwe leden en laatste 5 opzeggingen op
  /***************************************************************************************************/
  getMutaties$(): Observable<Array<LedenItem>> {
    return this.http.get(environment.baseUrl + '/lid/laatstemutaties')
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
        map(function (value: LedenItemExt[]) {
          let localdata = value;
          localdata.forEach(element => {
            element.Naam = LedenItem.getFullNameAkCt(element.Voornaam, element.Tussenvoegsel, element.Achternaam);
            element.LeeftijdCategorieBond = DateRoutines.LeeftijdCategorieBond(element.GeboorteDatum);
          });
          return localdata;
        })
      );
  }

  // Dit verwijderen nadat we op productie over zijn.
  convert$(): Observable<Object> {
    return this.http.get(environment.baseUrl + '/lid/convert')
      .pipe(
        retry(3),
        tap(
          data => console.log('Received: ', data),
          error => console.log('Oeps: ', error)
        ),
      );
  }
}


/***************************************************************************************************
/ Het filter om de goede agendaItems te selecteren. Dit is de techniek als je params wil meegeven
/***************************************************************************************************/
function isJeugdlidFilter() {
  return function (item: LedenItemExt) {
    if (item.LeeftijdCategorieWithSex.substring(0, 1) === LidTypeValues.YOUTH) return true;
    if (item.LeeftijdCategorieBond === 'Senior1') return true;
    return false;
  }
}


/***************************************************************************************************
/ De methods zijn static omdat the methods via een interface niet worden doorgegeven
/***************************************************************************************************/
export class LedenItem {
  // de properties moeten worden geinitaliseerd anders krijg je een fout bij het wegschrijven.
  LidNr: number = 0;
  Voornaam?: string = '';
  Achternaam?: string = '';
  Tussenvoegsel?: string = '';
  Adres?: string = '';
  Woonplaats?: string = '';
  Postcode?: string = '';
  Mobiel?: string = '';
  Telefoon?: string = '';
  BondsNr?: string = '';
  Geslacht?: string = '';
  GeboorteDatum?: Date = new Date();
  Email1?: string = '';
  Email2?: string = '';
  IBAN?: string = '';
  BIC?: string = '';
  BetaalWijze?: string = '';
  LidBond?: string = '';
  CompGerechtigd?: string = '';
  LidType?: string = '';
  LidVanaf?: string = '';
  Opgezegd?: string = '';
  LidTot?: string = '';
  U_PasNr?: string = '';
  VastBedrag: number = 0;
  Korting?: number = 0;
  Medisch?: string = '';
  Ouder1_Naam?: string = '';
  Ouder1_Email1?: string = '';
  Ouder1_Email2?: string = '';
  Ouder1_Mobiel?: string = '';
  Ouder1_Telefoon?: string = '';
  Geincasseerd?: string = '';
  Rating?: number = 0;
  LicentieJun?: string = '';
  VrijwillgersToelichting?: string = '';
  LicentieSen?: string = '';
  MagNietOpFoto?: string = '';
  VrijwilligersKorting?: string = '';
  Rol?: string = '';
  ToegangsCode?: string = '';
  ExtraA?: string = '';


  /***************************************************************************************************
  / We ontvangen meestal objects via een interface. Dit betekent dat de methods niet mee komen.
  / Je kan dan wel een een object maken met Object.Assign. Hierdoor zijn de methods weer beschikbaar.
  / Omdat dit overal dan moet gebeuren, lijkt me dat veel overhead. Daarom maak in de method Static.
  /***************************************************************************************************
  / ACHTERNAAM, VOORNAAM TUSSENVOEGSEL
  /***************************************************************************************************/
  public static getFullNameAkCt(Voornaam: string, Tussenvoegsel: string, Achternaam: string): string {
    let name = Achternaam + ', ' + Voornaam;
    if (Tussenvoegsel) {
      name += ' ' + Tussenvoegsel;
    }
    return name;
  }

  /***************************************************************************************************
  / VOORNAAM TUSSENVOEGSEL ACHTERNAAM
  /***************************************************************************************************/
  public static getFullNameVtA(Voornaam: string, Tussenvoegsel: string, Achternaam: string): string {
    let name = Voornaam;
    if (Tussenvoegsel) {
      name += ' ' + Tussenvoegsel;
    }
    name += ' ' + Achternaam;
    return name;
  }

  /***************************************************************************************************
  / Geef alle mails van een lid
  /***************************************************************************************************/
  public static GetEmailList(lid: LedenItemExt, primary: boolean = false): Array<string> {
    let emails: Array<string> = []
    if (lid.Ouder1_Email1) {
      emails.push("Ouders van " + lid.Voornaam + "<" + lid.Ouder1_Email1 + ">");
      if (primary) return emails;
    }
    if (lid.Ouder1_Email2) {
      emails.push("Ouders van " + lid.Voornaam + "<" + lid.Ouder1_Email2 + ">");
      if (primary) return emails;
    }
    if (lid.Email1) {
      emails.push(lid.Email1);
      if (primary) return emails;
    }
    if (lid.Email2) {
      emails.push(lid.Email2);
    }
    return emails;
  }

}

/***************************************************************************************************
/ Dit zijn de extra velden die bij het inlezen worden toegevoegd aan een liditem.
/***************************************************************************************************/
export class LedenItemExt extends LedenItem {
  Naam?: string = '';
  LeeftijdCategorieBond?: string = '';
  LeeftijdCategorie?: string = '';
  LeeftijdCategorieWithSex?: string = '';
  Leeftijd?: number = 0;
  VolledigeNaam?: string = '';
  Trainingsgroepen?: Array<string> = [];

}

/***************************************************************************************************
/
/***************************************************************************************************/
export class LidTypeValues {
  public static readonly STANDAARD = 'N';
  public static readonly ZWERFLID = 'Z';
  public static readonly CONTRIBUTIEVRIJ = 'V';
  public static readonly PAKKET = 'P';

  public static readonly ADULT = 'V';
  public static readonly YOUTH = 'J';

  public static readonly MALE = 'M';
  public static readonly FEMALE = 'V';

  public static readonly MAXYOUTHAGE = 18;


  public static table: any[] = [
    { Value: LidTypeValues.STANDAARD, Label: 'Standaard' },
    { Value: LidTypeValues.ZWERFLID, Label: 'Zwerflid' },
    { Value: LidTypeValues.CONTRIBUTIEVRIJ, Label: 'Contributie vrij' },
    { Value: LidTypeValues.PAKKET, Label: 'Pakket' },
  ];
  // getracht onderstaand met Enums op te lossen.
  // wordt lastig als je in de template en dropdown wil maken met *ngFor
  public static GetLabel(value: string): string {
    if (!value || value === '0') {
      return '';
    }
    return this.table.find(x => x.Value === value).Label;
  }

}

/***************************************************************************************************
/
/***************************************************************************************************/
export class BetaalWijzeValues {
  public static readonly INCASSO = 'I';
  public static readonly REKENING = 'R';
  public static readonly UPAS = 'U';
  public static readonly ZELFBETALER = 'Z';

  public static table: any[] = [
    { Value: BetaalWijzeValues.INCASSO, Label: 'Incasso' },
    { Value: BetaalWijzeValues.REKENING, Label: 'Rekening' },
    { Value: BetaalWijzeValues.UPAS, Label: 'U-Pas' },
    { Value: BetaalWijzeValues.ZELFBETALER, Label: 'Zelfbetaler' },
  ];
  public static GetLabel(value: string): string {
    if (!value) {
      return '';
    }
    return this.table.find(x => x.Value === value).Label;
  }
}

/***************************************************************************************************
/
/***************************************************************************************************/
export class DateRoutines {

  /***************************************************************************************************
  / Leeftijd op dit moment
  /***************************************************************************************************/
  public static Age(birthDate: Date) {
    return this.AgeRel(birthDate, moment().toDate());
  }

  /***************************************************************************************************
  / Leeftijd gerelateerd naar een bepaalde referentie datum
  /***************************************************************************************************/
  public static AgeRel(birthDate: Date, referenceDate: Date): number {
    const birthDateMoment = moment(birthDate);
    let yearsOld = moment(referenceDate).get('years') - birthDateMoment.get('years');
    const tempdate = birthDateMoment.add(yearsOld, 'years').toDate();

    if (referenceDate < tempdate) {
      yearsOld--;
    }
    return yearsOld;
  }

  /***************************************************************************************************
  /
  /***************************************************************************************************/
  private static BondsLeeftijd(birthdate: Date): number {
    const todayMoment = moment();
    const july_1_thisYearMoment = moment((new Date()).getFullYear().toString() + '-07-01');
    let yearsOld = todayMoment.get('years') - moment(birthdate).get('years');

    if (todayMoment < july_1_thisYearMoment) {                   // We zitten voor 1 juli van dit jaar dus geldt de geboortejaar van vorig jaar
      yearsOld--;
    }

    return yearsOld;
  }

  // public static DateTime ComingBirthDay (DateTime birthdate)
  // {
  //     DateTime now = DateTime.Now;
  //     int dd = birthdate.Day;
  //     int mm = birthdate.Month;
  //     int yy = now.Year;
  //     if (mm < now.Month || (mm == now.Month && dd < now.Day)) yy++;
  //     return new DateTime(yy, mm, dd, 9, 0, 0);
  // }

  /***************************************************************************************************
  /
  /***************************************************************************************************/
  public static LeeftijdCategorie(birthdate: Date): string {
    const yearsOld = this.BondsLeeftijd(birthdate);
    if (yearsOld <= LidTypeValues.MAXYOUTHAGE) {
      return 'Jeugd';
    } else {
      return 'Volwassenen';
    }
  }

  /***************************************************************************************************
  / Geeft 4 mogelijke resulaten terug:
  / JM = Jeugd Man, VV = Volwassen Vrouw, JV en VM
  /***************************************************************************************************/
  public static LeeftijdCategorieWithSex(lid: LedenItem): string {
    const yearsOld = this.BondsLeeftijd(lid.GeboorteDatum);
    if (yearsOld <= LidTypeValues.MAXYOUTHAGE && lid.Geslacht === LidTypeValues.MALE) {
      return LidTypeValues.YOUTH + LidTypeValues.MALE;
    }
    if (yearsOld <= LidTypeValues.MAXYOUTHAGE && lid.Geslacht === LidTypeValues.FEMALE) {
      return LidTypeValues.YOUTH + LidTypeValues.FEMALE;
    }
    if (yearsOld > LidTypeValues.MAXYOUTHAGE && lid.Geslacht === LidTypeValues.MALE) {
      return LidTypeValues.ADULT + LidTypeValues.MALE;
    }
    if (yearsOld > LidTypeValues.MAXYOUTHAGE && lid.Geslacht === LidTypeValues.FEMALE) {
      return LidTypeValues.ADULT + LidTypeValues.FEMALE;
    }
  }

  /***************************************************************************************************
  /
  /***************************************************************************************************/
  public static LeeftijdCategorieBond(birthdate: Date): string {
    const yearsOld = this.BondsLeeftijd(birthdate);
    if (yearsOld <= 6) { return 'Onder11/-2'; }
    if (yearsOld === 7) { return 'Onder11/-1'; }
    if (yearsOld === 8) { return 'Onder11/0'; }
    if (yearsOld === 9) { return 'Onder11/1'; }
    if (yearsOld === 10) { return 'Onder11/2'; }
    if (yearsOld === 11) { return 'Onder13/1'; }
    if (yearsOld === 12) { return 'Onder13/2'; }
    if (yearsOld === 13) { return 'Onder15/1'; }
    if (yearsOld === 14) { return 'Onder15/2'; }
    if (yearsOld === 15) { return 'Onder17/1'; }
    if (yearsOld === 16) { return 'Onder17/2'; }
    if (yearsOld === 17) { return 'Onder19/1'; }
    if (yearsOld === 18) { return 'Onder19/2'; }
    if (yearsOld === 19) { return 'Senior1/O23'; }
    if (yearsOld === 20) { return 'Senior/O23'; }
    if (yearsOld === 21) { return 'Senior/O23'; }
    if (yearsOld === 22) { return 'Senior/O23'; }
    if (yearsOld >= 65) { return '65-Plus'; }
    return 'Senior';
  }

  public static InnerHtmlLabelLeeftijdsCategorie(leeftijdsCategorie: string) {
    switch (leeftijdsCategorie) {
      case 'Onder11/-2' : return 'Onder 11 <sup>-2</sup>';
      case 'Onder11/-1' : return 'Onder 11 <sup>-1</sup>';
      case 'Onder11/0'  : return 'Onder 11 <sup>0</sup>';
      case 'Onder11/1'  : return 'Onder 11 <sup>1</sup>';
      case 'Onder11/2'  : return 'Onder 11 <sup>2</sup>';
      case 'Onder13/1'  : return 'Onder 13 <sup>1</sup>';
      case 'Onder13/2'  : return 'Onder 13 <sup>2</sup>';
      case 'Onder15/1'  : return 'Onder 15 <sup>1</sup>';
      case 'Onder15/2'  : return 'Onder 15 <sup>2</sup>';
      case 'Onder17/1'  : return 'Onder 17 <sup>1</sup>';
      case 'Onder17/2'  : return 'Onder 17 <sup>2</sup>';
      case 'Onder19/1'  : return 'Onder 19 <sup>1</sup>';
      case 'Onder19/2'  : return 'Onder 19 <sup>2</sup>';
      case 'Senior1/O23': return 'Senior/O23 <sup>1</sup>';
      case 'Senior/O23' : return 'Senior/O23';
      case 'Senior'     : return 'Senior';
      case '65-Plus'    : return '65-Plus';
    }
    return '';
  }


}

      // public static string LeeftijdCategorieBond(DateTime birthdate, bool longversion)
      // {
      //     int yearsOld = BondsLeeftijd(birthdate);

      //     if (longversion)
      //     {
      //         if (yearsOld <= 06) return LidItem.constWelpMin2;
      //         if (yearsOld == 07) return LidItem.constWelpMin1;
      //         if (yearsOld == 08) return LidItem.constWelp0;
      //         if (yearsOld == 09) return LidItem.constWelp1;
      //         if (yearsOld == 10) return LidItem.constWelp2;
      //         if (yearsOld == 11) return LidItem.constPupil1;
      //         if (yearsOld == 12) return LidItem.constPupil2;
      //         if (yearsOld == 13) return LidItem.constCadet1;
      //         if (yearsOld == 14) return LidItem.constCadet2;
      //         if (yearsOld == 15) return LidItem.constJunior1;
      //         if (yearsOld == 16) return LidItem.constJunior2;
      //         if (yearsOld == 17) return LidItem.constJunior3;

      //         if (yearsOld == 18) return LidItem.constSenior1;
      //         if (yearsOld >= 65) return LidItem.const65Plus;

      //         return LidItem.constSenior;
      //     }
      //     else
      //     {
      //         if (yearsOld <= 10) return LidItem.constWelp;
      //         if (yearsOld == 11 || yearsOld == 12) return LidItem.constPupil;
      //         if (yearsOld == 13 || yearsOld == 14) return LidItem.constCadet;
      //         if (yearsOld == 15 || yearsOld == 16 || yearsOld == 17) return LidItem.constJunior;
      //         return LidItem.constSenior;
      //     }
      // }

  // public static RemoveObsoleteProperties(item: LedenItem): LedenItem {
  //   const referenceObject = new LedenItem();
  //   // console.log('RemoveObsolete', referenceObject, item);
  //   for (const key in item) {
  //     if (!(key in referenceObject)) {
  //       console.log('key', key)
  //       delete item[key];
  //     }
  //   }
  //   return item;
  // }
