import { Component, OnInit, ViewChild } from '@angular/core';
import { TrackerService } from 'app/services/tracker.service';
import { CoronaDetails } from 'app/interfaces/Interfaces';

declare interface TableData {
    headerRow: string[];
    dataRows: CoronaDetails[];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    public showTable : boolean;
    public allCoronaCases:CoronaDetails[];
    
  constructor(private trackerService:TrackerService) { 
      this.showTable=false;
  }

  ngOnInit() {
    this.trackerService.getAllCoronaCases().subscribe(res=>{
        if(res!=null){
            this.allCoronaCases=res.countries_stat;
             this.showTable=true;
             console.log(this.showTable)
        }
    });
    
      this.tableData1 = {
          headerRow: ['Country','Total Cases','Deaths','Recovered', 'New Cases','Active Cases', 'Deaths/1M Populn','Total Tests','Tests/1M Populn'],
          dataRows: this.allCoronaCases
      };
      this.tableData2 = {
          headerRow:['Country','Cases','Deaths','Recovered','New Deaths', 'New Cases','Critical Cases','Active Cases', 'Deaths/1M Populn','Total Tests','Tests/1M Populn'],
          dataRows: null
      };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allCoronaCases=this.allCoronaCases.filter(function (item) {
        return !item.country_name.toLowerCase().includes(filterValue.trim().toLowerCase());
        });  
        console.log(this.allCoronaCases);
    }

}
