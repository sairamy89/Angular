import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';


@Component({
  selector: 'app-executive-view',
  templateUrl: './executive-view.component.html',
  styleUrls: ['./executive-view.component.css']
})
export class ExecutiveViewComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
