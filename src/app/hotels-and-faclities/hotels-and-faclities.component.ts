import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { GetAPIService } from '../service/get-api.service';
import { all } from 'q';

@Component({
  selector: 'app-hotels-and-faclities',
  templateUrl: './hotels-and-faclities.component.html',
  styleUrls: ['./hotels-and-faclities.component.css']
})
export class HotelsAndFaclitiesComponent implements OnInit {
  hotelDataViwe;
  hotelData;
  eventDataView;
  eventData;
  order;
  @Input('from') from;
  @Input('typeofTourism') typeofTourism
  @Input('city') city;
  viewHotels = false;
  viewRestaurants = false;
  userData = JSON.parse(localStorage.getItem('userData'));
  userOrder;
  userId;
  startDay;
  endDay;
  userName;
  phoneNumber;
  email;
  numOfPerson;
  isOffer;
  priceForDay;
  eventId;
  eventName;
  userEvent;
  title;
  details;
  constructor(private api: GetAPIService,private router : Router) {
  }
  ngOnInit() {
    switch (this.from) {
      case 'hotels':
        this.viewHotels = true;
        this.viewRestaurants = false;
        this.api.getHotelsForTypeofTourism(this.typeofTourism, this.city).subscribe((allHotels) => {
          if (allHotels !== null) {
            this.hotelData = allHotels;
            this.api.getOrdersByUserId(this.userData.Id).subscribe((userSelectHotel) => {
              if(userSelectHotel!== null){
                this.userOrder = userSelectHotel;
                for(var i=0; i < this.hotelData.length;i++){
                  for(var z=0; z < this.userOrder.length;z++){
                    if(this.hotelData[i].HotelId !== undefined)
                    if(this.hotelData[i].HotelId === this.userOrder[z].HotelId){
                      this.hotelData[i].selected = true;
                      break;
                    }else{
                      this.hotelData[i].selected = false;
                    }
                  }
                }

              }
          });
          this.hotelDataViwe = this.hotelData;
        }
        });
        break;
      case 'restaurants':
          this.viewHotels = false;
          this.viewRestaurants = true;
        this.api.getRestaurantsForTypeOfTourism(this.city).subscribe((allEvents) => {
          if (allEvents !== null) {
            this.eventData = allEvents;
            this.api.getEventOrdersSelectedByUserId(this.userData.Id).subscribe((userSelectEvent) => {
              if(userSelectEvent!== null){
                this.userEvent = userSelectEvent;
                for(var i=0; i < this.eventData.length;i++){
                  for(var z=0; z < this.userEvent.length;z++){
                    if(this.eventData[i].Id !== undefined)
                    if(this.eventData[i].Id === this.userEvent[z].EventId){
                      this.eventData[i].selected = true;
                      break;
                    }else{
                      this.eventData[i].selected = false;
                    }
                  }
                }
                this.eventDataView = this.eventData;
                console.log(this.eventDataView);
              }
          });
          }
        });
        break;
      default:
        break;
    }
  }
  orderData(data) {
    this.order = data;
  }
  addEvent(event){
    this.eventId = event.Id;
    this.eventName = event.FacilityName;
    this.userId = this.userData.Id;
    this.userName = this.userData.FirstName + " " + this.userData.LastName;
    this.email = this.userData.Email;
    this.phoneNumber = this.userData.PhoneNumber;
    this.numOfPerson = event.NumOfPerson;
    this.isOffer = event.IsOffer;
    this.priceForDay = event.PriceForPerson;
    this.startDay = event.DateOfOffers;
    this.endDay = event.EndDateOfOffers;
    this.api.addOrderEvent(this.userId,this.userName,this.email,this.phoneNumber,this.eventId,this.eventName,this.startDay,this.endDay,this.numOfPerson,this.isOffer,this.priceForDay).subscribe((data) => {
      if (data) {
        this.router.navigateByUrl('allAreas').then(() => {
          this.router.navigateByUrl('ordersByUser');
        });
      }
    },
      error => {
        console.log(error);
      })
  }

  viewDetails(title,details){
    this.title = title;
    this.details = details;
  }
}
