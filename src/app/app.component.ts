import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as breadcrump from '../app/title.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  activePath;
  imagePath = "http://localhost:51621/Images/";
  constructor(private route: ActivatedRoute,private cookieService : CookieService) {
    breadcrump.setPath('');
    this.cookieService.set('isLogin' ,'false')
   }
   
}
