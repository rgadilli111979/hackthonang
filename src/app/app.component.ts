import { Component, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { ApexNonAxisChartSeries,
         ApexChart, 
         ApexResponsive, 
         ChartComponent, 
         ApexTitleSubtitle,
         ApexDataLabels,
         ApexFill,
         ApexMarkers,
         ApexYAxis,
         ApexXAxis,
         ApexTooltip,
         ApexStroke } from 'ng-apexcharts';
import { InsurerName } from './model/insurer-name';
import { InsurerDetailService } from './service/data.service';
import { Country } from './model/countries.model';
import Swal from 'sweetalert2';
import { Policy } from './model/policy';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  yaxis: ApexYAxis;
  colors: any;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Prediction';
  private _jsonURL = 'assets/Insurer_Name.json';
  data: number[] = new Array();
  filteredPolicies: number[] = new Array();
  chart!: ChartComponent;
  public pieChartOptions!: Partial<ChartOptions> | any;
  public barChartOptions!: Partial<ChartOptions> | any;
  public synchronizedChartOptions: Partial<ChartOptions> | any;
  public falseCasesOptions: Partial<ChartOptions> | any;
  public trueCasesOptions: Partial<ChartOptions> | any;
  countries: string[] = new Array();
  insurers: string[] = new Array('ACE Europe', 'Aditya Birla Sun Life Insurance', 'CAA Insurance', 'Industrial Alliance', 'PC Insurance');
  insuranceTypes: string[] = new Array('Home Insurance', 'Life Insurance', 'Health Insurance','Vehicel Insurance')
  insurerNameList!: InsurerName[];
  policyList!: Policy[];

  countriesList!:Country[];
  constructor(private insurerDataSer: InsurerDetailService){
   
    this.insurerDataSer.getListOfCountries ().subscribe(res => {
      this.countriesList = res;
      console.info(this.countriesList);
      this.countriesList.forEach(country =>{
        this.countries.push(country.countryName);
      }
        )

    });

    this.insurerDataSer.getListOfPolicies().subscribe(res => {
      this.policyList = res;
      console.info(this.policyList[0]);
    })

   var bool =0;
   if(bool==0){
    Swal.fire('error!', 'Oops!', 'error');
    bool=1;
   }
    if(bool==1){
      Swal.fire('success!', 'Hey There!', 'success');
    }
    

    this.data.push(99900110001);
    this.data.push(99900120012);
    this.data.push(11100110001);
    this.data.push(11100220002);
    this.data.push(22212310009);
    this.data.push(22212310004);
    this.data.push(33378910003);
    this.data.push(33378920002);

  //  var policy = new Policy(19415, 'Urban', 'A', 104, '4', '1980-10-13', '2022-10-14', '12345678913', 1, '9600', 85, 100);
  //   this.policyList.push(policy);
    this.pieChartOptions = {
      series: [20,50,30,50,25,45],
      chart: {
        type: "pie",
        },
        labels: this.countries,
        responsive:{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend:{
              position: "bottom"
            }
          }
        }

    }
    this.barChartOptions= {
      series: [{
        data: [40, 20, 100, 50,80]
      }],
      chart:{
        height: 350,
        type: "bar"
      },
      plotOptions:{
        bar:{
          barHeight: '100%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "One Week",
          "Two Week",
          "Three Week",
          "One Month",
          "Two Month",

        ],
        labels:{
          show: false
        }
      },
    }
    this.synchronizedChartOptions= {
      
      yaxis: {
        tickAmount: 2,
        labels: {
          minWidth: 40
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      toolbar: {
        tools: {
          selection: false
        }
      },
      marker: {
        show: false
      },
      y: {
        title: {
          formatter: function() {
            return "";
          }
        }
      },
   grid: {
      clipMarkers: false
    },
    xaxis: {
      type: "datetime"
    }
    };
    this.falseCasesOptions={
      series: [
        {
          name: "falseCases",
          data: this.generateDayWiseTimeSeries(
            new Date("10 Oct 2022").getTime(),
            10,
            {
              min: 10,
              max: 100
            }
          )
        }
      ],
      chart: {
        id: 'falseData',
        group: 'negative',
        type: 'line',
        height: 160
      },
      
      colors: ['#022e5556'], 
    }
    this.trueCasesOptions={
      series: [
        {
          name: "trueCases",
          data: this.generateDayWiseTimeSeries(
            new Date("10 Oct 2022").getTime(),
            10,
            {
              min: 10,
              max: 100
            }
          )
        }
      ],
      chart: {
        id: 'trueData',
        group: 'positive',
        type: 'line',
        height: 160
      },
      
      colors: ['#2da115e3'],  
    }
    //this.updateSeries();
  }

  // public filterByCountry(s: string): number[]{
  //   this.filteredPolicies = [];
  //   if(s == 'India'){
  //     this.data.filter(policy => {
  //       policy
  //     })
  //     return this.data;/*  */
  //   }
  // }
  public generateDayWiseTimeSeries(baseval:any, count:any, yrange:any): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
     
      baseval += 86400000;
      i++;
    }
    console.log("Series for sync chart is "+series);
    return series;
  }

  public updateSeries(){
    this.synchronizedChartOptions.series.data = this.generateDayWiseTimeSeries(new Date("1 Oct 2022").getTime(),
    1, {
      min: 1,
      max: 100,
    });
  }
  
}
