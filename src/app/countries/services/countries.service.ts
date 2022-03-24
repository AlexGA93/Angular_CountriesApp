import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//alternative
// import { catchError } from 'rxjs/operators';

import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  // API url
  private apiUrl: string = 'https://restcountries.com/v2';

  // Service injection
  constructor(private http: HttpClient) { }

  // Https requests
  searchCountry(query: string): Observable<Country[]>{

    const url = `${this.apiUrl}/name/${query}`;

    // send info to the element that calls method
    return this.http.get<Country[]>(url)

    // alternative
    /*
    If request return an error, i want to return an empty array
    */

    // .pipe(
    //   catchError((err) => of([])) // returns an empty object as a new observable
    // );
  }
}
