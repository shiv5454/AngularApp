import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ALL_CASES } from './../constants/mock';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  public countriesList : Observable<any>;
  public allCasesWorldWide : Observable<any>;

  
  constructor(private http : HttpClient) { }

  public getAllCountriesList():Observable<any>{
    if(this.countriesList!=null)
      return this.countriesList;
    else
      return this.countriesList=this.http.get("https://api.covid19api.com/countries");
  }

  public getPatientListByCountry(country){
    return this.http.get(`${country}`);
  }

  public getAllCoronaCases(){
    if(this.allCasesWorldWide !=null)
       return this.allCasesWorldWide;
    else{
    const httpOptions={
      headers:new HttpHeaders({
        'x-rapidapi-host':'corona-virus-world-and-india-data.p.rapidapi.com--',
        'x-rapidapi-key':'579128d9c2msh9c7005d64f4fe19p1269abjsn902fe3da140a'
      })
    };
    return this.allCasesWorldWide = of(ALL_CASES);

    //this.http.get(`https://corona-virus-world-and-india-data.p.rapidapi.com/api`, httpOptions);
  }
}

}
