import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import appConstants from '../../util/constants';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Input() parent: string;

  searchForm: FormGroup;
  tripTypes = appConstants['tripTypes'];
  selectedTripType = '';

  minDepDate = this.getMinDate();

  constructor(private httpClient: HttpClient,
              private flightService: FlightService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    if (this.parent === 'flights') {
      this.tripTypes = ['OneWay', 'RoundTrip'];
    }

    // Check if cookies are present
    const formData = this.cookieService.get('formData') !== null ? JSON.parse(this.cookieService.get('formData')) : {};

    this.selectedTripType = formData['tripType'] !== undefined ? formData['tripType'] : appConstants['defaultTripType'];

    this.searchForm = new FormGroup({
      source: new FormControl(formData['source'], Validators.required),
      destination: new FormControl(formData['destination'], Validators.required),
      departure: new FormControl(formData['departure'], Validators.required),
      return: new FormControl(formData['return'], this.returnValidator.bind(this)),
      seatingclass: new FormControl(formData['seatingclass'], Validators.required),
      adults: new FormControl(formData['adults'], Validators.required),
      tripType: new FormControl(this.selectedTripType, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.searchForm.value);

    // Setting cookie formData for 2 hours
    this.cookieService.set('formData', JSON.stringify(this.searchForm.value), 2);

    const returnDate = this.searchForm.value.return;
    const dod = (this.searchForm.value.departure as string).replace(/-/g, '');
    const doa = ( returnDate ? (returnDate as string).replace(/-/g, '') : '');

    const params = {
      app_id: appConstants['app_id'],
      app_key: appConstants['app_key'],
      format: appConstants['format'],
      dateofdeparture: dod,
      dateofarrival: doa,
      counter: appConstants['counter'],
      ...this.searchForm.value
    }

    console.log('Params : ', params);

    const response = this.httpClient
      .get(appConstants['goibibourl'], {params})
      .subscribe((response: any) => {
        const arr: any[] = (response.data.onwardflights as Array<any>).splice(0, 5);
        console.log(arr);
        this.flightService.setFlightDetails(arr);
        this.flightService.flightsSearch.next(arr);
        if (doa !== '') {
          const retArr: any[] = (response.data.returnflights as Array<any>).splice(0, 5);
          console.log('Return flights: ' + retArr);
          this.flightService.setRetFlightDetails(retArr);
          this.flightService.flightsRetSearch.next(retArr);
        }
        this.router.navigate(['flights']);
    });
  }

  getMinDate() {
    const dt = new Date();
    const m = Number(dt.getMonth()) + 1;
    const mon = m < 10 ? '0' + m : m;
    const d = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
    return dt.getFullYear() + '-' + mon + '-' + d;
  }

  changeTripType(event) {
    this.selectedTripType = event.target.id;
  }

  returnValidator(control: FormControl): {[s:string]: boolean} {
    console.log('Return Validator', this.selectedTripType, control.value);
    if (this.selectedTripType === 'RoundTrip' && control.value === null) {
      return { returnVal: true };
    }
    return null;
  }
}
