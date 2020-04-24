import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpForm : FormGroup;

  constructor(config: NgbCarouselConfig, fb: FormBuilder) {
        config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = true; 
    this.signUpForm = fb.group({
      'firstName': '',
      'lastName': '',
      'email': '',
      'password': '',
      'confirm':''
    });

   }

  ngOnInit(): void {
  }

  onSubmit(){
    alert("Hello!!!");
  }

}
