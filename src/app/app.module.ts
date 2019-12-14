import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewDescModalComponent } from './view-desc-modal/view-desc-modal.component';
import { GetAPIService } from './service/get-api.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginUserModalComponent } from './login-user-modal/login-user-modal.component';
import { UsersComponent } from './users/users.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { AddTouristAreaModalComponent } from './add-tourist-area-modal/add-tourist-area-modal.component';
import { AreasComponent } from './areas/areas.component';
import {CookieService} from 'ngx-cookie-service';
import { AddHotelModalComponent } from './add-hotel-modal/add-hotel-modal.component';
import { HotelsComponent } from './hotels/hotels.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { AddFaclitiesModalComponent } from './add-faclities-modal/add-faclities-modal.component';
import { DashbordUsersComponent } from './dashbord-users/dashbord-users.component';
import { HotelsAndFaclitiesComponent } from './hotels-and-faclities/hotels-and-faclities.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AllAreasComponent } from './all-areas/all-areas.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { NotAuthorisedComponent } from './not-authorised/not-authorised.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { ChangeUserInformationComponent } from './change-user-information/change-user-information.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { OrdersByUsersComponent } from './orders-by-users/orders-by-users.component';
import { VeiwDetailsComponent } from './veiw-details/veiw-details.component';
import { LoadingCompComponent } from './loading-comp/loading-comp.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashbordComponent,
    HomeComponent,
    AddUserModalComponent,
    ViewDescModalComponent,
    LoginUserModalComponent,
    UsersComponent,
    DeleteModalComponent,
    AddTouristAreaModalComponent,
    AreasComponent,
    AddHotelModalComponent,
    HotelsComponent,
    FacilitiesComponent,
    AddFaclitiesModalComponent,
    DashbordUsersComponent,
    HotelsAndFaclitiesComponent,
    AddOrderComponent,
    AllAreasComponent,
    NotFoundPageComponent,
    NotAuthorisedComponent,
    UserOrderComponent,
    ChangeUserInformationComponent,
    ChangePasswordModalComponent,
    OrdersByUsersComponent,
    VeiwDetailsComponent,
    LoadingCompComponent,
  ],
  imports: [
    // RouterModule.forRoot(
    //   appRoutes,// <-- debugging purposes only
    // ),
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [GetAPIService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
