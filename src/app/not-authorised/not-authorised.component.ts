import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-not-authorised',
  templateUrl: './not-authorised.component.html',
  styleUrls: ['./not-authorised.component.css']
})
export class NotAuthorisedComponent implements OnInit {
  isLogin;
  userType;
  constructor(private cookieService : CookieService,private router : Router) { }

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
