import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  public commentsForm: FormGroup;
  public showPreviousCmt:boolean;
  public cmtRes:any;

  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.showPreviousCmt=false;
    this.commentsForm = this.fb.group({
      title:'',
      comment:''
    });
  }

  ngOnInit(): void {
    this.getInitialCmt();
  }

  onSubmit(event : any):void{
    const cmmtObj :any ={
      'userName': sessionStorage.getItem('username'),
      'comment': this.commentsForm.controls['comment'].value,
      'title': this.commentsForm.controls['title'].value,
    }
    console.log(cmmtObj);
   
    this.userService.addComment(cmmtObj).subscribe(res=>{
      console.log(res);
      this.commentsForm.reset();
      this.getInitialCmt();
    });
  }

  getInitialCmt(){
    this.userService.getAllComment(sessionStorage.getItem('username')).subscribe(res=>{
      console.log(res);
      this.cmtRes=res;
      if(this.cmtRes.message.code==="200"){
        this.showPreviousCmt=true;
      }
    });
  }
}
