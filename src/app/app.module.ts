import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiSwitchModule } from 'ngx-ui-switch';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localesEs from '@angular/common/locales/es';

registerLocaleData(localesEs, 'es');

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    UiSwitchModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TodoModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'},
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppModule { }

