import { Router } from '@angular/router';
import { AreasComponent } from './../areas/areas.component';
import { GetAPIService } from '../service/get-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input('userId') userId;
  @Input('from') from;
  constructor(private api :GetAPIService,private router : Router) { }
  ngOnInit() {
    switch (this.from) {
      case "users" :
      this.title = "Are you want delete this user : ? ";
      break;
      case "areas":
          this.title = "Are you want delete this areas ? ";
          break;
      case "hotels":
          this.title = "Are you want delete this hotel ? ";
          break;
      case "facilities" :
          this.title = "Are you want delete this event ? ";
          break;
      case "hotelOrders" : 
          this.title = "Are you want delete this order ? ";
          break;
      default:
          //default block statement;
  }
  }
  title;
  deleteUser(id){
    if(this.from === 'users'){
      this.api.deleteUser(id).subscribe((data) => {
        this.router.navigateByUrl('areas').then(() => {
          this.router.navigateByUrl('users');
          });
        },
        error => {
          console.log(error);
        })
    }else if(this.from === 'areas'){
      this.api.deleteTouristArea(id).subscribe((data) => {
        this.router.navigateByUrl('users').then(() => {
          this.router.navigateByUrl('areas');
          });
        },
        error => {
          console.log(error);
        })
    }else if(this.from === 'hotels'){
      this.api.deleteHotel(id).subscribe((data) => {
        this.router.navigateByUrl('users').then(() => {
          this.router.navigateByUrl('hotels');
          });
        },
        error => {
          console.log(error);
        })
    }
    else if(this.from === 'facilities'){
      this.api.deleteFaclities(id).subscribe((data) => {
        this.router.navigateByUrl('users').then(() => {
          this.router.navigateByUrl('facilities');
          });
        },
        error => {
          console.log(error);
        })
    }else if(this.from === 'hotelOrders'){
      this.api.deleteHotelOrder(id).subscribe((data) => {
        this.router.navigateByUrl('userHome').then(() => {
          this.router.navigateByUrl('ordersByUser');
          });
        },
        error => {
          console.log(error);
        })
    }else if(this.from === 'eventOrders'){
      this.api.deleteEventOrder(id).subscribe((data) => {
        this.router.navigateByUrl('userHome').then(() => {
          this.router.navigateByUrl('ordersByUser');
          });
        },
        error => {
          console.log(error);
        })
    }

  }
}
