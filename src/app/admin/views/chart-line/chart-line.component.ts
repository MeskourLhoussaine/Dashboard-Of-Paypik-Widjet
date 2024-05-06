import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { formatDate } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { series } from './data';
Chart.register(...registerables);

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};
@Component({
  selector: 'app-chart-line',
  standalone: true,
  imports: [],
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.css'
})
export class ChartLineComponent  implements OnInit  {
  chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'line'
    },
    xaxis: {},
    stroke: {},
    dataLabels: {},
    yaxis: {},
    labels: [],
    legend: {},
    title: {},
    subtitle: {}
  };


  @ViewChild('detailedDescription') detailedDescription!: ElementRef;
  @ViewChild('areaWiseSale') areaWiseSale!: ElementRef;

  constructor(
  
   
  ) { }

  eventDate: any = formatDate(new Date(), 'MMM dd, yyyy', 'en');

  ngOnInit(): void {
  

      this.createChart();
     
 
  }




 

  generateChartOptions(): ChartOptions { // Spécifier le type de retour comme ChartOptions
    return {
      series: [
        {
          name: "Series 1",
          data: series.monthDataSeries1.prices
        },
        {
          name: "Series 2",
          data: series.monthDataSeries2.prices
        },
        {
          name: "Series 3",
          data: series.monthDataSeries3.prices
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left"
      },
      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  createChart(): void {
    this.chartOptions = this.generateChartOptions(); // Mettre à jour les options du graphique
  }

}
