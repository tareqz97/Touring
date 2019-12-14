import { CookieService } from 'ngx-cookie-service';
import { Card } from './dashbord.card';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as breadcrump from '../title.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  activePath;
  userData = JSON.parse(localStorage.getItem('userData'));
  
  cards : Card[];
  userType;
  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'admin'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.cards = [
      new Card('Name',this.userData.FirstName + " "+ this.userData.LastName,'../../assets/image/contact.png'),
      new Card('Email',this.userData.Email,'../../assets/image/email.png'),
      new Card('Phone Number',this.userData.PhoneNumber,'../../assets/image/phone.png'),
      new Card('Address',this.userData.City,'../../assets/image/location.png')
    ];
  }
  constructor(private routeActive: ActivatedRoute,private router : Router,private cookieService : CookieService) {
    this.activePath = this.routeActive.snapshot.routeConfig.path;
    breadcrump.setPath(this.activePath);
    const userData = this.router.getCurrentNavigation().extras;
   }

}
