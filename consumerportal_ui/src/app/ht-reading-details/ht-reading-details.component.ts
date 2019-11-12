import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
// import { $ } from 'src/assets/js/jquery-1.10.2.min.js';
import { DashboardService } from './../shared/dashboard.service';
import { HtreadingDetails } from './../shared/htreading-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ht-reading-details',
  templateUrl: './ht-reading-details.component.html',
  styleUrls: ['./ht-reading-details.component.css']
})
export class HtReadingDetailsComponent implements OnInit {

  public htReadingDetailsData: HtreadingDetails[];
  public energy_kwhdata = [];
  public energy_kvahdata = [];
  public energy_kvahleaddata = [];
  public demand_kwdata = [];
  public demand_kvadata = [];

  constructor(public service: DashboardService, private router: Router) { }

  ngOnInit() {
    // console.log('Refreshing....');
    this.plotEnergygraph();
    this.plotDemandGraph();
    this.getConsumerDetails();
  }

    // ngAfterViewInit() {
    //   $('.tabs').tabs({
    //     swipeable: true,
    //     duration: 100,
    //     });
    // }

  getConsumerDetails() {
    this.service.getHTReadingDetails('07326532', '01-Aug-2019').subscribe((result: HtreadingDetails[]) => {
      result.forEach(items => {
        this.energy_kwhdata.push(items.kwh_reading_total);
        this.energy_kvahdata.push(items.rkvah_reading_total);
        this.energy_kvahleaddata.push(items.rkvah_lead_total);
        this.demand_kwdata.push(items.kw_reading_total);
        this.demand_kvadata.push(items.kva_reading_total);
      });
    });
    // console.log(this.energy_kwhdata);
    // console.log(this.energy_kvahdata);
    // console.log(this.energy_kvahleaddata);
    // console.log(this.energy_kwdata);
    // console.log(this.energy_kvadata);
  }

  plotEnergygraph() {
    // Line chart:
    const canvas = <HTMLCanvasElement>document.getElementById('energy-chart');
    const ctx = canvas.getContext('2d');

    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 450);
    purple_orange_gradient.addColorStop(0, 'rgba(16,135,71,0)');
    purple_orange_gradient.addColorStop(1, 'rgba(16,135,71,0)');

    const EnergyChart = new Chart(ctx, {
      type: 'line',
      data: {
      // labels: ['Jun-2018', 'Jul-2018', 'Aug-2018', 'Sep-2018', 'Oct-2018', 'Nov-2018', 'Dec-2018',
      //         'Jan-2019', 'Feb-2019', 'Mar-2019', 'Apr-2019', 'May-2019', 'Jun-2019', 'Jul-2019'],
      labels: ['Jun-2019', 'Jul-2019'],
      datasets: [
        {
          label: 'kWh',
          // data: [20000, 25000, 30000, 35000, 43000, 50000, 58000,
          //       62000, 65000, 70000, 75000, 79000, 83000, 98000],
          data: this.energy_kwhdata,
          backgroundColor: purple_orange_gradient,
          borderColor: '#ffffff',
          pointRadius: 6,
          borderWidth: 2,
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#0E9BA4',
          pointHoverBackgroundColor: '#CEFF90',
          pointHoverBorderColor: '#61EBA9',
          pointHoverBorderWidth: 3,
          pointHoverRadius: 8
        },
        {
          label: 'kVAh',
          // data: [5000, 5000, 5000, 5000, 5000, 7000, 9000, 10000,
          //       12000, 13000, 14000, 16000, 17000, 18000],
          data: this.energy_kvahdata,
          backgroundColor: purple_orange_gradient,
          borderColor: '#ffffff',
          pointRadius: 6,
          borderWidth: 2,
          borderJoinStyle: 'miter',
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#0E9BA4',
          pointHoverBackgroundColor: '#85A7FF',
          pointHoverBorderColor: '#FA70CB',
          pointHoverBorderWidth: 5,
          pointHoverRadius: 10
        },
        {
          label: 'kVAh Lead',
          // data: [2000, 2000, 2000, 2000, 3000, 7000, 7500, 8500,
          //       12000, 13000, 14000, 13500, 14500, 15500],
          data: this.energy_kvahleaddata,
          backgroundColor: purple_orange_gradient,
          borderColor: '#ffffff',
          pointRadius: 6,
          borderWidth: 2,
          borderJoinStyle: 'miter',
          pointBorderWidth: 3,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#0E9BA4',
          pointHoverBackgroundColor: '#ceff90',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 5,
          pointHoverRadius: 10
        }
      ]},
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          position: 'nearest'
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
              display: false
            },
            ticks: {
              fontColor: '#fff',
            },
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(255,255,255,0.1)'
            },
            ticks: {
              fontColor: '#fff',
            },
          }],
        }
      }
    });
  }

  plotDemandGraph() {

    const canvas = <HTMLCanvasElement>document.getElementById('demand-chart');
    const ctx = canvas.getContext('2d');

    const bg_gradient = ctx.createLinearGradient(0, 0, 0, 450);
    bg_gradient.addColorStop(0, '#56C2FF');
    bg_gradient.addColorStop(1, 'rgba(39, 100, 100,0)');

    const DemandChart = new Chart(ctx, {
        type: 'line',
        data: {
            // labels: ['Jun-2018', 'Jul-2018', 'Aug-2018', 'Sep-2018', 'Oct-2018', 'Nov-2018', 'Dec-2018',
            //         'Jan-2019', 'Feb-2019', 'Mar-2019', 'Apr-2019', 'May-2019', 'Jun-2019', 'Jul-2019'],
            labels: ['Jun-2019', 'Jul-2019'],
            datasets: [
                {
                    label: 'kW',
                    // data: [19, 35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                    data: this.demand_kwdata,
                    backgroundColor: bg_gradient,
                    borderColor: '#ffffff',
                    pointRadius: 6,
                    borderWidth: 2,
                    borderJoinStyle: 'miter',
                    pointBorderWidth: 3,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: '#6442B7',
                    pointHoverBackgroundColor: '#fcbb81',
                    pointHoverBorderColor: '#9b71fb',
                    pointHoverBorderWidth: 5,
                    pointHoverRadius: 10,
                },
                {
                  label: 'kVA',
                  // data: [19, 35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                  data: this.demand_kvadata,
                  backgroundColor: bg_gradient,
                  borderColor: '#ffffff',
                  pointRadius: 6,
                  borderWidth: 2,
                  borderJoinStyle: 'miter',
                  pointBorderWidth: 3,
                  pointBorderColor: '#fff',
                  pointBackgroundColor: '#6442B7',
                  pointHoverBackgroundColor: '#fcbb81',
                  pointHoverBorderColor: '#9b71fb',
                  pointHoverBorderWidth: 5,
                  pointHoverRadius: 10,
              }
            ]},
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                position: 'nearest'
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
