import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
  ]
})
export class ByCountryComponent {
  query: string = "";

  // error handling
  isError: boolean = false;

  // countries array
  countries: Country[] = [];

  // service injection
  constructor(private countriesService: CountriesService) {}

  search(event: string) {
    // error handling
    this.isError = false;
    // update query with data issued by the input component
    this.query = event;

    // http request
    this.countriesService
    .searchCountry(this.query)
    .subscribe({
      next: (res) => {
        this.countries = res;
        console.log(res);
      },
      error: (e) => this.isError = true,
      complete: () => console.info('Http request complete') 
    }
      // (res) => {console.log(res);}, 
      // (err) => {this.isError = true;}, 
      );
    
  }
}













