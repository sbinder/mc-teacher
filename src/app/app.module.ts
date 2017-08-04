import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PrayerlistComponentComponent } from './prayerlist-component/prayerlist-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PrayerlistComponentComponent
  ],
  imports: [
    NgbModule.forRoot(), BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
