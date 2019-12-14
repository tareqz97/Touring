import { Router } from '@angular/router';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl,FormGroup, Validators, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-add-hotel-modal',
  templateUrl: './add-hotel-modal.component.html',
  styleUrls: ['./add-hotel-modal.component.css']
})
export class AddHotelModalComponent implements OnInit {

  constructor(private api : GetAPIService,private router : Router) {
   }

  ngOnInit() {
  }
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
  TypeofTourism = [{name : 'Recreational',value :'Recreational'},{name : 'Archaeological' , value :'Archaeological'},{name : 'Religious' , value :'Religious'},{name : 'Therapeutic' , value :'Therapeutic'}];
  HotelStar = [{name : '4' , value : '4'},{name : '5' , value : '5'},{name : '6' , value : '6'},{name : '7' , value : '7'}]
  imageUrl : string;
  fileUpload : File = null;
  validation = true;
  offer = false;
  dateValidation = true;
  hotelForm = new FormGroup({
    hotelName: new FormControl('',[
      Validators.required
    ]),
    hotelStar: new FormControl('',[
      Validators.required
    ]),
    image: new FormControl('',[
      Validators.required
    ]),
    typeofTourism: new FormControl('',[
      Validators.required
    ]),
    priceForDay: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]{1,3}$')
    ]),
    isOffer: new FormControl('',[
    ]),
    numOfDaysOffer: new FormControl('',[
    ]),
    city: new FormControl('',[
      Validators.required
    ]),
    address: new FormControl('',[
    ]),
    startDataOffer: new FormControl('',[
    ]),
    endDateOffer: new FormControl('',[
    ]),
    map: new FormControl('',[
    ]),
    numOfPerson : new FormControl('',[
      Validators.required,
      Validators.pattern('^[1-4]$')
    ])
  });
  onFileSelect(file : FileList){
    this.fileUpload = file.item(0);
  }
  checkValueValidation() {
    Object.keys(this.hotelForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.hotelForm.get(key);
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
    this.offer = false;
    this.hotelForm = new FormGroup({
      hotelName: new FormControl('',[
        Validators.required
      ]),
      hotelStar: new FormControl('',[
        Validators.required
      ]),
      image: new FormControl('',[
        Validators.required
      ]),
      typeofTourism: new FormControl('',[
        Validators.required
      ]),
      priceForDay: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]),
      isOffer: new FormControl('',[
      ]),
      numOfDaysOffer: new FormControl('',[
      ]),
      city: new FormControl('',[
        Validators.required
      ]),
      address: new FormControl('',[
      ]),
      startDataOffer: new FormControl('',[
      ]),
      endDateOffer: new FormControl('',[
      ]),
      map: new FormControl('',[
      ]),
      numOfPerson : new FormControl('',[
        Validators.required,
        Validators.pattern('^[1-4]$')
      ])
    });
  }
  checkDate(startDate,endDate){
    if(startDate !== "" && endDate !== ""){
    if(Date.parse(startDate) > Date.parse(endDate)){
      this.dateValidation = false;
    }else{
      this.dateValidation = true;
    }
  }else{
    this.dateValidation = false;
  }
  }
  onSubmit(formData){
    this.checkValueValidation();
    var data = formData.value;
    data.isOffer === true ? this.checkDate(data.startDataOffer,data.endDateOffer) : this.dateValidation = true;
    if(this.validation && this.dateValidation){
    this.api.postHotel(data.hotelName,data.hotelStar,this.fileUpload,data.typeofTourism,data.priceForDay,data.isOffer,data.numOfDaysOffer,data.city,data.address,data.startDataOffer,data.endDateOffer,data.map,data.numOfPerson).subscribe(data =>{
      if (data) {
        this.router.navigateByUrl('users').then(() => {
          this.router.navigateByUrl('hotels');
        });
        this.onClose();
        $("#addHotel .close").click()
      }
    })
  }
  }
  
  
}
