import { DateUtil } from './../../util/DateUtil';
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
  // totalFare = 0;

  constructor(private flightService: FlightService,
              private dateUtil: DateUtil) { }

  ngOnInit() {
    const tripDates = {fromDate: null, toDate: null};
    this.selectedFlight = this.flightService.getSelectedFlight();
    if (this.selectedFlight !== undefined) {
      tripDates.fromDate = this.dateUtil.formatDate(this.selectedFlight.depdate);
      tripDates.toDate = this.dateUtil.formatDate(this.selectedFlight.arrdate);
      this.flights.push({...this.selectedFlight, ...tripDates});
      console.log({...this.selectedFlight, ...tripDates});
      // this.totalFare += this.selectedFlight.fare.totalfare;
    }
    this.selectedRetFlight = this.flightService.getRetSelectedFlight();
    if (this.selectedRetFlight !== undefined) {
      tripDates.fromDate = this.dateUtil.formatDate(this.selectedRetFlight.depdate);
      tripDates.toDate = this.dateUtil.formatDate(this.selectedRetFlight.arrdate);
      this.flights.push({...this.selectedRetFlight, ...tripDates});
      console.log({...this.selectedRetFlight, ...tripDates});
      // this.totalFare += this.selectedRetFlight.fare.totalfare;
    }
  }

}
