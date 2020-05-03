import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NEWS_URL } from 'app/constants/URL';

@Injectable({
  providedIn: 'root'
})
export class NewsService{
  constructor(private http : HttpClient) { }
  private httpOptions={
    headers:new HttpHeaders({
      'x-rapidapi-host':'corona-virus-world-and-india-data.p.rapidapi.com--',
      'x-rapidapi-key':'579128d9c2msh9c7005d64f4fe19p1269abjsn902fe3da140a'
    })
  };
  public getNewsByCountry(code :string):Observable<any>{  

    return this.http.get(`${NEWS_URL}${code}`, this.httpOptions);
  }

}
