import { FlightService } from '../../services/flight.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-ticket',
  templateUrl: './flight-ticket.component.html',
  styleUrls: ['./flight-ticket.component.css']
})
export class FlightTicketComponent implements OnInit {
// TODO: provide initial values
  selectedFlight: any = {};
  selectedRetFlight: any = {};
  flights = [];
  totalFare = 0;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.selectedFlight = this.flightService.getSelectedFlight();
    if (this.selectedFlight !== undefined) {
      this.flights.push(this.selectedFlight);
    }
    this.selectedRetFlight = this.flightService.getRetSelectedFlight();
    if (this.selectedRetFlight !== undefined) {
      this.flights.push(this.selectedRetFlight);
      this.totalFare = this.selectedFlight.fare.totalfare + this.selectedRetFlight.fare.totalfare;
    }
  }

}
