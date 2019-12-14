import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { GetAPIService } from '../service/get-api.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  userData;
  userId;
  from = "areas";
  userType;
  constructor(private api :GetAPIService,private cookieService : CookieService,private router : Router) {
    
   }

  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'admin'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getAreas().subscribe((data) => {
      if(data!== null){
        this.userData = data;
      }
    });
  }
  deleteUser(id){
    this.userId = id;
  }
}
