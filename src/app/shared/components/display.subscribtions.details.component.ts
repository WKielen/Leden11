import { Component, Input, OnChanges } from '@angular/core';
import { InschrijvingItem } from 'src/app/services/inschrijving.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-display-subscriptions-details',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small>


  <mat-table [dataSource]="inschrijvingsList" class="mat-elevation-z8">
    <ng-container matColumnDef="Naam">
      <th mat-header-cell *matHeaderCellDef> Naam </th>
      <td mat-cell *matCellDef="let element"> {{element.Naam}} </td>
    </ng-container>
    <ng-container matColumnDef="Email">
      <th mat-header-cell *matHeaderCellDef> Email </th>
      <td mat-cell *matCellDef="let element"> {{element.Email}} </td>
    </ng-container>
    <ng-container matColumnDef="Toelichting">
      <th mat-header-cell *matHeaderCellDef> Toeliching </th>
      <td mat-cell *matCellDef="let element"> {{element.ExtraInformatie}} </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </mat-table>
`
})

export class DisplaySubscriptionsAgendaDetailsComponent extends BaseComponent implements OnChanges {

  @Input()
  inschrijvingsList: InschrijvingItem[] = new Array<InschrijvingItem>();

  displayedColumns: string[] = ['Naam', 'Email', 'Toelichting'];

  ngOnChanges() {
    console.log('inschrijvingsList',this.inschrijvingsList );
  }
}
