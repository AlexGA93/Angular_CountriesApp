import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent {

  // issue the value to the by-country's search method
  @Output() onEnter: EventEmitter<string> = new EventEmitter();

  query: string = '';

  searchInput(){
    // console.log(this.query);
    // issue the value to the by-country's search method
    this.onEnter.emit(this.query);
  }
}
