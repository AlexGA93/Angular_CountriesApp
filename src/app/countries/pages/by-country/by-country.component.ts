import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [
  ]
})
export class ByCountryComponent {
  query: string = "";

  // service injection
  constructor(private countriesService: CountriesService) {}

  search() {
    // console.log(this.query);
    this.countriesService
    .searchCountry(this.query)
    .subscribe(res => console.log(res));
    
  }
}
