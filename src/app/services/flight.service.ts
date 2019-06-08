import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private flights: any[];
  private retFlights: any[];
  private selectedFlight: any;
  private selectedRetFlight: any;
  flightsSearch = new Subject<any[]>();
  flightsRetSearch = new Subject<any[]>();

  constructor() { }

  getFlightDetails() {
    return this.flights;
  }

  setFlightDetails(flights: any[]) {
    this.flights = flights;
  }

  getSelectedFlight() {
    return this.selectedFlight;
  }

  setSelectedFlight(flight: any) {
    this.selectedFlight = flight;
  }


  /**
   * Retutn flight details
   */
  getRetFlightDetails() {
    return this.retFlights;
  }

  setRetFlightDetails(retFlights: any[]) {
    this.retFlights = retFlights;
  }

  getRetSelectedFlight() {
    return this.selectedRetFlight;
  }

  setRetSelectedFlight(retFlight: any) {
    this.selectedRetFlight = retFlight;
  }
}
