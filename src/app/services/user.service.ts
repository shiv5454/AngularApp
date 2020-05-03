import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INSERT_USER, GET_USER, UPDATE_USER, UPDATE_PSWD, VALID_USERNAME, ADD_CMT_URL, GET_ALL_CMT_URL } from 'app/constants/URL';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}
  private httpOptionsCORS={
    headers:new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
       'redirect': 'follow',
       'Content-Type': 'application/json'
    })
    };

  public addNewUser(userDetails:any):Observable<any>{
    return this.http.post(INSERT_USER,userDetails)
  }

  public getUser(userName:any):Observable<any>{
    return this.http.post(GET_USER, userName);
  }

  public updateUser(userDetails:any):Observable<any>{
    return this.http.post(UPDATE_USER, userDetails);
  }

  public checkValidUserName(userName:any):Observable<any>{
    const body ={
      'userName':userName
    };
    return this.http.post(VALID_USERNAME, body);
  }

  public updatePswd(userDetails:any):Observable<any>{
    return this.http.post(UPDATE_PSWD, userDetails);
  }

  public addComment(userDetails:any):Observable<any>{
    return this.http.post(ADD_CMT_URL, userDetails);
  }
  
  public getAllComment(username:any):Observable<any>{
    return this.http.post(`${GET_ALL_CMT_URL}${username}`,'');
  }
}
