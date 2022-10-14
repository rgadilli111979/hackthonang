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
  countries: string[] = new Array('Australia', 'Canada', 'Cayman Islands', 'India', 'United Kingdom', 'USA');
  insurers: string[] = new Array('ACE Europe', 'Aditya Birla Sun Life Insurance', 'CAA Insurance', 'Industrial Alliance', 'PC Insurance');
  insuranceTypes: string[] = new Array('Home Insurance', 'Life Insurance', 'Health Insurance','Vehicel Insurance')
  insurerNameList!: InsurerName[]
  constructor(){
    this.data.push(99900110001);
    this.data.push(99900120012);
    this.data.push(11100110001);
    this.data.push(11100220002);
    this.data.push(22212310009);
    this.data.push(22212310004);
    this.data.push(33378910003);
    this.data.push(33378920002);

   

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
      series: [{
        data: this.generateDayWiseTimeSeries(new Date("1 Oct 2022").getTime(),
        20, {
          min: 0,
          
        })
      }],
        chart: {
        id: 'churn',
        group: 'negative',
        type: 'line',
        height: 160
      },
      colors: ['#008FFB'],
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
    }
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
    return series;
  }
  
}
