import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CardsModule } from 'cards';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
