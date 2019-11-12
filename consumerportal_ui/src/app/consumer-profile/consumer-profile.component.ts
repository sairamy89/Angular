import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from './../shared/consumer.service';
import { Consumer } from '../shared/consumer';

@Component({
  selector: 'app-consumer-profile',
  templateUrl: './consumer-profile.component.html',
  styleUrls: ['./consumer-profile.component.css']
})
export class ConsumerProfileComponent implements OnInit {

  public consumer_number: any;
  public consumer_name: any;
  public bill_to_addr_l1: any;
  public bill_to_addr_l2: any;
  public bill_to_addr_l3: any;
  public bill_pin_code: any;
  public date_of_connection: any;
  public consumer_type: any;
  public contract_demand_kva: any;
  public phase: any;
  public status: any;
  public tariff_category: any;
  public meter_no: any;
  public meter_status: any;
  public mobile_number: any;
  public email: any;

  avatarStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #7e7e7e',
    borderRadius: '50%',
    color: '#7e7e7e',
    cursor: 'pointer'
  };

  constructor(private router: Router, private service: ConsumerService) { }

  ngOnInit() {
    this.loadConsumerProfile();
  }

  loadConsumerProfile () {
    this.service.getConsumer('000119026760', 1).subscribe((result: Consumer[]) => {
      result.forEach(items => {
        this.consumer_number = items.consumer_number;
        this.consumer_name = items.consumer_name;
        this.bill_pin_code = items.bill_pin_code;
        this.bill_to_addr_l1 = items.bill_to_addr_l1;
        this.bill_to_addr_l2 = items.bill_to_addr_l2;
        this.bill_to_addr_l3 = items.bill_to_addr_l3;
        this.mobile_number = '+91-8647856987';
        this.email = 'consumer@msedcl.com';
        this.date_of_connection = items.date_of_connection;
        this.consumer_type = items.consumer_type;
        this.contract_demand_kva = items.contract_demand_kva;
        this.phase = 'HT';
        this.status = 'Connected';
        this.tariff_category = items.tariff_category;
        this.meter_no = items.meter_address_L1;
        this.meter_status = 'Working';
      });
    });
  }

}
