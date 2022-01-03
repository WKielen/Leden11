import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';
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
    public swUpdate: SwUpdate,
    protected snackBar: MatSnackBar,
  ) {
    // if (updates.isEnabled) {
    //   updates.checkForUpdate().then((isThere: boolean) => {
    //     if (isThere) {
    //       updates.activateUpdate().then((successfull: boolean) => {
    //         if (successfull)
    //           snackBar.open('Er is een update geinstalleerd', '', { duration: 2000 });
    //         else
    //           snackBar.open('Installatie update mislukt', '', { duration: 2000 });
    //       })
    //     }

    //   })
    // }
    
    
    if (swUpdate.isEnabled) {

      swUpdate.available.subscribe({
        next: ((event=>{
        console.log('%cUPDATE AVAILABLE old version', 'color: #ec6969; font-weight: bold;');
        console.log(event);
        }))
      })


      const updatesAvailabl = swUpdate.versionUpdates.subscribe({
          next: ((evt:any)=>{
            console.log('%cUPDATE AVAILABLE new version', 'color: #ec6969; font-weight: bold;');
            console.log("AppComponent --> evt", evt);
          })
        })



      const updatesAvailable = swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion,
        }))).subscribe({
          next: ((evt:any)=>{
            console.log('%cUPDATE AVAILABLE new version', 'color: #ec6969; font-weight: bold;');
            console.log("AppComponent --> evt", evt);
          })
        })

        // swUpdate.checkForUpdate().then((result:boolean) => {
        //   console.log('%cUPDATE AVAILABLE new version2', 'color: #ec6969; font-weight: bold;');
        //   console.log("AppComponent --> result", result);

        // });


       // console.log('updatesAvailable', updatesAvailable);
          // swUpdate.versionUpdates.subscribe({
          //   next: ((event: VersionEvent) => {
          //     console.log("AppComponent --> event", event);
          //     // if (event.type === 'UPDATE_AVAILABLE')          
          //     if (confirm('Update available, pagina opnieuw laden?'))
          //       swUpdate.activateUpdate().then(() => document.location.reload());
          //   })
          // })
        
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
