import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/services/tracker.service';
import { CoronaDetails } from 'app/interfaces/Interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public worldWideCases:any;
  public fetchingTime : any;
  
  constructor(private trackerService:TrackerService) { }

  ngOnInit(): void {

    this.trackerService.getAllCoronaCases().subscribe(res=>{
      if(res!=null){
        this.worldWideCases=res.world_total;
        this.fetchingTime=res.statistic_taken_at;
      }
      console.log(res)
  });
  }
}
