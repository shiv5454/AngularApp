import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userForm : FormGroup;
  email:string;
  // public imageSrc :any;
  public showImg:boolean;
  private userRes :any;
  private userResDetail:any={
      'mobile':'',
      'firstName': '',
      'lastName': '',
      'email': '',
      'address': '',
      'city':'',
      'country':'',
      'pin':'',
      'aboutme':'',
      'sex':'',
      'profilepic':'',
      'username':''
  };
  public showForm :boolean;
  constructor(private fb:FormBuilder, private userService : UserService, private SpinnerService: NgxSpinnerService) { 
    this.showForm=false;
    this.showImg =false;
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.showForm=false;
    this.SpinnerService.show();
    this.userService.getUser({'userName':sessionStorage.getItem('username')}).subscribe(res=>{
      this.userRes=res;
       if(this.userRes.message.code=="200" && this.userRes.message.status=="SUCCESS"){
         this.userResDetail={
           mobile:this.userRes.userList[0].mobile,
           firstName:this.userRes.userList[0].firstName,
           lastName:this.userRes.userList[0].lastName,
           country:this.userRes.userList[0].country,
           city:this.userRes.userList[0].city,
           pin:this.userRes.userList[0].pin,
           userName:this.userRes.userList[0].userName,
           email:this.userRes.userList[0].email,
           aboutMe:this.userRes.userList[0].aboutMe,
           profilepic:this.userRes.userList[0].profilepic,
           address:this.userRes.userList[0].address,
           sex:this.userRes.userList[0].sex
         } 
      }
      this.showForm=true;
      this.SpinnerService.hide();
    })
  }
  onSubmit(){
    this.SpinnerService.show();
    this.userService.updateUser(this.userResDetail).subscribe(res=>{
      this.getUserDetails();
    });
  }

  onFileChange(event){
    this.SpinnerService.show();
    const file = event.target.files[0];
    if(file!=null){
      this.showImg=true;
      const reader = new FileReader();
      reader.onload=(e)=> {this.userResDetail.profilepic=reader.result;
      };
      reader.readAsDataURL(file);
      this.SpinnerService.hide();
    }
    
  }

}
