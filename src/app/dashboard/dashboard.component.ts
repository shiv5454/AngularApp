import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { TrackerService } from 'app/services/tracker.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class DashboardComponent implements OnInit {
    public allCasesChartType: ChartType;
    public allCasesChartData: any;
    public allCasesChartOptions: any;
    public allCasesChartResponsive: any[];
    public allCasesChartLegendItems: LegendItem[];
    public showChart:boolean;
    private allCasesByDate:any;
    private activeCases : Number[]=[];
    private deaths : Number[]=[];
    private recovered : Number[]=[];
    private dates : string[]=[];
    private subtitle :string ="All stats as per WHO";
    private title :string;
    private updatedDate:string;
    public allCountryList : any;
    public selected:any;

    constructor(private trackerService : TrackerService, private SpinnerService: NgxSpinnerService) { 
      this.showChart=false;
    }

  ngOnInit() {
    
    this.getDetailsForChart("IN");
    //this.allCountryList = this.trackerService.getAllCountriesList();    

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
      // this.showDropdwn=true;
  });
  }

  getDetailsForChart(code:string){
    this.SpinnerService.show();
    this.showChart=false;
    this.allCasesByDate=null;
    this.deaths=[];
    this.recovered=[];
    this.activeCases=[];
    this.dates=[];
    this.allCasesChartData=null;
    this.trackerService.getCoronaCasesByDate(code).subscribe(res=>{
    
      this.allCasesByDate = res;
      if(this.allCasesByDate){ 
        const length = this.allCasesByDate.data.timeline.length;
        const reverseData :any = this.allCasesByDate.data.timeline.reverse();
        let divisionSize =14; 
        if(length>90)
          divisionSize=21;
        else if(length>130)
          divisionSize=30;
        reverseData.forEach((element, index)=> {
          if(index%divisionSize==0 || index==length-1){
            this.activeCases.push(element.confirmed);
            this.deaths.push(element.deaths);
            this.recovered.push(element.recovered);
            this.dates.push(element.date.substring(5));
          }
        });
        this.showChart=true;
        this.updatedDate= `Updated at  ${new Date(this.allCasesByDate.data.updated_at).toISOString().slice(0, 19).replace('T',' ')}`;
        this.title=`Covid-19 Tracker ${this.allCasesByDate.data.name.toUpperCase()}`;
        this.allCasesChartType = ChartType.Line;
        this.allCasesChartData = {
        labels: this.dates,
        series: [this.activeCases, this.deaths, this.recovered]
      };
      this.allCasesChartOptions = {
        low: 0,
        high: this.allCasesByDate.data.latest_data.confirmed+500,
        showArea: false,
        height: '245px',
        axisX: {
          showGrid: true,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: true,
        showPoint: true,
      };
      this.allCasesChartResponsive = [
        ['screen and (max-width: 320px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.allCasesChartLegendItems = [
        { title: 'Total Cases', imageClass: 'fa fa-circle text-info' },
        { title: 'Deaths', imageClass: 'fa fa-circle text-danger' },
        { title: 'Recovered', imageClass: 'fa fa-circle text-warning' }
      ];
      }

    });
    this.SpinnerService.hide();
  }

  public updateChart(){
    if(this.selected!=null)
    this.getDetailsForChart(this.selected.ISO2);
  }


}
