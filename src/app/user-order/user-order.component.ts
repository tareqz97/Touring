import { GetAPIService } from './../service/get-api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  constructor(private cookieService : CookieService,private router : Router,private api : GetAPIService) { }
  userType;
  hotelsOredersData;
  eventsOrdersData;
  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'admin'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getOrders().subscribe((data) => {
      if(data!== null){
        this.hotelsOredersData = data;
      }
    });
    this.api.getEventsOrders().subscribe((data) => {
      if(data!== null){
        this.eventsOrdersData = data;
      }
    });
  }

}
