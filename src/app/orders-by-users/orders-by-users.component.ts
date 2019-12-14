import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GetAPIService } from '../service/get-api.service';

@Component({
  selector: 'app-orders-by-users',
  templateUrl: './orders-by-users.component.html',
  styleUrls: ['./orders-by-users.component.css']
})
export class OrdersByUsersComponent implements OnInit {

  constructor(private cookieService : CookieService,private router : Router,private api : GetAPIService) { }
  userType;
  orderData;
  eventdata;
  userData = JSON.parse(localStorage.getItem('userData'));
  id;
  from = 'hotelOrders';
  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'user'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getOrdersByUserId(this.userData.Id).subscribe((data) => {
      if(data!== null){
        this.orderData = data;
      }
    });
    this.api.getEventOrdersByUserId(this.userData.Id).subscribe((data) => {
      if(data!== null){
        this.eventdata = data;
      }
    });
  }

  deleteHotelOrders(orderId){
    this.id= orderId;
    this.from = "hotelOrders";
  }
  deleteEventOrder(eventId){
    this.id = eventId;
    this.from = "eventOrders"
  }

}
