import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../shared/dashboard.service';
import { Consumer } from '../shared/consumer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public consumerData: Consumer[];

  constructor(public service: DashboardService, private router: Router) { }

  ngOnInit() {
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.service.getdashboardInfo('000119026760', 1).subscribe((result: Consumer[]) => {
      this.consumerData = result;
      });
  }
}
