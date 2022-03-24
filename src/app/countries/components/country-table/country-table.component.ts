import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styles: [
    `
    img {
      width: 100px;
    }
    `
  ]
})
export class CountryTableComponent {

  // Sharing data between child and parent directives and components
  @Input() countries: Country[] = [];
  
  constructor() { }
}
