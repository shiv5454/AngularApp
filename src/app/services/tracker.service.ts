import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ALL_CASES } from './../constants/mock';
import { INDIA_CASES } from './../constants/IndiaMock';
import { ALL_COUNTRY_LIST, ALL_COUNTRY_CASES, ALL_INDIA_CASES, ALL_CORONA_CASES } from 'app/constants/URL';
import { INDIAN_STATES_LIST } from 'app/constants/IndianStatesList';
import { CASES_WITH_DATE } from 'app/constants/WithDate';
import { COUNTRY_LIST } from 'app/constants/country';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  private countriesList$ : Observable<any>;
  private allCasesWorldWide$ : Observable<any>;
  private allIndianCases$ : Observable<any>;
  private allCasesWithDate$ : Observable<any>;
  private httpOptionsCORS={
    headers:new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
       'redirect': 'follow',
       'Content-Type': 'application/json'
    })
    };
  constructor(private http : HttpClient) { }

  public getAllCountriesList():Observable<any>{
    if(this.countriesList$!=null)
      return this.countriesList$;
    else
      return this.countriesList$ = of(COUNTRY_LIST);
     // return this.countriesList$=this.http.get(ALL_COUNTRY_LIST, this.httpOptionsCORS);
  }

  public getPatientListByCountry(country){
    return this.http.get(`${country}`);
  }

  public getAllCoronaCases(){
    if(this.allCasesWorldWide$ !=null)
       return this.allCasesWorldWide$;
    else{
    const httpOptions={
      headers:new HttpHeaders({
        'x-rapidapi-host':'corona-virus-world-and-india-data.p.rapidapi.com--',
        'x-rapidapi-key':'579128d9c2msh9c7005d64f4fe19p1269abjsn902fe3da140a'
      })
    };
    //return this.allCasesWorldWide$ = of(ALL_CASES);

    return this.allCasesWorldWide$ = this.http.get(ALL_COUNTRY_CASES, httpOptions);
  }
}

    public getAllIndianCases(){
      if(this.allIndianCases$ !=null)
        return this.allIndianCases$;
      else{ 
        return this.allIndianCases$ = this.http.get(ALL_INDIA_CASES, this.httpOptionsCORS);
       }
    }

    public getIndianStatesList():Observable<any>{
      return of(INDIAN_STATES_LIST);
    }

    public getCoronaCasesByDate(code:string){ 
      return this.http.get(`${ALL_CORONA_CASES}${code}`, this.httpOptionsCORS);
    }
}
