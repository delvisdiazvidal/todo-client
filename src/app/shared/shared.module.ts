import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaceNullWithTextPipe } from './pipes/replace-null-with-text.pipe';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    ConfirmDialogComponent,
    ReplaceNullWithTextPipe,
    CapitalizeFirstPipe,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiSwitchModule
  ],
  exports: [
    CommonModule,
    TimeAgoPipe,
    ReplaceNullWithTextPipe,
    CapitalizeFirstPipe,
    LoaderComponent
  ],
  entryComponents: [ ConfirmDialogComponent ],
})
export class SharedModule { }
