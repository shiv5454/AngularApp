import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/services/tracker.service';
import { CoronaDetails } from 'app/interfaces/Interfaces';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public worldWideCases:any;
  public fetchingTime : any;
  public showData:boolean;
  
  constructor(private trackerService:TrackerService, private SpinnerService: NgxSpinnerService) { 
    this.showData=false;
  }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.trackerService.getAllCoronaCases().subscribe(res=>{
      if(res!=null){
        this.worldWideCases=res.world_total;
        this.fetchingTime=res.statistic_taken_at;
        this.showData=true;
      }
      this.SpinnerService.hide();
  });
  }
}
