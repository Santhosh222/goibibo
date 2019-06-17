import appConstants from '../../util/constants';
import { Subscription } from 'rxjs';
import { FlightService } from '../../services/flight.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy {

  flightDetails: any[] = [];
  flightRetDetails: any[] = [];
  sortCols = [];
  sortCol = '';
  sortDir = '';
  sortRetCol = '';
  sortRetDir = '';
  totalFare = 0;
  fares = [0, 0];
  flightsIndices = [-1, -1];
  flightsSubscription: Subscription;

  constructor(private flightService: FlightService,
              private router: Router) { }

  ngOnInit() {
    this.sortCols = appConstants['sortCols'];

    this.flightDetails = this.flightService.getFlightDetails();
    this.flightService.flightsSearch
      .subscribe(flightDetails => {
        this.flightDetails = flightDetails;
        this.flightRetDetails = [];
      });
    console.log('FlightDetails : ', this.flightDetails);

    this.flightRetDetails = this.flightService.getRetFlightDetails();
    // TODO:make this a subscription and unsusribe on ngdestroy
    this.flightsSubscription = this.flightService.flightsRetSearch
      .subscribe(flightRetDetails => this.flightRetDetails = flightRetDetails);
    console.log('Return flight details : ', this.flightRetDetails);
  }

  onSort(e) {
    //   onSort(el: HTMLElement) {
    const sortCols = e.target.parentElement.children;
    const retFlag = (e.target.parentElement as HTMLElement).classList.contains('return');
    console.log('Ret flag : ', retFlag);
    // console.log(e.target);
    for (let sortCol of sortCols) {
      sortCol = sortCol as HTMLElement;
      if (sortCol !== e.target) {
        (sortCol as HTMLElement).classList.remove('asc', 'desc');
      } else {
        if (sortCol.classList.contains('asc')) {
          sortCol.classList.remove('asc');
          sortCol.classList.add('desc');
          (retFlag) ? this.sortRetDir = 'desc' : this.sortDir = 'desc';
        } else {
          // For both new and already desc columns
          sortCol.classList.remove('desc');
          sortCol.classList.add('asc');
          (retFlag) ? this.sortRetDir = 'asc' : this.sortDir = 'asc';
        }
        (retFlag) ? this.sortRetCol = sortCol.innerText : this.sortCol = sortCol.innerText;
      }
    }
  }

  onBook(index: number) {
    // console.log(index, this.flightDetails[index]);
    if (index !== undefined) {
      this.flightService.setSelectedFlight(this.flightDetails[index]);
      this.flightService.setRetSelectedFlight(undefined);
    } else {
      this.flightService.setSelectedFlight(this.flightDetails[this.flightsIndices[0]]);
      this.flightService.setRetSelectedFlight(this.flightRetDetails[this.flightsIndices[1]]);
    }
    this.router.navigate(['flight-ticket']);
  }

  updateTotalFare(flightindex, index) {
    this.fares[index] = index === 0 ? this.flightDetails[flightindex].fare.totalfare : this.flightRetDetails[flightindex].fare.totalfare;
    this.flightsIndices[index] = flightindex;
    console.log(this.fares, this.flightsIndices);
  }

  ngOnDestroy(): void {
    this.flightsSubscription.unsubscribe();
  }
}
