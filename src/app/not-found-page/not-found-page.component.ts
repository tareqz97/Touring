import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private cookieService : CookieService,private router : Router) { }
  isLogin;
  userType;
  ngOnInit() {
    this.isLogin = this.cookieService.get('isLogin') == 'true' ? true : false;
    this.userType = this.cookieService.get('userType');
  }
  gotoHome(){
    if(this.isLogin == true){
      if(this.userType == 'admin'){
        this.router.navigate(['/adminHome'])
      }else if(this.userType == 'user'){
        this.router.navigate(['/userHome'])
      }
    }else{
      this.router.navigate(['/home'])
    }
  }

}
