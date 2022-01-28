import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countryURL="http://localhost:8080/api/countrylist";
  private stateURL="http://localhost:8080/api/statelist"

  constructor(private httpClient:HttpClient) { }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountry>(this.countryURL).pipe(
      map(response =>response._embedded.countries)
    )    
  }

  getStates(code:string):Observable<State[]>{

    const searchURL=this.stateURL+"/search/findByCountryCode?code="+code
    console.log(searchURL)
    return this.httpClient.get<GetResponseState>(searchURL).pipe(
      map(response =>response._embedded.states)
     
    )    
  }


  getMonths(startMonth: number): Observable<number[]> {
    let data: number[] = []

    for (let month: number = startMonth; month <= 12; month++) {
      data.push(month);

    }

    return of(data)

  }
  getYears(): Observable<number[]> {

    let data: number[] = []

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let year: number = startYear; year <= endYear; year++) {
      data.push(year);

    }
    return of(data)
  


  }
}

interface GetResponseCountry{
  _embedded:{
    countries:Country[]
  }
}
interface GetResponseState{
  _embedded:{
    states:State[]
  }
}
