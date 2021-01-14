import { Component, OnInit, OnDestroy, Inject, Optional } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LedenItem, LedenService } from "src/app/services/leden.service";
import { MailService } from "src/app/services/mail.service";
import { UserItem, UserService } from "src/app/services/user.service";
import { ParentComponent } from "src/app/shared/parent.component";
import { Md5 } from "ts-md5";
import { LedenLibComponent } from 'leden-lib';
import { myclass } from 'leden-lib';

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
  providers: [{ provide: 'param', useValue: 'progress' }]
})
export class TestComponent
  extends ParentComponent
  implements OnInit, OnDestroy {
  constructor(
    protected snackBar: MatSnackBar,
    protected userService: UserService,
    public mailService: MailService,
    public ledenService: LedenService,
  ) {
    super(snackBar);
  }
  public theBoundCallback: Function;

  selected = '' ;
  ledenLijst: Array<LedenItem> = [];

  /***************************************************************************************************
  / Lees agenda in en voeg deze toe aan de options object
  /***************************************************************************************************/
  ngOnInit() {
    this.theBoundCallback = this.dezeGraag.bind(this, "actionItem");
    this.userService.getAll$().subscribe();
    this.ledenService.getActiveMembers$().subscribe(data => {
      this.ledenLijst = data;
      this.selected = '23';
    });
    // let y: DictionaryModule = new DictionaryModule();
    let y2: myclass = new myclass();
    // let x: LedenLibModule = new LedenLibModule();
    console.log('x', y2);
    y2.x();
  }

  onUserSelectedRole($event) {
    console.log('in test', $event);
    this.selected = $event
  }


  onConvertGebruikers() {
    this.registerSubscription(
      this.ledenService.convert$()
        .subscribe((data: Array<LedenItem>) => {
          data.forEach((lid) => {
            if (lid.Rol != '') {
              let user = new UserItem();
              user.Userid = lid.BondsNr;
              user.Email = lid.Email1;
              user.FirstName = lid.Voornaam;
              user.LastName = lid.Achternaam;
              user.Role = lid.Rol;
              user.Activated = '1';
              user.Password = <string>Md5.hashStr(lid.ToegangsCode);

              if (lid.Tussenvoegsel != '') {
                user.LastName = lid.Tussenvoegsel + ' ' + user.LastName;
              }
              console.log('user', user);
              this.userService.create$(user).subscribe();

            } // if
          })  // foreach
        })  // subscribe
    ) // registerSubscription


  }









  progress = 0;

  holdHandler($event) {
    console.log($event)
  }

  dezeGraag($event) {
    console.log('dezeGraag', $event);
  }

  onClick() {

  }




}
