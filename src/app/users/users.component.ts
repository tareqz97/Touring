import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
userData;
userId;
from = 'users';
userType;
  constructor(private api :GetAPIService,private cookieService : CookieService,private router : Router) {
   }

  ngOnInit() {
    this.userType = this.cookieService.get('userType');
    if(this.userType !== 'admin'){
      this.router.navigate(['/notAuthorised'])
      return;
    }
    this.api.getUsers().subscribe((data) => {
      if(data!== null){
        this.userData = data;
      }
    });
  }
  deleteUser(id){
    this.userId = id;
  }

}
