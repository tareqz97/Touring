import { GetAPIService } from './../service/get-api.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  @Input('orderData') orderData;
  constructor(private router : Router,private api : GetAPIService) { }

  ngOnInit() {
  }
  userId;
  hotelId;
  startDay;
  endDay;
  userName;
  phoneNumber;
  hotelName;
  email;
  numOfPerson;
  isOffer;
  priceForDay;
  userData = JSON.parse(localStorage.getItem('userData'));
  validation = true;
  dateValidation = true;
  orderForm = new FormGroup({
    startDay: new FormControl('', [
      Validators.required,
      
    ]),
    endDay: new FormControl('', [
      Validators.required
    ]),
  })
  checkValueValidation() {
    Object.keys(this.orderForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.orderForm.get(key);
      if (controlErrors.status == 'INVALID') {
        controlErrors.touched = true;
        this.validation = false;
      } else {
        this.validation = true;
      }

    });
  }
  onClose(){
    this.dateValidation = true;
    this.orderForm = new FormGroup({
      startDay: new FormControl('', [
        Validators.required,
        
      ]),
      endDay: new FormControl('', [
        Validators.required
      ]),
    })
  }

  checkDate(startDate,endDate){
    if(Date.parse(startDate) > Date.parse(endDate)){
      this.dateValidation = false;
    }else{
      this.dateValidation = true;
    }
  }
  addOrder(){
    this.checkValueValidation();
    this.hotelId = this.orderData.HotelId;
    this.hotelName = this.orderData.HotelName;
    this.userId = this.userData.Id;
    this.userName = this.userData.FirstName + " " + this.userData.LastName;
    this.email = this.userData.Email;
    this.phoneNumber = this.userData.PhoneNumber;
    this.startDay = this.orderForm.value.startDay;
    this.endDay = this.orderForm.value.endDay
    this.numOfPerson = this.orderData.NumOfPerson;
    this.isOffer = this.orderData.IsOffer;
    this.priceForDay = this.orderData.PriceForDay;
    this.checkDate(this.startDay,this.endDay);
    if(this.validation && this.dateValidation){
    this.api.addOrder(this.userId,this.userName,this.email,this.phoneNumber,this.hotelId,this.hotelName,this.startDay,this.endDay,this.numOfPerson,this.isOffer,this.priceForDay).subscribe((data) => {
      if (data) {
        this.router.navigateByUrl('allAreas').then(() => {
          this.router.navigateByUrl('ordersByUser');
        });
        this.onClose();
        $("#addOrder .close").click()
      }
    },
      error => {
        console.log(error);
      })
  }
}
}
