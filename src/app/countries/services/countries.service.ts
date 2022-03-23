import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  // API url
  private apiUrl: string = 'https://restcountries.com/v2';

  // Service injection
  constructor(private http: HttpClient) { }

  // Https requests
  searchCountry(query: string): Observable<any>{

    const url = `${this.apiUrl}/name/${query}`;

    // send info to the element that calls method
    return this.http.get(url);
  }
}
