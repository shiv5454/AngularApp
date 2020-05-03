import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOGIN_USER, UPDATE_PSWD } from 'app/constants/URL';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }

  public login(userDetail:any):Observable<any>{
   return this.http.post(LOGIN_USER,userDetail);
  }

  public updatePaswd(userDetail:any):Observable<any>{
    return this.http.post(UPDATE_PSWD,userDetail);
   }

  storeUserName(username, fullName) {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('fullName', fullName);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
