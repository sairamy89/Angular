import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Guage } from 'src/assets/js/gauge.js';
import { Chart } from 'chart.js';
import { DashboardService } from './../shared/dashboard.service';
import { HtloadProfile } from './../shared/htload-profile';
// declare var $: any;

@Component({
  selector: 'app-ht-load-profile',
  templateUrl: './ht-load-profile.component.html',
  styleUrls: ['./ht-load-profile.component.css']
})
export class HtLoadProfileComponent implements OnInit {
  @Output() changed = new EventEmitter<boolean>();
  public htReadingDetailsData: HtloadProfile[];
  public energy_active = [];
  public energy_reactive = [];
  public energy_apparent = [];
  public voltage_rph = [];
  public voltage_yph = [];
  public voltage_bph = [];
  public current_rph = [];
  public current_yph = [];
  public current_bph = [];
  public power_active = [];
  public power_reactive = [];
  public power_apparent = [];
  energygraphToggle: boolean;
  energytableToggle: boolean;
  voltagegraphToggle: boolean;
  voltagetableToggle: boolean;
  currentgraphToggle: boolean;
  currenttableToggle: boolean;
  powergraphToggle: boolean;
  powertableToggle: boolean;

  constructor(private service: DashboardService) {
    // this.tabsSwipe();
    // this.formSelect();
  }

  ngOnInit() {
    // this.plotGuageCharts();
    this.plotEnergyGraph();
    this.getHtLoadProfileData();
    this.plotVoltageGraph();
    this.plotCurrentGraph();
    this.plotPowerGraph();
    this.energygraphToggle = true;
    this.voltagegraphToggle = true;
    this.currentgraphToggle = true;
    this.powergraphToggle = true;
  }

  // tabsSwipe() {
  //   $(document).ready(function(){
  //     $('.tabs').tabs({
  //     swipeable: true,
  //     duration: 100,
  //     });
  //   });
  // }

  // formSelect() {
  //   $(document).ready(function() {
  //   	$('select').formSelect();
  //   });
  // }

  toggleEnergyTable() {
    this.energygraphToggle = false;
    this.energytableToggle = true;
  }

  toggleEnergyGraph() {
    this.energytableToggle = false;
    this.energygraphToggle = true;
  }

  toggleVoltageTable() {
    this.voltagegraphToggle = false;
    this.voltagetableToggle = true;
  }

  toggleVoltageGraph() {
    this.voltagetableToggle = false;
    this.voltagegraphToggle = true;
  }

  toggleCurrentTable() {
    this.currentgraphToggle = false;
    this.currenttableToggle = true;
  }

  toggleCurrentGraph() {
    this.currenttableToggle = false;
    this.currentgraphToggle = true;
  }

  togglePowerTable() {
    this.powergraphToggle = false;
    this.powertableToggle = true;
  }

  togglePowerGraph() {
    this.powertableToggle = false;
    this.powergraphToggle = true;
  }
  getHtLoadProfileData() {
    this.service.getHTLoadProfileData('XD501299', '01-Jul-2019', '01-Jul-2019').subscribe((result: HtloadProfile[]) => {
      result.forEach(items => {
        this.energy_active.push(items.active_energy);
        this.energy_reactive.push(items.reactive_energy);
        this.energy_apparent.push(items.apperent_energy);
        this.voltage_rph.push(items.rph_volt);
        this.voltage_yph.push(items.yph_volt);
        this.voltage_bph.push(items.bph_volt);
        this.current_rph.push(items.rph_lcurr);
        this.current_yph.push(items.yph_lcurr);
        this.current_bph.push(items.bph_lcurr);
        this.power_active.push(items.active_demand);
        this.power_reactive.push(items.reactive_demand);
        this.power_apparent.push(items.apperent_demand);
      });
    });
    // console.log(this.energy_kwhdata);
    // console.log(this.energy_kvahdata);
    // console.log(this.energy_kvahleaddata);
    // console.log(this.energy_kwdata);
    // console.log(this.energy_kvadata);
  }

  plotGuageCharts() {
    /* Power Factor Gauge */
		const pf_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#4D37CF',
			strokeColor: '#E8E4FF',
			generateGradient: true,
		};
		const pf_target = document.getElementById('power-factor');
		const pf_gauge = new Guage(pf_target).setOptions(pf_opts);
		pf_gauge.maxValue = 3000;
		pf_gauge.animationSpeed = 32;
		pf_gauge.set(2300);

	/* Load Factor Gauge */
		const lf_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#A837CF',
			strokeColor: '#EDE4FF',
			generateGradient: true,
		};
		const lf_target = document.getElementById('load-factor');
		const lf_gauge = new Guage(lf_target).setOptions(lf_opts);
		lf_gauge.maxValue = 30;
		lf_gauge.animationSpeed = 32;
		lf_gauge.set(12);

	/* Billed MD Gauge */
		const bm_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#389D8B',
			strokeColor: '#CCFFED',
			generateGradient: true,
		};
		const bm_target = document.getElementById('billed-md');
		const bm_gauge = new Guage(bm_target).setOptions(bm_opts);
		bm_gauge.maxValue = 530;
		bm_gauge.animationSpeed = 32;
		bm_gauge.set(486);

	/* KWH Gauge */
		const kwh_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#3ACF37',
			strokeColor: '#E2FFCC',
			generateGradient: true,
		};
		const kwh_target = document.getElementById('kwh-gauge');
		const kwh_gauge = new Guage(kwh_target).setOptions(kwh_opts);
		kwh_gauge.maxValue = 110000;
		kwh_gauge.animationSpeed = 32;
		kwh_gauge.set(86222.5);

	/* KVAH Gauge */
		const kvah_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#F2815E',
			strokeColor: '#FFF0D2',
			generateGradient: true,
		};
		const kvah_target = document.getElementById('kvah-gauge');
		const kvah_gauge = new Guage(kvah_target).setOptions(kvah_opts);
		kvah_gauge.maxValue = 900000;
		kvah_gauge.animationSpeed = 32;
		kvah_gauge.set(86438);

	/* RKVAH LAG Gauge */
		const rkvahlag_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#FFC266',
			strokeColor: '#FFF1CC',
			generateGradient: true,
		};
		const rkvahlag_target = document.getElementById('rkvah-lag-gauge');
		const rkvahlag_gauge = new Guage(rkvahlag_target).setOptions(rkvahlag_opts);
		rkvahlag_gauge.maxValue = 13240;
		rkvahlag_gauge.animationSpeed = 32;
		rkvahlag_gauge.set(6620);

	/* RKVAH LEAD Gauge */
		const rkvahlead_opts = {
			lines: 5,
			angle: 0,
			lineWidth: 0.135,
			pointer: {
			length: 0.35,
			strokeWidth: 0.024,
			color: '#000000'
		},
			limitMax: 'false',
			limitMin: false,
			colorStart: '#DCDF49',
			strokeColor: '#FFFACC',
			generateGradient: true,
		};
		const rkvahlead_target = document.getElementById('rkvah-lead-gauage');
		const rkvahlead_gauge = new Guage(rkvahlead_target).setOptions(rkvahlead_opts);
		rkvahlead_gauge.maxValue = 15000;
		rkvahlead_gauge.animationSpeed = 32;
		rkvahlead_gauge.set(5670.5);
  }

  plotEnergyGraph() {

    const canvas = <HTMLCanvasElement>document.getElementById('chart_energy');
    const ctx = canvas.getContext('2d');

      const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 450);
      purple_orange_gradient.addColorStop(0, '#9adf5e');
      purple_orange_gradient.addColorStop(1, 'rgba(16,135,71,0)');

      const energy_chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'],
              datasets: [
                  {
                      label: 'ACTIVE_ENERGY',
                      // data:[0, -50, -20, -50, -20, -50, -20, -50, -20, -50, -20, -25, -20, -50, -20, -50, -20, -50, -20, -25, -30, -50, -40, -45, -50, -40, -30, -48, 45, -48],
                      data: this.energy_active,
                      backgroundColor: purple_orange_gradient,
                      borderColor:'#ffffff',
                      pointRadius: 6,
                      borderWidth: 2,
                      pointBorderWidth:3,
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#3dac4e',
                      pointHoverBackgroundColor: '#ec72e1',
                      pointHoverBorderColor:'#fff',
                      pointHoverBorderWidth:3,
                      pointHoverRadius: 8,
                  },

                  {
                      label: 'REACTIVE_ENERGY',
                      // data:[200, 150, 130, 170, 220, 350, 340, 280, 200, 350, 420, 410, 300, 400, 350, 500, 450, 300, 350, 250, 300, 450, 350, 310, 320, 420, 500, 450, 420, 550, 500],
                      data: this.energy_reactive,
                      backgroundColor: purple_orange_gradient,
                      borderColor:'#ffffff',
                      pointRadius: 6,
                      borderWidth: 2,
                      borderJoinStyle: 'miter',
                      pointBorderWidth:3,
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#3dac4e',
                      pointHoverBackgroundColor: '#ffe833',
                      pointHoverBorderColor:'#fff',
                      pointHoverBorderWidth:5,
                      pointHoverRadius: 10,
                  },
                  {
                    label: 'APPARENT_ENERGY',
                    // data: [0, -50, -20, -50, -20, -50, -20, -50, -20, -50, -20, -25, -20, -50, -20, -50, -20, -50, -20, -25, -30, -50, -40, -45, -50, -40, -30, -48, 45, -48],
                    data: this.energy_apparent,
                    backgroundColor: purple_orange_gradient,
                    borderColor:'#ffffff',
                    pointRadius: 6,
                    borderWidth: 2,
                    pointBorderWidth:3,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: '#3dac4e',
                    pointHoverBackgroundColor: '#ec72e1',
                    pointHoverBorderColor:'#fff',
                    pointHoverBorderWidth:3,
                    pointHoverRadius: 8,
                }


              ],

          },
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
                          color: 'rgba(255,255,255,0.1)'
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

  plotVoltageGraph() {

    const canvas = <HTMLCanvasElement>document.getElementById('voltage_graph');
    const ctx = canvas.getContext('2d');

      const bg_gradient = ctx.createLinearGradient(0, 0, 0, 450);
      bg_gradient.addColorStop(0, '#56C2FF');
      bg_gradient.addColorStop(1, 'rgba(39, 100, 100,0)');

      const voltage_chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'],
                datasets: [
                    {
                        label: 'RPH_VOLT',
                        // data:[19,35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                        data: this.voltage_rph,
                        backgroundColor: bg_gradient,
                        borderColor:'#ffffff',
                        pointRadius: 6,
                        borderWidth: 2,
                        borderJoinStyle: 'miter',
                        pointBorderWidth: 3,
                        pointBorderColor: '#fff',
                        pointBackgroundColor: '#6442B7',
                        pointHoverBackgroundColor: '#fcbb81',
                        pointHoverBorderColor:'#9b71fb',
                        pointHoverBorderWidth:5,
                        pointHoverRadius: 10,
                    },
                    {
                      label: 'YPH_VOLT',
                      // data:[19,35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                      data: this.voltage_yph,
                      backgroundColor: bg_gradient,
                      borderColor:'#ffffff',
                      pointRadius: 6,
                      borderWidth: 2,
                      borderJoinStyle: 'miter',
                      pointBorderWidth: 3,
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#6442B7',
                      pointHoverBackgroundColor: '#fcbb81',
                      pointHoverBorderColor:'#9b71fb',
                      pointHoverBorderWidth:5,
                      pointHoverRadius: 10,
                  },
                  {
                    label: 'BPH_VOLT',
                    // data:[19,35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                    data: this.voltage_bph,
                    backgroundColor: bg_gradient,
                    borderColor:'#ffffff',
                    pointRadius: 6,
                    borderWidth: 2,
                    borderJoinStyle: 'miter',
                    pointBorderWidth: 3,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: '#6442B7',
                    pointHoverBackgroundColor: '#fcbb81',
                    pointHoverBorderColor:'#9b71fb',
                    pointHoverBorderWidth:5,
                    pointHoverRadius: 10,
                }

                ],

            },
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
                            color: 'rgba(255,255,255,0.1)'

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

  plotCurrentGraph() {

    const canvas = <HTMLCanvasElement>document.getElementById('current_graph');
    const ctx = canvas.getContext('2d');

      const bg_gradient = ctx.createLinearGradient(0, 0, 0, 450);
      bg_gradient.addColorStop(0, '#FFD76F');
	    bg_gradient.addColorStop(1, 'rgba(233, 151, 98,0)');

      const current_chart = new Chart(ctx, {
	            type: 'line',
	            data: {
                labels: ['12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'],
	                datasets: [
	                    {
	                        label: 'RPH_LCURR',
	                        // data:[19, 35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                          data: this.current_rph,
	                        backgroundColor: bg_gradient,
	                        borderColor:'#ffffff',
	                        pointRadius: 6,
	                        borderWidth: 2,
	                        borderJoinStyle: 'miter',
	                        pointBorderWidth:3,
	                        pointBorderColor: '#fff',
	                        pointBackgroundColor: '#db7336',
	                        pointHoverBackgroundColor: '#fcbb81',
	                        pointHoverBorderColor:'#9b71fb',
	                        pointHoverBorderWidth:5,
	                        pointHoverRadius: 10,
                      },
                      {
                        label: 'YPH_LCURR',
                        // data:[19, 35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                        data: this.current_yph,
                        backgroundColor: bg_gradient,
                        borderColor:'#ffffff',
                        pointRadius: 6,
                        borderWidth: 2,
                        borderJoinStyle: 'miter',
                        pointBorderWidth:3,
                        pointBorderColor: '#fff',
                        pointBackgroundColor: '#db7336',
                        pointHoverBackgroundColor: '#fcbb81',
                        pointHoverBorderColor:'#9b71fb',
                        pointHoverBorderWidth:5,
                        pointHoverRadius: 10,
                    },
                    {
                      label: 'BPH_LCURR',
                      // data:[19, 35, 35, 42, 48, 40, 45, 42, 40, 51, 47, 38, 40, 49],
                      data: this.current_bph,
                      backgroundColor: bg_gradient,
                      borderColor:'#ffffff',
                      pointRadius: 6,
                      borderWidth: 2,
                      borderJoinStyle: 'miter',
                      pointBorderWidth:3,
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#db7336',
                      pointHoverBackgroundColor: '#fcbb81',
                      pointHoverBorderColor:'#9b71fb',
                      pointHoverBorderWidth:5,
                      pointHoverRadius: 10,
                    }

	                ],

	            },
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
	                            color: 'rgba(255,255,255,0.1)'
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

  plotPowerGraph() {

    const canvas = <HTMLCanvasElement>document.getElementById('chart_power');
    const ctx = canvas.getContext('2d');

      const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 450);
      purple_orange_gradient.addColorStop(0, '#9adf5e');
      purple_orange_gradient.addColorStop(1, 'rgba(16,135,71,0)');

      const energy_chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'],
              datasets: [
                  {
                      label: 'ACTIVE_DEMAND',
                      // data:[0, -50, -20, -50, -20, -50, -20, -50, -20, -50, -20, -25, -20, -50, -20, -50, -20, -50, -20, -25, -30, -50, -40, -45, -50, -40, -30, -48, 45, -48],
                      data: this.power_active,
                      backgroundColor: purple_orange_gradient,
                      borderColor:'#ffffff',
                      pointRadius: 6,
                      borderWidth: 2,
                      pointBorderWidth:3,
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#3dac4e',
                      pointHoverBackgroundColor: '#ec72e1',
                      pointHoverBorderColor:'#fff',
                      pointHoverBorderWidth:3,
                      pointHoverRadius: 8,
                  },

                  {
                      label: 'REACTIVE_DEMAND',
                     //  data:[200, 150, 130, 170, 220, 350, 340, 280, 200, 350, 420, 410, 300, 400, 350, 500, 450, 300, 350, 250, 300, 450, 350, 310, 320, 420, 500, 450, 420, 550, 500],
                      data: this.power_reactive,
                      backgroundColor: purple_orange_gradient,
                      borderColor:'#ffffff',
                      pointRadius: 6,
                      borderWidth: 2,
                      borderJoinStyle: 'miter',
                      pointBorderWidth:3,
                      pointBorderColor: '#fff',
                      pointBackgroundColor: '#3dac4e',
                      pointHoverBackgroundColor: '#ffe833',
                      pointHoverBorderColor:'#fff',
                      pointHoverBorderWidth:5,
                      pointHoverRadius: 10,
                  },
                  {
                    label: 'APPERENT_DEMAND',
                    // data:[0, -50, -20, -50, -20, -50, -20, -50, -20, -50, -20, -25, -20, -50, -20, -50, -20, -50, -20, -25, -30, -50, -40, -45, -50, -40, -30, -48, 45, -48],
                    data: this.power_apparent,
                    backgroundColor: purple_orange_gradient,
                    borderColor:'#ffffff',
                    pointRadius: 6,
                    borderWidth: 2,
                    pointBorderWidth:3,
                    pointBorderColor: '#fff',
                    pointBackgroundColor: '#3dac4e',
                    pointHoverBackgroundColor: '#ec72e1',
                    pointHoverBorderColor:'#fff',
                    pointHoverBorderWidth:3,
                    pointHoverRadius: 8,
                  }

              ],

          },
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
                          color: 'rgba(255,255,255,0.1)'
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
