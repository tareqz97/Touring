import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from './../service/user-info.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as breadcrump from '../title.service';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // path = 'Dashbord';
  isLoggedIn$: Observable <boolean>;   
  constructor(private router : Router,private userService : UserInfoService,private cookieService : CookieService) {
   }
  ngOnInit() {
    this.isLogin = this.cookieService.get('isLogin') === 'true' ? true : false;
    this.userType = this.cookieService.get('userType');
    this.userType === 'admin' ? this.pages = this.adminPages : this.pages = this.userPages;
  }
  pages;
  userData = JSON.parse(localStorage.getItem('userData'));
  userType;
  isLogin = false;
  adminPages = [
    {
      name: 'Home',
      active: true,
      routerLink : 'adminHome'
    },
    {
      name :'Users',
      active :false,
      routerLink :'users'
    },
    {
      name : 'Areas',
      active : false,
      routerLink :'areas'
    },
    {
      name : 'Hotels',
      active : false,
      routerLink :'hotels'
    },
    {
      name : 'Events',
      active : false,
      routerLink :'facilities'
    },
    {
      name: 'User Orders',
      active : false,
      routerLink : 'userOrders'
    }

  ];
  userPages = [
    {
      name: 'Home',
      active: true,
      routerLink : 'userHome'
    },
    {
      name :'Areas',
      active :false,
      routerLink :'allAreas'
    },
    {
      name : 'Orders',
      active : false,
      routerLink :'ordersByUser'
    },
    // {
    //   name : 'Hotels',
    //   active : false,
    //   routerLink :'hotels'
    // },
    // {
    //   name : 'Facilities',
    //   active : false,
    //   routerLink :'facilities'
    // }

  ];

  titlse = [
    {
      name: 'Home',
      href :''
    },
    {
      name :'About Us',
      href :'#about'
    },
    {
      name : 'Gallery',
      href :'#gallery'
    },
    {
      name : 'Contact Us',
      href :'#mail'
    }

  ];
  Logout(){
    this.cookieService.set('isLogin' ,'false')
    this.cookieService.set('userType','false');
  }
   
} 