import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetAPIService {

  constructor(private _http: HttpClient) { }
  addUser(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this._http.post<any[]>('http://localhost:51621/api/addUser',data,httpOptions);
    }
    updateUser(id,data) {
      const formData : FormData = new FormData();
      formData.append("id",id);
      formData.append("firstName",data.firstName);
      formData.append("middleName",data.middleName);
      formData.append("lastName",data.lastName);
      formData.append("city",data.city);
      formData.append("gender",data.gender);
      formData.append("typeOfTourism",data.typeofTourism);
      formData.append("phoneNumber",data.phoneNumber);
      formData.append("address",data.address);
          return this._http.post('http://localhost:51621/api/updateUser',formData);
      }
      changPassword(id,data){
        const formData : FormData = new FormData();
        formData.append("id",id);
        formData.append("password",data.newPassword);
          return this._http.post('http://localhost:51621/api/changePassword',formData);
      }
    loginUser(data){
      // return this._http.get<any[]>('http://localhost:51621/api/loginUser?email='+data);
      return this._http.get<any[]>('http://localhost:51621/api/loginUser', {
          observe: "body",
          params: data,
          responseType: "json"
        });
    }
    getUsers(){
      return this._http.get('http://localhost:51621/api/getUsers');
    }
    deleteUser(id){
      return this._http.get('http://localhost:51621/api/deleteUser?id=' + id);
    }
    addTouristArea(data){
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this._http.post<any[]>('http://localhost:51621/api/addTouristArea',data);
    }
    getAreas(){
      return this._http.get('http://localhost:51621/api/getAreas');
    }
    deleteTouristArea(id){
      return this._http.get('http://localhost:51621/api/deleteTouristArea?id='+id);
    }
    postFile(areaName :string,city : string,file : File ,typeofTourism : string,distanceAmman : string,distanceAirport : string,details : string){
      const formData : FormData = new FormData();
      formData.append("areaName",areaName);
      formData.append("city",city);
      formData.append("image",file,file.name);
      formData.append("typeofTourism",typeofTourism);
      formData.append("distanceAmman",distanceAmman);
      formData.append("distanceAirport",distanceAirport);
      formData.append("details",details);
      
      return this._http.post('http://localhost:51621/api/addTouristArea',formData);
    }
    postHotel(hotelName,hotelStar,file,typeofTourism,priceForDay,isOffer,numOfDaysOffer,city,address,startDataOffer,endDataOffer,map,numOfPerson){
      const formData : FormData = new FormData();
      formData.append("hotelName",hotelName);
      formData.append("hotelStar",hotelStar);
      formData.append("image",file,file.name);
      formData.append("typeofTourism",typeofTourism);
      formData.append("priceForDay",priceForDay);
      formData.append("isOffer",isOffer);
      formData.append("city",city);
      formData.append("address",address);
      formData.append("numOfDaysOffer",numOfDaysOffer);
      formData.append("dateOffer",startDataOffer);
      formData.append("endDateOffer",endDataOffer);
      formData.append("map",map);
      formData.append("numOfPerson",numOfPerson)
      
      return this._http.post('http://localhost:51621/api/addHotel',formData);
    }
    getHotels(){
      return this._http.get('http://localhost:51621/api/getHotels');
    }
    deleteHotel(id){
      return this._http.get('http://localhost:51621/api/deleteHotel?id='+id);
    }

    getFaclities(){
      return this._http.get('http://localhost:51621/api/getFacilities');
    }
    postFaclities(facilityName,evaluation,file,priceForPerson,isOffer,city,address,startDataOffer,endDateOffer,map,details){
      const formData1 : FormData = new FormData();
      formData1.append("facilityName",facilityName);
      formData1.append("stars",evaluation);
      formData1.append("image",file,file.name);
      formData1.append("priceForPerson",priceForPerson);
      formData1.append("isOffer",isOffer);
      formData1.append("city",city);
      formData1.append("address",address);
      formData1.append("dateOffer",startDataOffer);
      formData1.append("endDateOffer",endDateOffer);
      formData1.append("map",map);
      formData1.append("details",details);
      return this._http.post('http://localhost:51621/api/addFacilities',formData1);
    }
    deleteFaclities(id){
      return this._http.get('http://localhost:51621/api/deleteFaclities?id='+id);
    }
    addOrder(userId,userName,email,phoneNumber,hotelId,hotelName,startDay,endDay,numOfPerson,isOffer,priceForDay){
      const formData : FormData = new FormData();
      formData.append("userId",userId);
      formData.append("userName",userName);
      formData.append("email",email);
      formData.append("phoneNumber",phoneNumber);
      formData.append("hotelId",hotelId);
      formData.append("hotelName",hotelName);
      formData.append("startDay",startDay);
      formData.append("endDay",endDay);
      formData.append("numOfPerson",numOfPerson);
      formData.append("isOffer",isOffer);
      formData.append("priceForDay",priceForDay);
      return this._http.post('http://localhost:51621/api/addHotelOrder',formData);
    }

    findEmail(email){
      const formData : FormData = new FormData();
      formData.append("email",email);
      return this._http.post('http://localhost:51621/api/findEmail',formData);
    }

    getFavoriteTouristArea(typeofTourism){
      const formData : FormData = new FormData();
      formData.append("typeofTourism",typeofTourism);
      return this._http.post('http://localhost:51621/api/getFavoriteTouristArea',formData);
    }

    getHotelsForTypeofTourism(typeofTourism,city){
      const formData : FormData = new FormData();
      formData.append("typeofTourism",typeofTourism);
      formData.append("city",city);
      return this._http.post('http://localhost:51621/api/getHotelsForTypeofTourism',formData);
    }
    
    getRestaurantsForTypeOfTourism(city){
      const formData : FormData = new FormData();
      formData.append("city",city);
      return this._http.post('http://localhost:51621/api/getRestaurantsForTypeOfTourism',formData);
    }
    getOrders(){
      return this._http.get('http://localhost:51621/api/getHotelOrders');
    }
    getEventsOrders(){
      return this._http.get('http://localhost:51621/api/getEventOrders');
    }
    getOrdersByUserId(userId){
      return this._http.get('http://localhost:51621/api/getHotelOrdersByUserId?UserId='+userId);
    }
    addOrderEvent(userId,userName,email,phoneNumber,eventId,eventlName,startDay,endDay,numOfPerson,isOffer,priceForDay){
      const formData : FormData = new FormData();
      formData.append("userId",userId);
      formData.append("userName",userName);
      formData.append("email",email);
      formData.append("phoneNumber",phoneNumber);
      formData.append("eventId",eventId);
      formData.append("eventName",eventlName);
      formData.append("startDay",startDay);
      formData.append("endDay",endDay);
      // formData.append("numOfPerson",numOfPerson);
      formData.append("isOffer",isOffer);
      formData.append("priceForDay",priceForDay);
      return this._http.post('http://localhost:51621/api/addEventOrder',formData);
    }

    getEventOrdersByUserId(userId){
      return this._http.get('http://localhost:51621/api/getEventOrdersByUserId?UserId='+userId);
    }
    deleteHotelOrder(id){
      return this._http.get('http://localhost:51621/api/deleteHotelOrder?id='+id);
    }
    deleteEventOrder(id){
      return this._http.get('http://localhost:51621/api/deleteEventOrder?id='+id);
    }
    getEventOrdersSelectedByUserId(id){
      return this._http.get('http://localhost:51621/api/getEventOrdersByUserId?UserId='+id);
    }

  }
