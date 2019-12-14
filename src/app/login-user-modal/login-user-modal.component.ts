import { UserInfoService } from './../service/user-info.service';
import { Router,NavigationExtras } from '@angular/router';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators, ValidationErrors } from '@angular/forms';
import * as $AB from 'jquery';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-login-user-modal',
  templateUrl: './login-user-modal.component.html',
  styleUrls: ['./login-user-modal.component.css']
})
export class LoginUserModalComponent implements OnInit {

  constructor(private api :GetAPIService,private router : Router,private userService : UserInfoService,private cookieService :CookieService) { }
  userData;
  ngOnInit() {
  }
  validation = true;
  loginForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    password: new FormControl('',[
      Validators.required,
    ])
  });
  checkValueValidation(){
    Object.keys(this.loginForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.loginForm.get(key);
      if (controlErrors.status == 'INVALID') {
            controlErrors.touched = true;
            this.validation = false;
          }else{
            this.validation = true;
          }

        });
  }
  onClose(){
    this.loginForm = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      password: new FormControl('',[
        Validators.required,
      ])
    });
  }
  login(){
    this.checkValueValidation();
    if(this.validation){
      this.api.loginUser(this.loginForm.value).subscribe((data) => {
          this.userData = data;
          if(this.userData !== null){
            this.cookieService.set('isLogin','true');
            localStorage.setItem('userData',JSON.stringify(this.userData));
            const navigationExtras: NavigationExtras = this.userData;
            if(this.userData.UserType === 1){
              this.cookieService.set('userType','admin');
              this.router.navigate(['/adminHome'],navigationExtras)
            }else{
              this.cookieService.set('userType','user');
              this.router.navigate(['/userHome'],navigationExtras);
            } 
            $("#loginModal .close").click()
          }else{
            alert('Eamil or password not valid');
          }
        },
        error => {
          console.log(error);
        })
    }
  }

}
