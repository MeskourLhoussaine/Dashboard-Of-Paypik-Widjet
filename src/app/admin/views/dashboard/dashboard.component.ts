import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { pageTransition } from 'src/app/shared/utils/animations';
import { MarchandService } from '../../services/marchand.service';
import { Merchant } from '../../model/merchant.model';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [pageTransition]
})
export class DashboardComponent implements OnInit {
  eventDate: any = formatDate(new Date(), 'MMM dd, yyyy', 'en');

  ngOnInit(): void {
    var myChart = new Chart("areaWiseSale", {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
        }]
      },
      options: {
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          },
        },
        plugins: {
          legend: {
            position: 'right',
            align: 'center',
          },
        },
      },
    });
  }
  ////////////////////  services  /////////////////////

  marchands: Merchant[] = [];

  constructor(
    private marchandService: MarchandService
  ) {}

  fetchMarchands() {
    this.marchandService.getMarchands().subscribe(
      (data: Merchant[]) => {
        this.marchands = data;
      },
      (error) => {
        console.error('Error fetching marchands:', error);
      }
    );
  }

  get totalMarchands() {
    return this.marchands.length;
  }
}
