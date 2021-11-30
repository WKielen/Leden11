import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { LedenItemExt } from 'src/app/services/leden.service';
import { RatingItem, RatingService } from 'src/app/services/rating.service';
import { BaseComponent } from '../base.component';
import { AppError } from '../error-handling/app-error';

@Component({
  selector: 'app-update-ratings-component',
  template: `
  <small class="development" *ngIf="developmentMode">{{ me }}</small><div>
  <button mat-raised-button color="primary" (click)="onUpdate()">Update ratings</button>
`,
  styles: []
})


/***************************************************************************************************
/ Dit component ontvangt een ledenlijst, leest de ratings van alle leden vanaf de NTTB site en
/ update alle leden met deze rating en de licenties.
/ als er een lid wordt geupdate, wordt er een event gegenereerd zodat de caller een DB update kan doen
/***************************************************************************************************/
export class UpdateRatingComponent extends BaseComponent implements OnInit {

  @Input()
  ledenLijst: Array<LedenItemExt> = [];

  @Output()
  lidChanged = new EventEmitter<LedenItemExt>();

  ratingLijst: Array<RatingItem> = [];

  constructor(
    protected ratingService: RatingService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.ratingService.getRatings$()
        .subscribe({
          next: (data) => {
            this.ratingLijst = data;
          },
          error: (error: AppError) => {
            console.error(error);
          }
        })
    )
  }

  /***************************************************************************************************
  / Update van leden met nieuwe rating.
  /***************************************************************************************************/
  onUpdate() {
    this.ratingLijst.forEach(ratingItem => {
      if (isNaN(Number(ratingItem.rating))) return;  // sommige leden hebben een niet numerieke rating --> '---'
      this.ledenLijst.forEach(lidItem => {
        if (lidItem.BondsNr !== ratingItem.bondsnr) return;
        if (lidItem.Rating == Number(ratingItem.rating)) return;
        lidItem.Rating = Number(ratingItem.rating);
        lidItem.LicentieJun = ratingItem.senjun;
        lidItem.LicentieSen = ratingItem.senlic;
        this.lidChanged.emit(lidItem);
      });
    });
  }

}
