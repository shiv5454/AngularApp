import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  public countriesList : Observable<any>;
  constructor(private http : HttpClient) { }

  public getAllCountriesList():Observable<any>{
    if(this.countriesList!=null)
      return this.countriesList;
    else
      return this.countriesList=this.http.get("https://api.covid19api.com/countries");
  }
}
