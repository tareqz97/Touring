import { OrdersByUsersComponent } from './orders-by-users/orders-by-users.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { NotAuthorisedComponent } from './not-authorised/not-authorised.component';
import { AllAreasComponent } from './all-areas/all-areas.component';
import { DashbordUsersComponent } from './dashbord-users/dashbord-users.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AreasComponent } from './areas/areas.component';
import { NgModule } from '@angular/core';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RouterModule,Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const isLogin = JSON.parse(localStorage.getItem('isLogin'));
import {UsersComponent} from './users/users.component';
import { from } from 'rxjs';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
const routes: Routes = [
  {
    path : 'adminHome',
    component : DashbordComponent
  },
  {
    path : 'users',
    component : UsersComponent
  },
  {
    path : 'areas',
    component : AreasComponent
  },
  {
    path : 'hotels',
    component : HotelsComponent
  },
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'facilities',
    component : FacilitiesComponent
  },
  {
    path : 'userHome',
    component : DashbordUsersComponent
  },
  {
    path : 'allAreas',
    component : AllAreasComponent
  },
  {
    path : 'userOrders',
    component : UserOrderComponent
  },
  {
    path : 'ordersByUser',
    component : OrdersByUsersComponent
  },
  {
    path : 'notAuthorised',
    component : NotAuthorisedComponent
  },
  {
    path : '**',
    component : NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
