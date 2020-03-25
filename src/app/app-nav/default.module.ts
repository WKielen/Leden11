import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../app-nav/header/header.component';
import { FooterComponent } from '../app-nav/footer/footer.component';
import { SidebarComponent } from '../app-nav/sidebar/sidebar.component';
import { ConfigDialogComponent } from '../app-nav/headerconfigdialog/config.dialog';
import { NotificationDialogComponent } from '../app-nav/headernotificationdialog/notification.dialog';
import { MatDialogModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, MatSidenavModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DefaultComponent } from './default/default.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfigDialogComponent,
    NotificationDialogComponent,
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

    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfigDialogComponent,
    NotificationDialogComponent,
  ]
})

export class DefaultModule { }