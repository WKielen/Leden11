import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*
           Nobody said it was easy
           It's such a shame for us to part
           Nobody said it was easy
           No one ever said it would be this hard
           Oh, take me back to the start
                 ---//---
           The Scientist - Coldplay
*/
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    // this.setUserInfo();
  }

  isHandset = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        this.isHandset = result.matches;
        return result.matches; })
    );

  sideBarToggler() {
    this.sideBarSetVisibilty(!this.sideBarOpen);
  }

  sideBarSetVisibilty($event) {
    this.sideBarOpen = $event;
  }
}
