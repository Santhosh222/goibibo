import { ErrorPageCusComponent } from './components/error-page-cus/error-page-cus.component';
import { FlightsComponent } from './components/flights/flights.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { FlightTicketComponent } from './components/flight-ticket/flight-ticket.component';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search', component: SearchComponent},
  {path: 'flights', component: FlightsComponent},
  {path: 'flight-ticket', component: FlightTicketComponent},
  {path: 'notFound', component: ErrorPageCusComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: 'notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
