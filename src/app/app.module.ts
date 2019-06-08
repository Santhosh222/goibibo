import { ErrorPageCusComponent } from './components/error-page-cus/error-page-cus.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightTicketComponent } from './components/flight-ticket/flight-ticket.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { UppercaseCusPipe } from './pipes/uppercase-cus.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FlightsComponent,
    FlightTicketComponent,
    HeaderComponent,
    SearchBarComponent,
    UppercaseCusPipe,
    SortPipe,
    ErrorPageCusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
