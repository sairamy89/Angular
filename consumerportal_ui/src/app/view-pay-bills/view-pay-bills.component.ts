import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ViewPayBills } from './../shared/view-pay-bills';
import { DashboardService } from './../shared/dashboard.service';


@Component({
  selector: 'app-view-pay-bills',
  templateUrl: './view-pay-bills.component.html',
  styleUrls: ['./view-pay-bills.component.css']
})
export class ViewPayBillsComponent implements OnInit {
  public vpBillsData: ViewPayBills[];

  constructor(public service: DashboardService) { }

  ngOnInit() {
    this.plotAyearBillsGraph();
    this.getBillInfo();
    this.getUnitsSliderValues();
  }

  getUnitsSliderValues() {
    const kwh = <HTMLInputElement>document.getElementById('kwh');
    const kwhO = <HTMLSpanElement>document.getElementById('kwhO');

    const kvah = <HTMLInputElement>document.getElementById('kvah');
    const kvahO = <HTMLSpanElement>document.getElementById('kvahO');

    const rkvah = <HTMLInputElement>document.getElementById('rkvah');
    const rkvahO = <HTMLSpanElement>document.getElementById('rkvahO');

    const pf = <HTMLInputElement>document.getElementById('pf');
    const pfO = <HTMLSpanElement>document.getElementById('pfO');

    const todUnits = <HTMLInputElement>document.getElementById('todUnits');
    const todUnitsO = <HTMLSpanElement>document.getElementById('todUnitsO');

    kwhO.innerHTML = kwh.value;
    kvahO.innerHTML = kvah.value;
    rkvahO.innerHTML = rkvah.value;
    pfO.innerHTML = pf.value;
    todUnitsO.innerHTML = todUnits.value;

    kwh.oninput = function() {
      kwhO.innerHTML = kwh.value;
    };

    kvah.oninput = function() {
      kvahO.innerHTML = kvah.value;
    };

    rkvah.oninput = function() {
      rkvahO.innerHTML = rkvah.value;
    };

    pf.oninput = function() {
      pfO.innerHTML = pf.value;
    };

    todUnits.oninput = function() {
      todUnitsO.innerHTML = todUnits.value;
    };
  }


  getBillInfo() {
    this.service.getViewPayBillInfo('000119026760').subscribe((result: ViewPayBills[]) => {
      this.vpBillsData = result;
      // console.log(this.vpBillsData);
      });
  }

  plotAyearBillsGraph() {

    const canvas = <HTMLCanvasElement>document.getElementById('yearBills-chart');
    const ctx = canvas.getContext('2d');

    const bg_gradient = ctx.createLinearGradient(0, 0, 0, 300);
    bg_gradient.addColorStop(0, '#51d95d');
    bg_gradient.addColorStop(1, '#3ebf49');

    const bg_gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
    bg_gradient2.addColorStop(0, '#64e686');
    bg_gradient2.addColorStop(1, '#3fbf50');

    const BillsBar_chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Net Bill',
						data: [90000, 85000, 95000, 99000, 115890, 1468825, 1566789, 1000000, 900000, 884560],
						backgroundColor: ['red','blue','green','orange','cyan','yellow', bg_gradient,'orange','cyan','yellow'],
						borderColor: '#ffffff',
						hoverBackgroundColor: bg_gradient2
					}
		    ]},
			options: {
				responsive: true,
				tooltips: {
					mode: 'index',
					position: 'nearest'
				},
				legend: {
          display: false,
          position: 'bottom',
          labels: {
            fontColor: '#FFF'
          }
				},
				scales: {
					xAxes: [{
						maxBarThickness: 10,
						gridLines: {
							display: false,
							color: 'rgba(255,255,255,0.1)'
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
							display: true,
							fontColor: '#fff',
							beginAtZero: true,
						},
					}],
				}
			}
		});
  }


}
