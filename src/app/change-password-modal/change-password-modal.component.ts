import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  validation = true;
  userData = JSON.parse(localStorage.getItem('userData'));
  password = this.userData.Password;
  passwordValidation = true;
  currentPassword;
  passwordConfirmValidation = true;
  constructor(private api : GetAPIService) { }

  ngOnInit() {
  }

  userForm = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required
    ]),
    newPassword : new FormControl('', [
      Validators.required
    ]),
    confirmNewPassword : new FormControl('', [
      Validators.required
    ]),
  });

  onClose(){
    this.userForm = new FormGroup({
      currentPassword: new FormControl('', [
        Validators.required
      ]),
      newPassword : new FormControl('', [
        Validators.required
      ]),
      confirmNewPassword : new FormControl('', [
        Validators.required
      ]),
    });
  }
  checkPasswordIsValid(){
    if(this.currentPassword !== this.password){
        this.passwordValidation = false;
    }else{
      this.passwordValidation = true;
    }
  }
  checkConfirmPassword() {
    if (this.userForm.controls.newPassword.value !== this.userForm.controls.confirmNewPassword.value) {
      this.passwordConfirmValidation = false;
    } else {
      this.passwordConfirmValidation = true;
    }
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
  changePassword(){
    this.checkValueValidation();
    this.checkPasswordIsValid();
    this.checkConfirmPassword();
    if (this.validation && this.passwordValidation && this.passwordConfirmValidation) {
      this.api.changPassword(this.userData.Id,this.userForm.value).subscribe((data) => {
        if (data) {
          this.onClose();
          $("#changePassword .close").click()
        }
      },
        error => {
          console.log(error);
        })
  }
  }

}
