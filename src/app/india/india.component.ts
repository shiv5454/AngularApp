import { Component, OnInit, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { TrackerService } from 'app/services/tracker.service';
import { CoronaDetails, DistrictData } from 'app/interfaces/Interfaces';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

declare interface TableData {
  headerRow: string[];
  dataRows: DistrictData[];
} 

@Component({
  selector: 'app-typography',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css'],
  encapsulation: ViewEncapsulation.None  
})
export class IndiaComponent implements OnInit {

  public showTable : boolean;
  public showTab : boolean;
  public allIndianCases:any;
  public allIndianStates : any;
  public districtData : DistrictData[];
  public tableData:TableData;
  public overallCases:any;
  public allCases:number;
  public deaths:number;
  public recovered:number;
  public selected :any;
  
  constructor(private trackerService:TrackerService, private SpinnerService: NgxSpinnerService) { 
    this.showTab=false;
    this.showTable=false;
  
  }

  ngOnInit() {
    this.SpinnerService.show();
    
    this.trackerService.getIndianStatesList().subscribe(res=>{
      this.allIndianStates = res;
    });
    this.trackerService.getCoronaCasesByDate("IN").subscribe(res=>{
       this.overallCases= res; 
       if(this.overallCases) 
          this.showTab=true;
        this.SpinnerService.hide();
    });   
  }

  public getDetails(){
    if(this.selected!=null){
    this.allCases=0;
    this.deaths=0;
    this.recovered=0;
    this.showTab=true;
    this.showTable=false;
    this.districtData=[];
    this.SpinnerService.show();
    this.trackerService.getAllIndianCases().subscribe(res=>{
      
      this.allIndianCases = res;
      if(this.allIndianCases){
        Object.keys(this.allIndianCases).forEach(element=>{
          if(element===this.selected.code){
            Object.keys(this.allIndianCases[element]).forEach(ele=>{
              let temp :DistrictData= this.allIndianCases[element][ele];
              temp.district=ele;
              this.allCases=this.allCases+temp.confirmed;
              this.deaths=this.deaths+temp.deceased;
              this.recovered=this.recovered+temp.recovered;
              this.districtData.push(temp);
            });
          }          
        });


          if(this.districtData.length>0){

            this.districtData.sort(function(a:any, b:any){
              if (a.confirmed < b.confirmed)
                    return 1 
                if (a.confirmed > b.confirmed)
                    return -1
                return 0 
            });
            this.showTable=true;
            this.showTab=false;
            this.tableData = {
                headerRow: ['District','All Cases','Deaths','Recovered'],
                dataRows: this.districtData
            };
          }
          this.SpinnerService.hide();
      }
    });  
  }
  else{
    this.showTable=false;
    this.showTab=true;
  }
}

}
