import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent {

  constructor(
    public authServer: AuthService,
    public updates: SwUpdate,
    protected snackBar: MatSnackBar,
  ) {
    if (updates.isEnabled) {
      updates.checkForUpdate().then((isThere: boolean) => {
        if (isThere) {
          updates.activateUpdate().then((successfull: boolean) => {
            if (successfull)
              snackBar.open('Er is een update geinstalleerd');
            else
              snackBar.open('Installatie update mislukt');
          })
        }

      })
    }
    /***************************************************************************************************
    / check out in what browser we are etc.
    /***************************************************************************************************/
    authServer.checkUserAgent();

    /***************************************************************************************************
    / Do not ask to install on older browsers
    /***************************************************************************************************/
    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      authServer.promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
      authServer.deferredPrompt = e;
      authServer.promptSaved = true;

    });

    // we ware installed.
    window.addEventListener('appinstalled', (evt) => {
      authServer.trackInstalled();
      // hide the add button
      // authServer.promptIntercepted = false;
    });
  }
}
