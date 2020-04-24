import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  username = 'javainuse'
  password = ''
  invalidLogin = false

  constructor(
    private router: Router,
    private loginservice: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginservice.logOut();
  }

  signUp(){
    this.router.navigate(['/signUp']);
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate(['/dashboard']);
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
