import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[holdable]'
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  
  state: Subject<string> = new Subject();
  
  cancel: Observable<string>;
  
  constructor() { 
    this.cancel = this.state.pipe(
      filter (v => v === 'cancel'),
      tap(v => {
        console.log('%cstopped hold', 'color: #ec6969; font-weight: bold;');
        this.holdTime.emit(0);
      }),
    );

  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%cstarted hold', 'color: #5fba7d; font-weight: bold;');
    this.state.next('start');
    const n = 100;
    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        this.holdTime.emit(v * n);
        if ((v * n) == 1000) {
          // console.log('onExit in directive', );
          this.onExit();
        }
      }),
    )
    .subscribe();
  }

  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  onExit() {
    this.state.next('cancel');
  }

}

