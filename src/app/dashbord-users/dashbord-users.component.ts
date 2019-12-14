import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord-users',
  templateUrl: './dashbord-users.component.html',
  styleUrls: ['./dashbord-users.component.css']
})
export class DashbordUsersComponent implements OnInit {
  areaData;
  view = false;
  from;
  userData = JSON.parse(localStorage.getItem('userData'));
  typeofTourism;
  city;
  userType;
  dataLength
  viewHotelsSection = false;
  viewRestaurantsSection = false;
  constructor(private api : GetAPIService,private cookieService : CookieService,private router :Router) { 
  
  }

  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'user'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getFavoriteTouristArea(this.userData.TypeOfTourism).subscribe((data) => {
      if(data!== null){
        this.areaData = data;
        this.dataLength = this.areaData.length;
      }
    });
  }
  viewHotels(typeofTourism,city){
    this.from = "hotels";
    this.view = !this.view;
    this.typeofTourism = typeofTourism;
    this.city = city;
    this.viewRestaurantsSection = false;
    this.viewHotelsSection = true;
  }
  viewRestaurants(typeofTourism,city){
    this.from = "restaurants";
    this.view = !this.view;
    this.typeofTourism = typeofTourism;
    this.city = city;
    this.viewHotelsSection = false;
    this.viewRestaurantsSection = true;
  }
}
