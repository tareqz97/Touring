import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { GetAPIService } from '../service/get-api.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-tourist-area-modal',
  templateUrl: './add-tourist-area-modal.component.html',
  styleUrls: ['./add-tourist-area-modal.component.css']
})
export class AddTouristAreaModalComponent implements OnInit {
  TypeofTourism = [{ name: 'Recreational', value: 'Recreational' }, { name: 'Archaeological', value: 'Archaeological' }, { name: 'Religious', value: 'Religious' }, { name: 'Therapeutic', value: 'Therapeutic' }];
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
  selectedFile : File = null;
  constructor(private api : GetAPIService,private router : Router) { }
  imageUrl : string;
  fileUpload : File = null;
  imageForm; 
  validation = true;
  ngOnInit() {
  }
  tourisAreaForm = new FormGroup({
    areaName: new FormControl('',[
      Validators.required,
      Validators.pattern('^[a-zA-Z \-\']+')
    ]),
    city: new FormControl('',[
      Validators.required
    ]),
    image: new FormControl('',[
      Validators.required
    ]),
    typeofTourism: new FormControl('',[
      Validators.required
    ]),
    distanceAmman: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]{1,3}$')
    ]),
    distanceAirport: new FormControl('',[
      Validators.required,
      Validators.pattern('^[0-9]{1,3}$')
    ]),
    // details: new FormControl('',[
    //   Validators.required
    // ])
  });
  checkValueValidation() {
    Object.keys(this.tourisAreaForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.tourisAreaForm.get(key);
      if (controlErrors.status == 'INVALID') {
        controlErrors.touched = true;
        this.validation = false;
      } else {
        this.validation = true;
      }

    });
  }
  onFileSelect(file : FileList){
    this.fileUpload = file.item(0);
  }
  onClose(){
    this.tourisAreaForm = new FormGroup({
      areaName: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z \-\']+')
      ]),
      city: new FormControl('',[
        Validators.required
      ]),
      image: new FormControl('',[
        Validators.required
      ]),
      typeofTourism: new FormControl('',[
        Validators.required
      ]),
      distanceAmman: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]),
      distanceAirport: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]),
      // details: new FormControl('',[
        
      // ])
    });
  }
  onSubmit(formData){
    this.checkValueValidation();
    var data = formData.value;
    if (this.validation) {
    this.api.postFile(data.areaName,data.city,this.fileUpload,data.typeofTourism,data.distanceAmman,data.distanceAirport,data.details).subscribe(data =>{
      if (data) {
        this.router.navigateByUrl('users').then(() => {
          this.router.navigateByUrl('areas');
        });
        this.onClose();
        $("#addTouristArea .close").click()
      }
    })
  }
}
}
