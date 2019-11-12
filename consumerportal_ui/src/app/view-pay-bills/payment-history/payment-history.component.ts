import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.plotPaymentHistoryGraph();
  }

  plotPaymentHistoryGraph () {
    const canvas = <HTMLCanvasElement>document.getElementById('paymenthistory_chart');
    const ctx = canvas.getContext('2d');

    const bg_gradient = ctx.createLinearGradient(0, 0, 0, 450);
    bg_gradient.addColorStop(0, 'rgba(233, 151, 98,0)');
    bg_gradient.addColorStop(1, 'rgba(233, 151, 98,0)');

    const PaymentHistory_Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jun-2018', 'Jul-2018', 'Aug-2018', 'Sep-2018', 'Oct-2018', 'Nov-2018', 'Dec-2018',
                    'Jan-2019', 'Feb-2019', 'Mar-2019', 'Apr-2019', 'May-2019', 'Jun-2019', 'Jul-2019'],
            datasets: [
                {
                    label: 'KW',
                    data:[43000, 76000, 110000, 95000, 70000, 30000, 79000, 45000, 35000, 43000, 83000, 105000, 90000, 85000],
                    backgroundColor: bg_gradient,
                    borderColor: '#ffffff',
                    pointRadius: 6,
                    borderWidth: 2,
                    borderJoinStyle: 'miter',
                    pointBorderWidth: 3,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: '#E48265',
                    pointHoverBackgroundColor: '#F9FC67',
                    pointHoverBorderColor: '#F9FC67',
                    pointHoverBorderWidth: 5,
                    pointHoverRadius: 10,
                }
            ],
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                position: 'nearest',
            },
            legend: {
              position: 'bottom',
              labels: {
                fontColor: '#FFF'
              }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        color: 'rgba(255,255,255,0.1)',
                    },
                    ticks: {
                        fontColor: '#fff', // this here
                    },
                }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(255,255,255,0.1)'
                    },
                    ticks: {
                        fontColor: '#fff', // this here
                    },
                }],
            }
        }
    });
  }

}
