import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotelData;
  userType;
  hotelId;
  hotelDataForEdit;
  from = "hotels";
  
  constructor(private api : GetAPIService,private cookieService : CookieService,private router : Router) {
   }
  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'admin'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getHotels().subscribe((data) => {
      if(data!== null){
        this.hotelData = data;
      }
    });
  }
  deleteHotel(id){
    this.hotelId = id;
  }
  editHotel(data){
    this.hotelDataForEdit = data;
  }

}
