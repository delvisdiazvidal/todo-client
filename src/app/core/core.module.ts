import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing.module';
import { NgbModule, NgbCollapseModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { BaseURLInterceptor, ErrorInterceptor, LoaderInterceptor } from '../shared/helpers';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { Error404Component } from './error/error404/error404.component';
import { Error500Component } from './error/error500/error500.component';
import { Error503Component } from './error/error503/error503.component';
import { NotificationService } from '../shared/services/notification.service';
import { ConfirmDialogService } from '../shared/services/confirm-dialog.service';

@NgModule({
  declarations: [
    HeaderComponent,
    ScrollToTopComponent,
    Error404Component,
    Error500Component,
    Error503Component,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    NgbCollapseModule,
    NgbAccordionModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    ScrollToTopComponent,
    Error404Component,
    Error503Component
  ],
  providers: [
    ToastrService,
    NotificationService,
    ConfirmDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
})
export class CoreModule { }
