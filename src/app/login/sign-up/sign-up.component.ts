import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // public signUpForm : FormGroup;
  private signUpRes:any;
  private invalidLogin :boolean = false;
  private pswdCheck :boolean = true;
  private showSubmit :boolean = false;
  errorMsg:string;
  firstName:string;
  lastName:string;
  userName:string;
  password:string;
  confirm:string;
  newUsername:boolean;
  showError:boolean;
  constructor(fb: FormBuilder,
   private userService:UserService, private router: Router,
   private loginservice: AuthenticationService, private SpinnerService: NgxSpinnerService) { 
     this.newUsername=false;
     this.showError=false;
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.firstName.match("^[a-zA-Z0-9\s]+$")){
      this.showError=true;
      this.errorMsg="Invalid firstName. No special char allowed";
      return false;
    }
    if(!this.lastName.match("^[a-zA-Z0-9\s]+$")){
      this.showError=true;
      this.errorMsg="Invalid lastName. No special char allowed";
      return false;
    }


    const userDetails={
      firstname:this.firstName,
      lastname:this.lastName,
      userName:this.userName,
      password:this.password
    }
    this.SpinnerService.show();  
    this.userService.addNewUser(userDetails).subscribe(res=>{
      this.signUpRes=res;
      if(this.signUpRes.message.code=="200" && this.signUpRes.message.status=="SUCCESS"){
        if(this.signUpRes.status){
          this.loginservice.storeUserName(this.signUpRes.userName, this.signUpRes.fullName);
          this.router.navigate(['/home']);
          this.invalidLogin = false
          }else
            this.invalidLogin = true
        } 
        this.SpinnerService.hide();  
    });
  }

  reset(){
    this.userName='';
    this.firstName='';
    this.lastName='';
    this.password='';
    this.confirm='';
    this.invalidLogin=false;
    this.newUsername=false;
    this.showError=false;
    this.errorMsg='';
    this.showSubmit=false;
  }

  checkUsername(){

    if(!this.userName.match("^[a-zA-Z0-9\s]+$")){
      this.showError=true;
      this.errorMsg="Invalid username. Please enter like shiv54";
      return false;
    }

    this.newUsername=false;
    this.showError=false;
    this.SpinnerService.show();  
    this.userService.checkValidUserName(this.userName).subscribe((res:any)=>{
      console.log(res);
      if(res.message.code=="200" && res.message.status=="SUCCESS"){
        if(!res.status)
          this.newUsername=true;
        else{
          this.showError=true;
          this.errorMsg=this.userName + " already exist";
        }

          this.SpinnerService.hide();  
      }
    });
  }

  checkPswd():void{
    this.pswdCheck=true;
    this.showSubmit=true;
    if(this.password!=this.confirm){
      this.pswdCheck=false;
      this.showSubmit=false;
      this.errorMsg='Password did not match';
    }
  }

}
