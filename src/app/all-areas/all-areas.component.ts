import { Router } from '@angular/router';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-all-areas',
  templateUrl: './all-areas.component.html',
  styleUrls: ['./all-areas.component.css']
})
export class AllAreasComponent implements OnInit {

  areaData;
  view = false;
  dataLength;
  from = 'hotels'
  userData = JSON.parse(localStorage.getItem('userData'));
  typeofTourism;
  city;
  userType;
  viewHotelsSection = false;
  viewRestaurantsSection = false;
  constructor(private api: GetAPIService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if (this.userType !== 'user') {
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getAreas().subscribe((data) => {
      if (data !== null) {
        this.areaData = data;
        this.dataLength = this.areaData.length;
      }
    });
  }
  viewHotels(typeofTourism, city) {
    this.from = "hotels";
    this.view = !this.view;
    this.typeofTourism = typeofTourism;
    this.city = city;
    this.viewRestaurantsSection = false;
    this.viewHotelsSection = true;
  }
  viewRestaurants(typeofTourism, city) {
    this.from = "restaurants";
    this.view = !this.view;
    this.typeofTourism = typeofTourism;
    this.city = city;
    this.viewHotelsSection = false;
    this.viewRestaurantsSection = true;
  }
}
