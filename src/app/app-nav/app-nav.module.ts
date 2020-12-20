import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfigDialogComponent } from './headerconfigdialog/config.dialog';
import { NotificationDialogComponent } from './headernotificationdialog/notification.dialog';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DefaultComponent } from './default/default.component';
import { A2hsSafariHow2 } from '../shared/components/a2hs-ios-safari-how2/a2hs-ios-safari-how2';
import { LoginComponent } from './login/login.component';
import { NotallowedComponent } from './notallowed/notallowed.component';
import { SignInDialogComponent } from './sign-in-dialog/sign-in.dialog';
import { OfflineComponent } from './offline/offline.component';
import { CustomMaterialModule } from '../material.module';
import { RegisterDialogComponent } from './register-dialog/register.dialog';
import { RegistrationComponent } from './register/register.component';
import { HoldableModule } from '../shared/directives/directives.module';
import { SharedComponentsModule } from '../shared/components/component.module';
import { RegistrationDetailDialogComponent } from './register/register.detail.dialog';
import { RegistrationDialogComponent } from './register/register.dialog';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfigDialogComponent,
    NotificationDialogComponent,
    A2hsSafariHow2,
    NotallowedComponent,
    OfflineComponent,
    LoginComponent,
    SignInDialogComponent,
    RegisterDialogComponent,
    RegistrationComponent,
    RegistrationDetailDialogComponent,
    RegistrationDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    CustomMaterialModule,
    HoldableModule,
    SharedComponentsModule,
  ],
})

export class AppNavModule { }
