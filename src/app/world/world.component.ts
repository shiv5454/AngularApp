import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TrackerService } from 'app/services/tracker.service';
import { CoronaDetails } from 'app/interfaces/Interfaces';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

declare interface CurrentData {
    name:string;
    deaths: number;
    confirmed: number;
    recovered:number;
    updated_at:string;
}

declare interface TableData {
    headerRow: string[];
    dataRows: CoronaDetails[];
}

@Component({
  selector: 'app-tables',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WorldComponent implements OnInit {
    public coronaCasesTable: TableData;
    private currentData:CurrentData;
    public showTable : boolean;
    public showTab : boolean;
    public allCoronaCases:CoronaDetails[];
    public allCountryList : [];
    public showDropdwn:boolean;
    selected:any;
    
  constructor(private trackerService:TrackerService, private SpinnerService: NgxSpinnerService) { 
      this.showTable=false;
      this.showTab=false;
      this.showDropdwn=false;
  }

  ngOnInit() {
      this.SpinnerService.show();
    this.trackerService.getAllCountriesList().subscribe((res:any)=>{
        this.allCountryList=res;
        this.allCountryList.sort(function(a:any, b:any){
            var ctry=a.Country.toLowerCase(); 
            var nameB=b.Country.toLowerCase()
                if (ctry < nameB)
                    return -1 
                if (ctry > nameB)
                    return 1
                return 0 
        });
        this.showDropdwn=true;
    });  
    this.trackerService.getAllCoronaCases().subscribe(res=>{
        if(res!=null){ 
            this.allCoronaCases=res.countries_stat;
             this.coronaCasesTable = {
                headerRow: ['Country','All Cases','Deaths','Recovered', 'New Cases', 'Total Tests'],
                dataRows: this.allCoronaCases
            };            
            this.showTable=true;
        }
        this.SpinnerService.hide();
    });
  }

  public updateChart(){
    if(this.selected !=null){
    this.SpinnerService.show();
    this.trackerService.getCoronaCasesByDate(this.selected.ISO2).subscribe((res:any)=>{
        if(res){
            console.log(res)
            this.currentData={
                name:res.data.name,
                deaths:res.data.latest_data.deaths,
                recovered: res.data.latest_data.recovered,
                confirmed : res.data.latest_data.confirmed,
                updated_at : res.data.updated_at==undefined ? new Date().toISOString(): new Date(res.data.updated_at).toISOString().slice(0, 19).replace('T',' ')
            };
            this.showTab=true;
            this.showTable=false;
            console.log(this.currentData);
        }else this.showTable=true;

        this.SpinnerService.hide();
    });
    }else{
        this.showTab=false;
        this.showTable=true;
    }

  }

}
