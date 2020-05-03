import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from 'app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  username : string;
  password : string;
  invalidLogin = false
  loginRes:any;
  userNameRes:any;
  updateRes:any;
  public forgertPswdFlag:boolean;
  public validUserName:boolean;

  constructor(
    private router: Router, private userService: UserService,
     public loginservice: AuthenticationService,private SpinnerService: NgxSpinnerService
  ) { 
    this.forgertPswdFlag=false;
    this.validUserName=false;
  }

  ngOnInit(): void {
    this.loginservice.logOut();
  }

  signUp(){
    this.router.navigate(['/signUp']);
  }

  checkLogin() {
    const userDetail={
      userName: this.username,
      password:this.password
    }
    this.SpinnerService.show();  
    this.loginservice.login(userDetail).subscribe(res=>{
        this.loginRes=res;
        if(this.loginRes.message.code=="200" && this.loginRes.message.status=="SUCCESS"){
          if(this.loginRes.status){
            this.loginservice.storeUserName(this.username, this.loginRes.fullName);
            this.router.navigate(['/home']);
            this.invalidLogin = false
            } else
              this.invalidLogin = true
          } 
          this.SpinnerService.hide();  
               
    });
  }
  changePassword(){
    this.SpinnerService.show();  
      this.userService.checkValidUserName(this.username).subscribe(res=>{
        this.userNameRes=res;
        if(this.userNameRes.message.code=="200" && this.userNameRes.message.status=="SUCCESS"){
          this.validUserName=this.userNameRes.status;
        }
        this.SpinnerService.hide();  
      })
  }

  updatePassword(){
    const userData={
      'userName':this.username,
      'password':this.password
    }
    this.SpinnerService.show();  
    this.userService.updatePswd(userData).subscribe((res:any)=>{
      this.updateRes=res;
      if(this.updateRes)
        if(this.updateRes.message.code=="200" && this.updateRes.message.status=="SUCCESS")
          if(this.updateRes.status){
            this.loginservice.storeUserName(this.username, this.updateRes.fullName);
            this.router.navigate(['/home']); 
            this.invalidLogin = false
          }    
          this.SpinnerService.hide();   
    });
  }


}
