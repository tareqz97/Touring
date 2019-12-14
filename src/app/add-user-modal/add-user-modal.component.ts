import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  constructor(private location: Location, private api: GetAPIService, private router: Router,private cookieService : CookieService) { }
  validation = true;
  typeofTourism = [{ name: 'Recreational', value: 'Recreational' }, { name: 'Archaeological', value: 'Archaeological' }, { name: 'Religious', value: 'Religious' }, { name: 'Therapeutic', value: 'Therapeutic' }];
  City = [
    { name: 'Amman', value: 'Amman'},
    { name: 'Zarqa', value: 'Zarqa'},
    { name: 'Irbid', value: 'Irbid'},
    { name: 'Mafraq', value: 'Mafraq'},
    { name: 'Madaba', value: 'Madaba'},
    { name: 'Al-Balqa', value: 'Al-Balqa'},
    { name: 'Aqaba', value: 'Aqaba'},
    { name: 'Jerash', value: 'Jerash'},
    { name: 'Tafilah', value: 'Tafilah'},
    { name: 'Karak', value: 'Karak'},
    { name: 'Ajloun', value: 'Ajloun'},
    { name: 'Maan', value: 'Maan'},
  ];
  Gender = [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }];
  passwordValidation = true;
  emailList;
  isLogin = this.cookieService.get('isLogin');
  ngOnInit() {
  }
  userForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+')
    ]),
    middleName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+')
    ]),
    typeofTourism: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ]),
    gender: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  });
  checkValueValidation() {
    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.userForm.get(key);
      if (controlErrors.status == 'INVALID') {
        controlErrors.touched = true;
        this.validation = false;
      } else {
        this.validation = true;
      }

    });
  }
  checkConfirmPassword() {
    if (this.userForm.controls.password.value !== this.userForm.controls.confirmPassword.value) {
      this.passwordValidation = false;
    } else {
      this.passwordValidation = true;
    }
  }
  onClose() {
    this.passwordValidation = true;
    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      middleName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      typeofTourism: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^(07)[0-9]{8}$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ])
    });

  }
  addUser() {
    this.checkValueValidation();
    this.checkConfirmPassword();
    if (this.validation && this.passwordValidation) {
      this.api.findEmail(this.userForm.value.email).subscribe((data) => {
        this.emailList = data;
        if(this.emailList.length === 0){
          this.api.addUser(this.userForm.value).subscribe((message) => {
            if (message) {
              if(this.isLogin == 'true')
              this.router.navigateByUrl('areas').then(() => {
                this.router.navigateByUrl('users');
              });
              this.onClose();
              $("#addUser .close").click()
              alert(message)
            }
          },
            error => {
              console.log(error);
            })
        }
        else{
          alert('email is alrady used');
        }
      })
     
    }
  }

}
