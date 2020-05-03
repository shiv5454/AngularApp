import { Component, OnInit } from '@angular/core';
import { NewsService } from 'app/services/news.service';
import { NewsData } from 'app/interfaces/Interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;

@Component({
  selector: 'app-notifications',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public newsRes :any;
  public newsDataArray :NewsData[];
  public showNews:boolean;
  public showContent:boolean;
  constructor(private newsService : NewsService,private SpinnerService: NgxSpinnerService) { 
    this.showNews=false;
    this.showContent=false;
  }

  ngOnInit() {
    this.showAllNews("IN");
  }

  showNewsData(code:string):void{
    this.showAllNews(code);
  }

  showAllNews(code:string){
    this.newsDataArray=[];
    this.SpinnerService.show();
    this.newsService.getNewsByCountry(code).subscribe(res=>{
      this.newsRes=res;
      this.newsRes.articles.forEach(element => {
        if(element.author!=null){
          console.log(element.author)
          console.log(element.author.toUpperCase().indexOf("TIMES")>-1)
          if(element.author.toUpperCase().indexOf("TIMES")>-1 || element.author.toUpperCase().indexOf("NEWS")>-1 || element.author.toUpperCase().indexOf("ECON")>-1)
            this.newsDataArray.unshift(element);
          else
           this.newsDataArray.push(element);
        }
      });

      this.showNews=true;
      this.SpinnerService.hide();
    })
  }









  // showNotification(from, align){
  //     const type = ['','info','success','warning','danger'];

  //     var color = Math.floor((Math.random() * 4) + 1);
  //     $.notify({
  //         icon: "pe-7s-gift",
  //         message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
  //     },{
  //         type: type[color],
  //         timer: 1000,
  //         placement: {
  //             from: from,
  //             align: align
  //         }
  //     });
  // }
}
