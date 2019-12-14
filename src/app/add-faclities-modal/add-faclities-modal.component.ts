import { Router } from '@angular/router';
import { GetAPIService } from './../service/get-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-add-faclities-modal',
  templateUrl: './add-faclities-modal.component.html',
  styleUrls: ['./add-faclities-modal.component.css']
})
export class AddFaclitiesModalComponent implements OnInit {

  constructor(private api : GetAPIService,private router : Router) { }

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
  faclitiesStar = [{name : '4' , value : '4'},{name : '5' , value : '5'},{name : '6' , value : '6'},{name : '7' , value : '7'}]
  imageUrl : string;
  offer = false;
  fileUpload : File = null;
  validation = true;
  dateValidation = true;
  faclitiesForm = new FormGroup({
    facilityName: new FormControl('',[
      Validators.required
    ]),
    // evaluation: new FormControl('',[
    //   Validators.required
    // ]),
    image: new FormControl('',[
      Validators.required
    ]),
    priceForPerson: new FormControl('',[
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
      // Validators.required
    ]),
    startDataOffer: new FormControl('',[
      Validators.required
    ]),
    endDateOffer: new FormControl('',[
      // Validators.required
    ]),
    map: new FormControl('',[
      // Validators.required
    ]),
    details: new FormControl('',[
      // Validators.required
    ])

    
  });
  onFileSelect(file : FileList){
    this.fileUpload = file.item(0);
  }
  checkValueValidation() {
    Object.keys(this.faclitiesForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.faclitiesForm.get(key);
      if (controlErrors.status == 'INVALID') {
        controlErrors.touched = true;
        this.validation = false;
      } else {
        this.validation = true;
      }

    });
    if(this.faclitiesForm.status === "VALID"){
      this.validation = true;
    }else{
      this.validation = false;
    }
  }
  onClose(){
    this.dateValidation = true;
    this.offer = false;
    this.faclitiesForm = new FormGroup({
      facilityName: new FormControl('',[
        Validators.required
      ]),
      // evaluation: new FormControl('',[
      //   Validators.required
      // ]),
      image: new FormControl('',[
        Validators.required
      ]),
      priceForPerson: new FormControl('',[
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
        // Validators.required
      ]),
      startDataOffer: new FormControl('',[
        Validators.required
      ]),
      endDateOffer: new FormControl('',[
        // Validators.required
      ]),
      map: new FormControl('',[
        // Validators.required
      ]),
      details: new FormControl('',[
        // Validators.required
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
    this.api.postFaclities(data.facilityName,data.evaluation,this.fileUpload,data.priceForPerson,data.isOffer,data.city,data.address,data.startDataOffer,data.endDateOffer,data.map,data.details).subscribe(data =>{
      if (data) {
        this.router.navigateByUrl('users').then(() => {
          this.router.navigateByUrl('facilities');
        });
        this.onClose();
        $("#addFaclities .close").click()
      }
    })
  }
  }
}
