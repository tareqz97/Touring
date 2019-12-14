import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  facilitiesData;
  facilitiesId;
  from = 'facilities';
  userType;
  constructor(private api : GetAPIService,private cookieService : CookieService,private router : Router) {
   }

  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'admin'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getFaclities().subscribe((data) => {
      if(data!== null){
        this.facilitiesData = data;
      }
    });
  }
  deleteFacilities(id){
    this.facilitiesId = id;
  }

}
