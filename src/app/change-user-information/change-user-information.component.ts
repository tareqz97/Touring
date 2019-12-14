import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { GetAPIService } from '../service/get-api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-user',
  templateUrl: './change-user-information.component.html',
  styleUrls: ['./change-user-information.component.css']
})
export class ChangeUserInformationComponent implements OnInit {
  constructor(private api: GetAPIService, private router: Router, private cookieService: CookieService) { }
  validation = true;
  typeofTourism = [{ name: 'Recreational', value: 'Recreational' }, { name: 'Archaeological', value: 'Archaeological' }, { name: 'Religious', value: 'Religious' }, { name: 'Therapeutic', value: 'Therapeutic' }];
  City = [
    { name: 'Amman', value: 'Amman' },
    { name: 'Zarqa', value: 'Zarqa' },
    { name: 'Irbid', value: 'Irbid' },
    { name: 'Mafraq', value: 'Mafraq' },
    { name: 'Madaba', value: 'Madaba' },
    { name: 'Al-Balqa', value: 'Al-Balqa' },
    { name: 'Aqaba', value: 'Aqaba' },
    { name: 'Jerash', value: 'Jerash' },
    { name: 'Tafilah', value: 'Tafilah' },
    { name: 'Karak', value: 'Karak' },
    { name: 'Ajloun', value: 'Ajloun' },
    { name: 'Maan', value: 'Maan' },
  ];
  Gender = [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }];
  passwordValidation = true;
  emailList;
  isLogin = this.cookieService.get('isLogin');
  userData = JSON.parse(localStorage.getItem('userData'));
  userForm;
  ngOnInit() {
    this.userForm = new FormGroup({
      // id: new FormControl('', Validators.compose([Validators.required])),
      firstName: new FormControl(this.userData.FirstName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      middleName: new FormControl(this.userData.MiddleName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      lastName: new FormControl(this.userData.LastName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      typeofTourism: new FormControl(this.userData.TypeOfTourism, [
        Validators.required
      ]),
      city: new FormControl(this.userData.City, [
        Validators.required
      ]),
      address: new FormControl(this.userData.Address, [
        Validators.required
      ]),
      phoneNumber: new FormControl(this.userData.PhoneNumber, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      email: new FormControl(this.userData.Email),
      gender: new FormControl(this.userData.Gender, [
        Validators.required
      ])
    });
  }
  
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

  onClose() {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.userData.FirstName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      middleName: new FormControl(this.userData.MiddleName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      lastName: new FormControl(this.userData.LastName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      typeofTourism: new FormControl(this.userData.TypeOfTourism, [
        Validators.required
      ]),
      city: new FormControl(this.userData.City, [
        Validators.required
      ]),
      address: new FormControl(this.userData.Address, [
        Validators.required
      ]),
      phoneNumber: new FormControl(this.userData.PhoneNumber, [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      email: new FormControl(this.userData.Email),
      gender: new FormControl(this.userData.Gender, [
        Validators.required
      ])
    });

  }
  addUser() {
    this.checkValueValidation();
    if (this.validation) {
      this.api.updateUser(this.userData.Id, this.userForm.value).subscribe((data) => {
        if (data) {
          localStorage.setItem('userData',JSON.stringify(data));
          this.onClose();
          $("#changeUserInfo .close").click()
          location.reload();
        }
      },
        error => {
          console.log(error);
        })
    }
  }

}
