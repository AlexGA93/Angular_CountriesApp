import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit{


  // issue the value to the by-country's search method
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  // issue value with debounce time
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  // Observable Subject 
  debouncer: Subject<string> = new Subject();

  query: string = '';

  // hook called after Angular has initialized all data-bound properties of a directive
  ngOnInit(): void {
    // updating deboune's value
    this.debouncer
    .pipe(
      // wait X to subscribe or send the next value 
      debounceTime(300)
    )
    .subscribe(query => {
      // console.log('debouncer: ', query); 
      this.onDebounce.emit( query ) 
    })
  }

  searchInput(){
    // console.log(this.query);
    // issue the value to the by-country's search method
    this.onEnter.emit(this.query);
  }

  // every time user press a key debounce will transmit the input's value
  pressedKey() { 
    this.debouncer.next( this.query );
  }
}
